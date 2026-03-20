// sitemap.js — Dynamic sitemap.xml via Netlify Function
export const config = { path: '/sitemap.xml' };

const BASE = 'https://mypetgenerator.com';

const STATIC_PAGES = [
  { url: '/',                  priority: '1.0', changefreq: 'weekly'  },
  { url: '/quiz.html',         priority: '0.9', changefreq: 'monthly' },
  { url: '/results.html',      priority: '0.7', changefreq: 'monthly' },
  { url: '/blog.html',         priority: '0.8', changefreq: 'weekly'  },
  { url: '/pricing.html',      priority: '0.7', changefreq: 'monthly' },
  { url: '/name-generator.html', priority: '0.7', changefreq: 'monthly' },
  { url: '/care-plan.html',    priority: '0.6', changefreq: 'monthly' },
  { url: '/community.html',    priority: '0.6', changefreq: 'weekly'  },
  { url: '/embed.html',        priority: '0.5', changefreq: 'monthly' },
];

const BLOG_POSTS = [
  '/blog/what-pet-should-i-get.html',
  '/blog/best-pets-for-introverts.html',
  '/blog/best-pets-for-college-students.html',
  '/blog/dog-vs-cat-for-apartment.html',
  '/blog/cute-cat-names-200-list.html',
  '/blog/hamster-care-routine.html',
  '/blog/first-pet-guide.html',
  '/blog/pet-cost-guide.html',
  '/blog/pet-health-check.html',
  '/blog/small-pet-guide.html',
  '/blog/dog-vs-cat.html',
];

export default async () => {
  const now = new Date().toISOString().split('T')[0];

  const staticUrls = STATIC_PAGES.map(p => `
  <url>
    <loc>${BASE}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('');

  const blogUrls = BLOG_POSTS.map(p => `
  <url>
    <loc>${BASE}${p}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${blogUrls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
