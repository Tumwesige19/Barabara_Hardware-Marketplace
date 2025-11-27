import dotenv from 'dotenv';
dotenv.config();

// Import after config
import { sendOrderConfirmationEmail } from '../lib/email';

async function testEmail() {
    console.log('Final verification of Gmail SMTP...');
    const recipient = 'tumwesigekabateraine@gmail.com';

    const result = await sendOrderConfirmationEmail(
        recipient,
        'Final Test User',
        'SMTP-FINAL-VERIFY',
        [{ name: 'Success Widget', quantity: 1, price: 100 }],
        100
    );
    console.log('Email send result:', JSON.stringify(result, null, 2));
}

testEmail();
