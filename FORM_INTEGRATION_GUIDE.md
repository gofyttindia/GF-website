# Form Integration Guide - Google Forms & Database

This guide shows how to connect your forms to Google Forms or a database.

## Option 1: Google Forms Integration

### Method A: Using Google Forms Webhook (Easiest)

1. **Create a Google Form**
   - Go to https://forms.google.com
   - Create a new form with fields matching your form
   - Get the form URL

2. **Get Form Entry IDs**
   - Open your Google Form
   - Right-click → Inspect → View Page Source
   - Search for "entry." to find field IDs
   - Or use a tool like https://github.com/tanaikech/Get-IDs-of-Google-Forms

3. **Get Webhook URL**
   - Google Forms doesn't have direct API
   - Use Zapier/Make.com to create webhook
   - Or use Google Apps Script (see Method B)

4. **Add to Environment Variables**
   ```env
   GOOGLE_FORMS_WEBHOOK_URL=https://your-webhook-url.com
   ```

### Method B: Using Google Apps Script

1. **Create Google Apps Script**
   - Go to https://script.google.com
   - Create new project
   - Use the script provided in `scripts/google-forms-submit.js`

2. **Deploy as Web App**
   - Deploy → New Deployment
   - Execute as: Me
   - Who has access: Anyone
   - Copy the web app URL

3. **Update API Route**
   - Use the web app URL as webhook

### Method C: Using Zapier/Make.com (No-Code)

1. **Create Zapier/Make Account**
2. **Create Zap/Scenario:**
   - Trigger: Webhook (Catch Hook)
   - Action: Google Forms (Add Response)
3. **Copy Webhook URL**
4. **Add to Environment Variables**

## Option 2: Database Integration

### Option A: Supabase (Recommended - Easiest)

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Create new project

2. **Create Table**
   ```sql
   CREATE TABLE form_submissions (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     plan_type TEXT,
     name TEXT,
     phone TEXT,
     email TEXT,
     age TEXT,
     gender TEXT,
     country TEXT,
     city TEXT,
     occupation TEXT,
     fitness_experience TEXT,
     fitness_goal TEXT,
     package_duration TEXT,
     current_weight TEXT,
     target_weight TEXT,
     message TEXT,
     submitted_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **Get API Credentials**
   - Project Settings → API
   - Copy URL and anon key

4. **Add to Environment Variables**
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```

### Option B: MongoDB

1. **Create MongoDB Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free cluster

2. **Get Connection String**
   - Connect → Drivers → Copy connection string

3. **Install MongoDB Driver**
   ```bash
   npm install mongodb
   ```

4. **Add to Environment Variables**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```

### Option C: PostgreSQL (Vercel Postgres)

1. **If using Vercel:**
   - Vercel Dashboard → Storage → Create Database
   - Select PostgreSQL
   - Copy connection string

2. **Install PostgreSQL Client**
   ```bash
   npm install @vercel/postgres
   ```

3. **Add to Environment Variables**
   ```env
   POSTGRES_URL=your-postgres-url
   ```

## Implementation

### Step 1: Update Forms to Save Data

The forms are already set up to call `/api/forms/submit` before sending WhatsApp message.

### Step 2: Configure Storage

Choose one or both:
- **Google Forms**: Add `GOOGLE_FORMS_WEBHOOK_URL`
- **Database**: Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` (or MongoDB/PostgreSQL)

### Step 3: Test

1. Submit a form
2. Check Google Forms responses (if configured)
3. Check database (if configured)
4. Verify WhatsApp message sent

## Recommended Setup

**Best Practice:**
- Save to database (Supabase) for data management
- Also send to Google Forms if you need spreadsheet view
- Send WhatsApp message for immediate notification

## Data Flow

```
User submits form
    ↓
Save to Database (Supabase/MongoDB)
    ↓
Submit to Google Forms (optional)
    ↓
Send WhatsApp Message
    ↓
Show success message
```

## Security Notes

- Never expose API keys in client-side code
- Use environment variables for all credentials
- Validate and sanitize form data
- Use HTTPS for all API calls
- Implement rate limiting for production


