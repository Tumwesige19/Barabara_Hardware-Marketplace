import db from '../lib/db';
import { verifyPassword } from '../lib/auth';

async function checkUser() {
    const email = 'tumwesigyemaxwell67@gmail.com';

    console.log('Checking user account...\n');

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;

    if (!user) {
        console.log('❌ No user found with this email!');
        console.log('You need to sign up first.');
        return;
    }

    console.log('✅ User found in database:');
    console.log('- ID:', user.id);
    console.log('- Name:', user.name);
    console.log('- Email:', user.email);
    console.log('- Phone:', user.phone);
    console.log('- Created:', user.created_at);

    // Test password
    const testPassword = '@Barabara123456788';
    console.log('\nTesting password:', testPassword);

    const isValid = await verifyPassword(testPassword, user.password);

    if (isValid) {
        console.log('✅ Password is CORRECT!');
        console.log('\nThe issue might be with NextAuth session. Try:');
        console.log('1. Clear browser cookies');
        console.log('2. Restart the dev server');
        console.log('3. Try logging in again');
    } else {
        console.log('❌ Password does NOT match!');
        console.log('\nThe password in the database is different from what you entered.');
        console.log('You can use the password reset feature to set a new password.');
    }
}

checkUser();
