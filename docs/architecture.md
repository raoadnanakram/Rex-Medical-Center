# architecture.md — High-level design

## 1. Architecture
- **React 18 + Vite** single-page app, **react-router-dom v6**.
- **Prerender (SSG-style)**: `npm run build` = client build + SSR build (`src/entry-server.jsx`) + `scripts/prerender.mjs`.
  Har SEO route ka static HTML banta hai (`dist/<route>/index.html`), saath mein redirect pages, `404.html`, `sitemap.xml`, `llms.txt`.
- Browser mein `main.jsx` pehle current page ka chunk load karta hai (`preloadRoute`) phir `hydrateRoot` (ya empty shell par `createRoot`).
- **Code splitting**: har page `lazyPage()` se apna chunk hai (`routes/lazyPage.jsx`).
- **Single route table**: `src/routes/index.jsx` (`pageRoutes`). `App.jsx` isi se `<Route>` banata hai; prerender/preload bhi yahi use karte hain.
- **SEO data ek jagah**: `src/data/seoRoutes.js` (canonical URLs + `redirects` purane URLs ke liye). Navbar/Footer ke links in canonical slugs se match hone chahiyein.
- Frontend backend se REST API (`/api/*`) se baat karta hai; base URL `src/config/api.js` (`VITE_API_URL` se override, dev = `http://localhost:5000`).
- Admin auth: JWT token `localStorage['adminToken']`.

## 2. Folder & file structure
```
frontend/
├── docs/            (6 core documents + seo-checklist.md)
├── public/          (favicon, logo, og-image, CNAME, robots.txt, .htaccess)
├── scripts/         (prerender.mjs, optimize-images.mjs)
├── index.html  tailwind.config.js  postcss.config.js  vite.config.js  eslint.config.js  package.json
src/
├── assets/
│   └── images/
│       ├── booking/
│       │   ├── Book1.jpg
│       │   └── Book2.jpg
│       ├── common/
│       │   └── family.jpg
│       ├── contact/
│       │   ├── contact1.jpg
│       │   └── contact2.jpg
│       ├── hero/
│       │   └── hero-banner.jpg
│       ├── services/
│       │   ├── ABATherapy.jpg
│       │   ├── conditions.png
│       │   ├── Consultant.jpg
│       │   ├── Occupational.jpg
│       │   ├── OccupationalTherapy.jpg
│       │   ├── Physiotherapy.jpg
│       │   └── SpeechlanguageTherapy.jpg
│       └── team/
│           ├── AbdulMannan.jpg
│           ├── Abdulrehman.jpeg
│           ├── Aftab.jpg
│           ├── Ahsan.jpg
│           ├── Asia.jpg
│           ├── Ayaz.jpg
│           ├── Dr.png
│           ├── Kashif.jpg
│           ├── Naveed.jpeg
│           └── Usman.jpg
├── components/
│   ├── layout/
│   │   ├── Footer.jsx
│   │   ├── MainLayout.jsx
│   │   ├── Navbar.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── WhatsAppFloat.jsx
│   └── seo/
│       └── Seo.jsx
├── config/
│   ├── api.js
│   └── index.js
├── data/
│   ├── business.js
│   ├── headTags.js
│   ├── seoRoutes.js
│   ├── structuredData.js
│   └── teamData.js
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminNews.jsx
│   │   └── AdminShop.jsx
│   ├── public/
│   │   ├── AboutUs.jsx
│   │   ├── BookConsult.jsx
│   │   ├── Career.jsx
│   │   ├── Contact.jsx
│   │   ├── DonateNow.jsx
│   │   ├── Home.jsx
│   │   ├── LegalPage.jsx
│   │   ├── NewsDetail.jsx
│   │   ├── NewsEvents.jsx
│   │   ├── NotFound.jsx
│   │   ├── OurTeam.jsx
│   │   ├── Reviews.jsx
│   │   └── Tools.jsx
│   └── services/
│       ├── BehaviorTherapy.jsx
│       ├── Conditions.jsx
│       ├── OccupationalTherapy.jsx
│       ├── Physiotherapy.jsx
│       ├── PlayTherapy.jsx
│       ├── SensoryTherapy.jsx
│       ├── Services.jsx
│       ├── SpecialistConsultations.jsx
│       └── SpeechTherapy.jsx
├── routes/
│   ├── index.jsx
│   └── lazyPage.jsx
├── App.jsx
├── entry-server.jsx
├── index.css
└── main.jsx
```

Kahan kya rakhna hai:
- Naya public page → `pages/public/`; service page → `pages/services/`; admin → `pages/admin/`; phir `routes/index.jsx` mein add + `data/seoRoutes.js` mein SEO entry (admin ko chhor kar).
- Navbar/Footer/shared layout → `components/layout/`; head/SEO → `components/seo/`.
- Business name/phone/address → sirf `data/business.js`.
- Images → `assets/images/<group>/`.

## 3. Tech stack
React 18, Vite 8, react-router-dom 6, Tailwind CSS 3 (+ PostCSS/autoprefixer), framer-motion, lucide-react, Font Awesome 6 (CDN; social icons aur Navbar ke chevrons), sharp (image optimize script), ESLint 10 (+ react-hooks v7 rules), gh-pages (deploy).
Fonts: Inter (Google Fonts) + Tailwind default serif for headings.
Analytics: GA4 (`index.html`, admin/login pages par band).
