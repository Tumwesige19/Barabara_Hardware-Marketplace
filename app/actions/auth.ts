'use server';

import db, { generateId } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function registerUser(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
}) {
    try {
        // Check if user already exists
        const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(data.email);

        if (existingUser) {
            return { success: false, error: 'Email already registered' };
        }

        // Hash password
        const hashedPassword = await hashPassword(data.password);

        // Create user
        const userId = generateId();
        const stmt = db.prepare(`
            INSERT INTO users (id, email, password, name, phone)
            VALUES (?, ?, ?, ?, ?)
        `);

        stmt.run(userId, data.email, hashedPassword, data.name, data.phone || null);

        return { success: true, userId };
    } catch (error) {
        console.error('Failed to register user:', error);
        return { success: false, error: 'Failed to create account' };
    }
}

export async function getUserByEmail(email: string) {
    try {
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
        return user || null;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}
