-- Supabase Table Setup for FitneX Forms
-- Run this SQL in your Supabase SQL Editor

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
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
  submitted_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index on submitted_at for faster queries
CREATE INDEX IF NOT EXISTS idx_form_submissions_submitted_at ON form_submissions(submitted_at DESC);

-- Create index on plan_type for filtering
CREATE INDEX IF NOT EXISTS idx_form_submissions_plan_type ON form_submissions(plan_type);

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (forms can submit data)
CREATE POLICY "Allow public inserts" ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read (optional - adjust as needed)
-- CREATE POLICY "Allow authenticated reads" ON form_submissions
--   FOR SELECT
--   TO authenticated
--   USING (true);

-- Optional: Create a view for recent submissions
CREATE OR REPLACE VIEW recent_submissions AS
SELECT 
  id,
  plan_type,
  name,
  phone,
  email,
  country,
  city,
  package_duration,
  submitted_at
FROM form_submissions
ORDER BY submitted_at DESC
LIMIT 100;


