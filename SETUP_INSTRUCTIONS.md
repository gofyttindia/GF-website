# Supabase Setup Instructions

## ✅ Step 1: Create .env.local File

Create a file named `.env.local` in the root of your project with these contents:

```env
# Supabase Configuration
SUPABASE_URL=https://dhykasdteclsuuacrzfl.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoeWthc2R0ZWNsc3V1YWNyemZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0MTgyODQsImV4cCI6MjA4Mjk5NDI4NH0.caW5AfowavSGbZstr0oV-g5Nnkehp1WK1lvuIUKR0jg

# WhatsApp Business API (Meta Cloud API) - Add when ready
# WHATSAPP_ACCESS_TOKEN=your_access_token_here
# WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
# WHATSAPP_API_VERSION=v21.0

# Google Forms Webhook (Optional)
# GOOGLE_FORMS_WEBHOOK_URL=https://hooks.zapier.com/...
```

## ✅ Step 2: Create Database Table

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy and paste the SQL from `supabase-setup.sql` file
6. Click **Run** (or press Cmd/Ctrl + Enter)

The table `form_submissions` will be created with all necessary columns.

## ✅ Step 3: Verify Setup

1. **Restart your dev server** (if running):
   ```bash
   npm run dev
   ```

2. **Test a form submission**:
   - Go to `/form/standard`
   - Fill out and submit the form
   - Check Supabase Dashboard → Table Editor → `form_submissions`
   - You should see the new submission!

## 📊 Viewing Submissions

To view form submissions:
1. Go to Supabase Dashboard
2. Navigate to **Table Editor**
3. Select `form_submissions` table
4. You'll see all form submissions with timestamps

## 🔒 Security Notes

- The `.env.local` file is already in `.gitignore` (won't be committed)
- The anon key is safe to use client-side (it's public)
- Row Level Security (RLS) is enabled on the table
- Only inserts are allowed for anonymous users (forms can submit)
- You can add read permissions later if needed

## ✅ That's It!

Your forms are now connected to Supabase. Every form submission will be automatically saved to your database!


