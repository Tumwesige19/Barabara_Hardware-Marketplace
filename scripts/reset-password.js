const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const dbPath = path.join(process.cwd(), 'prisma/dev.db');
const db = new Database(dbPath);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('='.repeat(60));
console.log('PASSWORD RESET TOOL');
console.log('='.repeat(60));

// Show available users
const users = db.prepare('SELECT email, name FROM "User"').all();
console.log('\n📋 Available users:');
users.forEach((user, i) => {
    console.log(`   ${i + 1}. ${user.email} (${user.name})`);
});
console.log('');

rl.question('Enter your email address: ', (email) => {
    rl.question('Enter your new password: ', async (newPassword) => {
        try {
            // Check if user exists
            const user = db.prepare('SELECT * FROM "User" WHERE email = ?').get(email);

            if (!user) {
                console.log(`\n❌ No user found with email: ${email}`);
                console.log('Please check the email address and try again.\n');
                rl.close();
                db.close();
                return;
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the password
            const stmt = db.prepare('UPDATE "User" SET password = ? WHERE email = ?');
            stmt.run(hashedPassword, email);

            console.log('\n✅ Password updated successfully!');
            console.log(`\nYou can now login with:`);
            console.log(`   Email: ${email}`);
            console.log(`   Password: ${newPassword}`);
            console.log(`\nGo to: http://localhost:3000/login\n`);

        } catch (error) {
            console.error('\n❌ Error updating password:', error.message);
        } finally {
            rl.close();
            db.close();
        }
    });
});
