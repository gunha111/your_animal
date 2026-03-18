-- ================================================================
-- YourAnimal — purchases table
-- Run this in Supabase SQL Editor
-- ================================================================

CREATE TABLE purchases (
  id                     bigserial PRIMARY KEY,
  paddle_transaction_id  text UNIQUE,
  paddle_subscription_id text,
  customer_email         text,
  session_id             text,
  product_type           text CHECK (product_type IN (
                           'name_gen', 'care_plan', 'quiz_unlock', 'subscription'
                         )),
  status                 text DEFAULT 'active' CHECK (status IN (
                           'active', 'canceled', 'refunded'
                         )),
  expires_at             timestamptz,
  created_at             timestamptz DEFAULT now()
);

CREATE INDEX idx_purchases_session ON purchases(session_id);
CREATE INDEX idx_purchases_txn     ON purchases(paddle_transaction_id);
CREATE INDEX idx_purchases_sub     ON purchases(paddle_subscription_id);

-- Auth: add user_id column (run this if table already exists)
-- ALTER TABLE purchases ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);
-- CREATE INDEX IF NOT EXISTS idx_purchases_user ON purchases(user_id);

CREATE INDEX idx_purchases_user ON purchases(user_id);

-- RLS
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Allow reads:
--   - Logged-in users see their own purchases (user_id = auth.uid())
--   - Anon users can still read (needed for session_id-based paywall verification)
CREATE POLICY "Read purchases"
  ON purchases FOR SELECT
  USING (
    user_id = auth.uid()    -- logged-in: own rows only
    OR auth.uid() IS NULL   -- anon: all readable (session_id filter applied in query)
  );

-- Note: INSERT/UPDATE only via service_role key (webhook function)
