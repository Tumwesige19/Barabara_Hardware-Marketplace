# Resend Email Setup Guide

## Step 1: Create a Resend Account

1. Go to **https://resend.com**
2. Click **"Sign Up"** (top right)
3. Sign up with your email (tumwesigyemaxwell67@gmail.com)
4. Verify your email address

## Step 2: Get Your API Key

1. After logging in, you'll be on the dashboard
2. Click **"API Keys"** in the left sidebar
3. Click **"Create API Key"**
4. Give it a name like "Barabara Hardware"
5. Click **"Add"**
6. **COPY THE API KEY** (it starts with `re_`)
   - ⚠️ You can only see this once! Save it somewhere safe

## Step 3: Add API Key to Your Project

1. Open the `.env` file in your project root
2. Add this line (replace with your actual key):
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
3. Save the file

## Step 4: Configure Sender Email (IMPORTANT!)

With Resend's free tier, you can only send emails **from** a verified domain. For testing, Resend provides a test domain:

**Option A: Use Resend's Test Domain (Easiest for Testing)**
1. Open `lib/email.ts`
2. Change the `from` field to:
   ```typescript
   from: 'Barabara Hardware <onboarding@resend.dev>'
   ```
3. ⚠️ **Note**: Emails from `@resend.dev` may go to spam. Check your spam folder!

**Option B: Use Your Own Domain (For Production)**
1. In Resend dashboard, click **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain name
4. Add the DNS records they provide to your domain
5. Wait for verification
6. Use: `from: 'Barabara Hardware <noreply@yourdomain.com>'`

## Step 5: Update the Sender Email

I'll update the code to use Resend's test domain for now.

## Step 6: Restart Your Server

1. Stop the dev server (Ctrl+C in terminal)
2. Run: `npm run dev`
3. The new environment variable will be loaded

## Step 7: Test It!

1. Go to `/forgot-password`
2. Enter: tumwesigyemaxwell67@gmail.com
3. Click "Request Reset Code"
4. **Check your email inbox** (and spam folder!)
5. You should receive an email with a 5-digit code!

---

## Troubleshooting

**Email not received?**
- Check your spam/junk folder
- Make sure you copied the API key correctly
- Verify the `.env` file has no extra spaces
- Restart the dev server

**Still not working?**
- Check the terminal for error messages
- The code will still be displayed on screen as a fallback

---

## Free Tier Limits

Resend's free tier includes:
- ✅ 100 emails per day
- ✅ 1 verified domain
- ✅ Unlimited test emails to `@resend.dev`

This is perfect for development and testing!
