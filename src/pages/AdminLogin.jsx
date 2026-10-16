// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Activity,
  LayoutDashboard
} from 'lucide-react';

const AdminLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!phone || !password) {
      setError('Please enter both phone number and password.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
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
        }, 1200);
      } else {
        setError(data.message || 'Invalid phone number or password.');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#F4F7F6] overflow-x-hidden px-4 sm:px-6 lg:px-8 py-8">
      
      {/* SOFT DECORATIVE GRADIENT BLOBS */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#00875A]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#DC2626]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* MAIN CONTAINER (SPLIT DESKTOP / CENTERED MOBILE) */}
      <div className="w-full max-w-6xl my-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10 py-6">
        
        {/* LEFT SIDE: BRANDING & FEATURES (DESKTOP) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 hidden lg:block pr-6"
        >
          <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00875A] animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#00875A]">
              REX Medical Center Portal
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl xl:text-5xl font-serif font-extrabold tracking-tight leading-tight">
              <span className="text-[#DC2626]">Welcome</span> <span className="text-[#1E3A8A]">to the</span> <br />
              <span className="text-[#00875A]">Admin Command Center</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md font-medium">
              Manage appointments, review secure inquiries, and oversee medical center operations from one unified dashboard.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#00875A]/10 text-[#00875A] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1E3A8A]">Secure Administration</h3>
                <p className="text-slate-500 text-xs">JWT token authenticated sessions with auto-timeout.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1E3A8A]">Real-Time Management</h3>
                <p className="text-slate-500 text-xs">Live tracking of patient appointments and messages.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: LOGIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-md mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Top Decorative accent bar (3 Logo Colors) */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1E3A8A] via-[#00875A] to-[#DC2626]" />

          {/* MOBILE BRANDING HEADER */}
          <div className="text-center lg:hidden mb-6 pt-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1E3A8A] text-white mb-3 shadow-md font-serif font-bold">
              REX
            </div>
            <h2 className="text-2xl font-bold text-[#1E3A8A]">REX Medical Center</h2>
            <p className="text-xs text-slate-500 font-medium">Administration Portal</p>
          </div>

          <div className="text-center mb-8 pt-2">
            <div className="hidden lg:inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1E3A8A] text-white mb-4 shadow-lg ring-4 ring-[#1E3A8A]/10 font-serif font-extrabold text-xl">
              REX
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] tracking-tight">
              Admin Login
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1.5 font-medium">
              Sign in to access your secure dashboard
            </p>
          </div>

          {/* SUCCESS MESSAGE STATE */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-[#00875A] flex-shrink-0 animate-bounce" />
                <div className="text-xs font-semibold">
                  <p>Login successful!</p>
                  <p className="text-[#00875A] font-normal">Redirecting to dashboard...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ERROR ALERT */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-rose-800 shadow-sm"
              >
                <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <p className="text-xs font-semibold leading-relaxed">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* PHONE NUMBER FIELD */}
            <div>
              <label 
                htmlFor="phone" 
                className="block text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2"
              >
                Phone Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00875A] transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <input 
                  id="phone"
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                  placeholder="Enter admin phone number"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* PASSWORD FIELD */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00875A] transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="Enter secure password"
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/20 transition-all duration-200"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#1E3A8A] transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <button 
                type="submit" 
                disabled={loading || success}
                className="w-full group relative overflow-hidden flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#00875A] text-white py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:shadow-[#00875A]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.div>

          </form>

          {/* SECURITY VISUAL INDICATOR */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-[11px] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#00875A]" />
            <span>Secure Admin Access — Authorized Personnel Only</span>
          </div>
        </motion.div>

      </div>

      {/* FOOTNOTE / BRANDING */}
      <footer className="w-full text-center py-4 z-10 text-slate-500 text-xs font-medium">
        © REX Medical Center — Admin Portal
      </footer>

    </div>
  );
};

export default AdminLogin;