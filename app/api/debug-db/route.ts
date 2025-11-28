import { NextResponse } from 'next/server';
import { isUsingPostgres } from '@/lib/db';

export async function GET() {
    const dbUrl = process.env.DATABASE_URL || '';
    let host = 'Not set';
    if (dbUrl) {
        try {
            const url = new URL(dbUrl);
            host = url.hostname;
        } catch (e) {
            host = 'Invalid URL format';
        }
    }

    return NextResponse.json({
        environment: process.env.NODE_ENV,
        usingPostgres: isUsingPostgres,
        connectedHost: host,
        timestamp: new Date().toISOString(),
    });
}
