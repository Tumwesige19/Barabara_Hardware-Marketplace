
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth-config';

export async function middleware(request: NextRequest) {
    const deploymentMode = process.env.NEXT_PUBLIC_DEPLOYMENT_MODE; // 'admin' or 'store' (default)
    const path = request.nextUrl.pathname;

    // 1. Admin Portal Mode
    if (deploymentMode === 'admin') {
        // If accessing root, redirect to admin dashboard
        if (path === '/') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        // Allow everything else (admin routes, login, api, etc.)
        return NextResponse.next();
    }

    // 2. Store Mode (Default)
    // Block access to /admin routes
    if (path.startsWith('/admin')) {
        // Redirect to home or show 404 (Redirecting to home is smoother for users)
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
