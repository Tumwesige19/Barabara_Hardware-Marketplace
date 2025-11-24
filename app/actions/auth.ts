'use server';

import prisma from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function registerUser(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
}) {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            return { success: false, error: 'Email already registered' };
        }

        // Hash password
        const hashedPassword = await hashPassword(data.password);

        // Create user
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                phone: data.phone || null,
            }
        });

        return { success: true, userId: user.id };
    } catch (error) {
        console.error('Failed to register user:', error);
        return { success: false, error: 'Failed to create account' };
    }
}

export async function getUserByEmail(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user || null;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}
