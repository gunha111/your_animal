// ================================================================
// My Pet Generator — Payment State Manager
// Paddle Billing v2 + Supabase verification + localStorage cache
//
// Setup:
//   1. Paddle dashboard → Developer → Client-side token → PADDLE_CLIENT_TOKEN
//   2. Paddle dashboard → Catalog → Prices → PADDLE_PRICE_IDS
//   3. Netlify env vars: PADDLE_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_KEY
// ================================================================

const PADDLE_CLIENT_TOKEN = 'live_ee1c199a48838d75d5ece38b08b';

const PADDLE_PRICE_IDS = {
  name_gen:     'pri_01kkv9mkb7yem5da8v2d6zk9bt', // $1.99
  care_plan:    'pri_01kkv9rq8ae9cb24xfahcghm6c', // $2.99
  quiz_unlock:  'pri_01kkv9vq4s2ab2d90pjeayns9v', // $2.99
  subscription: 'pri_01kkv9z7hax4j6by4axsd3dzqb', // $5.99/mo
};

const STORAGE_KEYS = {
  session_id:      'ya_session_id',
  name_gen_uses:   'ya_name_gen_uses',
  name_gen_paid:   'ya_name_gen_paid',
  care_plan_paid:  'ya_care_plan_paid',
  quiz_paid:       'ya_quiz_paid',
  sub_expiry:      'ya_sub_expiry',
};

// ── Session ID (persists per browser, passed to Paddle as customData) ──
function getSessionId() {
  let sid = localStorage.getItem(STORAGE_KEYS.session_id);
  if (!sid) {
    sid = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    localStorage.setItem(STORAGE_KEYS.session_id, sid);
  }
  return sid;
}

// ── Paddle init ─────────────────────────────────────────────────
function initPaddle() {
  if (typeof Paddle === 'undefined') return;
  Paddle.Initialize({ token: PADDLE_CLIENT_TOKEN });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPaddle);
} else {
  initPaddle();
}

// ── Supabase anon query (frontend, read-only) ────────────────────
async function queryPurchases(sessionId) {
  if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') {
    return [];
  }
  try {
    const url = `${SUPABASE_URL}/rest/v1/purchases?session_id=eq.${encodeURIComponent(sessionId)}&status=eq.active&select=product_type,expires_at`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

const Paywall = {

  // ── Subscription ───────────────────────────────────────────────
  isSubscribed() {
    const expiry = parseInt(localStorage.getItem(STORAGE_KEYS.sub_expiry) || '0');
    return expiry > Date.now();
  },
  subDaysLeft() {
    const expiry = parseInt(localStorage.getItem(STORAGE_KEYS.sub_expiry) || '0');
    const diff = expiry - Date.now();
    return diff > 0 ? Math.ceil(diff / 86400000) : 0;
  },

  // ── Name Generator ─────────────────────────────────────────────
  canUseNameGen() {
    if (this.isSubscribed()) return true;
    if (localStorage.getItem(STORAGE_KEYS.name_gen_paid) === '1') return true;
    const uses = parseInt(localStorage.getItem(STORAGE_KEYS.name_gen_uses) || '0');
    return uses < 1;
  },
  isNameGenFree() {
    if (this.isSubscribed()) return true;
    if (localStorage.getItem(STORAGE_KEYS.name_gen_paid) === '1') return true;
    return parseInt(localStorage.getItem(STORAGE_KEYS.name_gen_uses) || '0') === 0;
  },
  recordNameGenUse() {
    const uses = parseInt(localStorage.getItem(STORAGE_KEYS.name_gen_uses) || '0');
    localStorage.setItem(STORAGE_KEYS.name_gen_uses, uses + 1);
  },

  // ── Care Plan ──────────────────────────────────────────────────
  canUseCarePlan() {
    if (this.isSubscribed()) return true;
    return localStorage.getItem(STORAGE_KEYS.care_plan_paid) === '1';
  },

  // ── Quiz TOP5 ──────────────────────────────────────────────────
  canSeeQuizFull() {
    if (this.isSubscribed()) return true;
    return localStorage.getItem(STORAGE_KEYS.quiz_paid) === '1';
  },

  // ── Open Paddle overlay checkout ───────────────────────────────
  async pay(type) {
    const priceId = PADDLE_PRICE_IDS[type];

    if (!priceId || priceId.includes('XXXX')) {
      alert('⚙️ Paddle Price ID not set yet.\nAdd it to js/paywall.js → PADDLE_PRICE_IDS.');
      return;
    }
    if (typeof Paddle === 'undefined') {
      alert('Payment module loading — please try again in a moment.');
      return;
    }

    // Include user_id if logged in (for cross-device purchase restore)
    const customData = {
      session_id:   getSessionId(),
      product_type: type,
    };
    if (window.YAAuth) {
      try {
        const { data: { session } } = await window.YAAuth.getSession();
        if (session?.user?.id) customData.user_id = session.user.id;
      } catch {}
    }

    Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customData,
      settings: {
        displayMode: 'overlay',
        theme: 'light',
        successUrl: `${window.location.origin}/success.html?type=${type}`,
      },
    });
  },

  // ── Apply unlocks to localStorage ──────────────────────────────
  handleSuccess(type) {
    switch (type) {
      case 'name_gen':
        localStorage.setItem(STORAGE_KEYS.name_gen_paid, '1');
        break;
      case 'care_plan':
        localStorage.setItem(STORAGE_KEYS.care_plan_paid, '1');
        break;
      case 'quiz_unlock':
        localStorage.setItem(STORAGE_KEYS.quiz_paid, '1');
        break;
      case 'subscription': {
        const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_KEYS.sub_expiry, String(expiry));
        localStorage.setItem(STORAGE_KEYS.name_gen_paid, '1');
        localStorage.setItem(STORAGE_KEYS.care_plan_paid, '1');
        localStorage.setItem(STORAGE_KEYS.quiz_paid, '1');
        break;
      }
    }
  },

  // ── Verify purchase via Supabase (called on success.html) ───────
  // Confirms the webhook wrote to DB before trusting the unlock
  async verifyAndUnlock(type) {
    const sessionId = getSessionId();
    const rows = await queryPurchases(sessionId);

    // Check if Supabase has record for this session
    const found = rows.find(r => {
      if (r.product_type === 'subscription') return true;
      if (r.product_type === type) return true;
      return false;
    });

    if (found) {
      // Sync subscription expiry from DB
      const sub = rows.find(r => r.product_type === 'subscription');
      if (sub && sub.expires_at) {
        localStorage.setItem(STORAGE_KEYS.sub_expiry, new Date(sub.expires_at).getTime());
      }
      this.handleSuccess(type);
      return true;
    }

    // Webhook may be delayed — fall back to trusting success URL
    // (Paddle's successUrl only fires after confirmed payment)
    this.handleSuccess(type);
    return false;
  },

  // ── Sync all active purchases from Supabase ─────────────────────
  // Call on page load to keep localStorage in sync
  async syncFromSupabase() {
    const sessionId = getSessionId();
    const rows = await queryPurchases(sessionId);
    if (!rows.length) return;

    for (const row of rows) {
      if (row.status !== 'active') continue;
      if (row.product_type === 'subscription' && row.expires_at) {
        const expiry = new Date(row.expires_at).getTime();
        if (expiry > Date.now()) {
          localStorage.setItem(STORAGE_KEYS.sub_expiry, expiry);
          localStorage.setItem(STORAGE_KEYS.name_gen_paid, '1');
          localStorage.setItem(STORAGE_KEYS.care_plan_paid, '1');
          localStorage.setItem(STORAGE_KEYS.quiz_paid, '1');
        }
      } else if (row.product_type === 'name_gen') {
        localStorage.setItem(STORAGE_KEYS.name_gen_paid, '1');
      } else if (row.product_type === 'care_plan') {
        localStorage.setItem(STORAGE_KEYS.care_plan_paid, '1');
      } else if (row.product_type === 'quiz_unlock') {
        localStorage.setItem(STORAGE_KEYS.quiz_paid, '1');
      }
    }
  },

  // ── Server-side access verification ────────────────────────────
  // Hits /api/verify-access with SERVICE_KEY — cannot be bypassed via DevTools.
  // Result is cached in sessionStorage for the current tab session only.
  async verifyServer() {
    const SESSION_CACHE_KEY = 'mpg_sv_quiz';

    // Reuse within same tab session (sessionStorage clears on tab close)
    const cached = sessionStorage.getItem(SESSION_CACHE_KEY);
    if (cached !== null) return cached === '1';

    const sessionId = localStorage.getItem(STORAGE_KEYS.session_id);
    let userId = null;
    if (window.YAAuth) {
      try {
        const { data: { session } } = await window.YAAuth.getSession();
        userId = session?.user?.id || null;
      } catch {}
    }

    // Nothing to verify against
    if (!sessionId && !userId) {
      sessionStorage.setItem(SESSION_CACHE_KEY, '0');
      return false;
    }

    try {
      const res = await fetch('/api/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, user_id: userId }),
      });
      if (!res.ok) throw new Error('non-ok');
      const { valid, products } = await res.json();

      // Sync localStorage from authoritative server response
      if (valid && products) {
        if (products.includes('subscription')) {
          localStorage.setItem(STORAGE_KEYS.name_gen_paid, '1');
          localStorage.setItem(STORAGE_KEYS.care_plan_paid, '1');
          localStorage.setItem(STORAGE_KEYS.quiz_paid, '1');
        }
        if (products.includes('quiz_unlock'))  localStorage.setItem(STORAGE_KEYS.quiz_paid, '1');
        if (products.includes('name_gen'))     localStorage.setItem(STORAGE_KEYS.name_gen_paid, '1');
        if (products.includes('care_plan'))    localStorage.setItem(STORAGE_KEYS.care_plan_paid, '1');
      }

      sessionStorage.setItem(SESSION_CACHE_KEY, valid ? '1' : '0');
      return valid;
    } catch {
      // Network error — fall back to localStorage (fail-open, not fail-closed)
      const localSays = this.canSeeQuizFull();
      sessionStorage.setItem(SESSION_CACHE_KEY, localSays ? '1' : '0');
      return localSays;
    }
  },

  // ── URL param check (legacy / fallback) ────────────────────────
  checkReturnFromPayment() {
    const params = new URLSearchParams(window.location.search);
    const paid = params.get('paid');
    if (paid) {
      this.handleSuccess(paid);
      window.history.replaceState({}, '', window.location.pathname);
      return paid;
    }
    return null;
  },
};
