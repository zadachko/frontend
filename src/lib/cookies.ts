/**
 * Utility functions for managing authentication cookies
 */

export const setAuthCookies = (accessToken: string, refreshToken: string, user?: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (typeof document === 'undefined') return;
  
  // Set access token cookie (7 days)
  document.cookie = `accessToken=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
  
  // Set refresh token cookie (30 days)
  document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${30 * 24 * 60 * 60}; secure; samesite=strict`;
  
  // Set user cookie if provided (7 days)
  if (user) {
    document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
  }
};

export const clearAuthCookies = () => {
  if (typeof document === 'undefined') return;
  
  // Clear all auth cookies
  document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

export const getUserFromCookie = (): any | null => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const userCookie = getCookie('user');
  return userCookie ? JSON.parse(userCookie) : null;
};

export const getAuthTokenFromCookie = (): string | null => {
  return getCookie('accessToken');
};

export const getRefreshTokenFromCookie = (): string | null => {
  return getCookie('refreshToken');
};


