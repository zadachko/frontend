"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/gql/graphql';
import { loginAction, logoutAction } from '@/lib/auth-actions';
import { AuthError } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: true, error: null } | { success: false, error: { name: "INVALID_CREDENTIALS", message: "Invalid credentials provided", cause: AuthError } }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();



  const login = async (email: string, password: string): Promise<{ success: true, error: null } | { success: false, error: { name: "INVALID_CREDENTIALS", message: "Invalid credentials provided", cause: AuthError } }> => {
    try {
      setIsLoading(true);
      const { error } = await loginAction(email, password);


      if (error) {
        if (error.name === 'INVALID_CREDENTIALS') {
          return {
            success: false as const,
            error: error,
          }
        } else {
          console.error('An unexpected error occurred:', error);
          return {
            success: false as const,
            error: error,
          }
        }
      }
      return { success: true as const, error: null }


    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(async () => {

    await logoutAction();
    router.push('/login');

  }, [router]);



  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
