import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone, Award, Activity, Brain, Feather, Eye, Volume2, Apple } from 'lucide-react';
import abaHeroImg from '../assets/ABATherapy.jpg';

export default function SensoryTherapy() {
  const coreSystems = [
    { title: "Touch (Tactile)", desc: "Processing tactile inputs from skin, temperature, and texture variations." },
    { title: "Movement (Vestibular)", desc: "Vestibular system awareness governing balance, gravity, and spatial orientation." },
    { title: "Body Awareness (Proprioception)", desc: "Deep muscle and joint awareness governing body position and control." },
    { title: "Sight (Visual)", desc: "Interpreting visual stimuli, light intensity, tracking, and spatial patterns." },
    { title: "Sound (Auditory)", desc: "Processing auditory environments, pitch, and background noise levels." },
    { title: "Taste & Smell", desc: "Managing gustatory and olfactory inputs during daily feeding and experiences." }
  ];

  const whoCanBenefit = [
    "Children who become overwhelmed by certain sounds or environments",
    "Children who avoid or seek particular textures, clothes, or foods",
    "Children who have difficulty with daily transitions or sudden changes",
    "Children who struggle with body awareness, clumsiness, or balance",
    "Children who need support with attention, emotional regulation, and focus",
    "Children experiencing challenges during play, school, or daily routines"
  ];

  const whyChooseRex = [
    { title: "Play-Based Sensory Integration", desc: "Dynamic, child-led structured sessions that keep exploration positive and engaging." },
    { title: "Family-Centered Approach", desc: "Practical caregiver guidance ensuring consistency across home and school environments." },
    { title: "Integrated Multidisciplinary Care", desc: "Seamless coordination with our ABA Therapy, Speech Pathology, Physiotherapy, and Specialist Medical Team." }
  ];

  const sensoryJourney = [
    { step: "01", title: "Initial Consultation", desc: "Discussing parental observations, sensory profile, and developmental history." },
    { step: "02", title: "Sensory & Functional Assessment", desc: "Evaluating sensory processing patterns and daily functional skills." },
    { step: "03", title: "Individualized Plan", desc: "Designing customized sensory diets and environmental strategies." },
    { step: "04", title: "Structured Therapy Sessions", desc: "Engaging in play-based sensory integration activities in our specialized facility." },
    { step: "05", title: "Progress Review & Adaptation", desc: "Continuous monitoring and collaborative plan updates to celebrate milestones." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Header / Hero Section */}
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
            Sensory Integration <span className="italic font-serif text-teal-700">& Therapy</span>
          </h1>

          <p className="text-teal-900 font-bold uppercase tracking-widest text-xs sm:text-sm">
            Helping Children Feel, Focus & Flourish in Every Environment.
          </p>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            At REX Medical Complex, our sensory-focused occupational therapy helps children process environmental information comfortably, build self-regulation, and participate successfully in everyday activities.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link 
              to="/book-a-free-consult" 
              className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Book Sensory Assessment</span>
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

        {/* What Is Sensory Therapy Section with Animated Interactive Video Element */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60"
        >
          <div className="lg:col-span-6 space-y-6">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block border border-teal-100">
              Understanding Sensory Therapy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
              Bridging the Sensory Gap
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Children receive information from their surroundings through different sensory systems and may respond to sensory experiences differently. Sensory-focused occupational therapy helps children participate more comfortably and successfully in everyday activities when sensory processing differences affect function.
            </p>
            <h3 className="font-serif text-2xl font-bold text-slate-900 pt-2">Core Sensory Systems Supported:</h3>
            <div className="space-y-3">
              {coreSystems.slice(0, 3).map((item, idx) => (
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
          
          {/* Animated Video / Rich Visual Showcase Box */}
          <div className="lg:col-span-6 relative h-80 sm:h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#062B3A] p-2 border border-teal-100/60 flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#003B5C] via-[#062B3A]/80 to-transparent z-10 opacity-70 pointer-events-none" />
            
            {/* Embedded Responsive Looping Medical/Therapy Video Background */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover rounded-[2.3rem] opacity-90 transform group-hover:scale-105 transition-transform duration-700"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-child-playing-with-colorful-blocks-41270-large.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Floating Interactive Badge */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 text-[#003B5C] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00A8CD]/10 flex items-center justify-center text-[#00A8CD]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Live View</p>
                <p className="text-xs font-bold text-[#003B5C]">Specialized Sensory Gym</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* All Core Systems Grid Section */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              Sensory Processing Matrix
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Exploring the 6 Sensory Systems
            </h2>
            <p className="text-slate-600 text-sm mt-2">Targeted support for balanced neural integration and everyday ease.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreSystems.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                className="bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-teal-100/60 space-y-4 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm border border-teal-100 group-hover:bg-[#1c296b] group-hover:text-white transition-colors duration-500">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Who Can Benefit Section */}
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
              Who Can Benefit From Sensory Support?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Recognizing behavioral and sensory signs in everyday childhood environments. Every child is different; our therapists begin with an individualized assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            {whoCanBenefit.map((benefit, idx) => (
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

        {/* Our Sensory Therapy Journey (Roadmap) */}
        <div className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              Step-by-Step Pathway
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Our Sensory Therapy Journey
            </h2>
            <p className="text-slate-600 text-sm mt-2">Structured progression tailored for lasting sensory regulation and comfort.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sensoryJourney.map((step, idx) => (
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
                Schedule a professional sensory therapy consultation at REX Medical Complex, Lahore.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link 
                to="/book-a-free-consult" 
                className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full shadow-xl transition-all transform hover:scale-105"
              >
                <span>Book Sensory Assessment</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}