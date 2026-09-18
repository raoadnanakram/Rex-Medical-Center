import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, HeartHandshake, ShieldCheck, Sparkles, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Team members ke liye local JPG images import ki gayi hain (Naveed aur Usman shamil hain)
import AftabImg from '../assets/Aftab.jpg';
import NaveedImg from '../assets/Naveed.jpg';
import usmanImg from '../assets/Usman.jpg';
import AsiaImg from '../assets/Asia.jpg';
import AyazImg from '../assets/Ayaz.jpg';
import DrImg from '../assets/Dr.PNG';
import contact1Img from '../assets/contact1.jpg';

export default function AboutUs() {
  const teamMembers = [
    { name: 'Dr M. A. Aftab Bhutta', role: 'Chairman', img: AftabImg },
    { name: 'Naveed Ahmed Aftab Bhutta', role: 'Chief Executive Officer', img:NaveedImg  },
    { name: 'Usman Tariq', role: 'Administrator & Media Director', img:usmanImg }, // Usman.jpg yahan lagaya gaya hai
    { name: 'Ms. Asia Gillani', role: 'Chief Operating Officer', img:AsiaImg  }, // Naveed.jpg yahan lagaya gaya hai
    { name: 'Dr. Muhammad Ayzed', role: 'M.B.B.S, F.C.P.S. (Surgery) Fellow FCPS HPB/Liver', img:AyazImg  },
    { name: 'Dr. Abbas Aftab', role: 'M.B.B.S, F.C.P.S. (Medicine)', img:DrImg  },
  ];

  const scopeItems = [
    "Autism Spectrum Support & ABA Therapy",
    "Speech & Language Delay Interventions",
    "Sensory Integration & Motor Skills",
    "Pediatric Physiotherapy & Rehab",
    "Specialist Doctor Consultations & Assessments"
  ];

  // State to handle pause on hover for team carousel
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 overflow-hidden">
      
      {/* 1. Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-4 border border-teal-100 shadow-sm">
              Your Trusted Therapy Center
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-4">
              About Us
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Dedicated to delivering exceptional child development support, modern therapies, and clinical excellence with human kindness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Story Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/60 bg-white group"
        >
          <img 
            src={contact1Img} 
            alt="Child Therapy Session" 
            className="w-full h-[420px] sm:h-[480px] object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
            Compassionate Child Development Support
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Rex Medical Center in Lahore is a specialized child therapy and developmental support center dedicated to helping children improve communication, behavior, learning, sensory processing, and everyday life skills through evidence-based therapy services and personalized programs.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            As a multidisciplinary therapy center, we work with children experiencing developmental delays, autism spectrum disorder, speech difficulties, and sensory challenges to help every child unlock their fullest potential.
          </p>
        </motion.div>
      </section>

      {/* 3. Section: Our Mission */}
      <section className="py-16 bg-white/90 backdrop-blur-md border-y border-slate-200/60 px-4 sm:px-6 lg:px-8 mb-20 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Our Purpose</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">Our Mission & Vision</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our mission is to empower children with special developmental needs by offering world-class, multi-disciplinary therapeutic care under one roof. We strive to create an inclusive, nurturing environment where families feel supported and children achieve meaningful independence.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link to="/book-a-free-consult" className="bg-indigo-600 hover:bg-red-600 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Join Our Mission
              </Link>
            </div>
          </div>
          <div className="bg-slate-50/80 p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-1">Child-First Approach</h4>
                <p className="text-slate-600 text-sm">Every therapy session is uniquely customized around the child's natural pace and emotional comfort.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-1">Family Partnership</h4>
                <p className="text-slate-600 text-sm">We empower parents with home-guidance strategies to ensure continuous developmental progress.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: What Scope Rex Medical Center Has */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sky-600 font-bold text-xs uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">Our Clinical Scope</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-3">What Scope Rex Medical Center Offers</h2>
          <p className="text-slate-600 text-sm sm:text-base">Comprehensive developmental domains managed by our seasoned pediatric experts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scopeItems.map((scope, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60 flex items-center gap-4 transition-all hover:border-sky-400 hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-800 text-sm sm:text-base">{scope}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Section: Why Choose Rex Medical Center */}
      <section className="py-20 bg-indigo-950 text-white px-4 sm:px-6 lg:px-8 mb-20 shadow-2xl rounded-none sm:rounded-[3rem] max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/50">Excellence in Care</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 mb-3 text-white">Why Choose Rex Medical Center</h2>
            <p className="text-indigo-200 text-sm sm:text-base">We combine modern clinical infrastructure with deep empathy and proven therapeutic results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-indigo-900/50 p-8 rounded-3xl border border-indigo-800 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Family-Centered Care</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">
                We collaborate closely with parents and families, ensuring consistent guidance and emotional support at every step.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-indigo-900/50 p-8 rounded-3xl border border-indigo-800 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Evidence-Based Approach</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">
                Our clinical strategies combine modern therapeutic practices with playful, engaging sessions tailored to each child.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-indigo-900/50 p-8 rounded-3xl border border-indigo-800 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Expert Specialists</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">
                Our team consists of certified speech therapists, occupational therapists, physiotherapists, and developmental doctors.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Section: Meet Our Team (Auto-Scrolling Pause-on-Hover Carousel) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100">Our Experts</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-3">Meet Our Clinical Team</h2>
          <p className="text-slate-600 text-sm sm:text-base">Dedicated professionals committed to your child's continuous health and growth. Hover over cards to pause scrolling.</p>
        </div>

        {/* Carousel Container with Pause on Hover */}
        <div 
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            className="flex gap-8 w-max"
            animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {/* Duplicated array to create seamless infinite loop effect */}
            {[...teamMembers, ...teamMembers].map((member, idx) => (
              <div 
                key={idx}
                className="w-80 bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-md border border-slate-200/70 group flex-shrink-0 hover:border-indigo-300 transition-colors"
              >
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center space-y-2">
                  <h3 className="font-serif text-xl font-bold text-slate-900">{member.name}</h3>
                  <p className="text-indigo-600 text-sm font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA Button at Bottom */}
        <div className="text-center mt-12">
          <Link 
            to="/book-a-free-consult" 
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-red-600 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Book Consultation With Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}