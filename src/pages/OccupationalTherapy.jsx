import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone, Award, Puzzle, Activity, Smile, HandMetal, HeartHandshake, Users, Layers, Sparkles } from 'lucide-react';

const otHeroImg = "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800";
const otSensoryImg = "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800";

export default function OccupationalTherapy() {
  const supportAreas = [
    "Fine motor development", "Gross motor coordination", "Hand-eye coordination", 
    "Visual-motor skills", "Pre-writing and handwriting", "Self-care skills", 
    "Feeding-related functional skills", "Attention and participation", "Play skills", 
    "School readiness", "Independence in daily activities", "Sensory processing and regulation"
  ];

  const sensoryAreas = [
    { title: "Touch", desc: "Responses to different textures and physical contact." },
    { title: "Movement & Balance", desc: "Activities involving movement, balance, and body awareness." },
    { title: "Body Awareness", desc: "Helping children understand where their body is in relation to their environment." },
    { title: "Visual Processing", desc: "Activities involving visual attention, tracking, and visual-motor coordination." },
    { title: "Auditory Processing", desc: "Supporting participation when children are sensitive to or distracted by sounds." },
    { title: "Oral Sensory Experiences", desc: "Supporting appropriate sensory experiences related to the mouth and feeding within the therapist's scope." }
  ];

  const fineMotorItems = [
    "Hand strength", "Finger coordination", "Pencil grasp", "Hand-eye coordination", 
    "Bilateral hand use", "Cutting skills", "Drawing", "Tracing", "Coloring", 
    "Pre-writing patterns", "Handwriting readiness"
  ];

  const playOutcomes = [
    "Exploration", "Imagination", "Problem-solving", "Social interaction", 
    "Motor development", "Communication", "Attention", "Independence"
  ];

  const parentGuidance = [
    "Home activities", "Sensory-support strategies", "Fine motor activities", 
    "Self-care practice", "Play ideas", "Routine development", "Strategies for supporting independence"
  ];

  const multidisciplinaryTeam = [
    { title: "Special Education", desc: "Learning and educational development." },
    { title: "Speech & Language Pathology", desc: "Communication, language, and swallowing/feeding support where appropriate." },
    { title: "Physiotherapy", desc: "Gross motor development, mobility, strength, and physical function." },
    { title: "Nutrition & Dietetics", desc: "Growth, nutritional adequacy, feeding, and specialized nutrition support." },
    { title: "Psychology", desc: "Psychological and behavioral assessment/support where appropriate." },
    { title: "Parents", desc: "Family participation and carryover at home." }
  ];

  const otRoadmap = [
    { step: "01", title: "Initial Assessment", desc: "Understand the child's developmental strengths, challenges, routines, and functional needs." },
    { step: "02", title: "Goal Setting", desc: "Develop individualized and meaningful goals together with parents/caregivers." },
    { step: "03", title: "Individualized Therapy", desc: "Provide structured, play-based occupational therapy and sensory-focused activities." },
    { step: "04", title: "Family Education", desc: "Provide practical strategies for supporting skills at home." },
    { step: "05", title: "Progress Monitoring", desc: "Track functional progress and participation." },
    { step: "06", title: "Review & Adaptation", desc: "Modify goals and intervention strategies according to the child's changing needs." }
  ];

  const individualFactors = [
    "Age", "Developmental level", "Functional abilities", "Sensory needs", 
    "Learning style", "Family priorities", "School requirements", "Individual goals"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Header Section with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }} 
          className="text-center max-w-4xl mx-auto relative space-y-6"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#1c296b] font-bold text-xs uppercase tracking-[0.25em] shadow-sm"
          >
            <Award className="w-4 h-4 text-teal-600" />
            Rex Medical Center Center of Excellence
          </motion.div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-slate-900 tracking-tight">
            Occupational Therapy & <span className="italic font-serif text-teal-700">Sensory Integration</span>
          </h1>

          <p className="text-teal-900 font-bold uppercase tracking-widest text-xs sm:text-sm">
            Building Skills. Supporting Independence. Empowering Every Child.
          </p>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Our Occupational Therapy program supports children in developing the skills they need to participate, learn, play, communicate, and become more independent in everyday life. Through individualized, play-based interventions, children are supported according to their unique developmental needs, strengths, and goals.
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

        {/* What Is Occupational Therapy Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60"
        >
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
              What Is Occupational Therapy?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Occupational therapy helps children develop the skills required for everyday activities and meaningful participation at home, school, and in the community.
            </p>
            <p className="text-slate-900 font-bold text-sm">
              Our pediatric occupational therapy program may support:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {supportAreas.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 relative h-80 sm:h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-white p-2 border border-teal-100/60 flex items-center justify-center">
            <img 
              src={otHeroImg} 
              alt="Occupational Therapy session" 
              className="w-full h-full object-cover object-center rounded-3xl transform hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </motion.div>

        {/* Sensory Integration Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-[#1c296b] to-[#28387a] text-white rounded-[3rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-3xl mb-12 relative z-10">
            <span className="text-teal-300 font-bold text-xs uppercase tracking-[0.3em] bg-white/10 px-4 py-1.5 rounded-full inline-block mb-4">
              Sensory Integration
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Helping Children Understand & Respond to Their World
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
              Children receive information from their senses throughout the day. Sometimes they may find it difficult to process or respond appropriately to sensory information.
            </p>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Sensory-focused occupational therapy uses carefully selected, play-based activities to help children participate more comfortably and effectively in daily activities.
            </p>
          </div>

          <h3 className="font-serif text-2xl font-bold text-teal-300 mb-6 relative z-10">Sensory areas may include:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {sensoryAreas.map((area, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 space-y-2 transition-all"
              >
                <h4 className="font-serif text-lg font-bold text-white">{area.title}</h4>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Who May Benefit Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-5 space-y-4">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block border border-teal-100">
              Candidacy & Support
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
              Who May Benefit?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Occupational therapy and sensory-focused intervention may be helpful for children experiencing difficulties with motor planning, self-care, handwriting, or sensory processing.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              It may also be incorporated into multidisciplinary support for children with developmental delays, autism, learning difficulties, neurological conditions, or other developmental needs, following appropriate assessment.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Fine motor skills", "Handwriting", "Coordination", "Attention and participation", 
              "Self-care", "Dressing and grooming", "Feeding-related functional skills", "Sensory processing", 
              "Play skills", "School readiness", "Motor planning", "Daily routines", "Functional independence"
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-teal-100/60 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Fine Motor & Pre-Writing Skills + Play & Development */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-10 shadow-xl border border-teal-100/60 space-y-6 flex flex-col justify-between"
          >
            <div>
              <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
                Little Hands, Big Skills
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Fine Motor & Pre-Writing Skills
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Activities can be designed to develop:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {fineMotorItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-slate-500 text-xs italic pt-4 border-t border-slate-100">
              These skills support children's ability to participate more effectively in classroom and everyday activities.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-10 shadow-xl border border-teal-100/60 space-y-6 flex flex-col justify-between"
          >
            <div>
              <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
                Learning Through Play
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Play & Development
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Play is an important occupation of childhood. Our therapists use meaningful and age-appropriate play activities to encourage:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {playOutcomes.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-slate-500 text-xs italic pt-4 border-t border-slate-100">
              The aim is to make therapy engaging, purposeful, and meaningful for each child.
            </p>
          </motion.div>

        </div>

        {/* Feeding & Oral-Motor Support */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-12 shadow-xl border border-teal-100/60 space-y-4"
        >
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Feeding & Oral-Motor Support
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Where appropriate and within the therapist's professional scope, occupational therapy may contribute to addressing functional feeding skills, positioning, self-feeding, and sensory aspects of eating.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            For children with swallowing difficulties, feeding safety concerns, or suspected dysphagia, assessment and management should involve an appropriately qualified Speech & Language Pathologist/feeding and swallowing professional, with nutrition support from a dietitian where needed.
          </p>
        </motion.div>

        {/* Family-Centered Therapy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-gradient-to-br from-teal-50/60 to-slate-50 rounded-[3rem] p-8 sm:p-14 border border-teal-100/80 shadow-md"
        >
          <div className="lg:col-span-6 space-y-4">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-white px-4 py-1.5 rounded-full inline-block border border-teal-100 shadow-xs">
              Therapy Doesn't Stop When the Session Ends
            </span>
            <h3 className="font-serif text-3xl font-bold text-slate-900">
              Family-Centered Therapy
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Parents and caregivers are an important part of a child's developmental journey. We provide practical guidance that can help families incorporate appropriate strategies and activities into everyday routines.
            </p>
            <p className="text-slate-900 font-bold text-xs uppercase tracking-wider">Parent guidance may include:</p>
          </div>
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {parentGuidance.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-sm border border-teal-100/50 text-slate-800 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Multidisciplinary Child Development */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60 space-y-8"
        >
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-teal-100">
              One Child. One Team. A Coordinated Approach.
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Multidisciplinary Child Development
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Occupational therapy can be integrated with other services according to the child's individual needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {multidisciplinaryTeam.map((team, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -4 }}
                className="bg-slate-50 p-6 rounded-3xl border border-teal-100/60 space-y-2 shadow-xs transition-all"
              >
                <h4 className="font-serif text-lg font-bold text-[#1c296b]">{team.title}</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{team.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Occupational Therapy Journey (Roadmap) */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              Our Occupational Therapy Journey
            </h2>
            <p className="text-slate-600 text-sm">Step-by-step pathway for clinical excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otRoadmap.map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-teal-100/60 space-y-3 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm border border-teal-100">
                  {step.step}
                </div>
                <h4 className="font-serif text-xl font-bold text-slate-900">{step.title}</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Individualized Occupational Therapy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-6 space-y-4">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block border border-teal-100">
              Every Child Has Different Strengths
            </span>
            <h3 className="font-serif text-3xl font-bold text-slate-900">
              Individualized Occupational Therapy
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              There is no single therapy approach that works identically for every child. Our occupational therapy sessions are individualized according to factors like age, developmental level, sensory needs, and personal goals.
            </p>
            <p className="text-slate-800 font-semibold text-sm italic">
              The focus is not simply on completing exercises—it is on helping children participate more successfully in real-life activities.
            </p>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {individualFactors.map((factor, idx) => (
              <div key={idx} className="bg-teal-50/50 p-4 rounded-2xl border border-teal-100 text-center flex items-center justify-center shadow-xs">
                <span className="text-xs font-bold text-[#1c296b]">{factor}</span>
              </div>
            ))}
          </div>
        </motion.div>

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
                Empower Your Child's Independence Today
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                Schedule a professional occupational and sensory therapy consultation at Rex Medical Center, Lahore.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link 
                to="/book-consult" 
                className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-full shadow-xl transition-all transform hover:scale-105"
              >
                <span>Book OT Consultation</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}