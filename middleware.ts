import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Read the JWT token directly — works on Edge runtime
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    });

    // If already signed in as admin and visiting the login page → skip to dashboard
    if (pathname === '/admin-login') {
        if (token?.role === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        // Not admin → show the login page normally
        return NextResponse.next();
    }

    // Guard /admin exactly, and /admin/* (with trailing slash) — but NOT /admin-login
    // IMPORTANT: use pathname === '/admin' || pathname.startsWith('/admin/')
    // so that /admin-login (which starts with /admin but NOT /admin/) is never caught
    const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');

    if (isAdminRoute) {
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

        // role === 'admin' → allow through ✅
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/admin/:path*', '/admin-login'],
};
