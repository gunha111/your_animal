// ===================================================
// Supabase 설정 파일 — SETUP.md 참고하여 값을 입력하세요
// ===================================================

// 1. https://supabase.com 에서 프로젝트 생성
// 2. Settings → API → Project URL & anon key 복사
// 3. 아래 값을 교체하세요

const SUPABASE_URL = 'https://mdnidvcgcdkxacarcswx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_muq2wAfty0zGYUklDSVTyQ_58yLCEEM';

// ===================================================
// Supabase SQL — 아래 쿼리를 Supabase SQL Editor에서 실행하세요
// ===================================================
/*
CREATE TABLE pet_results_shares (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  nickname text NOT NULL DEFAULT '익명',
  top_pet text NOT NULL,
  percentage integer NOT NULL CHECK (percentage BETWEEN 1 AND 100),
  message text,
  likes integer DEFAULT 0
);

-- 누구나 읽기/쓰기 가능 (RLS 비활성화 또는 정책 추가)
ALTER TABLE pet_results_shares ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read" ON pet_results_shares FOR SELECT USING (true);
CREATE POLICY "Anyone can insert" ON pet_results_shares FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update likes" ON pet_results_shares FOR UPDATE USING (true);
*/
