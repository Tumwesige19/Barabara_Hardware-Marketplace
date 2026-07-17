import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth-config';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow /admin/login through — it's the gate itself, not behind it
    if (pathname === '/admin/login') {
        // If already logged in as admin, skip the login page and go straight to dashboard
        const session = await auth();
        if (session?.user?.role === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    }

    // Guard all other /admin routes
    if (pathname.startsWith('/admin')) {
        const session = await auth();

        // Not logged in → redirect to dedicated admin login page
        if (!session || !session.user) {
            const adminLoginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(adminLoginUrl);
        }

        // Logged in but not an admin → redirect to admin login with error
        if (session.user.role !== 'admin') {
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
