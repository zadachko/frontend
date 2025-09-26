import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { from } from '@apollo/client';
import { getCookie } from './cookies';

// In-memory storage for access token (Option A)
let accessToken: string | null = null;

export const getAuthToken = (): string | null => {
  return accessToken;
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return getCookie('refreshToken');
};

export const getUser = (): any | null => { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (typeof window === 'undefined') return null;
  const userCookie = getCookie('user');
  return userCookie ? JSON.parse(userCookie) : null;
};

export const setAuthToken = (token: string): void => {
  accessToken = token;
};

export const setRefreshToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  document.cookie = `refreshToken=${token}; path=/; max-age=${30 * 24 * 60 * 60}; secure; samesite=strict; httponly`;
};

export const setUser = (user: any): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (typeof window === 'undefined') return;
  document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
};

export const clearAuthTokens = (): void => {
  accessToken = null;
  if (typeof window === 'undefined') return;
  document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

// Apollo auth link for adding authorization headers
export const createAuthLink = (refreshTokenCallback?: () => Promise<void>) => {
  const authLink = setContext((_, { headers }) => {
    const token = getAuthToken();
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions?.code) {
          case 'UNAUTHENTICATED':
            // Token expired, try to refresh
            const refreshToken = getRefreshToken();
            if (refreshToken && refreshTokenCallback) {
              refreshTokenCallback().then(() => {
                // Retry the original request with new token
                return forward(operation);
              }).catch(() => {
                // Refresh failed, redirect to login
                clearAuthTokens();
                window.location.href = '/login';
              });
            } else {
              // No refresh token or callback, redirect to login
              clearAuthTokens();
              window.location.href = '/login';
            }
            break;
        }
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  return from([authLink, errorLink]);
};
