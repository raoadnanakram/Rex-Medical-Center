import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Mail, CheckCircle2, Clock, MapPin, Video, Building2, CalendarDays } from 'lucide-react';

import book1Img from '../assets/Book1.jpg';
import book2Img from '../assets/Book2.jpg';
import { API_BASE_URL } from '../config/api';
import { PHONES } from '../data/business';

// ---------- Common locations ----------
const NOOR_LAHORE = "Noor Hospital (Lahore) - 18-KM Main Lahore-Kasur Road";
const REX_CLINIC = "Rex Clinic & Medical Center - Allama Iqbal Town, Lahore";
const WALI_KASUR = "Wali Hospital - Raiwind Road, Zulfiqar Town, Kasur";
const REX_PHYSIO = "Rex Medical And Physiotherapy Center - Usama Block, 299 Lahore-Kasur Road";

// ---------- Days helpers ----------
const ALL_DAYS = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
const WEEKDAYS = ["M", "Tu", "W", "Th", "F"]; 
const DAY_INDEX = { Su: 0, M: 1, Tu: 2, W: 3, Th: 4, F: 5, Sa: 6 };

// ---------- Time helpers ----------
const to12 = (h, m = 0) => {
  const ap = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  return `${String(hh).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ap}`;
};
const slots = (startHour, endHour) => {
  const out = [];
  for (let h = startHour; h < endHour; h++) out.push(to12(h));
  return out;
};

// ---------- Upcoming dates ----------
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEK_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getUpcomingDates = (days, span = 14) => {
  const allowed = days.map(d => DAY_INDEX[d]);
  const result = [];
  const today = new Date();
  for (let i = 0; i < span; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    if (allowed.includes(d.getDay())) {
      const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      result.push({
        value,
        weekday: WEEK_NAMES[d.getDay()],
        label: `${d.getDate()} ${MONTHS[d.getMonth()]}`,
        isToday: i === 0
      });
    }
  }
  return result;
};

const ONLINE_LABEL = "Online Video Consultation";

export default function BookConsult() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    doctor: '',
    location: '',
    sessionType: 'On-Clinic',
    date: '',
    timeSlot: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const departmentDoctors = {
    "Speech Therapy": [
      {
        name: "Mr. Naveed Ahmed Aftab Bhutta",
        department: "Speech & Language Pathologist",
        online: { days: ALL_DAYS, times: slots(11, 20) },
        locations: [
          { name: NOOR_LAHORE, days: ["Sa", "Su"], times: slots(10, 12) },
          { name: REX_CLINIC, days: ALL_DAYS, times: slots(11, 22) },
          { name: WALI_KASUR, days: ["Su"], times: slots(14, 17) },
          { name: REX_PHYSIO, days: ["Sa"], times: slots(9, 12) }
        ]
      },
      {
        name: "Ms. Asia Gillani",
        department: "Audiometrist (GTCTD)",
        locations: [
          { name: REX_CLINIC, days: WEEKDAYS, times: slots(9, 12) }
        ]
      },
      {
        name: "Hafiz M. Tahir Zia",
        department: "Speech & Language Pathologist",
        locations: [
          { name: REX_CLINIC, days: WEEKDAYS, times: slots(15, 20) }
        ]
      }
    ],
    "Physiotherapy": [
      {
        name: "Dr. Muhammad Ayaz",
        department: "Physiotherapy",
        locations: [
          { name: REX_CLINIC, days: WEEKDAYS, times: slots(15, 20) }
        ]
      }
    ],
    "Specialist Consultation": [
      {
        name: "Dr. Samia",
        department: "MBBS",
        locations: [
          { name: REX_CLINIC, days: WEEKDAYS, times: slots(9, 17) }
        ]
      },
      {
        name: "Dr. Abbas Aftab",
        department: "MBBS",
        locations: [
          { name: REX_CLINIC, days: WEEKDAYS, times: slots(13, 16) }
        ]
      }
    ],
    "Nutrition": [
      {
        name: "Dr. Abdur Rehman",
        department: "Nutrition",
        locations: [
          { name: REX_CLINIC, days: WEEKDAYS, times: slots(15, 19) }
        ]
      }
    ]
  };

  const availableDoctors = formData.service ? departmentDoctors[formData.service] || [] : [];
  const selectedDoctorObj = availableDoctors.find(doc => doc.name === formData.doctor);
  const hasOnline = !!(selectedDoctorObj && selectedDoctorObj.online);
  const isOnline = formData.sessionType === 'Online' && hasOnline;
  const availableLocations = selectedDoctorObj ? selectedDoctorObj.locations : [];

  const activeSchedule = !selectedDoctorObj
    ? null
    : isOnline
      ? selectedDoctorObj.online
      : availableLocations.find(loc => loc.name === formData.location) || null;

  const availableDates = activeSchedule ? getUpcomingDates(activeSchedule.days) : [];
  const availableTimes = activeSchedule && formData.date ? activeSchedule.times : [];

  const showDateStep = !!activeSchedule;
  const canSubmit = !!(formData.date && formData.timeSlot && (isOnline || formData.location));

  // Prefill from "Book with this expert" links on the Our Team page: ?expert=Name-With-Dashes&service=Category
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const expertParam = searchParams.get('expert');
    const serviceParam = searchParams.get('service');
    if (!expertParam && !serviceParam) return;

    const normalize = (str) =>
      (str || '').toLowerCase().replace(/-/g, ' ').replace(/\b(mr|mrs|ms|dr|hafiz)\.?\s/g, '').replace(/[^a-z]/g, '');
    const wanted = normalize(expertParam);

    let service = '';
    let doctor = null;
    if (wanted) {
      for (const [dept, doctors] of Object.entries(departmentDoctors)) {
        const match = doctors.find((d) => {
          const name = normalize(d.name);
          return name === wanted || name.includes(wanted) || wanted.includes(name);
        });
        if (match) {
          service = dept;
          doctor = match;
          break;
        }
      }
    }

    if (!service && serviceParam) {
      const key = serviceParam.toLowerCase();
      if (key.includes('speech')) service = 'Speech Therapy';
      else if (key.includes('physio')) service = 'Physiotherapy';
      else if (key.includes('specialist')) service = 'Specialist Consultation';
      else if (key.includes('nutrition')) service = 'Nutrition';
    }
    // Experts without a booking-roster entry (e.g. ABA, psychology) are kept in the message
    // so the clinic still sees who the visitor asked for.
    const expertName = (expertParam || '').replace(/-/g, ' ').trim();
    const serviceName = (serviceParam || '').replace(/-/g, ' ').trim();
    const note = !doctor && expertName
      ? `I'd like to book with ${expertName}${serviceName ? ` (${serviceName})` : ''}.`
      : '';
    if (!service && !note) return;

    // Runs once after hydration so the prerendered HTML (no query string) still matches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData((prev) => ({
      ...prev,
      service: service || prev.service,
      doctor: doctor ? doctor.name : '',
      location: doctor && doctor.locations.length === 1 ? doctor.locations[0].name : '',
      message: note && !prev.message ? note : prev.message,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleDepartmentChange = (e) => {
    setFormData({
      ...formData,
      service: e.target.value,
      doctor: '',
      location: '',
      sessionType: 'On-Clinic',
      date: '',
      timeSlot: ''
    });
  };

  const handleDoctorChange = (e) => {
    const doc = availableDoctors.find(d => d.name === e.target.value);
    setFormData({
      ...formData,
      doctor: e.target.value,
      location: doc && doc.locations.length === 1 ? doc.locations[0].name : '',
      sessionType: 'On-Clinic',
      date: '',
      timeSlot: ''
    });
  };

  const handleSessionTypeChange = (type) => {
    const singleLoc = selectedDoctorObj && selectedDoctorObj.locations.length === 1
      ? selectedDoctorObj.locations[0].name
      : '';
    setFormData({
      ...formData,
      sessionType: type,
      location: type === 'Online' ? ONLINE_LABEL : singleLoc,
      date: '',
      timeSlot: ''
    });
  };

  const handleLocationChange = (e) => {
    setFormData({
      ...formData,
      location: e.target.value,
      date: '',
      timeSlot: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/forms/appointment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: `${formData.firstName} ${formData.lastName}`.trim(),
          phone: formData.phone,
          department: formData.service,
          doctor: formData.doctor,
          location: isOnline ? ONLINE_LABEL : formData.location,
          sessionType: formData.sessionType,
          date: formData.date,
          time: formData.timeSlot,
          message: formData.message
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(`${data.message || 'Something went wrong.'} You can also call ${PHONES.main.display} or WhatsApp ${PHONES.whatsapp.display} to book.`);
      }
    } catch (err) {
      console.error('Network Error:', err);
      setError(`We couldn't send your request. Please call ${PHONES.main.display} or WhatsApp ${PHONES.whatsapp.display} to book.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[#1c296b] font-bold text-xs uppercase tracking-[0.3em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100 shadow-sm">
            Your Trusted Therapy Center
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-900 tracking-tight mb-3">
            Book a consultation
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm uppercase tracking-widest font-medium">
            NOOR HOSPITAL KASUR & REX MEDICAL COMPLEX LAHORE
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-teal-100/60 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative overflow-hidden mb-20"
      >
        
        <div className="lg:col-span-6 space-y-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 leading-tight mb-3">
              Ready to take the <span className="italic font-semibold text-[#1c296b]">first step</span>?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Choose your preferred doctor, hospital location (Kasur or Lahore), and select either an on-clinic visit or an online session.
            </p>
          </div>

          <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 group">
            <img 
              src={book1Img} 
              alt="Consultation Session" 
              className="w-full h-[400px] sm:h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
              <a 
                href={PHONES.whatsapp.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-5 py-3 rounded-full text-slate-800 text-xs font-bold shadow-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{PHONES.whatsapp.label}: {PHONES.whatsapp.display}</span>
              </a>

              <a 
                href="mailto:info@rexmedcomplex.com" 
                className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-5 py-3 rounded-full text-slate-800 text-xs font-bold shadow-lg hover:bg-blue-50 hover:text-[#1c296b] transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#1c296b]" />
                <span>info@rexmedcomplex.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-50/80 p-6 sm:p-10 rounded-3xl border border-slate-100 relative">
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">Book a session</h3>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4 border border-emerald-100"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-slate-900">Request Received!</h4>
              <p className="text-slate-600 text-sm">
                Thank you! Your <span className="font-bold text-[#1c296b]">{formData.sessionType}</span> session with <span className="font-bold">{formData.doctor}</span> at <span className="font-bold text-teal-700">{isOnline ? ONLINE_LABEL : formData.location}</span> on <span className="font-bold">{formData.date}</span> for slot <span className="font-bold">{formData.timeSlot}</span> has been requested.
              </p>
              <button 
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ ...formData, service: '', doctor: '', location: '', sessionType: 'On-Clinic', date: '', timeSlot: '' });
                }}
                className="mt-4 px-6 py-2.5 bg-[#1c296b] text-white text-xs font-bold rounded-full hover:bg-red-600 transition-colors cursor-pointer"
              >
                Book Another Session
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your name</label>
                  <input 
                    type="text" 
                    placeholder="Muhammad" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-white shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Last name</label>
                  <input 
                    type="text" 
                    placeholder="Ali" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-white shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  placeholder="your@mail.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-white shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone number</label>
                <input 
                  type="tel" 
                  placeholder="+92 300 123 4567" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-white shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Department / Service</label>
                <select 
                  value={formData.service}
                  onChange={handleDepartmentChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-white shadow-sm text-slate-700 cursor-pointer"
                >
                  <option value="">Select a department</option>
                  <option value="Speech Therapy">Speech Therapy & Pathology</option>
                  <option value="Physiotherapy">Physiotherapy</option>
                  <option value="Specialist Consultation">Specialist Doctor Consultations</option>
                  <option value="Nutrition">Nutrition</option>
                </select>
              </div>

              {formData.service && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Doctor</label>
                  <select 
                    value={formData.doctor}
                    onChange={handleDoctorChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-teal-200 focus:outline-none focus:border-[#1c296b] text-sm bg-teal-50/50 shadow-sm text-slate-700 cursor-pointer font-medium"
                  >
                    <option value="">Select available doctor</option>
                    {availableDoctors.map((doc, idx) => (
                      <option key={idx} value={doc.name}>{doc.name} — {doc.department}</option>
                    ))}
                  </select>
                </motion.div>
              )}

              {formData.doctor && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Session Type</label>
                  <div className={`grid gap-3 ${hasOnline ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    <button
                      type="button"
                      onClick={() => handleSessionTypeChange('On-Clinic')}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                        formData.sessionType === 'On-Clinic'
                          ? 'bg-[#1c296b] text-white border-[#1c296b] shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Building2 className="w-4 h-4" /> On-Clinic Session
                    </button>
                    {hasOnline && (
                      <button
                        type="button"
                        onClick={() => handleSessionTypeChange('Online')}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                          formData.sessionType === 'Online'
                            ? 'bg-[#1c296b] text-white border-[#1c296b] shadow-md'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Video className="w-4 h-4" /> Online Session
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {formData.doctor && !isOnline && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-600" /> Select Hospital / Clinic Location
                  </label>
                  <select 
                    value={formData.location}
                    onChange={handleLocationChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-white shadow-sm text-slate-700 cursor-pointer font-medium"
                  >
                    <option value="">Select location</option>
                    {availableLocations.map((loc, idx) => (
                      <option key={idx} value={loc.name}>{loc.name}</option>
                    ))}
                  </select>
                </motion.div>
              )}

              {isOnline && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-teal-600" /> Online video consultation — phone/laptop se video call hogi.
                </motion.p>
              )}

              {showDateStep && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-teal-600" /> Select Date
                  </label>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Available days: {activeSchedule.days.join(', ')}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {availableDates.map((d) => (
                      <button
                        type="button"
                        key={d.value}
                        onClick={() => setFormData({...formData, date: d.value, timeSlot: ''})}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all leading-tight ${
                          formData.date === d.value
                            ? 'bg-[#1c296b] text-white border-[#1c296b] shadow-md'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-teal-50/30'
                        }`}
                      >
                        <span className="block text-[10px] font-semibold opacity-80">{d.isToday ? 'Today' : d.weekday}</span>
                        {d.label}
                      </button>
                    ))}
                  </div>
                  {!formData.date && (
                    <p className="text-[11px] text-amber-600 font-medium">Please select a date above.</p>
                  )}
                </motion.div>
              )}

              {showDateStep && formData.date && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" /> Select Available Time Slot for {formData.doctor}
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {availableTimes.map((time, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setFormData({...formData, timeSlot: time})}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                          formData.timeSlot === time 
                            ? 'bg-[#1c296b] text-white border-[#1c296b] shadow-md' 
                            : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-teal-50/30'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {!formData.timeSlot && (
                    <p className="text-[11px] text-amber-600 font-medium">Please select a time slot above.</p>
                  )}
                </motion.div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Message (Optional)</label>
                <textarea 
                  rows="2" 
                  placeholder="Briefly share what you'd like to discuss..." 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-white shadow-sm"
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={!canSubmit}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 ${
                    canSubmit 
                      ? 'bg-[#1c296b] hover:bg-red-600 cursor-pointer transform hover:-translate-y-1' 
                      : 'bg-slate-400 cursor-not-allowed opacity-70'
                  }`}
                >
                  <span>Confirm & Submit Appointment</span>
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </span>
                </button>
              </div>

            </form>
          )}

        </div>

      </motion.div>

      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto py-16 px-6 sm:px-10 bg-white/90 backdrop-blur-md rounded-[3rem] shadow-xl border border-teal-100/60 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-10"
      >
        <div className="lg:col-span-4 rounded-3xl overflow-hidden shadow-lg h-[350px]">
          <img 
            src={book2Img} 
            alt="Medical Complex Facility" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="lg:col-span-4 text-center space-y-6 px-4">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              We are always here to help you
            </h2>
            <div className="pt-3 space-y-1">
              <h4 className="font-serif text-lg font-bold text-[#1c296b]">Noor Hospital Kasur & REX Medical Complex</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Kasur Branch & Allama Iqbal Town, Lahore, Pakistan
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a 
              href="https://www.google.com/maps/place/Rex+Medical+Center/@31.5092836,74.2948487,17z/data=!3m1!4b1!4m6!3m5!1s0x391903d7483071a3:0x2ace17feb4b38ff6!8m2!3d31.5092836!4d74.2974236!16s%2Fg%2F11ltc_yvt0?authuser=0&hl=en&entry=ttu" 
 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-red-600 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <span>Get direction</span>
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 rounded-3xl overflow-hidden shadow-lg h-[350px]">
          <img 
            src={book1Img} 
            alt="Medical Complex Facility" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </div>
      </motion.section>

    </div>
  );
}