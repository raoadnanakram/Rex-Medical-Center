import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Phone, Stethoscope, CheckCircle2, Calendar, MapPin, Clock } from 'lucide-react';

const BOOK_LINK = '/book-a-free-consult';

const doctorsList = [
  {
    name: "Dr. Samia",
    role: "General Physician",
    description: "Expert in routine clinical checkups, diagnostics, and patient consultations with a caring approach.",
    tags: ["MBBS", "General Checkup", "Consultation"],
    days: "Monday to Friday",
    timings: "09:00 AM - 05:00 PM",
    location: "Rex Clinic & Medical Center - Allama Iqbal Town, Lahore"
  },
  {
    name: "Dr. Abbas Aftab",
    role: "General Physician",
    description: "Providing quality healthcare services, specialized prescriptions, and health management.",
    tags: ["MBBS", "Internal Medicine", "Follow-ups"],
    days: "Monday to Friday",
    timings: "01:00 PM - 04:00 PM",
    location: "Rex Clinic & Medical Center - Allama Iqbal Town, Lahore"
  }
];

export default function SpecialistDoctors() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#1c296b] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-[3rem]">
        {/* Animated Background Blobs & Dot Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full inline-block">
              Rex Medical Complex
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-tight">
              Specialist Consultant <span className="italic text-teal-300 font-semibold">Doctors</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Consult with our experienced and fully qualified MBBS doctors at Rex Medical Complex, Lahore. Professional care and personalized treatment for you and your family.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href={BOOK_LINK}
                className="group inline-flex items-center gap-3 bg-white hover:bg-red-600 text-[#1c296b] hover:text-white font-bold text-sm px-8 py-4 rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>Book Appointment</span>
                <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>

              <a 
                href="https://wa.me/+923244409797" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold text-sm px-6 py-4 rounded-full shadow-lg transition-all"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>+92 324 4409797</span>
              </a>
            </div>
          </motion.div>

          {/* Hero Right Floating Glass Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.8 } }}
            className="lg:col-span-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
              <Stethoscope className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Expert Care by MBBS Doctors</h3>
            <ul className="space-y-3.5 text-slate-200 text-sm">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Verified Professional Qualifications</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Comprehensive Health Consultations</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Advanced Diagnostic Support</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Trusted Patient Care in Lahore</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Curved SVG Wave at Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12 text-[#FDFBF7]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,152.48,124.7,225.5,115.8Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Qualified Doctors", value: "MBBS Experts" },
            { label: "Consultation Hours", value: "Mon - Fri" },
            { label: "Patient Satisfaction", value: "99%" },
            { label: "Hospital Location", value: "Allama Iqbal Town" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-3xl shadow-xl border border-teal-100/60 text-center space-y-1 transition-all"
            >
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1c296b]">{stat.value}</h4>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SERVICES ("What we treat") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#1c296b] font-bold text-xs uppercase tracking-[0.3em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
            Clinical Scope
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight">
            What <span className="italic font-semibold text-[#1c296b]">we treat</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Fever & Infections", desc: "Comprehensive diagnosis and management of seasonal fevers and viral infections." },
            { title: "BP & Sugar Checkups", desc: "Regular monitoring and expert guidance for blood pressure and diabetes management." },
            { title: "General Health Checkup", desc: "Routine wellness evaluations to ensure active and healthy living." },
            { title: "Prescriptions & Follow-ups", desc: "Detailed medication plans and structured follow-up consultations." },
            { title: "Reports Review", desc: "Professional clinical analysis of laboratory test results and diagnostic scans." },
            { title: "Family Care", desc: "Dedicated healthcare services tailored for every member of the family." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden transition-all duration-500 hover:bg-[#1c296b] hover:text-white"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-transparent group-hover:bg-red-600 transition-colors duration-500" />
              <div className="w-12 h-12 rounded-2xl bg-teal-50 group-hover:bg-white/10 text-[#1c296b] group-hover:text-white flex items-center justify-center mb-6 transition-all duration-500 group-hover:rotate-12">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-white mb-3 transition-colors">{item.title}</h3>
              <p className="text-slate-600 group-hover:text-slate-300 text-sm leading-relaxed transition-colors">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#1c296b] font-bold text-xs uppercase tracking-[0.3em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              Simple Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              How it <span className="italic font-semibold text-[#1c296b]">works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {[
              { step: "01", title: "Choose doctor", desc: "Browse our qualified specialist doctors and select the right fit for your consultation." },
              { step: "02", title: "Select date & slot", desc: "Pick your preferred timing slot according to the doctor's availability schedule." },
              { step: "03", title: "Visit & get treated", desc: "Confirm your appointment and visit Rex Medical Complex for expert care." }
            ].map((stepItem, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="text-center space-y-4 relative group"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#1c296b] text-white font-serif font-bold text-xl flex items-center justify-center shadow-lg group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300">
                  {stepItem.step}
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900">{stepItem.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">{stepItem.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DOCTORS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#1c296b] font-bold text-xs uppercase tracking-[0.3em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
            Our Specialists
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight">
            Meet our <span className="italic font-semibold text-[#1c296b]">MBBS specialists</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {doctorsList.map((doc, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[2.5rem] shadow-xl border border-teal-100/60 overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl hover:border-teal-200"
            >
              <div>
                {/* Gradient Banner & Avatar */}
                <div className="bg-gradient-to-r from-[#1c296b] to-teal-800 p-8 relative overflow-hidden">
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full pointer-events-none" 
                  />
                  <div className="flex items-center gap-5 relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-serif font-bold text-2xl flex items-center justify-center shrink-0 shadow-lg">
                      {doc.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="space-y-1">
                      <span className="text-red-400 font-bold text-xs uppercase tracking-wider">{doc.role}</span>
                      <h3 className="font-serif text-2xl font-bold text-white">{doc.name}</h3>
                      <span className="inline-block bg-teal-500/30 text-teal-200 border border-teal-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                        MBBS Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-8 space-y-6">
                  <p className="text-slate-600 text-sm leading-relaxed">{doc.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {doc.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="bg-slate-100 hover:bg-[#1c296b] hover:text-white text-slate-700 text-xs font-bold px-3 py-1 rounded-full transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Info Box */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-700 font-semibold">
                      <Calendar className="w-4 h-4 text-[#1c296b]" />
                      <span>{doc.days}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-700 font-semibold">
                      <Clock className="w-4 h-4 text-teal-600" />
                      <span>{doc.timings}</span>
                    </div>
                    <div className="flex items-start gap-3 text-xs text-slate-700 font-semibold">
                      <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{doc.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-width Button */}
              <div className="p-8 pt-0">
                <a 
                  href={BOOK_LINK}
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#1c296b] hover:bg-red-600 text-white font-bold text-sm py-4 rounded-2xl shadow-lg transition-all duration-300 group/btn"
                >
                  <span>Book Appointment</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#1c296b] rounded-[3rem] p-10 sm:p-16 text-white text-center shadow-2xl overflow-hidden"
        >
          {/* Blurred Blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight">
              We are always here to <span className="italic font-semibold text-teal-300">help you</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Reach out to Rex Medical Complex for immediate assistance, inquiries, or appointment scheduling.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a 
                href="https://wa.me/+923244409797" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white hover:bg-red-600 text-[#1c296b] hover:text-white font-bold text-sm px-8 py-4 rounded-full shadow-xl transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>+92 324 4409797</span>
              </a>

              <a 
                href="mailto:info@rexmedcomplex.com" 
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-8 py-4 rounded-full shadow-xl transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-teal-300" />
                <span>info@rexmedcomplex.com</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}