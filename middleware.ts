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
  
  // Check for both user and refresh token in cookies
  const refreshToken = request.cookies.get('refreshToken')?.value
  const userCookie = request.cookies.get('user')?.value
  const hasRefreshToken = !!refreshToken
  const hasUser = !!userCookie
  
  // Debug logging
  console.log('🔍 Middleware check:', {
    pathname,
    hasRefreshToken,
    hasUser,
    isProtectedRoute,
    isPublicRoute
  })
  
  // If it's a protected route and missing either token or user, redirect to login
  if (isProtectedRoute && (!hasRefreshToken || !hasUser)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // If user has both refresh token and user data and trying to access auth pages, redirect to platform
  if (hasRefreshToken && hasUser && (pathname === '/login' || pathname === '/register')) {
    console.log('🔄 Redirecting authenticated user away from auth page')
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
