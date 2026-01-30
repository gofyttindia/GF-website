# Quick Setup Guide - Forms to Database/Google Forms

## 🚀 Quick Start (Choose One)

### Option 1: Supabase (Recommended - 5 minutes)

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up (free tier available)
   - Create new project

2. **Create Table**
   - Go to SQL Editor
   - Run this SQL:
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

3. **Get Credentials**
   - Project Settings → API
   - Copy "Project URL" and "anon public" key

4. **Add to `.env.local`**
   ```env
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

5. **Done!** Forms will now save to Supabase automatically.

---

### Option 2: Google Forms (10 minutes)

#### Method A: Using Zapier (Easiest)

1. **Create Zapier Account** (free tier available)
2. **Create Zap:**
   - Trigger: Webhook by Zapier → Catch Hook
   - Action: Google Forms → Create Form Response
3. **Copy Webhook URL**
4. **Add to `.env.local`:**
   ```env
   GOOGLE_FORMS_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxxxx
   ```

#### Method B: Using Google Apps Script

1. **Create Google Form** with matching fields
2. **Get Form Entry IDs** (see FORM_INTEGRATION_GUIDE.md)
3. **Create Google Apps Script:**
   - Go to https://script.google.com
   - Create new project
   - Deploy as web app
4. **Update API route** with your form entry IDs
5. **Add webhook URL to `.env.local`**

---

### Option 3: MongoDB (10 minutes)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free cluster

2. **Get Connection String**
   - Connect → Drivers → Copy connection string

3. **Install MongoDB Driver**
   ```bash
   npm install mongodb
   ```

4. **Add to `.env.local`:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```

5. **Update `/app/api/forms/submit/route.ts`** with MongoDB save logic

---

## 📋 Environment Variables Template

Create `.env.local` file:

```env
# WhatsApp Business API (Meta)
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id

# Database (Choose one)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# OR
MONGODB_URI=mongodb+srv://...

# Google Forms (Optional)
GOOGLE_FORMS_WEBHOOK_URL=https://hooks.zapier.com/...

# Optional: For both database AND Google Forms
# Add both sets of credentials above
```

---

## ✅ Testing

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Submit a form:**
   - Go to `/form/standard`
   - Fill out and submit

3. **Check data:**
   - **Supabase:** Go to Table Editor → form_submissions
   - **Google Forms:** Check form responses
   - **MongoDB:** Check your collection

4. **Check WhatsApp:** Message should be sent

---

## 🔄 Data Flow

```
User submits form
    ↓
Save to Database (Supabase/MongoDB) ✅
    ↓
Submit to Google Forms (if configured) ✅
    ↓
Send WhatsApp Message ✅
    ↓
Show success message ✅
```

---

## 🆘 Troubleshooting

### Forms not saving?
- Check `.env.local` has correct credentials
- Check browser console for errors
- Check server logs: `npm run dev`

### Supabase errors?
- Verify table exists: `form_submissions`
- Check column names match
- Verify API key has insert permissions

### Google Forms not working?
- Verify webhook URL is correct
- Check Zapier/Make.com scenario is active
- Verify form entry IDs match

---

## 📚 More Details

See `FORM_INTEGRATION_GUIDE.md` for detailed instructions.


