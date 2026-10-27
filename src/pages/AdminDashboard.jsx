// src/components/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../config/api';
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
  ArrowRight,
  Calendar,
  Activity,
  Sparkles,
  Bell,
  Lock,
  Database,
  Check,
  Upload,
  Maximize2,
  FileSpreadsheet,
  Plus,
  Trash2,
} from 'lucide-react';

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

  // Appointment Status Tracking State (Local UI state map: id/index -> status)
  const [appointmentStatuses, setAppointmentStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem('rexAppointmentStatuses');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

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

  // Settings Toggles State
  const [settingsState, setSettingsState] = useState({
    emailAlerts: true,
    smsNotifications: false,
    autoRefresh: true
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // ---------------- 5 MINUTES SESSION TIMEOUT LOGIC ----------------
  useEffect(() => {
    let timeoutId;

    const handleLogoutTimeout = () => {
      localStorage.removeItem('adminToken');
      alert('Session expired due to 5 minutes of inactivity. Please login again.');
      navigate('/admin-login');
    };

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleLogoutTimeout, 5 * 60 * 1000);
    };

    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate]);

  // Check Authentication & Fetch Data
  const fetchData = async (isRefresh = false) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
      return;
    }

    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const apptRes = await fetch(`${API_BASE_URL}/api/forms/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (apptRes.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
        return;
      }
      const apptData = await apptRes.json();

      const contactRes = await fetch(`${API_BASE_URL}/api/forms/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (contactRes.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
        return;
      }
      const contactData = await contactRes.json();

      setAppointments(Array.isArray(apptData) ? apptData : apptData.appointments || []);
      setContacts(Array.isArray(contactData) ? contactData : contactData.contacts || []);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error(err);
      setError('Unable to load dashboard data. Please check the server connection and try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
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
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
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

  // Update Custom Status (Pending / Confirmed / Completed)
  const handleStatusChange = (index, newStatus) => {
    const updated = { ...appointmentStatuses, [index]: newStatus };
    setAppointmentStatuses(updated);
    localStorage.setItem('rexAppointmentStatuses', JSON.stringify(updated));
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
      (item.date || '').toLowerCase().includes(appointmentSearch.toLowerCase());

    if (!matchesSearch) return false;
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

  // Department distribution calculation
  const departmentCounts = appointments.reduce((acc, curr) => {
    const dept = curr.department || curr.service || 'General Care';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#F4F7F6] flex text-[#2D3748] font-sans overflow-x-hidden">
      
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
              { id: 'appointments', label: 'Appointments', icon: CalendarDays, badge: totalAppointments },
              { id: 'messages', label: 'Contact Messages', icon: MessageSquare, badge: totalContacts },
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
                {activeTab === 'settings' && 'Admin Portal Settings'}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                REX Medical Complex Command & Management Center
              </p>
            </div>
          </div>

          {/* HEADER RIGHT ACTIONS */}
          <div className="flex items-center gap-3 sm:gap-4">
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
                <p className="text-[10px] text-slate-500">REX Medical Complex</p>
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
                    className="relative bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#00875A] rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden"
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 backdrop-blur-3xl transform skew-x-12 pointer-events-none" />
                    
                    <div className="relative z-10 space-y-4 max-w-2xl">
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
                      </div>
                    </div>
                  </motion.div>

                  {/* STATISTICS CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      whileHover={{ y: -4 }}
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#00875A]/10 text-[#00875A] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <CalendarCheck className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-[#00875A] px-2.5 py-1 rounded-full">
                          Booked
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Appointments</h3>
                      <p className="font-serif text-3xl font-extrabold text-[#1E3A8A] mt-1">
                        {totalAppointments}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      whileHover={{ y: -4 }}
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <MessageSquare className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-[#DC2626] px-2.5 py-1 rounded-full">
                          Inbox
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Contact Messages</h3>
                      <p className="font-serif text-3xl font-extrabold text-[#1E3A8A] mt-1">
                        {totalContacts}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      whileHover={{ y: -4 }}
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Clock className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                          Today
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Today's Requests</h3>
                      <p className="font-serif text-3xl font-extrabold text-[#1E3A8A] mt-1">
                        {todayAppointmentsCount}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      whileHover={{ y: -4 }}
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Activity className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                          Live
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Dashboard Status</h3>
                      <p className="font-serif text-2xl font-extrabold text-emerald-600 mt-1 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </p>
                    </motion.div>

                  </div>

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
                          onClick={() => exportToCSV(appointments, 'rex_appointments.csv')}
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
                                <th className="py-4 px-6">Patient Name</th>
                                <th className="py-4 px-6">Phone</th>
                                <th className="py-4 px-6">Department</th>
                                <th className="py-4 px-6">Date & Time</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6">Management</th>
                                <th className="py-4 px-6 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                              {filteredAppointments.map((item, idx) => {
                                const patientName = item.patientName || item.name || 'Unnamed Patient';
                                const dateStatus = getAppointmentStatus(item.date);
                                const customStatus = appointmentStatuses[idx] || 'Pending';
                                return (
                                  <tr key={idx} className="hover:bg-[#00875A]/5 transition-colors">
                                    <td className="py-4 px-6">
                                      <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#1E3A8A] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                                          {getInitials(patientName)}
                                        </div>
                                        <span className="font-bold text-[#1E3A8A]">{patientName}</span>
                                      </div>
                                    </td>
                                    <td className="py-4 px-6 text-slate-600 font-medium">{item.phone || 'N/A'}</td>
                                    <td className="py-4 px-6">
                                      <span className="bg-slate-100 text-[#1E3A8A] font-semibold px-2.5 py-1 rounded-lg">
                                        {item.department || item.service || 'General'}
                                      </span>
                                    </td>
                                    <td className="py-4 px-6 text-slate-600">
                                      <p className="font-semibold">{item.date || 'N/A'}</p>
                                      <p className="text-[11px] text-slate-400">{item.time || ''}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                        dateStatus === 'Today' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                        dateStatus === 'Upcoming' ? 'bg-emerald-50 text-[#00875A] border border-emerald-200' :
                                        'bg-slate-100 text-slate-600'
                                      }`}>
                                        {dateStatus}
                                      </span>
                                    </td>
                                    <td className="py-4 px-6">
                                      <select
                                        value={customStatus}
                                        onChange={(e) => handleStatusChange(idx, e.target.value)}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                                          customStatus === 'Confirmed' ? 'bg-emerald-50 text-[#00875A] border-emerald-200' :
                                          customStatus === 'Completed' ? 'bg-blue-50 text-[#1E3A8A] border-blue-200' :
                                          'bg-amber-50 text-amber-700 border-amber-200'
                                        }`}
                                      >
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Completed">Completed</option>
                                      </select>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                      <button
                                        onClick={() => setSelectedAppointment(item)}
                                        className="inline-flex items-center gap-1.5 bg-[#1E3A8A] hover:bg-[#00875A] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>View</span>
                                      </button>
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
                            const customStatus = appointmentStatuses[idx] || 'Pending';
                            return (
                              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
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
                                  <p><span className="font-bold text-slate-700">Date/Time:</span> {item.date || 'N/A'} {item.time ? `@ ${item.time}` : ''}</p>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                  <select
                                    value={customStatus}
                                    onChange={(e) => handleStatusChange(idx, e.target.value)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-bold border bg-white"
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Completed">Completed</option>
                                  </select>

                                  <button
                                    onClick={() => setSelectedAppointment(item)}
                                    className="inline-flex items-center gap-1.5 bg-[#1E3A8A] text-white px-4 py-2 rounded-xl text-xs font-bold"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>View Details</span>
                                  </button>
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
                                    <button
                                      onClick={() => setSelectedContact(item)}
                                      className="inline-flex items-center gap-1.5 bg-[#1E3A8A] hover:bg-[#DC2626] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>View</span>
                                    </button>
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

                              <div className="pt-1 flex justify-end">
                                <button
                                  onClick={() => setSelectedContact(item)}
                                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#1E3A8A] text-white px-4 py-2.5 rounded-xl text-xs font-bold"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>View Message</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: SETTINGS */}
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
                              <p className="text-xs font-bold text-[#1E3A8A]">Email Notifications for New Appointments</p>
                              <p className="text-[11px] text-slate-500">Receive instant alerts whenever a patient books an appointment.</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settingsState.emailAlerts}
                            onChange={(e) => setSettingsState({ ...settingsState, emailAlerts: e.target.checked })}
                            className="w-4 h-4 text-[#00875A] rounded focus:ring-[#00875A]"
                          />
                        </label>

                        <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/75 transition-colors">
                          <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-[#1E3A8A]" />
                            <div>
                              <p className="text-xs font-bold text-[#1E3A8A]">Auto-Refresh Dashboard Data</p>
                              <p className="text-[11px] text-slate-500">Automatically sync appointments and messages upon tab focus.</p>
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
                          <p className="text-xs text-slate-600">Connected to MongoDB Atlas cluster (rex-medical-centre).</p>
                          <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                            Online & Secure
                          </span>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                          <div className="flex items-center gap-2 text-[#1E3A8A]">
                            <Lock className="w-4 h-4" />
                            <span className="font-bold text-xs">Authentication Token</span>
                          </div>
                          <p className="text-xs text-slate-600">JWT active session verified via localStorage (5-min timeout).</p>
                          <span className="inline-block bg-blue-100 text-[#1E3A8A] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                            Bearer Token Valid
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      {settingsSaved && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                          <Check className="w-4 h-4" /> Settings updated successfully!
                        </span>
                      )}
                      <button
                        onClick={() => {
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
          REX Medical Complex • Admin Dashboard
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
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Scheduled Date</p>
                    <p className="font-bold text-[#1E3A8A] mt-0.5">{selectedAppointment.date || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Scheduled Time</p>
                    <p className="font-bold text-[#1E3A8A] mt-0.5">{selectedAppointment.time || 'N/A'}</p>
                  </div>
                </div>

                {selectedAppointment.message && (
                  <div className="space-y-1 pt-2">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Additional Notes / Message</p>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 text-xs leading-relaxed">
                      {selectedAppointment.message}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="bg-[#1E3A8A] hover:bg-[#00875A] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Close
                </button>
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

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="bg-[#1E3A8A] hover:bg-[#DC2626] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
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

    </div>
  );
}