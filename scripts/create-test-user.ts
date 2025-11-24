import { registerUser } from '../app/actions/auth';

async function createTestUser() {
    console.log('Creating test user account...\n');

    const result = await registerUser({
        name: 'Kabateraine',
        email: 'tumwesigekabateraine@gmail.com',
        password: 'TestPassword123',
        phone: '0771234567'
    });

    if (result.success) {
        console.log('✅ User created successfully!');
        console.log('User ID:', result.userId);
        console.log('\nYou can now test password reset with:');
        console.log('Email: tumwesigekabateraine@gmail.com');
    } else {
        console.log('❌ Failed:', result.error);
    }
}

createTestUser();
