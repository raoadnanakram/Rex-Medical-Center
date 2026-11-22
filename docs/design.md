# design.md — UI/UX guidelines

## 1. UI/UX
- Clean, medical/therapy theme, mobile-first, rounded cards (`rounded-2xl/3xl`), soft shadows.
- framer-motion se halki entrance animations. Admin pages Navbar/Footer ke baghair.
- Floating WhatsApp button har main page par (Therapy Tools ke ilawa, wahan apna hai).

## 2. Color & theme (code mein sab se zyada use hone wale)
| Use | Hex |
|---|---|
| Primary navy (brand, theme-color) | `#1c296b` |
| Blue accent | `#1e3a8a` |
| Green accent / CTA | `#00875a` |
| Deep teal | `#003b5c` |
| Dark navy | `#162c5a` |
| Cyan accent | `#00a8cd` |
| Danger / donate red | `#dc2626` |
| Dark purple text | `#271e38` |
| Warm background | `#fdfbf7`, `#f4f9f8`, `#ebf5f3` |
Light theme only (dark mode nahi).

## 3. Fonts & typography
- Body: **Inter** (300–800), Tailwind `font-sans`.
- Headings: Tailwind default **`font-serif`** (sab se zyada use hoti hai), mono sirf admin numbers/code mein.

## 4. Memory (UI preferences)
- Therapy Tools: cart `rex_shop_cart_v2`, wishlist `rex_shop_wishlist_v2` (localStorage)
- Admin: `adminToken`, `rexAdminNotes`, `rexWeeklyGoal`, `rexAdminSettings`, `adminProfilePic` (localStorage)
