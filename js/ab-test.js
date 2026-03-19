// ab-test.js — Lightweight A/B testing framework
// Usage: add data-ab-test="test-name" data-ab-variants="A,B" to any element
// Variant is randomly assigned once per user (persisted in localStorage)
// Events logged to Supabase ab_events table

(function() {
  'use strict';

  const STORAGE_KEY = 'mpg_ab_variants';

  // Load existing variant assignments
  let assignments = {};
  try {
    assignments = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {}

  // Get or assign a variant for a test
  function getVariant(testName, variants) {
    if (assignments[testName]) return assignments[testName];
    const idx = Math.floor(Math.random() * variants.length);
    assignments[testName] = variants[idx];
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments)); } catch {}
    return assignments[testName];
  }

  // Log event to Supabase (fire and forget)
  async function logEvent(testName, variant, event, metadata = {}) {
    try {
      const supabaseUrl = window.SUPABASE_URL || '';
      const supabaseKey = window.SUPABASE_ANON_KEY || '';
      if (!supabaseUrl || !supabaseKey) return;

      await fetch(`${supabaseUrl}/rest/v1/ab_events`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          test_name: testName,
          variant,
          event,
          metadata,
          page: location.pathname,
          session_id: sessionStorage.getItem('mpg_session') || null,
        }),
      });
    } catch {}
  }

  // Process all data-ab-test elements on the page
  function initTests() {
    document.querySelectorAll('[data-ab-test]').forEach(el => {
      const testName = el.dataset.abTest;
      const variants = (el.dataset.abVariants || 'A,B').split(',').map(v => v.trim());
      const variant = getVariant(testName, variants);

      // Apply variant class and data attribute
      el.classList.add(`ab-${variant.toLowerCase()}`);
      el.dataset.abVariant = variant;

      // Log impression
      logEvent(testName, variant, 'impression');

      // Log click
      el.addEventListener('click', () => {
        logEvent(testName, variant, 'click');
      });
    });
  }

  // Expose for manual event logging
  window.MPG_AB = {
    getVariant,
    logEvent,
    getAll: () => ({ ...assignments }),
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTests);
  } else {
    initTests();
  }
})();
