// Build-time prerendering.
// Renders every indexable route to static HTML so direct requests return 200 with real
// content and per-page head tags (title, description, canonical, Open Graph, JSON-LD).
// Also writes redirect pages for moved URLs, 404.html, sitemap.xml and llms.txt.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');
const load = (rel) => import(pathToFileURL(path.join(root, rel)).href);

const { render, preloadAllRoutes } = await load('dist-server/entry-server.js');
const { seoRoutes, redirects, NOT_FOUND_META } = await load('src/data/seoRoutes.js');
const { headTagsFor } = await load('src/data/headTags.js');
const { clinicSchema, breadcrumbSchema } = await load('src/data/structuredData.js');
const { SITE_URL, BUSINESS_NAME, ADDRESS, EMAIL, PHONES } = await load('src/data/business.js');

await preloadAllRoutes();

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');
const HEAD_PATTERN = /<title>[\s\S]*?<\/title>\s*<meta name="description"[^>]*>/;
if (!HEAD_PATTERN.test(template)) {
  throw new Error('index.html must contain <title> followed by <meta name="description">');
}

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// JSON inside <script> must not be able to close the tag.
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

function headHtml(seo, schemas = []) {
  const tags = headTagsFor(seo);
  const lines = [`<title>${escapeHtml(tags.title)}</title>`];
  for (const [attr, key, value] of tags.meta) {
    if (value != null) lines.push(`<meta ${attr}="${key}" content="${escapeHtml(value)}" />`);
  }
  if (tags.canonical) lines.push(`<link rel="canonical" href="${tags.canonical}" />`);
  for (const schema of schemas) lines.push(jsonLd(schema));
  return lines.join('\n    ');
}

function buildPage(seo, appHtml, schemas) {
  return template
    .replace(HEAD_PATTERN, headHtml(seo, schemas))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function write(relPath, content) {
  const file = path.join(dist, relPath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

// Writes /x.html and /x/index.html so the static host can answer /x or /x/.
function writeRoute(routePath, html) {
  if (routePath === '/') return write('index.html', html);
  const rel = routePath.slice(1);
  write(`${rel}.html`, html);
  write(`${rel}/index.html`, html);
}

for (const route of seoRoutes) {
  const schemas = [clinicSchema, breadcrumbSchema(route)].filter(Boolean);
  writeRoute(route.path, buildPage(route, render(route.path), schemas));
  console.log(`prerendered ${route.path}`);
}

// Moved URLs: GitHub Pages can't send 301s, so an instant meta refresh plus canonical is the
// closest equivalent and is treated by Google as a permanent redirect.
for (const [from, to] of Object.entries(redirects)) {
  const target = SITE_URL + to;
  writeRoute(
    from,
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Moved | ${escapeHtml(BUSINESS_NAME)}</title>
    <link rel="canonical" href="${target}" />
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${to}" />
    <script>location.replace(${JSON.stringify(to)} + location.search + location.hash);</script>
  </head>
  <body><p>This page has moved to <a href="${to}">${target}</a>.</p></body>
</html>
`,
  );
  console.log(`redirect ${from} -> ${to}`);
}

// Unknown URLs: GitHub Pages serves this with a real 404 status. The app renders the
// matching page (or the Not Found page) in the browser.
write('404.html', buildPage(NOT_FOUND_META, '', []));

const today = new Date().toISOString().slice(0, 10);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${seoRoutes
  .map((r) => `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`,
);
console.log(`sitemap.xml written with ${seoRoutes.length} URLs`);

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI assistants.
const section = (prefix) =>
  seoRoutes
    .filter((r) => prefix(r.path))
    .map((r) => `- [${r.name}](${SITE_URL}${r.path}): ${r.description}`)
    .join('\n');
write(
  'llms.txt',
  `# ${BUSINESS_NAME}

> ${clinicSchema.description}

- Address: ${ADDRESS}
- ${PHONES.main.label}: ${PHONES.main.display}
- ${PHONES.whatsapp.label}: ${PHONES.whatsapp.display}
- ${PHONES.landline.label}: ${PHONES.landline.display}
- Email: ${EMAIL}

## Services

${section((p) => p.startsWith('/services'))}

## About and contact

${section((p) => !p.startsWith('/services') && !['/privacy-policy', '/terms-of-service', '/medical-disclaimer'].includes(p))}

## Optional

${section((p) => ['/privacy-policy', '/terms-of-service', '/medical-disclaimer'].includes(p))}
`,
);
console.log('llms.txt written');

fs.rmSync(serverDir, { recursive: true, force: true });
