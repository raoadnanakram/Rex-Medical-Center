import { lazy, Suspense } from 'react';

// Code-splits a page into its own JS chunk while staying compatible with prerendering.
// Once preload() has resolved, the page renders synchronously, so the server render and the
// first client render (after main.jsx preloads the current route) produce identical HTML.
export function lazyPage(loader) {
  let Loaded = null;
  const load = () =>
    loader().then((module) => {
      Loaded = module.default;
      return module;
    });
  const LazyComponent = lazy(load);

  function Page(props) {
    if (Loaded) return <Loaded {...props} />;
    return (
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  }
  Page.preload = load;
  return Page;
}
