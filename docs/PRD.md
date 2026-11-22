# PRD — REX Medical Complex Website (Frontend)

Product Requirement Document. Isay code likhne se pehle padhein.

## 1. What to build
REX Medical Complex (Allama Iqbal Town, Lahore) ki public website + staff admin panel ka **frontend**.
Goal: parents ko child therapy services dikhana, trust banana (team, reviews), aur free consultation / appointment book karwana.
Live domain: `rexmedcomplex.com` (GitHub Pages, `public/CNAME`). Backend alag hai: `../backend` (Express + SQL), API `https://api.rexmedcomplex.com`.

## 2. Targeted users
- **Parents / guardians** — bachon ke liye speech, ABA, occupational, physio, play therapy dhoondte hain (mobile par zyada).
- **Job applicants** — Career page se CV bhejte hain.
- **Staff / admin** — appointments, contacts, reviews, news, careers, shop products aur orders manage karte hain.

## 3. Features
Public site:
- Home, About Us, Our Team (leadership modal + category filter), Services + 7 service pages + Conditions
- Book a Free Consult (appointment form), Contact form, Career (CV upload), Donate
- Reviews (public list + review submit), News & Events (+ detail page)
- Therapy Tools (kids products shop: cart, wishlist, order flow)
- Legal pages: Privacy Policy, Terms of Service, Medical Disclaimer
- WhatsApp floating button, Navbar/Footer, 404 page
- SEO: per-page title/meta/canonical/JSON-LD, prerendered static HTML, sitemap.xml, llms.txt

Admin (bina Navbar/Footer):
- Login, Dashboard (appointments, contacts, reviews, news, careers, orders), Shop manager, News manager

## 4. Out of scope (is repo mein)
Backend code (`../backend`), database, email sending.
