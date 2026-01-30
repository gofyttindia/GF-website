import { NextRequest, NextResponse } from 'next/server'

/**
 * WhatsApp API Route Handler
 * 
 * This API route handles sending WhatsApp messages server-side
 * 
 * Setup required:
 * 1. Add environment variables to .env.local:
 *    - TWILIO_ACCOUNT_SID (if using Twilio)
 *    - TWILIO_AUTH_TOKEN (if using Twilio)
 *    - TWILIO_WHATSAPP_NUMBER (if using Twilio)
 *    - WHATSAPP_ACCESS_TOKEN (if using Meta Cloud API)
 *    - WHATSAPP_PHONE_NUMBER_ID (if using Meta Cloud API)
 */

export async function POST(request: NextRequest) {
  try {
    const { message, to, method = 'meta' } = await request.json()

    if (!message || !to) {
      return NextResponse.json(
        { error: 'Message and recipient number are required' },
        { status: 400 }
      )
    }

    let result

    if (method === 'meta') {
      // WhatsApp Cloud API (Meta) - Primary method
      const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
      const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
      const version = process.env.WHATSAPP_API_VERSION || 'v21.0'

      if (!accessToken || !phoneNumberId) {
        return NextResponse.json(
          { error: 'WhatsApp Business API credentials not configured. Please add WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID to your environment variables.' },
          { status: 500 }
        )
      }

      const response = await fetch(
        `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: to,
            type: 'text',
            text: {
              preview_url: false,
              body: message,
            },
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        return NextResponse.json(
          { 
            error: data.error?.message || 'Failed to send WhatsApp message via Meta API',
            details: data.error 
          },
          { status: response.status }
        )
      }

      result = { success: true, data, messageId: data.messages?.[0]?.id }
    } else if (method === 'twilio') {
      // Twilio WhatsApp API
      const accountSid = process.env.TWILIO_ACCOUNT_SID
      const authToken = process.env.TWILIO_AUTH_TOKEN
      const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'

      if (!accountSid || !authToken) {
        return NextResponse.json(
          { error: 'Twilio credentials not configured' },
          { status: 500 }
        )
      }

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
          },
          body: new URLSearchParams({
            From: fromNumber,
            To: `whatsapp:+${to}`,
            Body: message,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        return NextResponse.json(
          { error: data.message || 'Failed to send WhatsApp message via Twilio' },
          { status: response.status }
        )
      }

      result = { success: true, data }
    } else if (method === 'meta') {
      // WhatsApp Cloud API (Meta)
      const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
      const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
      const version = 'v18.0'

      if (!accessToken || !phoneNumberId) {
        return NextResponse.json(
          { error: 'WhatsApp Cloud API credentials not configured' },
          { status: 500 }
        )
      }

      const response = await fetch(
        `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
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
        return NextResponse.json(
          { error: data.error?.message || 'Failed to send WhatsApp message via Meta API' },
          { status: response.status }
        )
      }

      result = { success: true, data }
    } else {
      return NextResponse.json(
        { error: 'Invalid method. Use "twilio" or "meta"' },
        { status: 400 }
      )
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('WhatsApp API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

