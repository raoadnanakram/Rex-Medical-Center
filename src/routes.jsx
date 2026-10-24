import { matchPath } from 'react-router-dom';
import { lazyPage } from './lazyPage';

// Every page is its own chunk, so visitors download only the page they open.
const Home = lazyPage(() => import('./pages/Home'));
const AboutUs = lazyPage(() => import('./pages/AboutUs'));
const OurTeam = lazyPage(() => import('./pages/OurTeam'));
const Services = lazyPage(() => import('./pages/Services'));
const Tools = lazyPage(() => import('./pages/Tools'));
const Conditions = lazyPage(() => import('./pages/Conditions'));
const Contact = lazyPage(() => import('./pages/Contact'));
const BookConsult = lazyPage(() => import('./pages/BookConsult'));
const DonateNow = lazyPage(() => import('./pages/DonateNow'));
const SpeechTherapy = lazyPage(() => import('./pages/SpeechTherapy'));
const BehaviorTherapy = lazyPage(() => import('./pages/BehaviorTherapy'));
const OccupationalTherapy = lazyPage(() => import('./pages/OccupationalTherapy'));
const Physiotherapy = lazyPage(() => import('./pages/Physiotherapy'));
const Sensorytherapy = lazyPage(() => import('./pages/Sensorytherapy'));
const Playtherapy = lazyPage(() => import('./pages/Playtherapy'));
const SpecialistConsultations = lazyPage(() => import('./pages/SpecialistConsultations'));
const LegalPage = lazyPage(() => import('./pages/LegalPage'));
const AdminLogin = lazyPage(() => import('./pages/AdminLogin'));
const AdminDashboard = lazyPage(() => import('./pages/AdminDashboard'));

export const pageRoutes = [
  { path: '/', Component: Home },
  { path: '/about', Component: AboutUs },
  { path: '/about/our-team', Component: OurTeam },
  { path: '/services', Component: Services },
  { path: '/therapy-tools', Component: Tools },
  { path: '/conditions', Component: Conditions },
  { path: '/contact', Component: Contact },
  { path: '/book-a-free-consult', Component: BookConsult },
  { path: '/donate', Component: DonateNow },

  { path: '/services/speech-therapy', Component: SpeechTherapy },
  { path: '/services/behavior-therapy', Component: BehaviorTherapy },
  { path: '/services/occupational-therapy', Component: OccupationalTherapy },
  { path: '/services/physiotherapy', Component: Physiotherapy },
  { path: '/services/sensory-therapy', Component: Sensorytherapy },
  { path: '/services/play-therapy', Component: Playtherapy },
  { path: '/services/specialist-consultations', Component: SpecialistConsultations },

  { path: '/privacy-policy', Component: LegalPage, props: { type: 'privacy' } },
  { path: '/terms-of-service', Component: LegalPage, props: { type: 'terms' } },
  { path: '/medical-disclaimer', Component: LegalPage, props: { type: 'disclaimer' } },

  { path: '/admin', Component: AdminLogin },
  { path: '/admin-login', Component: AdminLogin },
  { path: '/admin-dashboard', Component: AdminDashboard },
];

export const isAdminPath = (pathname) => pathname.startsWith('/admin');

export function preloadRoute(pathname) {
  const route = pageRoutes.find((r) => matchPath(r.path, pathname));
  return route ? route.Component.preload() : Promise.resolve();
}

export function preloadAllRoutes() {
  return Promise.all(pageRoutes.map((r) => r.Component.preload()));
}
