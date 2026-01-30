# WhatsApp API Setup Instructions

## Quick Setup Guide

### Option 1: Using Twilio (Recommended - Easiest)

1. **Sign up for Twilio**
   - Go to https://www.twilio.com/
   - Create a free account
   - Get $15.50 free credit to test

2. **Get WhatsApp Sandbox Number**
   - Go to Twilio Console → Messaging → Try it out → Send a WhatsApp message
   - Follow instructions to join sandbox (send "join [code]" to Twilio number)
   - Get your sandbox number (usually: whatsapp:+14155238886)

3. **Get API Credentials**
   - Account SID: Found in Twilio Console dashboard
   - Auth Token: Found in Twilio Console dashboard

4. **Add to Environment Variables**
   Create `.env.local` file:
   ```env
   TWILIO_ACCOUNT_SID=your_account_sid_here
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   WHATSAPP_TO_NUMBER=917702608961
   ```

5. **Test**
   - Submit a form
   - Message should be sent directly to your WhatsApp number

### Option 2: Using WhatsApp Cloud API (Meta - Free Tier)

1. **Create Meta Business Account**
   - Go to https://business.facebook.com/
   - Create a business account

2. **Create Meta App**
   - Go to https://developers.facebook.com/
   - Create a new app
   - Add "WhatsApp" product

3. **Get API Credentials**
   - Access Token: From Meta App Dashboard
   - Phone Number ID: From WhatsApp settings
   - Verify your phone number

4. **Add to Environment Variables**
   ```env
   WHATSAPP_ACCESS_TOKEN=your_access_token_here
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
   WHATSAPP_TO_NUMBER=917702608961
   ```

5. **Important Notes**
   - Free tier: 1,000 conversations/month
   - Must use message templates for initial messages
   - Users must opt-in to receive messages

### Option 3: Using Other Services

**Wati.io** - https://www.wati.io/
- Easy setup
- Good for small businesses
- Paid service

**360dialog** - https://www.360dialog.com/
- WhatsApp Business API provider
- Good documentation
- Paid service

## Current Implementation

The forms are now set up to:
1. **Try to send via API first** (if configured)
2. **Fallback to click-to-chat** if API fails or not configured

This means:
- ✅ Works immediately (click-to-chat fallback)
- ✅ Can upgrade to direct API sending when ready
- ✅ No breaking changes

## Testing

1. **Without API Setup** (Current):
   - Form submits → Opens WhatsApp with pre-filled message
   - User clicks send manually

2. **With API Setup**:
   - Form submits → Message sent directly to your WhatsApp
   - No user interaction needed

## Troubleshooting

### API Not Working?
- Check environment variables are set correctly
- Verify API credentials
- Check API logs in browser console
- Form will automatically fallback to click-to-chat

### Want to Disable API?
- Remove API credentials from `.env.local`
- Form will use click-to-chat automatically

## Cost Considerations

- **Click-to-Chat**: Free (current method)
- **Twilio**: Pay per message (~$0.005-0.01 per message)
- **WhatsApp Cloud API**: Free tier (1,000 conversations/month), then paid
- **Third-party services**: Various pricing plans

## Recommendation

For most use cases:
1. **Start with click-to-chat** (current) - Free and works immediately
2. **Upgrade to API** when you need automation or high volume
3. **Use Twilio** for easiest setup
4. **Use Meta Cloud API** for free tier and official integration



