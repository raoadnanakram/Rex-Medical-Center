// JSON-LD for search engines and AI assistants. Written into each prerendered page by
// scripts/prerender.mjs. Only facts already published on the site are used here; add
// opening hours, geo coordinates and sameAs profile links once the owner confirms them.
import { BUSINESS_NAME, SITE_URL, EMAIL, PHONES } from './business.js';
import { seoRoutes } from './seoRoutes.js';

const clinicId = `${SITE_URL}/#clinic`;

export const clinicSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': clinicId,
  name: BUSINESS_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    'Child development and therapy centre in Allama Iqbal Town, Lahore, offering speech and language therapy, ABA therapy, occupational therapy, physiotherapy, play therapy and specialist consultations.',
  telephone: '+92 324 4409797',
  email: EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '91 A, College Block, Allama Iqbal Town',
    addressLocality: 'Lahore',
    addressRegion: 'Punjab',
    addressCountry: 'PK',
  },
  areaServed: { '@type': 'City', name: 'Lahore' },
  medicalSpecialty: ['SpeechPathology', 'Physiotherapy', 'Pediatric'],
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'appointments', telephone: '+92 324 4409797' },
    { '@type': 'ContactPoint', contactType: 'customer support', telephone: '+92 327 6680954', description: `${PHONES.whatsapp.label}` },
    { '@type': 'ContactPoint', contactType: 'customer support', telephone: '+92 42 111739633', description: `${PHONES.landline.label}` },
  ],
  availableService: [
    'Speech and Language Therapy',
    'Applied Behavior Analysis (ABA) Therapy',
    'Occupational Therapy',
    'Sensory Integration Therapy',
    'Physiotherapy',
    'Play Therapy',
    'Specialist Doctor Consultations',
  ].map((name) => ({ '@type': 'MedicalTherapy', name })),
};


const nameForPath = (path) => seoRoutes.find((r) => r.path === path)?.name;

// Breadcrumb trail for every page except the homepage, e.g. Home > Services > Speech Therapy.
export function breadcrumbSchema(route) {
  if (route.path === '/') return null;
  const parts = route.path.split('/').filter(Boolean);
  const items = [{ name: 'Home', url: `${SITE_URL}/` }];
  parts.forEach((_, i) => {
    const path = `/${parts.slice(0, i + 1).join('/')}`;
    const name = nameForPath(path);
    if (name) items.push({ name, url: SITE_URL + path });
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
  };
}
