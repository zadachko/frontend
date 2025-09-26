"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useApolloClient } from '@apollo/client';
import type { User, AuthResponse } from '@/gql/graphql';
import { setAuthToken, setRefreshToken, clearAuthTokens, getUser, getRefreshToken } from '@/lib/auth';
import { LoginDocument, RefreshTokenDocument } from '@/gql/operations';
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const client = useApolloClient();

  const isAuthenticated = !!user;

  // Initialize auth state from cookies
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = getUser();
        const storedRefreshToken = getRefreshToken();

        if (storedUser && storedRefreshToken) {
          setUser(storedUser);
          
          // Try to refresh token to get a fresh access token
          try {
            await refreshToken();
          } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      const { data } = await client.mutate({
        mutation: LoginDocument,
        variables: {
          input: { email, password }
        }
      });

      if (data?.login) {
        const { user, accessToken, refreshToken } = data.login;
        
        // Store auth data in cookies only
        setUser(user);
        setAuthToken(accessToken);
        setRefreshToken(refreshToken);
        
        setUser(user);
        
        return data.login;
      }
      
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    // Clear all auth data from cookies
    clearAuthTokens();
    
    setUser(null);
    router.push('/login');
  }, [router]);

  const refreshToken = useCallback(async () => {
    try {
      const storedRefreshToken = getRefreshToken();
      if (!storedRefreshToken) {
        throw new Error('No refresh token available');
      }

      const { data } = await client.mutate({
        mutation: RefreshTokenDocument,
        variables: {
          refreshToken: storedRefreshToken
        }
      });

      if (data?.refreshToken) {
        const { user, accessToken, refreshToken: newRefreshToken } = data.refreshToken;
        
        // Update stored tokens in cookies
        setUser(user);
        setAuthToken(accessToken);
        setRefreshToken(newRefreshToken);
        
        setUser(user);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      throw error;
    }
  }, [logout, client]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
