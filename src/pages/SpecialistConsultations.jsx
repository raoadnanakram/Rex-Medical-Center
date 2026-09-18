import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SpecialistConsultations() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-600 font-bold text-xs uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full">Expert Medical Care</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mt-4 mb-4">Specialist Doctor Consultations</h1>
          <p className="text-slate-600 text-base">Expert medical evaluations and personalized care plans delivered by experienced specialist physicians.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-slate-900">Comprehensive Medical Guidance for Families</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Consult with leading pediatricians, developmental specialists, and neurologists. We provide thorough diagnostic evaluations and structured roadmaps to guide your child's health journey.
            </p>
            <ul className="space-y-3">
              {["Pediatric & Developmental Evaluations", "Diagnostic Medical Assessments", "Customized Treatment Roadmaps", "Affordable Family Consultation Packages"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-medium bg-[#162C5A] hover:bg-red-600 transition-all shadow-md">
                <span>Book Doctor Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800" alt="Specialist Consultations" className="w-full h-[400px] object-cover" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}