# phases.doc.md — Project phases

Status code padh kar likha gaya hai (✅ maujood, ⚠️ adhoora, ❌ nahi).

## Phase 1: Login & Authentication
- ✅ Admin login (`AdminLogin.jsx`, `/api/auth/login`), token `localStorage['adminToken']`
- ✅ Change password (`/api/auth/change-password`)

## Phase 2: Dashboard
- ✅ `AdminDashboard.jsx` (appointments, contacts, reviews, careers, orders, notes, settings)
- ⚠️ File 5000+ lines hai — chhote components mein todna baqi hai

## Phase 3: CRUD operations
- ✅ Appointments, contacts, reviews, careers, news, products + categories, orders (list / status / payment)
- ✅ Search/filter admin pages mein

## Phase 4: Additional features
- ✅ Therapy Tools shop (cart, wishlist, orders), Career CV upload, Reviews submit
- ✅ SEO: seoRoutes, JSON-LD, sitemap, llms.txt, prerender
- ✅ WhatsApp float button, GA4

## Phase 5: Testing & Quality Assurance
- ❌ Koi automated test nahi
- ⚠️ ESLint: 31 react-hooks v7 errors baqi (set-state-in-effect 15, static-components 10, purity 3, exhaustive-deps 2, refs 1)
- ⚠️ `npm run build` is restructure ke baad aap ke machine par chalana baqi hai

## Phase 6: Deployment & Maintenance
- ✅ GitHub Pages (`npm run deploy`), domain `rexmedcomplex.com`
- Next: Phase 5 ke items, Home.jsx (1850 lines) / AdminDashboard.jsx todna, `/career` ko seoRoutes mein add karna (agar index karwana ho)
