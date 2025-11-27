import dotenv from 'dotenv';
dotenv.config();

async function testEmail() {
    console.log('Final verification (Dynamic Import)...');
    // Dynamic import ensures env is loaded first
    const { sendOrderConfirmationEmail } = await import('../lib/email');

    const recipient = 'tumwesigekabateraine@gmail.com';

    const result = await sendOrderConfirmationEmail(
        recipient,
        'Dynamic Test User',
        'SMTP-DYNAMIC-VERIFY',
        [{ name: 'Success Widget', quantity: 1, price: 100 }],
        100
    );
    console.log('Email send result:', JSON.stringify(result, null, 2));
}

testEmail();
