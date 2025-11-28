import { NextResponse } from 'next/server';
import { isUsingPostgres } from '@/lib/db';

export async function GET() {
    return NextResponse.json({
        environment: process.env.NODE_ENV,
        usingPostgres: isUsingPostgres,
        databaseUrlSet: !!process.env.DATABASE_URL,
        timestamp: new Date().toISOString(),
    });
}
