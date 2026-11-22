// src/pages/AdminNews.jsx
// Admin Dashboard ka "News & Events" tab: post add / edit / delete, date, description aur kai pictures.
// AdminDashboard.jsx mein sirf <AdminNews /> lagaya gaya hai.
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  RefreshCw,
  ImagePlus,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  Star,
  Images
} from 'lucide-react';
import { API_URL } from '../../config';

const MAX_IMAGES = 12;
const MAX_MB = 6;

const inputCls =
  'w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/20 transition';
const labelCls = 'text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 block';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const todayIso = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const imgSrc = (u) => (u ? `${API_URL}${u}` : '');

const EMPTY = { title: '', type: 'news', date: todayIso(), location: '', description: '', isPublished: true };

function Badge({ children, className = '' }) {
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${className}`}>{children}</span>;
}

function Modal({ title, onClose, children, wide = false }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={`relative bg-white rounded-3xl shadow-2xl w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[92vh] overflow-y-auto`}
      >
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100 rounded-t-3xl">
          <h3 className="font-serif text-xl font-extrabold text-[#1E3A8A]">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}

export default function AdminNews() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const [editing, setEditing] = useState(null); // null | 'new' | post
  const [form, setForm] = useState(EMPTY);
  const [existing, setExisting] = useState([]); // [{id,url}] purani images (tarteeb ke saath)
  const [fresh, setFresh] = useState([]); // [{file, preview}] nayi images
  const [saving, setSaving] = useState(false);
  const [confirmDel, setConfirmDel] = useState(null);

  const toastTimer = useRef(null);
  const flash = useCallback((text, ok = true) => {
    setToast({ text, ok });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const api = useCallback(async (path, options = {}) => {
    const token = localStorage.getItem('adminToken');
    const isForm = options.body instanceof FormData;
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...(isForm || !options.body ? {} : { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    });
    let data = null;
    try {
      data = await res.json();
    } catch {
      /* no body */
    }
    if (res.status === 401) throw new Error('Session expired. Please log in again.');
    if (!res.ok) {
      if (data && data.message) throw new Error(data.message);
      if (res.status === 404) throw new Error('Backend route not found (404). newsRoutes.js upload karke Node app ko Restart karein.');
      throw new Error(`Server error (${res.status}). cPanel Node app ka stderr.log check karein.`);
    }
    return data;
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const d = await api('/api/news/admin/all');
      setPosts(d.posts || []);
    } catch (e) {
      setError(
        e.message === 'Failed to fetch'
          ? 'Could not reach the server (internet ya CORS check karein).'
          : e.message.startsWith('Could not load')
          ? `${e.message} Shayad news ke SQL tables nahi bane: phpMyAdmin mein news_setup.sql chalayein.`
          : e.message
      );
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    load();
  }, [load]);

  // nayi images ke preview URLs saaf karna
  const freshRef = useRef([]);
  useEffect(() => {
    freshRef.current = fresh;
  }, [fresh]);
  useEffect(() => () => freshRef.current.forEach((f) => URL.revokeObjectURL(f.preview)), []);

  const openForm = (post) => {
    fresh.forEach((f) => URL.revokeObjectURL(f.preview));
    setFresh([]);
    setEditing(post || 'new');
    setExisting(post ? post.images : []);
    setForm(
      post
        ? { title: post.title, type: post.type, date: post.date, location: post.location, description: post.description, isPublished: post.isPublished }
        : { ...EMPTY, date: todayIso() }
    );
  };

  const closeForm = () => {
    fresh.forEach((f) => URL.revokeObjectURL(f.preview));
    setFresh([]);
    setEditing(null);
  };

  const total = existing.length + fresh.length;

  const addFiles = (e) => {
    const list = Array.from(e.target.files || []);
    e.target.value = '';
    const accepted = [];
    for (const f of list) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
        flash(`${f.name}: only JPG, PNG or WEBP allowed.`, false);
        continue;
      }
      if (f.size > MAX_MB * 1024 * 1024) {
        flash(`${f.name} is larger than ${MAX_MB} MB.`, false);
        continue;
      }
      accepted.push(f);
    }
    const room = MAX_IMAGES - total;
    if (accepted.length > room) flash(`You can add up to ${MAX_IMAGES} pictures.`, false);
    setFresh((prev) => [...prev, ...accepted.slice(0, Math.max(room, 0)).map((file) => ({ file, preview: URL.createObjectURL(file) }))]);
  };

  const moveExisting = (idx, dir) => {
    setExisting((prev) => {
      const next = [...prev];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
    });
  };
  const makeCover = (idx) => setExisting((prev) => [prev[idx], ...prev.filter((_, i) => i !== idx)]);
  const removeExisting = (idx) => setExisting((prev) => prev.filter((_, i) => i !== idx));
  const removeFresh = (idx) =>
    setFresh((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });

  const save = async (e) => {
    e.preventDefault();
    if (total < 1) return flash('Please add at least one picture.', false);
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('type', form.type);
      fd.append('date', form.date);
      fd.append('location', form.type === 'event' ? form.location : '');
      fd.append('description', form.description);
      fd.append('isPublished', String(form.isPublished));
      const isNew = editing === 'new';
      if (!isNew) fd.append('keepImages', JSON.stringify(existing.map((i) => i.id)));
      fresh.forEach((f) => fd.append('images', f.file));
      await api(isNew ? '/api/news' : `/api/news/${editing.id}`, { method: isNew ? 'POST' : 'PUT', body: fd });
      flash(isNew ? 'Post added' : 'Post updated');
      closeForm();
      await load();
    } catch (err) {
      flash(err.message, false);
    } finally {
      setSaving(false);
    }
  };

  const doDelete = async () => {
    try {
      await api(`/api/news/${confirmDel.id}`, { method: 'DELETE' });
      flash('Post deleted');
      await load();
    } catch (err) {
      flash(err.message, false);
    }
    setConfirmDel(null);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => (typeFilter === 'all' || p.type === typeFilter) && (!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)));
  }, [posts, search, typeFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-extrabold text-[#1E3A8A] flex items-center gap-2">
            <Newspaper className="w-6 h-6" /> News &amp; Events
          </h2>
          <p className="text-sm text-slate-500 mt-1">Yahan se post add karein, wo website ke News &amp; Events page par khud nazar aayegi.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button
            onClick={() => openForm(null)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00875A] hover:bg-[#006e49] text-white text-sm font-bold cursor-pointer shadow"
          >
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-4 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-3 border-b border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className={`${inputCls} pl-10`} />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={`${inputCls} sm:w-44 cursor-pointer`}>
            <option value="all">All posts</option>
            <option value="news">News</option>
            <option value="event">Events</option>
          </select>
        </div>

        {loading && !posts.length ? (
          <div className="flex justify-center py-20 text-[#00875A]">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            <Newspaper className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            {posts.length ? 'No posts match your search.' : 'No posts yet. Click "New Post" to add the first one.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 sm:p-5">
            {filtered.map((p) => (
              <div key={p.id} className={`rounded-2xl border overflow-hidden bg-white flex flex-col ${p.isPublished ? 'border-slate-200' : 'border-amber-200 opacity-80'}`}>
                <div className="relative h-40 bg-slate-100">
                  {p.images[0] && <img src={imgSrc(p.images[0].url)} alt={p.title} className="w-full h-full object-cover" />}
                  <div className="absolute top-3 left-3 bg-white/95 rounded-xl px-2.5 py-1.5 text-center shadow leading-none">
                    <div className="text-base font-black text-[#1E3A8A]">{Number(p.date.slice(8, 10))}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">{MONTHS[Number(p.date.slice(5, 7)) - 1]} {p.date.slice(0, 4)}</div>
                  </div>
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    <Images className="w-3 h-3" /> {p.images.length}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <Badge className={p.type === 'event' ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-amber-50 text-amber-700 border-amber-200'}>{p.type === 'event' ? 'Event' : 'News'}</Badge>
                    {!p.isPublished && <Badge className="bg-slate-100 text-slate-600 border-slate-200">Hidden</Badge>}
                  </div>
                  <div className="font-bold text-sm text-slate-900 line-clamp-2">{p.title}</div>
                  <div className="text-xs text-slate-500 mt-1 line-clamp-2 flex-1">{p.description}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => openForm(p)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#1E3A8A] text-xs font-bold hover:bg-blue-100 cursor-pointer">
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => setConfirmDel(p)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= POST FORM ================= */}
      <AnimatePresence>
        {editing && (
          <Modal title={editing === 'new' ? 'New Post' : 'Edit Post'} onClose={closeForm} wide>
            <form onSubmit={save} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <label className={labelCls}>Title *</label>
                  <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} maxLength={200} />
                </div>
                <div>
                  <label className={labelCls}>Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={`${inputCls} cursor-pointer`}>
                    <option value="news">News</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Date *</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={`${inputCls} pl-10`} />
                  </div>
                </div>
                {form.type === 'event' && (
                  <div>
                    <label className={labelCls}>Location (optional)</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={`${inputCls} pl-10`} maxLength={150} />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className={labelCls}>Description *</label>
                <textarea required rows="8" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Poori detail likhein. Naye paragraph ke liye Enter dabayein." className={inputCls} />
              </div>

              {/* pictures */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={`${labelCls} mb-0`}>Pictures * (pehli picture cover hogi)</label>
                  <span className="text-xs font-semibold text-slate-500">{total} / {MAX_IMAGES}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {existing.map((img, idx) => (
                    <div key={`e${img.id}`} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                      <img src={imgSrc(img.url)} alt="" className="w-full h-full object-cover" />
                      {idx === 0 && <span className="absolute top-2 left-2 bg-[#00875A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Cover</span>}
                      <button type="button" onClick={() => removeExisting(idx)} aria-label="Remove" className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 text-rose-600 flex items-center justify-center shadow cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-0 inset-x-0 bg-black/55 flex items-center justify-between px-1.5 py-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
                        <button type="button" onClick={() => moveExisting(idx, -1)} disabled={idx === 0} aria-label="Move left" className="p-1 text-white disabled:opacity-30 cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
                        {idx !== 0 && (
                          <button type="button" onClick={() => makeCover(idx)} className="flex items-center gap-1 text-[10px] font-bold text-white cursor-pointer"><Star className="w-3 h-3" /> Cover</button>
                        )}
                        <button type="button" onClick={() => moveExisting(idx, 1)} disabled={idx === existing.length - 1} aria-label="Move right" className="p-1 text-white disabled:opacity-30 cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}

                  {fresh.map((f, idx) => (
                    <div key={`n${idx}`} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-[#00875A]/50 bg-slate-100">
                      <img src={f.preview} alt="" className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">New</span>
                      <button type="button" onClick={() => removeFresh(idx)} aria-label="Remove" className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 text-rose-600 flex items-center justify-center shadow cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {total < MAX_IMAGES && (
                    <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#00875A] bg-slate-50 flex flex-col items-center justify-center text-center text-slate-400 text-xs cursor-pointer p-2">
                      <ImagePlus className="w-7 h-7 mb-1" /> Add pictures
                      <span className="text-[10px] mt-0.5">JPG / PNG / WEBP, {MAX_MB} MB tak</span>
                      <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={addFiles} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="w-4 h-4 accent-[#00875A]" />
                <span className="text-sm font-semibold text-slate-700">Publish on website (band karne par post sirf admin ko dikhegi)</span>
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeForm} className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">Cancel</button>
                <button disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00875A] hover:bg-[#006e49] text-white text-sm font-bold cursor-pointer disabled:opacity-60">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} {saving ? 'Saving...' : 'Save Post'}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* ================= DELETE CONFIRM ================= */}
      <AnimatePresence>
        {confirmDel && (
          <Modal title="Delete post?" onClose={() => setConfirmDel(null)}>
            <p className="text-sm text-slate-600 mb-6">
              <strong>{confirmDel.title}</strong> aur us ki saari pictures hamesha ke liye delete ho jayengi.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmDel(null)} className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button onClick={doDelete} className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold cursor-pointer">Delete</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold flex items-center gap-2 max-w-[90vw] ${toast.ok ? 'bg-[#1E3A8A] text-white' : 'bg-rose-600 text-white'}`}
          >
            {toast.ok ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />} {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
