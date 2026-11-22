# memory.md — Project memory (AI ke liye, har session ke baad update karein)

## Project
REX Medical Complex frontend. Owner: Rao Adnan Akram. Docs-first structure ("Things before Vibe Coding"): PRD, architecture, rules, phases, design, memory.

## Currently working
Frontend restructure + bug fixes complete (Nov 2026). Naya structure `docs/architecture.md` mein.

## What happened (21 Nov 2026)
- `src/` ko folders mein baanta: `components/layout|seo`, `pages/public|services|admin`, `routes/`, `assets/images/<group>`.
- `Sensorytherapy.jsx` → `SensoryTherapy.jsx`, `Playtherapy.jsx` → `PlayTherapy.jsx`.
- `App.jsx` ab `routes/index.jsx` ki single list se routes banata hai; `ScrollToTop` aur `MainLayout` alag components.
- Bugs fixed: Sensory/Play therapy, Donate aur 3 legal pages 404 dikha rahe the; `<Seo />` kabhi render nahi hota tha; purane URL redirects App mein lage hi nahi the; pages eagerly import hone se lazy loading kaam nahi kar rahi thi.
- Unused files hataye: `App.css`, `assets/react.svg`, `assets/vite.svg`, `assets/hero.png`; 12 unused-variable lint errors theek.

## SEO checklist (21 Nov 2026)
11-point checklist `docs/seo-checklist.md` mein. Code side: `/career` seoRoutes mein, news post ka fallback SEO, JSON-LD `sameAs` (social links ab `data/business.js` mein), robots.txt mein OAI-SearchBot/ChatGPT-User/PerplexityBot, http→https backup, non-blocking Font Awesome, lazy-loaded images. Owner steps baqi: Search Console, Bing, Business Profile, Enforce HTTPS, PageSpeed score.

## Mobile speed work (22 Nov 2026)
PageSpeed (live, before these changes): desktop 95 perf / 90 accessibility / 100 best practices / 92 SEO; mobile Core Web Vitals failed (LCP 5.3 s, FCP 5.2 s, TTFB 1.3 s, CLS 0, INP no data).
Changes: all images converted to resized WebP (2.0 MB -> 0.86 MB), logo.png 117 -> 68 KB, Google Fonts stylesheet non-blocking, prerender adds `<link rel="preload" as="image">` for the hero image (first `<img fetchpriority="high">`), `scripts/optimize-images.mjs` now covers `src/assets/images/**` and webp.
Next: redeploy, re-test mobile, then check the Diagnostics list (unused JS, render-blocking, image sizes). Consider Cloudflare (free) in front of GitHub Pages for TTFB and caching.

## Known open items
- `AdminDashboard.jsx` (~5300 lines) aur `Home.jsx` (~1850) bahut bade hain.
- 31 ESLint react-hooks v7 errors (behaviour-risky, jaan bujh kar nahi chhere).
- `assets/images/team/Ahsan.jpg`, `AbdulMannan.jpg` kahin use nahi ho rahi.
- Project root par purani Vite-template files (`package.json`, `vite.config.js`, `index.html`, `eslint.config.js`, `README.md`) aur `backend.zip` pari hain; `backend/.env` zip mein shamil tha — in sab ko is session mein chheda nahi.
