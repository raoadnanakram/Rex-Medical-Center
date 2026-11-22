import { matchPath } from 'react-router-dom';
import { lazyPage } from './lazyPage';

// ===========================================================================
// Website ke SAARE pages ki ek hi list (single source of truth).
//   - App.jsx isi list se <Route> banata hai
//   - main.jsx / prerender isi se page ka chunk pehle load karte hain
// Naya page jodna ho: neeche lazyPage() mein import likhein aur pageRoutes mein ek line add karein.
// layout: 'main' = Navbar + Footer ke saath, 'bare' = bina Navbar/Footer (admin pages)
// ===========================================================================

// Har page apna alag JS chunk hai, taake visitor sirf wahi page download kare jo wo khole.
// --- Public pages ---
const Home = lazyPage(() => import('../pages/public/Home'));
const AboutUs = lazyPage(() => import('../pages/public/AboutUs'));
const OurTeam = lazyPage(() => import('../pages/public/OurTeam'));
const Contact = lazyPage(() => import('../pages/public/Contact'));
const Career = lazyPage(() => import('../pages/public/Career'));
const BookConsult = lazyPage(() => import('../pages/public/BookConsult'));
const DonateNow = lazyPage(() => import('../pages/public/DonateNow'));
const Reviews = lazyPage(() => import('../pages/public/Reviews'));
const NewsEvents = lazyPage(() => import('../pages/public/NewsEvents'));
const NewsDetail = lazyPage(() => import('../pages/public/NewsDetail'));
const Tools = lazyPage(() => import('../pages/public/Tools'));
const LegalPage = lazyPage(() => import('../pages/public/LegalPage'));

// --- Services pages ---
const Services = lazyPage(() => import('../pages/services/Services'));
const SpeechTherapy = lazyPage(() => import('../pages/services/SpeechTherapy'));
const BehaviorTherapy = lazyPage(() => import('../pages/services/BehaviorTherapy'));
const OccupationalTherapy = lazyPage(() => import('../pages/services/OccupationalTherapy'));
const Physiotherapy = lazyPage(() => import('../pages/services/Physiotherapy'));
const SensoryTherapy = lazyPage(() => import('../pages/services/SensoryTherapy'));
const PlayTherapy = lazyPage(() => import('../pages/services/PlayTherapy'));
const SpecialistConsultations = lazyPage(() => import('../pages/services/SpecialistConsultations'));
const Conditions = lazyPage(() => import('../pages/services/Conditions'));

// --- Admin pages ---
const AdminLogin = lazyPage(() => import('../pages/admin/AdminLogin'));
const AdminDashboard = lazyPage(() => import('../pages/admin/AdminDashboard'));
const AdminShop = lazyPage(() => import('../pages/admin/AdminShop'));

// Slugs seoRoutes.js ke canonical URLs se match karte hain (sitemap / prerender / Navbar / Footer sab yehi use karte hain).
// Purane URLs (jaise /donate-now, /services/sensorytherapy) seoRoutes.js ke `redirects` se naye par jate hain.
export const pageRoutes = [
  { path: '/', Component: Home, layout: 'main' },
  { path: '/about', Component: AboutUs, layout: 'main' },
  { path: '/about/our-team', Component: OurTeam, layout: 'main' },
  { path: '/contact', Component: Contact, layout: 'main' },
  { path: '/career', Component: Career, layout: 'main' },
  { path: '/book-a-free-consult', Component: BookConsult, layout: 'main' },
  { path: '/donate', Component: DonateNow, layout: 'main' },
  { path: '/reviews', Component: Reviews, layout: 'main' },
  { path: '/news-events', Component: NewsEvents, layout: 'main' },
  { path: '/news-events/:id', Component: NewsDetail, layout: 'main' },
  { path: '/therapy-tools', Component: Tools, layout: 'main' },

  { path: '/services', Component: Services, layout: 'main' },
  { path: '/services/speech-therapy', Component: SpeechTherapy, layout: 'main' },
  { path: '/services/behavior-therapy', Component: BehaviorTherapy, layout: 'main' },
  { path: '/services/occupational-therapy', Component: OccupationalTherapy, layout: 'main' },
  { path: '/services/physiotherapy', Component: Physiotherapy, layout: 'main' },
  { path: '/services/sensory-therapy', Component: SensoryTherapy, layout: 'main' },
  { path: '/services/play-therapy', Component: PlayTherapy, layout: 'main' },
  { path: '/services/specialist-consultations', Component: SpecialistConsultations, layout: 'main' },
  { path: '/services/conditions', Component: Conditions, layout: 'main' },

  { path: '/privacy-policy', Component: LegalPage, props: { type: 'privacy' }, layout: 'main' },
  { path: '/terms-of-service', Component: LegalPage, props: { type: 'terms' }, layout: 'main' },
  { path: '/medical-disclaimer', Component: LegalPage, props: { type: 'disclaimer' }, layout: 'main' },

  { path: '/login', Component: AdminLogin, layout: 'bare' },
  { path: '/admin', Component: AdminLogin, layout: 'bare' },
  { path: '/admin-login', Component: AdminLogin, layout: 'bare' },
  { path: '/admin-dashboard', Component: AdminDashboard, layout: 'bare' },
  { path: '/admin-shop', Component: AdminShop, layout: 'bare' },
];

export const isAdminPath = (pathname) => pathname.startsWith('/admin');

export function preloadRoute(pathname) {
  const route = pageRoutes.find((r) => matchPath(r.path, pathname));
  return route ? route.Component.preload() : Promise.resolve();
}

export function preloadAllRoutes() {
  return Promise.all(pageRoutes.map((r) => r.Component.preload()));
}
