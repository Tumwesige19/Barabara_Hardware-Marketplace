import { registerUser } from '../app/actions/auth';

async function testSignup() {
    console.log('Testing signup functionality...\n');

    const testData = {
        name: 'Kabateraine Tumwesige',
        email: 'tumwesigyemaxwell67@gmail.com',
        password: 'password123',
        phone: '0771234567'
    };

    console.log('Attempting to register user:', {
        name: testData.name,
        email: testData.email,
        phone: testData.phone
    });

    const result = await registerUser(testData);

    if (result.success) {
        console.log('\n✅ SUCCESS! User registered successfully!');
        console.log('User ID:', result.userId);
        console.log('\nYou can now log in with:');
        console.log('Email:', testData.email);
        console.log('Password:', testData.password);
    } else {
        console.log('\n❌ FAILED! Error:', result.error);
    }
}

testSignup();
