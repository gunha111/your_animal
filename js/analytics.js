// analytics.js — GA4 custom events + Microsoft Clarity integration
// Include this file on all pages AFTER the GA4 gtag script.

(function() {
  'use strict';

  // ── GA4 helper ────────────────────────────────────────────────────────────
  function gtrack(eventName, params) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params || {});
    }
  }

  // ── Page-level events ────────────────────────────────────────────────────
  const page = location.pathname.replace(/\/index\.html$/, '/');

  if (page.includes('quiz')) {
    gtrack('quiz_started', { page_location: location.href });
  }

  if (page.includes('results')) {
    gtrack('result_viewed', { page_location: location.href });
  }

  // ── Quiz: question answered ───────────────────────────────────────────────
  // Emits when a quiz option is selected. Quiz page fires this via data attr.
  window.trackQuizAnswer = function(questionIndex, answer) {
    gtrack('quiz_question_answered', {
      question_index: questionIndex,
      answer_value: answer,
    });
  };

  // ── Quiz: completed ───────────────────────────────────────────────────────
  window.trackQuizCompleted = function(topPet, percentage) {
    gtrack('quiz_completed', {
      top_pet: topPet,
      top_percentage: percentage,
    });
  };

  // ── Share button clicked ──────────────────────────────────────────────────
  window.trackShare = function(method) {
    gtrack('share_button_clicked', { share_method: method });
  };

  // ── Upsell events ─────────────────────────────────────────────────────────
  window.trackUpsellSeen = function(plan) {
    gtrack('upsell_seen', { plan });
  };
  window.trackUpsellClick = function(plan) {
    gtrack('upsell_clicked', { plan });
  };

  // ── Purchase completed ────────────────────────────────────────────────────
  window.trackPurchase = function(plan, value) {
    gtrack('purchase_completed', {
      plan,
      value: value || 0,
      currency: 'USD',
    });
  };

  // ── Auto-track share buttons ──────────────────────────────────────────────
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('[class*="share-btn"]');
    if (btn) {
      const method = btn.classList.contains('share-twitter') ? 'twitter'
        : btn.classList.contains('share-native') ? 'native'
        : btn.classList.contains('share-card-dl') ? 'story_card'
        : 'other';
      gtrack('share_button_clicked', { share_method: method });
    }

    // Upsell click
    const pricingBtn = e.target.closest('.pricing-card-btn, .pricing-card');
    if (pricingBtn) {
      const plan = pricingBtn.closest('[onclick*="subscription"]') ? 'subscription' : 'one_time';
      gtrack('upsell_clicked', { plan });
    }
  });

  // ── Upsell seen (IntersectionObserver on paywall section) ─────────────────
  const paywallEl = document.querySelector('.paywall-section, [class*="paywall"]');
  if (paywallEl && 'IntersectionObserver' in window) {
    let seen = false;
    const obs = new IntersectionObserver(entries => {
      if (!seen && entries[0].isIntersecting) {
        seen = true;
        gtrack('upsell_seen', { plan: 'all' });
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(paywallEl);
  }

})();
