import React from 'react';
import { motion } from 'framer-motion';
import conditionsImg from '../assets/conditions.png';
import { 
  ArrowRight, 
  PhoneCall, 
  Sparkles, 
  Calendar 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Conditions() {
  // Left and Right List Items
  const leftConditions = [
    "Autism Spectrum Disorder (ASD)",
    "Speech & Language Delay",
    "Developmental Delay",
    "Behavioral Challenges",
    "Social Communication Difficulties"
  ];

  const rightConditions = [
    "ADHD",
    "Down Syndrome",
    "Learning Difficulties",
    "Sensory Processing Difficulties",
    "Intellectual & Neurodevelopmental Disorders"
  ];

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* ================= SECTION 1: TOP HEADER & HERO ================= */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[#1c296b] font-bold text-xs uppercase tracking-[0.3em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-4 border border-teal-100 shadow-sm">
            Your Trusted Therapy Center
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-900 tracking-tight mb-4">
            Conditions We Support
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Children receive personalized support for communication, learning, behavior, sensory, and developmental challenges through compassionate, evidence-based therapy programs focused on confidence, growth, and everyday independence.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          {/* Book a Consultation Button */}
          <Link
            to="/book-a-free-consult"
            className="group inline-flex items-center gap-3 bg-[#1c296b] hover:bg-red-600 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>Book a Consultation</span>
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </Link>

          {/* WhatsApp Contact Badge */}
          <a
            href="https://wa.me/923244409797"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/95 hover:bg-emerald-50 text-slate-800 font-bold text-sm px-6 py-3.5 rounded-full shadow-md border border-slate-200/80 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <span>(+92) 324 440 9797</span>
          </a>
        </motion.div>
      </div>

      {/* ================= SECTION 2: DETAILS WITH IMAGE ================= */}
      <section className="max-w-7xl mx-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Text Content */}
        <motion.div 
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full inline-block mb-3 border border-teal-100">
              Personalized Support for Developmental and Learning Needs
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
              Supporting Every Child's <span className="italic font-normal text-[#1c296b]">Growth</span>
            </h2>
          </div>

          <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              Children experience developmental, behavioral, communication, and learning challenges in different ways. Early identification and structured support can help children improve confidence, communication, independence, emotional regulation, and participation in daily activities. Our multidisciplinary approach focuses on individualized care that supports meaningful developmental progress in a safe and nurturing environment.
            </p>
            <p>
              We provide comprehensive support for children with Autism Spectrum Disorder (ASD), ADHD, Speech & Language Delays, Down Syndrome, Developmental Delays, Learning Difficulties, Behavioral Challenges, Sensory Processing Difficulties, Social Communication Difficulties, and Intellectual & Neurodevelopmental Disorders through evidence-based therapy, educational support, and family-centered intervention programs.
            </p>
          </div>

          <div className="pt-4">
            <Link
              to="/book-a-free-consult"
              className="group inline-flex items-center gap-3 bg-[#1c296b] hover:bg-red-600 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Book a Consultation</span>
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Right Image Container */}
        <motion.div 
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-5 relative flex justify-center"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white max-w-md w-full group">
            <img
              src={conditionsImg}
              alt="Child Therapy and Growth Support"
              className="w-full h-[480px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
          </div>
        </motion.div>

      </section>

      {/* ================= SECTION 3: CONDITIONS LIST GRID ================= */}
      <div className="max-w-5xl mx-auto pt-16">
        
        {/* Conditions Section Header */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#1c296b] font-bold text-xs uppercase tracking-[0.3em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
            Specialized Support For Specific Challenges
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
            Conditions We Treat
          </h2>
        </motion.div>

        {/* Two-Column Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 relative mb-16">
          
          {/* Center Divider Line (Desktop Only) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-slate-200/80 -translate-x-1/2" />

          {/* Left Column Conditions */}
          <div className="space-y-4">
            {leftConditions.map((condition, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 group hover:border-[#1c296b]/30 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1c296b] group-hover:text-white transition-colors">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-medium text-slate-800 text-sm sm:text-base group-hover:text-[#1c296b] transition-colors">
                  {condition}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right Column Conditions */}
          <div className="space-y-4">
            {rightConditions.map((condition, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 group hover:border-[#1c296b]/30 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1c296b] group-hover:text-white transition-colors">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-medium text-slate-800 text-sm sm:text-base group-hover:text-[#1c296b] transition-colors">
                  {condition}
                </span>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom Booking Appointment Call-To-Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center pb-10"
        >
          <Link
            to="/book-a-free-consult"
            className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-red-600 text-white font-bold text-base px-9 py-4 rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <Calendar className="w-5 h-5 text-teal-300 group-hover:text-white transition-colors" />
            <span>Book Appointment</span>
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </Link>
        </motion.div>

      </div>

    </div>
  );
}