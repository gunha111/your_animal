// ================================================================
// Paddle Webhook Handler — Netlify Function (ES Module)
// Receives Paddle events, verifies signature, writes to Supabase
//
// Netlify Environment Variables required:
//   PADDLE_WEBHOOK_SECRET  → Paddle dashboard → Notifications → secret
//   PADDLE_API_KEY         → Paddle dashboard → Developer → API keys
//   PADDLE_SELLER_ID       → Paddle dashboard → Business settings → Seller ID
//   SUPABASE_URL           → https://mdnidvcgcdkxacarcswx.supabase.co
//   SUPABASE_SERVICE_KEY   → Supabase → Settings → API → service_role key
// ================================================================

import { createHmac, timingSafeEqual } from 'crypto';

// ── Paddle signature verification ───────────────────────────────
function verifyPaddleSignature(rawBody, signatureHeader, secret) {
  try {
    const parts = Object.fromEntries(
      signatureHeader.split(';').map(p => p.split('='))
    );
    const ts = parts['ts'];
    const h1 = parts['h1'];
    if (!ts || !h1) return false;

    const signed = `${ts}:${rawBody}`;
    const expected = createHmac('sha256', secret)
      .update(signed)
      .digest('hex');

    return timingSafeEqual(
      Buffer.from(h1, 'hex'),
      Buffer.from(expected, 'hex')
    );
  } catch {
    return false;
  }
}

// ── Supabase REST helpers ────────────────────────────────────────
const sbHeaders = () => ({
  'Content-Type': 'application/json',
  'apikey': process.env.SUPABASE_SERVICE_KEY,
  'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
});

async function supabaseUpsert(table, data) {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/${table}`,
    {
      method: 'POST',
      headers: { ...sbHeaders(), 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error(`Supabase upsert error: ${await res.text()}`);
}

async function supabaseUpdate(table, match, data) {
  const qs = Object.entries(match).map(([k, v]) => `${k}=eq.${v}`).join('&');
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/${table}?${qs}`,
    { method: 'PATCH', headers: sbHeaders(), body: JSON.stringify(data) }
  );
  if (!res.ok) throw new Error(`Supabase update error: ${await res.text()}`);
}

// ── Main handler ─────────────────────────────────────────────────
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const signature = event.headers['paddle-signature'];
  const secret = process.env.PADDLE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    console.error('Missing Paddle signature or webhook secret');
    return { statusCode: 400, body: 'Missing signature' };
  }

  if (!verifyPaddleSignature(event.body, signature, secret)) {
    console.error('Invalid Paddle signature');
    return { statusCode: 401, body: 'Invalid signature' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { event_type: eventType, data } = payload;
  console.log(`Paddle event: ${eventType}`);

  try {
    // ── transaction.completed (one-time purchase) ──────────────
    if (eventType === 'transaction.completed') {
      const customData = data.custom_data || {};
      await supabaseUpsert('purchases', {
        paddle_transaction_id: data.id,
        customer_email: data.customer?.email ?? null,
        session_id: customData.session_id ?? null,
        product_type: customData.product_type ?? null,
        status: 'active',
        expires_at: customData.product_type === 'subscription'
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          : null,
      });
      console.log(`✅ Purchase saved: ${customData.product_type} | session: ${customData.session_id}`);
    }

    // ── subscription.activated ────────────────────────────────
    else if (eventType === 'subscription.activated') {
      const customData = data.custom_data || {};
      await supabaseUpsert('purchases', {
        paddle_subscription_id: data.id,
        customer_email: data.customer?.email ?? null,
        session_id: customData.session_id ?? null,
        product_type: 'subscription',
        status: 'active',
        expires_at: data.next_billed_at ?? null,
      });
      console.log(`✅ Subscription activated: ${data.id}`);
    }

    // ── subscription.canceled ─────────────────────────────────
    else if (eventType === 'subscription.canceled') {
      await supabaseUpdate(
        'purchases',
        { paddle_subscription_id: data.id },
        { status: 'canceled', expires_at: data.scheduled_change?.effective_at ?? null }
      );
      console.log(`⛔ Subscription canceled: ${data.id}`);
    }

    // ── transaction.refunded ──────────────────────────────────
    else if (eventType === 'transaction.refunded') {
      await supabaseUpdate(
        'purchases',
        { paddle_transaction_id: data.id },
        { status: 'refunded' }
      );
      console.log(`↩️ Refunded: ${data.id}`);
    }

    return { statusCode: 200, body: 'OK' };

  } catch (err) {
    console.error('Handler error:', err.message);
    return { statusCode: 500, body: 'Internal error' };
  }
};
