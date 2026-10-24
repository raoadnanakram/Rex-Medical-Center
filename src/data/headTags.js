import { BUSINESS_NAME, SITE_URL } from './business.js';

// Head tags that change per page. Used by scripts/prerender.mjs to write static HTML and by
// components/Seo.jsx to update the head during client-side navigation.
// A `null` value means "remove this tag".
export function headTagsFor(seo) {
  const url = seo.path ? SITE_URL + seo.path : null;
  return {
    title: seo.title,
    meta: [
      ['name', 'description', seo.description],
      ['name', 'robots', seo.path ? null : 'noindex'],
      ['property', 'og:type', 'website'],
      ['property', 'og:site_name', BUSINESS_NAME],
      ['property', 'og:locale', 'en_PK'],
      ['property', 'og:title', seo.title],
      ['property', 'og:description', seo.description],
      ['property', 'og:url', url],
      ['property', 'og:image', `${SITE_URL}/og-image.jpg`],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', seo.title],
      ['name', 'twitter:description', seo.description],
      ['name', 'twitter:image', `${SITE_URL}/og-image.jpg`],
    ],
    canonical: url,
  };
}
