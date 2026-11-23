// src/pages/NewsDetail.jsx
// Ek post ka detail page: upar pictures ka carousel, neeche poora content.
// URL: /news-events/:id
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, CalendarDays, ChevronLeft, ChevronRight, Check, Link2, MapPin, Maximize2, Newspaper, X } from 'lucide-react';
import { API_BASE_URL } from '../config';

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const imgSrc = (u) => (u ? `${API_BASE_URL}${u}` : '');
const parse = (iso) => {
  const [y, m, d] = String(iso).split('-').map(Number);
  return { y, m: m - 1, d };
};
const longDate = (iso) => {
  const { y, m, d } = parse(iso);
  return new Date(y, m, d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

const slide = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

function Carousel({ images, title }) {
  const n = images.length;
  const [[index, dir], setPage] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState(false);

  const go = useCallback((d) => setPage(([i]) => [(i + d + n) % n, d]), [n]);
  const jump = (i) => setPage(([cur]) => [i, i > cur ? 1 : -1]);

  // Auto-play (hover / zoom par ruk jata hai)
  useEffect(() => {
    if (n < 2 || paused || zoom) return undefined;
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [n, paused, zoom, go]);

  // Keyboard: left / right arrows, Esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' && n > 1) go(1);
      else if (e.key === 'ArrowLeft' && n > 1) go(-1);
      else if (e.key === 'Escape') setZoom(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [n, go]);

  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [zoom]);

  if (n === 0) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#162C5A] via-[#1E3A8A] to-teal-600">
        <Newspaper className="h-16 w-16 text-white/40" />
      </div>
    );
  }

  const current = images[index];
  const onDragEnd = (e, info) => {
    if (n < 2) return;
    if (info.offset.x < -70 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 70 || info.velocity.x > 500) go(-1);
  };

  return (
    <div>
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl sm:aspect-[16/10]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* blur background taake poori picture kisi bhi size mein achi lage */}
        <img src={imgSrc(current.url)} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-2xl" />

        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={current.id}
            src={imgSrc(current.url)}
            alt={`${title} - photo ${index + 1}`}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: 'spring', stiffness: 260, damping: 32 }, opacity: { duration: 0.25 } }}
            drag={n > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
            draggable={false}
            className="absolute inset-0 h-full w-full cursor-grab select-none object-contain active:cursor-grabbing"
          />
        </AnimatePresence>

        {n > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous picture"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#162C5A] shadow-lg transition hover:scale-110 hover:bg-white cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next picture"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#162C5A] shadow-lg transition hover:scale-110 hover:bg-white cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur">
              {index + 1} / {n}
            </span>
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => jump(i)}
                  aria-label={`Go to picture ${i + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${i === index ? 'w-7 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </>
        )}

        <button
          onClick={() => setZoom(true)}
          aria-label="View full screen"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80 cursor-pointer"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {n > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => jump(i)}
              aria-label={`Show picture ${i + 1}`}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer sm:h-20 sm:w-28 ${
                i === index ? 'border-teal-500 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={imgSrc(img.url)} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Full screen */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setZoom(false)}
          >
            <button onClick={() => setZoom(false)} aria-label="Close" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 cursor-pointer">
              <X className="h-6 w-6" />
            </button>
            {n > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous"
                  className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 cursor-pointer"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next"
                  className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 cursor-pointer"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </>
            )}
            <img src={imgSrc(current.url)} alt={title} onClick={(e) => e.stopPropagation()} className="max-h-full max-w-full rounded-xl object-contain" />
            <span className="absolute bottom-5 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold text-white">
              {index + 1} / {n}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MoreCard({ post }) {
  const { y, m, d } = parse(post.date);
  return (
    <Link to={`/news-events/${post.id}`} className="group flex gap-4 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-24 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        {post.cover ? (
          <img src={imgSrc(post.cover)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#162C5A] to-teal-600">
            <Newspaper className="h-6 w-6 text-white/50" />
          </div>
        )}
      </div>
      <div className="min-w-0 py-1">
        <div className="text-[11px] font-bold uppercase tracking-wide text-teal-600">
          {d} {MONTHS_SHORT[m]} {y}
        </div>
        <div className="mt-1 font-serif text-base font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-teal-700">{post.title}</div>
      </div>
    </Link>
  );
}

export default function NewsDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [state, setState] = useState('loading'); // loading | ready | notfound | error
  const [more, setMore] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setState('loading');
    setPost(null);
    fetch(`${API_BASE_URL}/api/news/${encodeURIComponent(id)}`)
      .then((r) => {
        if (r.status === 404) throw new Error('notfound');
        if (!r.ok) throw new Error('bad');
        return r.json();
      })
      .then((d) => {
        if (cancelled) return;
        setPost(d);
        setState('ready');
      })
      .catch((e) => {
        if (!cancelled) setState(e.message === 'notfound' ? 'notfound' : 'error');
      });
    fetch(`${API_BASE_URL}/api/news`)
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d) => {
        if (!cancelled) setMore((d.posts || []).filter((p) => String(p.id) !== String(id)).slice(0, 3));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!post) return undefined;
    const prev = document.title;
    document.title = `${post.title} | REX Medical Complex`;
    return () => {
      document.title = prev;
    };
  }, [post]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* ignore */
    }
  };

  const paragraphs = post ? post.description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : [];
  const isEvent = post && post.type === 'event';

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="relative overflow-hidden bg-[#271E38]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(20,184,166,0.25),transparent_45%),radial-gradient(circle_at_90%_20%,rgba(99,102,241,0.25),transparent_45%)]" />
        <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6">
          <Link to="/news-events" className="group inline-flex items-center gap-2 text-sm font-semibold text-teal-200 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to News &amp; Events
          </Link>

          {state === 'loading' && (
            <div className="mt-8 space-y-4">
              <div className="h-6 w-32 animate-pulse rounded-full bg-white/10" />
              <div className="h-10 w-3/4 animate-pulse rounded bg-white/10" />
              <div className="h-5 w-1/3 animate-pulse rounded bg-white/10" />
            </div>
          )}

          {state === 'ready' && post && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-extrabold ${isEvent ? 'bg-teal-500 text-white' : 'bg-amber-400 text-amber-950'}`}>
                  {isEvent ? <CalendarDays className="h-3.5 w-3.5" /> : <Newspaper className="h-3.5 w-3.5" />}
                  {isEvent ? 'Event' : 'News'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300">
                  <Calendar className="h-4 w-4 text-teal-300" /> {longDate(post.date)}
                </span>
                {post.location && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300">
                    <MapPin className="h-4 w-4 text-teal-300" /> {post.location}
                  </span>
                )}
              </div>
              <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-5xl">{post.title}</h1>
            </motion.div>
          )}
        </div>
      </div>

      <div className="relative mx-auto -mt-16 max-w-5xl px-4 pb-24 sm:px-6">
        {state === 'loading' && <div className="aspect-[16/10] animate-pulse rounded-[2rem] bg-slate-200" />}

        {(state === 'notfound' || state === 'error') && (
          <div className="rounded-3xl border border-slate-100 bg-white p-14 text-center shadow-lg">
            <Newspaper className="mx-auto mb-3 h-12 w-12 text-slate-300" />
            <p className="text-lg font-bold text-slate-800">{state === 'notfound' ? 'This post is not available' : 'Could not load this post'}</p>
            <p className="mt-1 text-sm text-slate-500">{state === 'notfound' ? 'It may have been removed.' : 'Please check your internet connection and try again.'}</p>
            <Link to="/news-events" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#162C5A] px-6 py-3 text-sm font-bold text-white hover:bg-teal-600">
              <ArrowLeft className="h-4 w-4" /> All news &amp; events
            </Link>
          </div>
        )}

        {state === 'ready' && post && (
          <>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <Carousel key={post.id} images={post.images} title={post.title} />
            </motion.div>

            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="mt-10 rounded-[2rem] border border-slate-100 bg-white p-7 shadow-lg sm:p-12"
            >
              <div className="mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 to-[#162C5A]" />
              <div className="space-y-5 text-base leading-8 text-slate-700 sm:text-lg">
                {paragraphs.map((p, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
                <Link to="/news-events" className="inline-flex items-center gap-2 rounded-full border-2 border-[#162C5A] px-5 py-2.5 text-sm font-bold text-[#162C5A] transition-all hover:bg-[#162C5A] hover:text-white">
                  <ArrowLeft className="h-4 w-4" /> All news &amp; events
                </Link>
                <button onClick={copyLink} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700 cursor-pointer">
                  {copied ? <Check className="h-4 w-4 text-teal-600" /> : <Link2 className="h-4 w-4" />} {copied ? 'Link copied' : 'Copy link'}
                </button>
              </div>
            </motion.article>

            {more.length > 0 && (
              <section className="mt-14">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-[#162C5A]">More updates</h2>
                  <Link to="/news-events" className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:underline">
                    View all <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {more.map((p) => (
                    <MoreCard key={p.id} post={p} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
