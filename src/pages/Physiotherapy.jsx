import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone, Award, Activity, HeartHandshake, ShieldCheck, UserCheck, Sparkles, ChevronDown } from 'lucide-react';

const physioHeroImg = "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800";
const physioRehabImg = "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800";

export default function Physiotherapy() {
  const [openFaq, setOpenFaq] = useState(null);

  const services = [
    { title: "Musculoskeletal Physiotherapy", desc: "Assessment and treatment of pain, stiffness, weakness, movement limitations, and musculoskeletal conditions." },
    { title: "Neurological Physiotherapy", desc: "Individualized rehabilitation for stroke, cerebral palsy, spinal cord injury, traumatic brain injury, and other neurological conditions." },
    { title: "Pediatric Physiotherapy", desc: "Developmental and functional physiotherapy for children with motor delays, cerebral palsy, developmental difficulties, weakness, balance problems, and mobility limitations." },
    { title: "Therapeutic Exercise & Functional Training", desc: "Structured exercise programs to improve strength, flexibility, endurance, balance, coordination, mobility, and functional independence." },
    { title: "Balance & Gait Rehabilitation", desc: "Assessment and training to improve walking, postural control, balance, coordination, and safe mobility." },
    { title: "Functional Rehabilitation", desc: "Task-oriented rehabilitation designed to help patients improve their ability to perform daily activities and participate more independently." },
    { title: "Home-Based / Online Guidance", desc: "Physiotherapy guidance and exercise programs for appropriate patients who require support outside the clinic." }
  ];

  const coreFocus = [
    "Patient assessment and individualized treatment planning",
    "Neurological rehabilitation",
    "Pediatric physiotherapy",
    "Therapeutic exercise and strengthening",
    "Balance, coordination and gait training",
    "Mobility and functional rehabilitation",
    "Patient and caregiver education",
    "Progress monitoring and treatment modification"
  ];

  const conditionsList = [
    "Stroke", "Cerebral palsy", "Spina bifida", "Spinal cord injury", 
    "Traumatic brain injury", "Developmental motor delay", "Neuromuscular and other neurological conditions"
  ];

  const carePlans = [
    {
      title: "Initial Assessment",
      items: ["Detailed physiotherapy assessment", "Identification of impairments and functional limitations", "Individualized treatment goals", "Personalized treatment plan", "Home exercise recommendations"]
    },
    {
      title: "Rehabilitation Care Plan",
      items: ["Regular physiotherapy sessions according to clinical need", "Progressive therapeutic exercise", "Functional mobility training", "Balance and gait rehabilitation", "Home exercise program", "Patient/caregiver education", "Regular reassessment and progress monitoring"]
    },
    {
      title: "Pediatric Rehabilitation Plan",
      items: ["Developmental and functional assessment", "Individualized therapy goals", "Gross motor and functional training", "Balance and coordination activities", "Strength and mobility exercises", "Parent/caregiver education", "Home program", "Regular progress review"]
    }
  ];

  const journeySteps = [
    { step: "01", title: "Assessment", desc: "We begin by understanding your medical history, physical condition, movement difficulties, functional limitations, and rehabilitation goals." },
    { step: "02", title: "Personalized Plan", desc: "A physiotherapy treatment plan is developed according to your assessment findings and individual goals." },
    { step: "03", title: "Treatment", desc: "Evidence-based physiotherapy interventions and therapeutic exercises are provided according to your needs." },
    { step: "04", title: "Functional Training", desc: "Where appropriate, treatment focuses on balance, gait, mobility, coordination, and activities of daily living." },
    { step: "05", title: "Home Program", desc: "You receive appropriate exercises and guidance to continue your rehabilitation safely outside the clinic." },
    { step: "06", title: "Monitor & Progress", desc: "Your progress is regularly reassessed and the treatment plan is modified according to your response." }
  ];

  const faqs = [
    { q: "Do you provide personalized physiotherapy plans?", a: "Yes. Treatment plans are individualized according to the patient's condition, assessment findings, functional limitations, goals, and progress." },
    { q: "Do you treat children?", a: "Yes. Pediatric physiotherapy is provided for children who require support with motor development, strength, balance, coordination, mobility, and functional skills." },
    { q: "Can physiotherapy help after stroke?", a: "Physiotherapy can support rehabilitation after stroke by addressing movement, strength, balance, gait, mobility, coordination, and functional independence according to the individual's needs." },
    { q: "How often will I need physiotherapy?", a: "The frequency of treatment depends on the patient's condition, severity, goals, response to treatment, and clinical requirements. It is determined after assessment and reviewed during follow-ups." },
    { q: "Can I receive a home exercise program?", a: "Yes. Appropriate patients can receive an individualized home exercise program with instructions designed around their functional needs." },
    { q: "Can physiotherapy and other healthcare services be combined?", a: "Yes. Physiotherapy can form part of multidisciplinary rehabilitation when appropriate, with coordination or referral to other qualified healthcare professionals when required." }
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
            Move Better. Live Better. <span className="italic font-serif text-teal-700">Physiotherapy</span>
          </h1>

          <p className="text-teal-900 font-bold uppercase tracking-widest text-xs sm:text-sm">
            Personalized Physiotherapy & Rehabilitation Care for Better Movement and Function
          </p>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Every patient has different physical and functional needs. Whether you are recovering from an injury, managing a neurological or musculoskeletal condition, experiencing pain, or working toward improved strength, balance, mobility, and independence, we provide individualized physiotherapy care.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link 
              to="/book-consult" 
              className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Book Consultation</span>
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

        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60"
        >
          <div className="lg:col-span-6 space-y-6">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block border border-teal-100">
              Your Health. Your Movement.
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
              Your Personalized Rehabilitation Plan
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every patient has different physical and functional needs. We provide individualized physiotherapy care based on your assessment, condition, lifestyle, and goals.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our approach combines clinical assessment, therapeutic exercise, functional training, patient education, and evidence-based rehabilitation to support safe and sustainable recovery.
            </p>
          </div>
          <div className="lg:col-span-6 relative h-80 sm:h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-white p-2 border border-teal-100/60 flex items-center justify-center">
            <img 
              src={physioHeroImg} 
              alt="Physiotherapy session at REX Medical Complex" 
              className="w-full h-full object-cover object-center rounded-3xl transform hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </motion.div>

        {/* Our Services Section */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              Clinical Expertise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Our Services
            </h2>
            <p className="text-slate-600 text-sm mt-2">Comprehensive rehabilitation options tailored to your physical recovery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-teal-100/60 space-y-3 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm border border-teal-100 mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our Approach & Core Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block border border-teal-100">
              Patient-Centered Care
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Our Approach & Core Focus
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              My approach is patient-centered and evidence-based. Each patient is assessed individually to identify their physical limitations, functional difficulties, and rehabilitation goals.
            </p>
            <div className="space-y-2 pt-2">
              {coreFocus.map((focus, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>{focus}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 bg-slate-50 p-8 rounded-[2.5rem] border border-teal-100/60 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#1c296b]">Conditions May Include</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {conditionsList.map((cond, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-teal-100/60 shadow-xs text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                  <span>{cond}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient-Centered Care Banner */}
        <div className="bg-gradient-to-br from-[#1c296b] to-[#28387a] text-white rounded-[3rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="text-teal-300 font-bold text-xs uppercase tracking-[0.3em] bg-white/10 px-4 py-1.5 rounded-full inline-block">
              Treatment Is More Than Exercise
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              The Goal Is To Improve Life & Independence
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Effective physiotherapy begins with understanding the patient. We consider diagnosis, symptoms, physical impairments, functional limitations, daily activities, environment, and personal goals.
            </p>
            <p className="text-teal-300 font-semibold text-sm pt-2 italic">
              "The goal is not simply to reduce symptoms. The goal is to improve movement, function, confidence, independence, and participation in everyday life."
            </p>
          </div>
        </div>

        {/* Care Plans Section */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              Structured Support
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Choose the Level of Support You Need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carePlans.map((plan, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-teal-100/60 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">{plan.title}</h3>
                  <div className="space-y-2.5">
                    {plan.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-slate-700 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Link to="/book-consult" className="inline-flex items-center gap-2 text-[#1c296b] font-bold text-xs uppercase tracking-wider hover:text-teal-700">
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How It Works (Journey Roadmap) */}
        <div className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              Your Journey to Better Movement
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeySteps.map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-slate-50 p-6 rounded-3xl border border-teal-100/60 space-y-2 shadow-xs"
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

        {/* Online Consultation / Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-gradient-to-br from-teal-50/60 to-slate-50 rounded-[3rem] p-8 sm:p-14 border border-teal-100/80 shadow-md">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-white px-4 py-1.5 rounded-full inline-block border border-teal-100 shadow-xs">
              Tele-Rehab Available
            </span>
            <h3 className="font-serif text-3xl font-bold text-slate-900">
              Physiotherapy Guidance From Wherever You Are
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              For appropriate patients, online consultation can provide physiotherapy education, exercise guidance, home-program review, and progress monitoring.
            </p>
            <p className="text-slate-500 text-xs italic">
              *In-person assessment is recommended when physical examination or hands-on assessment is clinically necessary.
            </p>
          </div>
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-teal-100 shadow-sm space-y-3">
            <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">Online Consultation May Include:</h4>
            {[
              "Review of relevant history and functional concerns",
              "Movement and functional discussion",
              "Exercise guidance & Home exercise program",
              "Education regarding safe activity and movement",
              "Follow-up and progress monitoring"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60 space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              Common Questions
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl border border-teal-100/60 overflow-hidden shadow-xs">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-serif text-base sm:text-lg font-bold text-slate-900 flex justify-between items-center gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-teal-600 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-teal-100/40 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                Start Your Recovery
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
                Move Better. Live Better Today.
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                Schedule a professional physiotherapy evaluation at REX Medical Complex, Lahore.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link 
                to="/book-consult" 
                className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full shadow-xl transition-all transform hover:scale-105"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}