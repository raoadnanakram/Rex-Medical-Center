# seo-checklist.md — 11-point SEO launch checklist

Status: ✅ code mein ho chuka | 🟡 code ready, aap ko ek step karna hai | 👤 sirf aap kar sakte hain (account/login chahiye)

| # | Point | Status | Kya hai / kya karna hai |
|---|---|---|---|
| 1 | Remove the Noindex tag | ✅ | Public pages par `noindex` nahi hai. Sirf admin/login aur 404 par hai (`data/headTags.js`), jo sahi hai. |
| 2 | Set up Google Search Console | 🟡 | search.google.com/search-console par `rexmedcomplex.com` add karein. Verification ke liye `index.html` mein commented `google-site-verification` tag hai: code paste karke comment hata dein. Ya Google ki di hui HTML file `public/` mein rakh dein. |
| 3 | Submit your sitemap | 🟡 | `sitemap.xml` har build par khud banta hai (22 URLs) aur `robots.txt` mein link hai. Search Console → Sitemaps mein `https://rexmedcomplex.com/sitemap.xml` submit karein. |
| 4 | Request indexing for homepage | 👤 | Search Console → URL Inspection → `https://rexmedcomplex.com/` → Request Indexing. Phir `/services`, `/book-a-free-consult` ke liye bhi. |
| 5 | Set up Bing Webmaster Tools | 🟡 | bing.com/webmasters par Search Console se import kar sakte hain. Ya `index.html` ka `msvalidate.01` tag use karein. |
| 6 | Install Google Analytics | ✅ | GA4 (`G-K39N622R6D`) `index.html` mein laga hai; admin/login pages ginti mein nahi. |
| 7 | Create Google Business Profile | 👤 | business.google.com par banayein. Banne ke baad Maps link, opening hours aur coordinates `data/structuredData.js` mein add karein (`hasMap`, `openingHoursSpecification`, `geo`). Social profiles (`sameAs`) pehle se schema mein hain. |
| 8 | Switch on HTTPS | 🟡 | `index.html` mein http→https backup redirect hai. Asal switch: GitHub repo → Settings → Pages → **Enforce HTTPS** ON karein (domain `rexmedcomplex.com`). |
| 9 | Unique title for every page | ✅ | `data/seoRoutes.js` mein 22 pages ke unique titles (sab 60 characters se kam) + descriptions. `/career` aur news posts ko bhi SEO entry mili. Naya page jodein to yahan entry zaroor likhein. |
| 10 | Check your page speed | ✅ / 👤 | Code: har page alag chunk, Font Awesome aur Google Fonts non-blocking, saari images WebP (2.0 MB se 0.86 MB), hero image preload + `fetchpriority=high`, neeche wali images lazy-load. Aap: deploy ke baad pagespeed.web.dev par dobara test karein aur score `memory.md` mein likhein. |
| 11 | Allow ChatGPT Search to crawl | ✅ | `public/robots.txt` mein `OAI-SearchBot`, `ChatGPT-User` (aur `PerplexityBot`) allowed hain. `llms.txt` har build par banta hai. |

## Baad mein dekhne wali cheezein
- Home page par ek image Unsplash ke external link se aati hai (`pages/public/Home.jsx`); isay apni image se badalna speed aur reliability ke liye behtar hai.
- Zyada images ke `width`/`height` set nahi hain (layout shift kam karne ke liye add kiye ja sakte hain).
- `GPTBot` (training crawler) jaan bujh kar allow list mein nahi dala; chahein to `robots.txt` mein add kar lein.
