/**
 * Supabase Client Setup
 * 
 * Install: npm install @supabase/supabase-js
 * 
 * This file provides a Supabase client for database operations
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Database features will be disabled.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

/**
 * Save form submission to Supabase
 */
export async function saveFormSubmission(data: any) {
  if (!supabase) {
    throw new Error('Supabase not configured')
  }

  const { data: result, error } = await supabase
    .from('form_submissions')
    .insert([
      {
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
      },
    ])
    .select()

  if (error) {
    throw error
  }

  return result
}


