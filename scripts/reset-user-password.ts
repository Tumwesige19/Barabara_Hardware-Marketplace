import db from '../lib/db';
import { hashPassword } from '../lib/auth';

async function resetUserPassword() {
    const email = 'tumwesigyemaxwell67@gmail.com';
    const newPassword = '@Barabara123456788';

    console.log('Resetting password for:', email);
    console.log('New password:', newPassword);
    console.log('');

    // Check if user exists
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;

    if (!user) {
        console.log('❌ User not found!');
        return;
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    db.prepare('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?')
        .run(hashedPassword, email);

    console.log('✅ Password has been reset successfully!');
    console.log('');
    console.log('You can now log in with:');
    console.log('Email:', email);
    console.log('Password:', newPassword);
}

resetUserPassword();
