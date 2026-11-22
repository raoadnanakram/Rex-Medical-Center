# rules.md — Project rules

## 1. What to use
- Functional React components + hooks; styling sirf **Tailwind utility classes** (brand colors ke liye `bg-[#1c296b]` jaisi arbitrary values already use ho rahi hain).
- Animations: framer-motion. Icons: lucide-react.
- API calls: `import { API_BASE_URL } from '../../config/api'` (ya `config` se `API_URL`) — URL kabhi hardcode na karein.
- Business info: `data/business.js`. Page SEO: `data/seoRoutes.js`.
- Naya page: `lazyPage()` + `pageRoutes` mein entry (`routes/index.jsx`).

## 2. What to avoid
- `import React from 'react'` (JSX automatic hai; unused import lint error deta hai).
- Pages ko `App.jsx` mein direct import karna (code splitting toot jati hai, admin code public bundle mein aa jata hai).
- Navbar/Footer mein purane slugs (`/donate-now`, `/services/sensorytherapy`, `/conditions`) — sirf canonical slugs.
- Tailwind CDN `<script>` ya `App.css`-style global resets (Tailwind config se hota hai).
- Secrets / `.env` values frontend code mein.

## 3. Libraries & dependencies
`package.json` ke dependencies hi allowed hain. Nayi library jodne se pehle poochein; version pin `^` style mein.

## 4. Error handling
- API fail ho to user-friendly message dikhayein (pages mein `loadError` / `formError` state pattern).
- Page chunk load fail ho to `ChunkErrorBoundary` ("Try again") dikhata hai.
- Empty `catch (e)` mein unused variable na rakhein — `catch {` likhein.

## 5. Boundaries of AI
- AI sirf `frontend/` badle. `backend/`, `.env`, database files ko na chhuye jab tak explicitly na kaha jaye.
- Bina poochay folders move/rename ya dependencies upgrade na kare.
- Medical claims, doctor ki qualifications ya contact details apni taraf se na likhe — `teamData.js` / `business.js` ka data use kare.
- Agar kuch pata na ho to andaza lagane ke bajaye pooche.

## 6. General rules
- Component/page file names PascalCase (`SensoryTherapy.jsx`); folders lowercase.
- Har change ke baad `npm run lint` chalayein; naye lint errors na laayein.
- Har badi tabdeeli `docs/memory.md` mein likhein.
- Build: `npm run build` (local par prerender ke liye Node 20+).
