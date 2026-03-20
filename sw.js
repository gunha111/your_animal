// My Pet Generator — Service Worker
const CACHE = 'mpg-v2';
const STATIC = [
  '/',
  '/index.html',
  '/quiz.html',
  '/results.html',
  '/css/style.css',
  '/js/paywall.js',
  '/js/auth.js',
  '/js/scoring.js',
  '/js/supabase-config.js',
  '/data/questions.js',
  '/data/pets.js',
  '/data/care-plans.js',
];

// Install: cache static assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first for HTML/API, cache-first for assets
self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // Skip non-GET and external requests (Supabase, Paddle, CDN)
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  // HTML pages: network-first (always fresh)
  if (request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Assets (CSS/JS/data): cache-first
  e.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
        }
        return res;
      });
    })
  );
});
