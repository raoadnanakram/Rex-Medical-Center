import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Mail, CheckCircle2 } from 'lucide-react';

// Images import kar li hain (ensure karein ke ye files aapke src/assets folder mein mojood hon)
import book1Img from '../assets/Book1.jpg';
import book2Img from '../assets/Book2.jpg';

export default function BookConsult() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Top Header Section */}
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
            YOUR TRUSTED THERAPY CENTER IN LAHORE
          </p>
        </motion.div>
      </div>

      {/* Main Container Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-teal-100/60 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative overflow-hidden mb-20"
      >
        
        {/* Left Side: Information & Visual (Book1.jpg integrated) */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 leading-tight mb-3">
              Ready to take the <span className="italic font-semibold text-[#1c296b]">first step</span>?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Change begins with a single conversation. You don't need to have all the answers right now.
            </p>
          </div>

          {/* Book1.jpg Image Container */}
          <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 group">
            <img 
              src={book1Img} 
              alt="Consultation Session" 
              className="w-full h-[400px] sm:h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
            
            {/* Floating Contact Badges */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
              <a 
                href="https://wa.me/+923244409797

" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-5 py-3 rounded-full text-slate-800 text-xs font-bold shadow-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>+92 324 4409797

</span>
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

        {/* Right Side: Booking Form */}
        <div className="lg:col-span-6 bg-slate-50/80 p-6 sm:p-10 rounded-3xl border border-slate-100 relative">
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">Book a session</h3>
          </div>

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
                Thank you for reaching out. Our scheduling team will contact you shortly to confirm your consultation time.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
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
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">What services are you interested in?</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-white shadow-sm text-slate-700 cursor-pointer"
                >
                  <option value="">Select a service</option>
                  <option value="Speech Therapy">Speech & Language Therapy</option>
                  <option value="Behavior Therapy">Behavior Therapy (ABA)</option>
                  <option value="Occupational Therapy">Occupational Therapy</option>
                  <option value="Physiotherapy">Pediatric Physiotherapy</option>
                  <option value="Specialist Consultation">Specialist Doctor Consultation</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Message</label>
                <textarea 
                  rows="3" 
                  placeholder="Briefly share what you'd like to discuss (optional)..." 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-white shadow-sm"
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-red-600 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                >
                  <span>Submit</span>
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </span>
                </button>
              </div>

            </form>
          )}

        </div>

      </motion.div>

      {/* 5. "We are always here to help you" Section (Book2.jpg integrated) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto py-16 px-6 sm:px-10 bg-white/90 backdrop-blur-md rounded-[3rem] shadow-xl border border-teal-100/60 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-10"
      >
        {/* Book2.jpg on left */}
        <div className="lg:col-span-4 rounded-3xl overflow-hidden shadow-lg h-[350px]">
          <img 
            src={book2Img} 
            alt="REX Medical Complex Facility" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Center Text & Direction Button */}
        <div className="lg:col-span-4 text-center space-y-6 px-4">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              We are always here to help you
            </h2>
            <div className="pt-3 space-y-1">
              <h4 className="font-serif text-lg font-bold text-[#1c296b]">REX Medical Complex</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                91 A, College Block, <br />Allama Iqbal Town, Lahore, Pakistan
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a 
              href="https://www.google.com/maps/place/Rex+Medical+Center/@31.5092836,74.2974236,17z/data=!3m1!4b1!4m6!3m5!1s0x391903d7483071a3:0x2ace17feb4b38ff6!8m2!3d31.5092836!4d74.2974236!16s%2Fg%2F11ltc_yvt0?authuser=0&hl=en&entry=ttu&g_ep=EgoyMDI2MDkxNS4wIKXMDSoASAFQAw%3D%3D" 
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
        {/* Right side professional clinical image */}
           <div className="lg:col-span-4 rounded-3xl overflow-hidden shadow-lg h-[350px]">
          <img 
            src={book1Img} 
            alt="REX Medical Complex Facility" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </div>
      </motion.section>

    </div>
  );
}