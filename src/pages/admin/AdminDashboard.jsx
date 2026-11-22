// src/components/AdminDashboard.jsx
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarDays,
  CalendarCheck,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  RefreshCw,
  Eye,
  Clock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Activity,
  Sparkles,
  Bell,
  Lock,
  User,
  Database,
  Check,
  Upload,
  Maximize2,
  Download,
  FileSpreadsheet,
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  FileText,
  Mail,
  Inbox,
  Loader2,
  Phone,
  KeyRound,
  EyeOff,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Zap,
  Video,
  Building2,
  Target,
  Printer,
  Repeat,
  Timer,
  Copy,
  History,
  ShoppingBag,
  Newspaper
} from 'lucide-react';
import { API_URL } from '../../config';
import AdminShop from './AdminShop';
import AdminNews from './AdminNews';

// ======================================================================
// ADMIN DASHBOARD (sab kuch ek hi file mein)
//   Helpers : STATUS_OPTIONS, STATUS_STYLES, decodeJwt, playAlertSound
//   Hooks   : useToasts      Components: ToastStack, ConfirmDialog, SessionGuard,
//   TodaySchedule, WeekTrend, DoctorWorkload, CareersTab + analytics widgets
//   Tabs    : Dashboard, Appointments (Google Meet), Messages, Reviews, Careers, Settings
// ======================================================================

// ---------- Utils ----------
const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

const STATUS_STYLES = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Confirmed: 'bg-emerald-50 text-[#00875A] border-emerald-200',
  Completed: 'bg-blue-50 text-[#1E3A8A] border-blue-200',
  Cancelled: 'bg-rose-50 text-rose-700 border-rose-200'
};

function decodeJwt(token) {
  try {
    if (!token) return null;
    const part = token.split('.')[1];
    if (!part) return null;
    const b64 = part.replace(/-/g, '+').replace(/_/g, '/');
    const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

// Naye appointment par halki si do beep
function playAlertSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [660, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.18 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.18 + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.18);
      osc.stop(now + i * 0.18 + 0.18);
    });
    setTimeout(() => ctx.close().catch(() => {}), 800);
  } catch {
    /* browser ne sound ki ijazat nahi di */
  }
}

// Appointment ki date/time string ko samajhne ke helpers
function parseApptDay(str) {
  if (!str) return null;
  let d = new Date(str);
  if (isNaN(d.getTime())) {
    const m = String(str).match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
    if (m) d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  }
  if (isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d;
}

function parseApptMinutes(str) {
  const m = String(str || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!m) return 24 * 60;
  let h = Number(m[1]);
  const min = Number(m[2]);
  const ap = (m[3] || '').toUpperCase();
  if (ap === 'PM' && h < 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return h * 60 + min;
}

const sameDay = (a, b) => a && b && a.getTime() === b.getTime();

// ---------- Toasts ----------
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (toast) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const duration = toast.duration ?? 5000;
      setToasts((list) => [...list.slice(-3), { ...toast, id }]);
      if (duration > 0) timers.current[id] = setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  useEffect(() => {
    const t = timers.current;
    return () => Object.values(t).forEach(clearTimeout);
  }, []);

  return { toasts, push, dismiss };
}

const TOAST_LOOK = {
  success: { Icon: CheckCircle2, ring: 'border-emerald-200', icon: 'bg-emerald-50 text-[#00875A]' },
  error: { Icon: AlertCircle, ring: 'border-rose-200', icon: 'bg-rose-50 text-rose-600' },
  alert: { Icon: Bell, ring: 'border-blue-200', icon: 'bg-blue-50 text-[#1E3A8A]' }
};

function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-4 right-4 z-[80] flex flex-col gap-3 w-[calc(100%-2rem)] sm:w-96 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          const look = TOAST_LOOK[t.type] || TOAST_LOOK.alert;
          const Icon = look.Icon;
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className={`pointer-events-auto bg-white rounded-2xl border ${look.ring} shadow-xl p-4 flex items-start gap-3`}
              role="status"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${look.icon}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#1E3A8A]">{t.title}</p>
                {t.message && <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{t.message}</p>}
                {t.actionLabel && t.onAction && (
                  <button
                    type="button"
                    onClick={() => {
                      t.onAction();
                      onDismiss(t.id);
                    }}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#00875A] hover:text-[#065f46]"
                  >
                    {t.actionLabel} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => onDismiss(t.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// ---------- Confirm dialog (delete se pehle) ----------
function ConfirmDialog({ open, title, message, loading, onConfirm, onCancel, confirmLabel = 'Delete' }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={onCancel}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 text-center space-y-5"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif text-xl font-extrabold text-[#1E3A8A]">{title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{message}</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-70"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Deleting...' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- Session guard (idle logout + warning popup) ----------
function SessionGuard({ idleMs, warnMs, onExpire, onLogin, onLogoutNow }) {
  const [phase, setPhase] = useState('active'); // active | warning | expired
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(warnMs / 1000));
  const phaseRef = useRef('active');
  const lastActivity = useRef(Date.now());
  const expireRef = useRef(onExpire);
  expireRef.current = onExpire;

  const changePhase = (p) => {
    phaseRef.current = p;
    setPhase(p);
  };

  // Mouse/keyboard activity timer reset karti hai (warning aane ke baad nahi, wahan button dabana hoga)
  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    const bump = () => {
      if (phaseRef.current === 'active') lastActivity.current = Date.now();
    };
    events.forEach((ev) => window.addEventListener(ev, bump, { passive: true }));
    return () => events.forEach((ev) => window.removeEventListener(ev, bump));
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      if (phaseRef.current === 'expired') return;
      const idle = Date.now() - lastActivity.current;
      if (idle >= idleMs) {
        changePhase('expired');
        expireRef.current && expireRef.current();
      } else if (idle >= idleMs - warnMs) {
        if (phaseRef.current !== 'warning') changePhase('warning');
        setSecondsLeft(Math.max(1, Math.ceil((idleMs - idle) / 1000)));
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [idleMs, warnMs]);

  const stay = () => {
    lastActivity.current = Date.now();
    changePhase('active');
  };

  return (
    <AnimatePresence>
      {phase !== 'active' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
          role="alertdialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-7 text-center space-y-5"
          >
            {phase === 'warning' ? (
              <>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                  <Clock className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl font-extrabold text-[#1E3A8A]">Still there?</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    You have been inactive for a while. For your security you will be logged out in{' '}
                    <span className="font-bold text-[#DC2626]">{secondsLeft}s</span>.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onLogoutNow}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Logout
                  </button>
                  <button
                    type="button"
                    onClick={stay}
                    className="flex-1 bg-[#1E3A8A] hover:bg-[#00875A] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Stay logged in
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                  <Lock className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl font-extrabold text-[#1E3A8A]">Session expired</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    You were logged out after 5 minutes of inactivity. Please log in again to continue.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onLogin}
                  className="w-full bg-[#1E3A8A] hover:bg-[#00875A] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Log in again
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- Dashboard insights ----------
function TodaySchedule({ appointments, onOpen }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const list = appointments
    .filter((a) => sameDay(parseApptDay(a.date), today))
    .sort((a, b) => parseApptMinutes(a.time) - parseApptMinutes(b.time));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-full space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-serif font-bold text-[#1E3A8A] text-lg">Today&apos;s Schedule</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <span className="text-xs font-bold bg-[#00875A]/10 text-[#00875A] px-3 py-1 rounded-full">{list.length} booked</span>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          <CalendarDays className="w-10 h-10 mx-auto mb-2 text-slate-300" />
          <p className="text-sm font-medium">No appointments scheduled for today.</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {list.map((a, i) => {
            const status = a.status || 'Pending';
            return (
              <motion.button
                key={a.id ?? a._id ?? i}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i, 8) * 0.04 }}
                onClick={() => onOpen && onOpen(a)}
                className="w-full flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-[#00875A]/5 border border-slate-100 text-left transition-colors"
              >
                <div className="w-20 flex-shrink-0 text-center bg-white border border-slate-200 rounded-lg py-1.5">
                  <p className="text-xs font-bold text-[#1E3A8A]">{a.time || '--'}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-bold text-[#1E3A8A] truncate ${status === 'Cancelled' ? 'line-through opacity-60' : ''}`}>
                    {a.patientName || a.name || 'Unnamed Patient'}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {[a.doctor, a.department || a.service].filter(Boolean).join(' • ') || 'General'}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${STATUS_STYLES[status] || STATUS_STYLES.Pending}`}>
                  {status}
                </span>
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function WeekTrend({ appointments }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const count = appointments.filter(
      (a) => (a.status || 'Pending') !== 'Cancelled' && sameDay(parseApptDay(a.date), d)
    ).length;
    return { d, count, isToday: i === 0 };
  });
  const max = Math.max(1, ...days.map((x) => x.count));
  const total = days.reduce((s, x) => s + x.count, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="font-serif font-bold text-[#1E3A8A] text-lg">Next 7 Days</h3>
        <span className="text-xs text-slate-500 font-semibold">{total} upcoming</span>
      </div>
      <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44">
        {days.map(({ d, count, isToday }) => (
          <div key={d.toISOString()} className="flex flex-col items-center justify-end h-full gap-2">
            <span className="text-[11px] font-bold text-slate-600">{count}</span>
            <div className="w-full flex-1 flex items-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(count ? 12 : 4, (count / max) * 100)}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`w-full rounded-t-xl ${
                  isToday ? 'bg-gradient-to-t from-[#00875A] to-emerald-400' : count ? 'bg-gradient-to-t from-[#1E3A8A] to-[#3B5BDB]' : 'bg-slate-200'
                }`}
              />
            </div>
            <div className="text-center leading-tight">
              <p className={`text-[10px] font-bold uppercase ${isToday ? 'text-[#00875A]' : 'text-slate-400'}`}>
                {d.toLocaleDateString('en-GB', { weekday: 'short' })}
              </p>
              <p className="text-xs font-semibold text-slate-600">{d.getDate()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DoctorWorkload({ appointments }) {
  const counts = appointments
    .filter((a) => a.doctor && ['Pending', 'Confirmed'].includes(a.status || 'Pending'))
    .reduce((acc, a) => {
      acc[a.doctor] = (acc[a.doctor] || 0) + 1;
      return acc;
    }, {});
  const rows = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const max = Math.max(1, ...rows.map((r) => r[1]));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 h-full">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="font-serif font-bold text-[#1E3A8A] text-lg">Doctor Workload</h3>
        <span className="text-[10px] bg-blue-50 text-[#1E3A8A] px-2 py-0.5 rounded-full font-bold">Active</span>
      </div>
      {rows.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          <User className="w-10 h-10 mx-auto mb-2 text-slate-300" />
          <p className="text-sm font-medium">No active bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map(([doctor, count]) => (
            <div key={doctor} className="space-y-1.5">
              <div className="flex justify-between gap-3 text-xs font-bold text-slate-700">
                <span className="truncate">{doctor}</span>
                <span className="flex-shrink-0">{count}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / max) * 100}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#00875A]"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DeleteIconButton({ onClick, label = 'Delete' }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className="p-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

// ======================================================================
// ANALYTICS & PRO WIDGETS (sab isi file mein)
//  Charts : InsightsStrip, BookingTrendChart, StatusDonut, PeakHours,
//           WeekdayChart, HeatmapCard, SessionSplit, TopLocations,
//           MonthlyOverview, LiveClock
//  Unique : NextAppointment (countdown), AttentionPanel, WeeklyGoal,
//           CommandPalette (Ctrl+K), ActivityTimeline, ReturningPatients,
//           OnlineSessions (Google Meet), printDailyReport, RatingSnapshot
// ======================================================================
const STATUS_COLORS = {
  Pending: '#F59E0B',
  Confirmed: '#10B981',
  Completed: '#3B82F6',
  Cancelled: '#F43F5E'
};

const pad2 = (n) => String(n).padStart(2, '0');
const dayKeyOf = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const startOfToday = () => {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
};
const safeHttps = (u) => /^https:\/\//i.test(u || '');
const isLiveAppt = (a) => (a.status || 'Pending') !== 'Cancelled';
const hourText = (h) => `${h % 12 === 0 ? 12 : h % 12}${h >= 12 ? 'PM' : 'AM'}`;

const apptHourOf = (t) => {
  const m = parseApptMinutes(t);
  return m >= 24 * 60 ? null : Math.floor(m / 60);
};

const createdOf = (item) => {
  const d = item && item.createdAt ? new Date(item.createdAt) : null;
  return d && !isNaN(d.getTime()) ? d : null;
};

// Appointment ka asal waqt (date + time) ek Date ki shakal mein
const apptDateTime = (a) => {
  const d = parseApptDay(a.date);
  if (!d) return null;
  const mins = parseApptMinutes(a.time);
  const r = new Date(d);
  r.setMinutes(mins >= 24 * 60 ? 0 : mins);
  return r;
};

const timeAgoText = (value) => {
  const diff = Math.floor((Date.now() - new Date(value).getTime()) / 1000);
  if (isNaN(diff)) return '';
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  const days = Math.floor(diff / 86400);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

// Nami wali smooth line (bezier) - points ke beech overshoot nahi hota
const smoothPath = (pts) => {
  if (!pts || pts.length < 2) return '';
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const cx = (p0.x + p1.x) / 2;
    d += ` C${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
  }
  return d;
};

// Pichhle N dinon ki rozana ginti (getDate se aane wali date par)
function buildDailySeries(items, days, getDate) {
  const today = startOfToday();
  const map = {};
  items.forEach((it) => {
    const d = getDate(it);
    if (!d) return;
    const k = dayKeyOf(d);
    map[k] = (map[k] || 0) + 1;
  });
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    const k = dayKeyOf(d);
    return {
      key: k,
      label: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      weekday: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      count: map[k] || 0
    };
  });
}

// Number jo value badalne par smoothly ginta hai
function CountUp({ value, decimals = 0, duration = 900 }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const from = prev.current;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <>{Number(display).toFixed(decimals)}</>;
}

// KPI card ke andar chhoti trend line
function Sparkline({ data, color, id }) {
  if (!data || data.length < 2) return null;
  const W = 120;
  const H = 36;
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * W, y: H - 4 - (v / max) * (H - 10) }));
  const line = smoothPath(pts);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-9" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={`${line} L${W},${H} L0,${H} Z`} fill={`url(#spark-${id})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }} />
      <motion.path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
    </svg>
  );
}

// Standard animated white card
function Panel({ icon: Icon, title, subtitle, right, className = '', delay = 0, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-[#00875A]/30 transition-all duration-300 ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3 min-w-0">
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#00875A] text-white flex items-center justify-center shadow flex-shrink-0">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-serif font-bold text-[#1E3A8A] text-lg leading-tight" style={{ marginBottom: 0 }}>
              {title}
            </h3>
            {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {right}
      </div>
      {children}
    </motion.div>
  );
}

// ---------- 1. KPI insights (completion, cancellation, growth, average) ----------
function MiniKpi({ title, value, decimals = 0, prefix = '', suffix = '', icon: Icon, from, to, sub, spark, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -5 }}
      className="relative bg-white rounded-2xl border border-slate-200 p-5 overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div
        className="absolute -right-8 -top-8 w-28 h-28 rounded-full opacity-10 group-hover:opacity-25 group-hover:scale-125 transition-all duration-500"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      />
      <div className="relative flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: `0 10px 18px -10px ${from}` }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{title}</p>
      </div>
      <p className="relative font-serif text-3xl font-extrabold text-[#1E3A8A] mt-3 tabular-nums">
        {prefix}
        <CountUp value={value} decimals={decimals} />
        {suffix}
      </p>
      <p className="relative text-[11px] text-slate-400 mt-1 font-medium">{sub}</p>
      {spark && (
        <div className="relative mt-2 -mb-1">
          <Sparkline data={spark} color={from} id={title.replace(/\W/g, '')} />
        </div>
      )}
    </motion.div>
  );
}

function InsightsStrip({ appointments }) {
  const total = appointments.length;
  const completed = appointments.filter((a) => (a.status || 'Pending') === 'Completed').length;
  const cancelled = appointments.filter((a) => (a.status || 'Pending') === 'Cancelled').length;
  const live = total - cancelled;
  const completion = live > 0 ? Math.round((completed / live) * 100) : 0;
  const cancelRate = total > 0 ? Math.round((cancelled / total) * 100) : 0;

  const series = buildDailySeries(appointments, 30, createdOf);
  const sum = (arr) => arr.reduce((s, x) => s + x.count, 0);
  const last7 = sum(series.slice(-7));
  const prev7 = sum(series.slice(-14, -7));
  const growth = prev7 === 0 ? (last7 > 0 ? 100 : 0) : Math.round(((last7 - prev7) / prev7) * 100);
  const avg = sum(series) / 30;
  const spark = series.slice(-14).map((s) => s.count);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <MiniKpi title="Completion Rate" value={completion} suffix="%" icon={CheckCircle2} from="#00875A" to="#10B981" sub={`${completed} of ${live} sessions completed`} delay={0.05} />
      <MiniKpi title="Cancellation Rate" value={cancelRate} suffix="%" icon={AlertCircle} from="#E11D48" to="#F472B6" sub={`${cancelled} cancelled bookings`} delay={0.1} />
      <MiniKpi
        title="Weekly Growth"
        value={Math.abs(growth)}
        prefix={growth >= 0 ? '+' : '-'}
        suffix="%"
        icon={growth >= 0 ? TrendingUp : TrendingDown}
        from="#1E3A8A"
        to="#3B82F6"
        sub={`${last7} new this week vs ${prev7} last week`}
        spark={spark}
        delay={0.15}
      />
      <MiniKpi title="Avg Bookings / Day" value={avg} decimals={1} icon={BarChart3} from="#7C3AED" to="#A78BFA" sub="Average of the last 30 days" delay={0.2} />
    </div>
  );
}

// ---------- 2. Booking trend (area chart, 7/14/30 din, hover tooltip) ----------
function BookingTrendChart({ appointments }) {
  const [range, setRange] = useState(14);
  const [hover, setHover] = useState(null);
  const series = buildDailySeries(appointments, 30, createdOf).slice(-range);
  const W = 640;
  const H = 250;
  const padL = 34;
  const padR = 14;
  const padT = 18;
  const padB = 30;
  const max = Math.max(...series.map((s) => s.count), 1);
  const niceMax = Math.max(4, Math.ceil(max / 4) * 4);
  const xs = (i) => padL + (series.length > 1 ? i / (series.length - 1) : 0.5) * (W - padL - padR);
  const ys = (v) => padT + (1 - v / niceMax) * (H - padT - padB);
  const pts = series.map((s, i) => ({ x: xs(i), y: ys(s.count) }));
  const line = smoothPath(pts);
  const area = `${line} L${pts[pts.length - 1].x},${H - padB} L${pts[0].x},${H - padB} Z`;
  const ticks = [0, 1, 2, 3, 4].map((i) => (niceMax / 4) * i);
  const labelEvery = Math.ceil(series.length / 7);
  const total = series.reduce((s, x) => s + x.count, 0);
  const best = series.reduce((m, x) => (x.count > m.count ? x : m), series[0]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const rel = ((e.clientX - r.left) / r.width) * W;
    let bi = 0;
    let bd = Infinity;
    pts.forEach((p, i) => {
      const d = Math.abs(p.x - rel);
      if (d < bd) {
        bd = d;
        bi = i;
      }
    });
    setHover(bi);
  };

  return (
    <Panel
      icon={TrendingUp}
      title="Booking Trend"
      subtitle="New appointment requests received per day"
      className="h-full"
      right={
        <div className="inline-flex bg-slate-100 rounded-xl p-1">
          {[7, 14, 30].map((r) => (
            <button
              key={r}
              onClick={() => {
                setRange(r);
                setHover(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${range === r ? 'bg-white text-[#1E3A8A] shadow' : 'text-slate-500 hover:text-[#1E3A8A]'}`}
            >
              {r}D
            </button>
          ))}
        </div>
      }
    >
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto touch-pan-y" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
          <defs>
            <linearGradient id="trendFillA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#00875A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="trendStrokeA" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#00875A" />
            </linearGradient>
          </defs>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={padL} x2={W - padR} y1={ys(t)} y2={ys(t)} stroke="#E2E8F0" strokeDasharray="4 5" />
              <text x={padL - 8} y={ys(t) + 3} textAnchor="end" fontSize="10" fill="#94A3B8" fontWeight="600">
                {Math.round(t)}
              </text>
            </g>
          ))}
          <motion.path key={`a-${range}`} d={area} fill="url(#trendFillA)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }} />
          <motion.path
            key={`l-${range}`}
            d={line}
            fill="none"
            stroke="url(#trendStrokeA)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          {series.map((s, i) =>
            i % labelEvery === 0 || i === series.length - 1 ? (
              <text key={s.key} x={xs(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="#94A3B8" fontWeight="600">
                {s.label}
              </text>
            ) : null
          )}
          {hover !== null && (
            <g>
              <line x1={pts[hover].x} x2={pts[hover].x} y1={padT} y2={H - padB} stroke="#00875A" strokeWidth="1.5" strokeDasharray="3 4" />
              <circle cx={pts[hover].x} cy={pts[hover].y} r="9" fill="#00875A" opacity="0.18" />
              <circle cx={pts[hover].x} cy={pts[hover].y} r="5" fill="#fff" stroke="#00875A" strokeWidth="3" />
            </g>
          )}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute z-10 bg-[#0B1F5C] text-white rounded-xl px-3 py-2 shadow-xl text-center"
            style={{ left: `${(pts[hover].x / W) * 100}%`, top: `${(pts[hover].y / H) * 100}%`, transform: 'translate(-50%, -135%)' }}
          >
            <p className="text-[10px] font-semibold opacity-70 whitespace-nowrap">
              {series[hover].weekday}, {series[hover].label}
            </p>
            <p className="text-sm font-extrabold leading-tight">
              {series[hover].count} booking{series[hover].count === 1 ? '' : 's'}
            </p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {[
          { label: `Total (${range}d)`, value: total },
          { label: 'Daily Average', value: (total / series.length).toFixed(1) },
          { label: 'Best Day', value: best && best.count ? `${best.label} (${best.count})` : '-' }
        ].map((s) => (
          <div key={s.label} className="bg-slate-50 hover:bg-emerald-50/60 border border-slate-100 rounded-xl px-4 py-3 transition-colors">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</p>
            <p className="font-serif text-lg font-extrabold text-[#1E3A8A] mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ---------- 3. Status donut (click par list filter hoti hai) ----------
function StatusDonut({ appointments, onSelect }) {
  const [active, setActive] = useState(null);
  const counts = STATUS_OPTIONS.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
  appointments.forEach((a) => {
    const s = STATUS_OPTIONS.includes(a.status) ? a.status : 'Pending';
    counts[s] += 1;
  });
  const total = appointments.length;
  const segments = STATUS_OPTIONS.map((s) => ({ label: s, value: counts[s], color: STATUS_COLORS[s] }));
  const R = 54;
  const C = 2 * Math.PI * R;
  let acc = 0;
  const activeSeg = segments.find((s) => s.label === active);
  const completionOfLive = total - counts.Cancelled > 0 ? Math.round((counts.Completed / (total - counts.Cancelled)) * 100) : 0;

  return (
    <Panel icon={Activity} title="Appointment Status" subtitle="Click a status to filter the list" className="h-full">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
            <circle cx="70" cy="70" r={R} fill="none" stroke="#EEF2F7" strokeWidth="16" />
            {total > 0 &&
              segments.map((seg) => {
                const len = (seg.value / total) * C;
                const offset = -acc;
                acc += len;
                const dash = Math.max(len - 2, 0);
                return (
                  <motion.circle
                    key={seg.label}
                    cx="70"
                    cy="70"
                    r={R}
                    fill="none"
                    stroke={seg.color}
                    strokeDashoffset={offset}
                    initial={{ strokeDasharray: `0 ${C}`, strokeWidth: 16 }}
                    animate={{
                      strokeDasharray: `${dash} ${C - dash}`,
                      strokeWidth: active === seg.label ? 21 : 16,
                      opacity: active && active !== seg.label ? 0.3 : 1
                    }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActive(seg.label)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => onSelect && onSelect(seg.label)}
                  />
                );
              })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-serif text-3xl font-extrabold text-[#1E3A8A] tabular-nums">{activeSeg ? activeSeg.value : `${completionOfLive}%`}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">{activeSeg ? activeSeg.label : 'Completed'}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          {segments.map((seg) => {
            const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
            return (
              <button
                key={seg.label}
                type="button"
                onMouseEnter={() => setActive(seg.label)}
                onMouseLeave={() => setActive(null)}
                onClick={() => onSelect && onSelect(seg.label)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${active === seg.label ? 'bg-slate-50 border-slate-300' : 'bg-white border-slate-100'}`}
              >
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: seg.color }} />
                <span className="flex-1 min-w-0">
                  <span className="block text-[11px] font-bold text-slate-700 truncate">{seg.label}</span>
                  <span className="block text-[10px] text-slate-400 font-semibold">
                    {seg.value} · {pct}%
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

// ---------- 4. Peak hours (kis waqt sab se zyada appointments) ----------
function PeakHours({ appointments }) {
  const map = {};
  appointments.filter(isLiveAppt).forEach((a) => {
    const h = apptHourOf(a.time);
    if (h !== null) map[h] = (map[h] || 0) + 1;
  });
  const present = Object.keys(map).map(Number);
  const startH = Math.min(9, ...present);
  const endH = Math.max(21, ...present);
  const hours = Array.from({ length: endH - startH + 1 }, (_, i) => ({ hour: startH + i, count: map[startH + i] || 0 }));
  const peak = hours.reduce((m, h) => (h.count > m.count ? h : m), { hour: 0, count: 0 });

  return (
    <Panel
      icon={Clock}
      title="Peak Appointment Hours"
      subtitle="Which time slots are booked the most"
      className="h-full"
      right={peak.count > 0 && <span className="text-[11px] font-bold bg-emerald-50 text-[#00875A] border border-emerald-200 px-3 py-1 rounded-full whitespace-nowrap">Busiest: {hourText(peak.hour)}</span>}
    >
      <div className="flex items-end gap-1.5 sm:gap-2.5 h-48">
        {hours.map((h, i) => {
          const pct = peak.count ? (h.count / peak.count) * 100 : 0;
          const isPeak = h.count > 0 && h.count === peak.count;
          return (
            <div key={h.hour} className="group flex-1 h-full flex flex-col items-center justify-end gap-1.5 cursor-default">
              <span className={`text-[11px] font-bold transition-opacity ${isPeak ? 'text-[#00875A] opacity-100' : 'text-slate-500 opacity-0 group-hover:opacity-100'}`}>{h.count}</span>
              <div className="w-full flex-1 flex items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(pct, h.count ? 8 : 3)}%` }}
                  transition={{ duration: 0.8, delay: 0.04 * i, ease: 'easeOut' }}
                  className={`w-full rounded-t-lg origin-bottom transition-all duration-200 group-hover:brightness-110 group-hover:scale-x-110 ${
                    isPeak ? 'bg-gradient-to-t from-[#00875A] to-emerald-300 shadow-lg shadow-emerald-300/50' : h.count ? 'bg-gradient-to-t from-[#1E3A8A] to-[#60A5FA]' : 'bg-slate-100'
                  }`}
                />
              </div>
              <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 group-hover:text-[#1E3A8A] transition-colors">{hourText(h.hour)}</span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

// ---------- 5. Weekday distribution ----------
const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const WEEKDAY_NAMES = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' };

function WeekdayChart({ appointments }) {
  const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  appointments.filter(isLiveAppt).forEach((a) => {
    const d = parseApptDay(a.date);
    if (d) counts[d.getDay()] += 1;
  });
  const max = Math.max(1, ...Object.values(counts));
  const busiest = WEEKDAY_ORDER.reduce((m, d) => (counts[d] > counts[m] ? d : m), WEEKDAY_ORDER[0]);

  return (
    <Panel
      icon={CalendarDays}
      title="Busiest Weekdays"
      subtitle="Appointments by day of the week"
      className="h-full"
      right={counts[busiest] > 0 && <span className="text-[11px] font-bold bg-blue-50 text-[#1E3A8A] border border-blue-200 px-3 py-1 rounded-full">{WEEKDAY_NAMES[busiest]}</span>}
    >
      <div className="space-y-3">
        {WEEKDAY_ORDER.map((d, i) => (
          <div key={d} className="group flex items-center gap-3">
            <span className="w-9 text-[11px] font-bold text-slate-500 group-hover:text-[#1E3A8A] transition-colors">{WEEKDAY_NAMES[d]}</span>
            <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(counts[d] / max) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.06 * i, ease: 'easeOut' }}
                className={`h-full rounded-full ${d === busiest && counts[d] > 0 ? 'bg-gradient-to-r from-[#00875A] to-emerald-300' : 'bg-gradient-to-r from-[#1E3A8A] to-[#60A5FA]'} group-hover:brightness-110`}
              />
            </div>
            <span className="w-6 text-right text-xs font-extrabold text-[#1E3A8A] tabular-nums">{counts[d]}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ---------- 6. Heatmap (weekday x hour) ----------
function HeatmapCard({ appointments }) {
  const grid = {};
  const hoursSeen = [];
  appointments.filter(isLiveAppt).forEach((a) => {
    const d = parseApptDay(a.date);
    const h = apptHourOf(a.time);
    if (!d || h === null) return;
    const key = `${d.getDay()}-${h}`;
    grid[key] = (grid[key] || 0) + 1;
    hoursSeen.push(h);
  });
  const startH = Math.min(10, ...hoursSeen);
  const endH = Math.max(21, ...hoursSeen);
  const hours = Array.from({ length: endH - startH + 1 }, (_, i) => startH + i);
  const max = Math.max(1, ...Object.values(grid));

  return (
    <Panel icon={Zap} title="Booking Heatmap" subtitle="Darker blocks mean busier slots (weekday x hour)">
      <div className="overflow-x-auto pb-1">
        <div className="min-w-[560px] space-y-1.5">
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `44px repeat(${hours.length}, minmax(0, 1fr))` }}>
            <span />
            {hours.map((h) => (
              <span key={h} className="text-[9px] font-semibold text-slate-400 text-center">
                {hourText(h)}
              </span>
            ))}
          </div>
          {WEEKDAY_ORDER.map((d, r) => (
            <div key={d} className="grid gap-1.5 items-center" style={{ gridTemplateColumns: `44px repeat(${hours.length}, minmax(0, 1fr))` }}>
              <span className="text-[10px] font-bold text-slate-500">{WEEKDAY_NAMES[d]}</span>
              {hours.map((h, c) => {
                const n = grid[`${d}-${h}`] || 0;
                const alpha = n ? 0.25 + 0.75 * (n / max) : 0;
                return (
                  <motion.div
                    key={h}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (r * hours.length + c) * 0.004, duration: 0.3 }}
                    title={`${WEEKDAY_NAMES[d]} ${hourText(h)}: ${n} appointment${n === 1 ? '' : 's'}`}
                    className="h-7 rounded-md flex items-center justify-center text-[10px] font-bold hover:scale-125 hover:z-10 hover:shadow-lg transition-transform cursor-default"
                    style={{ background: n ? `rgba(30, 58, 138, ${alpha})` : '#F1F5F9', color: alpha > 0.55 ? '#fff' : '#1E3A8A' }}
                  >
                    {n || ''}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ---------- 7. Online vs On-Clinic ----------
function SessionSplit({ appointments }) {
  const live = appointments.filter(isLiveAppt);
  const online = live.filter((a) => a.sessionType === 'Online');
  const clinic = live.filter((a) => a.sessionType && a.sessionType !== 'Online');
  const total = online.length + clinic.length;
  const onlinePct = total ? Math.round((online.length / total) * 100) : 0;
  const withLink = online.filter((a) => safeHttps(a.meetLink)).length;
  const missing = online.length - withLink;

  return (
    <Panel icon={Video} title="Session Type" subtitle="On-clinic vs online sessions" className="h-full">
      <div className="space-y-5">
        <div className="w-full h-4 rounded-full bg-slate-100 overflow-hidden flex">
          <motion.div initial={{ width: 0 }} animate={{ width: `${total ? 100 - onlinePct : 0}%` }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6]" />
          <motion.div initial={{ width: 0 }} animate={{ width: `${onlinePct}%` }} transition={{ duration: 1, delay: 0.1 }} className="h-full bg-gradient-to-r from-[#00875A] to-emerald-300" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 hover:-translate-y-0.5 hover:shadow-md transition-all">
            <Building2 className="w-4 h-4 text-[#1E3A8A]" />
            <p className="font-serif text-2xl font-extrabold text-[#1E3A8A] mt-1">{clinic.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">On-Clinic</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover:-translate-y-0.5 hover:shadow-md transition-all">
            <Video className="w-4 h-4 text-[#00875A]" />
            <p className="font-serif text-2xl font-extrabold text-[#00875A] mt-1">{online.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Online</p>
          </div>
        </div>
        {online.length > 0 && (
          <div className={`flex items-center gap-2 text-[11px] font-semibold rounded-xl px-3 py-2 border ${missing ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-[#00875A] border-emerald-200'}`}>
            {missing ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
            {missing ? `${missing} online booking${missing > 1 ? 's' : ''} without a Meet link` : `All ${withLink} online bookings have a Meet link`}
          </div>
        )}
      </div>
    </Panel>
  );
}

// ---------- 8. Top locations ----------
function TopLocations({ appointments }) {
  const map = {};
  appointments.filter(isLiveAppt).forEach((a) => {
    if (a.location) map[a.location] = (map[a.location] || 0) + 1;
  });
  const rows = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const max = rows.length ? rows[0][1] : 1;

  return (
    <Panel icon={Building2} title="Top Locations" subtitle="Where patients book the most" className="h-full">
      {rows.length === 0 ? (
        <p className="text-center text-slate-400 text-sm py-8">No location data yet.</p>
      ) : (
        <div className="space-y-4">
          {rows.map(([loc, count], i) => (
            <div key={loc} className="group space-y-1.5">
              <div className="flex justify-between gap-3 text-xs font-bold text-slate-700">
                <span className="truncate group-hover:text-[#00875A] transition-colors" title={loc}>{loc}</span>
                <span className="flex-shrink-0 tabular-nums">{count}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(count / max) * 100}%` }} transition={{ duration: 0.8, delay: 0.08 * i }} className="h-full rounded-full bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#00875A]" />
              </div>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

// ---------- 9. Last 6 months overview ----------
function MonthlyOverview({ appointments }) {
  const today = startOfToday();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() - (5 - i), 1);
    return { key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleDateString('en-GB', { month: 'short' }), year: d.getFullYear(), total: 0, done: 0 };
  });
  appointments.forEach((a) => {
    const d = parseApptDay(a.date);
    if (!d) return;
    const m = months.find((x) => x.key === `${d.getFullYear()}-${d.getMonth()}`);
    if (!m) return;
    m.total += 1;
    if ((a.status || 'Pending') === 'Completed') m.done += 1;
  });
  const max = Math.max(1, ...months.map((m) => m.total));
  const grand = months.reduce((s, m) => s + m.total, 0);

  return (
    <Panel
      icon={BarChart3}
      title="6-Month Overview"
      subtitle="Bookings per month (green part = completed)"
      className="h-full"
      right={<span className="text-xs text-slate-500 font-semibold">{grand} total</span>}
    >
      <div className="flex items-end gap-3 sm:gap-5 h-52">
        {months.map((m, i) => (
          <div key={m.key} className="group flex-1 h-full flex flex-col items-center justify-end gap-1.5 cursor-default">
            <span className="text-[11px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
              {m.done}/{m.total}
            </span>
            <div className="w-full flex-1 flex items-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(m.total ? 8 : 3, (m.total / max) * 100)}%` }}
                transition={{ duration: 0.8, delay: 0.07 * i, ease: 'easeOut' }}
                className={`relative w-full rounded-t-xl overflow-hidden ${m.total ? 'bg-gradient-to-t from-[#1E3A8A] to-[#60A5FA]' : 'bg-slate-100'} group-hover:brightness-110 transition-[filter]`}
              >
                {m.total > 0 && <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#00875A] to-emerald-300" style={{ height: `${(m.done / m.total) * 100}%` }} />}
              </motion.div>
            </div>
            <div className="text-center leading-tight">
              <p className="text-[11px] font-bold text-slate-600">{m.label}</p>
              <p className="text-[9px] text-slate-400">{m.total}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ---------- 10. Live clock (header mein) ----------
function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="hidden xl:flex flex-col items-end leading-tight pr-1">
      <span className="font-serif text-lg font-extrabold text-[#1E3A8A] tabular-nums">{now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
      <span className="text-[10px] text-slate-400 font-semibold">{now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
    </div>
  );
}

// ---------- UNIQUE 1: Next appointment countdown (live ticking) ----------
function NextAppointment({ appointments, onOpen }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const next = appointments
    .map((a) => ({ a, at: apptDateTime(a) }))
    .filter((x) => x.at && x.at.getTime() >= now && ['Pending', 'Confirmed'].includes(x.a.status || 'Pending'))
    .sort((x, y) => x.at - y.at)[0];

  let parts = null;
  if (next) {
    const diff = Math.max(0, Math.floor((next.at.getTime() - now) / 1000));
    parts = [
      { label: 'Days', value: Math.floor(diff / 86400) },
      { label: 'Hours', value: Math.floor((diff % 86400) / 3600) },
      { label: 'Mins', value: Math.floor((diff % 3600) / 60) },
      { label: 'Secs', value: diff % 60 }
    ];
  }

  return (
    <Panel icon={Timer} title="Next Appointment" subtitle="Live countdown" className="h-full">
      {!next ? (
        <div className="text-center py-8 text-slate-400">
          <CalendarCheck className="w-10 h-10 mx-auto mb-2 text-slate-300" />
          <p className="text-sm font-medium">No upcoming appointment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {parts.map((p) => (
              <div key={p.label} className="rounded-xl bg-gradient-to-b from-[#1E3A8A] to-[#172554] text-white text-center py-3 shadow-md">
                <p className="font-serif text-2xl font-extrabold tabular-nums leading-none">{pad2(p.value)}</p>
                <p className="text-[9px] font-bold uppercase tracking-wider text-blue-200 mt-1">{p.label}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onOpen && onOpen(next.a)}
            className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-[#00875A]/5 border border-slate-100 transition-colors"
          >
            <p className="text-sm font-bold text-[#1E3A8A] truncate">{next.a.patientName || next.a.name || 'Patient'}</p>
            <p className="text-[11px] text-slate-500 truncate">{[next.a.date, next.a.time, next.a.doctor].filter(Boolean).join(' • ')}</p>
            {next.a.sessionType === 'Online' && safeHttps(next.a.meetLink) && (
              <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold text-[#00875A]">
                <Video className="w-3 h-3" /> Online session (Meet link ready)
              </span>
            )}
          </button>
        </div>
      )}
    </Panel>
  );
}

// ---------- UNIQUE 2: Needs attention ----------
function AttentionPanel({ appointments, contacts, pendingReviews, newApplications, onFilter, onGo }) {
  const today = startOfToday();
  const nowMs = Date.now();
  const pendingOld = appointments.filter((a) => {
    const c = createdOf(a);
    return (a.status || 'Pending') === 'Pending' && c && nowMs - c.getTime() > 24 * 3600 * 1000;
  }).length;
  const todayUnconfirmed = appointments.filter((a) => (a.status || 'Pending') === 'Pending' && sameDay(parseApptDay(a.date), today)).length;
  const onlineNoLink = appointments.filter((a) => isLiveAppt(a) && a.sessionType === 'Online' && !safeHttps(a.meetLink)).length;
  const pastOpen = appointments.filter((a) => {
    const d = parseApptDay(a.date);
    return d && d < today && ['Pending', 'Confirmed'].includes(a.status || 'Pending');
  }).length;
  const unreadWeek = contacts.filter((c) => {
    const d = createdOf(c);
    return d && nowMs - d.getTime() < 2 * 24 * 3600 * 1000;
  }).length;

  const items = [
    { n: todayUnconfirmed, text: 'Today\'s appointments are still unconfirmed', tone: 'rose', go: () => onFilter({ status: 'Pending', when: 'Today' }) },
    { n: pendingOld, text: 'Requests pending for more than 24 hours', tone: 'amber', go: () => onFilter({ status: 'Pending' }) },
    { n: onlineNoLink, text: 'Online bookings without a Meet link', tone: 'amber', go: () => onFilter({ search: 'online' }) },
    { n: pastOpen, text: 'Past appointments not marked completed/cancelled', tone: 'blue', go: () => onFilter({ when: 'Past' }) },
    { n: pendingReviews, text: 'Reviews waiting for your approval', tone: 'violet', go: () => onGo('reviews') },
    { n: newApplications, text: 'New job applications to review', tone: 'violet', go: () => onGo('careers') },
    { n: unreadWeek, text: 'Contact messages received in the last 2 days', tone: 'blue', go: () => onGo('messages') }
  ].filter((x) => x.n > 0);

  const TONES = {
    rose: 'bg-rose-50 text-rose-700 border-rose-200 hover:border-rose-300',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300',
    blue: 'bg-blue-50 text-[#1E3A8A] border-blue-200 hover:border-blue-300',
    violet: 'bg-violet-50 text-violet-700 border-violet-200 hover:border-violet-300'
  };

  return (
    <Panel
      icon={AlertCircle}
      title="Needs Attention"
      subtitle="Things that need action today"
      className="h-full"
      right={items.length > 0 && <span className="text-[11px] font-bold bg-rose-500 text-white px-2.5 py-1 rounded-full animate-pulse">{items.length}</span>}
    >
      {items.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#00875A] flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-sm font-bold text-[#00875A]">All clear!</p>
          <p className="text-[11px] text-slate-400 mt-1">Nothing needs your attention right now.</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {items.map((it, i) => (
            <motion.button
              key={it.text}
              type="button"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * i }}
              onClick={it.go}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left hover:-translate-y-0.5 hover:shadow-md transition-all ${TONES[it.tone]}`}
            >
              <span className="min-w-[32px] h-8 px-2 rounded-lg bg-white/80 font-extrabold text-sm flex items-center justify-center tabular-nums">{it.n}</span>
              <span className="text-xs font-semibold flex-1 leading-snug">{it.text}</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0 opacity-60" />
            </motion.button>
          ))}
        </div>
      )}
    </Panel>
  );
}

// ---------- UNIQUE 3: Weekly goal ring ----------
function WeeklyGoal({ appointments }) {
  const [goal, setGoal] = useState(() => {
    try {
      const v = parseInt(localStorage.getItem('rexWeeklyGoal'), 10);
      return v > 0 ? v : 25;
    } catch {
      return 25;
    }
  });
  const save = (v) => {
    const n = Math.max(1, Math.min(500, v));
    setGoal(n);
    try {
      localStorage.setItem('rexWeeklyGoal', String(n));
    } catch {
      /* storage band ho to bhi chalta rahe */
    }
  };

  const today = startOfToday();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const done = appointments.filter((a) => {
    const d = createdOf(a);
    return d && d >= monday;
  }).length;
  const pct = Math.min(100, Math.round((done / goal) * 100));
  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <Panel icon={Target} title="Weekly Goal" subtitle="New bookings this week (Mon to Sun)" className="h-full">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 130 130" className="w-full h-full -rotate-90">
            <circle cx="65" cy="65" r={R} fill="none" stroke="#EEF2F7" strokeWidth="12" />
            <motion.circle
              cx="65"
              cy="65"
              r={R}
              fill="none"
              stroke={pct >= 100 ? '#10B981' : '#1E3A8A'}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: C - (pct / 100) * C }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-serif text-3xl font-extrabold text-[#1E3A8A] tabular-nums">{pct}%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {done} / {goal}
            </span>
          </div>
        </div>
        <p className="text-xs font-semibold text-center text-slate-500">
          {pct >= 100 ? 'Goal reached. Great work!' : `${goal - done} more booking${goal - done === 1 ? '' : 's'} to reach this week's goal`}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target</span>
          <button type="button" onClick={() => save(goal - 5)} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-600">-</button>
          <span className="w-10 text-center text-sm font-extrabold text-[#1E3A8A] tabular-nums">{goal}</span>
          <button type="button" onClick={() => save(goal + 5)} className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-600">+</button>
        </div>
      </div>
    </Panel>
  );
}

// ---------- UNIQUE 4: Command palette (Ctrl + K) ----------
const PALETTE_TABS = [
  { id: 'dashboard', label: 'Go to Dashboard' },
  { id: 'appointments', label: 'Go to Appointments' },
  { id: 'messages', label: 'Go to Contact Messages' },
  { id: 'reviews', label: 'Go to Reviews' },
  { id: 'careers', label: 'Go to Careers' },
  { id: 'settings', label: 'Go to Settings' }
];

function CommandPalette({ open, onClose, appointments, contacts, reviews, careers, onPick }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ('');
      setIdx(0);
      const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    setIdx(0);
  }, [q]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const tabs = PALETTE_TABS.map((t) => ({ kind: 'tab', id: t.id, title: t.label, sub: 'Navigation' }));
    if (!needle) return tabs;
    const out = tabs.filter((t) => t.title.toLowerCase().includes(needle));
    const has = (arr) => arr.filter(Boolean).join(' ').toLowerCase().includes(needle);
    appointments.forEach((a) => {
      if (has([a.patientName, a.name, a.phone, a.email, a.doctor, a.department, a.service, a.location, a.date, a.status])) {
        out.push({ kind: 'appointment', item: a, title: a.patientName || a.name || 'Patient', sub: ['Appointment', a.date, a.time, a.doctor].filter(Boolean).join(' • ') });
      }
    });
    contacts.forEach((c) => {
      if (has([c.name, c.email, c.phone, c.message])) out.push({ kind: 'contact', item: c, title: c.name || 'Message', sub: `Contact message • ${(c.message || '').slice(0, 50)}` });
    });
    reviews.forEach((r) => {
      if (has([r.name, r.title, r.message, r.service])) out.push({ kind: 'review', item: r, title: r.name, sub: `Review • ${r.rating} star${r.rating === 1 ? '' : 's'} • ${r.isApproved ? 'Live' : 'Pending'}` });
    });
    careers.forEach((c) => {
      if (has([c.name, c.lastName, c.email, c.phone, c.job])) out.push({ kind: 'career', item: c, title: `${c.name || ''} ${c.lastName || ''}`.trim() || 'Applicant', sub: `Job application • ${c.job || ''}` });
    });
    return out.slice(0, 12);
  }, [q, appointments, contacts, reviews, careers]);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[idx]) {
      e.preventDefault();
      onPick(results[idx]);
    }
  };

  const ICONS = { tab: LayoutDashboard, appointment: CalendarDays, contact: MessageSquare, review: Star, career: Briefcase };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[12vh] bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search patients, phone, email, doctor, reviews, jobs..."
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 rounded-md px-2 py-1">ESC</span>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="text-center text-sm text-slate-400 py-10">No results found.</p>
              ) : (
                results.map((r, i) => {
                  const Icon = ICONS[r.kind] || Search;
                  return (
                    <button
                      key={`${r.kind}-${r.id || (r.item && (r.item.id ?? r.item._id)) || i}`}
                      type="button"
                      onMouseEnter={() => setIdx(i)}
                      onClick={() => onPick(r)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${i === idx ? 'bg-[#1E3A8A] text-white' : 'hover:bg-slate-50 text-slate-700'}`}
                    >
                      <span className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${i === idx ? 'bg-white/15' : 'bg-slate-100 text-[#1E3A8A]'}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold truncate">{r.title}</span>
                        <span className={`block text-[11px] truncate ${i === idx ? 'text-blue-100' : 'text-slate-400'}`}>{r.sub}</span>
                      </span>
                    </button>
                  );
                })
              )}
            </div>
            <div className="flex items-center justify-between px-5 py-2.5 bg-slate-50 border-t border-slate-100 text-[10px] font-semibold text-slate-400">
              <span>Up / Down to move, Enter to open</span>
              <span>Ctrl + K to toggle</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ---------- UNIQUE 5: Recent activity timeline ----------
function ActivityTimeline({ appointments, contacts, reviews, careers, onGo }) {
  const events = [];
  appointments.forEach((a) => {
    const d = createdOf(a);
    if (d) events.push({ at: d, icon: CalendarCheck, tone: 'bg-emerald-50 text-[#00875A]', title: `${a.patientName || 'A patient'} booked an appointment`, sub: [a.doctor, a.date, a.time].filter(Boolean).join(' • '), tab: 'appointments' });
  });
  contacts.forEach((c) => {
    const d = createdOf(c);
    if (d) events.push({ at: d, icon: MessageSquare, tone: 'bg-rose-50 text-[#DC2626]', title: `${c.name || 'Someone'} sent a message`, sub: (c.message || '').slice(0, 60), tab: 'messages' });
  });
  reviews.forEach((r) => {
    const d = createdOf(r);
    if (d) events.push({ at: d, icon: Star, tone: 'bg-amber-50 text-amber-600', title: `${r.name} left a ${r.rating}-star review`, sub: r.isApproved ? 'Live on website' : 'Waiting for approval', tab: 'reviews' });
  });
  careers.forEach((c) => {
    const d = createdOf(c);
    if (d) events.push({ at: d, icon: Briefcase, tone: 'bg-violet-50 text-violet-600', title: `${`${c.name || ''} ${c.lastName || ''}`.trim() || 'A candidate'} applied for a job`, sub: c.job || '', tab: 'careers' });
  });
  events.sort((a, b) => b.at - a.at);
  const list = events.slice(0, 8);

  return (
    <Panel icon={History} title="Recent Activity" subtitle="Everything that happened lately" className="h-full">
      {list.length === 0 ? (
        <p className="text-center text-slate-400 text-sm py-8">No activity yet.</p>
      ) : (
        <div className="relative max-h-80 overflow-y-auto pr-1">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200" />
          <div className="space-y-3">
            {list.map((ev, i) => {
              const Icon = ev.icon;
              return (
                <motion.button
                  key={`${ev.title}-${ev.at.getTime()}-${i}`}
                  type="button"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => onGo(ev.tab)}
                  className="relative w-full flex items-start gap-3 text-left group"
                >
                  <span className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ring-4 ring-white group-hover:scale-110 transition-transform ${ev.tone}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="flex-1 min-w-0 p-2.5 rounded-xl group-hover:bg-slate-50 transition-colors">
                    <span className="block text-xs font-bold text-slate-700 truncate">{ev.title}</span>
                    {ev.sub && <span className="block text-[11px] text-slate-400 truncate">{ev.sub}</span>}
                    <span className="block text-[10px] font-semibold text-slate-300 mt-0.5">{timeAgoText(ev.at)}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
    </Panel>
  );
}

// ---------- UNIQUE 6: Returning patients ----------
function ReturningPatients({ appointments }) {
  const groups = {};
  appointments.filter(isLiveAppt).forEach((a) => {
    const key = String(a.phone || '').replace(/\D/g, '').slice(-10);
    if (key.length < 7) return;
    if (!groups[key]) groups[key] = { name: a.patientName || a.name || 'Patient', count: 0, last: null };
    groups[key].count += 1;
    const d = parseApptDay(a.date);
    if (d && (!groups[key].last || d > groups[key].last)) groups[key].last = d;
  });
  const all = Object.values(groups);
  const returning = all.filter((g) => g.count > 1);
  const rate = all.length ? Math.round((returning.length / all.length) * 100) : 0;
  const top = [...returning].sort((a, b) => b.count - a.count).slice(0, 4);

  return (
    <Panel icon={Repeat} title="Returning Patients" subtitle="Patients who booked more than once" className="h-full">
      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#EEF2F7" strokeWidth="9" />
            <motion.circle
              cx="40"
              cy="40"
              r="32"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 32}
              initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - rate / 100) }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-serif text-lg font-extrabold text-violet-700">{rate}%</span>
        </div>
        <div>
          <p className="font-serif text-2xl font-extrabold text-[#1E3A8A] leading-none">{returning.length}</p>
          <p className="text-[11px] text-slate-400 font-semibold mt-1">of {all.length} unique patients came back</p>
        </div>
      </div>
      {top.length === 0 ? (
        <p className="text-center text-slate-400 text-xs py-3">No repeat patients yet.</p>
      ) : (
        <div className="space-y-2">
          {top.map((g) => (
            <div key={g.name + g.count} className="flex items-center gap-3 p-2.5 rounded-xl bg-violet-50/60 border border-violet-100 hover:-translate-y-0.5 hover:shadow-md transition-all">
              <div className="w-8 h-8 rounded-lg bg-violet-600 text-white text-[11px] font-bold flex items-center justify-center">{`${g.name}`.trim().slice(0, 2).toUpperCase()}</div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-700 truncate">{g.name}</p>
                <p className="text-[10px] text-slate-400">{g.last ? `Last: ${g.last.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}` : ''}</p>
              </div>
              <span className="text-[11px] font-extrabold text-violet-700">{g.count} visits</span>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

// ---------- UNIQUE 7: Online sessions (Google Meet) ----------
function OnlineSessions({ appointments, onOpen, onCopied }) {
  const today = startOfToday();
  const list = appointments
    .filter((a) => isLiveAppt(a) && a.sessionType === 'Online')
    .map((a) => ({ a, at: apptDateTime(a) }))
    .filter((x) => x.at && x.at >= today)
    .sort((x, y) => x.at - y.at)
    .slice(0, 5);

  const copy = (link) => {
    try {
      navigator.clipboard.writeText(link);
      onCopied && onCopied();
    } catch {
      /* clipboard allow na ho */
    }
  };

  return (
    <Panel icon={Video} title="Online Sessions" subtitle="Upcoming Google Meet sessions" className="h-full" right={<span className="text-[10px] bg-emerald-50 text-[#00875A] px-2 py-0.5 rounded-full font-bold">Meet</span>}>
      {list.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <Video className="w-10 h-10 mx-auto mb-2 text-slate-300" />
          <p className="text-sm font-medium">No upcoming online sessions.</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {list.map(({ a, at }, i) => (
            <motion.div
              key={a.id ?? a._id ?? i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all"
            >
              <button type="button" onClick={() => onOpen && onOpen(a)} className="w-full text-left">
                <p className="text-xs font-bold text-[#1E3A8A] truncate">{a.patientName || a.name || 'Patient'}</p>
                <p className="text-[11px] text-slate-500">
                  {at.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} {a.time ? `at ${a.time}` : ''}
                </p>
              </button>
              <div className="flex items-center gap-2 mt-2">
                {safeHttps(a.meetLink) ? (
                  <>
                    <a href={a.meetLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#00875A] hover:bg-[#065f46] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors">
                      <Video className="w-3.5 h-3.5" /> Join
                    </a>
                    <button type="button" onClick={() => copy(a.meetLink)} className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors">
                      <Copy className="w-3.5 h-3.5" /> Copy link
                    </button>
                  </>
                ) : (
                  <span className="text-[11px] font-semibold text-amber-600">No Meet link saved</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Panel>
  );
}

// ---------- Ratings snapshot (reviews se) ----------
function RatingSnapshot({ reviews, onOpen }) {
  const approved = reviews.filter((r) => r.isApproved);
  const total = approved.length;
  const avg = total ? approved.reduce((s, r) => s + r.rating, 0) / total : 0;
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, c: approved.filter((r) => r.rating === n).length }));
  const pending = reviews.length - total;

  return (
    <Panel
      icon={Star}
      title="Patient Ratings"
      subtitle="From approved website reviews"
      className="h-full"
      right={pending > 0 && <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">{pending} pending</span>}
    >
      <div className="flex items-center gap-5 mb-4">
        <div className="text-center">
          <p className="font-serif text-5xl font-extrabold text-[#1E3A8A] leading-none tabular-nums">{total ? avg.toFixed(1) : '-'}</p>
          <ReviewStars value={Math.round(avg)} size="w-4 h-4" />
          <p className="text-[10px] text-slate-400 font-semibold mt-1">{total} review{total === 1 ? '' : 's'}</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {dist.map((d, i) => (
            <div key={d.n} className="flex items-center gap-2">
              <span className="w-3 text-[10px] font-bold text-slate-500">{d.n}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${total ? (d.c / total) * 100 : 0}%` }} transition={{ duration: 0.8, delay: 0.07 * i }} className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500" />
              </div>
              <span className="w-5 text-right text-[10px] font-semibold text-slate-400 tabular-nums">{d.c}</span>
            </div>
          ))}
        </div>
      </div>
      <button type="button" onClick={onOpen} className="w-full text-xs font-bold text-[#1E3A8A] bg-blue-50 hover:bg-[#1E3A8A] hover:text-white rounded-xl py-2.5 transition-colors">
        Manage reviews
      </button>
    </Panel>
  );
}

// ---------- UNIQUE 8: Printable daily report ----------
function printDailyReport(appointments) {
  const today = startOfToday();
  const list = appointments
    .filter((a) => sameDay(parseApptDay(a.date), today))
    .sort((a, b) => parseApptMinutes(a.time) - parseApptMinutes(b.time));
  const esc = (v) =>
    String(v === undefined || v === null ? '' : v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  const rows = list
    .map(
      (a) => `<tr>
        <td>${esc(a.time)}</td>
        <td><strong>${esc(a.patientName || a.name)}</strong><br/><small>${esc(a.phone)}</small></td>
        <td>${esc(a.department || a.service)}</td>
        <td>${esc(a.doctor)}</td>
        <td>${esc(a.sessionType)}<br/><small>${esc(a.location)}</small></td>
        <td>${esc(a.status || 'Pending')}</td>
      </tr>`
    )
    .join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"/><title>Daily Report</title>
    <style>
      body{font-family:Segoe UI,Arial,sans-serif;color:#1e293b;padding:28px}
      h1{margin:0;color:#1E3A8A} p{color:#64748b;margin:4px 0 18px}
      table{width:100%;border-collapse:collapse;font-size:13px}
      th{background:#1E3A8A;color:#fff;text-align:left;padding:9px 10px}
      td{padding:9px 10px;border-bottom:1px solid #e2e8f0;vertical-align:top}
      small{color:#64748b}
    </style></head><body>
    <h1>REX Medical Center - Daily Schedule</h1>
    <p>${esc(today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))} | ${list.length} appointment${list.length === 1 ? '' : 's'}</p>
    <table><thead><tr><th>Time</th><th>Patient</th><th>Department</th><th>Doctor</th><th>Session / Location</th><th>Status</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="6">No appointments scheduled for today.</td></tr>'}</tbody></table>
    </body></html>`;
  const w = window.open('', '_blank', 'width=900,height=700');
  if (!w) return false;
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 350);
  return true;
}

// ---------- Reviews helpers ----------
const REVIEW_SERVICES = [
  'Speech & Language Therapy',
  'Behavior Therapy (ABA)',
  'Occupational Therapy',
  'Pediatric Physiotherapy',
  'Specialist Doctor Consultation',
  'Online Session',
  'Other'
];

const ReviewStars = ({ value, size = 'w-4 h-4' }) => (
  <span className="inline-flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} className={`${size} ${n <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
    ))}
  </span>
);

const formatReviewDate = (d) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '');

const EMPTY_REVIEW_FORM = { name: '', service: '', rating: 5, title: '', message: '' };

// ======================================================================
// CAREERS TAB (job applications) - Career page se aane wali applications
// ======================================================================
const CAREER_STATUSES = ['New', 'Reviewed', 'Shortlisted', 'Rejected'];

const CAREER_STATUS_STYLE = {
  New: 'bg-blue-50 text-[#1E3A8A] border-blue-200',
  Reviewed: 'bg-amber-50 text-amber-700 border-amber-200',
  Shortlisted: 'bg-emerald-50 text-[#00875A] border-emerald-200',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200'
};

const CAREER_AVATAR_GRADIENTS = [
  'from-[#1E3A8A] to-[#3B5BDB]',
  'from-[#00875A] to-emerald-400',
  'from-rose-500 to-orange-400',
  'from-violet-600 to-indigo-500',
  'from-sky-500 to-cyan-400'
];
const careerGradientFor = (s = '') => CAREER_AVATAR_GRADIENTS[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % CAREER_AVATAR_GRADIENTS.length];

const careerFullName = (a) => `${a.name || ''} ${a.lastName || ''}`.trim();
const careerInitials = (a) => `${(a.name || '?')[0]}${(a.lastName || '')[0] || ''}`.toUpperCase();
const careerKb = (n) => (n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round((n || 0) / 1024))} KB`);

function careerTimeAgo(value) {
  const d = new Date(value);
  if (isNaN(d.getTime())) return '';
  const mins = Math.floor((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
const careerNiceDate = (v) => {
  const d = new Date(v);
  return isNaN(d.getTime()) ? '' : d.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

function CareerStatusSelect({ app, onChange, className = '' }) {
  const value = app.status || 'New';
  return (
    <select
      value={value}
      onChange={(e) => onChange(app, e.target.value)}
      aria-label="Application status"
      className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer transition-colors ${CAREER_STATUS_STYLE[value]} ${className}`}
    >
      {CAREER_STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

function CareerIconBtn({ title, onClick, href, tone = 'blue', children, disabled }) {
  const tones = {
    blue: 'text-[#1E3A8A] bg-blue-50 hover:bg-[#1E3A8A] hover:text-white',
    green: 'text-[#00875A] bg-emerald-50 hover:bg-[#00875A] hover:text-white',
    red: 'text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white'
  };
  const cls = `p-2 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:cursor-wait ${tones[tone]}`;
  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" title={title} aria-label={title} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} title={title} aria-label={title} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

function CareersTab({ applications, onStatusChange, onDownloadCv, onDelete, onExport, downloadingId }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [jobFilter, setJobFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const jobs = useMemo(() => [...new Set(applications.map((a) => a.job).filter(Boolean))].sort(), [applications]);
  const counts = useMemo(() => {
    const c = { All: applications.length };
    CAREER_STATUSES.forEach((s) => (c[s] = applications.filter((a) => (a.status || 'New') === s).length));
    return c;
  }, [applications]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return applications.filter((a) => {
      if (statusFilter !== 'All' && (a.status || 'New') !== statusFilter) return false;
      if (jobFilter !== 'All' && a.job !== jobFilter) return false;
      if (!q) return true;
      return [careerFullName(a), a.email, a.phone, a.job, a.degree, a.experience].some((v) => String(v || '').toLowerCase().includes(q));
    });
  }, [applications, search, statusFilter, jobFilter]);

  // Modal mein hamesha taaza data dikhane ke liye
  const current = selected ? applications.find((a) => (a.id ?? a._id) === (selected.id ?? selected._id)) || selected : null;

  const cvButton = (app, label) => {
    const busy = downloadingId === (app.id ?? app._id);
    return (
      <button
        type="button"
        onClick={() => onDownloadCv(app)}
        disabled={busy}
        title="Download CV"
        className="inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#00875A] hover:-translate-y-0.5 hover:shadow-lg text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-70 disabled:cursor-wait"
      >
        {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
        {label || 'CV'}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#00875A] text-white flex items-center justify-center shadow-md">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-extrabold text-[#1E3A8A]">Job Applications</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Total: <span className="font-bold text-[#1E3A8A]">{counts.All}</span>
              <span className="mx-2 text-slate-300">|</span>
              New: <span className="font-bold text-[#DC2626]">{counts.New}</span>
              <span className="mx-2 text-slate-300">|</span>
              Shortlisted: <span className="font-bold text-[#00875A]">{counts.Shortlisted}</span>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onExport(filtered)}
          className="inline-flex items-center gap-2 bg-emerald-50 text-[#00875A] hover:bg-[#00875A] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5 hover:shadow-md self-start sm:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, degree..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/15 transition-all"
            />
          </div>
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-[#00875A] cursor-pointer md:w-72"
          >
            <option value="All">All positions</option>
            {jobs.map((j) => (
              <option key={j} value={j}>{j}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">Status</span>
          {['All', ...CAREER_STATUSES].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all hover:-translate-y-0.5 ${
                statusFilter === s
                  ? s === 'All'
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-md'
                    : `${CAREER_STATUS_STYLE[s]} shadow-md ring-2 ring-offset-1 ring-slate-200`
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
              }`}
            >
              {s}
              <span className="ml-1.5 opacity-70">{counts[s] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-14 text-center text-slate-400">
          <Inbox className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="font-semibold text-slate-500">{applications.length === 0 ? 'No applications yet' : 'No applications match your filters'}</p>
          <p className="text-xs mt-1">
            {applications.length === 0 ? 'When someone applies from the Careers page, it will appear here.' : 'Try a different search or filter.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-left">
                    <th className="py-4 px-5">Applicant</th>
                    <th className="py-4 px-5">Position</th>
                    <th className="py-4 px-5">Qualification</th>
                    <th className="py-4 px-5">Applied</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => (
                    <motion.tr
                      key={a.id ?? a._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i, 10) * 0.03 }}
                      className="border-t border-slate-100 hover:bg-[#00875A]/5 transition-colors"
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${careerGradientFor(careerFullName(a))} text-white text-xs font-bold flex items-center justify-center shadow flex-shrink-0`}>
                            {careerInitials(a)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[#1E3A8A] truncate">{careerFullName(a)}</p>
                            <p className="text-[11px] text-slate-500 truncate">{a.email}</p>
                            <p className="text-[11px] text-slate-400">{a.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="inline-block bg-[#1E3A8A]/5 text-[#1E3A8A] text-xs font-bold px-3 py-1 rounded-full">{a.job}</span>
                      </td>
                      <td className="py-4 px-5 text-slate-600">
                        <p className="font-semibold text-slate-800">{a.degree}</p>
                        <p className="text-[11px] text-slate-500">{a.experience} experience</p>
                        <p className="text-[11px] text-slate-400">{a.age} yrs &bull; {a.gender}</p>
                      </td>
                      <td className="py-4 px-5 text-slate-600">
                        <p className="text-xs font-semibold text-slate-700">{careerTimeAgo(a.createdAt)}</p>
                        <p className="text-[11px] text-slate-400">{careerNiceDate(a.createdAt)}</p>
                      </td>
                      <td className="py-4 px-5"><CareerStatusSelect app={a} onChange={onStatusChange} /></td>
                      <td className="py-4 px-5">
                        <div className="flex items-center justify-end gap-1.5">
                          {cvButton(a)}
                          <CareerIconBtn title="View details" onClick={() => setSelected(a)}><Eye className="w-4 h-4" /></CareerIconBtn>
                          <CareerIconBtn title="Delete application" onClick={() => onDelete(a)} tone="red"><Trash2 className="w-4 h-4" /></CareerIconBtn>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-4">
            {filtered.map((a, i) => (
              <motion.div
                key={a.id ?? a._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i, 8) * 0.04 }}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${careerGradientFor(careerFullName(a))} text-white text-sm font-bold flex items-center justify-center shadow flex-shrink-0`}>
                    {careerInitials(a)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#1E3A8A]">{careerFullName(a)}</p>
                    <p className="text-xs text-slate-500 truncate">{a.email}</p>
                    <p className="text-xs text-slate-400">{a.phone}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">{careerTimeAgo(a.createdAt)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <p className="col-span-2"><span className="font-bold text-slate-700">Position:</span> {a.job}</p>
                  <p><span className="font-bold text-slate-700">Degree:</span> {a.degree}</p>
                  <p><span className="font-bold text-slate-700">Experience:</span> {a.experience}</p>
                  <p><span className="font-bold text-slate-700">Age:</span> {a.age}</p>
                  <p><span className="font-bold text-slate-700">Gender:</span> {a.gender}</p>
                </div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <CareerStatusSelect app={a} onChange={onStatusChange} />
                  <div className="flex items-center gap-1.5">
                    {cvButton(a)}
                    <CareerIconBtn title="View details" onClick={() => setSelected(a)}><Eye className="w-4 h-4" /></CareerIconBtn>
                    <CareerIconBtn title="Delete application" onClick={() => onDelete(a)} tone="red"><Trash2 className="w-4 h-4" /></CareerIconBtn>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
            >
              <div className="relative bg-gradient-to-br from-[#1E3A8A] via-[#172554] to-[#00875A] text-white p-7 rounded-t-3xl">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/25 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${careerGradientFor(careerFullName(current))} ring-4 ring-white/30 text-white font-bold flex items-center justify-center`}>
                    {careerInitials(current)}
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-extrabold">{careerFullName(current)}</h4>
                    <p className="text-xs text-white/80">Applied for {current.job}</p>
                  </div>
                </div>
              </div>

              <div className="p-7 space-y-5">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    [GraduationCap, 'Degree', current.degree],
                    [Briefcase, 'Experience', current.experience],
                    [Phone, 'Phone', current.phone],
                    [Mail, 'Email', current.email],
                    [Clock, 'Applied', careerNiceDate(current.createdAt)],
                    [FileText, 'CV file', `${current.cvName || 'CV'} (${careerKb(current.cvSize)})`]
                  ].map(([Icon, label, value]) => (
                    <div key={label} className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 col-span-2 sm:col-span-1">
                      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <Icon className="w-3.5 h-3.5" /> {label}
                      </p>
                      <p className="font-semibold text-[#1E3A8A] mt-1 break-words">{value || 'N/A'}</p>
                    </div>
                  ))}
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Age</p>
                    <p className="font-semibold text-[#1E3A8A] mt-1">{current.age}</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gender</p>
                    <p className="font-semibold text-[#1E3A8A] mt-1">{current.gender}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Update status</span>
                  <CareerStatusSelect app={current} onChange={onStatusChange} className="py-2" />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                  {cvButton(current, 'Download CV')}
                  <CareerIconBtn title="Delete application" onClick={() => onDelete(current)} tone="red"><Trash2 className="w-4 h-4" /></CareerIconBtn>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ======================================================================
// LOOK & FEEL: animated "video jaisa" background, 3D hero aur 3D tilt cards
// (sirf design hai, is ka data/logic se koi talluq nahi)
// ======================================================================

// Agar aap ke paas apni video hai to uska raasta yahan likh dein, maslan '/videos/dashboard-bg.mp4'
// (file public/videos/ folder mein rakhein). Khali rahe to sirf animated canvas chalta hai.
const DASHBOARD_VIDEO_SRC = '';

const FX_CSS = `
@keyframes rxCube { from { transform: rotateX(-22deg) rotateY(0deg); } to { transform: rotateX(-22deg) rotateY(360deg); } }
@keyframes rxRing { from { transform: rotateX(72deg) rotateZ(0deg); } to { transform: rotateX(72deg) rotateZ(360deg); } }
@keyframes rxRingRev { from { transform: rotateX(72deg) rotateZ(360deg); } to { transform: rotateX(72deg) rotateZ(0deg); } }
@keyframes rxFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes rxShine { from { transform: translateX(-130%) skewX(-18deg); } to { transform: translateX(520%) skewX(-18deg); } }
@media (prefers-reduced-motion: reduce) { .rx-anim { animation: none !important; } }
`;

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(query).matches);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

// Banner ke andar chalti hui animation: behte rang, jhilmilate zarre aur dil ki dhadkan (ECG) ki line.
// Tab chhupa ho ya banner screen par na ho to khud ruk jati hai (CPU bachane ke liye).
function AuroraCanvas() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext('2d');
    if (!canvas || !ctx) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 1;
    let h = 1;
    let raf = 0;
    let running = false;
    let visible = true;
    let last = 0;

    const orbs = [
      { x: 0.14, y: 0.3, r: 0.46, c: '0,135,90', sp: 0.00021, ph: 0 },
      { x: 0.82, y: 0.22, r: 0.42, c: '96,165,250', sp: 0.00017, ph: 2 },
      { x: 0.56, y: 0.9, r: 0.4, c: '220,38,38', sp: 0.00025, ph: 4 },
      { x: 0.36, y: 0.78, r: 0.3, c: '251,191,36', sp: 0.00019, ph: 1 },
    ];
    const dots = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00007,
      vy: (Math.random() - 0.5) * 0.00007,
      r: 1 + Math.random() * 1.5,
    }));

    // ECG ki ek dhadkan ki shakl (t: 0..1)
    const bump = (t, c, wd, a) => a * Math.exp(-Math.pow((t - c) / wd, 2));
    const ecg = (t) => bump(t, 0.18, 0.04, 0.12) - bump(t, 0.4, 0.012, 0.2) + bump(t, 0.43, 0.012, 1) - bump(t, 0.46, 0.014, 0.3) + bump(t, 0.7, 0.06, 0.22);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now) => {
      const dt = Math.min(now - (last || now), 50);
      last = now;
      ctx.clearRect(0, 0, w, h);

      // 1) behte hue rang
      ctx.globalCompositeOperation = 'lighter';
      orbs.forEach((o) => {
        const px = (o.x + Math.sin(now * o.sp + o.ph) * 0.12) * w;
        const py = (o.y + Math.cos(now * o.sp * 1.3 + o.ph) * 0.14) * h;
        const rad = o.r * Math.max(w, h);
        const g = ctx.createRadialGradient(px, py, 0, px, py, rad);
        g.addColorStop(0, `rgba(${o.c},0.26)`);
        g.addColorStop(1, `rgba(${o.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
      ctx.globalCompositeOperation = 'source-over';

      // 2) zarre aur un ke beech lines
      dots.forEach((d) => {
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
      });
      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const dx = (dots[i].x - dots[j].x) * w;
          const dy = (dots[i].y - dots[j].y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / 120) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dots[i].x * w, dots[i].y * h);
            ctx.lineTo(dots[j].x * w, dots[j].y * h);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3) dil ki dhadkan (ECG) ki chalti hui line
      const base = h * 0.84;
      const amp = Math.min(h * 0.26, 70);
      const period = 280;
      const offset = (now * 0.09) % period;
      const lg = ctx.createLinearGradient(0, 0, w, 0);
      lg.addColorStop(0, 'rgba(110,231,183,0)');
      lg.addColorStop(0.7, 'rgba(110,231,183,0.75)');
      lg.addColorStop(1, 'rgba(255,255,255,0.95)');
      ctx.strokeStyle = lg;
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(110,231,183,0.9)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const t = (((x + offset) / period) % 1 + 1) % 1;
        const y = base - ecg(t) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const loop = (now) => {
      if (!running) return;
      frame(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    if (reduced) frame(1500);
    else start();

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !document.hidden) start();
            else stop();
          })
        : null;
    io?.observe(canvas);

    const onVis = () => {
      if (!document.hidden && visible) start();
      else stop();
    };
    document.addEventListener('visibilitychange', onVis);

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            resize();
            if (reduced) frame(1500);
          })
        : null;
    ro?.observe(canvas);

    return () => {
      stop();
      io?.disconnect();
      ro?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}

// Optional asli video (sirf tab dikhti hai jab DASHBOARD_VIDEO_SRC mein raasta likha ho)
function HeroVideo() {
  const reduced = usePrefersReducedMotion();
  if (!DASHBOARD_VIDEO_SRC || reduced) return null;
  return (
    <video
      className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen pointer-events-none"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={DASHBOARD_VIDEO_SRC} type="video/mp4" onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }} />
    </video>
  );
}

// 3D hero: ghoomta hua glass cube, orbit rings aur floating live-stat chips. Mouse ke saath halka sa tilt karta hai.
function HeroScene3D({ chips = [] }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 90, damping: 16 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), { stiffness: 90, damping: 16 });

  useEffect(() => {
    if (reduced) return undefined;
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mx.set(Math.max(-0.5, Math.min(0.5, (e.clientX - cx) / 700)));
      my.set(Math.max(-0.5, Math.min(0.5, (e.clientY - cy) / 500)));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, mx, my]);

  const SIZE = 112;
  const HALF = SIZE / 2;
  const faces = [
    { t: `rotateY(0deg) translateZ(${HALF}px)`, node: <span className="font-serif font-extrabold text-2xl tracking-wider">REX</span> },
    { t: `rotateY(180deg) translateZ(${HALF}px)`, node: <Activity className="w-9 h-9" /> },
    { t: `rotateY(90deg) translateZ(${HALF}px)`, node: <CalendarCheck className="w-9 h-9" /> },
    { t: `rotateY(-90deg) translateZ(${HALF}px)`, node: <MessageSquare className="w-9 h-9" /> },
    { t: `rotateX(90deg) translateZ(${HALF}px)`, node: <ShieldCheck className="w-9 h-9" /> },
    { t: `rotateX(-90deg) translateZ(${HALF}px)`, node: <Star className="w-9 h-9" /> },
  ];
  const chipPos = [
    { left: 0, top: '10%' },
    { right: 0, top: '46%' },
    { left: '4%', bottom: '4%' },
  ];

  return (
    <div ref={ref} className="relative w-full h-full select-none" style={{ perspective: 900 }} aria-hidden="true">
      <style>{FX_CSS}</style>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-emerald-300/25 blur-3xl" />

      <motion.div className="absolute inset-0" style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}>
        {/* orbit rings */}
        <div className="absolute left-1/2 top-1/2" style={{ width: 250, height: 250, marginLeft: -125, marginTop: -125, transformStyle: 'preserve-3d' }}>
          <div className="rx-anim absolute inset-0 rounded-full border border-white/35" style={{ animation: 'rxRing 14s linear infinite', transformStyle: 'preserve-3d' }}>
            <span className="absolute -top-1.5 left-1/2 -ml-1.5 w-3 h-3 rounded-full bg-emerald-300 shadow-[0_0_14px_4px_rgba(52,211,153,0.8)]" />
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2" style={{ width: 310, height: 310, marginLeft: -155, marginTop: -155, transformStyle: 'preserve-3d' }}>
          <div className="rx-anim absolute inset-0 rounded-full border border-dashed border-white/25" style={{ animation: 'rxRingRev 22s linear infinite', transformStyle: 'preserve-3d' }}>
            <span className="absolute -top-1.5 left-1/2 -ml-1.5 w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_14px_4px_rgba(252,211,77,0.75)]" />
          </div>
        </div>

        {/* glass cube */}
        <div className="absolute left-1/2 top-1/2" style={{ width: SIZE, height: SIZE, marginLeft: -HALF, marginTop: -HALF, transformStyle: 'preserve-3d' }}>
          <div className="rx-anim" style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', animation: 'rxFloat 6s ease-in-out infinite' }}>
            <div className="rx-anim relative" style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', animation: 'rxCube 18s linear infinite' }}>
              {faces.map((f, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center rounded-2xl text-white"
                  style={{
                    transform: f.t,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.30), rgba(255,255,255,0.06))',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: 'inset 0 0 26px rgba(255,255,255,0.2), 0 0 34px rgba(16,185,129,0.3)',
                  }}
                >
                  {f.node}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* floating live-stat chips (asli numbers) */}
        {chips.slice(0, 3).map((c, i) => (
          <div key={c.label} className="absolute" style={{ ...chipPos[i], transform: 'translateZ(95px)' }}>
            <div
              className="rx-anim flex items-center gap-2.5 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-md px-3 py-2 shadow-xl"
              style={{ animation: `rxFloat ${5 + i}s ease-in-out ${i * 0.7}s infinite` }}
            >
              <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <c.icon className="w-4 h-4 text-white" />
              </span>
              <div>
                <p className="font-serif text-lg font-extrabold leading-none text-white">
                  <CountUp value={c.value} />
                </p>
                <p className="text-[10px] uppercase tracking-wider text-emerald-100 font-bold mt-1">{c.label}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Card ko mouse ke saath 3D mein jhukata hai aur halki si roshni (glare) chalati hai
function Tilt3D({ children, className = '', delay = 0, max = 9 }) {
  const reduced = usePrefersReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 220, damping: 22 });
  const gx = useTransform(px, [0, 1], [0, 100]);
  const gy = useTransform(py, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(0,135,90,0.14), rgba(0,135,90,0) 55%)`;

  const onMove = (e) => {
    if (reduced || e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="h-full" style={{ perspective: 900 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ y: -4 }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative h-full ${className}`}
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Navigation & UI States
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Data States
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Search & Filter States
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [appointmentFilter, setAppointmentFilter] = useState('All');
  const [contactSearch, setContactSearch] = useState('');

  // Status ab database mein save hota hai (har appointment ki apni id par)
  const [statusFilter, setStatusFilter] = useState('All');
  const [unseenNew, setUnseenNew] = useState(0);
  const knownIdsRef = useRef(null);
  const [careers, setCareers] = useState([]);
  const knownCareerIdsRef = useRef(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const sessionEndedRef = useRef(false);
  const { toasts, push: pushToast, dismiss: dismissToast } = useToasts();
  const [confirmState, setConfirmState] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Reviews + quick search
  const [reviews, setReviews] = useState([]);
  const knownReviewIdsRef = useRef(null);
  const [reviewFilter, setReviewFilter] = useState('Pending');
  const [reviewBusyId, setReviewBusyId] = useState(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewForm, setReviewForm] = useState(EMPTY_REVIEW_FORM);
  const [reviewSaving, setReviewSaving] = useState(false);
  const [reviewFormError, setReviewFormError] = useState('');
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Admin Quick Notes State
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('rexAdminNotes');
      return saved ? JSON.parse(saved) : [
        { id: 1, text: 'Review weekly therapy schedules for pediatric wing.' },
        { id: 2, text: 'Follow up with Dr. Aftab regarding new equipment.' }
      ];
    } catch {
      return [];
    }
  });
  const [newNoteText, setNewNoteText] = useState('');

  // Modal States
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);

  // Admin Profile Picture State
  const [adminProfilePic, setAdminProfilePic] = useState(() => {
    return localStorage.getItem('adminProfilePic') || null;
  });

  // Settings (browser mein save hoti hain)
  const [settingsState, setSettingsState] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('rexAdminSettings') || 'null');
      return { soundAlerts: true, autoRefresh: true, ...(saved || {}) };
    } catch {
      return { soundAlerts: true, autoRefresh: true };
    }
  });
  const soundRef = useRef(settingsState.soundAlerts);
  useEffect(() => {
    soundRef.current = settingsState.soundAlerts;
  }, [settingsState.soundAlerts]);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Password change form
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [pwShow, setPwShow] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState(null);

  // Test email
  const [mailTesting, setMailTesting] = useState(false);
  const [mailResult, setMailResult] = useState(null);

  // ---------------- SESSION (popup UI: SessionGuard component) ----------------
  const handleSessionExpired = useCallback(() => {
    sessionEndedRef.current = true;
    localStorage.removeItem('adminToken');
  }, []);

  const goToLogin = useCallback(() => navigate('/login'), [navigate]);

  // Token ke saath API call; 401 par login par bhej deta hai
  const authFetch = async (path, options = {}) => {
    if (sessionEndedRef.current) throw new Error('unauthorized');
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
      throw new Error('unauthorized');
    }
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    });
    if (res.status === 401) {
      localStorage.removeItem('adminToken');
      navigate('/login');
      throw new Error('unauthorized');
    }
    return res;
  };

  // Data lana. silent=true: background refresh (loading spinner nahi dikhata)
  const fetchData = async (isRefresh = false, silent = false) => {
    if (!silent) {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);
    }

    try {
      // Careers alag se: agar backend par route abhi nahi lagi to baqi dashboard phir bhi chalta hai
      const careerPromise = authFetch('/api/careers')
        .then((r) => (r.ok ? r.json() : []))
        .catch((err) => {
          if (err.message === 'unauthorized') throw err;
          return [];
        });

      // Reviews bhi alag se: route/table na ho to baqi dashboard phir bhi chalta hai
      const reviewPromise = authFetch('/api/reviews/admin/all')
        .then((r) => (r.ok ? r.json() : []))
        .catch((err) => {
          if (err.message === 'unauthorized') throw err;
          return [];
        });

      const [apptRes, contactRes, careerData, reviewData] = await Promise.all([
        authFetch('/api/forms/appointments'),
        authFetch('/api/forms/contacts'),
        careerPromise,
        reviewPromise
      ]);
      if (!apptRes.ok || !contactRes.ok) throw new Error('server');

      const apptData = await apptRes.json();
      const contactData = await contactRes.json();
      const apptList = Array.isArray(apptData) ? apptData : apptData.appointments || [];
      const contactList = Array.isArray(contactData) ? contactData : contactData.contacts || [];

      // Naye appointments pehchanein (pehli dafa load par nahi)
      const ids = new Set(apptList.map((a) => a.id ?? a._id));
      if (knownIdsRef.current) {
        const fresh = apptList.filter((a) => !knownIdsRef.current.has(a.id ?? a._id));
        if (fresh.length > 0) {
          setUnseenNew((n) => n + fresh.length);
          const first = fresh[0];
          pushToast({
            type: 'alert',
            title: fresh.length === 1 ? 'New appointment booked' : `${fresh.length} new appointments booked`,
            message:
              fresh.length === 1
                ? `${first.patientName || 'A patient'}${first.doctor ? ` with ${first.doctor}` : ''}${first.date ? ` on ${first.date}` : ''}${first.time ? ` at ${first.time}` : ''}.`
                : 'Open the appointments list to review them.',
            actionLabel: 'View appointments',
            onAction: () => setActiveTab('appointments'),
            duration: 9000
          });
          if (soundRef.current) playAlertSound();
        }
      }
      knownIdsRef.current = ids;

      // Nayi job applications pehchanein (pehli dafa load par nahi)
      const careerList = Array.isArray(careerData) ? careerData : [];
      const careerIds = new Set(careerList.map((c) => c.id ?? c._id));
      if (knownCareerIdsRef.current) {
        const freshCareers = careerList.filter((c) => !knownCareerIdsRef.current.has(c.id ?? c._id));
        if (freshCareers.length > 0) {
          const first = freshCareers[0];
          pushToast({
            type: 'alert',
            title: freshCareers.length === 1 ? 'New job application' : `${freshCareers.length} new job applications`,
            message:
              freshCareers.length === 1
                ? `${`${first.name || ''} ${first.lastName || ''}`.trim() || 'A candidate'} applied for ${first.job || 'a position'}.`
                : 'Open the Careers tab to review them.',
            actionLabel: 'View applications',
            onAction: () => setActiveTab('careers'),
            duration: 9000
          });
          if (soundRef.current) playAlertSound();
        }
      }
      knownCareerIdsRef.current = careerIds;
      setCareers(careerList);

      // Naye reviews (jo approval ka intezar kar rahe hain)
      const reviewList = Array.isArray(reviewData) ? reviewData : [];
      const reviewIds = new Set(reviewList.map((r) => r.id));
      if (knownReviewIdsRef.current) {
        const freshReviews = reviewList.filter((r) => !knownReviewIdsRef.current.has(r.id) && !r.isApproved);
        if (freshReviews.length > 0) {
          pushToast({
            type: 'alert',
            title: freshReviews.length === 1 ? 'New review received' : `${freshReviews.length} new reviews received`,
            message: freshReviews.length === 1 ? `${freshReviews[0].name} left a ${freshReviews[0].rating}-star review. It is waiting for your approval.` : 'Open the Reviews tab to approve them.',
            actionLabel: 'Review now',
            onAction: () => setActiveTab('reviews'),
            duration: 9000
          });
          if (soundRef.current) playAlertSound();
        }
      }
      knownReviewIdsRef.current = reviewIds;
      setReviews(reviewList);

      setAppointments(apptList);
      setContacts(contactList);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      if (err.message === 'unauthorized') return;
      console.error(err);
      if (!silent) {
        setError('Unable to load dashboard data. Please check the server connection and try again.');
      }
    } finally {
      if (!silent) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-refresh: har 1 minute aur tab par wapas aane par
  useEffect(() => {
    if (!settingsState.autoRefresh) return undefined;
    const refreshIfVisible = () => {
      if (document.visibilityState === 'visible' && !sessionEndedRef.current) fetchData(true, true);
    };
    const poll = setInterval(refreshIfVisible, 60000);
    document.addEventListener('visibilitychange', refreshIfVisible);
    return () => {
      clearInterval(poll);
      document.removeEventListener('visibilitychange', refreshIfVisible);
    };
  }, [settingsState.autoRefresh]);

  // Appointments tab khulte hi "new" ka nishan hata dein
  useEffect(() => {
    if (activeTab === 'appointments') setUnseenNew(0);
  }, [activeTab]);

  // Browser tab ke title mein naye appointments ki ginti
  useEffect(() => {
    const original = document.title;
    document.title = unseenNew > 0 ? `(${unseenNew}) New appointment | REX Admin` : original;
    return () => {
      document.title = original;
    };
  }, [unseenNew]);

  // Ctrl/Cmd + K: quick search
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && String(e.key).toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Handle Profile Picture Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setAdminProfilePic(base64String);
        localStorage.setItem('adminProfilePic', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Logout Handler
  const handleLogout = () => {
    sessionEndedRef.current = true;
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  // Helper: Get Initials for Avatar
  const getInitials = (name) => {
    if (!name) return 'RX';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Helper: Date classification for appointments
  const getAppointmentStatus = (dateStr) => {
    if (!dateStr) return 'Upcoming';
    const apptDate = new Date(dateStr);
    if (isNaN(apptDate.getTime())) return 'Upcoming';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    apptDate.setHours(0, 0, 0, 0);

    if (apptDate.getTime() === today.getTime()) return 'Today';
    if (apptDate > today) return 'Upcoming';
    return 'Past';
  };

  const idOf = (item) => item.id ?? item._id;

  // Status badlein: pehle screen par, phir database mein (fail ho to wapas)
  const handleStatusChange = async (item, newStatus) => {
    const id = idOf(item);
    const prev = item.status || 'Pending';
    if (prev === newStatus) return;
    const apply = (status) => {
      setAppointments((list) => list.map((a) => (idOf(a) === id ? { ...a, status } : a)));
      setSelectedAppointment((cur) => (cur && idOf(cur) === id ? { ...cur, status } : cur));
    };
    apply(newStatus);
    try {
      const res = await authFetch(`/api/forms/appointments/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('failed');
      pushToast({
        type: 'success',
        title: 'Status updated',
        message: `${item.patientName || 'Appointment'} is now ${newStatus}.`
      });
    } catch (err) {
      if (err.message === 'unauthorized') return;
      apply(prev);
      pushToast({ type: 'error', title: 'Could not update status', message: 'Please check your connection and try again.' });
    }
  };

  // Delete (confirm dialog ke baad)
  const handleConfirmDelete = async () => {
    if (!confirmState) return;
    const { kind, item } = confirmState;
    const id = idOf(item);
    setDeleting(true);
    try {
      const url =
        kind === 'career'
          ? `/api/careers/${id}`
          : kind === 'review'
          ? `/api/reviews/${id}`
          : `/api/forms/${kind === 'appointment' ? 'appointments' : 'contacts'}/${id}`;
      const res = await authFetch(url, { method: 'DELETE' });
      if (!res.ok) throw new Error('failed');
      if (kind === 'appointment') {
        setAppointments((list) => list.filter((a) => idOf(a) !== id));
        if (knownIdsRef.current) knownIdsRef.current.delete(id);
        setSelectedAppointment(null);
      } else if (kind === 'career') {
        setCareers((list) => list.filter((c) => idOf(c) !== id));
        if (knownCareerIdsRef.current) knownCareerIdsRef.current.delete(id);
      } else if (kind === 'review') {
        setReviews((list) => list.filter((r) => idOf(r) !== id));
        if (knownReviewIdsRef.current) knownReviewIdsRef.current.delete(id);
      } else {
        setContacts((list) => list.filter((c) => idOf(c) !== id));
        setSelectedContact(null);
      }
      pushToast({
        type: 'success',
        title: kind === 'appointment' ? 'Appointment deleted' : kind === 'career' ? 'Application deleted' : kind === 'review' ? 'Review deleted' : 'Message deleted'
      });
      setConfirmState(null);
    } catch (err) {
      if (err.message !== 'unauthorized') {
        pushToast({ type: 'error', title: 'Delete failed', message: 'Please try again.' });
      }
    } finally {
      setDeleting(false);
    }
  };

  // ---------- Reviews ----------
  const handleReviewApproval = async (review, approved) => {
    const id = idOf(review);
    setReviewBusyId(id);
    try {
      const res = await authFetch(`/api/reviews/${id}/approval`, { method: 'PATCH', body: JSON.stringify({ approved }) });
      if (!res.ok) throw new Error('failed');
      setReviews((list) => list.map((r) => (idOf(r) === id ? { ...r, isApproved: approved } : r)));
      pushToast({
        type: 'success',
        title: approved ? 'Review approved' : 'Review hidden',
        message: approved ? 'It is now visible on the website.' : 'It is no longer shown on the website.'
      });
    } catch (err) {
      if (err.message !== 'unauthorized') pushToast({ type: 'error', title: 'Could not update the review', message: 'Please try again.' });
    } finally {
      setReviewBusyId(null);
    }
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();
    setReviewFormError('');
    setReviewSaving(true);
    try {
      const res = await authFetch('/api/reviews/admin', { method: 'POST', body: JSON.stringify(reviewForm) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setReviewFormError(data.message || 'Could not save the review.');
        return;
      }
      setShowAddReview(false);
      setReviewForm(EMPTY_REVIEW_FORM);
      setReviewFilter('Approved');
      pushToast({ type: 'success', title: 'Review published', message: 'It is now visible on the website.' });
      fetchData(true, true);
    } catch (err) {
      if (err.message !== 'unauthorized') setReviewFormError('Could not connect to the server.');
    } finally {
      setReviewSaving(false);
    }
  };

  // Dashboard ke cards se appointments tab kholna (filter ke saath)
  const openAppointmentsWith = (cfg = {}) => {
    setStatusFilter(cfg.status || 'All');
    setAppointmentFilter(cfg.when || 'All');
    setAppointmentSearch(cfg.search || '');
    setActiveTab('appointments');
  };

  // Ctrl+K search mein kisi result par click
  const handlePalettePick = (entry) => {
    setPaletteOpen(false);
    if (entry.kind === 'tab') setActiveTab(entry.id);
    else if (entry.kind === 'appointment') {
      setActiveTab('appointments');
      setSelectedAppointment(entry.item);
    } else if (entry.kind === 'contact') {
      setActiveTab('messages');
      setSelectedContact(entry.item);
    } else if (entry.kind === 'review') {
      setActiveTab('reviews');
      setReviewFilter(entry.item.isApproved ? 'Approved' : 'Pending');
    } else if (entry.kind === 'career') setActiveTab('careers');
  };

  // ---------- Careers ----------
  const handleCareerStatus = async (app, newStatus) => {
    const id = idOf(app);
    const prev = app.status || 'New';
    if (prev === newStatus) return;
    const apply = (status) => setCareers((list) => list.map((c) => (idOf(c) === id ? { ...c, status } : c)));
    apply(newStatus);
    try {
      const res = await authFetch(`/api/careers/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) });
      if (!res.ok) throw new Error('failed');
      pushToast({ type: 'success', title: 'Status updated', message: `${app.name || 'Applicant'} is now ${newStatus}.` });
    } catch (err) {
      if (err.message === 'unauthorized') return;
      apply(prev);
      pushToast({ type: 'error', title: 'Could not update status', message: 'Please check your connection and try again.' });
    }
  };

  // CV sirf token ke saath milti hai, is liye fetch karke file save karwate hain
  const handleDownloadCv = async (app) => {
    const id = idOf(app);
    setDownloadingId(id);
    try {
      const res = await authFetch(`/api/careers/${id}/cv`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'failed');
      }
      const blob = await res.blob();
      const type = res.headers.get('Content-Type') || '';
      const ext = type.includes('pdf') ? '.pdf' : type.includes('wordprocessingml') ? '.docx' : '.doc';
      const base = `${app.name || 'applicant'}-${app.lastName || ''}-CV`.replace(/[^\w-]+/g, '_');
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${base}${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(link.href), 1500);
    } catch (err) {
      if (err.message !== 'unauthorized') {
        pushToast({ type: 'error', title: 'Could not download the CV', message: err.message === 'failed' ? 'Please try again.' : err.message });
      }
    } finally {
      setDownloadingId(null);
    }
  };

  const handleExportCareers = (rows) =>
    exportToCSV(
      rows.map((a) => ({
        'First Name': a.name,
        'Last Name': a.lastName,
        'Position': a.job,
        'Degree': a.degree,
        'Experience': a.experience,
        'Age': a.age,
        'Gender': a.gender,
        'Phone': a.phone,
        'Email': a.email,
        'Status': a.status || 'New',
        'Applied On': a.createdAt ? new Date(a.createdAt).toLocaleString() : ''
      })),
      'rex_job_applications.csv'
    );

  // Test email bhej kar mail settings check karein
  const handleTestMail = async () => {
    setMailTesting(true);
    setMailResult(null);
    try {
      const res = await authFetch('/api/forms/test-mail', { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      setMailResult({
        ok: !!data.ok,
        message: data.message || (res.ok ? 'Test email sent.' : 'Could not send the test email.'),
        server: data.host ? `${data.host}:${data.port}` : null
      });
      pushToast(
        data.ok
          ? { type: 'success', title: 'Test email sent', message: data.message }
          : { type: 'error', title: 'Email is not working yet', message: 'See the details in Settings > Email Notifications.', duration: 8000 }
      );
    } catch (err) {
      if (err.message !== 'unauthorized') {
        setMailResult({ ok: false, message: 'Could not reach the server.', server: null });
      }
    } finally {
      setMailTesting(false);
    }
  };

  // Admin password badlein
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwMessage(null);
    if (pwForm.next.length < 8) {
      setPwMessage({ type: 'error', text: 'New password must be at least 8 characters.' });
      return;
    }
    if (pwForm.next !== pwForm.confirm) {
      setPwMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    setPwLoading(true);
    try {
      const res = await authFetch('/api/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setPwForm({ current: '', next: '', confirm: '' });
        setPwMessage({ type: 'success', text: 'Password changed successfully.' });
        pushToast({ type: 'success', title: 'Password changed', message: 'Use your new password next time you log in.' });
      } else {
        setPwMessage({ type: 'error', text: data.message || 'Could not change password.' });
      }
    } catch (err) {
      if (err.message !== 'unauthorized') {
        setPwMessage({ type: 'error', text: 'Could not connect to the server.' });
      }
    } finally {
      setPwLoading(false);
    }
  };

  // Add Note Handler
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const updatedNotes = [...notes, { id: Date.now(), text: newNoteText.trim() }];
    setNotes(updatedNotes);
    localStorage.setItem('rexAdminNotes', JSON.stringify(updatedNotes));
    setNewNoteText('');
  };

  // Delete Note Handler
  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('rexAdminNotes', JSON.stringify(updatedNotes));
  };

  // Export to CSV Function
  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert('No data available to export.');
      return;
    }
    const keys = Object.keys(data[0]);
    const csvContent = [
      keys.join(','),
      ...data.map(row => keys.map(k => `"${(row[k] || '').toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      (item.patientName || item.name || '').toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      (item.phone || '').toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      (item.department || item.service || '').toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      (item.date || '').toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      (item.sessionType || '').toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      (item.doctor || '').toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(appointmentSearch.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== 'All' && (item.status || 'Pending') !== statusFilter) return false;
    if (appointmentFilter === 'All') return true;
    const status = getAppointmentStatus(item.date);
    return status === appointmentFilter;
  });

  // Filtered Contacts
  const filteredContacts = contacts.filter((item) => {
    return (
      (item.name || '').toLowerCase().includes(contactSearch.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(contactSearch.toLowerCase()) ||
      (item.phone || '').toLowerCase().includes(contactSearch.toLowerCase()) ||
      (item.message || '').toLowerCase().includes(contactSearch.toLowerCase())
    );
  });

  const totalAppointments = appointments.length;
  const totalContacts = contacts.length;
  const todayAppointmentsCount = appointments.filter((i) => getAppointmentStatus(i.date) === 'Today').length;
  const pendingCount = appointments.filter((i) => (i.status || 'Pending') === 'Pending').length;
  const pendingReviews = reviews.filter((r) => !r.isApproved).length;
  const approvedReviews = reviews.length - pendingReviews;
  const reviewAverage = reviews.length ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0.0';
  const shownReviews = reviews.filter((r) => (reviewFilter === 'All' ? true : reviewFilter === 'Pending' ? !r.isApproved : r.isApproved));
  const newApplications = careers.filter((c) => (c.status || 'New') === 'New').length;
  const statusCounts = appointments.reduce((acc, i) => {
    const st = i.status || 'Pending';
    acc[st] = (acc[st] || 0) + 1;
    return acc;
  }, {});

  const tokenPayload = decodeJwt(localStorage.getItem('adminToken'));
  const tokenExpiryText = tokenPayload && tokenPayload.exp
    ? `Login valid until ${new Date(tokenPayload.exp * 1000).toLocaleString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}. Auto-logout after 5 minutes of inactivity.`
    : 'Auto-logout after 5 minutes of inactivity.';

  const pwStrength = (() => {
    const p = pwForm.next;
    let score = 0;
    if (p.length >= 8) score += 1;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score += 1;
    if (/\d/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;
    return score;
  })();

  // Department distribution calculation
  const departmentCounts = appointments.reduce((acc, curr) => {
    const dept = curr.department || curr.service || 'General Care';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      className="min-h-screen bg-[#F4F7F6] flex text-[#2D3748] font-sans overflow-x-hidden"
      style={{
        backgroundImage:
          'radial-gradient(52rem 34rem at 8% -8%, rgba(0,135,90,0.10), transparent 62%), radial-gradient(46rem 32rem at 100% 2%, rgba(30,58,138,0.10), transparent 62%), radial-gradient(40rem 28rem at 85% 100%, rgba(220,38,38,0.07), transparent 62%)',
        backgroundAttachment: 'fixed',
      }}
    >
      
      {/* ---------------- MOBILE SIDEBAR OVERLAY ---------------- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ---------------- SIDEBAR ---------------- */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 80 }}
        className={`fixed top-0 bottom-0 left-0 z-50 bg-gradient-to-b from-[#1E3A8A] via-[#172554] to-[#1E3A8A] text-white flex flex-col justify-between transition-all duration-300 shadow-2xl lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* LOGO AREA */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#00875A] flex items-center justify-center text-white font-serif font-extrabold flex-shrink-0 shadow-lg">
                RX
              </div>
              {(sidebarOpen || mobileMenuOpen) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
                  <span className="font-serif font-extrabold text-lg tracking-wider text-white leading-none">
                    REX
                  </span>
                  <span className="text-[10px] text-[#00875A] font-bold tracking-widest uppercase mt-1">
                    Medical Center
                  </span>
                </motion.div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-white/70 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SIDEBAR NAVIGATION */}
          <nav className="p-4 space-y-2 mt-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'appointments', label: 'Appointments', icon: CalendarDays, badge: totalAppointments, alert: unseenNew },
              { id: 'messages', label: 'Contact Messages', icon: MessageSquare, badge: totalContacts },
              { id: 'careers', label: 'Careers', icon: Briefcase, badge: careers.length, alert: careers.filter((c) => (c.status || 'New') === 'New').length },
              { id: 'reviews', label: 'Reviews', icon: Star, badge: reviews.length, alert: pendingReviews },
              { id: 'shop', label: 'Shop', icon: ShoppingBag },
              { id: 'news', label: 'News & Events', icon: Newspaper },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-xs tracking-wide transition-all relative group ${
                    isActive
                      ? 'bg-[#00875A] text-white shadow-lg shadow-[#00875A]/30'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#00875A]'}`} />
                  
                  {(sidebarOpen || mobileMenuOpen) && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow text-left">
                      {item.label}
                    </motion.span>
                  )}

                  {item.badge !== undefined && (sidebarOpen || mobileMenuOpen) && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-white text-[#1E3A8A]' : 'bg-white/10 text-white'}`}>
                      {item.badge}
                    </span>
                  )}

                  {item.alert > 0 && !isActive && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse shadow-lg shadow-rose-500/40">
                      +{item.alert}
                    </span>
                  )}

                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* SIDEBAR FOOTER / SECURITY BADGE */}
        <div className="p-4 border-t border-white/10">
          {(sidebarOpen || mobileMenuOpen) ? (
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#00875A] flex-shrink-0" />
              <div className="text-[11px] leading-tight">
                <p className="font-bold text-white">Secure Admin Portal</p>
                <p className="text-slate-400 text-[10px]">5-Min Session Timeout</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-2 text-[#00875A]">
              <ShieldCheck className="w-6 h-6" />
            </div>
          )}
        </div>
      </motion.aside>

      {/* ---------------- MAIN CONTENT WRAPPER ---------------- */}
      <div className={`flex-grow flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:pl-[260px]' : 'lg:pl-[80px]'}`}>
        
        {/* TOP STICKY HEADER */}
        <header className="sticky top-0 z-30 h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1E3A8A] via-[#00875A] to-[#DC2626] pointer-events-none" />
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-[#1E3A8A] rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-2 text-slate-600 hover:text-[#1E3A8A] rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="font-serif text-lg sm:text-xl font-extrabold text-[#1E3A8A]">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'appointments' && 'Booked Appointments Management'}
                {activeTab === 'messages' && 'Contact Form Messages'}
                {activeTab === 'careers' && 'Job Applications'}
                {activeTab === 'reviews' && 'Patient Reviews'}
                {activeTab === 'shop' && 'Shop: Products & Orders'}
                {activeTab === 'news' && 'News & Events'}
                {activeTab === 'settings' && 'Admin Portal Settings'}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                REX Medical Center Command & Management Center
              </p>
            </div>
          </div>

          {/* HEADER RIGHT ACTIONS */}
          <div className="flex items-center gap-3 sm:gap-4">
            <LiveClock />

            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden md:inline-flex items-center gap-2 bg-slate-100 hover:bg-[#1E3A8A] hover:text-white text-slate-600 px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
              title="Quick search (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
              <span className="text-[10px] bg-white/70 text-slate-500 rounded px-1.5 py-0.5">Ctrl K</span>
            </button>

            {lastUpdated && (
              <span className="text-[11px] font-semibold text-slate-500 hidden md:inline-block bg-slate-100 px-3 py-1 rounded-full">
                Last updated: {lastUpdated}
              </span>
            )}

            <button
              onClick={() => fetchData(true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-[#1E3A8A] hover:text-white text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* ADMIN PROFILE */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div 
                onClick={() => adminProfilePic && setImagePreviewOpen(true)}
                className={`w-10 h-10 rounded-full bg-[#1E3A8A] text-white font-bold text-xs flex items-center justify-center shadow-md overflow-hidden border-2 border-[#00875A] ${adminProfilePic ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
                title={adminProfilePic ? "Click to view full picture" : "Admin Profile"}
              >
                {adminProfilePic ? (
                  <img src={adminProfilePic} alt="Admin" className="w-full h-full object-cover" />
                ) : (
                  <span>AD</span>
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-[#1E3A8A]">Administrator</p>
                <p className="text-[10px] text-slate-500">REX Medical Center</p>
              </div>
            </div>

            {/* LOGOUT BUTTON */}
            <button
              onClick={() => setLogoutModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-[#DC2626] hover:text-white text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* ---------------- PAGE BODY ---------------- */}
        <main className="flex-grow p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* ERROR STATE BANNER */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center justify-between text-rose-900 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <p className="text-xs font-semibold">{error}</p>
              </div>
              <button
                onClick={() => fetchData(true)}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Retry
              </button>
            </motion.div>
          )}

          {/* LOADING SKELETON */}
          {loading ? (
            <div className="space-y-6">
              <div className="h-44 bg-slate-200 animate-pulse rounded-3xl" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-2xl" />
                ))}
              </div>
              <div className="h-96 bg-slate-200 animate-pulse rounded-2xl" />
            </div>
          ) : (
            <>
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  
                  {/* WELCOME BANNER */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#00875A] rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden xl:min-h-[340px] xl:flex xl:items-center"
                  >
                    <HeroVideo />
                    <AuroraCanvas />
                    <div
                      className="absolute inset-0 pointer-events-none opacity-[0.10]"
                      style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '22px 22px' }}
                    />
                    <div
                      className="rx-anim absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                      style={{ animation: 'rxShine 8s ease-in-out infinite' }}
                    />
                    <div className="hidden xl:block absolute right-6 top-1/2 -translate-y-1/2 w-[320px] h-[320px] pointer-events-none">
                      <HeroScene3D
                        chips={[
                          { icon: CalendarCheck, label: 'Today', value: todayAppointmentsCount },
                          { icon: Activity, label: 'Pending', value: pendingCount },
                          { icon: MessageSquare, label: 'Messages', value: totalContacts },
                        ]}
                      />
                    </div>
                    
                    <div className="relative z-10 space-y-4 max-w-2xl xl:max-w-[540px] 2xl:max-w-2xl">
                      <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        REX Medical Command Center
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
                        Welcome back to your <span className="text-emerald-300">Dashboard</span>
                      </h2>

                      <p className="text-slate-100 text-xs sm:text-sm leading-relaxed font-medium">
                        Manage appointments, review contact messages, and monitor incoming healthcare requests in real-time.
                      </p>

                      <div className="pt-2 flex flex-wrap gap-3">
                        <button
                          onClick={() => setActiveTab('appointments')}
                          className="bg-white hover:bg-[#00875A] text-[#1E3A8A] hover:text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>View Appointments</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setActiveTab('messages')}
                          className="bg-white/15 hover:bg-white/25 border border-white/30 text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>View Messages</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (!printDailyReport(appointments)) {
                              pushToast({ type: 'error', title: 'Pop-up blocked', message: 'Please allow pop-ups to print the daily report.' });
                            }
                          }}
                          className="bg-white/15 hover:bg-white/25 border border-white/30 text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Print Today&apos;s Report</span>
                        </button>

                        <button
                          onClick={() => setPaletteOpen(true)}
                          className="bg-white/15 hover:bg-white/25 border border-white/30 text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                        >
                          <Search className="w-4 h-4" />
                          <span>Quick Search</span>
                          <span className="text-[10px] bg-white/20 rounded px-1.5 py-0.5">Ctrl K</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* STATISTICS CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    <Tilt3D delay={0.1} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#00875A]/10 text-[#00875A] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <CalendarCheck className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-[#00875A] px-2.5 py-1 rounded-full">
                          Booked
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Appointments</h3>
                      <p style={{ transform: 'translateZ(26px)' }} className="font-serif text-3xl font-extrabold text-[#1E3A8A] mt-1">
                        <CountUp value={totalAppointments} />
                      </p>
                    </Tilt3D>

                    <Tilt3D delay={0.2} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <MessageSquare className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-[#DC2626] px-2.5 py-1 rounded-full">
                          Inbox
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Contact Messages</h3>
                      <p style={{ transform: 'translateZ(26px)' }} className="font-serif text-3xl font-extrabold text-[#1E3A8A] mt-1">
                        <CountUp value={totalContacts} />
                      </p>
                    </Tilt3D>

                    <Tilt3D delay={0.3} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Clock className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                          Today
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Today's Requests</h3>
                      <p style={{ transform: 'translateZ(26px)' }} className="font-serif text-3xl font-extrabold text-[#1E3A8A] mt-1">
                        <CountUp value={todayAppointmentsCount} />
                      </p>
                    </Tilt3D>

                    <Tilt3D delay={0.4} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Activity className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full">
                          Action
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Awaiting Confirmation</h3>
                      <p style={{ transform: 'translateZ(26px)' }} className="font-serif text-3xl font-extrabold text-[#1E3A8A] mt-1 flex items-center gap-2">
                        <CountUp value={pendingCount} />
                        {pendingCount > 0 && <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />}
                      </p>
                    </Tilt3D>

                  </div>

                  {/* ===== PRO INSIGHTS ===== */}
                  <InsightsStrip appointments={appointments} />

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <NextAppointment appointments={appointments} onOpen={setSelectedAppointment} />
                    <AttentionPanel
                      appointments={appointments}
                      contacts={contacts}
                      pendingReviews={pendingReviews}
                      newApplications={newApplications}
                      onFilter={openAppointmentsWith}
                      onGo={setActiveTab}
                    />
                    <WeeklyGoal appointments={appointments} />
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                      <BookingTrendChart appointments={appointments} />
                    </div>
                    <StatusDonut appointments={appointments} onSelect={(st) => openAppointmentsWith({ status: st })} />
                  </div>

                  {/* TODAY'S SCHEDULE + DOCTOR WORKLOAD */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <TodaySchedule appointments={appointments} onOpen={setSelectedAppointment} />
                    </div>
                    <DoctorWorkload appointments={appointments} />
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <OnlineSessions
                      appointments={appointments}
                      onOpen={setSelectedAppointment}
                      onCopied={() => pushToast({ type: 'success', title: 'Meet link copied', message: 'You can paste it anywhere.' })}
                    />
                    <div className="xl:col-span-2">
                      <ActivityTimeline appointments={appointments} contacts={contacts} reviews={reviews} careers={careers} onGo={setActiveTab} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                      <PeakHours appointments={appointments} />
                    </div>
                    <WeekdayChart appointments={appointments} />
                  </div>

                  <HeatmapCard appointments={appointments} />

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <SessionSplit appointments={appointments} />
                    <TopLocations appointments={appointments} />
                    <ReturningPatients appointments={appointments} />
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                      <MonthlyOverview appointments={appointments} />
                    </div>
                    <RatingSnapshot reviews={reviews} onOpen={() => setActiveTab('reviews')} />
                  </div>

                  <WeekTrend appointments={appointments} />

                  {/* DEPARTMENT BREAKDOWN & ADMIN QUICK NOTES */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* DEPARTMENT BREAKDOWN */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <h3 className="font-serif font-bold text-[#1E3A8A] text-lg">Department Breakdown</h3>
                        <span className="text-xs text-slate-500 font-semibold">Active Bookings</span>
                      </div>

                      {Object.keys(departmentCounts).length === 0 ? (
                        <div className="text-center py-12 text-slate-400 text-sm">
                          No department data recorded yet.
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {Object.entries(departmentCounts).map(([dept, count], idx) => {
                            const percentage = Math.round((count / (totalAppointments || 1)) * 100);
                            return (
                              <div key={idx} className="space-y-1.5">
                                <div className="flex justify-between text-xs font-bold text-slate-700">
                                  <span>{dept}</span>
                                  <span>{count} bookings ({percentage}%)</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                  <div
                                    className="bg-[#1E3A8A] h-full rounded-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* ADMIN QUICK NOTES (MEMO PAD) */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                          <h3 className="font-serif font-bold text-[#1E3A8A] text-lg">Admin Quick Notes</h3>
                          <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-bold">Memo</span>
                        </div>

                        <div className="space-y-2.5 mt-4 max-h-52 overflow-y-auto pr-1">
                          {notes.map((note) => (
                            <div key={note.id} className="flex items-start justify-between p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-xs text-slate-700">
                              <p className="leading-relaxed pr-2">{note.text}</p>
                              <button
                                onClick={() => handleDeleteNote(note.id)}
                                className="text-rose-500 hover:text-rose-700 flex-shrink-0 mt-0.5"
                                title="Delete note"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <form onSubmit={handleAddNote} className="pt-3 border-t border-slate-100 flex gap-2">
                        <input
                          type="text"
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          placeholder="Add quick reminder..."
                          className="flex-grow px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-[#00875A]"
                        />
                        <button
                          type="submit"
                          className="bg-[#1E3A8A] hover:bg-[#00875A] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </form>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: APPOINTMENTS */}
              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-2xl font-extrabold text-[#1E3A8A]">
                          Booked Appointments Management
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Total records: <span className="font-bold text-[#00875A]">{appointments.length}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => exportToCSV(appointments.map((a) => ({
                            'Patient Name': a.patientName || a.name,
                            'Phone': a.phone,
                            'Email': a.email,
                            'Department': a.department || a.service,
                            'Doctor': a.doctor,
                            'Session Type': a.sessionType,
                            'Location': a.location,
                            'Date': a.date,
                            'Time': a.time,
                            'Message': a.message,
                            'Meet Link': a.meetLink,
                            'Booked On': a.createdAt ? new Date(a.createdAt).toLocaleString() : ''
                          })), 'rex_appointments.csv')}
                          className="inline-flex items-center gap-2 bg-[#00875A] hover:bg-[#065f46] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm whitespace-nowrap"
                        >
                          <FileSpreadsheet className="w-4 h-4" />
                          <span>Export CSV</span>
                        </button>

                        <div className="relative w-full sm:w-64">
                          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            value={appointmentSearch}
                            onChange={(e) => setAppointmentSearch(e.target.value)}
                            placeholder="Search appointments..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                      {['All', 'Today', 'Upcoming', 'Past'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setAppointmentFilter(filter)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            appointmentFilter === filter
                              ? 'bg-[#1E3A8A] text-white shadow-md'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">Status</span>
                      {['All', ...STATUS_OPTIONS].map((st) => (
                        <button
                          key={st}
                          onClick={() => setStatusFilter(st)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all hover:-translate-y-0.5 ${
                            statusFilter === st
                              ? st === 'All'
                                ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-md'
                                : `${STATUS_STYLES[st]} shadow-md ring-2 ring-offset-1 ring-slate-200`
                              : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {st}
                          {st !== 'All' && <span className="ml-1.5 opacity-70">{statusCounts[st] || 0}</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {filteredAppointments.length === 0 ? (
                      <div className="text-center py-20 space-y-3">
                        <CalendarDays className="w-12 h-12 text-slate-300 mx-auto" />
                        <p className="text-slate-500 font-medium text-sm">No appointments found.</p>
                      </div>
                    ) : (
                      <>
                        <div className="hidden lg:block overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-[#F7FAFC] text-[#1E3A8A] text-[11px] uppercase tracking-wider font-bold border-b border-slate-200">
                                <th className="py-4 px-5">Patient</th>
                                <th className="py-4 px-5">Contact</th>
                                <th className="py-4 px-5">Department</th>
                                <th className="py-4 px-5">Doctor</th>
                                <th className="py-4 px-5">Session & Location</th>
                                <th className="py-4 px-5">Date & Time</th>
                                <th className="py-4 px-5">Status</th>
                                <th className="py-4 px-5 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                              {filteredAppointments.map((item, idx) => {
                                const patientName = item.patientName || item.name || 'Unnamed Patient';
                                const dateStatus = getAppointmentStatus(item.date);
                                const customStatus = item.status || 'Pending';
                                const hasMeet = safeHttps(item.meetLink);
                                return (
                                  <tr key={item.id ?? item._id ?? idx} className="hover:bg-[#00875A]/5 transition-colors">
                                    <td className="py-4 px-5">
                                      <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#1E3A8A] text-white font-bold text-xs flex items-center justify-center shadow-sm flex-shrink-0">
                                          {getInitials(patientName)}
                                        </div>
                                        <span className="font-bold text-[#1E3A8A]">{patientName}</span>
                                      </div>
                                    </td>
                                    <td className="py-4 px-5">
                                      <p className="font-medium text-slate-700">{item.phone || 'N/A'}</p>
                                      <p className="text-[11px] text-slate-400 break-all">{item.email || 'No email'}</p>
                                    </td>
                                    <td className="py-4 px-5">
                                      <span className="bg-slate-100 text-[#1E3A8A] font-semibold px-2.5 py-1 rounded-lg">
                                        {item.department || item.service || 'General'}
                                      </span>
                                    </td>
                                    <td className="py-4 px-5 font-semibold text-[#1E3A8A] min-w-[150px]">{item.doctor || 'N/A'}</td>
                                    <td className="py-4 px-5 min-w-[200px]">
                                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                        item.sessionType === 'Online'
                                          ? 'bg-emerald-50 text-[#00875A] border border-emerald-200'
                                          : 'bg-blue-50 text-[#1E3A8A] border border-blue-200'
                                      }`}>
                                        {item.sessionType || 'N/A'}
                                      </span>
                                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{item.location || 'N/A'}</p>
                                      {hasMeet && (
                                        <a
                                          href={item.meetLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-1 rounded-full bg-[#00875A] text-white text-[10px] font-bold hover:bg-[#065f46] hover:-translate-y-0.5 transition-all"
                                        >
                                          <Video className="w-3 h-3" /> Join Google Meet
                                        </a>
                                      )}
                                      {!hasMeet && item.sessionType === 'Online' && (
                                        <p className="text-[10px] font-semibold text-amber-600 mt-1">No Meet link saved</p>
                                      )}
                                    </td>
                                    <td className="py-4 px-5 text-slate-600">
                                      <p className="font-semibold">{item.date || 'N/A'}</p>
                                      <p className="text-[11px] text-slate-400">{item.time || ''}</p>
                                      {dateStatus === 'Today' && (
                                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-bold uppercase tracking-wider">Today</span>
                                      )}
                                    </td>
                                    <td className="py-4 px-5">
                                      <select
                                        value={customStatus}
                                        onChange={(e) => handleStatusChange(item, e.target.value)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${STATUS_STYLES[customStatus] || STATUS_STYLES.Pending}`}
                                      >
                                        {STATUS_OPTIONS.map((st) => (
                                          <option key={st} value={st}>{st}</option>
                                        ))}
                                      </select>
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                      <div className="inline-flex items-center gap-1.5">
                                        <button
                                          onClick={() => setSelectedAppointment(item)}
                                          className="inline-flex items-center gap-1.5 bg-[#1E3A8A] hover:bg-[#00875A] hover:-translate-y-0.5 hover:shadow-md text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                                        >
                                          <Eye className="w-3.5 h-3.5" />
                                          <span>View</span>
                                        </button>
                                        <DeleteIconButton onClick={() => setConfirmState({ kind: 'appointment', item })} label="Delete appointment" />
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="lg:hidden divide-y divide-slate-100 p-4 space-y-4">
                          {filteredAppointments.map((item, idx) => {
                            const patientName = item.patientName || item.name || 'Unnamed Patient';
                            const dateStatus = getAppointmentStatus(item.date);
                            const customStatus = item.status || 'Pending';
                            const hasMeet = safeHttps(item.meetLink);
                            return (
                              <div key={item.id ?? item._id ?? idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-white font-bold text-xs flex items-center justify-center">
                                      {getInitials(patientName)}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-[#1E3A8A] text-sm">{patientName}</h4>
                                      <p className="text-xs text-slate-500">{item.phone}</p>
                                    </div>
                                  </div>
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                    dateStatus === 'Today' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-[#00875A]'
                                  }`}>
                                    {dateStatus}
                                  </span>
                                </div>

                                <div className="text-xs text-slate-600 space-y-1 pt-1">
                                  <p><span className="font-bold text-slate-700">Department:</span> {item.department || item.service || 'General'}</p>
                                  <p><span className="font-bold text-slate-700">Doctor:</span> {item.doctor || 'N/A'}</p>
                                  <p><span className="font-bold text-slate-700">Session:</span> {item.sessionType || 'N/A'}</p>
                                  <p><span className="font-bold text-slate-700">Location:</span> {item.location || 'N/A'}</p>
                                  {item.email && <p className="break-all"><span className="font-bold text-slate-700">Email:</span> {item.email}</p>}
                                  <p><span className="font-bold text-slate-700">Date/Time:</span> {item.date || 'N/A'} {item.time ? `@ ${item.time}` : ''}</p>
                                  {hasMeet && (
                                    <p>
                                      <span className="font-bold text-slate-700">Meet:</span>{' '}
                                      <a href={item.meetLink} target="_blank" rel="noopener noreferrer" className="text-[#00875A] font-bold underline">Join Google Meet</a>
                                    </p>
                                  )}
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                  <select
                                    value={customStatus}
                                    onChange={(e) => handleStatusChange(item, e.target.value)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${STATUS_STYLES[customStatus] || STATUS_STYLES.Pending}`}
                                  >
                                    {STATUS_OPTIONS.map((st) => (
                                      <option key={st} value={st}>{st}</option>
                                    ))}
                                  </select>

                                  <div className="inline-flex items-center gap-1.5">
                                    <button
                                      onClick={() => setSelectedAppointment(item)}
                                      className="inline-flex items-center gap-1.5 bg-[#1E3A8A] hover:bg-[#00875A] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>View</span>
                                    </button>
                                    <DeleteIconButton onClick={() => setConfirmState({ kind: 'appointment', item })} label="Delete appointment" />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: CONTACT MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl font-extrabold text-[#1E3A8A]">
                        Contact Form Messages
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Total inquiries: <span className="font-bold text-[#DC2626]">{contacts.length}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => exportToCSV(contacts, 'rex_contact_messages.csv')}
                        className="inline-flex items-center gap-2 bg-[#00875A] hover:bg-[#065f46] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm whitespace-nowrap"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Export CSV</span>
                      </button>

                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={contactSearch}
                          onChange={(e) => setContactSearch(e.target.value)}
                          placeholder="Search messages..."
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {filteredContacts.length === 0 ? (
                      <div className="text-center py-20 space-y-3">
                        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
                        <p className="text-slate-500 font-medium text-sm">No contact messages found.</p>
                      </div>
                    ) : (
                      <>
                        <div className="hidden lg:block overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-[#F7FAFC] text-[#1E3A8A] text-[11px] uppercase tracking-wider font-bold border-b border-slate-200">
                                <th className="py-4 px-6">Sender Name</th>
                                <th className="py-4 px-6">Email</th>
                                <th className="py-4 px-6">Phone</th>
                                <th className="py-4 px-6">Message Preview</th>
                                <th className="py-4 px-6 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                              {filteredContacts.map((item, idx) => (
                                <tr key={idx} className="hover:bg-[#DC2626]/5 transition-colors">
                                  <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                      <div className="w-9 h-9 rounded-xl bg-[#DC2626]/10 text-[#DC2626] font-bold text-xs flex items-center justify-center">
                                        {getInitials(item.name)}
                                      </div>
                                      <span className="font-bold text-[#1E3A8A]">{item.name || 'Anonymous'}</span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-6 text-slate-600">{item.email || 'N/A'}</td>
                                  <td className="py-4 px-6 text-slate-600 font-medium">{item.phone || 'N/A'}</td>
                                  <td className="py-4 px-6 text-slate-600 max-w-xs truncate">
                                    {item.message || 'No message provided'}
                                  </td>
                                  <td className="py-4 px-6 text-right">
                                    <div className="inline-flex items-center gap-1.5">
                                      <button
                                        onClick={() => setSelectedContact(item)}
                                        className="inline-flex items-center gap-1.5 bg-[#1E3A8A] hover:bg-[#DC2626] hover:-translate-y-0.5 hover:shadow-md text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>View</span>
                                      </button>
                                      <DeleteIconButton onClick={() => setConfirmState({ kind: 'contact', item })} label="Delete message" />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="lg:hidden divide-y divide-slate-100 p-4 space-y-4">
                          {filteredContacts.map((item, idx) => (
                            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DC2626]/10 text-[#DC2626] font-bold text-xs flex items-center justify-center">
                                  {getInitials(item.name)}
                                </div>
                                <div>
                                  <h4 className="font-bold text-[#1E3A8A] text-sm">{item.name || 'Anonymous'}</h4>
                                  <p className="text-xs text-slate-500">{item.email || item.phone}</p>
                                </div>
                              </div>

                              <p className="text-xs text-slate-600 line-clamp-2 bg-white p-3 rounded-xl border border-slate-200/60">
                                "{item.message}"
                              </p>

                              <div className="pt-1 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => setSelectedContact(item)}
                                    className="inline-flex items-center justify-center gap-1.5 bg-[#1E3A8A] hover:bg-[#DC2626] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>View</span>
                                  </button>
                                  <DeleteIconButton onClick={() => setConfirmState({ kind: 'contact', item })} label="Delete message" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* TAB: REVIEWS */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">

                  <div className="bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#00875A] text-white flex items-center justify-center shadow-md">
                        <Star className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl font-extrabold text-[#1E3A8A]" style={{ marginBottom: 0 }}>
                          Reviews Moderation
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Only <span className="font-bold text-[#00875A]">approved</span> reviews are shown on the website.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {[
                        { label: 'Pending', value: pendingReviews, tone: 'bg-amber-50 text-amber-700 border-amber-200' },
                        { label: 'Approved', value: approvedReviews, tone: 'bg-emerald-50 text-[#00875A] border-emerald-200' },
                        { label: 'Average', value: reviewAverage, tone: 'bg-blue-50 text-[#1E3A8A] border-blue-200' }
                      ].map((s) => (
                        <div key={s.label} className={`px-4 py-2 rounded-2xl border text-center ${s.tone}`}>
                          <p className="font-serif text-xl font-extrabold leading-none">{s.value}</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider mt-1">{s.label}</p>
                        </div>
                      ))}
                      <button
                        onClick={() => fetchData(true)}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#1E3A8A] hover:text-white text-slate-600 transition-colors"
                        title="Refresh reviews"
                      >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                      </button>
                      <button
                        onClick={() => {
                          setReviewForm(EMPTY_REVIEW_FORM);
                          setReviewFormError('');
                          setShowAddReview(true);
                        }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1E3A8A] to-[#00875A] hover:-translate-y-0.5 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all"
                      >
                        <Plus className="w-4 h-4" /> Add Review
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['Pending', 'Approved', 'All'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setReviewFilter(f)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          reviewFilter === f ? 'bg-[#1E3A8A] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {f}
                        {f === 'Pending' && pendingReviews > 0 && (
                          <span className="ml-2 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px]">{pendingReviews}</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {shownReviews.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-200/70 text-center py-16 space-y-2">
                      <Star className="w-10 h-10 text-slate-300 mx-auto" />
                      <p className="text-slate-500 text-sm font-medium">
                        {reviewFilter === 'Pending' ? 'No review is waiting for approval.' : 'No reviews in this filter.'}
                      </p>
                      <p className="text-[11px] text-slate-400">If reviews never appear here, make sure the reviews table and route are set up on the server.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                      <AnimatePresence mode="popLayout">
                        {shownReviews.map((r, i) => (
                          <motion.div
                            layout
                            key={r.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: Math.min(i, 6) * 0.04 }}
                            className={`bg-white rounded-3xl border p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                              r.isApproved ? 'border-slate-200/70' : 'border-amber-300 ring-2 ring-amber-100'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                                  {String(r.name || '?').trim().slice(0, 2).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-[#1E3A8A] truncate">{r.name}</p>
                                  <p className="text-[11px] text-slate-400 truncate">
                                    {formatReviewDate(r.createdAt)}
                                    {r.service ? ` · ${r.service}` : ''}
                                  </p>
                                </div>
                              </div>
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${
                                  r.isApproved ? 'bg-emerald-50 text-[#00875A] border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}
                              >
                                {r.isApproved ? 'Live' : 'Pending'}
                              </span>
                            </div>

                            <div className="mt-3">
                              <ReviewStars value={r.rating} />
                              {r.title && <p className="font-bold text-slate-800 text-sm mt-2">{r.title}</p>}
                              <p className="text-sm text-slate-600 leading-relaxed mt-1 whitespace-pre-line break-words">{r.message}</p>
                              {r.email && <p className="text-[11px] text-slate-400 mt-2 break-all">Email (visible to admin only): {r.email}</p>}
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                              {r.isApproved ? (
                                <button
                                  disabled={reviewBusyId === r.id}
                                  onClick={() => handleReviewApproval(r, false)}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors disabled:opacity-50"
                                >
                                  <EyeOff className="w-3.5 h-3.5" /> Hide
                                </button>
                              ) : (
                                <button
                                  disabled={reviewBusyId === r.id}
                                  onClick={() => handleReviewApproval(r, true)}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00875A] hover:bg-[#065f46] hover:-translate-y-0.5 text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
                                >
                                  {reviewBusyId === r.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />} Approve
                                </button>
                              )}
                              <div className="ml-auto">
                                <DeleteIconButton onClick={() => setConfirmState({ kind: 'review', item: r })} label="Delete review" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: SETTINGS */}
              {activeTab === 'careers' && (
                <CareersTab
                  applications={careers}
                  onStatusChange={handleCareerStatus}
                  onDownloadCv={handleDownloadCv}
                  onDelete={(item) => setConfirmState({ kind: 'career', item })}
                  onExport={handleExportCareers}
                  downloadingId={downloadingId}
                />
              )}

              {activeTab === 'shop' && <AdminShop />}

              {activeTab === 'news' && <AdminNews />}

              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
                    
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="font-serif text-2xl font-extrabold text-[#1E3A8A]">
                        Admin Portal Settings & Profile
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Configure your profile picture, administrative preferences, and portal security.
                      </p>
                    </div>

                    {/* PROFILE PICTURE SECTION */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#00875A]">
                        Admin Profile Picture
                      </h4>

                      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <div 
                          onClick={() => adminProfilePic && setImagePreviewOpen(true)}
                          className={`w-24 h-24 rounded-full bg-[#1E3A8A] text-white font-bold text-xl flex items-center justify-center shadow-md overflow-hidden border-4 border-[#00875A] flex-shrink-0 ${adminProfilePic ? 'cursor-pointer hover:opacity-90 relative group' : ''}`}
                          title={adminProfilePic ? "Click to view full picture" : "Admin Profile"}
                        >
                          {adminProfilePic ? (
                            <>
                              <img src={adminProfilePic} alt="Admin Profile" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <Maximize2 className="w-6 h-6" />
                              </div>
                            </>
                          ) : (
                            <span>AD</span>
                          )}
                        </div>

                        <div className="space-y-3 text-center sm:text-left flex-grow">
                          <div>
                            <p className="text-sm font-bold text-[#1E3A8A]">Change Administrator Photo</p>
                            <p className="text-xs text-slate-500">Upload a professional photo (JPG, PNG). Click on the photo to view it in full size.</p>
                          </div>

                          <label className="inline-flex items-center gap-2 bg-[#00875A] hover:bg-[#065f46] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all shadow-sm">
                            <Upload className="w-4 h-4" />
                            <span>Upload New Image</span>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#00875A]">
                        Notification Preferences
                      </h4>

                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/75 transition-colors">
                          <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-[#1E3A8A]" />
                            <div>
                              <p className="text-xs font-bold text-[#1E3A8A]">New Appointment Alerts</p>
                              <p className="text-[11px] text-slate-500">Show a popup and play a soft sound when a new appointment arrives.</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settingsState.soundAlerts}
                            onChange={(e) => setSettingsState({ ...settingsState, soundAlerts: e.target.checked })}
                            className="w-4 h-4 text-[#00875A] rounded focus:ring-[#00875A]"
                          />
                        </label>

                        <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/75 transition-colors">
                          <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-[#1E3A8A]" />
                            <div>
                              <p className="text-xs font-bold text-[#1E3A8A]">Auto-Refresh Dashboard Data</p>
                              <p className="text-[11px] text-slate-500">Check for new appointments every minute and whenever you return to this tab.</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settingsState.autoRefresh}
                            onChange={(e) => setSettingsState({ ...settingsState, autoRefresh: e.target.checked })}
                            className="w-4 h-4 text-[#00875A] rounded focus:ring-[#00875A]"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#00875A]">
                        System & Security
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                          <div className="flex items-center gap-2 text-[#1E3A8A]">
                            <Database className="w-4 h-4" />
                            <span className="font-bold text-xs">Database Status</span>
                          </div>
                          <p className="text-xs text-slate-600">Connected to the secure MySQL database on the REX server.</p>
                          <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                            Online & Secure
                          </span>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                          <div className="flex items-center gap-2 text-[#1E3A8A]">
                            <Lock className="w-4 h-4" />
                            <span className="font-bold text-xs">Authentication Token</span>
                          </div>
                          <p className="text-xs text-slate-600">{tokenExpiryText}</p>
                          <span className="inline-block bg-blue-100 text-[#1E3A8A] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                            Bearer Token Valid
                          </span>
                        </div>
                        <div className="sm:col-span-2 p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                          <div className="flex items-center gap-2 text-[#1E3A8A]">
                            <Bell className="w-4 h-4" />
                            <span className="font-bold text-xs">Email Notifications</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            New bookings are emailed to the owner, and patients get a confirmation. Send a test email to check that your mail settings work.
                          </p>
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              onClick={handleTestMail}
                              disabled={mailTesting}
                              className="inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#00875A] hover:-translate-y-0.5 hover:shadow-lg text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-95 disabled:opacity-70"
                            >
                              {mailTesting && <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                              {mailTesting ? 'Sending...' : 'Send Test Email'}
                            </button>
                            {mailResult && mailResult.server && (
                              <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                                Server: {mailResult.server}
                              </span>
                            )}
                          </div>
                          {mailResult && (
                            <p
                              role="status"
                              className={`text-xs font-semibold px-4 py-2.5 rounded-xl border leading-relaxed ${
                                mailResult.ok
                                  ? 'bg-emerald-50 text-[#00875A] border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border-rose-200'
                              }`}
                            >
                              {mailResult.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-5 pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#00875A]">
                        Change Password
                      </h4>
                      <form onSubmit={handleChangePassword} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center">
                            <KeyRound className="w-5 h-5" />
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Use at least 8 characters. A mix of upper and lower case letters, numbers and symbols is strongest.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { key: 'current', label: 'Current password', auto: 'current-password' },
                            { key: 'next', label: 'New password', auto: 'new-password' },
                            { key: 'confirm', label: 'Confirm new password', auto: 'new-password' }
                          ].map((f) => (
                            <label key={f.key} className="space-y-1.5 block">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{f.label}</span>
                              <input
                                type={pwShow ? 'text' : 'password'}
                                value={pwForm[f.key]}
                                autoComplete={f.auto}
                                required
                                onChange={(e) => setPwForm({ ...pwForm, [f.key]: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/15 transition-all"
                              />
                            </label>
                          ))}
                        </div>

                        {pwForm.next && (
                          <div className="space-y-1.5">
                            <div className="flex gap-1.5">
                              {[1, 2, 3, 4].map((n) => (
                                <div
                                  key={n}
                                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                    pwStrength >= n
                                      ? pwStrength <= 1 ? 'bg-rose-500' : pwStrength === 2 ? 'bg-amber-500' : 'bg-[#00875A]'
                                      : 'bg-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-[11px] font-semibold text-slate-500">
                              Strength: {['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][pwStrength]}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setPwShow(!pwShow)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1E3A8A] transition-colors"
                          >
                            {pwShow ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {pwShow ? 'Hide passwords' : 'Show passwords'}
                          </button>

                          <button
                            type="submit"
                            disabled={pwLoading}
                            className="inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#00875A] hover:-translate-y-0.5 hover:shadow-lg text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-95 disabled:opacity-70"
                          >
                            {pwLoading && <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                            {pwLoading ? 'Updating...' : 'Update Password'}
                          </button>
                        </div>

                        {pwMessage && (
                          <p
                            role="status"
                            className={`text-xs font-semibold px-4 py-2.5 rounded-xl border ${
                              pwMessage.type === 'success'
                                ? 'bg-emerald-50 text-[#00875A] border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {pwMessage.text}
                          </p>
                        )}
                      </form>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      {settingsSaved && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                          <Check className="w-4 h-4" /> Settings updated successfully!
                        </span>
                      )}
                      <button
                        onClick={() => {
                          try {
                            localStorage.setItem('rexAdminSettings', JSON.stringify(settingsState));
                          } catch {
                            /* storage full/blocked */
                          }
                          setSettingsSaved(true);
                          setTimeout(() => setSettingsSaved(false), 3000);
                        }}
                        className="ml-auto bg-[#1E3A8A] hover:bg-[#00875A] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                      >
                        Save Preferences
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </>
          )}

        </main>

        <footer className="w-full text-center py-6 border-t border-slate-200 text-slate-400 text-xs font-medium bg-white mt-auto">
          REX Medical Center • Admin Dashboard
        </footer>

      </div>

      {/* ---------------- MODALS ---------------- */}
      
      {/* FULL IMAGE PREVIEW MODAL */}
      <AnimatePresence>
        {imagePreviewOpen && adminProfilePic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 text-center space-y-4"
            >
              <div className="flex items-center justify-between px-2 pt-2">
                <h3 className="font-serif font-bold text-[#1E3A8A] text-lg">Administrator Photo Preview</h3>
                <button
                  onClick={() => setImagePreviewOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <img src={adminProfilePic} alt="Full Admin Profile" className="w-full h-full object-contain" />
              </div>

              <div className="pt-2 pb-1 flex justify-end">
                <button
                  onClick={() => setImagePreviewOpen(false)}
                  className="bg-[#1E3A8A] hover:bg-[#00875A] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* APPOINTMENT DETAILS MODAL */}
      <AnimatePresence>
        {selectedAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#00875A]">Appointment Information</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1E3A8A]">
                    {selectedAppointment.patientName || selectedAppointment.name || 'Patient Details'}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Phone Number</p>
                    <p className="font-bold text-[#1E3A8A] mt-0.5">{selectedAppointment.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Department</p>
                    <p className="font-bold text-[#1E3A8A] mt-0.5">{selectedAppointment.department || selectedAppointment.service || 'General'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="col-span-2">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Email</p>
                    <p className="font-bold text-[#1E3A8A] mt-0.5 break-all">{selectedAppointment.email || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="col-span-2">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Doctor</p>
                    <p className="font-bold text-[#1E3A8A] mt-0.5">{selectedAppointment.doctor || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Session Type</p>
                    <p className="font-bold text-[#1E3A8A] mt-0.5">{selectedAppointment.sessionType || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Location</p>
                    <p className="font-bold text-[#1E3A8A] mt-0.5">{selectedAppointment.location || 'N/A'}</p>
                  </div>
                  {safeHttps(selectedAppointment.meetLink) && (
                    <div className="col-span-2 pt-3 border-t border-slate-200">
                      <p className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-[#00875A]" /> Google Meet Link
                      </p>
                      <p className="text-xs font-semibold text-[#1E3A8A] mt-1 break-all">{selectedAppointment.meetLink}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <a
                          href={selectedAppointment.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#00875A] hover:bg-[#065f46] hover:-translate-y-0.5 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md"
                        >
                          <Video className="w-4 h-4" /> Join Meeting
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            try {
                              navigator.clipboard.writeText(selectedAppointment.meetLink);
                              pushToast({ type: 'success', title: 'Meet link copied', message: 'You can paste it anywhere.' });
                            } catch {
                              /* clipboard allow na ho */
                            }
                          }}
                          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                        >
                          <Copy className="w-4 h-4" /> Copy Link
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Scheduled Date</p>
                    <p className="font-bold text-[#1E3A8A] mt-0.5">{selectedAppointment.date || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Scheduled Time</p>
                    <p className="font-bold text-[#1E3A8A] mt-0.5">{selectedAppointment.time || 'N/A'}</p>
                  </div>
                </div>

                {selectedAppointment.createdAt && (
                  <p className="text-[11px] text-slate-400">
                    Booked on: {new Date(selectedAppointment.createdAt).toLocaleString()}
                  </p>
                )}

                {selectedAppointment.message && (
                  <div className="space-y-1 pt-2">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Additional Notes / Message</p>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 text-xs leading-relaxed">
                      {selectedAppointment.message}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Update Status</label>
                  <select
                    value={selectedAppointment.status || 'Pending'}
                    onChange={(e) => handleStatusChange(selectedAppointment, e.target.value)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer transition-colors ${STATUS_STYLES[selectedAppointment.status || 'Pending']}`}
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <DeleteIconButton onClick={() => setConfirmState({ kind: 'appointment', item: selectedAppointment })} label="Delete appointment" />
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="ml-auto bg-[#1E3A8A] hover:bg-[#00875A] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONTACT MESSAGE MODAL */}
      <AnimatePresence>
        {selectedContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#DC2626]">Contact Inquiry</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1E3A8A]">
                    {selectedContact.name || 'Anonymous Sender'}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Email Address</p>
                    <p className="font-bold text-[#1E3A8A] mt-0.5 truncate">{selectedContact.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Phone Number</p>
                    <p className="font-bold text-[#1E3A8A] mt-0.5">{selectedContact.phone || 'N/A'}</p>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Full Message</p>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 text-xs leading-relaxed max-h-40 overflow-y-auto">
                    {selectedContact.message || 'No message provided'}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <DeleteIconButton onClick={() => setConfirmState({ kind: 'contact', item: selectedContact })} label="Delete message" />
                <button
                  onClick={() => setSelectedContact(null)}
                  className="ml-auto bg-[#1E3A8A] hover:bg-[#00875A] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REVIEW: ADD MODAL */}
      <AnimatePresence>
        {showAddReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.form
              onSubmit={handleSaveReview}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-xl font-extrabold text-[#1E3A8A]" style={{ marginBottom: 0 }}>
                  Add a Review
                </h4>
                <button type="button" onClick={() => setShowAddReview(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                Only add a review that a patient or parent really gave you (for example on WhatsApp or Google) and who allowed you to publish it. Do not write fake reviews.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Name</label>
                  <input
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    placeholder="e.g. Ayesha K."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Service</label>
                  <select
                    value={reviewForm.service}
                    onChange={(e) => setReviewForm({ ...reviewForm, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#00875A]"
                  >
                    <option value="">Select (optional)</option>
                    {REVIEW_SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button type="button" key={n} onClick={() => setReviewForm({ ...reviewForm, rating: n })} className="hover:scale-125 transition-transform">
                      <Star className={`w-7 h-7 ${n <= reviewForm.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Title (optional)</label>
                <input
                  value={reviewForm.title}
                  maxLength={100}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Review</label>
                <textarea
                  required
                  rows={4}
                  maxLength={800}
                  value={reviewForm.message}
                  onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/20"
                />
              </div>

              {reviewFormError && <p className="text-sm text-rose-600">{reviewFormError}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAddReview(false)} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reviewSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#00875A] text-white text-xs font-bold shadow-md disabled:opacity-60"
                >
                  {reviewSaving && <Loader2 className="w-4 h-4 animate-spin" />} Save & Publish
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* LOGOUT CONFIRMATION MODAL */}
      <AnimatePresence>
        {logoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 sm:p-8 text-center space-y-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#DC2626] flex items-center justify-center mx-auto shadow-inner">
                <LogOut className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl font-extrabold text-[#1E3A8A]">
                  Confirm Logout
                </h3>
                <p className="text-xs text-slate-500">
                  Are you sure you want to end your administrative session?
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setLogoutModalOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-[#1E3A8A] hover:bg-[#DC2626] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        appointments={appointments}
        contacts={contacts}
        reviews={reviews}
        careers={careers}
        onPick={handlePalettePick}
      />

      {/* TOASTS / CONFIRM / SESSION POPUPS */}
      <ToastStack toasts={toasts} onDismiss={dismissToast} />

      <ConfirmDialog
        open={!!confirmState}
        title={
          confirmState && confirmState.kind === 'appointment'
            ? 'Delete this appointment?'
            : confirmState && confirmState.kind === 'career'
            ? 'Delete this application?'
            : confirmState && confirmState.kind === 'review'
            ? 'Delete this review?'
            : 'Delete this message?'
        }
        message={
          confirmState
            ? confirmState.kind === 'appointment'
              ? `${confirmState.item.patientName || 'This'} booking${confirmState.item.date ? ` on ${confirmState.item.date}` : ''} will be permanently removed. This cannot be undone.`
              : confirmState.kind === 'career'
              ? `The application from ${`${confirmState.item.name || ''} ${confirmState.item.lastName || ''}`.trim() || 'this candidate'} and their uploaded CV will be permanently removed. This cannot be undone.`
              : confirmState.kind === 'review'
              ? `The review from ${confirmState.item.name || 'this person'} will be permanently removed. This cannot be undone.`
              : `The message from ${confirmState.item.name || 'this sender'} will be permanently removed. This cannot be undone.`
            : ''
        }
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => !deleting && setConfirmState(null)}
      />

      <SessionGuard
        idleMs={5 * 60 * 1000}
        warnMs={60 * 1000}
        onExpire={handleSessionExpired}
        onLogin={goToLogin}
        onLogoutNow={handleLogout}
      />
    </div>
  );
}