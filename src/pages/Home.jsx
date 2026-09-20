import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, HeartHandshake, DollarSign, Smile, Target, Stethoscope, Activity, Award, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero-banner.jpg';
import physiotherapyImg from '../assets/Physiotherapy.jpg';
import occupationalImg from '../assets/OccupationalTherapy.jpg';
import speechImg from '../assets/SpeechlanguageTherapy.jpg';
import abaImg from '../assets/ABATherapy.jpg';
// Team members ke liye local JPG images import ki gayi hain (Naveed aur Usman shamil hain)
import AftabImg from '../assets/Aftab.jpg';
import usmanImg from '../assets/Usman.jpg';
import naveedImg from '../assets/Naveed.jpg';
import AsiaImg from '../assets/Asia.jpg';
import AyazImg from '../assets/Ayaz.jpg';
import DrImg from '../assets/Dr.PNG';
import contact1Img from '../assets/contact1.jpg';

const dynamicWords = ["trusted", "expert", "experienced"];

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-[#271E38] text-white overflow-hidden rounded-none sm:rounded-[2.5rem] my-0 sm:my-6 shadow-xl border-y sm:border border-white/5">
      <div className="w-full min-h-[600px] lg:min-h-[680px] grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Left Content Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 p-8 sm:p-12 lg:pl-20 lg:pr-10 z-20 flex flex-col justify-center"
        >
          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight mb-6"
          >
            Your{" "}
            <span className="inline-inline-block text-teal-400 italic font-semibold px-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={dynamicWords[currentWordIndex]}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {dynamicWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            child therapists
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed mb-10 max-w-md font-medium"
          >
            Professional child therapy and developmental support designed for growth, communication, learning, and independence.
          </motion.p>

          {/* Key Stats Counter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 mb-10 text-left"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">4000+</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">children supported</p>
            </div>
            <div className="border-l border-white/10 pl-4">
              <h3 className="text-sm sm:text-base font-semibold text-white">Expert Team</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">qualified therapists</p>
            </div>
            <div className="border-l border-white/10 pl-4">
              <h3 className="text-sm sm:text-base font-semibold text-white">Personalized Care</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">child-focused support</p>
            </div>
          </motion.div>

          {/* Animated Shimmer CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a
              href="/book-a-free-consult" 
              className="relative overflow-hidden inline-flex items-center gap-4 bg-[#EAF7F3] text-[#1E252B] font-semibold text-sm px-7 py-3.5 rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-emerald-400/20 group"
            >
              <span className="absolute top-0 -left-full w-full h-full bg-white/40 transform -skew-x-12 group-hover:left-full transition-all duration-700 ease-in-out" />
              <span className="relative z-10">Start Therapy Today</span>
              <span className="relative z-10 w-8 h-8 rounded-full bg-[#271E38] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Aligned Image Side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lg:col-span-6 relative h-full min-h-[400px] lg:min-h-[680px] overflow-hidden shadow-[-10px_0_25px_rgba(0,0,0,0.25)]"
        >
          <img
            src={heroImg}
            alt="Child Therapy Session"
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#271E38] via-[#271E38]/20 to-transparent hidden lg:block w-1/3 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#271E38] via-transparent to-transparent lg:hidden h-1/2 bottom-0 pointer-events-none" />

          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-8 right-8 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/50 hidden sm:flex items-center gap-2.5 text-xs font-bold text-slate-800"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Child Sessions
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-3">
                Welcome To Our Center
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-3">
                Welcome to REX Medical Complex <br className="hidden sm:inline" />
                Allama Iqbal Town Lahore!
              </h2>
              <p className="text-base sm:text-lg font-medium text-slate-700 italic">
                Make A Difference In A Child's Life, Build An Inclusive Community, And Grow As A Person Too!
              </p>
            </div>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Every child deserves a chance to thrive. Autism, Down syndrome, ADHD, dyslexia, or physical differences shouldn't stand in the way. If you've been searching for a special needs therapy centre near me in Lahore, REX Medical Complex Allama , a video Town Lahore provides personalized therapy and support to help children with special needs grow, learn, and reach their full potential, while building a more inclusive community for everyone.
              </p>
              <p>
                Our team of experienced therapists, educators, and medical professionals works hand-in-hand with families to build personalized treatment plans that address each child's specific needs. Whether you're looking for child therapy near me, an autism centre near me, or occupational therapy near me, our centres across Lahore make expert care easy to reach from your neighbourhood. We believe progress happens not just in the clinic, but through a supportive community one where parents, caregivers, and specialists work together toward shared goals.
              </p>
            </div>

            {/* Button with #162C5A background, Red hover, and /about link */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-medium bg-[#162C5A] hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>Learn More</span>
                <i className="fa-solid fa-arrow-right text-sm"></i>
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Unsplash Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-slate-200 border border-slate-100 max-w-md w-full">
              <img
                src={contact1Img}
                alt="Child Therapy and Care at Rehab Care"
                className="w-full h-[500px] object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

{/* Mission Banner Section */}
const MissionBannerSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-400 text-white overflow-hidden my-6 shadow-xl rounded-none sm:rounded-[2.5rem]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm uppercase tracking-widest font-bold text-teal-100 mb-4"
        >
          OUR MISSION
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal leading-snug tracking-tight mb-10 max-w-4xl mx-auto"
        >
          We help people communicate at their best, by delivering the most <span className="italic font-semibold">convenient</span>, <span className="italic font-semibold">effective</span> and <span className="italic font-semibold">affordable</span> speech therapy.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
           <div className="hidden md:flex items-center">
                      <Link 
                        to="/book-a-free-consult"  
                        className="relative overflow-hidden bg-[#1c296b] hover:bg-red-600 text-white text-base font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-600/40 transform hover:-translate-y-0.5 active:translate-y-0 text-center group"
                      >
                        <span className="relative z-10">Book Appointment</span>
                        <span className="absolute top-0 -left-full w-full h-full bg-white/20 transform -skew-x-12 group-hover:left-full transition-all duration-700 ease-in-out"></span>
                      </Link>
                    </div>
        </motion.div>
      </div>

      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-900/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

{/* Why Choose Section */}
const WhyChooseSection = () => {
  const reasons = [
    {
      title: "Modern, clean, and hygienic facility",
      description: "Our center is meticulously maintained to provide a safe, sanitized, and welcoming environment for every child.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />
    },
    {
      title: "Latest tools and equipment for therapy services",
      description: "Equipped with advanced therapeutic instruments and sensory technology to accelerate developmental growth.",
      icon: <Sparkles className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Comprehensive care for speech and physical therapies",
      description: "Holistic multi-disciplinary programs combining speech pathology, occupational, and physical rehab under one roof.",
      icon: <HeartHandshake className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Affordable consultation packages with specialist doctors",
      description: "Transparent pricing and flexible consultation plans ensuring expert medical guidance is accessible to all families.",
      icon: <DollarSign className="w-6 h-6 text-indigo-600" />
    },
    {
      title: "A child-friendly environment that promotes learning through play",
      description: "Interactive activity zones designed to encourage natural engagement, communication, and joyful learning.",
      icon: <Smile className="w-6 h-6 text-amber-600" />
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-3">
            EXCELLENCE IN HEALTHCARE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Why Choose <span className="text-emerald-700 italic">Rex Medical Center</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 bg-white rounded-3xl shadow-lg shadow-slate-100 border border-slate-100 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors duration-300 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

{/* Scope Section */}
const ScopeSection = () => {
  const scopePoints = [
    {
      title: "Advanced Medical Treatments",
      desc: "Providing advanced medical treatments and therapies for children and adults.",
      icon: <Activity className="w-5 h-5 text-teal-600" />
    },
    {
      title: "Specialized Therapy Services",
      desc: "Offering specialized services in speech, behavioral, and occupational therapy to support developmental and functional growth.",
      icon: <Stethoscope className="w-5 h-5 text-emerald-600" />
    },
    {
      title: "Expert Specialist Consultations",
      desc: "Ensuring personalized care with consultations from experienced specialist doctors.",
      icon: <Award className="w-5 h-5 text-blue-600" />
    },
    {
      title: "Hygienic & Welcoming Environment",
      desc: "Creating a comfortable, hygienic, and welcoming environment for all patients.",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />
    },
    {
      title: "State-of-the-Art Equipment",
      desc: "Utilizing state-of-the-art equipment and therapeutic tools to ensure the best possible outcomes.",
      icon: <Sparkles className="w-5 h-5 text-amber-600" />
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative rounded-none sm:rounded-[2.5rem] my-6 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3 py-1 rounded-full mb-3 border border-teal-800/50"
          >
            COMPREHENSIVE CARE
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white"
          >
            Scope of <span className="text-teal-400 italic">Rex Medical Center</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            At Rex Medical Center, we aim to provide holistic healthcare solutions, focusing on quality, innovation, and patient-centric care. Our clinic caters to individuals of all ages, offering a wide range of medical services to meet diverse healthcare needs. We are committed to:
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {scopePoints.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-8 bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-700/60 hover:border-teal-400/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-950/60 border border-teal-800/40 flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center gap-2 text-teal-400 text-xs font-semibold">
                <Check className="w-4 h-4" />
                <span>Core Commitment</span>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-8 bg-gradient-to-br from-teal-700 to-cyan-800 rounded-3xl border border-teal-600 transition-all duration-300 flex flex-col justify-between shadow-xl lg:col-span-2 md:col-span-2"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-teal-200 block mb-1">Our Core Goal</span>
                <p className="font-serif text-lg sm:text-xl text-white leading-relaxed">
                  "Our goal is to enhance the health and well-being of the community through high-quality, accessible, and affordable healthcare."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

{/* Services Section */}
const ServicesSection = () => {
  const services = [
  { 
    title: "ABA Therapy", 
    image: abaImg 
  },
  { 
    title: "Speech & Language Therapy", 
    image: speechImg 
  },
  { 
    title: "Occupational Therapy & Sensory", 
    image: occupationalImg 
  },
  { 
    title: "Physiotherapy", 
    image: physiotherapyImg 
  },
];

  return (
    <section className="py-24 bg-[#271E38] text-white overflow-hidden rounded-none sm:rounded-[2.5rem] my-6 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight mb-3">
            Areas of <span className="italic font-semibold text-teal-400">focus</span>
          </h2>
          <p className="text-xs sm:text-sm tracking-widest uppercase text-slate-400 font-semibold">
            SPECIALIZED CHILD DEVELOPMENT SUPPORT
          </p>
        </motion.div>

        {/* Services Cards Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {services.map((service, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ y: -8 }}
      className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 group h-[420px] flex flex-col justify-end bg-slate-900"
    >
      {/* Image with proper container height */}
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
      />

      {/* Dark Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

      {/* Title Content at Bottom */}
      <div className="relative z-10 p-6 text-center">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide leading-snug drop-shadow-md">
          {service.title}
        </h3>
      </div>
    </motion.div>
  ))}
</div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link
            to="/services"
            className="relative overflow-hidden inline-flex items-center gap-4 bg-[#EAF7F3] text-[#1E252B] font-semibold text-sm px-8 py-4 rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-emerald-400/20 group"
          >
            <span className="absolute top-0 -left-full w-full h-full bg-white/40 transform -skew-x-12 group-hover:left-full transition-all duration-700 ease-in-out" />
            <span className="relative z-10">More Services</span>
                <span className="relative z-10 w-8 h-8 rounded-full bg-[#271E38] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

{/* Conditions Section */}
const ConditionsSection = () => {
  const leftConditions = [
    "Autism Spectrum Support",
    "Sensory Integration Challenges",
    "Social Communication Skills",
    "Emotional Development"
  ];

  const rightConditions = [
    "Speech & Language Delays",
    "Behavioral Development",
    "Learning & Attention Support",
    "Daily Living Skills"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Conditions we <span className="italic font-semibold text-teal-600">support</span>
          </h2>
          <p className="text-xs sm:text-sm tracking-widest uppercase text-slate-500 font-semibold">
            COMPREHENSIVE CHILD DEVELOPMENT CARE
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 space-y-4 text-left lg:text-right"
          >
            {leftConditions.map((condition, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, x: 5 }}
                className="p-4 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-between lg:justify-end gap-3 cursor-pointer group hover:border-teal-400 transition-all duration-300"
              >
                <span className="font-medium text-slate-800 text-sm sm:text-base group-hover:text-teal-600 transition-colors">
                  {condition}
                </span>
                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex justify-center relative py-6"
          >
            <div className="absolute inset-0 rounded-full bg-teal-200/40 filter blur-2xl animate-pulse -z-10" />
            
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="Therapist consulting a child"
                className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 space-y-4 text-left"
          >
            {rightConditions.map((condition, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, x: -5 }}
                className="p-4 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center gap-3 cursor-pointer group hover:border-teal-400 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="font-medium text-slate-800 text-sm sm:text-base group-hover:text-teal-600 transition-colors">
                  {condition}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link
            to="/conditions"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium bg-[#162C5A] hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

{/* Team Carousel Section with Pause on Hover */}
const TeamCarouselSection = () => {
  const [isPaused, setIsPaused] = useState(false);

  const teamMembers = [
    {
      name: "Dr M. A. Aftab Bhutta",
      role: "Chairman",
      image: AftabImg,
      bio: "I am an ASHA board certified Speech-Language Pathologist. I graduated with B.S. in Communication Disorders from the University of Tennessee - Knoxville and my M.S. in Communication Sciences and Disorders from Western Carolina University."
    },
    {
      name: "Naveed Ahmed Aftab Bhutta",
      role: "Chief Executive Officer",
      image: naveedImg,
      bio: "Specialized in sensory integration and motor skill development. Dedicated to helping children achieve independence in their daily routines through fun and engaging therapy."
    },
    {
      name: "Usman Ahmad Bhutta",
      role: "Administrator & Media Director",
      image: usmanImg,
      bio: "Extensive experience in neuro-developmental therapy, helping children with cerebral palsy and physical differences build strength, balance, and confidence."
    },
    {
      name: "Ms. Asia Gillani",
      role: "Chief Operating Officer",
      image: AsiaImg,
      bio: "Focused on behavioral intervention, social communication building, and creating positive learning environments for children with autism spectrum disorder."
    },
    {
      name: "Dr. Muhammad Ayzed",
      role: "General Surgeon & Family Physician",
      image: AyazImg,
      bio: "Passionate about early childhood intervention, supporting families with comprehensive guidance, and fostering inclusive developmental milestones."
    },
        {
      name: "Dr. Abbas Aftab",
      role: "Family Physician",
      image: DrImg,
      bio: "Passionate about early childhood intervention, supporting families with comprehensive guidance, and fostering inclusive developmental milestones."
    }
  ];

  const duplicatedTeam = [...teamMembers, ...teamMembers];

  return (
    <section className="py-24 bg-white overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-3">
          WHO WE ARE
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-3">
          Meet Our Team
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          below are some of our 250+ therapists (Hover over cards to pause)
        </p>
      </div>

      <div 
        className="relative w-full overflow-hidden px-2 sm:px-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6 py-4"
          animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          style={{ width: "max-content" }}
        >
          {duplicatedTeam.map((member, index) => (
            <div
              key={index}
              className="relative w-[280px] sm:w-[320px] h-[450px] rounded-3xl overflow-hidden shadow-xl flex-shrink-0 group cursor-pointer"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-300" />
              
              <div className="absolute bottom-6 left-6 right-6 text-left text-white group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="font-serif text-xl font-bold">{member.name}</h3>
                <p className="text-xs text-teal-300">{member.role}</p>
              </div>

              <div className="absolute inset-0 bg-[#0d9488] p-8 text-white flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-left">
                <h3 className="font-serif text-2xl font-bold mb-4">{member.name}</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-teal-50">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

{/* Child Development Assessments Section */}
const AssessmentSection = () => {
  const assessmentPoints = [
    "Autism & Behavioral Support",
    "Sensory Integration Challenges",
    "Learning & Attention Support",
    "Speech & Communication"
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 leading-[1.15]">
              Child <span className="italic">development</span> <br />
              Assessments
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              We help families understand their child’s developmental strengths and challenges through professional evaluations and individualized therapy planning focused on communication, learning, behavior, and emotional growth.
            </p>

            <div className="pt-2">
              <Link
                to="/book-a-free-consult" 
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-white font-medium bg-[#162C5A] hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
              >
                <span>Book Child Assessment</span>
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 lg:border-l lg:border-slate-300 lg:pl-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {assessmentPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-teal-400 transition-all duration-300"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900 mt-2 flex-shrink-0" />
                  <span className="font-medium text-slate-800 text-sm sm:text-base">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

{/* Journey Steps Section */}
const JourneyStepsSection = () => {
  const steps = [
    {
      number: "1",
      title: "Initial Consultation",
      description: "Discuss your child's developmental needs, behaviors, communication, and therapy goals with our specialists."
    },
    {
      number: "2",
      title: "Child Assessment",
      description: "Our therapists evaluate communication, sensory, behavioral, learning, and social development needs."
    },
    {
      number: "3",
      title: "Personalized Therapy Plan",
      description: "We create individualized therapy programs tailored to your child's strengths and developmental goals."
    },
    {
      number: "4",
      title: "Start Therapy Sessions",
      description: "Begin structured therapy sessions focused on growth, confidence, communication, and daily life skills."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight mb-3">
            How to begin your <span className="italic font-semibold text-slate-900">child's development journey</span>
          </h2>
          <p className="text-xs sm:text-sm tracking-widest uppercase text-slate-500 font-semibold">
            YOUR PATH TO HEALING BEGINS HERE
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-teal-400 transition-all duration-300 text-center flex flex-col items-center group"
            >
              <div className="w-14 h-14 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center font-serif text-lg font-bold text-slate-900 mb-6 group-hover:bg-[#162C5A] group-hover:text-white transition-colors duration-300 relative">
                {step.number}
                <span className="absolute -top-1.5 w-0.5 h-2 bg-slate-400 rounded-full" />
                <span className="absolute -bottom-1.5 w-0.5 h-2 bg-slate-400 rounded-full" />
                <span className="absolute -left-1.5 h-0.5 w-2 bg-slate-400 rounded-full" />
                <span className="absolute -right-1.5 h-0.5 w-2 bg-slate-400 rounded-full" />
              </div>

              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link
            to="/book-a-free-consult" 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium bg-[#162C5A] hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 group"
          >
            <span>Book a consultation</span>
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

// Main Home Page Export
const Home = () => {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero section */}
      <HeroSection />
      
      {/* Container for About */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutSection />
      </div>

      {/* Mission Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MissionBannerSection />
      </div>

      {/* Why Choose Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WhyChooseSection />
      </div>

      {/* Scope of Rex Medical Center Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScopeSection />
      </div>

      {/* Services Section */}
      <ServicesSection />

      {/* Conditions Section */}
      <ConditionsSection />

      {/* Team Carousel Section */}
      <TeamCarouselSection />

      {/* Child Development Assessments Section */}
      <AssessmentSection />

      {/* Journey Steps Section */}
      <JourneyStepsSection />
    </main>
  );
};

export default Home;