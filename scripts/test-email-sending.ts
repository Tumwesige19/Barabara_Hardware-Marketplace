import { requestPasswordReset } from '../app/actions/password-reset';

async function testEmailSending() {
    console.log('🧪 Testing Password Reset Email Sending\n');
    console.log('Email: tumwesigyemaxwell67@gmail.com');
    console.log('Generating 5-digit code and sending email...\n');

    const result = await requestPasswordReset('tumwesigyemaxwell67@gmail.com');

    console.log('═══════════════════════════════════════');
    if (result.success) {
        console.log('✅ SUCCESS!');
        console.log('Message:', result.message);

        if (result.token) {
            console.log('\n⚠️  Email failed to send, but code was generated:');
            console.log('CODE:', result.token);
            console.log('\nThis means the Resend API key might not be configured correctly.');
        } else {
            console.log('\n📧 Email sent successfully!');
            console.log('Check your inbox at: tumwesigyemaxwell67@gmail.com');
            console.log('(Also check spam folder)');
        }
    } else {
        console.log('❌ FAILED');
        console.log('Error:', result.error);
    }
    console.log('═══════════════════════════════════════');
}

testEmailSending();
