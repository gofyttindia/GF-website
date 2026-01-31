import { NextRequest, NextResponse } from 'next/server'
import { saveFormSubmission } from '@/lib/supabase'

/**
 * Form Submission API Route
 * 
 * This route handles saving form submissions to:
 * 1. Database (Supabase, MongoDB, PostgreSQL, etc.)
 * 2. Google Forms (via API or webhook)
 * 3. Both (recommended)
 */

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    if (!formData) {
      return NextResponse.json(
        { error: 'Form data is required' },
        { status: 400 }
      )
    }

    const results = {
      database: null,
      googleForms: null,
    }

    // Option 1: Save to Database (Supabase)
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      try {
        results.database = await saveFormSubmission(formData)
      } catch (error: any) {
        console.error('Database save error:', error)
        results.database = { error: error.message }
      }
    } else if (process.env.DATABASE_URL) {
      // Fallback to generic database save
      try {
        results.database = await saveToDatabase(formData)
      } catch (error: any) {
        console.error('Database save error:', error)
        results.database = { error: error.message }
      }
    }

    // Option 2: Submit to Google Forms
    if (process.env.GOOGLE_FORMS_WEBHOOK_URL) {
      try {
        results.googleForms = await submitToGoogleForms(formData)
      } catch (error: any) {
        console.error('Google Forms error:', error)
        results.googleForms = { error: error.message }
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: 'Form submitted successfully',
    })
  } catch (error: any) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit form' },
      { status: 500 }
    )
  }
}

/**
 * Save form data to database
 */
async function saveToDatabase(data: any) {
  // Supabase example
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/form_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        plan_type: data.plan || 'Standard',
        name: data.name || data.name1,
        phone: data.phone || data.phone1,
        email: data.email || data.email1,
        age: data.age || data.age1,
        gender: data.gender || data.gender1,
        country: data.country,
        city: data.city,
        occupation: data.occupation || data.occupation1,
        fitness_experience: data.fitnessExperience || data.fitnessExperience1,
        fitness_goal: data.fitnessGoal || data.fitnessGoal1,
        package_duration: data.packageDuration,
        current_weight: data.currentWeight || data.currentWeight1,
        target_weight: data.targetWeight || data.targetWeight1,
        message: data.message,
        submitted_at: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to save to database')
    }

    return await response.json()
  }

  // MongoDB support removed - using Supabase instead
  // To add MongoDB support: pnpm add mongodb, then create lib/mongodb.ts

  return { message: 'No database configured' }
}

/**
 * Submit to Google Forms via webhook
 */
async function submitToGoogleForms(data: any) {
  const webhookUrl = process.env.GOOGLE_FORMS_WEBHOOK_URL

  if (!webhookUrl) {
    return { message: 'Google Forms webhook not configured' }
  }

  // Format data for Google Forms
  const formPayload = {
    'entry.1234567890': data.name || data.name1, // Replace with your Google Form field IDs
    'entry.1234567891': data.phone || data.phone1,
    'entry.1234567892': data.email || data.email1,
    'entry.1234567893': data.age || data.age1,
    'entry.1234567894': data.gender || data.gender1,
    'entry.1234567895': data.country,
    'entry.1234567896': data.city,
    'entry.1234567897': data.occupation || data.occupation1,
    'entry.1234567898': data.fitnessExperience || data.fitnessExperience1,
    'entry.1234567899': data.fitnessGoal || data.fitnessGoal1,
    'entry.1234567900': data.packageDuration,
    'entry.1234567901': data.plan || 'Standard',
    // Add more fields as needed
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(formPayload),
  })

  if (!response.ok) {
    throw new Error('Failed to submit to Google Forms')
  }

  return { success: true }
}

