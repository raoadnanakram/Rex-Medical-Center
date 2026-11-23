// src/pages/NewsEvents.jsx
// Public News & Events page. Posts Admin Dashboard > News & Events se aati hain (database se).
// Nayi post add karte hi yahan khud nazar aati hai, saal / mahine ke hisaab se group hoti rehti hai.
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Search, Images, Newspaper, CalendarDays, Sparkles, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../config';

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const PAGE_SIZE = 9;

const parse = (iso) => {
  const [y, m, d] = String(iso).split('-').map(Number);
  return { y, m: m - 1, d };
};
const imgSrc = (u) => (u ? `${API_BASE_URL}${u}` : '');
const todayIso = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const TYPE_TABS = [
  { key: 'all', label: 'All' },
  { key: 'news', label: 'News' },
  { key: 'event', label: 'Events' },
];

function DateBadge({ iso, size = 'md' }) {
  const { y, m, d } = parse(iso);
  const big = size === 'lg';
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl bg-white/95 backdrop-blur shadow-lg text-center leading-none ${
        big ? 'px-4 py-3 min-w-[72px]' : 'px-3 py-2 min-w-[58px]'
      }`}
    >
      <span className={`${big ? 'text-3xl' : 'text-2xl'} font-black text-[#162C5A]`}>{d}</span>
      <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-teal-600">{MONTHS_SHORT[m]}</span>
      <span className="text-[10px] font-semibold text-slate-400">{y}</span>
    </div>
  );
}

function TypeChip({ type, upcoming }) {
  const isEvent = type === 'event';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-extrabold shadow ${
        isEvent ? 'bg-teal-500 text-white' : 'bg-amber-400 text-amber-950'
      }`}
    >
      {isEvent ? <CalendarDays className="w-3 h-3" /> : <Newspaper className="w-3 h-3" />}
      {isEvent ? (upcoming ? 'Upcoming Event' : 'Event') : 'News'}
    </span>
  );
}

function Cover({ post, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (!post.cover || failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#162C5A] via-[#1E3A8A] to-teal-600 ${className}`}>
        <Newspaper className="w-12 h-12 text-white/50" />
      </div>
    );
  }
  return (
    <img
      src={imgSrc(post.cover)}
      alt={post.title}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${className}`}
    />
  );
}

function PostCard({ post, index, upcoming }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link
        to={`/news-events/${post.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:border-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
      >
        <div className="relative h-56 overflow-hidden bg-slate-100">
          <Cover post={post} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
          <div className="absolute left-4 top-4">
            <DateBadge iso={post.date} />
          </div>
          <div className="absolute right-4 top-4">
            <TypeChip type={post.type} upcoming={upcoming} />
          </div>
          {post.imageCount > 1 && (
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
              <Images className="w-3 h-3" /> {post.imageCount} photos
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          {post.location && (
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-teal-700">
              <MapPin className="w-3.5 h-3.5" /> {post.location}
            </div>
          )}
          <h3 className="font-serif text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-teal-700 line-clamp-2">{post.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">{post.excerpt}</p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#162C5A] group-hover:text-teal-700">
            Read more
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FeaturedCard({ post, upcoming }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Link
        to={`/news-events/${post.id}`}
        className="group grid overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl md:grid-cols-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
      >
        <div className="relative h-72 overflow-hidden bg-slate-100 md:col-span-3 md:h-auto md:min-h-[360px]">
          <Cover post={post} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute left-5 top-5">
            <DateBadge iso={post.date} size="lg" />
          </div>
          {post.imageCount > 1 && (
            <span className="absolute bottom-4 left-5 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
              <Images className="w-3.5 h-3.5" /> {post.imageCount} photos
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10 md:col-span-2">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <TypeChip type={post.type} upcoming={upcoming} />
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
              <Sparkles className="w-3 h-3 text-amber-500" /> Latest
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-teal-700 sm:text-3xl">{post.title}</h2>
          {post.location && (
            <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-teal-700">
              <MapPin className="w-4 h-4" /> {post.location}
            </div>
          )}
          <p className="mt-4 text-base leading-relaxed text-slate-500 line-clamp-4">{post.excerpt}</p>
          <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#162C5A] px-6 py-3 text-sm font-bold text-white transition-colors group-hover:bg-teal-600">
            Read full story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="overflow-hidden rounded-3xl border border-slate-100 bg-white">
          <div className="h-56 animate-pulse bg-slate-200" />
          <div className="space-y-3 p-6">
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function NewsEvents() {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState('loading'); // loading | ready | error
  const [type, setType] = useState('all');
  const [year, setYear] = useState('all');
  const [month, setMonth] = useState('all');
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const load = () => {
    setState('loading');
    fetch(`${API_BASE_URL}/api/news`)
      .then((r) => {
        if (!r.ok) throw new Error('bad');
        return r.json();
      })
      .then((d) => {
        setPosts(d.posts || []);
        setState('ready');
      })
      .catch(() => setState('error'));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const prev = document.title;
    document.title = 'News & Events | REX Medical Complex Lahore';
    return () => {
      document.title = prev;
    };
  }, []);

  const today = todayIso();
  const isUpcoming = (p) => p.type === 'event' && p.date >= today;

  const years = useMemo(() => [...new Set(posts.map((p) => parse(p.date).y))].sort((a, b) => b - a), [posts]);
  const monthsInYear = useMemo(() => {
    if (year === 'all') return [];
    return [...new Set(posts.filter((p) => parse(p.date).y === Number(year)).map((p) => parse(p.date).m))].sort((a, b) => b - a);
  }, [posts, year]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      const { y, m } = parse(p.date);
      if (type !== 'all' && p.type !== type) return false;
      if (year !== 'all' && y !== Number(year)) return false;
      if (month !== 'all' && m !== Number(month)) return false;
      if (q && !(p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [posts, type, year, month, search]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [type, year, month, search]);

  const noFilters = type === 'all' && year === 'all' && month === 'all' && !search.trim();
  const featured = noFilters && filtered.length > 0 ? filtered[0] : null;
  const listed = featured ? filtered.slice(1) : filtered;
  const shown = listed.slice(0, visible);

  // mahine ke hisaab se group (Newest pehle)
  const groups = useMemo(() => {
    const map = new Map();
    shown.forEach((p) => {
      const { y, m } = parse(p.date);
      const key = `${y}-${m}`;
      if (!map.has(key)) map.set(key, { key, y, m, items: [] });
      map.get(key).items.push(p);
    });
    return [...map.values()];
  }, [shown]);

  const counts = useMemo(
    () => ({ all: posts.length, news: posts.filter((p) => p.type === 'news').length, event: posts.filter((p) => p.type === 'event').length }),
    [posts]
  );

  const pick = (setter) => (v) => {
    const y = window.scrollY;
    setter(v);
    requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' })));
  };
  const chooseYear = (v) => {
    pick(setYear)(v);
    setMonth('all');
  };

  return (
    <main className="bg-slate-50">
      <style>{`
        @keyframes ne-float { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-22px) rotate(8deg); } }
        @keyframes ne-shine { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        .ne-float { animation: ne-float 7s ease-in-out infinite; }
        .ne-shine { background-size: 200% auto; animation: ne-shine 6s linear infinite; }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#271E38] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.28),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(99,102,241,0.30),transparent_45%)]" />
        <span className="ne-float absolute -left-10 top-16 h-40 w-40 rounded-full bg-teal-400/20 blur-2xl" />
        <span className="ne-float absolute right-8 bottom-6 h-52 w-52 rounded-full bg-indigo-400/20 blur-3xl" style={{ animationDelay: '-3s' }} />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }} className="absolute -left-28 bottom-[-6rem] h-80 w-80 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <motion.span
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-200 backdrop-blur"
          >
            <Sparkles className="w-3.5 h-3.5" /> What's happening at REX
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 font-serif text-4xl font-normal leading-tight sm:text-6xl"
          >
            News{' '}
            <span className="ne-shine bg-gradient-to-r from-teal-300 via-white to-teal-300 bg-clip-text font-semibold italic text-transparent">&amp; Events</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Workshops, awareness walks, open days and updates from our therapy centre. See what our team and families have been up to.
          </motion.p>

          {state === 'ready' && posts.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-9 flex flex-wrap justify-center gap-3">
              {[
                { n: counts.all, l: 'Posts' },
                { n: counts.event, l: 'Events' },
                { n: counts.news, l: 'News' },
              ].map((s) => (
                <div key={s.l} className="min-w-[96px] rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur">
                  <div className="text-2xl font-black text-white">{s.n}</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-teal-200">{s.l}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
        <svg className="relative block w-full text-slate-50" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" style={{ height: 40 }}>
          <path fill="currentColor" d="M0,40 C240,0 480,60 720,35 C960,10 1200,55 1440,20 L1440,60 L0,60 Z" />
        </svg>
      </section>

      {/* ============ FILTERS ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-4 pt-6 sm:px-6">
        <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div role="tablist" aria-label="Filter by type" className="relative inline-flex rounded-2xl bg-slate-100 p-1">
              {TYPE_TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={type === t.key}
                  onClick={() => pick(setType)(t.key)}
                  className={`relative rounded-xl px-5 py-2 text-sm font-bold transition-colors cursor-pointer ${type === t.key ? 'text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {type === t.key && <motion.span layoutId="ne-type-pill" className="absolute inset-0 rounded-xl bg-[#162C5A]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative z-10">
                    {t.label} <span className="opacity-60">({counts[t.key]})</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="relative sm:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search news and events..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          {years.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Calendar className="h-3.5 w-3.5" /> Year
              </span>
              {['all', ...years].map((y) => (
                <button
                  key={y}
                  onClick={() => chooseYear(y)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    String(year) === String(y) ? 'border-teal-500 bg-teal-500 text-white shadow' : 'border-slate-200 bg-white text-slate-600 hover:border-teal-400 hover:text-teal-700'
                  }`}
                >
                  {y === 'all' ? 'All years' : y}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence initial={false}>
            {monthsInYear.length > 0 && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-xs font-bold uppercase tracking-wider text-slate-400">Month</span>
                  {['all', ...monthsInYear].map((m) => (
                    <button
                      key={m}
                      onClick={() => pick(setMonth)(m)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                        String(month) === String(m) ? 'border-[#162C5A] bg-[#162C5A] text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-[#162C5A]'
                      }`}
                    >
                      {m === 'all' ? 'All months' : MONTHS_FULL[m]}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ============ LIST ============ */}
      <section className="mx-auto min-h-[60vh] max-w-6xl px-4 pb-24 pt-8 sm:px-6">
        {state === 'loading' && <SkeletonGrid />}

        {state === 'error' && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-lg font-bold text-slate-800">Could not load news right now</p>
            <p className="mt-1 text-sm text-slate-500">Please check your internet connection and try again.</p>
            <button onClick={load} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#162C5A] px-6 py-3 text-sm font-bold text-white hover:bg-teal-600 cursor-pointer">
              <RefreshCw className="h-4 w-4" /> Try again
            </button>
          </div>
        )}

        {state === 'ready' && posts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center">
            <Newspaper className="mx-auto mb-3 h-12 w-12 text-slate-300" />
            <p className="text-lg font-bold text-slate-800">Nothing to show yet</p>
            <p className="mt-1 text-sm text-slate-500">New updates will appear here. Please check back soon.</p>
          </div>
        )}

        {state === 'ready' && posts.length > 0 && filtered.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center">
            <p className="text-lg font-bold text-slate-800">No posts match your filters</p>
            <button
              onClick={() => {
                setType('all');
                setYear('all');
                setMonth('all');
                setSearch('');
              }}
              className="mt-5 rounded-full bg-[#162C5A] px-6 py-3 text-sm font-bold text-white hover:bg-teal-600 cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}

        {state === 'ready' && featured && (
          <div className="mb-14">
            <FeaturedCard post={featured} upcoming={isUpcoming(featured)} />
          </div>
        )}

        {state === 'ready' &&
          groups.map((g) => (
            <div key={g.key} className="mb-12">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-6 flex items-center gap-4">
                <h2 className="font-serif text-2xl font-bold text-[#162C5A] sm:text-3xl">
                  {MONTHS_FULL[g.m]} <span className="text-teal-600">{g.y}</span>
                </h2>
                <span className="h-px flex-1 bg-gradient-to-r from-teal-300 to-transparent" />
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 shadow-sm">{g.items.length}</span>
              </motion.div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((p, i) => (
                  <PostCard key={p.id} post={p} index={i} upcoming={isUpcoming(p)} />
                ))}
              </div>
            </div>
          ))}

        {state === 'ready' && visible < listed.length && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#162C5A] px-8 py-3 text-sm font-bold text-[#162C5A] transition-all hover:bg-[#162C5A] hover:text-white cursor-pointer"
            >
              Load more <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}