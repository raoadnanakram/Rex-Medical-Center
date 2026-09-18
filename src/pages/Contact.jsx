import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, Mail, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Contact images import kar li hain (ensure karein ke ye files src/assets folder mein mojood hon)
import contact1Img from '../assets/contact1.jpg';
import contact2Img from '../assets/contact2.jpg';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your appointment request has been submitted successfully.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* 1. Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[#1c296b] font-bold text-xs uppercase tracking-[0.3em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-4 border border-teal-100 shadow-sm">
            Your Trusted Therapy Center
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-900 tracking-tight mb-3">
            Contact us
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm uppercase tracking-widest font-medium">
            GET IN TOUCH WITH OUR EXPERTS IN LAHORE
          </p>
        </motion.div>
      </div>

      {/* 2. Main "How to find us" & contact1Img Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
        
        {/* Left Side: Contact Info & Address */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-6 space-y-8"
        >
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              How to find us
            </h2>
            
            <div className="space-y-3 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-slate-200/70">
              <h3 className="font-serif text-xl font-bold text-[#1c296b]">Rex Medical Centre</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                <span>91 A, College Block, Allama Iqbal Town, Lahore, Pakistan</span>
              </p>
            </div>
          </div>

          {/* Contact Numbers & Email Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href="tel:+9242111739633" 
              className="p-5 bg-white/95 rounded-2xl shadow-sm border border-slate-200/70 hover:border-[#1c296b] transition-all duration-300 flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1c296b] flex items-center justify-center group-hover:bg-[#1c296b] group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Call Us</p>
                <p className="text-sm font-bold text-slate-800">(+92) 324-440-9797</p>
              </div>
            </a>

            <a 
              href="https://wa.me/923244409797" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-5 bg-white/95 rounded-2xl shadow-sm border border-slate-200/70 hover:border-emerald-400 transition-all duration-300 flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">WhatsApp</p>
                <p className="text-sm font-bold text-slate-800">(+92) 324 440 9797</p>
              </div>
            </a>
          </div>

          <div className="p-5 bg-white/95 rounded-2xl shadow-sm border border-slate-200/70 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Email Address</p>
              <p className="text-sm font-bold text-slate-800">info@rexmedcomplex.com</p>
            </div>
          </div>

          {/* Get Direction Button */}
          <div>
            <a 
              href="https://www.google.com/maps/place/Rex+Medical+Center/@31.5092836,74.2948487,17z/data=!3m1!4b1!4m6!3m5!1s0x391903d7483071a3:0x2ace17feb4b38ff6!8m2!3d31.5092836!4d74.2974236!16s%2Fg%2F11ltc_yvt0?authuser=0&hl=en&entry=ttu&g_ep=EgoyMDI2MDkxNS4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-red-600 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <span>Get direction</span>
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
            </a>
          </div>

        </motion.div>

        {/* Right Side: contact1Img Visual */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-6 relative flex justify-center"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white w-full max-w-lg group">
            <img
              src={contact1Img}
              alt="Rex Medical Centre Consultation"
              className="w-full h-[450px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="bg-teal-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Open Now</span>
              <p className="font-serif text-xl font-bold mt-2">We are here to help your child thrive</p>
            </div>
          </div>
        </motion.div>

      </section>

      {/* 3. Shifts & Working Hours Section */}
      <section className="max-w-7xl mx-auto bg-white/95 rounded-[2.5rem] shadow-xl border border-slate-200/70 p-8 sm:p-12 mb-20 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
          
          <div className="space-y-3 pt-4 md:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1c296b] mx-auto flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">Daycare Shift</h3>
            <div className="text-slate-600 text-sm space-y-1">
              <p>09:00 AM – 12:00 PM</p>
              <p>12:00 PM – 03:00 PM</p>
            </div>
          </div>

          <div className="space-y-3 pt-6 md:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 mx-auto flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">Therapy Shift</h3>
            <div className="text-slate-600 text-sm space-y-1">
              <p className="font-medium">12:00 PM – 07:00 PM</p>
            </div>
          </div>

          <div className="space-y-3 pt-6 md:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">Working Days</h3>
            <div className="text-slate-600 text-sm space-y-1">
              <p className="font-bold text-[#1c296b]">Monday – Friday</p>
              <p className="text-xs text-slate-400">Saturday & Sunday: Closed</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. "We’d love to hear from you" Form Section with contact2Img */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-slate-200/70 p-8 sm:p-12">
        
        {/* Left Image Column with contact2Img */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 rounded-3xl overflow-hidden shadow-md"
        >
          <img 
            src={contact2Img} 
            alt="Therapy session with child" 
            className="w-full h-full min-h-[450px] object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Right Form Column */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              We’d love to hear from you
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest font-medium">
              Please feel free to get in touch at any time. We look forward to supporting you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Your name</label>
                <input 
                  type="text" 
                  placeholder="Muhammad" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-slate-50/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Last name</label>
                <input 
                  type="text" 
                  placeholder="Ali" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-slate-50/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Email</label>
              <input 
                type="email" 
                placeholder="your@mail.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-slate-50/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Phone number</label>
              <input 
                type="tel" 
                placeholder="+92 300 123 4567" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-slate-50/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">What services are you interested in?</label>
              <select 
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                required
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-slate-50/50 text-slate-700 cursor-pointer"
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
              <label className="text-xs font-semibold text-slate-600">Message</label>
              <textarea 
                rows="4" 
                placeholder="Briefly share what you'd like to discuss (optional)..." 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-slate-50/50"
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
        </motion.div>

      </section>

    </div>
  );
}