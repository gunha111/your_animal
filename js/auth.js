// ================================================================
// My Pet Generator — Supabase Auth
// Magic link login, purchase restore, nav button injection
// ================================================================

(function initYAAuth() {
  function run() {
    if (typeof window.supabase === 'undefined' ||
        typeof SUPABASE_URL === 'undefined' ||
        typeof SUPABASE_ANON_KEY === 'undefined') {
      // SDK not loaded — still show Log in button
      injectAuthButton(null);
      return;
    }
    setup();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  let authClient = null;
  const isInBlogDir = window.location.pathname.includes('/blog/');
  const rootPath   = isInBlogDir ? '../' : '';

  function setup() {
    authClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Expose globally so account.html can use it
    window.YAAuth = {
      getClient:  () => authClient,
      signOut:    signOut,
      getSession: () => authClient.auth.getSession(),
    };

    authClient.auth.onAuthStateChange(async (event, session) => {
      injectAuthButton(session?.user ?? null);
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session?.user) {
        await restorePurchases(session.user.id, session.access_token);
      }
    });
  }

  // ── Inject Log in / Account button into nav ──────────────────
  function injectAuthButton(user) {
    const nav = document.querySelector('.header-inner nav');
    if (!nav) return;

    const existing = document.getElementById('ya-auth-nav-btn');
    if (existing) existing.remove();

    const btn = document.createElement('a');
    btn.id = 'ya-auth-nav-btn';

    if (user) {
      btn.textContent = '👤 Account';
      btn.href = `${rootPath}account.html`;
      btn.style.cssText = 'font-size:0.85rem;font-weight:700;color:var(--primary);text-decoration:none;white-space:nowrap;';
    } else {
      btn.textContent = 'Log in';
      btn.href = '#';
      btn.style.cssText = 'font-size:0.85rem;font-weight:600;color:var(--text-muted);text-decoration:none;white-space:nowrap;cursor:pointer;';
      btn.addEventListener('click', (e) => { e.preventDefault(); showAuthModal(); });
    }

    const quizBtn = nav.querySelector('.cta-btn');
    quizBtn ? nav.insertBefore(btn, quizBtn) : nav.appendChild(btn);
  }

  // ── Sign out ─────────────────────────────────────────────────
  async function signOut() {
    if (authClient) await authClient.auth.signOut();
    // Clear subscription cache on logout
    localStorage.removeItem('ya_sub_expiry');
    localStorage.removeItem('ya_name_gen_paid');
    localStorage.removeItem('ya_care_plan_paid');
    localStorage.removeItem('ya_quiz_paid');
    window.location.href = rootPath + 'index.html';
  }

  // ── Restore purchases from Supabase on login ─────────────────
  async function restorePurchases(userId, accessToken) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/purchases?user_id=eq.${userId}&select=product_type,status,expires_at`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) return;
      const rows = await res.json();

      rows.forEach(p => {
        if (p.status !== 'active') return;
        if (p.product_type === 'subscription') {
          const expiry = p.expires_at
            ? new Date(p.expires_at).getTime()
            : Date.now() + 30 * 24 * 60 * 60 * 1000;
          if (expiry > Date.now()) {
            localStorage.setItem('ya_sub_expiry',      String(expiry));
            localStorage.setItem('ya_name_gen_paid',   '1');
            localStorage.setItem('ya_care_plan_paid',  '1');
            localStorage.setItem('ya_quiz_paid',       '1');
          }
        } else if (p.product_type === 'name_gen') {
          localStorage.setItem('ya_name_gen_paid', '1');
        } else if (p.product_type === 'care_plan') {
          localStorage.setItem('ya_care_plan_paid', '1');
        } else if (p.product_type === 'quiz_unlock') {
          localStorage.setItem('ya_quiz_paid', '1');
        }
      });
      console.log(`Auth: restored ${rows.length} purchase(s)`);
    } catch (e) {
      console.warn('Auth: purchase restore failed', e);
    }
  }

  // ── Auth modal ───────────────────────────────────────────────
  window.showAuthModal = function () {
    const existing = document.getElementById('ya-auth-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'ya-auth-modal';
    modal.innerHTML = `
      <div id="ya-auth-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;">
        <div style="background:white;border-radius:24px;padding:40px 36px;max-width:400px;width:100%;box-shadow:0 32px 80px rgba(0,0,0,0.25);position:relative;animation:fadeUp 0.2s ease;">
          <button id="ya-auth-close" style="position:absolute;top:14px;right:16px;background:none;border:none;font-size:1.5rem;cursor:pointer;color:#9CA3AF;line-height:1;">×</button>
          <div style="text-align:center;margin-bottom:28px;">
            <div style="font-size:2.8rem;margin-bottom:10px;">🐾</div>
            <h2 style="font-size:1.4rem;font-weight:800;color:#111827;margin:0 0 8px;">Log in to My Pet Generator</h2>
            <p style="font-size:0.88rem;color:#6B7280;margin:0;">Enter your email — we'll send a magic link.<br>No password required.</p>
          </div>
          <div id="ya-auth-form">
            <input id="ya-auth-email" type="email" placeholder="your@email.com"
              style="width:100%;padding:14px 18px;border:2px solid #E5E7EB;border-radius:12px;font-size:1rem;font-family:inherit;box-sizing:border-box;margin-bottom:14px;outline:none;transition:border-color 0.2s;" />
            <button id="ya-auth-submit"
              style="width:100%;padding:15px;background:linear-gradient(135deg,#6366f1,#4f46e5);color:white;border:none;border-radius:12px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;transition:opacity 0.2s;">
              Send Magic Link →
            </button>
            <p id="ya-auth-error" style="display:none;color:#DC2626;font-size:0.85rem;text-align:center;margin-top:10px;"></p>
          </div>
          <div id="ya-auth-sent" style="display:none;text-align:center;padding:10px 0;">
            <div style="font-size:3rem;margin-bottom:14px;">📬</div>
            <p style="font-weight:800;color:#111827;font-size:1.05rem;margin:0 0 8px;">Check your inbox!</p>
            <p style="font-size:0.88rem;color:#6B7280;margin:0;">We sent a login link to<br><strong id="ya-sent-email" style="color:#4F46E5;"></strong></p>
          </div>
          <p style="font-size:0.75rem;color:#9CA3AF;text-align:center;margin:20px 0 0;">By logging in, you agree to our <a href="${rootPath}terms.html" style="color:#6366f1;">Terms</a> and <a href="${rootPath}privacy.html" style="color:#6366f1;">Privacy Policy</a>.</p>
        </div>
      </div>
      <style>@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}</style>
    `;
    document.body.appendChild(modal);

    const emailInput = document.getElementById('ya-auth-email');
    const submitBtn  = document.getElementById('ya-auth-submit');

    setTimeout(() => emailInput.focus(), 60);

    const close = () => modal.remove();
    document.getElementById('ya-auth-close').onclick = close;
    document.getElementById('ya-auth-overlay').onclick = (e) => {
      if (e.target.id === 'ya-auth-overlay') close();
    };

    emailInput.addEventListener('focus', () => emailInput.style.borderColor = '#6366f1');
    emailInput.addEventListener('blur',  () => emailInput.style.borderColor = '#E5E7EB');
    emailInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitBtn.click(); });

    submitBtn.onclick = async () => {
      const email = emailInput.value.trim();
      if (!email.includes('@')) {
        showErr('Please enter a valid email address.');
        return;
      }
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      const redirectTo = window.location.hostname === 'localhost'
        ? window.location.origin
        : 'https://mypetgenerator.com/';

      const { error } = await authClient.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });

      if (error) {
        showErr(error.message);
        submitBtn.textContent = 'Send Magic Link →';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      } else {
        document.getElementById('ya-auth-form').style.display = 'none';
        document.getElementById('ya-sent-email').textContent = email;
        document.getElementById('ya-auth-sent').style.display = 'block';
      }
    };

    function showErr(msg) {
      const el = document.getElementById('ya-auth-error');
      el.textContent = msg;
      el.style.display = 'block';
    }
  };
})();
