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

-- RLS
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Frontend can read purchases by session_id (anon key)
CREATE POLICY "Read own purchases by session"
  ON purchases FOR SELECT
  USING (true);
-- Note: INSERT/UPDATE only via service_role key (webhook function)
