"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/gql/graphql';
import { loginAction, logoutAction } from '@/lib/auth-actions';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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



  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const { error } = await loginAction(email, password);


      if (error) {
        if (error.code === 'invalid_credentials') {
          console.log("Mde a toast", error.message);

        } else {
          console.error('An unexpected error occurred:', error);
        }
      }


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
