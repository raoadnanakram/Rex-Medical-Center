import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Phone, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Lokale Bilder importieren
import speechImg from '../assets/SpeechlanguageTherapy.jpg';
import abaImg from '../assets/ABATherapy.jpg';
import occupationalImg from '../assets/OccupationalTherapy.jpg';
import physiotherapyImg from '../assets/Physiotherapy.jpg';
import familyImg from '../assets/family.jpg';
import consultantImg from '../assets/consultant.jpg';

export default function Services() {
  const navigate = useNavigate();

  const servicesList = [
    {
      title: "Speech & Language Therapy",
      desc: "Specialized treatment for speech and language disorders, supporting articulation, fluency, and communication growth.",
      image: speechImg,
      link: "/services/speech-therapy",
      features: ["Articulation & Pronunciation", "Language Development", "Fluency Support"]
    },
    {
      title: "Behavior Therapy (ABA)",
      desc: "Expert therapy for behavioral challenges, customized plans to encourage positive change, and early intervention care.",
      image: abaImg,
      link: "/services/behavior-therapy",
      features: ["Positive Behavior Support", "Social Skills Training", "Emotional Development"]
    },
    {
      title: "Occupational Therapy & Sensory",
      desc: "Helping individuals regain or improve daily life tasks through sensory integration and fine motor skill training.",
      image: occupationalImg,
      link: "/services/occupational-therapy",
      features: ["Sensory Processing Care", "Fine Motor Skills", "Independence Training"]
    },
    {
      title: "Pediatric Physiotherapy",
      desc: "Treatment for physical rehabilitation, strength, and mobility with modern tools for effective recovery.",
      image: physiotherapyImg,
      link: "/services/physiotherapy",
      features: ["Motor Milestone Tracking", "Strength & Balance", "Physical Rehabilitation"]
    },
    {
      title: "Specialist Doctor Consultations",
      desc: "Access experienced specialist doctors across various medical fields with affordable consultation packages.",
      image: consultantImg,
      link: "/services/specialist-consultations",
      features: ["Experienced Specialists", "Affordable Checkups", "Comprehensive Diagnosis"]
    }
  ];

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
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-900 tracking-tight mb-4">
            Our Professional Services
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Comprehensive therapeutic and medical care programs designed to support health, development, and overall well-being in a nurturing environment.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-4 mt-8"
        >
          <Link 
            to="/book-consult"
            className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-red-600 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <span>Book a Consultation</span>
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </Link>

          <a 
            href="https://wa.me/+92 324 4409-797"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-6 py-3.5 rounded-full text-slate-800 text-sm font-bold shadow-md hover:bg-emerald-50 hover:text-emerald-700 transition-all border border-slate-200"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>+(92) 324 4409-797</span>
          </a>
        </motion.div>
      </div>

      {/* Row 1: 3 Equal-Sized Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {servicesList.slice(0, 3).map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            onClick={() => navigate(service.link)}
            className="bg-white/95 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-xl border border-teal-100/60 flex flex-col justify-between group cursor-pointer"
          >
            {/* Image Box with object-contain to ensure full picture is visible */}
            <div className="relative h-60 overflow-hidden bg-white flex items-center justify-center p-3 border-b border-slate-100">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-700 ease-out rounded-2xl"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-teal-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  REX CARE
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                {service.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 bg-[#1c296b] text-white group-hover:bg-teal-700 text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all uppercase tracking-wider">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Row 2: 2 Equal-Sized Cards (Centered) */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {servicesList.slice(3, 5).map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (idx + 3) * 0.1 }}
            whileHover={{ y: -8 }}
            onClick={() => navigate(service.link)}
            className="bg-white/95 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-xl border border-teal-100/60 flex flex-col justify-between group cursor-pointer"
          >
            {/* Image Box with object-contain */}
            <div className="relative h-60 overflow-hidden bg-white flex items-center justify-center p-3 border-b border-slate-100">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-700 ease-out rounded-2xl"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-teal-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  REX CARE
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                {service.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 bg-[#1c296b] text-white group-hover:bg-teal-700 text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all uppercase tracking-wider">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* "Why families choose us" Section with family.jpg */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-teal-100/60 p-8 sm:p-12 mb-16 overflow-hidden"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 mb-2">
            Why families <span className="italic font-serif">choose us</span>
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-teal-700 font-bold">
            Personalized care that supports every child
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <ChevronRight className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-slate-900">Child-Centered Approach</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Every child receives individualized attention, personalized therapy goals, and support designed around their unique developmental needs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <ChevronRight className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-slate-900">Family Involvement</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Parents and caregivers are actively involved in therapy planning, home guidance, and progress monitoring throughout the child's journey.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <ChevronRight className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-slate-900">Goal-Oriented Programs</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our therapy sessions focus on measurable developmental progress, functional independence, communication growth, and everyday life skills.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                to="/book-consult"
                className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <span>Book a Consultation</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl bg-white p-3 border border-slate-100 flex items-center justify-center">
            <img 
              src={familyImg} 
              alt="Family therapy session at Rex Medical Center" 
              className="w-full h-full object-contain object-center rounded-2xl transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </motion.div>

    </div>
  );
} 