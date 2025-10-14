'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction, logoutAction } from '@/features/auth/auth-actions';
import { AuthError } from '@supabase/supabase-js';
import { useGetCurrentUserQuery } from '@/services/gql/operations';

type AuthContextUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: {
        name: string;
    }
}

type AuthContextType = {
    user: AuthContextUser | null;
    login: (
        email: string,
        password: string
    ) => Promise<
        | { success: true; error: null }
        | {
            success: false;
            error: { name: 'INVALID_CREDENTIALS'; message: 'Invalid credentials provided'; cause: AuthError };
        }
    >;
    logout: () => Promise<void>;
    getUser: () => Promise<AuthContextUser | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthContextUser | null>(null);
    const router = useRouter();

    // GraphQL query to get current user
    const { data: userData, refetch: refetchUser } = useGetCurrentUserQuery();

    // Update user state when data changes
    React.useEffect(() => {
        if (userData?.me) {
            const authContextUser = {
                id: userData.me.id,
                email: userData.me.email,
                firstName: userData.me.firstName,
                lastName: userData.me.lastName,
                role: userData.me.role,
            }
            setUser(authContextUser);
        }
    }, [userData]);

    const getUser = useCallback(async (): Promise<AuthContextUser | null> => {
        // If we already have a user in context, return it
        if (user) {
            return user;
        }

        // Otherwise, refetch from backend
        try {

            const { data: userData } = await refetchUser();
            if (userData?.me) {
                const authContextUser = {
                    id: userData.me.id,
                    email: userData.me.email,
                    firstName: userData.me.firstName,
                    lastName: userData.me.lastName,
                    role: userData.me.role,
                }
                setUser(authContextUser);
                return authContextUser;
            }
            return null;
        } catch (error) {
            console.error('Failed to fetch user:', error);
            return null;
        }
    }, [user, refetchUser]);

    const login = async (
        email: string,
        password: string
    ): Promise<
        | { success: true; error: null }
        | {
            success: false;
            error: { name: 'INVALID_CREDENTIALS'; message: 'Invalid credentials provided'; cause: AuthError };
        }
    > => {
        try {
            const { error } = await loginAction(email, password);

            if (error) {
                if (error.name === 'INVALID_CREDENTIALS') {
                    return {
                        success: false as const,
                        error: error,
                    };
                } else {
                    console.error('An unexpected error occurred:', error);
                    return {
                        success: false as const,
                        error: error,
                    };
                }
            }

            // After successful login, fetch the user
            await getUser();
            return { success: true as const, error: null };
        } catch (error) {
            console.error('❌ Login error:', error);
            throw error;
        }
    };

    const logout = useCallback(async () => {
        await logoutAction();
        setUser(null); // Clear user from context
        router.push('/login');
    }, [router]);

    const value: AuthContextType = {
        user,
        login,
        logout,
        getUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};