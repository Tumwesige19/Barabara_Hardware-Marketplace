import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Explicitly load .env
dotenv.config();

async function testEmail() {
    console.log('Checking environment variables...');
    console.log('SMTP_EMAIL:', process.env.SMTP_EMAIL ? 'Set' : 'Not Set');
    console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? 'Set' : 'Not Set');

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
        console.error('Missing credentials!');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    console.log('Attempting to send test email via Gmail SMTP...');
    try {
        const info = await transporter.sendMail({
            from: `"Barabara Hardware" <${process.env.SMTP_EMAIL}>`,
            to: 'tumwesigekabateraine@gmail.com',
            subject: 'SMTP Test Debug',
            text: 'This is a test email from Barabara Hardware using Gmail SMTP.',
        });
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

testEmail();
