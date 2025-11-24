import { requestPasswordReset } from '../app/actions/password-reset';

async function testPasswordReset() {
    const email = 'tumwesigekabateraine@gmail.com';

    console.log('Testing password reset for:', email);
    console.log('Generating 5-digit code...\n');

    const result = await requestPasswordReset(email);

    if (result.success) {
        console.log('✅ Success!');
        console.log('Message:', result.message);

        if (result.token) {
            console.log('\n📧 Email failed to send, but here is the code:');
            console.log('═══════════════════════════════════════');
            console.log(`     CODE: ${result.token}     `);
            console.log('═══════════════════════════════════════');
            console.log('\nNote: To actually send emails, you need to:');
            console.log('1. Get a Resend API key from https://resend.com');
            console.log('2. Add RESEND_API_KEY to your .env file');
            console.log('3. Restart the server');
        } else {
            console.log('\n✅ Email sent successfully!');
            console.log('Check your inbox at:', email);
        }
    } else {
        console.log('❌ Failed:', result.error);
    }
}

testPasswordReset();
