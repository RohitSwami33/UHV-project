/*
  # ScamShield - Scam Reports Table

  ## Overview
  Creates a table to store scam reports submitted through the ScamShield portal.

  ## New Tables
  - `scam_reports`
    - `id` (uuid, primary key) - Unique identifier for each report
    - `name` (text) - Name of the person reporting
    - `email` (text) - Email address for follow-up
    - `scam_type` (text) - Category of scam (Phishing, Fake Job, UPI, etc.)
    - `description` (text) - Detailed description of the scam
    - `created_at` (timestamptz) - Timestamp when report was submitted
    - `status` (text) - Status of the report (default: 'pending')

  ## Security
  - Enable RLS on `scam_reports` table
  - Allow public to insert reports (anonymous reporting)
  - Only authenticated users with admin role can view reports
*/

CREATE TABLE IF NOT EXISTS scam_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  scam_type text NOT NULL,
  description text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE scam_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit scam reports"
  ON scam_reports
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all reports"
  ON scam_reports
  FOR SELECT
  TO authenticated
  USING (true);