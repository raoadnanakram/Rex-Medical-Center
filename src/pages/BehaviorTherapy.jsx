import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone, Award, ShieldCheck, HeartHandshake, Sparkles, Activity } from 'lucide-react';
import abaHeroImg from '../assets/ABATherapy.jpg';



export default function BehaviorTherapy() {
  const keyFocusAreas = [
    { title: "Functional Communication", desc: "Expressing needs effectively to lower frustration." },
    { title: "Social Connections", desc: "Turn-taking, peer engagement, and reading social cues." },
    { title: "Daily Living Skills", desc: "Personal hygiene, dressing, and routine management." },
    { title: "Behavioral Self-Regulation", desc: "Developing positive, functional coping strategies." },
    { title: "School Readiness", desc: "Focus, task completion, and multi-step direction following." }
  ];

  const benefitsList = [
    "Non-verbal communication or speech delays",
    "Difficulty interacting with peers or making eye contact",
    "Frequent tantrums, frustration, or repetitive behaviors",
    "Challenges with daily routines and attention span"
  ];

  const whyChooseRex = [
    { title: "Play-Based Reinforcement", desc: "Dynamic, motivation-driven sessions that keep learning positive and engaging." },
    { title: "Family-Centered Approach", desc: "Caregiver guidance to ensure smooth progress and consistency at home." },
    { title: "Integrated Multidisciplinary Care", desc: "Seamless coordination with our Speech Pathology, Occupational Therapy, Physiotherapy, and Specialist Doctors." }
  ];

  const abaJourney = [
    { step: "01", title: "Initial Assessment", desc: "Evaluating baseline strengths, goals, and skill gaps." },
    { step: "02", title: "Individualized Plan (BIP)", desc: "Designing a customized Behavior Intervention Plan." },
    { step: "03", title: "1-on-1 Direct Therapy", desc: "Structured, play-based positive reinforcement sessions." },
    { step: "04", title: "Parent Guidance", desc: "Equipping families with practical home strategies." },
    { step: "05", title: "Data Tracking & Review", desc: "Continuous monitoring and updating of target goals." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }} 
          className="text-center max-w-4xl mx-auto relative space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#1c296b] font-bold text-xs uppercase tracking-[0.25em] shadow-sm">
            <Award className="w-4 h-4 text-teal-600" />
            REX Medical Complex Center of Excellence
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-slate-900 tracking-tight">
            Applied Behavior Analysis <span className="italic font-serif text-teal-700">(ABA) Therapy</span>
          </h1>

          <p className="text-teal-900 font-bold uppercase tracking-widest text-xs sm:text-sm">
            Building Bridges. Fostering Independence. Empowering Every Child.
          </p>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            At REX Medical Complex, our evidence-based ABA therapy program helps children build functional communication, positive social skills, and everyday independence through personalized, play-infused support.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link 
              to="/book-consult" 
              className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Book ABA Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/923276680954" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white px-6 py-4 rounded-full text-slate-800 text-xs font-bold shadow-md hover:bg-emerald-50 hover:text-emerald-700 transition-all border border-slate-200"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Quick WhatsApp Inquiry</span>
            </a>
          </div>
        </motion.div>

        {/* What Is ABA Therapy Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60"
        >
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
              What Is ABA Therapy?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Applied Behavior Analysis (ABA) is a scientifically proven framework focused on understanding behavior and learning. We help children acquire vital life skills while safely reducing challenging behaviors.
            </p>
            <h3 className="font-serif text-2xl font-bold text-slate-900 pt-2">Key Focus Areas:</h3>
            <div className="space-y-3">
              {keyFocusAreas.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-teal-100/60 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{item.title}</h4>
                    <p className="text-slate-600 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 relative h-80 sm:h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-white p-2 border border-teal-100/60 flex items-center justify-center">
            <img 
              src={abaHeroImg} 
              alt="ABA Therapy session at REX Medical Complex" 
              className="w-full h-full object-cover object-center rounded-3xl transform hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </motion.div>

        {/* Who May Benefit Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-[#1c296b] to-[#28387a] text-white rounded-[3rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-3xl mb-10 relative z-10 space-y-4">
            <span className="text-teal-300 font-bold text-xs uppercase tracking-[0.3em] bg-white/10 px-4 py-1.5 rounded-full inline-block">
              Candidacy & Support
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              Who May Benefit?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Our ABA program supports children with Autism Spectrum Disorder (ASD), ADHD, developmental delays, or behavioral challenges who experience:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            {benefitsList.map((benefit, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-100 text-xs sm:text-sm font-medium leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose REX Medical Complex */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              Excellence in Clinical Care
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Why Choose REX Medical Complex?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseRex.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-teal-100/60 space-y-3 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm border border-teal-100 mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our ABA Therapy Journey (Roadmap) */}
        <div className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              Step-by-Step Pathway
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Our ABA Therapy Journey
            </h2>
            <p className="text-slate-600 text-sm mt-2">Structured progression tailored for lasting milestone growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {abaJourney.map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-slate-50 p-6 rounded-3xl border border-teal-100/60 space-y-2 shadow-xs transition-all"
              >
                <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
                  Step {step.step}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#1c296b] pt-1">{step.title}</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#1c296b] rounded-[3rem] shadow-2xl p-8 sm:p-14 text-white relative overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-teal-400 font-bold text-xs uppercase tracking-[0.3em] bg-white/10 px-4 py-1.5 rounded-full inline-block">
                Start Your Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
                Empower Your Child's Growth Today
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                Schedule a professional ABA therapy consultation at REX Medical Complex, Lahore.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link 
                to="/book-consult" 
                className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full shadow-xl transition-all transform hover:scale-105"
              >
                <span>Book ABA Consultation</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}