import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, Quote, Heart, PenLine, ShieldCheck, ChevronDown, Send, Loader2, CheckCircle2 } from 'lucide-react';

import { API_BASE_URL } from '../../config/api';

// ======================= HELPERS =======================
const REVIEW_SERVICES = [
  'Speech & Language Therapy',
  'Behavior Therapy (ABA)',
  'Occupational Therapy',
  'Pediatric Physiotherapy',
  'Specialist Doctor Consultation',
  'Online Session',
  'Other'
];

const AVATAR_GRADIENTS = [
  'from-[#1c296b] to-blue-500',
  'from-teal-500 to-emerald-500',
  'from-purple-500 to-indigo-500',
  'from-rose-500 to-orange-400',
  'from-sky-500 to-cyan-500'
];

const GOOGLE_REVIEW_URL =
  'https://www.google.com/maps/place/Rex+Medical+Center/@31.5092836,74.2948487,17z/data=!3m1!4b1!4m6!3m5!1s0x391903d7483071a3:0x2ace17feb4b38ff6!8m2!3d31.5092836!4d74.2974236!16s%2Fg%2F11ltc_yvt0?authuser=0&hl=en&entry=ttu';

const avatarGradient = (name) =>
  AVATAR_GRADIENTS[[...String(name)].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_GRADIENTS.length];

const reviewInitials = (name) =>
  String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

const reviewTimeAgo = (value) => {
  const diff = Math.floor((Date.now() - new Date(value).getTime()) / 1000);
  if (isNaN(diff)) return '';
  if (diff < 3600) return 'Just now';
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  const days = Math.floor(diff / 86400);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
};

// Top accent colour of a card follows its rating
const ratingAccent = (rating) => {
  if (rating >= 4) return 'from-teal-400 to-emerald-400';
  if (rating === 3) return 'from-amber-300 to-orange-400';
  return 'from-rose-400 to-red-500';
};

// Accurate partial stars (e.g. 4.6) using a clipped overlay
function RatingStars({ value, className = 'w-5 h-5' }) {
  return (
    <span className="relative inline-flex align-middle" aria-label={`${value} out of 5 stars`}>
      <span className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} className={`${className} flex-shrink-0 text-slate-300/70`} />
        ))}
      </span>
      <span className="absolute inset-y-0 left-0 overflow-hidden flex" style={{ width: `${(Math.max(0, Math.min(5, value)) / 5) * 100}%` }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} className={`${className} flex-shrink-0 fill-amber-400 text-amber-400`} />
        ))}
      </span>
    </span>
  );
}

function useCountUp(target, decimals = 0, duration = 1100) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reduce) {
      setValue(target);
      return undefined;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduce]);
  return value.toFixed(decimals);
}

// ======================= REVIEW CARD =======================
function ReviewCard({ review, index }) {
  const [open, setOpen] = useState(false);
  const long = review.message.length > 190;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
      className="group relative mb-6 flex break-inside-avoid flex-col overflow-hidden rounded-3xl bg-white p-6 pt-7 shadow-lg shadow-black/20 ring-1 ring-white/60 transition-shadow duration-300 hover:shadow-2xl"
    >
      <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${ratingAccent(review.rating)}`} />
      <Quote className="absolute right-5 top-6 h-9 w-9 text-[#1c296b]/10 transition-colors duration-300 group-hover:text-teal-500/30" />

      <div className="relative flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${avatarGradient(review.name)} font-bold text-white shadow-md`}>
          {reviewInitials(review.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-bold text-slate-900">{review.name}</p>
          <p className="text-[11px] font-medium text-slate-400">{reviewTimeAgo(review.createdAt)}</p>
        </div>
      </div>

      <div className="relative mt-4 flex items-center gap-2">
        <RatingStars value={review.rating} className="h-4 w-4" />
        <span className="text-xs font-bold text-slate-500">{review.rating}.0</span>
      </div>

      {review.title && (
        <h4 className="relative mt-3 font-serif text-lg font-bold leading-snug text-[#1c296b]" style={{ marginBottom: 0 }}>
          {review.title}
        </h4>
      )}

      <p className={`relative mt-2 whitespace-pre-line break-words font-serif text-[15px] leading-7 text-slate-600 ${!open && long ? 'line-clamp-5' : ''}`}>
        {review.message}
      </p>
      {long && (
        <button
          data-no-scroll-top
          onClick={() => setOpen((o) => !o)}
          className="relative mt-2 self-start rounded text-xs font-bold text-[#1c296b] transition-colors hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c296b]"
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      )}

      {review.service && (
        <div className="relative mt-auto pt-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-[11px] font-bold text-teal-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            {review.service}
          </span>
        </div>
      )}
    </motion.article>
  );
}

// ======================= REVIEWS SECTION =======================
function ReviewsSection() {
  const reduce = useReducedMotion();
  const [data, setData] = useState({ reviews: [], stats: { total: 0, average: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } } });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sort, setSort] = useState('new');
  const [visible, setVisible] = useState(6);

  const [form, setForm] = useState({ name: '', email: '', service: '', title: '', message: '', website: '' });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const loadReviews = async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews`);
      if (!res.ok) throw new Error('bad status');
      setData(await res.json());
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const { reviews, stats } = data;
  const avg = useCountUp(stats.average, 1);
  const total = useCountUp(stats.total, 0);

  const list = useMemo(() => {
    let out = reviews.filter((r) => !ratingFilter || r.rating === ratingFilter);
    if (sort === 'high') out = [...out].sort((a, b) => b.rating - a.rating);
    if (sort === 'low') out = [...out].sort((a, b) => a.rating - b.rating);
    return out;
  }, [reviews, ratingFilter, sort]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setFormError('');
    if (!rating) {
      setFormError('Please select a star rating first.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating, consent })
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', service: '', title: '', message: '', website: '' });
        setRating(0);
        setConsent(false);
      } else {
        setFormError(body.message || 'Review bhejne mein masla aaya. Dobara try karein.');
      }
    } catch {
      setFormError('Server se connection nahi ho pa raha. Thori der baad dobara try karein.');
    } finally {
      setSubmitting(false);
    }
  };

  // App.jsx ka GlobalScrollToTop har button click ke 30ms baad page ko top par bhejta hai.
  // Isliye hum 80ms ruk kar scroll karte hain, taake us ke baad hamara scroll chale aur form par ruke.
  const scrollToId = (id, block) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block });
    }, 80);
  };

  const scrollToForm = () => {
    setSubmitted(false); // pichli review submit ho chuki ho to form dobara khul jaye
    scrollToId('write-review', 'start');
  };
  const scrollToWall = () => scrollToId('reviews-wall', 'start');

  // Link jaise rexmedcomplex.com/reviews#write-review kholne par seedha form par le jaye
  useEffect(() => {
    if (!loading && window.location.hash === '#write-review') {
      scrollToForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const activeStars = hoverRating || rating;
  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

  const inputClass =
    'w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3.5 text-sm text-slate-800 transition-all placeholder:text-slate-400 focus:border-[#1c296b] focus:outline-none focus:ring-2 focus:ring-[#1c296b]/15';

  return (
    <>
      {/* ---------- HERO: headline + live rating summary ---------- */}
      <section className="relative mx-auto max-w-7xl">
        <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-4 py-1.5 text-sm font-semibold text-[#1c296b] shadow-sm backdrop-blur">
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              Reviews from parents
            </span>
            <h1 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              What parents say about their child&apos;s therapy at REX Medical Complex
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              These are honest words from the families we support in Lahore. Read their experiences, and add yours to help the next parent choose with confidence.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                data-no-scroll-top
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#1c296b] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#1c296b]/25 transition-all duration-300 hover:-translate-y-1 hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c296b]"
              >
                <PenLine className="h-4 w-4" /> Write a review
              </button>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-[#1c296b] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1c296b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c296b]"
              >
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Rate us on Google
              </a>
            </div>

            {stats.total > 0 && (
              <button
                data-no-scroll-top
                onClick={scrollToWall}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#1c296b]"
              >
                Read all {stats.total} review{stats.total === 1 ? '' : 's'} <ChevronDown className="h-4 w-4" />
              </button>
            )}
          </motion.div>

          {/* Rating panel: the one bold moment on the page */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-[#0b1240] via-[#1c296b] to-[#0d5c63] p-8 shadow-2xl shadow-[#1c296b]/30 sm:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '22px 22px' }} />
              <Quote className="pointer-events-none absolute -right-4 -top-4 h-36 w-36 text-white/[0.06]" />

              <div className="relative">
                <div className="flex items-end gap-4">
                  <p className="font-serif text-8xl font-bold leading-none tabular-nums text-white sm:text-9xl">{stats.total ? avg : '–'}</p>
                  <p className="pb-3 text-lg font-semibold text-teal-200 sm:pb-5">out of 5</p>
                </div>
                <div className="mt-4">
                  <RatingStars value={stats.average} className="h-7 w-7" />
                </div>
                <p className="mt-3 text-sm font-medium text-slate-200">
                  {stats.total ? (
                    <>
                      Based on <span className="font-bold tabular-nums text-white">{total}</span> parent review{stats.total === 1 ? '' : 's'}
                    </>
                  ) : (
                    'Be the first to share your experience'
                  )}
                </p>

                <div className="mt-7 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star, i) => {
                    const count = stats.distribution[star] || 0;
                    const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
                    const active = ratingFilter === star;
                    return (
                      <button
                        key={star}
                        data-no-scroll-top
                        onClick={() => {
                          setRatingFilter(active ? 0 : star);
                          setVisible(6);
                          if (stats.total) scrollToWall();
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${active ? 'bg-white/20' : 'hover:bg-white/10'}`}
                        title={`Show ${star}-star reviews`}
                      >
                        <span className="flex w-9 items-center gap-1 text-sm font-bold text-white">
                          {star} <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        </span>
                        <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/15">
                          <motion.span
                            className="block h-full rounded-full bg-gradient-to-r from-teal-300 via-emerald-300 to-amber-300"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1 * i, ease: 'easeOut' }}
                          />
                        </span>
                        <span className="w-10 text-right text-xs font-semibold tabular-nums text-slate-200">{pct}%</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- REVIEWS WALL ---------- */}
      <section
        id="reviews-wall"
        className="relative mx-auto mt-20 max-w-7xl scroll-mt-24 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0b1240] via-[#1c296b] to-[#0d5c63] px-6 py-12 shadow-2xl sm:px-10 sm:py-14 lg:px-14"
      >
        {!reduce && (
          <>
            <motion.div className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" animate={{ x: [0, 40, 0], y: [0, 25, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.div className="pointer-events-none absolute -bottom-28 -right-16 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" animate={{ x: [0, -30, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
          </>
        )}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl" style={{ marginBottom: 8, color: '#fff' }}>
                Read what other parents wrote
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-slate-300">
                Every review is read by our team before it is published. Tap a rating to see only those reviews.
              </p>
            </div>

            {stats.total > 0 && (
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort reviews"
                className="cursor-pointer self-start rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:self-auto [&>option]:text-slate-800"
              >
                <option value="new">Newest first</option>
                <option value="high">Highest rated</option>
                <option value="low">Lowest rated</option>
              </select>
            )}
          </div>

          {stats.total > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {[0, 5, 4, 3, 2, 1].map((f) => (
                <button
                  key={f}
                  data-no-scroll-top
                  onClick={() => { setRatingFilter(f); setVisible(6); }}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                    ratingFilter === f ? 'scale-105 bg-white text-[#1c296b] shadow-lg' : 'border border-white/15 bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {f === 0 ? 'All reviews' : `${f} ★`}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-3xl bg-white/10" />
              ))}
            </div>
          ) : loadError ? (
            <div className="space-y-4 py-12 text-center">
              <p className="text-sm text-slate-200">Reviews load nahi ho sake.</p>
              <button data-no-scroll-top onClick={loadReviews} className="rounded-full bg-white px-6 py-2.5 text-xs font-bold text-[#1c296b] transition-colors hover:bg-red-600 hover:text-white">
                Try again
              </button>
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-5 flex justify-center gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span key={i} animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15 }}>
                    <Star className="h-8 w-8 fill-amber-400 text-amber-400" />
                  </motion.span>
                ))}
              </div>
              <p className="font-serif text-2xl font-bold text-white">No reviews yet</p>
              <p className="mt-2 text-sm text-slate-300">Be the first family to share your experience with REX Medical Complex.</p>
              <button data-no-scroll-top onClick={scrollToForm} className="mt-6 rounded-full bg-white px-7 py-3 text-xs font-bold text-[#1c296b] transition-colors hover:bg-red-600 hover:text-white">
                Write the first review
              </button>
            </div>
          ) : list.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-200">Is rating ka koi review nahi mila.</p>
          ) : (
            <>
              <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
                <AnimatePresence>
                  {list.slice(0, visible).map((r, i) => (
                    <ReviewCard key={r.id} review={r} index={i} />
                  ))}
                </AnimatePresence>
              </div>
              {list.length > visible && (
                <div className="mt-6 text-center">
                  <button
                    data-no-scroll-top
                    onClick={() => setVisible((v) => v + 6)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#1c296b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    Show more reviews <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ---------- WRITE A REVIEW ---------- */}
      <section id="write-review" className="mx-auto mt-14 max-w-7xl scroll-mt-24 overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: what to expect (this one IS a sequence, so it is numbered) */}
          <div className="relative bg-gradient-to-b from-[#1c296b] to-[#0b1240] p-8 text-white sm:p-10 lg:col-span-5 lg:p-12">
            <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '22px 22px' }} />
            <div className="relative lg:sticky lg:top-28">
              <h2 className="font-serif text-3xl font-bold sm:text-4xl" style={{ marginBottom: 12, color: '#fff' }}>
                Write a review
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">
                It takes about a minute. Tell other parents what the experience was like for you and your child.
              </p>

              <ol className="mt-8 space-y-5">
                {[
                  { icon: Star, title: 'Rate your visit', text: 'Pick 1 to 5 stars for your overall experience.' },
                  { icon: PenLine, title: 'Tell us what happened', text: 'Mention the therapy or doctor, and how it helped your child.' },
                  { icon: ShieldCheck, title: 'We check it, then publish', text: 'Our team approves every review first. Your email is never shown publicly.' }
                ].map((item, i) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                      <item.icon className="h-5 w-5 text-teal-200" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {i + 1}. {item.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-300">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: form */}
          <div className="p-8 sm:p-10 lg:col-span-7 lg:p-12">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                    <CheckCircle2 className="h-9 w-9" />
                  </motion.div>
                  <h4 className="font-serif text-2xl font-bold text-emerald-900" style={{ marginBottom: 0 }}>Thank you for your review!</h4>
                  <p className="text-sm text-slate-600">It will appear on this page once our team has approved it.</p>
                  <button data-no-scroll-top onClick={() => setSubmitted(false)} className="rounded-full bg-[#1c296b] px-6 py-2.5 text-xs font-bold text-white transition-colors hover:bg-red-600">
                    Write another review
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submitReview} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative space-y-5">
                  {/* Star picker */}
                  <div className="rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-5">
                    <p className="mb-2 text-xs font-semibold text-slate-600">Your overall rating</p>
                    <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <motion.button
                          type="button"
                          key={n}
                          whileHover={{ scale: 1.25, rotate: -8 }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={() => setHoverRating(n)}
                          onClick={() => setRating(n)}
                          aria-label={`${n} star${n > 1 ? 's' : ''}`}
                          className="rounded-lg p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1c296b]"
                        >
                          <Star className={`h-9 w-9 transition-colors duration-200 ${n <= activeStars ? 'fill-amber-400 text-amber-400 drop-shadow' : 'text-slate-300'}`} />
                        </motion.button>
                      ))}
                      <span className="ml-3 min-w-[80px] text-sm font-bold text-amber-700">{ratingLabels[activeStars]}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Your name</label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={80}
                        placeholder="e.g. Ayesha K."
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Email <span className="font-normal text-slate-400">(optional, never shown)</span></label>
                      <input
                        type="email"
                        placeholder="your@mail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">Which service did you use?</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">Select a service (optional)</option>
                      {REVIEW_SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">Review title <span className="font-normal text-slate-400">(optional)</span></label>
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="Sum it up in a few words"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-600">Your review</label>
                      <span className={`text-[11px] font-semibold ${form.message.length > 740 ? 'text-red-500' : 'text-slate-400'}`}>{form.message.length}/800</span>
                    </div>
                    <textarea
                      rows="5"
                      required
                      minLength={10}
                      maxLength={800}
                      placeholder="What was your experience like? How has the therapy helped?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={inputClass}
                    ></textarea>
                  </div>

                  {/* Spam trap: hidden from real visitors */}
                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label>Website</label>
                    <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
                  </div>

                  <label className="flex cursor-pointer select-none items-start gap-3 text-xs text-slate-600">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-0.5 h-4 w-4 accent-[#1c296b]" />
                    <span>I agree that my name and review may be shown publicly on this website. I have not included private medical details.</span>
                  </label>

                  {formError && (
                    <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-500">
                      {formError}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c296b] ${
                      submitting ? 'cursor-wait bg-[#1c296b] opacity-90' : 'transform cursor-pointer bg-[#1c296b] hover:-translate-y-1 hover:bg-red-600'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit review</span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                          <Send className="h-4 w-4 text-white" />
                        </span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

// ======================= PAGE =======================
export default function Reviews() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] px-4 pb-20 pt-14 text-slate-800 sm:px-6 sm:pt-20 lg:px-8">
      <ReviewsSection />
    </div>
  );
}