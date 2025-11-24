'use server';

import db from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { CreateUserData } from '@/lib/db-adapter';

export async function registerUser(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
}) {
    try {
        // Check if user already exists
        const existingUser = await db.findUserByEmail(data.email);

        if (existingUser) {
            return { success: false, error: 'Email already registered' };
        }

        // Hash password
        const hashedPassword = await hashPassword(data.password);

        // Create user
        const userId = `user_${Date.now()}`;
        const now = new Date().toISOString();

        const userData: CreateUserData = {
            id: userId,
            email: data.email,
            name: data.name,
            password: hashedPassword,
            phone: data.phone || null,
            createdAt: now,
            updatedAt: now
        };

        await db.createUser(userData);

        return { success: true, userId };
    } catch (error) {
        console.error('Failed to register user:', error);
        return { success: false, error: 'Failed to create account' };
    }
}

export async function getUserByEmail(email: string) {
    try {
        const user = await db.findUserByEmail(email);
        return user || null;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}
