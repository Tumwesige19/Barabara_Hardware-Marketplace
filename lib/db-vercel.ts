// PostgreSQL connection for Vercel production
import { PrismaClient } from '@prisma/client';

// Self-healing database URL configuration for pooled environments (e.g. Neon)
if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('-pooler')) {
    try {
        const url = new URL(process.env.DATABASE_URL);
        let modified = false;
        
        if (!url.searchParams.has('pgbouncer')) {
            url.searchParams.set('pgbouncer', 'true');
            modified = true;
        }
        if (!url.searchParams.has('connect_timeout')) {
            url.searchParams.set('connect_timeout', '30');
            modified = true;
        }
        
        if (modified) {
            process.env.DATABASE_URL = url.toString();
            console.log('⚡ Auto-configured DATABASE_URL with pgbouncer=true and connect_timeout=30');
        }
    } catch (e) {
        console.error('Failed to parse and auto-configure DATABASE_URL:', e);
    }
}

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

// Helper to generate IDs
export function generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
