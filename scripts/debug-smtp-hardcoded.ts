import nodemailer from 'nodemailer';

async function testEmail() {
    console.log('Testing with HARDCODED credentials...');

    // Hardcoded for debugging - DO NOT COMMIT
    const user = 'tumwesigyemaxwell67@gmail.com';
    const pass = 'grksmhjnwcnhnxsd'; // No spaces

    console.log(`User: ${user}`);
    console.log(`Pass length: ${pass.length}`);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: pass,
        },
    });

    console.log('Attempting to send test email...');
    try {
        const info = await transporter.sendMail({
            from: `"Barabara Hardware" <${user}>`,
            to: 'tumwesigekabateraine@gmail.com',
            subject: 'SMTP Hardcoded Test',
            text: 'This is a test email with hardcoded credentials.',
        });
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

testEmail();
