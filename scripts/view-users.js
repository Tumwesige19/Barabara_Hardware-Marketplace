const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(process.cwd(), 'prisma/dev.db');
const db = new Database(dbPath);

console.log('='.repeat(60));
console.log('USER ACCOUNTS IN DATABASE');
console.log('='.repeat(60));

try {
    const users = db.prepare('SELECT * FROM "User"').all();

    if (users.length === 0) {
        console.log('\n❌ No users found in database.\n');
        console.log('You can create a new account by:');
        console.log('1. Going to http://localhost:3000/signup');
        console.log('2. Or running the seed script\n');
    } else {
        console.log(`\n✅ Found ${users.length} user(s):\n`);

        users.forEach((user, index) => {
            console.log(`${index + 1}. User Details:`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Name: ${user.name}`);
            console.log(`   ID: ${user.id}`);
            console.log(`   Created: ${new Date(user.createdAt).toLocaleString()}`);
            console.log(`   Password Hash: ${user.password.substring(0, 20)}...`);
            console.log('');
        });

        console.log('='.repeat(60));
        console.log('PASSWORD RESET OPTIONS:');
        console.log('='.repeat(60));
        console.log('\n1. Use "Forgot Password" feature:');
        console.log('   - Go to http://localhost:3000/forgot-password');
        console.log('   - Enter your email');
        console.log('   - Check your email for reset link\n');

        console.log('2. Reset password directly (for development):');
        console.log('   - I can create a script to update your password');
        console.log('   - Just provide your email and new password\n');

        console.log('3. Create a new account:');
        console.log('   - Go to http://localhost:3000/signup');
        console.log('   - Use a different email address\n');
    }
} catch (error) {
    console.error('❌ Error accessing database:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure the database file exists at: prisma/dev.db');
    console.log('2. Run: npx prisma generate');
    console.log('3. Run: npx prisma db push');
}

db.close();
