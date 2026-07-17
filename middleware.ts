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

    // Allow /admin/login through — it's the gate itself, not behind it
    if (pathname === '/admin/login') {
        // Already signed in as admin? Skip the login page → go straight to dashboard
        if (token?.role === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    }

    // Guard all other /admin/** routes
    if (pathname.startsWith('/admin')) {

        // Not signed in at all → send to admin login
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Signed in but not an admin → send to admin login with error
        if (token.role !== 'admin') {
            const adminLoginUrl = new URL('/admin/login', request.url);
            adminLoginUrl.searchParams.set('error', 'Access denied. Admin privileges required.');
            return NextResponse.redirect(adminLoginUrl);
        }
    }

    return NextResponse.next();
}

// Run on all /admin routes including /admin/login
export const config = {
    matcher: ['/admin', '/admin/:path*'],
};
