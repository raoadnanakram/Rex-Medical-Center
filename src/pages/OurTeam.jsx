import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Award, Stethoscope, Users, Sparkles, CheckCircle2 } from 'lucide-react';

const teamMembers = [
  {
    name: "Dr. Ahmed Khan",
    role: "Lead Developmental Pediatrician",
    specialty: "Child Development & Autism Care",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    category: "medical"
  },
  {
    name: "Ayesha Malik",
    role: "Board-Certified Behavior Analyst (BCBA)",
    specialty: "ABA Therapy & Behavior Modification",
    img: "https://images.unsplash.com/photo-1594824813586-13a1a45749a5?auto=format&fit=crop&q=80&w=800",
    category: "therapy"
  },
  {
    name: "Dr. Sara Ahmed",
    role: "Senior Speech-Language Pathologist",
    specialty: "Articulation, Stuttering & Feeding Support",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    category: "therapy"
  },
  {
    name: "Usman Tariq",
    role: "Lead Occupational & Sensory Therapist",
    specialty: "Sensory Integration & Fine Motor Skills",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800",
    category: "therapy"
  },
  {
    name: "Dr. Fatima Noor",
    role: "Senior Neurological Physiotherapist",
    specialty: "Pediatric & Adult Rehabilitation",
    img: "https://images.unsplash.com/photo-1594824813586-13a1a45749a5?auto=format&fit=crop&q=80&w=800",
    category: "medical"
  },
  {
    name: "Bilal Hussain",
    role: "Child Psychologist & Counselor",
    specialty: "Emotional Regulation & Family Counseling",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    category: "support"
  }
];

export default function Team() {
  const [filter, setFilter] = useState('all');

  const filteredMembers = filter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }} 
          className="text-center max-w-4xl mx-auto relative space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#1c296b] font-bold text-xs uppercase tracking-[0.25em] shadow-sm">
            <Award className="w-4 h-4 text-teal-600" />
            REX Medical Complex Experts
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-slate-900 tracking-tight">
            Meet Our Multidisciplinary <span className="italic font-serif text-teal-700">Expert Team</span>
          </h1>

          <p className="text-teal-900 font-bold uppercase tracking-widest text-xs sm:text-sm">
            Dedicated Professionals Working Together for Your Child's Bright Future
          </p>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Our team consists of highly qualified pediatricians, behavior analysts, speech pathologists, occupational therapists, and physiotherapists committed to compassionate, evidence-based care.
          </p>

          {/* Filter Buttons */}
          <div className="pt-6 flex flex-wrap justify-center gap-3">
            {[
              { id: 'all', label: 'All Experts' },
              { id: 'medical', label: 'Medical Specialists' },
              { id: 'therapy', label: 'Therapy & Rehab' },
              { id: 'support', label: 'Counseling & Support' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                  filter === btn.id 
                    ? 'bg-[#1c296b] text-white shadow-md' 
                    : 'bg-white text-slate-700 hover:bg-teal-50 border border-slate-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Team Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={member.name}
              className="bg-white/95 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-xl border border-teal-100/60 flex flex-col justify-between group hover:border-teal-300 transition-all"
            >
              <div className="relative h-72 overflow-hidden bg-slate-100">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#1c296b] shadow-sm border border-teal-100">
                  {member.category}
                </div>
              </div>

              <div className="p-8 space-y-4 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-teal-800 font-semibold text-xs sm:text-sm tracking-wide">
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1">
                    {member.specialty}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link 
                    to="/book-consult" 
                    className="inline-flex items-center gap-2 text-[#1c296b] font-bold text-xs uppercase tracking-wider hover:text-teal-700 transition-colors"
                  >
                    <span>Book Appointment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Our Team Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-[3rem] p-8 sm:p-14 shadow-xl border border-teal-100/60 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.25em] bg-teal-50 px-4 py-1.5 rounded-full inline-block border border-teal-100">
              Coordinated Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
              Multidisciplinary Collaboration for Complete Care
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At REX Medical Complex, our specialists don't work in silos. We meet regularly to review patient progress, sync treatment strategies, and ensure that speech therapy, ABA, occupational therapy, and medical support reinforce one another seamlessly.
            </p>
            <div className="space-y-3 pt-2">
              {[
                "Regular cross-departmental case reviews",
                "Unified developmental and rehabilitation plans",
                "Direct caregiver communication and coaching",
                "Evidence-based clinical protocols"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 text-xs sm:text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 relative h-80 sm:h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-50 p-3 border border-teal-100/60 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800" 
              alt="Multidisciplinary team collaborating" 
              className="w-full h-full object-cover object-center rounded-3xl"
            />
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
                Consult Our Experts
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
                Ready to Meet Our Specialists?
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                Schedule a consultation with our multidisciplinary team at REX Medical Complex, Lahore today.
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