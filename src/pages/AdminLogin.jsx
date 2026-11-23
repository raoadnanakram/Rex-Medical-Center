// src/pages/AdminLogin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { API_BASE_URL } from '../config/api';
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  LayoutDashboard,
  Activity,
} from 'lucide-react';

// ======================= BACKGROUND PIECES =======================

// ECG heartbeat line (draw hoti hai, phir fade)
const buildEcgPath = () => {
  let d = 'M0 60';
  for (let i = 0; i < 6; i += 1) {
    const x = i * 210;
    d += ` L${x + 40} 60 L${x + 52} 54 L${x + 64} 60 L${x + 90} 60 L${x + 98} 72 L${x + 110} 8 L${x + 124} 98 L${x + 134} 60 L${x + 165} 60 L${x + 182} 46 L${x + 200} 60 L${x + 210} 60`;
  }
  return d;
};
const ECG_PATH = buildEcgPath();

function EcgLine() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-16 -z-10 h-28 opacity-70">
      <svg viewBox="0 0 1260 120" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="ecgGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0" />
            <stop offset="35%" stopColor="#00875A" />
            <stop offset="70%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={ECG_PATH}
          fill="none"
          stroke="url(#ecgGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 5, times: [0, 0.75, 1], repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

const CROSSES = [
  { l: '6%', t: '14%', s: 22, d: 0, dur: 9 },
  { l: '16%', t: '72%', s: 30, d: 1.2, dur: 11 },
  { l: '28%', t: '30%', s: 16, d: 0.6, dur: 8 },
  { l: '44%', t: '82%', s: 20, d: 2, dur: 10 },
  { l: '58%', t: '12%', s: 26, d: 0.3, dur: 12 },
  { l: '72%', t: '64%', s: 18, d: 1.6, dur: 9 },
  { l: '84%', t: '22%', s: 32, d: 0.9, dur: 13 },
  { l: '92%', t: '78%', s: 20, d: 2.4, dur: 10 },
  { l: '50%', t: '48%', s: 14, d: 1.1, dur: 8 },
];

function FloatingCrosses() {
  return (
    <>
      {CROSSES.map((c, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className="pointer-events-none absolute -z-10"
          style={{ left: c.l, top: c.t, width: c.s, height: c.s }}
          animate={{ y: [0, -40, 0], rotate: [0, 90, 180], opacity: [0.12, 0.3, 0.12] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: c.d }}
        >
          <path
            d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z"
            fill={i % 3 === 0 ? '#DC2626' : i % 3 === 1 ? '#00875A' : '#1E3A8A'}
          />
        </motion.svg>
      ))}
    </>
  );
}

function Aurora() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -left-24 -top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#00875A]/20 blur-3xl"
        animate={{ x: [0, 90, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -right-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#DC2626]/15 blur-3xl"
        animate={{ x: [0, -80, 0], y: [0, -70, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/3 top-1/4 -z-10 h-80 w-80 rounded-full bg-[#1E3A8A]/15 blur-3xl"
        animate={{ x: [0, 60, -40, 0], y: [0, -50, 40, 0], scale: [1, 1.25, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* soft dotted grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(30,58,138,0.18) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
    </>
  );
}

// ======================= LEFT SIDE PIECES =======================
const HEADING = [
  { text: 'Welcome', cls: 'text-[#DC2626]' },
  { text: 'to the', cls: 'text-[#1E3A8A]' },
  { text: 'Admin', cls: 'text-[#00875A]' },
  { text: 'Command', cls: 'text-[#00875A]' },
  { text: 'Center', cls: 'text-[#00875A]' },
];

function RevealHeading() {
  return (
    <h1 className="font-serif text-4xl font-extrabold leading-[1.15] tracking-tight xl:text-5xl">
      {HEADING.map((w, i) => (
        <span key={w.text + i} className="mr-3 inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${w.cls}`}
            initial={{ y: '110%', rotate: 6, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {w.text}
          </motion.span>
          {i === 2 && <br />}
        </span>
      ))}
    </h1>
  );
}

function LivePreview() {
  const bars = [40, 65, 50, 85, 60, 95, 70, 55, 80];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A8A]">
          <Activity className="h-4 w-4 text-[#00875A]" /> Live overview
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00875A]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00875A] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00875A]" />
          </span>
          Online
        </span>
      </div>
      <div className="flex h-16 items-end gap-2">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-[#1E3A8A] to-[#00875A]"
            initial={{ height: '8%' }}
            animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.55}%`] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: 1.6 + i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

// ======================= FIELD =======================
function Field({ id, label, icon: Icon, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
        {label}
      </label>
      <div className="group relative transition-transform duration-300 focus-within:-translate-y-0.5">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 transition-colors group-focus-within:text-[#00875A]">
          <Icon className="h-4 w-4" />
        </div>
        {children}
        {/* animated underline */}
        <span className="pointer-events-none absolute bottom-0 left-3 right-3 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#1E3A8A] via-[#00875A] to-[#DC2626] transition-transform duration-500 group-focus-within:scale-x-100" />
      </div>
    </div>
  );
}

// ======================= MAIN =======================
const AdminLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [errorKey, setErrorKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [intro, setIntro] = useState(true);
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  // Browser tab ka title (404 wala "Page Not Found" title is page par nahi aana chahiye)
  useEffect(() => {
    const t = setTimeout(() => {
      document.title = 'Admin Login | REX Medical Complex';
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Chhoti si intro splash
  useEffect(() => {
    const t = setTimeout(() => setIntro(false), reduce ? 0 : 1200);
    return () => clearTimeout(t);
  }, [reduce]);

  // 3D tilt for login card
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotY = useTransform(sx, [0, 1], [-6, 6]);
  const rotX = useTransform(sy, [0, 1], [5, -5]);
  const onCardMove = (e) => {
    if (reduce || (e.pointerType && e.pointerType !== 'mouse')) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onCardLeave = () => { mx.set(0.5); my.set(0.5); };

  const fail = (msg) => {
    setError(msg);
    setErrorKey((k) => k + 1); // shake trigger
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!phone || !password) {
      fail('Please enter both phone number and password.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim(), password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 1600);
      } else {
        fail(data.message || 'Invalid phone number or password.');
      }
    } catch (err) {
      console.error(err);
      fail('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    'w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 text-sm text-slate-800 placeholder-slate-400 transition-all duration-200 focus:border-[#00875A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00875A]/20';

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-x-hidden bg-[#F4F7F6] px-4 py-8 sm:px-6 lg:px-8">
      <style>{`
        @keyframes lgShine { from { transform: translateX(-120%) skewX(-20deg); } to { transform: translateX(260%) skewX(-20deg); } }
        .lg-shine { animation: lgShine 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .lg-shine { animation: none; } }
      `}</style>

      {/* ---------- INTRO SPLASH ---------- */}
      <AnimatePresence>
        {intro && !reduce && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E3A8A]"
            exit={{ clipPath: 'circle(0% at 50% 50%)' }}
            initial={{ clipPath: 'circle(150% at 50% 50%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 14 }}
                className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white font-serif text-3xl font-extrabold text-[#1E3A8A] shadow-2xl"
              >
                REX
              </motion.div>
              <motion.span
                className="absolute inset-0 rounded-3xl border-2 border-white/60"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-white/80"
              >
                Medical Complex
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- BACKGROUND ---------- */}
      <Aurora />
      {!reduce && <FloatingCrosses />}
      {!reduce && <EcgLine />}

      {/* ---------- MAIN CONTAINER ---------- */}
      <div className="z-10 my-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 py-6 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden space-y-6 pr-6 lg:block">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00875A] opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00875A]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#00875A]">
              REX Medical Complex Portal
            </span>
          </motion.div>

          <RevealHeading />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.8 }}
            className="max-w-md text-sm font-medium leading-relaxed text-slate-600 sm:text-base"
          >
            Manage appointments, review secure inquiries, and oversee medical center operations from one unified dashboard.
          </motion.p>

          <div className="space-y-4 pt-2">
            {[
              { icon: ShieldCheck, c: 'bg-[#00875A]/10 text-[#00875A]', t: 'Secure Administration', d: 'JWT token authenticated sessions with auto-timeout.' },
              { icon: LayoutDashboard, c: 'bg-[#DC2626]/10 text-[#DC2626]', t: 'Real-Time Management', d: 'Live tracking of patient appointments and messages.' },
            ].map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 2 + i * 0.15, ease: 'easeOut' }}
                whileHover={{ x: 8, scale: 1.02 }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-xl"
              >
                <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-[#00875A]/10 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]" />
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${f.c}`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1E3A8A]">{f.t}</h3>
                  <p className="text-xs text-slate-500">{f.d}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.4 }}
            >
              <LivePreview />
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-md"
          style={{ perspective: 1400 }}
        >
          {/* shake wrapper */}
          <motion.div
            key={errorKey}
            animate={errorKey ? { x: [0, -12, 10, -8, 6, -3, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              onPointerMove={onCardMove}
              onPointerLeave={onCardLeave}
              style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
              className="relative overflow-hidden rounded-[2.5rem] p-[2px] shadow-2xl shadow-[#1E3A8A]/20"
            >
              {/* rotating colour border */}
              <motion.div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
                style={{ background: 'conic-gradient(from 0deg, #1E3A8A, #00875A, #DC2626, #1E3A8A)' }}
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              <div className="relative overflow-hidden rounded-[calc(2.5rem-2px)] bg-white p-8 sm:p-10">
                {/* Top accent bar */}
                <div className="absolute left-0 right-0 top-0 h-2 bg-gradient-to-r from-[#1E3A8A] via-[#00875A] to-[#DC2626]" />

                {/* HEADER with animated logo */}
                <div className="mb-8 pt-2 text-center">
                  <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center">
                    {!reduce && (
                      <>
                        <motion.span
                          className="absolute inset-0 rounded-3xl border-2 border-[#1E3A8A]/30"
                          animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                        />
                        <motion.span
                          className="absolute inset-0 rounded-3xl border-2 border-[#00875A]/30"
                          animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
                        />
                        <motion.span
                          className="absolute -inset-2 rounded-[1.75rem] border border-dashed border-[#DC2626]/40"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                        />
                      </>
                    )}
                    <motion.div
                      animate={reduce ? undefined : { scale: [1, 1.07, 1, 1.07, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
                      className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E3A8A] font-serif text-xl font-extrabold text-white shadow-lg ring-4 ring-[#1E3A8A]/10"
                      style={reduce ? undefined : { transform: 'translateZ(40px)' }}
                    >
                      REX
                    </motion.div>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-[#1E3A8A] sm:text-3xl">Admin Login</h2>
                  <p className="mt-1.5 text-xs font-medium text-slate-500 sm:text-sm">
                    Sign in to access your secure dashboard
                  </p>
                </div>

                {/* ERROR ALERT */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="mb-5 overflow-hidden"
                    >
                      <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 shadow-sm">
                        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#DC2626]" />
                        <p className="text-xs font-semibold leading-relaxed">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* LOGIN FORM (staggered) */}
                <motion.form
                  onSubmit={handleLogin}
                  className="space-y-5"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 1.5 } } }}
                >
                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                    <Field id="phone" label="Phone Number" icon={Phone}>
                      <input
                        id="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="Enter admin phone number"
                        className={`${inputBase} pl-11 pr-4`}
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                    <Field id="password" label="Password" icon={Lock}>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter secure password"
                        className={`${inputBase} pl-11 pr-12`}
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3.5 text-slate-400 transition-colors hover:text-[#1E3A8A] focus:outline-none"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={showPassword ? 'off' : 'on'}
                            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                            transition={{ duration: 0.18 }}
                            className="flex"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </motion.span>
                        </AnimatePresence>
                      </button>
                    </Field>
                  </motion.div>

                  {/* SUBMIT BUTTON */}
                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={loading || success}
                      whileHover={{ y: -3 }}
                      whileTap={{ y: 2, scale: 0.98 }}
                      className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#1E3A8A] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_6px_0_0_#13265c] transition-[background-color,box-shadow] duration-300 hover:bg-[#00875A] hover:shadow-[0_8px_0_0_#005a3c] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="lg-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/25" />
                      {loading ? (
                        <>
                          <Loader2 className="relative h-4 w-4 animate-spin" />
                          <span className="relative">Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative">Sign In</span>
                          <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                        </>
                      )}
                      {loading && (
                        <motion.span
                          className="absolute bottom-0 left-0 h-1 bg-white/70"
                          initial={{ width: '0%' }}
                          animate={{ width: '92%' }}
                          transition={{ duration: 2.5, ease: 'easeOut' }}
                        />
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>

                {/* SECURITY INDICATOR */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                  className="mt-8 flex items-center justify-center gap-2 border-t border-slate-100 pt-6 text-[11px] font-medium text-slate-400"
                >
                  <motion.span
                    animate={reduce ? undefined : { scale: [1, 1.25, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex"
                  >
                    <ShieldCheck className="h-4 w-4 text-[#00875A]" />
                  </motion.span>
                  <span>Secure Admin Access — Authorized Personnel Only</span>
                </motion.div>

                {/* ---------- SUCCESS OVERLAY ---------- */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm"
                    >
                      <div className="relative flex h-28 w-28 items-center justify-center">
                        <motion.span
                          className="absolute inset-0 rounded-full bg-[#00875A]/20"
                          initial={{ scale: 0.4, opacity: 0.9 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                          className="flex h-24 w-24 items-center justify-center rounded-full bg-[#00875A] shadow-[0_16px_40px_-8px_rgba(0,135,90,0.6)]"
                        >
                          <svg viewBox="0 0 52 52" className="h-12 w-12">
                            <motion.path
                              d="M14 27 L23 36 L39 17"
                              fill="none"
                              stroke="#fff"
                              strokeWidth="5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                            />
                          </svg>
                        </motion.div>
                      </div>
                      <motion.h3
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-xl font-bold text-[#1E3A8A]"
                      >
                        Login successful!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-1 text-xs font-medium text-[#00875A]"
                      >
                        Redirecting to dashboard...
                      </motion.p>
                      <div className="mt-5 h-1.5 w-48 overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#1E3A8A] via-[#00875A] to-[#DC2626]"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, ease: 'easeInOut' }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* FOOTNOTE / BRANDING */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="z-10 w-full py-4 text-center text-xs font-medium text-slate-500"
      >
        © REX Medical Complex — Admin Portal
      </motion.footer>
    </div>
  );
};

export default AdminLogin;