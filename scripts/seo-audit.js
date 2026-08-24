#!/usr/bin/env node
/**
 * SEO audit for Bhagavad Gita verse/chapter pages.
 *
 * Usage:
 *   node scripts/seo-audit.js
 *   node scripts/seo-audit.js --base http://localhost:4000
 *   node scripts/seo-audit.js --all
 *   node scripts/seo-audit.js --limit 40
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const args = process.argv.slice(2);
const argValue = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const BASE = (argValue('--base', 'https://bhagvad-gita.vercel.app')).replace(/\/+$/, '');
const RUN_ALL = args.includes('--all');
const LIMIT = Number(argValue('--limit', RUN_ALL ? '0' : '24')) || 0;
const SITEMAP_FILE = path.join(__dirname, '../src/sitemap.xml');

const SAMPLE_PATHS = [
  '/',
  '/chapters',
  '/chapter/1',
  '/chapter/1/verse/1',
  '/chapter/2/verse/47',
  '/chapter/11',
  '/chapter/11/verse/16',
  '/chapter/18/verse/78'
];

const INVALID_PATHS = [
  '/chapter/99/verse/999',
  '/chapter/11/verse/main.js',
  '/chapter/11/verse/16/',
  '/home'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const request = client.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GitaSeoAudit/1.0)' }
    }, response => {
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => {
        resolve({
          url,
          status: response.statusCode,
          location: response.headers.location || '',
          contentType: response.headers['content-type'] || '',
          body: Buffer.concat(chunks).toString('utf8')
        });
      });
    });
    request.on('error', reject);
    request.setTimeout(20000, () => {
      request.destroy(new Error('timeout'));
    });
  });
}

function attr(html, name) {
  const match = html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i'))
    || html.match(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`, 'i'));
  return match ? match[1] : '';
}

function canonical(html) {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  return match ? match[1] : '';
}

function title(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? match[1].trim() : '';
}

function h1(html) {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
}

function hasJsonLd(html) {
  return /application\/ld\+json/i.test(html);
}

function robots(html) {
  return attr(html, 'robots').toLowerCase();
}

function parseSitemap(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(match => match[1].trim());
}

const PRODUCTION_ORIGIN = 'https://bhagvad-gita.vercel.app';

function expectedCanonical(pageUrl) {
  const parsed = new URL(pageUrl);
  const path = parsed.pathname.replace(/\/+$/, '');
  if (!path || path === '/') {
    return PRODUCTION_ORIGIN;
  }
  return PRODUCTION_ORIGIN + path;
}

async function auditValid(urls) {
  const failures = [];
  const titles = new Map();
  const descriptions = new Map();
  const h1s = new Map();

  for (const url of urls) {
    const result = await fetchUrl(url);
    const pageFailures = [];
    if (result.status !== 200) {
      pageFailures.push(`expected 200, got ${result.status}`);
    }
    const pageTitle = title(result.body);
    const pageDescription = attr(result.body, 'description');
    const pageH1 = h1(result.body);
    const pageCanonical = canonical(result.body);
    const pageRobots = robots(result.body);
    const expected = expectedCanonical(url);

    if (!pageTitle) pageFailures.push('missing title');
    if (!pageDescription) pageFailures.push('missing description');
    if (!pageH1) pageFailures.push('missing H1');
    if (!pageCanonical) pageFailures.push('missing canonical');
    if (pageCanonical && pageCanonical.replace(/\/+$/, '') !== expected && pageCanonical !== expected) {
      pageFailures.push(`canonical mismatch: ${pageCanonical} != ${expected}`);
    }
    if (pageRobots.includes('noindex')) pageFailures.push('robots noindex');
    if (!hasJsonLd(result.body)) pageFailures.push('missing JSON-LD');
    if (!attr(result.body, 'og:title')) pageFailures.push('missing og:title');
    if (!attr(result.body, 'twitter:title')) pageFailures.push('missing twitter:title');
    if (url.includes('/verse/') && !/whitespace-pre-line|Sanskrit|transliteration/i.test(result.body)) {
      pageFailures.push('verse content missing from HTML');
    }
    if (result.body.includes('<app-root></app-root>') && !result.body.includes('ng-version')) {
      pageFailures.push('empty app-root / no SSR');
    }

    if (pageTitle) {
      if (titles.has(pageTitle)) pageFailures.push(`duplicate title with ${titles.get(pageTitle)}`);
      titles.set(pageTitle, url);
    }
    if (pageDescription) {
      if (descriptions.has(pageDescription)) pageFailures.push(`duplicate description with ${descriptions.get(pageDescription)}`);
      descriptions.set(pageDescription, url);
    }
    if (pageH1) {
      if (h1s.has(pageH1)) pageFailures.push(`duplicate H1 with ${h1s.get(pageH1)}`);
      h1s.set(pageH1, url);
    }

    if (pageFailures.length) {
      failures.push({ url, status: result.status, pageFailures });
    }
    process.stdout.write(pageFailures.length ? 'F' : '.');
  }
  process.stdout.write('\n');
  return failures;
}

async function auditInvalid(paths) {
  const failures = [];
  for (const pagePath of paths) {
    const result = await fetchUrl(BASE + pagePath);
    const ok = pagePath.endsWith('/') || pagePath === '/home'
      ? result.status === 301 || result.status === 308 || result.status === 200
      : result.status === 404;
    if (pagePath.endsWith('/') || pagePath === '/home') {
      if (![301, 302, 308].includes(result.status)) {
        failures.push({ url: result.url, status: result.status, pageFailures: ['expected redirect'] });
      }
    } else if (result.status !== 404) {
      failures.push({ url: result.url, status: result.status, pageFailures: ['expected 404'] });
    }
    if (pagePath.includes('main.js') && /text\/html/i.test(result.contentType) && result.status === 200) {
      failures.push({ url: result.url, status: result.status, pageFailures: ['asset URL returned HTML 200'] });
    }
  }
  return failures;
}

(async () => {
  const sitemapXml = fs.readFileSync(SITEMAP_FILE, 'utf8');
  const sitemapUrls = parseSitemap(sitemapXml);
  const unique = new Set(sitemapUrls);
  const sitemapIssues = [];
  if (unique.size !== sitemapUrls.length) {
    sitemapIssues.push('sitemap contains duplicate URLs');
  }
  if (sitemapUrls.some(url => url.includes('/home'))) {
    sitemapIssues.push('sitemap still contains /home');
  }
  if (sitemapUrls.some(url => url.includes('?'))) {
    sitemapIssues.push('sitemap contains query parameters');
  }

  let targets = SAMPLE_PATHS.map(pagePath => BASE + pagePath);
  if (RUN_ALL || LIMIT) {
    const verseUrls = sitemapUrls.filter(url => url.includes('/verse/'));
    const selected = RUN_ALL ? verseUrls : verseUrls.slice(0, LIMIT);
    targets = Array.from(new Set([...targets, ...selected.map(url => url.replace('https://bhagvad-gita.vercel.app', BASE))]));
  }

  console.log(`Auditing ${targets.length} valid URLs against ${BASE}`);
  const validFailures = await auditValid(targets);
  const invalidFailures = await auditInvalid(INVALID_PATHS);
  const allFailures = [...validFailures, ...invalidFailures];

  const report = {
    base: BASE,
    checked: targets.length,
    sitemapUrlCount: sitemapUrls.length,
    sitemapIssues,
    failures: allFailures
  };
  const reportPath = path.join(__dirname, '../seo-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`Sitemap URLs: ${sitemapUrls.length}`);
  if (sitemapIssues.length) {
    sitemapIssues.forEach(issue => console.log('SITEMAP:', issue));
  }
  if (!allFailures.length) {
    console.log('SEO audit passed.');
    process.exit(0);
  }
  console.log(`SEO audit found ${allFailures.length} failing URL(s):`);
  allFailures.forEach(item => {
    console.log(`- ${item.url} [${item.status}] ${item.pageFailures.join('; ')}`);
  });
  process.exit(1);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
