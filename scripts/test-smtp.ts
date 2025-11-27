import { sendOrderConfirmationEmail } from '../lib/email';
import dotenv from 'dotenv';
dotenv.config();

async function testEmail() {
    console.log('Attempting to send test email via Gmail SMTP...');
    // Sending to the OTHER email address the user wanted to use
    const recipient = 'tumwesigekabateraine@gmail.com';

    const result = await sendOrderConfirmationEmail(
        recipient,
        'Test Customer',
        'SMTP-TEST-001',
        [{ name: 'Test Widget', quantity: 2, price: 5000 }],
        10000
    );
    console.log('Email send result:', JSON.stringify(result, null, 2));
}

testEmail();
