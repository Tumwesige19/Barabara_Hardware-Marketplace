'use server';

import db, { generateId } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function requestPasswordReset(email: string) {
    try {
        // Check if user exists
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;

        if (!user) {
            // Don't reveal if email exists or not for security
            return {
                success: true,
                message: 'If an account exists with this email, a password reset code has been sent.'
            };
        }

        // Generate 5-digit code
        const token = Math.floor(10000 + Math.random() * 90000).toString();
        const tokenId = generateId();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        // Delete any existing unused tokens for this user
        db.prepare('DELETE FROM password_reset_tokens WHERE user_id = ? AND used = 0').run(user.id);

        // Store token
        db.prepare(`
            INSERT INTO password_reset_tokens (id, user_id, token, expires_at)
            VALUES (?, ?, ?, ?)
        `).run(tokenId, user.id, token, expiresAt.toISOString());

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
        const resetToken = db.prepare(`
            SELECT * FROM password_reset_tokens 
            WHERE token = ? AND used = 0 AND expires_at > datetime('now')
        `).get(token) as any;

        if (!resetToken) {
            return { valid: false, error: 'Invalid or expired code' };
        }

        return { valid: true, userId: resetToken.user_id };
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

        // Update user password
        db.prepare('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
            .run(hashedPassword, verification.userId);

        // Mark token as used
        db.prepare('UPDATE password_reset_tokens SET used = 1 WHERE token = ?').run(token);

        return { success: true, message: 'Password reset successfully' };
    } catch (error) {
        console.error('Failed to reset password:', error);
        return { success: false, error: 'Failed to reset password' };
    }
}
