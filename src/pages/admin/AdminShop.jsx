// src/pages/AdminShop.jsx
// Admin Dashboard ka "Shop" tab: Orders, Products aur Categories.
// AdminDashboard.jsx mein sirf <AdminShop /> lagaya gaya hai, baqi dashboard ko kuch nahi chheda gaya.
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
  Package,
  ShoppingBag,
  Tags,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Wallet,
  Clock,
  TrendingUp,
  PackageCheck
} from 'lucide-react';
import { API_URL } from '../../config';

const ORDER_STATUSES = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const PAYMENT_STATUSES = ['Unpaid', 'Paid', 'Failed', 'Refunded'];
const AGE_GROUPS = [
  { key: '1-3', label: '1-3 yrs' },
  { key: '3-5', label: '3-5 yrs' },
  { key: '5-7', label: '5-7 yrs' },
  { key: '7-10', label: '7-10 yrs' }
];
const TAGS = ['', 'Best Seller', 'New', 'Therapist Pick'];

const STATUS_STYLES = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Confirmed: 'bg-sky-50 text-sky-700 border-sky-200',
  Processing: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Shipped: 'bg-violet-50 text-violet-700 border-violet-200',
  Delivered: 'bg-emerald-50 text-[#00875A] border-emerald-200',
  Cancelled: 'bg-rose-50 text-rose-700 border-rose-200'
};
const PAY_STYLES = {
  Unpaid: 'bg-amber-50 text-amber-700 border-amber-200',
  Paid: 'bg-emerald-50 text-[#00875A] border-emerald-200',
  Failed: 'bg-rose-50 text-rose-700 border-rose-200',
  Refunded: 'bg-slate-100 text-slate-600 border-slate-200'
};
const COLOR_DOT = {
  teal: 'bg-teal-500',
  fuchsia: 'bg-fuchsia-500',
  amber: 'bg-amber-400',
  sky: 'bg-sky-500',
  rose: 'bg-rose-500',
  emerald: 'bg-emerald-500',
  indigo: 'bg-indigo-500',
  orange: 'bg-orange-500'
};
const PAY_METHOD = { cod: 'Cash on Delivery', transfer: 'Bank / Easypaisa / JazzCash', online: 'Online payment' };

const payLabel = (o) => PAY_METHOD[o.paymentMethod] || o.paymentMethod;
const money = (n) => `Rs. ${Number(n || 0).toLocaleString('en-PK')}`;
const fmtDate = (v) => {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};
const imgUrl = (p) => (p ? `${API_URL}${p}` : null);

const inputCls =
  'w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/20 transition';
const labelCls = 'text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 block';

const EMPTY_FORM = {
  name: '',
  categoryId: '',
  description: '',
  price: '',
  salePrice: '',
  stock: '10',
  age: '3-5',
  tag: '',
  emoji: '',
  isActive: true
};

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

export default function AdminShop() {
  const [view, setView] = useState('orders'); // orders | products | categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState(Object.keys(COLOR_DOT));
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, cancelled: 0, revenue: 0 });

  const toastTimer = useRef(null);
  const flash = useCallback((text, ok = true) => {
    setToast({ text, ok });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  // Token ke saath API call (JSON ya FormData dono)
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
      if (res.status === 404) throw new Error('Backend route not found (404). Backend ki nayi files upload karke cPanel Node app ko Restart karein.');
      throw new Error(`Server error (${res.status}). cPanel Node app ka stderr.log check karein.`);
    }
    return data;
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [p, o] = await Promise.all([api('/api/products/admin/all'), api('/api/orders/admin/all')]);
      setProducts(p.products || []);
      setCategories(p.categories || []);
      if (p.colors) setColors(p.colors);
      setOrders(o.orders || []);
      setStats(o.stats || {});
    } catch (e) {
      setError(
        e.message === 'Failed to fetch'
          ? 'Could not reach the server (internet ya CORS check karein).'
          : e.message.startsWith('Could not load')
          ? `${e.message} Shayad shop ke SQL tables nahi bane: phpMyAdmin mein shop_setup_8_categories.sql chalayein.`
          : e.message
      );
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    load();
  }, [load]);

  const run = async (fn, okMsg) => {
    try {
      await fn();
      if (okMsg) flash(okMsg);
      await load();
      return true;
    } catch (e) {
      flash(e.message, false);
      return false;
    }
  };

  // ============================================================ ORDERS
  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('All');
  const [openOrder, setOpenOrder] = useState(null);
  const [payRef, setPayRef] = useState('');

  const filteredOrders = useMemo(() => {
    const q = orderSearch.trim().toLowerCase();
    return orders.filter((o) => {
      if (orderFilter !== 'All' && o.status !== orderFilter) return false;
      if (!q) return true;
      return [o.orderNumber, o.customerName, o.phone, o.email, o.city].some((v) => String(v || '').toLowerCase().includes(q));
    });
  }, [orders, orderSearch, orderFilter]);

  // detail window ko taza data ke saath sync rakhta hai
  const current = openOrder ? orders.find((o) => o.id === openOrder) : null;
  useEffect(() => {
    if (current) setPayRef(current.paymentRef || '');
  }, [openOrder]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeStatus = (o, status) =>
    run(() => api(`/api/orders/admin/${o.id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }), 'Order status updated');
  const changePayment = (o, paymentStatus) =>
    run(
      () => api(`/api/orders/admin/${o.id}/payment`, { method: 'PUT', body: JSON.stringify({ paymentStatus, paymentRef: payRef }) }),
      'Payment updated'
    );

  // ============================================================ PRODUCTS
  const [productSearch, setProductSearch] = useState('');
  const [editing, setEditing] = useState(null); // null | 'new' | product
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDel, setConfirmDel] = useState(null); // { kind, item }

  const openProductForm = (p) => {
    setEditing(p || 'new');
    setImageFile(null);
    setRemoveImage(false);
    setImagePreview(p ? imgUrl(p.image) : null);
    setForm(
      p
        ? {
            name: p.name,
            categoryId: p.categoryId || '',
            description: p.description,
            price: String(p.price),
            salePrice: p.salePrice ? String(p.salePrice) : '',
            stock: String(p.stock),
            age: p.age,
            tag: p.tag || '',
            emoji: p.emoji || '',
            isActive: p.isActive
          }
        : { ...EMPTY_FORM, categoryId: categories[0] ? categories[0].id : '' }
    );
  };

  const pickImage = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) return flash('Only JPG, PNG or WEBP images are allowed.', false);
    if (f.size > 3 * 1024 * 1024) return flash('Image is too large (max 3 MB).', false);
    setImageFile(f);
    setRemoveImage(false);
    setImagePreview(URL.createObjectURL(f));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, typeof v === 'boolean' ? String(v) : v));
    if (imageFile) fd.append('image', imageFile);
    if (removeImage && !imageFile) fd.append('removeImage', 'true');
    const isNew = editing === 'new';
    const ok = await run(
      () => api(isNew ? '/api/products' : `/api/products/${editing.id}`, { method: isNew ? 'POST' : 'PUT', body: fd }),
      isNew ? 'Product added' : 'Product updated'
    );
    setSaving(false);
    if (ok) setEditing(null);
  };

  const filteredProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    return products.filter((p) => !q || p.name.toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q));
  }, [products, productSearch]);

  // ============================================================ CATEGORIES
  const [catForm, setCatForm] = useState(null); // null | { id?, name, color }

  const saveCategory = async (e) => {
    e.preventDefault();
    const isNew = !catForm.id;
    const ok = await run(
      () =>
        api(isNew ? '/api/products/admin/categories' : `/api/products/admin/categories/${catForm.id}`, {
          method: isNew ? 'POST' : 'PUT',
          body: JSON.stringify({ name: catForm.name, color: catForm.color })
        }),
      isNew ? 'Category added' : 'Category updated'
    );
    if (ok) setCatForm(null);
  };

  const doDelete = async () => {
    const { kind, item } = confirmDel;
    const path = kind === 'product' ? `/api/products/${item.id}` : `/api/products/admin/categories/${item.id}`;
    await run(() => api(path, { method: 'DELETE' }), kind === 'product' ? 'Product deleted' : 'Category deleted');
    setConfirmDel(null);
  };

  // ============================================================ UI
  const subTabs = [
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: stats.pending },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Tags }
  ];

  const statCards = [
    { label: 'Total Orders', value: stats.total || 0, icon: ShoppingBag, tone: 'text-[#1E3A8A] bg-blue-50' },
    { label: 'Verified Revenue', value: money(stats.revenue), icon: TrendingUp, tone: 'text-[#00875A] bg-emerald-50' },
    { label: 'Pending Orders', value: stats.pending || 0, icon: Clock, tone: 'text-amber-600 bg-amber-50' },
    { label: 'Completed Orders', value: stats.completed || 0, icon: PackageCheck, tone: 'text-violet-600 bg-violet-50' }
  ];

  return (
    <div className="space-y-6">
      {/* sub tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {subTabs.map((t) => {
            const Icon = t.icon;
            const active = view === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setView(t.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  active ? 'bg-[#1E3A8A] text-white shadow' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" /> {t.label}
                {t.badge > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${active ? 'bg-white text-[#1E3A8A]' : 'bg-rose-500 text-white'}`}>{t.badge}</span>
                )}
              </button>
            );
          })}
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-4 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> <span>{error}</span>
        </div>
      )}

      {loading && !orders.length && !products.length ? (
        <div className="flex justify-center py-20 text-[#00875A]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <>
          {/* ================= ORDERS ================= */}
          {view === 'orders' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.tone}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">{s.value}</div>
                      <div className="text-xs text-slate-500 font-semibold mt-0.5">{s.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-3 border-b border-slate-100">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      placeholder="Search order no., name, phone, email, city..."
                      className={`${inputCls} pl-10`}
                    />
                  </div>
                  <select value={orderFilter} onChange={(e) => setOrderFilter(e.target.value)} className={`${inputCls} sm:w-48 cursor-pointer`}>
                    <option value="All">All statuses</option>
                    {ORDER_STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="text-center py-16 text-slate-500 text-sm">
                    <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                    {orders.length ? 'No orders match your search.' : 'No orders yet. New orders will appear here automatically.'}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50">
                          <th className="px-5 py-3">Order</th>
                          <th className="px-5 py-3">Customer</th>
                          <th className="px-5 py-3">Total</th>
                          <th className="px-5 py-3">Payment</th>
                          <th className="px-5 py-3">Status</th>
                          <th className="px-5 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((o) => (
                          <tr key={o.id} className="border-t border-slate-100 hover:bg-slate-50/70">
                            <td className="px-5 py-4">
                              <div className="font-bold text-[#1E3A8A]">{o.orderNumber}</div>
                              <div className="text-[11px] text-slate-400">{fmtDate(o.createdAt)}</div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="font-semibold text-slate-900">{o.customerName}</div>
                              <div className="text-[11px] text-slate-500">{o.phone} · {o.deliveryMethod === 'pickup' ? 'Self pickup' : o.city}</div>
                            </td>
                            <td className="px-5 py-4 font-bold">{money(o.total)}</td>
                            <td className="px-5 py-4">
                              <Badge className={PAY_STYLES[o.paymentStatus]}>{o.paymentStatus}</Badge>
                              <div className="text-[10px] text-slate-400 mt-1">{payLabel(o)}</div>
                            </td>
                            <td className="px-5 py-4">
                              <Badge className={STATUS_STYLES[o.status]}>{o.status}</Badge>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={() => setOpenOrder(o.id)}
                                className="px-4 py-2 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:bg-[#162C5A] cursor-pointer"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= PRODUCTS ================= */}
          {view === 'products' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-3 border-b border-slate-100">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input value={productSearch} onChange={(e) => setProductSearch(e.target.value)} placeholder="Search products..." className={`${inputCls} pl-10`} />
                </div>
                <button
                  onClick={() => openProductForm(null)}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00875A] hover:bg-[#006e49] text-white text-sm font-bold cursor-pointer shadow"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">
                  <Package className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                  {products.length ? 'No products match your search.' : 'No products yet. Click "Add Product" to create the first one.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 sm:p-5">
                  {filteredProducts.map((p) => {
                    const onSale = p.salePrice && p.salePrice < p.price;
                    return (
                      <div key={p.id} className={`rounded-2xl border p-4 flex gap-4 ${p.isActive ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-70'}`}>
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-3xl overflow-hidden flex-shrink-0">
                          {p.image ? <img src={imgUrl(p.image)} alt={p.name} className="w-full h-full object-cover" /> : p.emoji || '🧸'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-sm text-slate-900 truncate">{p.name}</div>
                          <div className="text-[11px] text-slate-500 truncate">{p.category || 'No category'}</div>
                          <div className="mt-1 text-sm font-black text-[#1E3A8A]">
                            {money(onSale ? p.salePrice : p.price)}
                            {onSale && <span className="ml-2 text-xs font-medium text-slate-400 line-through">{money(p.price)}</span>}
                          </div>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            <Badge className={p.stock > 0 ? 'bg-emerald-50 text-[#00875A] border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}>
                              {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                            </Badge>
                            {!p.isActive && <Badge className="bg-slate-100 text-slate-600 border-slate-200">Hidden</Badge>}
                          </div>
                          <div className="mt-3 flex gap-2">
                            <button onClick={() => openProductForm(p)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#1E3A8A] text-xs font-bold hover:bg-blue-100 cursor-pointer">
                              <Pencil className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button onClick={() => setConfirmDel({ kind: 'product', item: p })} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 cursor-pointer">
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================= CATEGORIES ================= */}
          {view === 'categories' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
                <p className="text-sm text-slate-500">Store ki categories. Rang customers ko category card par dikhta hai.</p>
                <button
                  onClick={() => setCatForm({ name: '', color: colors[0] || 'teal' })}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00875A] hover:bg-[#006e49] text-white text-sm font-bold cursor-pointer shadow"
                >
                  <Plus className="w-4 h-4" /> Add Category
                </button>
              </div>
              {categories.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">No categories yet.</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {categories.map((c) => (
                    <div key={c.id} className="flex items-center gap-4 px-5 py-4">
                      <span className={`w-4 h-4 rounded-full ${COLOR_DOT[c.color] || 'bg-slate-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-slate-900 truncate">{c.name}</div>
                        <div className="text-[11px] text-slate-500">{c.count} product(s)</div>
                      </div>
                      <button onClick={() => setCatForm({ id: c.id, name: c.name, color: c.color })} className="p-2 rounded-lg bg-blue-50 text-[#1E3A8A] hover:bg-blue-100 cursor-pointer" aria-label="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => setConfirmDel({ kind: 'category', item: c })} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer" aria-label="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ================= ORDER DETAIL ================= */}
      <AnimatePresence>
        {current && (
          <Modal title={`Order ${current.orderNumber}`} onClose={() => setOpenOrder(null)} wide>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={STATUS_STYLES[current.status]}>{current.status}</Badge>
                <Badge className={PAY_STYLES[current.paymentStatus]}>Payment: {current.paymentStatus}</Badge>
                {current.deliveryMethod === 'pickup' && <Badge className="bg-teal-50 text-teal-700 border-teal-200">Self Pickup</Badge>}
                <span className="text-xs text-slate-400">{fmtDate(current.createdAt)}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Customer</div>
                  <div className="font-bold text-slate-900">{current.customerName}</div>
                  <div className="flex items-center gap-2 text-slate-600"><Phone className="w-4 h-4" /> <a href={`tel:${current.phone}`} className="hover:underline">{current.phone}</a></div>
                  {current.email && <div className="flex items-center gap-2 text-slate-600 break-all"><Mail className="w-4 h-4 flex-shrink-0" /> {current.email}</div>}
                  <div className="flex items-start gap-2 text-slate-600"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {current.deliveryMethod === 'pickup' ? (
                    <span className="font-semibold text-emerald-700">Self pickup from clinic (no delivery charges)</span>
                  ) : (
                    <span>{current.address}, {current.city}</span>
                  )}</div>
                  {current.notes && <div className="text-xs text-slate-500 bg-white border border-slate-200 rounded-xl p-3">Note: {current.notes}</div>}
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Payment</div>
                  <div className="flex items-center gap-2 text-slate-700"><Wallet className="w-4 h-4" /> {payLabel(current)}</div>
                  {current.paymentProvider && <div className="text-xs text-slate-500">Provider: {current.paymentProvider}</div>}
                  <label className={labelCls}>Transaction / reference ID</label>
                  <input value={payRef} onChange={(e) => setPayRef(e.target.value)} placeholder="e.g. Easypaisa TID" className={inputCls} />
                  <div className="flex flex-wrap gap-2 pt-1">
                    {PAYMENT_STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => changePayment(current, s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer transition ${
                          current.paymentStatus === s ? PAY_STYLES[s] : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {s === 'Paid' ? 'Mark Paid' : s}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400">"Paid" tab hi lagayein jab paisa aapke account/wallet mein aa jaye.</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                    <tr><th className="text-left px-4 py-2.5">Product</th><th className="px-4 py-2.5">Qty</th><th className="text-right px-4 py-2.5">Amount</th></tr>
                  </thead>
                  <tbody>
                    {current.items.map((i, idx) => (
                      <tr key={idx} className="border-t border-slate-100">
                        <td className="px-4 py-3">{i.name}<div className="text-[11px] text-slate-400">{money(i.price)} each</div></td>
                        <td className="px-4 py-3 text-center">{i.quantity}</td>
                        <td className="px-4 py-3 text-right font-semibold">{money(i.price * i.quantity)}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-slate-100 text-slate-500"><td colSpan="2" className="px-4 py-2 text-right">Subtotal</td><td className="px-4 py-2 text-right">{money(current.subtotal)}</td></tr>
                    <tr className="text-slate-500"><td colSpan="2" className="px-4 py-2 text-right">Shipping</td><td className="px-4 py-2 text-right">{current.shipping ? money(current.shipping) : 'Free'}</td></tr>
                    <tr className="border-t border-slate-200 font-black"><td colSpan="2" className="px-4 py-3 text-right">Total</td><td className="px-4 py-3 text-right text-[#1E3A8A]">{money(current.total)}</td></tr>
                  </tbody>
                </table>
              </div>

              <div>
                <label className={labelCls}>Order status</label>
                <div className="flex flex-wrap gap-2">
                  {ORDER_STATUSES.map((s) => (
                    <button
                      key={s}
                      disabled={current.status === 'Cancelled' && s !== 'Cancelled'}
                      onClick={() => changeStatus(current, s)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer transition disabled:opacity-40 disabled:cursor-not-allowed ${
                        current.status === s ? STATUS_STYLES[s] : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Order cancel karne par products ka stock wapas add ho jata hai.</p>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* ================= PRODUCT FORM ================= */}
      <AnimatePresence>
        {editing && (
          <Modal title={editing === 'new' ? 'Add Product' : 'Edit Product'} onClose={() => setEditing(null)} wide>
            <form onSubmit={saveProduct} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className={labelCls}>Product image</label>
                  <label className="relative block aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#00875A] bg-slate-50 cursor-pointer overflow-hidden">
                    {imagePreview && !removeImage ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-3">
                        <ImagePlus className="w-8 h-8 mb-2" /> Click to upload<br />JPG / PNG / WEBP, max 3 MB
                      </div>
                    )}
                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={pickImage} className="hidden" />
                  </label>
                  {imagePreview && !removeImage && (
                    <button
                      type="button"
                      onClick={() => {
                        setRemoveImage(true);
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="mt-2 text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Remove image
                    </button>
                  )}
                </div>

                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Product name *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Category</label>
                    <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className={`${inputCls} cursor-pointer`}>
                      <option value="">No category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Child's age</label>
                    <select value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className={`${inputCls} cursor-pointer`}>
                      {[...AGE_GROUPS, ...(form.age === '5+' ? [{ key: '5+', label: '5+ yrs' }] : [])].map((a) => (
                        <option key={a.key} value={a.key}>{a.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Price (Rs.) *</label>
                    <input required type="number" min="1" step="1" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Sale price (optional)</label>
                    <input type="number" min="1" step="1" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} placeholder="Lower than price" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Stock quantity *</label>
                    <input required type="number" min="0" step="1" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Badge</label>
                    <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={`${inputCls} cursor-pointer`}>
                      {TAGS.map((t) => (
                        <option key={t} value={t}>{t || 'None'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelCls}>Description</label>
                <textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div>
                  <label className={labelCls}>Emoji (jab image na ho)</label>
                  <input maxLength={8} value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} placeholder="🧸" className={inputCls} />
                </div>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-[#00875A]" />
                  <span className="text-sm font-semibold text-slate-700">Visible in store</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setEditing(null)} className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">Cancel</button>
                <button disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00875A] hover:bg-[#006e49] text-white text-sm font-bold cursor-pointer disabled:opacity-60">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} Save Product
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* ================= CATEGORY FORM ================= */}
      <AnimatePresence>
        {catForm && (
          <Modal title={catForm.id ? 'Edit Category' : 'Add Category'} onClose={() => setCatForm(null)}>
            <form onSubmit={saveCategory} className="space-y-5">
              <div>
                <label className={labelCls}>Category name *</label>
                <input required autoFocus value={catForm.name} onChange={(e) => setCatForm({ ...catForm, name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Colour</label>
                <div className="flex flex-wrap gap-3">
                  {colors.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setCatForm({ ...catForm, color: c })}
                      aria-label={c}
                      className={`w-9 h-9 rounded-full cursor-pointer ${COLOR_DOT[c] || 'bg-slate-400'} ${catForm.color === c ? 'ring-4 ring-offset-2 ring-[#1E3A8A]/40' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setCatForm(null)} className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">Cancel</button>
                <button className="px-6 py-3 rounded-xl bg-[#00875A] hover:bg-[#006e49] text-white text-sm font-bold cursor-pointer">Save</button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* ================= DELETE CONFIRM ================= */}
      <AnimatePresence>
        {confirmDel && (
          <Modal title={`Delete ${confirmDel.kind}?`} onClose={() => setConfirmDel(null)}>
            <p className="text-sm text-slate-600 mb-6">
              <strong>{confirmDel.item.name}</strong> hamesha ke liye delete ho jayega.
              {confirmDel.kind === 'product' && ' Purane orders mein iska naam aur price mehfooz rahegi.'}
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmDel(null)} className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button onClick={doDelete} className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold cursor-pointer">Delete</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold flex items-center gap-2 max-w-[90vw] ${
              toast.ok ? 'bg-[#1E3A8A] text-white' : 'bg-rose-600 text-white'
            }`}
          >
            {toast.ok ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />} {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}