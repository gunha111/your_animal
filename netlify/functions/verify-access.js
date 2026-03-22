// verify-access.js — Server-side purchase verification
// Called by results.html before rendering unlocked content.
// Uses SUPABASE_SERVICE_KEY (server-only) — clients cannot replicate this.

export const config = { path: '/api/verify-access' };

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ valid: false, products: [] }, { status: 400 });
  }

  const { session_id, user_id } = body;

  if (!session_id && !user_id) {
    return Response.json({ valid: false, products: [] }, { status: 400 });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return Response.json({ valid: false, products: [] }, { status: 500 });
  }

  try {
    // Build query — prefer user_id (more reliable across browsers), fall back to session_id
    const filter = user_id
      ? `user_id=eq.${encodeURIComponent(user_id)}`
      : `session_id=eq.${encodeURIComponent(session_id)}`;

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/purchases?${filter}&status=eq.active&select=product_type,expires_at`,
      {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
      }
    );

    if (!res.ok) {
      return Response.json({ valid: false, products: [] });
    }

    const rows = await res.json();
    const now  = Date.now();

    // Filter out expired subscriptions
    const valid = rows.filter(r => {
      if (r.product_type === 'subscription') {
        return r.expires_at && new Date(r.expires_at).getTime() > now;
      }
      return true; // one-time purchases never expire
    });

    const products = valid.map(r => r.product_type);
    const hasQuiz  = products.includes('subscription') || products.includes('quiz_unlock');

    return Response.json({ valid: hasQuiz, products });

  } catch {
    return Response.json({ valid: false, products: [] });
  }
};
