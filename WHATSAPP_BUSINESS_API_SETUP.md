# WhatsApp Business API Setup Guide

This guide will help you set up WhatsApp Business API (Meta Cloud API) for direct message sending.

## Prerequisites

1. **Meta Business Account**
   - Go to https://business.facebook.com/
   - Create or use existing business account

2. **Meta Developer Account**
   - Go to https://developers.facebook.com/
   - Create a developer account

## Step-by-Step Setup

### Step 1: Create Meta App

1. Go to https://developers.facebook.com/apps/
2. Click "Create App"
3. Select "Business" as app type
4. Fill in app details:
   - App Name: FitneX WhatsApp
   - App Contact Email: your-email@example.com
5. Click "Create App"

### Step 2: Add WhatsApp Product

1. In your app dashboard, find "Add Product" section
2. Click "Set up" on WhatsApp
3. Follow the setup wizard

### Step 3: Get API Credentials

After adding WhatsApp product, you'll need:

1. **Access Token**
   - Go to WhatsApp → API Setup
   - Copy the "Temporary access token" (for testing)
   - For production, create a System User and get permanent token

2. **Phone Number ID**
   - Found in WhatsApp → API Setup
   - Format: Usually a long number like `123456789012345`

3. **Business Account ID** (optional, for advanced features)
   - Found in Business Settings

### Step 4: Verify Phone Number

1. Go to WhatsApp → API Setup
2. Add your phone number
3. Verify via SMS/call
4. This becomes your "From" number

### Step 5: Configure Environment Variables

Create or update `.env.local`:

```env
# WhatsApp Business API (Meta Cloud API)
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_API_VERSION=v21.0
WHATSAPP_TO_NUMBER=917702608961

# Optional: For testing with Twilio fallback
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=
```

### Step 6: Test the Integration

1. Start your dev server: `npm run dev`
2. Go to `/form/standard`
3. Fill out and submit the form
4. Check your WhatsApp for the message

## Important Notes

### Free Tier Limits
- **1,000 conversations/month** free
- After that, pay per conversation
- Check pricing: https://developers.facebook.com/docs/whatsapp/pricing

### Message Templates
- **Initial messages** must use approved templates
- **Reply messages** can be free-form text
- Templates must be approved by Meta (can take 24-48 hours)

### Template Message Format

For initial contact, you need to use templates. Update the API route to use templates:

```typescript
body: JSON.stringify({
  messaging_product: 'whatsapp',
  to: to,
  type: 'template',
  template: {
    name: 'your_template_name',
    language: { code: 'en' },
    components: [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: data.name },
          { type: 'text', text: data.phone },
          // ... other parameters
        ]
      }
    ]
  }
})
```

### Testing Mode vs Production

**Testing Mode:**
- Can send to up to 5 phone numbers
- Add test numbers in Meta App Dashboard
- No template approval needed for testing

**Production Mode:**
- Requires business verification
- Template messages must be approved
- Can send to any verified number

## Troubleshooting

### Error: "Invalid OAuth access token"
- Check if access token is correct
- Token might have expired (temporary tokens expire)
- Generate new token in Meta App Dashboard

### Error: "Recipient phone number not in allowed list"
- You're in testing mode
- Add recipient number to test numbers in Meta Dashboard
- Or switch to production mode

### Error: "Message template required"
- Initial messages need templates
- Create and approve a template
- Or use reply messages (after user initiates)

### Messages not sending
- Check API credentials in `.env.local`
- Verify phone number is correct format (no +, no spaces)
- Check Meta App Dashboard for error logs
- Form will automatically fallback to click-to-chat

## Production Checklist

- [ ] Business account verified
- [ ] App reviewed and approved
- [ ] Message templates created and approved
- [ ] Permanent access token generated
- [ ] Phone number verified
- [ ] Environment variables set in production
- [ ] Error handling tested
- [ ] Fallback mechanism working

## Cost Estimation

- **Free Tier**: 1,000 conversations/month
- **After Free Tier**: ~$0.005-0.01 per conversation
- **Template Messages**: Free
- **Session Messages**: Free (within 24-hour window)

## Support Resources

- [WhatsApp Business API Docs](https://developers.facebook.com/docs/whatsapp)
- [Meta Business Help Center](https://www.facebook.com/business/help)
- [API Reference](https://developers.facebook.com/docs/whatsapp/cloud-api)

## Next Steps After Setup

1. Create message templates for common scenarios
2. Set up webhooks for delivery receipts
3. Implement message status tracking
4. Add automated responses
5. Set up message templates for different plans



