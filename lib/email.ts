import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(to: string, token: string, userName: string) {
    try {
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password`;

        const { data, error } = await resend.emails.send({
            from: 'Barabara Hardware <onboarding@resend.dev>',
            to: [to],
            subject: 'Your Password Reset Code - Barabara Hardware',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #131921; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; }
                        .code-box { 
                            background: linear-gradient(135deg, #febd69 0%, #f3a847 100%);
                            color: #131921;
                            padding: 30px;
                            border-radius: 10px;
                            text-align: center;
                            font-size: 48px;
                            font-weight: bold;
                            letter-spacing: 10px;
                            margin: 30px 0;
                            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                        .warning { background-color: #fff3cd; border-left: 4px solid #febd69; padding: 15px; margin: 20px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🔐 Barabara Hardware</h1>
                        </div>
                        <div class="content">
                            <h2>Password Reset Code</h2>
                            <p>Hello ${userName},</p>
                            <p>We received a request to reset your password. Use the code below to reset it:</p>
                            
                            <div class="code-box">${token}</div>
                            
                            <p style="text-align: center; margin-top: 20px;">
                                <a href="${resetUrl}" style="display: inline-block; background-color: #131921; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                                    Reset Password Now
                                </a>
                            </p>
                            
                            <div class="warning">
                                <strong>⏰ This code expires in 1 hour</strong><br>
                                For security, this code can only be used once.
                            </div>
                            
                            <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
                        </div>
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} Barabara Hardware. All rights reserved.</p>
                            <p>This is an automated email. Please do not reply.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error('Failed to send email:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Email service error:', error);
        return { success: false, error: 'Failed to send email' };
    }
}

export async function sendOrderStatusEmail(to: string, userName: string, orderId: string, status: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Barabara Hardware <onboarding@resend.dev>',
            to: [to],
            subject: `Order Update: #${orderId} is ${status}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #131921; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; }
                        .status-badge {
                            display: inline-block;
                            padding: 10px 20px;
                            border-radius: 50px;
                            background-color: #131921;
                            color: white;
                            font-weight: bold;
                            margin: 20px 0;
                        }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>📦 Order Update</h1>
                        </div>
                        <div class="content">
                            <h2>Hello ${userName},</h2>
                            <p>Good news! The status of your order <strong>#${orderId}</strong> has been updated.</p>
                            
                            <div style="text-align: center;">
                                <div class="status-badge">
                                    Current Status: ${status}
                                </div>
                            </div>
                            
                            <p>Thank you for shopping with Barabara Hardware World.</p>
                        </div>
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} Barabara Hardware. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error('Failed to send email:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Email service error:', error);
        return { success: false, error: 'Failed to send email' };
    }
}
