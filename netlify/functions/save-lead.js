// save-lead.js — saves email lead to Supabase + triggers Resend welcome email
export const config = { path: '/api/save-lead' };

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { email, source = 'quiz' } = body;
  if (!email || !email.includes('@')) {
    return new Response('Invalid email', { status: 400 });
  }

  const SUPABASE_URL     = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const RESEND_API_KEY   = process.env.RESEND_API_KEY;

  // ── Save to Supabase leads table ─────────────────────────
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=ignore-duplicates', // ignore if email already exists
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        source,
        subscribed: true,
      }),
    });
  } catch (e) {
    console.error('Supabase insert error:', e);
    // continue — still try to send email
  }

  // ── Send welcome email via Resend ────────────────────────
  if (RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'My Pet Generator <noreply@mypetgenerator.com>',
          to: [email],
          subject: '🐾 Your pet match results are ready!',
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#4facfe,#00f2fe);border-radius:16px;padding:32px 24px;text-align:center;margin-bottom:24px;">
      <div style="font-size:2.5rem;margin-bottom:8px;">🐾</div>
      <h1 style="color:#fff;margin:0;font-size:1.5rem;font-weight:800;">My Pet Generator</h1>
      <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:0.95rem;">Your personalized pet match is waiting</p>
    </div>

    <!-- Body -->
    <div style="background:#fff;border-radius:16px;padding:28px 24px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
      <h2 style="margin:0 0 12px;font-size:1.2rem;color:#111827;">Hi there! 👋</h2>
      <p style="color:#374151;line-height:1.6;margin:0 0 20px;">
        Thanks for taking the My Pet Generator quiz! Based on your answers, we've found your perfect pet match.
      </p>
      <a href="https://mypetgenerator.com/results.html"
         style="display:block;background:linear-gradient(135deg,#4facfe,#00f2fe);color:#fff;text-decoration:none;
                padding:16px 24px;border-radius:12px;font-weight:700;font-size:1rem;text-align:center;margin-bottom:20px;">
        View My Pet Match →
      </a>
      <p style="color:#6b7280;font-size:0.88rem;line-height:1.6;margin:0;">
        Your results include your #1 pet match for free, plus the option to unlock your full Top 5 matches — each with a personalized care guide.
      </p>
    </div>

    <!-- Tips teaser -->
    <div style="background:#f0fdf4;border-radius:12px;padding:20px 24px;margin-bottom:16px;border:1px solid #bbf7d0;">
      <p style="margin:0 0 12px;font-weight:700;color:#15803d;font-size:0.95rem;">🌿 While you're here — 3 quick pet tips:</p>
      <ul style="margin:0;padding-left:20px;color:#374151;font-size:0.88rem;line-height:1.8;">
        <li>The right pet depends more on your <strong>lifestyle</strong> than your personality</li>
        <li>First-time owners often do best with <strong>low-maintenance pets</strong></li>
        <li>A good name sets the tone — try our free <strong>Pet Name Generator</strong></li>
      </ul>
    </div>

    <!-- Footer -->
    <p style="text-align:center;color:#9ca3af;font-size:0.8rem;margin:0;">
      © 2026 My Pet Generator · <a href="https://mypetgenerator.com" style="color:#9ca3af;">mypetgenerator.com</a><br/>
      <a href="https://mypetgenerator.com/unsubscribe.html?email=${encodeURIComponent(email)}" style="color:#9ca3af;">Unsubscribe</a>
    </p>
  </div>
</body>
</html>
          `,
        }),
      });
    } catch (e) {
      console.error('Resend error:', e);
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
