import { useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from '../../config/api';

/* ------------------------------------------------------------------ */
/*  CONFIG                                                             */
/* ------------------------------------------------------------------ */
// Applications aapke apne backend par jati hain aur Admin Dashboard > Careers mein nazar aati hain.
const SUBMIT_URL = `${API_BASE_URL}/api/careers`;

const NAVY = '#1c296b';
const NAVY_DARK = '#121b4a';
const ACCENT = '#f5a623';

const ROLES = [
  'Speech & Language Therapist',
  'Behavior Therapist (ABA)',
  'Occupational Therapist',
  'Pediatric Physiotherapist',
  'Play & Sensory Therapist',
  'Daycare Caregiver',
  'Specialist Doctor',
  'Front Desk / Admin Officer',
];

const COUNTRY_CODES = [
  { code: '+92', label: '🇵🇰 +92' },
  { code: '+91', label: '🇮🇳 +91' },
  { code: '+971', label: '🇦🇪 +971' },
  { code: '+966', label: '🇸🇦 +966' },
  { code: '+974', label: '🇶🇦 +974' },
  { code: '+968', label: '🇴🇲 +968' },
  { code: '+965', label: '🇰🇼 +965' },
  { code: '+973', label: '🇧🇭 +973' },
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+61', label: '🇦🇺 +61' },
  { code: '+49', label: '🇩🇪 +49' },
  { code: '+90', label: '🇹🇷 +90' },
  { code: '+86', label: '🇨🇳 +86' },
];

const EMPTY_FORM = {
  name: '',
  lastName: '',
  email: '',
  countryCode: '+92',
  phone: '',
  degree: '',
  age: '',
  gender: '',
  job: '',
  experience: '',
  website: '', // chhupi hui anti-spam field (insan ise nahi bharta)
};

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 placeholder-slate-400 outline-none transition-all duration-300 focus:border-[#1c296b] focus:ring-4 focus:ring-[#1c296b]/10 hover:border-slate-300';
const labelCls = 'mb-1.5 block text-sm font-semibold text-slate-700';

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Career() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [cv, setCv] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);
  const formRef = useRef(null);

  /* ---------- Apply Now -> scroll to form ---------- */
  // stopPropagation: App.jsx ka GlobalScrollToTop link click par page ko top par bhej deta hai,
  // isliye yahan event ko wahan tak pohanchne nahi dete.
  const scrollToForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  /* ---------- SEO (no extra package needed) ---------- */
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Careers at REX Medical Complex | Therapy Jobs in Lahore';

    const setMeta = (name, content, attr = 'name') => {
      let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const desc =
      'Join REX Medical Complex in Allama Iqbal Town, Lahore. Apply for speech therapist, ABA behavior therapist, occupational therapist, physiotherapist and daycare jobs.';
    setMeta('description', desc);
    setMeta('og:title', 'Careers at REX Medical Complex | Therapy Jobs in Lahore', 'property');
    setMeta('og:description', desc, 'property');
    setMeta('og:url', 'https://rexmedcomplex.com/career', 'property');

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://rexmedcomplex.com/career');

    return () => {
      document.title = prevTitle;
    };
  }, []);

  /* ---------- Form logic ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  // Phone: sirf digits, aur shuruaat ka 0 hata do (0300... -> 300...)
  const handlePhone = (e) => {
    let digits = e.target.value.replace(/\D/g, '');
    if (digits.startsWith('0')) digits = digits.replace(/^0+/, '');
    setForm((f) => ({ ...f, phone: digits.slice(0, 12) }));
    if (errors.phone) setErrors((er) => ({ ...er, phone: '' }));
  };

  const pickFile = (file) => {
    if (!file) return;
    const okTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!okTypes.includes(file.type)) {
      setErrors((er) => ({ ...er, cv: 'Please upload a PDF or Word file.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((er) => ({ ...er, cv: 'File size must be under 5 MB.' }));
      return;
    }
    setCv(file);
    setErrors((er) => ({ ...er, cv: '' }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = 'Please enter your first name.';
    if (!form.lastName.trim()) er.lastName = 'Please enter your last name.';
    if (!form.email.trim()) er.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      er.email = 'Please enter a valid email address.';

    if (!form.phone) er.phone = 'Please enter your phone number.';
    else if (form.countryCode === '+92' && form.phone.length !== 10)
      er.phone = 'Enter 10 digits after +92 (e.g. 3001234567).';
    else if (form.phone.length < 6) er.phone = 'Please enter a valid phone number.';

    if (!form.degree.trim()) er.degree = 'Please enter your degree.';
    if (!form.age || Number(form.age) < 18 || Number(form.age) > 70)
      er.age = 'Please enter a valid age (18–70).';
    if (!form.gender) er.gender = 'Please select your gender.';
    if (!form.job) er.job = 'Please select the job you are applying for.';
    if (!form.experience.trim()) er.experience = 'Please enter your experience.';
    if (!cv) er.cv = 'Please upload your CV.';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return; // double click se do dafa application na jaye
    if (!validate()) return;
    setStatus('sending');
    setServerError('');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k !== 'countryCode' && k !== 'phone') data.append(k, v);
      });
      data.append('phone', `${form.countryCode}${form.phone}`);
      data.append('cv', cv);

      const res = await fetch(SUBMIT_URL, { method: 'POST', body: data });
      if (!res.ok) {
        let message = '';
        try {
          message = (await res.json()).message || '';
        } catch {
          /* server ne JSON nahi bheja */
        }
        console.error('[career] submit failed:', res.status, res.statusText);
        const err = new Error(message || `Request failed (${res.status})`);
        err.fromServer = Boolean(message);
        err.status = res.status;
        throw err;
      }
      setStatus('success');
      setForm(EMPTY_FORM);
      setCv(null);
    } catch (err) {
      console.error('[career] submit error:', err);
      let msg;
      if (err.fromServer) msg = err.message;
      else if (err.status === 413) msg = 'Your CV file is too large. Please upload a file under 5 MB.';
      else if (err.status) msg = `Something went wrong (error ${err.status}). Please try again or contact us on WhatsApp.`;
      else msg = 'Could not reach the server. Please check your internet connection and try again, or contact us on WhatsApp.';
      setServerError(msg);
      setStatus('error');
    }
  };

  const ErrorMsg = ({ name }) =>
    errors[name] ? <p className="mt-1.5 text-xs font-medium text-red-500">{errors[name]}</p> : null;

  /* ---------------------------------------------------------------- */
  return (
    <main className="overflow-x-hidden bg-slate-50">
      {/* Local keyframes */}
      <style>{`
        @keyframes floatSlow { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(20px,-24px) scale(1.08) } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(30px) } to { opacity:1; transform: translateY(0) } }
        @keyframes popIn { 0% { transform: scale(.6); opacity:0 } 100% { transform: scale(1); opacity:1 } }
        .anim-fadeup { animation: fadeUp .9s ease both }
        .anim-float-slow { animation: floatSlow 9s ease-in-out infinite }
      `}</style>

      {/* ========================== HERO ========================== */}
      <section
        className="relative overflow-hidden pt-28 pb-10 text-center text-white sm:pt-32 sm:pb-12"
        style={{ background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY} 60%, #26378a 100%)` }}
      >
        {/* subtle dotted pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />

        <div className="relative mx-auto max-w-4xl px-5">
          <p
            className="anim-fadeup text-xs font-semibold uppercase tracking-[0.25em] sm:text-sm"
            style={{ color: ACCENT }}
          >
            Your Trusted Therapy Center
          </p>

          <h1
            className="anim-fadeup mt-3 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
            style={{ animationDelay: '.1s' }}
          >
            Careers at REX Medical Complex
          </h1>

          <div
            className="anim-fadeup mx-auto mt-4 h-1 w-16 rounded-full"
            style={{ background: ACCENT, animationDelay: '.2s' }}
          />

          <p
            className="anim-fadeup mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base"
            style={{ animationDelay: '.3s' }}
          >
            Join our team of experts in Lahore. We are looking for caring and skilled professionals
            to provide child therapy, developmental support and expert clinical care.
          </p>

          <div className="anim-fadeup mt-6" style={{ animationDelay: '.4s' }}>
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-block rounded-full px-8 py-3 font-bold text-[#121b4a] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              style={{ background: ACCENT }}
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* ========================== APPLICATION FORM ========================== */}
      <section id="application" ref={formRef} className="relative py-16 sm:py-20" style={{ scrollMarginTop: 90 }}>
        <div className="absolute inset-0 -z-0" style={{ background: `linear-gradient(180deg, #f8fafc 0%, ${NAVY}0d 100%)` }} />
        <div className="relative mx-auto max-w-3xl px-5">
          <Reveal className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Job Application</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl" style={{ color: NAVY }}>
              Apply to Join REX Medical Complex
            </h2>
            <p className="mt-4 text-slate-600">
              Fill in the form below and upload your CV. Our team will contact shortlisted candidates.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-100">
              <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${NAVY}, #2e3f9e, ${ACCENT})` }} />

              {status === 'success' ? (
                <div className="px-8 py-16 text-center">
                  <div
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-4xl text-white"
                    style={{ background: '#16a34a', animation: 'popIn .5s ease both' }}
                  >
                    ✓
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold" style={{ color: NAVY }}>Application Submitted!</h3>
                  <p className="mx-auto mt-3 max-w-md text-slate-600">
                    Thank you for applying to REX Medical Complex. Our team will review your application and contact you if you are shortlisted.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 rounded-full px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
                    style={{ background: NAVY }}
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6 p-6 sm:p-10">
                  {/* Anti-spam honeypot: screen par nazar nahi aata */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                  />
                  {/* Name + Last Name */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelCls}>Name</label>
                      <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="First name" className={inputCls} />
                      <ErrorMsg name="name" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelCls}>Last Name</label>
                      <input id="lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange} placeholder="Last name" className={inputCls} />
                      <ErrorMsg name="lastName" />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelCls}>Email</label>
                      <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputCls} />
                      <ErrorMsg name="email" />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelCls}>Phone Number</label>
                      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 focus-within:border-[#1c296b] focus-within:ring-4 focus-within:ring-[#1c296b]/10">
                        <select
                          name="countryCode"
                          value={form.countryCode}
                          onChange={handleChange}
                          aria-label="Country code"
                          className="w-[104px] shrink-0 cursor-pointer border-r border-slate-200 bg-slate-50 px-2 py-3.5 text-sm font-medium text-slate-700 outline-none"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>{c.label}</option>
                          ))}
                        </select>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          value={form.phone}
                          onChange={handlePhone}
                          placeholder="3001234567"
                          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-slate-800 placeholder-slate-400 outline-none"
                        />
                      </div>
                      <ErrorMsg name="phone" />
                    </div>
                  </div>

                  {/* Degree */}
                  <div>
                    <label htmlFor="degree" className={labelCls}>Degree</label>
                    <input id="degree" name="degree" type="text" value={form.degree} onChange={handleChange} placeholder="e.g. DPT, BS Speech Therapy, MBBS" className={inputCls} />
                    <ErrorMsg name="degree" />
                  </div>

                  {/* Age + Gender */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="age" className={labelCls}>Age</label>
                      <input id="age" name="age" type="number" min="18" max="70" value={form.age} onChange={handleChange} placeholder="Your age" className={inputCls} />
                      <ErrorMsg name="age" />
                    </div>
                    <div>
                      <label className={labelCls}>Gender</label>
                      <div className="flex gap-3">
                        {['Male', 'Female'].map((g) => (
                          <label
                            key={g}
                            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3.5 font-medium transition-all duration-300 ${
                              form.gender === g
                                ? 'border-[#1c296b] bg-[#1c296b] text-white shadow-md'
                                : 'border-slate-200 text-slate-700 hover:border-[#1c296b]/50'
                            }`}
                          >
                            <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} className="sr-only" />
                            {g}
                          </label>
                        ))}
                      </div>
                      <ErrorMsg name="gender" />
                    </div>
                  </div>

                  {/* Job applied for */}
                  <div>
                    <label htmlFor="job" className={labelCls}>Job Applied For</label>
                    <select id="job" name="job" value={form.job} onChange={handleChange} className={inputCls}>
                      <option value="">Select a position</option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                    <ErrorMsg name="job" />
                  </div>

                  {/* Experience */}
                  <div>
                    <label htmlFor="experience" className={labelCls}>Experience</label>
                    <input id="experience" name="experience" type="text" value={form.experience} onChange={handleChange} placeholder="e.g. 2 years, or Fresh graduate" className={inputCls} />
                    <ErrorMsg name="experience" />
                  </div>

                  {/* Upload CV */}
                  <div>
                    <label className={labelCls}>Upload CV</label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files[0]); }}
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all duration-300 ${
                        dragging ? 'scale-[1.02] border-[#1c296b] bg-[#1c296b]/5' : 'border-slate-300 hover:border-[#1c296b] hover:bg-slate-50'
                      }`}
                    >
                      <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => pickFile(e.target.files[0])} />
                      <span className="text-4xl">{cv ? '📄' : '☁️'}</span>
                      {cv ? (
                        <>
                          <p className="mt-2 font-semibold" style={{ color: NAVY }}>{cv.name}</p>
                          <p className="text-xs text-slate-500">{(cv.size / 1024).toFixed(0)} KB · Click to change</p>
                        </>
                      ) : (
                        <>
                          <p className="mt-2 font-semibold text-slate-700">Click to upload or drag &amp; drop</p>
                          <p className="text-xs text-slate-500">PDF, DOC or DOCX (max 5 MB)</p>
                        </>
                      )}
                    </div>
                    <ErrorMsg name="cv" />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      {serverError || 'Something went wrong. Please try again or contact us on WhatsApp.'}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="relative w-full overflow-hidden rounded-xl py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70"
                    style={{ background: `linear-gradient(90deg, ${NAVY}, #2e3f9e)` }}
                  >
                    {status === 'sending' ? 'Submitting…' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================== CONTACT STRIP ========================== */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-12 text-white sm:px-14"
            style={{ background: `linear-gradient(120deg, ${NAVY_DARK}, ${NAVY})` }}
          >
            <div className="anim-float-slow absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-extrabold sm:text-3xl">Questions About Working With Us?</h2>
                <p className="mt-3 text-white/80">
                  Visit us at 91 A, College Block, Allama Iqbal Town, Lahore, or reach out and our team will be happy to help.
                </p>
                <p className="mt-2 text-sm text-white/70">Working days: Monday – Friday · Saturday &amp; Sunday closed</p>
              </div>
              <div className="flex flex-wrap gap-4 md:justify-end">
                <a
                  href="https://wa.me/923276680954"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-7 py-3 font-bold text-[#121b4a] transition-transform hover:scale-105"
                  style={{ background: ACCENT }}
                >
                  WhatsApp 0327 6680954
                </a>
                <a
                  href="mailto:info@rexmedcomplex.com"
                  className="rounded-full border-2 border-white/40 px-7 py-3 font-semibold transition-all hover:bg-white hover:text-[#1c296b]"
                >
                  info@rexmedcomplex.com
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}