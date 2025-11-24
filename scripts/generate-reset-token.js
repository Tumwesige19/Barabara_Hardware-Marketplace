const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.join(process.cwd(), 'prisma/dev.db');
const db = new Database(dbPath);

console.log('='.repeat(70));
console.log('PASSWORD RESET TOKEN GENERATOR');
console.log('='.repeat(70));

try {
    // Show all users
    const users = db.prepare('SELECT id, email, name FROM "User"').all();

    if (users.length === 0) {
        console.log('\n❌ No users found in database.\n');
        db.close();
        return;
    }

    console.log('\n📋 Available users:\n');
    users.forEach((user, i) => {
        console.log(`   ${i + 1}. ${user.email} (${user.name})`);
    });

    console.log('\n' + '='.repeat(70));
    console.log('GENERATING RESET TOKENS FOR ALL USERS');
    console.log('='.repeat(70) + '\n');

    users.forEach((user) => {
        // Generate a secure random token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        // Update user with reset token
        const stmt = db.prepare(`
            UPDATE "User" 
            SET resetToken = ?, resetTokenExpiry = ? 
            WHERE id = ?
        `);

        stmt.run(resetToken, resetTokenExpiry.toISOString(), user.id);

        console.log(`✅ User: ${user.email}`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Token: ${resetToken}`);
        console.log(`   Expires: ${resetTokenExpiry.toLocaleString()}`);
        console.log(`   Reset Link: http://localhost:3000/reset-password?token=${resetToken}`);
        console.log('');
    });

    console.log('='.repeat(70));
    console.log('INSTRUCTIONS:');
    console.log('='.repeat(70));
    console.log('\n1. Copy the reset link for your email');
    console.log('2. Paste it in your browser');
    console.log('3. Enter your new password');
    console.log('4. Click "Reset Password"\n');
    console.log('Note: Tokens expire in 1 hour\n');

} catch (error) {
    console.error('❌ Error:', error.message);

    // Check if resetToken columns exist
    if (error.message.includes('no such column')) {
        console.log('\n⚠️  The User table needs resetToken columns.');
        console.log('Adding them now...\n');

        try {
            db.exec(`
                ALTER TABLE "User" ADD COLUMN resetToken TEXT;
                ALTER TABLE "User" ADD COLUMN resetTokenExpiry TEXT;
            `);
            console.log('✅ Columns added! Run this script again.\n');
        } catch (alterError) {
            console.log('❌ Could not add columns:', alterError.message);
            console.log('\nAlternative: Use the direct password reset script:');
            console.log('   node scripts/reset-password.js\n');
        }
    }
} finally {
    db.close();
}
