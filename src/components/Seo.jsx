import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoForPath, NOT_FOUND_META, ADMIN_META } from '../data/seoRoutes';
import { headTagsFor } from '../data/headTags';
import { isAdminPath } from '../routes';

// Keeps the per-page head tags in sync during client-side navigation.

function upsertMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (value == null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Admin and unknown URLs have no `path`, so headTagsFor marks them noindex.
    const seo = getSeoForPath(pathname) || (isAdminPath(pathname) ? ADMIN_META : NOT_FOUND_META);
    const tags = headTagsFor(seo);
    document.title = tags.title;
    tags.meta.forEach(([attr, key, value]) => upsertMeta(attr, key, value));

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (tags.canonical) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', tags.canonical);
    } else {
      canonical?.remove();
    }
  }, [pathname]);

  return null;
}
