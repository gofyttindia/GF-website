/**
 * WhatsApp API Integration
 * 
 * This file provides functions to send messages directly via WhatsApp API
 * 
 * Options:
 * 1. Twilio WhatsApp API
 * 2. WhatsApp Cloud API (Meta)
 * 3. Other third-party services
 */

// Configuration - Add your API credentials here
const WHATSAPP_API_CONFIG = {
  // For Twilio
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    fromNumber: process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886', // Twilio sandbox number
  },
  // For WhatsApp Cloud API (Meta)
  meta: {
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    version: 'v18.0',
  },
  // Your WhatsApp number
  toNumber: process.env.WHATSAPP_TO_NUMBER || '917702608961',
}

/**
 * Send message via Twilio WhatsApp API
 */
export async function sendWhatsAppViaTwilio(message: string, to: string) {
  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${WHATSAPP_API_CONFIG.twilio.accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(
            `${WHATSAPP_API_CONFIG.twilio.accountSid}:${WHATSAPP_API_CONFIG.twilio.authToken}`
          ).toString('base64')}`,
        },
        body: new URLSearchParams({
          From: WHATSAPP_API_CONFIG.twilio.fromNumber,
          To: `whatsapp:+${to}`,
          Body: message,
        }),
      }
    )

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send WhatsApp message')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Twilio WhatsApp API Error:', error)
    throw error
  }
}

/**
 * Send message via WhatsApp Cloud API (Meta)
 */
export async function sendWhatsAppViaMeta(message: string, to: string) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_API_CONFIG.meta.version}/${WHATSAPP_API_CONFIG.meta.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WHATSAPP_API_CONFIG.meta.accessToken}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'text',
          text: {
            body: message,
          },
        }),
      }
    )

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to send WhatsApp message')
    }

    return { success: true, data }
  } catch (error) {
    console.error('WhatsApp Cloud API Error:', error)
    throw error
  }
}

/**
 * Send message via API Route (Server-side)
 * This is the recommended approach for Next.js
 */
export async function sendWhatsAppMessage(message: string, to: string, method: 'twilio' | 'meta' = 'twilio') {
  try {
    // Call your API route
    const response = await fetch('/api/whatsapp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        to,
        method,
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to send WhatsApp message')
    }

    return { success: true, data }
  } catch (error) {
    console.error('WhatsApp API Error:', error)
    throw error
  }
}



