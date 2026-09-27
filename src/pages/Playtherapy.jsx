import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Phone, Award, ShieldCheck, 
  HeartHandshake, Sparkles, Activity, Brain, Smile, 
  ChevronDown, Quote, Star, Users, Compass, Volume2, Feather
} from 'lucide-react';
import abaHeroImg from '../assets/ABATherapy.jpg';

// ==========================================
// REX MEDICAL CENTER: PLAY THERAPY PAGE
// ==========================================

export default function PlayTherapy() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const focusAreas = [
    { title: "Exploration", desc: "Encouraging curiosity and safe discovery through interactive play." },
    { title: "Communication", desc: "Building verbal and non-verbal expression during shared activities." },
    { title: "Social Interaction", desc: "Fostering turn-taking, cooperation, and meaningful peer engagement." },
    { title: "Problem Solving", desc: "Developing cognitive flexibility and adaptive thinking strategies." },
    { title: "Creative Expression", desc: "Providing emotional outlets through art, storytelling, and pretend play." },
    { title: "Participation", desc: "Enhancing engagement in daily family and school routines." }
  ];

  const activityCategories = [
    {
      name: "Pretend Play",
      desc: "Using imaginative scenarios to process emotions and practice social roles.",
      img: abaHeroImg,
      alt: "Child playing with toys and engaging in pretend play",
      focus: "Emotional Expression",
      examples: ["Dollhouse roleplay", "Dress-up scenarios", "Kitchen and market games"]
    },
    {
      name: "Social Play",
      desc: "Group games and collaborative activities fostering teamwork and communication.",
      img: abaHeroImg,
      alt: "Children interacting together in a therapeutic social setting",
      focus: "Peer Connection",
      examples: ["Board games", "Cooperative building", "Interactive group games"]
    },
    {
      name: "Fine Motor Play",
      desc: "Hands-on activities like blocks and puzzles enhancing dexterity and focus.",
      img: abaHeroImg,
      alt: "Child working with building blocks and puzzles",
      focus: "Dexterity & Focus",
      examples: ["Bead threading", "Complex puzzles", "Mosaic tile designs"]
    },
    {
      name: "Gross Motor Play",
      desc: "Movement-based games supporting body awareness and energy regulation.",
      img: abaHeroImg,
      alt: "Children using active movement play equipment",
      focus: "Body Awareness",
      examples: ["Obstacle courses", "Balancing beams", "Soft play coordination"]
    },
    {
      name: "Creative Play",
      desc: "Drawing, painting, and artistic expression for non-verbal emotional release.",
      img: abaHeroImg,
      alt: "Child engaged in creative drawing and painting",
      focus: "Non-verbal Release",
      examples: ["Finger painting", "Clay modeling", "Collage creation"]
    },
    {
      name: "Building Play",
      desc: "Construction toys fostering spatial awareness, planning, and persistence.",
      img: abaHeroImg,
      alt: "Blocks and construction toys for building play",
      focus: "Spatial Planning",
      examples: ["Lego construction", "Wooden block towers", "Magnetic tile building"]
    }
  ];

  const benefitsList = [
    "Difficulty expressing emotions verbally or frequent outbursts",
    "Experiencing life transitions, grief, anxiety, or family changes",
    "Challenges with peer relationships, shyness, or social withdrawal",
    "Behavioral difficulties at school or during everyday routines"
  ];

  const whyChooseRex = [
    { title: "Child-Centered Philosophy", desc: "Meeting children in their natural language—play—to foster genuine comfort." },
    { title: "Licensed Specialists", desc: "Compassionate therapists trained in pediatric emotional and developmental milestones." },
    { title: "Integrated Multidisciplinary Care", desc: "Seamless collaboration with our ABA Therapy, Speech Pathology, and Occupational Therapy teams." }
  ];

  const playTherapyJourney = [
    { step: "01", title: "Initial Consultation", desc: "Meeting with parents to understand goals, background, and concerns." },
    { step: "02", title: "Play-Based Evaluation", desc: "Observing child interaction and developmental coping mechanisms." },
    { step: "03", title: "Customized Therapeutic Plan", desc: "Establishing structured play objectives tailored to the child." },
    { step: "04", title: "Interactive Play Sessions", desc: "Engaging in targeted therapeutic play in a safe, supportive room." },
    { step: "05", title: "Parent Collaboration", desc: "Providing regular updates and home strategies to reinforce progress." }
  ];

  const parentFeedback = [
    { quote: "Play therapy at REX Medical Complex gave our son a safe outlet to express his feelings. The transformation in his confidence has been remarkable.", author: "Parent of 6-year-old" },
    { quote: "The therapists are incredibly warm and professional. We received practical guidance that truly helped our family routine at home.", author: "Parent of 8-year-old" },
    { quote: "A wonderful, welcoming child-centered environment. Seeing our daughter flourish through playful learning means the world to us.", author: "Parent of 5-year-old" }
  ];

  const clinicalMilestones = [
    { stat: "100%", label: "Child-Centered Focus" },
    { stat: "5+", label: "Core Developmental Domains" },
    { stat: "1-on-1", label: "Dedicated Attention" },
    { stat: "24/7", label: "Clinical Excellence Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* ================= HERO SECTION (Matched with ABA Therapy Style) ================= */}
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
            Play Therapy <span className="italic font-serif text-teal-700">& Emotional Growth</span>
          </h1>

          <p className="text-teal-900 font-bold uppercase tracking-widest text-xs sm:text-sm">
            Expressing Feelings. Healing Through Play. Empowering Children.
          </p>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            At REX Medical Complex, our specialized play therapy program uses a child’s natural language—play—to help them process emotions, build coping mechanisms, and navigate milestones with confidence.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link 
              to="/book-a-free-consult" 
              className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Book Play Consultation</span>
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

        {/* ================= WHAT IS PLAY THERAPY SECTION (With Images & Video Integration) ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60"
        >
          <div className="lg:col-span-6 space-y-6">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block border border-teal-100">
              Therapeutic Approach
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
              What Is Play Therapy?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Play therapy is an evidence-based mental health approach designed for children. Because children communicate through toys and play rather than complex adult language, our licensed specialists provide a safe, equipped environment where children can act out their feelings, solve problems, and master emotional regulation.
            </p>
            <h3 className="font-serif text-2xl font-bold text-slate-900 pt-2">Key Focus Areas:</h3>
            <div className="space-y-3">
              {focusAreas.slice(0, 3).map((item, idx) => (
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
          
          <div className="lg:col-span-6 relative h-80 sm:h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#062B3A] p-2 border border-teal-100/60 flex items-center justify-center group">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover object-center rounded-[2.3rem] transform group-hover:scale-105 transition-transform duration-700 opacity-90"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-little-girl-playing-with-building-blocks-42990-large.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#003B5C]/30 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* ================= CLINICAL MILESTONES BANNER ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clinicalMilestones.map((m, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-teal-100/60 shadow-md text-center space-y-1"
            >
              <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1c296b]">{m.stat}</p>
              <p className="text-slate-600 text-xs font-bold uppercase tracking-wider">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ================= REDUCED SPINNING CIRCLE (Slowed down to 35s for calm rotation) ================= */}
        <div className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60 flex flex-col items-center justify-center space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block border border-teal-100">
              Core Principles
            </span>
            <h3 className="font-serif text-3xl font-bold text-slate-900">The Play Framework</h3>
            <p className="text-slate-600 text-sm">Balanced dimensions driving emotional and social progress.</p>
          </div>

          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-dashed border-teal-300 flex items-center justify-center p-6 animate-spin duration-[35s]" style={{ animationDuration: '35s' }}>
            <div className="absolute w-24 h-24 bg-[#1c296b] text-white rounded-full flex items-center justify-center font-serif font-bold text-lg shadow-xl z-10">
              PLAY
            </div>
            {[
              { label: "CONNECT", angle: "0deg" },
              { label: "EXPLORE", angle: "72deg" },
              { label: "EXPRESS", angle: "144deg" },
              { label: "PRACTICE", angle: "216deg" },
              { label: "PARTICIPATE", angle: "288deg" }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="absolute w-24 h-10 bg-white border border-teal-100 shadow-sm rounded-xl flex items-center justify-center text-[10px] font-bold text-[#1c296b]"
                style={{
                  transform: `rotate(${item.angle}) translate(110px) rotate(-${item.angle})`
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* ================= INTERACTIVE ACTIVITY SELECTOR SECTION ================= */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block border border-teal-100">
              Interactive Explorer
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Explore Play Therapy Activities
            </h2>
            <p className="text-slate-600 text-sm">Select an activity category below to discover how we engage children.</p>
          </div>

          {/* Activity Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {activityCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm ${
                  activeTab === idx
                    ? "bg-[#1c296b] text-white shadow-md scale-105"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-teal-400 hover:text-teal-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Active Activity Card Display */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
                Activity Spotlight
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#1c296b]">{activityCategories[activeTab].name}</h3>
              <p className="text-slate-600 text-base leading-relaxed">{activityCategories[activeTab].desc}</p>
              
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Activity Examples:</p>
                <div className="flex flex-wrap gap-2">
                  {activityCategories[activeTab].examples.map((ex, i) => (
                    <span key={i} className="bg-teal-50 text-teal-800 text-xs font-medium px-3.5 py-1.5 rounded-full border border-teal-100">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 h-72 sm:h-96 rounded-[2.5rem] overflow-hidden shadow-2xl border border-teal-100/60 relative group">
              <img 
                src={activityCategories[activeTab].img} 
                alt={activityCategories[activeTab].alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* ================= WHO MAY BENEFIT SECTION ================= */}
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
              Our play therapy program supports children navigating emotional, behavioral, or transitional challenges who experience:
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

        {/* ================= WHY CHOOSE REX MEDICAL COMPLEX ================= */}
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

        {/* ================= OUR PLAY THERAPY JOURNEY (ROADMAP) ================= */}
        <div className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              Step-by-Step Pathway
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Our Play Therapy Journey
            </h2>
            <p className="text-slate-600 text-sm mt-2">Structured progression tailored for lasting emotional milestone growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playTherapyJourney.map((step, idx) => (
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

        {/* ================= PARENT TESTIMONIALS & FEEDBACK ================= */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              Family Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Parent Feedback & Testimonials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {parentFeedback.map((fb, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-teal-100/60 space-y-4 flex flex-col justify-between"
              >
                <Quote className="w-8 h-8 text-teal-600 opacity-60" />
                <p className="text-slate-600 text-xs sm:text-sm italic leading-relaxed">"{fb.quote}"</p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1c296b]">{fb.author}</span>
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= CALL TO ACTION BANNER ================= */}
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
                Empower Your Child's Emotional Growth Today
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                Schedule a professional play therapy consultation at REX Medical Complex, Lahore.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link 
                to="/book-a-free-consult" 
                className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full shadow-xl transition-all transform hover:scale-105"
              >
                <span>Book Play Consultation</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}