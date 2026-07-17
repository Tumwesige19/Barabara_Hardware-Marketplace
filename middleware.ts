import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth-config';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only guard /admin routes
    if (pathname.startsWith('/admin')) {
        const session = await auth();

        // Not logged in at all → redirect to login with a return URL
        if (!session || !session.user) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            loginUrl.searchParams.set('error', 'Please sign in to access the admin portal.');
            return NextResponse.redirect(loginUrl);
        }

        // Logged in but not an admin → redirect to home with error
        if (session.user.role !== 'admin') {
            const homeUrl = new URL('/', request.url);
            homeUrl.searchParams.set('error', 'Access denied. Admin privileges required.');
            return NextResponse.redirect(homeUrl);
        }
    }

    return NextResponse.next();
}

// Only run this middleware on /admin routes
export const config = {
    matcher: ['/admin', '/admin/:path*'],
};
