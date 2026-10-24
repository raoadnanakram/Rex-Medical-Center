import { Component, lazy, Suspense } from 'react';
import { PHONES } from './data/business';

// Shown when a page's JS chunk fails to download (offline, flaky network, or a new deploy
// replaced the old chunk). A full reload fetches fresh files.
class ChunkErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 gap-4">
        <h1 className="text-2xl font-bold text-slate-800">This page couldn't load</h1>
        <p className="text-slate-600 max-w-md">
          Please check your connection and try again. You can also call {PHONES.main.display} or WhatsApp {PHONES.whatsapp.display}.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl bg-[#1c296b] text-white font-semibold hover:bg-[#2a3a8f] transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }
}

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
      <ChunkErrorBoundary>
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <LazyComponent {...props} />
        </Suspense>
      </ChunkErrorBoundary>
    );
  }
  Page.preload = load;
  return Page;
}
