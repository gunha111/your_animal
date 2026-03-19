// email-sequence.js — Scheduled function: sends D+2, D+5, D+10, D+30 follow-up emails
// Runs daily via Netlify Scheduled Functions (cron)
export const config = {
  schedule: '0 10 * * *', // 10:00 UTC every day
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// ── Email templates per day offset ─────────────────────────────────────────
const SEQUENCES = [
  {
    day: 2,
    column: 'seq_d2_sent',
    subject: '🐾 Quick tip: Is a dog or cat right for you?',
    html: (email) => `
<!DOCTYPE html><html><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:24px 16px;">
  <div style="background:linear-gradient(135deg,#6366f1,#818cf8);border-radius:16px;padding:32px 24px;text-align:center;margin-bottom:24px;">
    <div style="font-size:2.5rem;margin-bottom:8px;">🐕 vs 🐈</div>
    <h1 style="color:#fff;margin:0;font-size:1.4rem;font-weight:800;">The biggest pet decision</h1>
  </div>
  <div style="background:#fff;border-radius:16px;padding:28px 24px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <h2 style="margin:0 0 12px;font-size:1.1rem;color:#111827;">Dog vs. Cat — what nobody tells you</h2>
    <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
      Dogs need you. Cats tolerate you. That's the cliché — but the reality is more nuanced, and your My Pet Generator results already hint at which suits your lifestyle better.
    </p>
    <ul style="margin:0 0 20px;padding-left:20px;color:#374151;font-size:0.9rem;line-height:1.8;">
      <li><strong>Work from home?</strong> Dog wins — daily walks boost your productivity</li>
      <li><strong>Travel often?</strong> Cat is lower-maintenance while you're away</li>
      <li><strong>Small apartment?</strong> A calm breed or cat adapts better</li>
    </ul>
    <a href="https://mypetgenerator.com/blog/dog-vs-cat-for-apartment.html"
       style="display:block;background:linear-gradient(135deg,#6366f1,#818cf8);color:#fff;text-decoration:none;
              padding:14px 24px;border-radius:12px;font-weight:700;font-size:0.95rem;text-align:center;">
      Read the Full Comparison →
    </a>
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:0.78rem;margin:0;">
    © 2026 My Pet Generator ·
    <a href="https://mypetgenerator.com/unsubscribe.html?email=${encodeURIComponent(email)}" style="color:#9ca3af;">Unsubscribe</a>
  </p>
</div>
</body></html>`,
  },
  {
    day: 5,
    column: 'seq_d5_sent',
    subject: '🏠 Is your home ready for a pet? Checklist inside',
    html: (email) => `
<!DOCTYPE html><html><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:24px 16px;">
  <div style="background:linear-gradient(135deg,#10b981,#34d399);border-radius:16px;padding:32px 24px;text-align:center;margin-bottom:24px;">
    <div style="font-size:2.5rem;margin-bottom:8px;">🏠</div>
    <h1 style="color:#fff;margin:0;font-size:1.4rem;font-weight:800;">Is your home pet-ready?</h1>
  </div>
  <div style="background:#fff;border-radius:16px;padding:28px 24px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <p style="color:#374151;line-height:1.6;margin:0 0 16px;">Before bringing a pet home, most people forget these 5 things:</p>
    <ul style="margin:0 0 20px;padding-left:20px;color:#374151;font-size:0.9rem;line-height:1.8;">
      <li>🔒 Secure loose wires and toxic plants</li>
      <li>🛏️ Designate a "safe space" for your pet to retreat to</li>
      <li>📋 Find a vet <em>before</em> you need one</li>
      <li>💰 Budget for the first month (food + vet = easily $200–400)</li>
      <li>📅 Plan the first week — pets need routine from day one</li>
    </ul>
    <a href="https://mypetgenerator.com/blog/first-pet-guide.html"
       style="display:block;background:linear-gradient(135deg,#10b981,#34d399);color:#fff;text-decoration:none;
              padding:14px 24px;border-radius:12px;font-weight:700;font-size:0.95rem;text-align:center;">
      First Pet Checklist →
    </a>
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:0.78rem;margin:0;">
    © 2026 My Pet Generator ·
    <a href="https://mypetgenerator.com/unsubscribe.html?email=${encodeURIComponent(email)}" style="color:#9ca3af;">Unsubscribe</a>
  </p>
</div>
</body></html>`,
  },
  {
    day: 10,
    column: 'seq_d10_sent',
    subject: '💰 What does a pet actually cost? (Real numbers)',
    html: (email) => `
<!DOCTYPE html><html><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:24px 16px;">
  <div style="background:linear-gradient(135deg,#f59e0b,#fbbf24);border-radius:16px;padding:32px 24px;text-align:center;margin-bottom:24px;">
    <div style="font-size:2.5rem;margin-bottom:8px;">💰</div>
    <h1 style="color:#fff;margin:0;font-size:1.4rem;font-weight:800;">The real cost of a pet</h1>
  </div>
  <div style="background:#fff;border-radius:16px;padding:28px 24px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
      Most pet ownership articles lowball the numbers. Here's what you can actually expect per year:
    </p>
    <table style="width:100%;border-collapse:collapse;font-size:0.88rem;margin-bottom:20px;">
      <tr style="background:#f9fafb;">
        <td style="padding:10px 12px;border:1px solid #e5e7eb;font-weight:700;">Pet</td>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;font-weight:700;">Year 1</td>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;font-weight:700;">Ongoing</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;">🐕 Dog</td>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;">$1,400–$4,300</td>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;">$900–$2,400/yr</td>
      </tr>
      <tr style="background:#f9fafb;">
        <td style="padding:10px 12px;border:1px solid #e5e7eb;">🐈 Cat</td>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;">$900–$2,000</td>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;">$600–$1,200/yr</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;">🐹 Hamster</td>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;">$150–$350</td>
        <td style="padding:10px 12px;border:1px solid #e5e7eb;">$120–$200/yr</td>
      </tr>
    </table>
    <a href="https://mypetgenerator.com/blog/pet-cost-guide.html"
       style="display:block;background:linear-gradient(135deg,#f59e0b,#fbbf24);color:#fff;text-decoration:none;
              padding:14px 24px;border-radius:12px;font-weight:700;font-size:0.95rem;text-align:center;">
      Full Cost Breakdown →
    </a>
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:0.78rem;margin:0;">
    © 2026 My Pet Generator ·
    <a href="https://mypetgenerator.com/unsubscribe.html?email=${encodeURIComponent(email)}" style="color:#9ca3af;">Unsubscribe</a>
  </p>
</div>
</body></html>`,
  },
  {
    day: 30,
    column: 'seq_d30_sent',
    subject: '🐾 One month later — have you found your pet match?',
    html: (email) => `
<!DOCTYPE html><html><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:24px 16px;">
  <div style="background:linear-gradient(135deg,#6366f1,#ec4899);border-radius:16px;padding:32px 24px;text-align:center;margin-bottom:24px;">
    <div style="font-size:2.5rem;margin-bottom:8px;">🐾</div>
    <h1 style="color:#fff;margin:0;font-size:1.4rem;font-weight:800;">One month later...</h1>
  </div>
  <div style="background:#fff;border-radius:16px;padding:28px 24px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
      It's been a month since you found your pet match. Have you taken the plunge?
    </p>
    <p style="color:#374151;line-height:1.6;margin:0 0 20px;">
      Whether you've already welcomed a new pet or are still deciding, your <strong>Top 5 matches + personalized care guide</strong> are ready to unlock — usually the most helpful step before committing.
    </p>
    <a href="https://mypetgenerator.com/results.html"
       style="display:block;background:linear-gradient(135deg,#6366f1,#ec4899);color:#fff;text-decoration:none;
              padding:14px 24px;border-radius:12px;font-weight:700;font-size:0.95rem;text-align:center;margin-bottom:16px;">
      View Your Full Results →
    </a>
    <p style="color:#6b7280;font-size:0.85rem;line-height:1.6;margin:0;text-align:center;">
      Unlock Top 5 + Care Guide for just $5.99 · one-time
    </p>
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:0.78rem;margin:0;">
    © 2026 My Pet Generator ·
    <a href="https://mypetgenerator.com/unsubscribe.html?email=${encodeURIComponent(email)}" style="color:#9ca3af;">Unsubscribe</a>
  </p>
</div>
</body></html>`,
  },
];

// ── Helper: fetch from Supabase ──────────────────────────────────────────────
async function supabaseRequest(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase ${path}: ${res.status} ${text}`);
  }
  return res.json().catch(() => null);
}

// ── Send via Resend ──────────────────────────────────────────────────────────
async function sendEmail(to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'My Pet Generator <noreply@mypetgenerator.com>',
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend error: ${res.status} ${text}`);
  }
}

// ── Main handler ─────────────────────────────────────────────────────────────
export default async () => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !RESEND_API_KEY) {
    console.error('Missing env vars');
    return;
  }

  const now = new Date();

  for (const seq of SEQUENCES) {
    // Find leads where:
    // - subscribed = true
    // - this sequence column is false/null
    // - created_at is at least `day` days ago (within a 2-day window to avoid re-triggering)
    const cutoff = new Date(now - seq.day * 24 * 60 * 60 * 1000).toISOString();
    const windowStart = new Date(now - (seq.day + 2) * 24 * 60 * 60 * 1000).toISOString();

    let leads;
    try {
      leads = await supabaseRequest(
        `/leads?select=id,email&subscribed=eq.true&${seq.column}=eq.false&created_at=lte.${cutoff}&created_at=gte.${windowStart}`
      );
    } catch (e) {
      console.error(`Failed to fetch leads for day ${seq.day}:`, e.message);
      continue;
    }

    if (!leads || leads.length === 0) continue;

    for (const lead of leads) {
      try {
        await sendEmail(lead.email, seq.subject, seq.html(lead.email));
        // Mark as sent
        await supabaseRequest(`/leads?id=eq.${lead.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ [seq.column]: true }),
        });
        console.log(`Sent day-${seq.day} email to ${lead.email}`);
      } catch (e) {
        console.error(`Failed for ${lead.email} day-${seq.day}:`, e.message);
      }
    }
  }
};
