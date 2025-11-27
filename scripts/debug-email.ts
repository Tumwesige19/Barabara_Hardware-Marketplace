import { sendOrderConfirmationEmail } from '../lib/email';

async function testEmail() {
    console.log('Attempting to send test email...');
    const result = await sendOrderConfirmationEmail(
        'tumwesigekabateraine@gmail.com',
        'Test User',
        'TEST-ORDER-123',
        [{ name: 'Test Item', quantity: 1, price: 10000 }],
        10000
    );
    console.log('Email send result:', JSON.stringify(result, null, 2));
}

testEmail();
