// ===================================================
// Supabase config — replace values with your project
// ===================================================

// 1. Go to https://supabase.com and create a project
// 2. Settings → API → copy Project URL & anon key
// 3. Replace the values below

const SUPABASE_URL = 'https://mdnidvcgcdkxacarcswx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_muq2wAfty0zGYUklDSVTyQ_58yLCEEM';

// ===================================================
// Supabase SQL — run the query below in the Supabase SQL Editor
// ===================================================
/*
CREATE TABLE pet_results_shares (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  nickname text NOT NULL DEFAULT 'Anonymous',
  top_pet text NOT NULL,
  percentage integer NOT NULL CHECK (percentage BETWEEN 1 AND 100),
  message text,
  likes integer DEFAULT 0
);

-- Public read/write (disable RLS or add policies)
ALTER TABLE pet_results_shares ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read" ON pet_results_shares FOR SELECT USING (true);
CREATE POLICY "Anyone can insert" ON pet_results_shares FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update likes" ON pet_results_shares FOR UPDATE USING (true);
*/
