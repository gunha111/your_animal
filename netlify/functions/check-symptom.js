// ================================================================
// check-symptom.js — Netlify Function (ES Module)
// Receives pet symptom data → calls Claude API → returns triage JSON
//
// Netlify Environment Variables required:
//   ANTHROPIC_API_KEY    → console.anthropic.com → API Keys
//   SUPABASE_URL         → https://mdnidvcgcdkxacarcswx.supabase.co
//   SUPABASE_SERVICE_KEY → Supabase → Settings → API → service_role key
// ================================================================

export const config = { path: '/api/check-symptom' };

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const MODEL         = 'claude-haiku-4-5-20251001';
const MAX_TOKENS    = 1200;
const RATE_LIMIT_SESSION = 5;
const RATE_LIMIT_IP      = 20;

function sbHeaders() {
  return {
    'Content-Type':  'application/json',
    'apikey':        process.env.SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
  };
}

async function sbSelect(table, query) {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/${table}?${query}`,
    { headers: sbHeaders() }
  );
  if (!res.ok) throw new Error(`Supabase select error: ${await res.text()}`);
  return res.json();
}

async function sbInsert(table, data) {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/${table}`,
    {
      method: 'POST',
      headers: { ...sbHeaders(), 'Prefer': 'return=minimal' },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) console.error(`Supabase insert error on ${table}:`, await res.text());
}

async function hashIP(ip) {
  try {
    const encoder = new TextEncoder();
    const data    = encoder.encode(ip + process.env.ANTHROPIC_API_KEY.slice(-8));
    const buf     = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 32);
  } catch { return 'unknown'; }
}

function sanitize(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen).replace(/[<>]/g, '');
}

function sanitizeArray(arr, maxItems = 30, maxItemLen = 120) {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, maxItems).map(s => sanitize(String(s), maxItemLen)).filter(Boolean);
}

function buildPrompt({ animal, petName, petAge, petWeight, petSex, symptoms, description, duration }) {
  const name = petName ? `"${petName}" (${animal})` : `a ${animal}`;
  return `You are a veterinary triage assistant helping pet owners decide if they need emergency care.

PATIENT INFO:
- Animal: ${name}
- Age: ${petAge || 'unknown'}
- Weight: ${petWeight || 'unknown'}
- Sex: ${petSex || 'unknown'}
- Reported symptoms: ${symptoms.length > 0 ? symptoms.join(', ') : 'none selected'}
- Duration: ${duration || 'unknown'}
- Owner's description: ${description || 'none provided'}

TASK: Assess urgency and provide triage guidance. Be accurate and appropriately cautious.

EMERGENCY TRIGGERS (always use urgency: "emergency" if any present):
- collapse, unconsciousness, unresponsiveness
- difficulty breathing, gasping, open-mouth breathing (especially cats)
- seizures or convulsions
- severe uncontrolled bleeding
- suspected poisoning or toxic ingestion
- swollen/hard/distended abdomen
- pale, blue, or white gums
- no urination for 12+ hours (especially male cats)
- heatstroke symptoms

Respond ONLY with valid JSON. No markdown, no backticks, no preamble.

{
  "urgency": "emergency" | "warning" | "ok",
  "headline": "Short 1-sentence assessment (max 12 words)",
  "urgency_sub": "One sentence elaborating on urgency (max 20 words)",
  "immediate_action": "The single most important thing to do RIGHT NOW — 2-3 sentences, specific and actionable.",
  "detailed_causes": ["Cause 1", "Cause 2", "Cause 3"],
  "home_care": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "vet_checklist": ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
  "red_flags": ["Warning sign 1", "Warning sign 2", "Warning sign 3"]
}`;
}

function parseClaudeResponse(content) {
  const text = content.map(block => (block.type === 'text' ? block.text : '')).join('').trim();
  const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  const data = JSON.parse(clean);
  if (!['emergency', 'warning', 'ok'].includes(data.urgency)) data.urgency = 'warning';
  if (!data.headline) data.headline = 'Assessment complete';
  if (!data.urgency_sub) data.urgency_sub = '';
  if (!data.immediate_action) data.immediate_action = 'Monitor your pet closely and contact your vet if symptoms worsen.';
  if (!Array.isArray(data.detailed_causes)) data.detailed_causes = [];
  if (!Array.isArray(data.home_care)) data.home_care = [];
  if (!Array.isArray(data.vet_checklist)) data.vet_checklist = [];
  if (!Array.isArray(data.red_flags)) data.red_flags = [];
  return data;
}

export default async (req) => {
  const CORS = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') return new Response('', { status: 204, headers: CORS });
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: CORS });
  if (!process.env.ANTHROPIC_API_KEY) return new Response(JSON.stringify({ error: 'Service configuration error' }), { status: 500, headers: CORS });

  let body;
  try { body = await req.json(); }
  catch { return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers: CORS }); }

  const VALID_ANIMALS = ['dog','cat','rabbit','hamster','guinea pig','bird','reptile','other'];
  const animal = sanitize(body.animal || '').toLowerCase();
  if (!animal || !VALID_ANIMALS.includes(animal)) return new Response(JSON.stringify({ error: 'Invalid animal type' }), { status: 400, headers: CORS });

  const sessionId   = sanitize(body.sessionId   || 'unknown', 64);
  const petName     = sanitize(body.petName     || '', 60);
  const petAge      = sanitize(body.petAge      || '', 60);
  const petWeight   = sanitize(body.petWeight   || '', 60);
  const petSex      = sanitize(body.petSex      || '', 60);
  const symptoms    = sanitizeArray(body.symptoms);
  const description = sanitize(body.description || '', 800);
  const duration    = sanitize(body.duration    || '', 80);

  if (symptoms.length === 0 && !description) return new Response(JSON.stringify({ error: 'Please provide at least one symptom or description' }), { status: 400, headers: CORS });

  const clientIP = req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const ipHash   = await hashIP(clientIP);
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    try {
      const sessionRows = await sbSelect('symptom_checks', `session_id=eq.${encodeURIComponent(sessionId)}&created_at=gte.${encodeURIComponent(oneHourAgo)}&select=id`);
      if (sessionRows.length >= RATE_LIMIT_SESSION) return new Response(JSON.stringify({ error: 'Too many checks. Please wait before trying again.' }), { status: 429, headers: CORS });
      const ipRows = await sbSelect('symptom_checks', `ip_hash=eq.${ipHash}&created_at=gte.${encodeURIComponent(oneHourAgo)}&select=id`);
      if (ipRows.length >= RATE_LIMIT_IP) return new Response(JSON.stringify({ error: 'Too many requests from this device.' }), { status: 429, headers: CORS });
    } catch (err) { console.error('Rate limit check failed:', err.message); }
  }

  let resultData;
  let apiError = false;

  try {
    const anthropicRes = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      MODEL,
        max_tokens: MAX_TOKENS,
        system:     'You are a helpful veterinary triage assistant. Always respond with valid JSON only — no markdown, no backticks, no extra text.',
        messages: [{ role: 'user', content: buildPrompt({ animal, petName, petAge, petWeight, petSex, symptoms, description, duration }) }],
      }),
    });

    if (!anthropicRes.ok) {
      const errBody = await anthropicRes.text();
      throw new Error(`Anthropic API returned ${anthropicRes.status}: ${errBody}`);
    }
    const anthropicData = await anthropicRes.json();
    resultData = parseClaudeResponse(anthropicData.content);

  } catch (err) {
    console.error('Claude call failed:', err.message);
    apiError = true;
    resultData = {
      urgency: 'warning',
      headline: 'Unable to complete analysis — please consult your vet',
      urgency_sub: 'Our analysis service is temporarily unavailable.',
      immediate_action: 'We were unable to analyze the symptoms right now. If you are concerned about your pet, please contact your veterinarian directly. For emergencies, call the nearest animal hospital immediately.',
      detailed_causes: [], home_care: [], vet_checklist: [], red_flags: [],
    };
  }

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    sbInsert('symptom_checks', { session_id: sessionId, animal, symptoms, duration, urgency: resultData.urgency, ip_hash: ipHash, error: apiError })
      .catch(err => console.error('Supabase log error:', err.message));
  }

  return new Response(JSON.stringify(resultData), { status: apiError ? 503 : 200, headers: CORS });
};
