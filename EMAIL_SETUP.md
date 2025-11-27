I# Email Setup Instructions

## To Enable Email Sending:

### 1. Get a Resend API Key
1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email
4. Go to API Keys section
5. Create a new API key
6. Copy the API key

### 2. Add API Key to Environment Variables
Add this line to your `.env` file:
```
RESEND_API_KEY=re_your_api_key_here
```

### 3. Configure Sender Email
In `lib/email.ts`, update the `from` field:
```typescript
from: 'Your Name <noreply@yourdomain.com>'
```

**Note:** With Resend's free tier, you can only send emails from verified domains. For testing, you can send to your own email address.

### 4. Test It
1. Restart your dev server
2. Go to `/forgot-password`
3. Enter your email
4. Check your inbox for the reset link!

## Current Behavior (Without API Key):
- If `RESEND_API_KEY` is not set, the system will fall back to displaying the reset token on screen
- This allows the feature to work even without email configuration
