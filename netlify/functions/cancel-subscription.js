// ================================================================
// cancel-subscription — Netlify Function (ES Module)
// Verifies Supabase JWT, confirms subscription ownership,
// then cancels via Paddle API at end of billing period.
//
// Env vars required:
//   PADDLE_API_KEY     — Paddle live API key
//   SUPABASE_URL       — https://mdnidvcgcdkxacarcswx.supabase.co
//   SUPABASE_SERVICE_KEY — Supabase service role key
// ================================================================

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // ── 1. Verify Supabase JWT ───────────────────────────────────
  const authHeader = event.headers['authorization'] || event.headers['Authorization'] || '';
  const accessToken = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (!accessToken) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Not authenticated' }) };
  }

  let userId;
  try {
    const userRes = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!userRes.ok) throw new Error('Invalid token');
    const userData = await userRes.json();
    userId = userData.id;
  } catch {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid or expired session. Please log in again.' }) };
  }

  // ── 2. Parse request body ────────────────────────────────────
  let subscriptionId;
  try {
    const body = JSON.parse(event.body || '{}');
    subscriptionId = body.subscription_id;
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!subscriptionId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'subscription_id required' }) };
  }

  // ── 3. Confirm the subscription belongs to this user ─────────
  try {
    const checkRes = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/purchases?user_id=eq.${userId}&paddle_subscription_id=eq.${subscriptionId}&status=eq.active&select=id`,
      {
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        },
      }
    );
    const rows = await checkRes.json();
    if (!rows || rows.length === 0) {
      return { statusCode: 403, headers, body: JSON.stringify({ error: 'Subscription not found or already canceled.' }) };
    }
  } catch {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to verify subscription ownership.' }) };
  }

  // ── 4. Cancel via Paddle API ─────────────────────────────────
  try {
    const paddleRes = await fetch(
      `https://api.paddle.com/subscriptions/${subscriptionId}/cancel`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ effective_from: 'next_billing_period' }),
      }
    );

    if (!paddleRes.ok) {
      const errText = await paddleRes.text();
      console.error('Paddle cancel error:', errText);
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Paddle cancellation failed. Please contact support.' }) };
    }

    console.log(`✅ Subscription ${subscriptionId} canceled for user ${userId}`);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };

  } catch (e) {
    console.error('Cancel subscription error:', e.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error. Please try again.' }) };
  }
};
