import { sendOrderConfirmationEmail } from '../lib/email';

async function testEmail() {
    console.log('Attempting to send test email to verified address...');
    // Using the email from the Resend dashboard screenshot
    const result = await sendOrderConfirmationEmail(
        'tumwesigyemaxwell67@gmail.com',
        'Maxwell Test',
        'TEST-ORDER-VERIFIED',
        [{ name: 'Test Item', quantity: 1, price: 10000 }],
        10000
    );
    console.log('Email send result:', JSON.stringify(result, null, 2));
}

testEmail();
