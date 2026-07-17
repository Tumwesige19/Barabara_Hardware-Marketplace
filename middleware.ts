import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Read the JWT token directly — works on Edge runtime
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    });

    // Guard all /admin/** routes (NOT /admin-login — that's outside this matcher)
    if (pathname.startsWith('/admin')) {

        // Not signed in → redirect to admin login page
        if (!token) {
            return NextResponse.redirect(new URL('/admin-login', request.url));
        }

        // Signed in but not an admin → redirect to admin login with error
        if (token.role !== 'admin') {
            const loginUrl = new URL('/admin-login', request.url);
            loginUrl.searchParams.set('error', 'Access denied. Admin privileges required.');
            return NextResponse.redirect(loginUrl);
        }

        // role === 'admin' → let through
    }

    // If already signed in as admin and trying to visit /admin-login, skip to dashboard
    if (pathname === '/admin-login' && token?.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

// Only run on /admin routes — /admin-login is completely separate and unprotected
export const config = {
    matcher: ['/admin', '/admin/:path*', '/admin-login'],
};
