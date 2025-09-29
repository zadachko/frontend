# Authentication Middleware

This document explains the Next.js middleware implementation for authentication protection.

## Overview

The middleware provides route-level authentication protection by:
- Checking authentication tokens before pages load
- Redirecting unauthenticated users to login
- Preventing authenticated users from accessing auth pages
- Validating JWT token structure and expiration

## Implementation

### 1. Middleware File (`middleware.ts`)

The middleware runs on every request and:

```typescript
// Protected routes that require authentication
const protectedRoutes = [
  '/platform',
  '/platform/categories',
  '/platform/exam',
  '/platform/test',
  '/platform/exercises',
  '/platform/problems',
  '/platform/results',
  '/platform/settings'
]

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/about',
  '/contact',
  '/pricing'
]
```

### 2. Token Validation

The middleware includes JWT token validation:

```typescript
function isValidJWT(token: string): boolean {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false
    
    const header = JSON.parse(atob(parts[0]))
    const payload = JSON.parse(atob(parts[1]))
    
    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return false
    }
    
    return true
  } catch {
    return false
  }
}
```

### 3. Cookie Management

Authentication tokens are stored in both localStorage and cookies:

```typescript
// Set cookies for middleware access
setAuthCookies(accessToken, refreshToken);

// Clear cookies on logout
clearAuthCookies();
```

## How It Works

### 1. **Protected Route Access**
- User tries to access `/platform/dashboard`
- Middleware checks for valid authentication token
- If no token or invalid token → redirect to `/login?redirect=/platform/dashboard`
- If valid token → allow access

### 2. **Authentication Pages**
- Authenticated user tries to access `/login`
- Middleware detects valid token
- Redirects to `/platform` (or original redirect URL)

### 3. **Public Routes**
- No authentication required
- Always accessible

## Features

### ✅ **Route Protection**
- Automatic redirects for unauthenticated users
- Preserves intended destination in redirect URL
- Prevents access to auth pages when already logged in

### ✅ **Token Validation**
- JWT structure validation
- Expiration checking
- Secure cookie handling

### ✅ **Performance**
- Runs at the edge (fast)
- No client-side JavaScript required for basic protection
- Works with SSR and static generation

### ✅ **Security**
- Tokens stored in secure, HTTP-only cookies
- SameSite protection against CSRF
- Automatic token cleanup on logout

## Configuration

### Route Configuration

Add new protected routes:
```typescript
const protectedRoutes = [
  '/platform',
  '/admin',        // Add new protected route
  '/dashboard'     // Add new protected route
]
```

Add new public routes:
```typescript
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/help',         // Add new public route
  '/faq'           // Add new public route
]
```

### Middleware Matcher

The middleware runs on all routes except:
- API routes (`/api/*`)
- Static files (`/_next/static/*`)
- Image optimization (`/_next/image/*`)
- Favicon (`/favicon.ico`)
- Public folder (`/public/*`)

## Usage Examples

### 1. **Basic Protection**
```typescript
// Any route starting with /platform is protected
// User must be authenticated to access
```

### 2. **Redirect Handling**
```typescript
// User tries to access /platform/settings
// Gets redirected to /login?redirect=/platform/settings
// After login, automatically redirected back to /platform/settings
```

### 3. **Auth Page Protection**
```typescript
// Authenticated user tries to access /login
// Gets redirected to /platform
```

## Testing

### Test Protected Routes
1. Try accessing `/platform` without authentication
2. Should redirect to `/login?redirect=/platform`
3. After login, should redirect back to `/platform`

### Test Auth Pages
1. Login to the application
2. Try accessing `/login` or `/register`
3. Should redirect to `/platform`

### Test Public Routes
1. Access `/`, `/about`, `/contact` without authentication
2. Should work normally

## Troubleshooting

### Common Issues

1. **Middleware Not Running**
   - Check the `config.matcher` in `middleware.ts`
   - Ensure the file is in the root directory

2. **Infinite Redirects**
   - Check route configuration
   - Ensure public routes are properly defined

3. **Token Not Found**
   - Verify cookies are being set correctly
   - Check browser developer tools for cookies

4. **Token Validation Fails**
   - Check JWT token format
   - Verify token expiration logic

## Security Considerations

### ✅ **Implemented**
- Secure cookie settings
- SameSite protection
- Token expiration validation
- Automatic cleanup on logout

### 🔄 **Future Enhancements**
- Rate limiting for login attempts
- CSRF token protection
- Session management
- Multi-factor authentication support

## Integration with AuthContext

The middleware works seamlessly with the AuthContext:

1. **Login**: Sets cookies for middleware access
2. **Logout**: Clears cookies to prevent access
3. **Token Refresh**: Updates cookies with new tokens
4. **Route Protection**: Middleware handles redirects before React loads

This provides a comprehensive authentication system with both client-side and server-side protection.


