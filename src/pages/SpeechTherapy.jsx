import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone, Mic, MessageCircle, Sparkles, Volume2, Award, Users, HeartHandshake, HelpCircle } from 'lucide-react';
import occupationalImg from '../assets/OccupationalTherapy.jpg';
import occupationalImg1 from '../assets/Occupational.jpg';



const speechHeroImg = occupationalImg;
const speechPlayImg = occupationalImg1;

export default function SpeechTherapy() {
  const speechPillars = [
    {
      icon: <Volume2 className="w-6 h-6 text-teal-600" />,
      title: "Articulation & Pronunciation",
      desc: "Helping children pronounce sounds clearly, build correct mouth mechanics, and speak with absolute confidence."
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-teal-600" />,
      title: "Receptive & Expressive Language",
      desc: "Strengthening vocabulary comprehension, sentence structure, and the ability to articulate thoughts effectively."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-teal-600" />,
      title: "Social Communication",
      desc: "Fostering pragmatic language skills, eye contact, peer engagement, and natural conversational flow."
    },
    {
      icon: <Mic className="w-6 h-6 text-teal-600" />,
      title: "Fluency & Stuttering Support",
      desc: "Providing gentle, evidence-based pacing and breathing strategies to minimize stuttering and promote smooth speech."
    }
  ];

  const milestones = [
    { age: "1 - 2 Years", focus: "First words, simple instructions understanding, and basic gesture communication." },
    { age: "2 - 3 Years", focus: "Combining 2-3 words phrases, answering simple questions, and vocabulary expansion." },
    { age: "3 - 5 Years", focus: "Conversational storytelling, clear pronunciation for strangers, and complex sentence usage." },
    { age: "School Age", focus: "Advanced pragmatic language, reading fluency, academic articulation, and social confidence." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Unique Hero Banner Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="text-center max-w-4xl mx-auto mb-20 relative"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#1c296b] font-bold text-xs uppercase tracking-[0.25em] shadow-sm mb-4">
            <Award className="w-4 h-4 text-teal-600" />
            Rex Medical Center Center of Excellence
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-slate-900 tracking-tight mb-6">
            Empowering Voices Through <span className="italic font-serif text-teal-700">Speech Therapy</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Unlocking communication milestones with expert speech-language pathology, engaging play activities, and specialized clinical care under one roof in Lahore.
          </p>
        </motion.div>

        {/* Unique Asymmetric Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -35 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }} 
            className="lg:col-span-6 relative h-96 sm:h-[480px] rounded-[3rem] overflow-hidden shadow-2xl bg-white p-3 border border-teal-100/80 group"
          >
            <img 
              src={speechHeroImg} 
              alt="Speech and Language Therapy Session" 
              className="w-full h-full object-cover object-center rounded-[2.5rem] group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute bottom-8 left-8 right-8 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-white">
              <p className="text-xs uppercase tracking-widest text-teal-300 font-bold mb-1">Clinical Standard</p>
              <h4 className="font-serif text-xl font-bold">Personalized Care Plans Tailored For Every Child</h4>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 35 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }} 
            className="lg:col-span-6 space-y-6 lg:pl-6"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
              Every Child Deserves to Express Themselves Freely
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At Rex Medical Center, our speech-language program bridges the gap between thoughts and words. Whether overcoming developmental delays or pronunciation hurdles, our specialists cultivate a nurturing atmosphere designed for accelerated progress.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                "Targeted Articulation Drills",
                "Play-Based Language Building",
                "Oral-Motor Skill Training",
                "Parent Coaching & Home Guidance"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-sm border border-teal-100/50">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{text}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-4">
              <Link 
                to="/book-consult" 
                className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>Book Speech Consultation</span>
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
        </div>

        {/* Unique Bento-Grid Core Focus Section */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
              Our Core Speech Specialties
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Comprehensive therapeutic modules customized for varied communication needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {speechPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-teal-100/60 flex flex-col justify-between space-y-4 group hover:border-teal-300 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center border border-teal-100 group-hover:bg-[#1c296b] group-hover:text-white transition-colors duration-300">
                  {React.cloneElement(pillar.icon, { className: "w-6 h-6 group-hover:text-white transition-colors" })}
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-slate-900 mb-2">{pillar.title}</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* NEW ADDITION: Developmental Milestones Section */}
        <div className="mb-24 bg-white/90 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              Age-Wise Growth
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Communication Milestones by Age
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Tracking your child's progress at every developmental stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-50 to-teal-50/40 p-6 rounded-3xl border border-teal-100/80 shadow-sm space-y-3">
                <span className="text-[#1c296b] font-bold text-sm tracking-wider uppercase bg-white px-3 py-1 rounded-full inline-block shadow-xs border border-teal-100">
                  {item.age}
                </span>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed pt-1">
                  {item.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* NEW ADDITION: Multidisciplinary Collaborative Care Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 bg-gradient-to-r from-[#1c296b] to-[#28387a] rounded-[3rem] p-8 sm:p-14 text-white shadow-2xl">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-teal-300 font-bold text-xs uppercase tracking-widest border border-white/10">
              <Users className="w-4 h-4" />
              Whole-Child Model
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Collaborative Care With Behavior & Occupational Teams
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              At Rex Medical Center, speech therapists don't work in isolation. They collaborate daily with our ABA behavior analysts and occupational therapists to ensure integrated, holistic care for children with complex developmental needs.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-200">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Unified Treatment Plans</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-200">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Regular Team Syncs</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-3xl overflow-hidden shadow-lg bg-white/10 p-2 border border-white/20">
            <img 
              src={speechPlayImg} 
              alt="Multidisciplinary collaborative therapy session" 
              className="w-full h-full object-cover object-center rounded-2xl"
            />
          </div>
        </div>

        {/* Unique Clinical Process Callout Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-[3rem] shadow-xl border border-teal-100 p-8 sm:p-14 text-slate-900 relative overflow-hidden mb-12"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.3em] bg-teal-50 px-4 py-1.5 rounded-full inline-block border border-teal-100">
                Start Your Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
                Ready to Help Your Child Speak With Confidence?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                Book a professional diagnostic evaluation with our certified speech pathologists at Rex Medical Center today.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-lg-end">
              <Link 
                to="/book-consult" 
                className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full shadow-xl transition-all transform hover:scale-105"
              >
                <span>Schedule Evaluation</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}