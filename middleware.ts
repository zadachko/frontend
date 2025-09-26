import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes that require authentication
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

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/about',
  '/contact',
  '/pricing'
]

// Note: JWT validation removed since we now use refresh token for middleware checks

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )
  
  // Check for refresh token in cookies (since access token is in memory)
  const refreshToken = request.cookies.get('refreshToken')?.value
  const hasRefreshToken = !!refreshToken
  
  // If it's a protected route and no refresh token, redirect to login
  if (isProtectedRoute && !hasRefreshToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // If user has refresh token and trying to access auth pages, redirect to platform
  if (hasRefreshToken && (pathname === '/login' || pathname === '/register')) {
    const redirectUrl = request.nextUrl.searchParams.get('redirect')
    return NextResponse.redirect(new URL(redirectUrl || '/platform', request.url))
  }
  
  // If user is not authenticated and trying to access public routes, allow
  if (isPublicRoute) {
    return NextResponse.next()
  }
  
  // For any other route, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
