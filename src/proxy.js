// src/proxy.ts
import { NextResponse } from 'next/server'


// The function is now named 'proxy'
export function proxy(request) {
  const { pathname } = request.nextUrl;

  // 1. LIGHTWEIGHT AUTH CHECK (Optimistic)
  // Check for the presence of a session cookie only.
  // Do NOT fetch user data or query databases here.
  const session = request.cookies.get('auth-token');

  if (pathname.startsWith('/') && !session) {
    // Redirect to login if no cookie exists
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // 2. HEADER MODIFICATION
  // Use the proxy to inject request headers for downstream Route Handlers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  // Protect all routes starting with /admin
  if (pathname.startsWith('/admin')) {
    // For MVP: Check for a secret cookie or header
    // In production, you'd verify a Supabase Auth session here
    const adminSecret = request.cookies.get('admin_access')?.value;

    if (adminSecret !== process.env.ADMIN_PASS) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Matcher remains the same
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/protected/:path*',
    '/home/:path*',
  
  ],
}