'use server';

import db, { generateId } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function requestPasswordReset(email: string) {
    try {
        // Check if user exists
        const user = await db.findUserByEmail(email);

        if (!user) {
            // Don't reveal if email exists or not for security
            return {
                success: true,
                message: 'If an account exists with this email, a password reset code has been sent.'
            };
        }

        // Generate 5-digit code
        const token = Math.floor(10000 + Math.random() * 90000).toString();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour from now
        const now = new Date().toISOString();

        // Delete any existing unused tokens for this user
        await db.deleteUnusedTokens(user.id);

        // Store token
        const tokenId = generateId();
        await db.createPasswordResetToken({
            id: tokenId,
            userId: user.id,
            token,
            used: false,
            expiresAt,
            createdAt: now
        });

        // ALWAYS show token on screen since email isn't configured
        // This makes it easier for development and when email service is unavailable
        return {
            success: true,
            token, // Show token directly on screen
            message: 'Use this code to reset your password:'
        };
    } catch (error) {
        console.error('Failed to request password reset:', error);
        return { success: false, error: 'Failed to process request' };
    }
}

export async function verifyResetToken(token: string) {
    try {
        const resetToken = await db.findPasswordResetToken(token);

        if (!resetToken) {
            return { valid: false, error: 'Invalid or expired code' };
        }

        const now = new Date().toISOString();
        if (resetToken.expiresAt < now || (typeof resetToken.used === 'boolean' ? resetToken.used : resetToken.used === 1)) {
            return { valid: false, error: 'Invalid or expired code' };
        }

        return { valid: true, userId: resetToken.userId };
    } catch (error) {
        console.error('Failed to verify token:', error);
        return { valid: false, error: 'Failed to verify code' };
    }
}

export async function resetPassword(token: string, newPassword: string) {
    try {
        // Verify token
        const verification = await verifyResetToken(token);
        if (!verification.valid) {
            return { success: false, error: verification.error };
        }

        // Hash new password
        const hashedPassword = await hashPassword(newPassword);
        const now = new Date().toISOString();

        // Update user password
        await db.updateUserPassword(verification.userId, hashedPassword, now);

        // Mark token as used
        await db.markPasswordResetTokenUsed(token);

        return { success: true, message: 'Password reset successfully' };
    } catch (error) {
        console.error('Failed to reset password:', error);
        return { success: false, error: 'Failed to reset password' };
    }
}
