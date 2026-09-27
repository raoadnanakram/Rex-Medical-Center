// src/components/OurTeam.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, ArrowRight, ShieldCheck, HeartHandshake, Users, 
  Sparkles, Award, CheckCircle, Activity, Brain, Stethoscope, Apple, X, Briefcase, GraduationCap, Quote 
} from 'lucide-react';
import { teamMembers } from '../data/teamData';
import AftabImg from '../assets/Aftab.jpg';
import usmanImg from '../assets/Usman.jpg';
import naveedImg from '../assets/Naveed.jpg';
import AsiaImg from '../assets/Asia.jpg';

// Leadership Team Data with complete professional messages & templates
const leadershipMembers = [
  {
    name: "Dr. M. A. Aftab Bhutta",
    role: "Chairman",
    qualification: "Chairman, Rex Medical Centre",
    image: AftabImg,
    tagline: "At Rex Medical Centre, we believe that every individual deserves the opportunity to live a dignified and fulfilling life.",
    sections: [
      {
        title: "Chairman's Message",
        text: "At Rex Medical Centre, we believe that every individual deserves the opportunity to live a dignified and fulfilling life. Our rehabilitation center is dedicated to providing comprehensive and compassionate care to special persons in need."
      },
      {
        title: "Our Mission",
        text: "Our mission is to empower deserving individuals with disabilities, injuries, or illnesses by offering free rehabilitation services that foster independence, confidence, and inclusivity."
      },
      {
        title: "Our Vision",
        text: "We envision a society where everyone has equal access to opportunities, resources, and support. Our center strives to be a beacon of hope, providing a safe, supportive, and stimulating environment for our beneficiaries to thrive."
      },
      {
        title: "Our Commitment",
        text: "We are committed to delivering exceptional care, driven by our core values of empathy, integrity, and excellence. Our team of dedicated professionals works tirelessly to ensure that each individual receives personalized attention, tailored to their unique needs and goals."
      },
      {
        title: "A Message from the Chairman",
        quote: "As Chairman of Rex Medical Centre, I am proud to lead an organization that makes a tangible difference in the lives of special persons. Our center is more than just a rehabilitation facility – it's a community, a support system, and a symbol of hope. I invite you to join us on this journey, as we strive to create a more inclusive and compassionate world, one individual at a time."
      }
    ]
  },
  {
    name: "Naveed Ahmed Aftab Bhutta",
    role: "Chief Executive Officer | Consultant Speech and Language Pathologist",
    qualification: "MS. Speech and Language Pathology | Certified Audiometrist (GTCTD)",
    image: naveedImg,
    tagline: "Empowering those in need with tools and support necessary to overcome challenges.",
    sections: [
      {
        title: "A Message from Our CEO",
        text: "As a Speech Pathologist and CEO of Rex Medical Centre, I am honored to lead an organization that is dedicated to providing free rehabilitation services to deserving individuals. Our mission is to empower those in need, regardless of their financial means, with the tools and support necessary to overcome their challenges."
      },
      {
        title: "Our Commitment to Excellence",
        text: "At Rex Medical Centre, we are committed to delivering exceptional care through our multidisciplinary team of experienced professionals. Our state-of-the-art facility is equipped with the latest tools and technology, including:",
        bullets: [
          "Separate speech, occupational therapy, behavior therapy, and physiotherapy rooms",
          "A play area designed specifically for children",
          "Advanced assessment and treatment equipment"
        ]
      },
      {
        title: "Our Holistic Approach",
        text: "We believe that every individual deserves a comprehensive and personalized approach to rehabilitation. Our team works collaboratively to develop tailored treatment plans that address the unique needs and goals of each individual."
      },
      {
        title: "Empowering Lives, Enhancing Futures",
        text: "As a social enterprise, we are driven by our passion to make a meaningful difference in the lives of those we serve. We believe that everyone deserves access to quality rehabilitation services, regardless of their financial means."
      },
      {
        title: "A Message from the Heart",
        quote: "I am proud to lead a team that shares my vision of creating a more inclusive and compassionate society. Together, we can empower individuals with disabilities, injuries, or illnesses to reach their full potential and live fulfilling lives."
      }
    ]
  },
  {
    name: "Usman Ahmad Bhutta",
    role: "Administrator | Media Director",
    qualification: "Administrator, Rex Medical Centre",
    image: usmanImg,
    tagline: "Providing comprehensive rehabilitation services with compassion, kindness, and respect.",
    sections: [
      {
        title: "A Message from the Administrator",
        text: "At Rex Medical Centre, we are dedicated to providing comprehensive rehabilitation services to deserving individuals, free of cost. Our state-of-the-art facility and multidisciplinary team of experts work together to empower our clients to reach their full potential."
      },
      {
        title: "Our Services",
        text: "We offer a range of rehabilitation services, including:",
        bullets: [
          "Speech Therapy: Our team of experienced speech pathologists work with clients to improve communication skills and overcome speech and language disorders.",
          "Occupational Therapy: Our occupational therapists help clients develop the skills they need for daily living and independence.",
          "Behavior Therapy: Our behavior therapists work with clients to address behavioral challenges and develop positive coping mechanisms.",
          "Physiotherapy: Our physiotherapists help clients improve mobility, strength, and flexibility."
        ]
      },
      {
        title: "Our Facilities",
        text: "We are proud to offer a range of facilities to support our clients, including:",
        bullets: [
          "Separate therapy rooms for speech, occupational, behavior, and physiotherapy",
          "A play area for children, designed to promote learning and development",
          "Advanced assessment and treatment equipment"
        ]
      },
      {
        title: "Our Commitment",
        text: "At Rex Medical Centre, we are committed to providing exceptional care and support to our clients. We believe that everyone deserves access to quality rehabilitation services, regardless of their financial means."
      },
      {
        title: "A Message from the Administrator",
        quote: "I am proud to be part of a team that is dedicated to making a difference in the lives of our clients. We are committed to providing the highest quality rehabilitation services, with compassion, kindness, and respect."
      }
    ]
  },
  {
    name: "Ms. Asia Gillani",
    role: "Chief Operating Officer | Consultant Speech and Language Pathologist",
    qualification: "Chief Operating Officer, Rex Medical Centre",
    image: AsiaImg,
    tagline: "Ensuring smooth operations to provide the best possible care to our clients.",
    sections: [
      {
        title: "A Message from the Chief Operating Officer",
        text: "As the Chief Operating Officer of Rex Medical Centre, I am responsible for ensuring that our organization runs smoothly and efficiently, allowing us to provide the best possible care to our clients."
      },
      {
        title: "Our Commitment to Excellence",
        text: "At Rex Medical Centre, we are committed to providing exceptional rehabilitation services to deserving individuals, free of cost. We believe that everyone deserves access to quality care, regardless of their financial means."
      },
      {
        title: "Our Team and Facilities",
        text: "We have a complete multidisciplinary team of experts, including speech pathologists, occupational therapists, behavior therapists, and physiotherapists. Our state-of-the-art facility includes:",
        bullets: [
          "Separate therapy rooms for speech, occupational, behavior, and physiotherapy",
          "A play area for children, designed to promote learning and development",
          "Advanced assessment and treatment equipment"
        ]
      },
      {
        title: "Our Goal",
        text: "Our goal is to provide comprehensive rehabilitation services that empower our clients to reach their full potential. We are dedicated to making a positive impact in the lives of our clients and their families."
      },
      {
        title: "A Message from the COO",
        quote: "I am proud to be part of a team that is dedicated to providing exceptional care and support to our clients. We are committed to excellence in everything we do, and we strive to make a meaningful difference in the lives of those we serve."
      }
    ]
  }
];

// Reusable Team Card Component
function TeamCard({ expert, onViewProfile }) {
  const navigate = useNavigate();

  const handleBookAppointment = (e) => {
    e.stopPropagation();
    const formattedExpertName = expert.name.replace(/\s+/g, '-');
    const formattedService = expert.category.replace(/\s+/g, '-');
    navigate(`/book-a-free-consult?expert=${formattedExpertName}&service=${formattedService}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 flex flex-col justify-between group transition-all duration-300 relative p-4 sm:p-6"
    >
      <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer mb-4" onClick={onViewProfile}>
        <img
          src={expert.image}
          alt={expert.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#003B5C] shadow-sm">
          {expert.category}
        </div>
      </div>

      <div className="space-y-3 flex-grow flex flex-col justify-between text-center">
        <div className="space-y-1 cursor-pointer" onClick={onViewProfile}>
          <h3 className="font-serif text-xl font-extrabold text-[#003B5C] group-hover:text-[#00A8CD] transition-colors leading-snug">
            {expert.name}
          </h3>
          <p className="text-[#00A8CD] font-bold text-xs uppercase tracking-wider">
            {expert.designation}
          </p>
          {expert.qualification && (
            <p className="text-slate-600 text-[11px] leading-relaxed font-semibold pt-0.5">
              {expert.qualification}
            </p>
          )}
          <div className="pt-2 flex items-center justify-center gap-1.5 text-slate-500 text-[11px] font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>{expert.experience} Experience</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-2.5">
          <button
            onClick={onViewProfile}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#003B5C] hover:bg-[#FF5271] text-white py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
          >
            <span>VIEW PROFILE</span>
            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
          </button>

          <button
            onClick={handleBookAppointment}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#003B5C] hover:bg-[#FF5271] text-white py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>BOOK APPOINTMENT</span>
            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#003B5C] via-[#00A8CD] to-[#FF5271] opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

// Reusable Profile Modal Component
function TeamProfileModal({ expert, isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen || !expert) return null;

  const handleBookAppointment = () => {
    const formattedExpertName = expert.name.replace(/\s+/g, '-');
    const formattedService = (expert.category || "Leadership").replace(/\s+/g, '-');
    navigate(`/book-a-free-consult?expert=${formattedExpertName}&service=${formattedService}`);
  };

  const isLeader = Boolean(expert.sections);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8 max-h-[90vh] flex flex-col"
        >
          <div className="bg-[#003B5C] px-6 py-4 flex items-center justify-between text-white">
            <span className="text-xs uppercase tracking-widest text-[#00A8CD] font-bold">
              {isLeader ? "Leadership Message & Profile" : "Expert Profile"}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl object-cover shadow-md border border-slate-100 flex-shrink-0"
              />
              <div className="text-center sm:text-left space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#003B5C]">
                  {expert.name}
                </h3>
                <p className="text-[#00A8CD] font-bold text-sm">
                  {expert.role || expert.designation}
                </p>
                {expert.qualification && (
                  <div className="pt-1 text-xs text-slate-600 font-medium">
                    <span className="inline-flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                      <GraduationCap className="w-3.5 h-3.5 text-[#003B5C]" />
                      {expert.qualification}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {isLeader ? (
              <div className="space-y-6 pt-4 border-t border-slate-100">
                {expert.tagline && (
                  <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-100 italic text-[#003B5C] font-serif text-sm">
                    "{expert.tagline}"
                  </div>
                )}

                {expert.sections.map((sec, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="font-serif font-bold text-[#003B5C] text-base sm:text-lg flex items-center gap-2">
                      <Quote className="w-4 h-4 text-[#00A8CD]" />
                      {sec.title}
                    </h4>
                    {sec.text && <p className="text-slate-600 text-sm leading-relaxed">{sec.text}</p>}
                    {sec.quote && (
                      <blockquote className="border-l-4 border-[#00A8CD] pl-4 italic text-slate-700 text-sm bg-slate-50 py-3 rounded-r-xl">
                        "{sec.quote}"
                      </blockquote>
                    )}
                    {sec.bullets && (
                      <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
                        {sec.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                {expert.specialization && (
                  <div>
                    <h4 className="font-bold text-[#003B5C] text-sm uppercase tracking-wider mb-1">Specialization</h4>
                    <p className="text-slate-700 text-sm">{expert.specialization}</p>
                  </div>
                )}

                {expert.expertise && (
                  <div>
                    <h4 className="font-bold text-[#003B5C] text-sm uppercase tracking-wider mb-2">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {expert.expertise.map((item, index) => (
                        <span key={index} className="inline-flex items-center gap-1.5 bg-[#00A8CD]/10 text-[#003B5C] text-xs font-semibold px-3 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3 text-[#00A8CD]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-[#003B5C] text-sm uppercase tracking-wider mb-1">Professional Biography</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{expert.bio}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleBookAppointment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#003B5C] hover:bg-[#FF5271] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-300 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>Book Appointment</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Main OurTeam Component
export default function OurTeam() {
  const [selectedCategory, setSelectedCategory] = useState("ALL EXPERTS");
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Map Naveed as the CEO from leadershipMembers array
  const naveedExecutive = leadershipMembers[1];

  const categories = [
    "ALL EXPERTS",
    "SPEECH & LANGUAGE THERAPY",
    "ABA THERAPY",
    "OCCUPATIONAL THERAPY",
    "PHYSIOTHERAPY",
    "SENSORY THERAPY"
  ];

  const filteredExperts = selectedCategory === "ALL EXPERTS"
    ? teamMembers
    : teamMembers.filter(expert => expert.category.toUpperCase() === selectedCategory);

  const handleOpenProfile = (expert) => {
    setSelectedExpert(expert);
    setIsModalOpen(true);
  };

  const handleCloseProfile = () => {
    setIsModalOpen(false);
    setSelectedExpert(null);
  };

  const handleBooking = (expertName, serviceName) => {
    const formattedExpertName = expertName.replace(/\s+/g, '-');
    const formattedService = serviceName.replace(/\s+/g, '-');
    navigate(`/book-a-free-consult?expert=${formattedExpertName}&service=${formattedService}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#334155] overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#003B5C] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1800')` }}
        />

        <div className="max-w-7xl mx-auto relative z-20 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#00A8CD]/20 border border-[#00A8CD]/40 text-[#00A8CD] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
              REX Medical CENTER
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight"
          >
            MEET OUR <span className="text-[#00A8CD] italic font-normal">EXPERTS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl font-medium text-slate-200"
          >
            Dedicated Professionals. Personalized Care. Meaningful Progress.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            “Our multidisciplinary team brings together dedicated professionals who work collaboratively to support every child's communication, behavior, learning, physical development, nutrition, and overall well-being.”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-4 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/book-a-free-consult"
              className="bg-[#003B5C] hover:bg-[#FF5271] text-white text-xs sm:text-sm font-bold px-8 py-3.5 rounded-full shadow-lg shadow-[#003B5C]/20 transition-all duration-300 text-center inline-block whitespace-nowrap"
            >
              BOOK AN APPOINTMENT
            </Link>

            <Link
              to="/services"
              className="bg-transparent hover:bg-white/10 border border-white/30 text-white text-xs sm:text-sm font-bold px-8 py-3.5 rounded-full transition-all duration-300 text-center inline-block whitespace-nowrap"
            >
              EXPLORE OUR SERVICES
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. LEADERSHIP TEAM SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[#00A8CD] font-bold text-xs uppercase tracking-widest bg-[#00A8CD]/10 px-4 py-1.5 rounded-full inline-block">
            EXECUTIVE BOARD
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#003B5C]">
            Leadership Team
          </h2>
          <p className="text-slate-600 text-sm">
            Guiding our center with vision, clinical excellence, and dedication to every family.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadershipMembers.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 flex flex-col justify-between group transition-all duration-300 p-6 text-center space-y-4"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-900 cursor-pointer" onClick={() => handleOpenProfile(leader)}>
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="space-y-1 cursor-pointer" onClick={() => handleOpenProfile(leader)}>
                <h3 className="font-serif text-xl font-extrabold text-[#003B5C]">
                  {leader.name}
                </h3>
                <p className="text-[#00A8CD] font-bold text-xs uppercase tracking-wider pb-1">
                  {leader.role}
                </p>
                {leader.qualification && (
                  <p className="text-slate-600 text-[11px] leading-relaxed font-semibold pb-1">
                    {leader.qualification}
                  </p>
                )}
                <div className="w-12 h-1 bg-[#00A8CD] mx-auto rounded-full mb-3" />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleOpenProfile(leader)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#003B5C] hover:bg-[#FF5271] text-white py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                >
                  <span>IMPORTANT MESSAGE</span>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DEDICATED PROFESSIONAL CEO SECTION */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-8 sm:p-12 relative group"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#003B5C] via-[#00A8CD] to-[#FF5271]" />
          
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-[#003B5C]">
              Meet Our Team
            </h2>
            <div className="w-20 h-1 bg-[#00A8CD] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-slate-900 shadow-lg flex-shrink-0 cursor-pointer" onClick={() => handleOpenProfile(naveedExecutive)}>
              <img
                src={naveedExecutive.image}
                alt={naveedExecutive.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="text-center md:text-left space-y-3 flex-grow">
              <h3 
                className="text-2xl sm:text-3xl font-extrabold font-serif text-[#003B5C] cursor-pointer hover:text-[#00A8CD] transition-colors"
                onClick={() => handleOpenProfile(naveedExecutive)}
              >
                {naveedExecutive.name}
              </h3>
              <p className="text-lg sm:text-xl font-bold text-[#00A8CD]">
                Chief Executive Officer | Consultant Speech and Language Pathologist
              </p>
              <p className="text-sm font-semibold text-slate-600">
                MS. Speech and Language Pathology
              </p>
              <p className="text-sm font-semibold text-slate-600">
                Certified Audiometrist (GTCTD)
              </p>

              <div className="w-20 h-1 bg-[#00A8CD] mx-auto md:mx-0 mt-4 rounded-full"></div>

              <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
                <button
                  onClick={() => handleOpenProfile(naveedExecutive)}
                  className="bg-[#003B5C] hover:bg-[#FF5271] text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-md whitespace-nowrap"
                >
                  VIEW PROFILE & MESSAGE
                </button>

                <button
                  onClick={() => handleBooking(naveedExecutive.name, "Speech Therapy")}
                  className="bg-[#FF5271] hover:bg-[#e04360] text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-md whitespace-nowrap"
                >
                  BOOK APPOINTMENT
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. TEAM CATEGORY FILTER */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#003B5C]">
              MEET OUR MULTIDISCIPLINARY EXPERTS
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              “Explore our multidisciplinary team and connect with professionals specializing in different areas of child development and therapy.”
            </p>
          </div>

          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 pt-2 gap-3 no-scrollbar">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 shadow-sm ${
                    isActive
                      ? "bg-[#003B5C] text-white shadow-md shadow-[#003B5C]/20 scale-105"
                      : "bg-white text-[#003B5C] border border-slate-200 hover:border-[#00A8CD] hover:text-[#00A8CD]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DYNAMIC EXPERTS GRID SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {filteredExperts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 font-medium">No experts found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredExperts.map((expert) => (
              <TeamCard
                key={expert.id}
                expert={expert}
                onViewProfile={() => handleOpenProfile(expert)}
              />
            ))}
          </div>
        )}
      </section>

      {/* MULTIDISCIPLINARY APPROACH SECTION */}
      <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-[#00A8CD] font-bold text-xs uppercase tracking-widest bg-[#00A8CD]/10 px-4 py-1.5 rounded-full inline-block">
              ONE TEAM. ONE PURPOSE.
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#003B5C]">
              Collaborative Multidisciplinary Care
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              “Our professionals work collaboratively across different disciplines to provide coordinated and personalized support for every child.”
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {[
              { title: "ABA Therapy", desc: "Behavioral intervention & skill acquisition.", icon: Brain, color: "#FF5271" },
              { title: "Occupational Therapy", desc: "Sensory integration & fine motor mastery.", icon: Activity, color: "#00A8CD" },
              { title: "Physiotherapy", desc: "Gross motor development & balance.", icon: Stethoscope, color: "#003B5C" },
              { title: "Nutrition & Dietetics", desc: "Pediatric dietary planning & growth.", icon: Apple, color: "#F5A623" }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 text-center flex flex-col items-center group hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-md text-[#003B5C] group-hover:bg-[#003B5C] group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif font-bold text-[#003B5C] text-lg">{service.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE OUR TEAM */}
      <section className="bg-slate-100 py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#003B5C]">
              WHY FAMILIES CHOOSE OUR TEAM
            </h2>
            <p className="text-slate-600 text-sm">
              Committed to delivering compassionate care with proven international standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "QUALIFIED EXPERTS", desc: "Professionals dedicated to specialized child development and therapy." },
              { title: "PERSONALIZED CARE", desc: "Individualized support based on every child's unique needs." },
              { title: "COLLABORATIVE CARE", desc: "Experts from different disciplines work together seamlessly." },
              { title: "FAMILY-CENTERED APPROACH", desc: "Families and caregivers are included throughout the care journey." }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#003B5C]/10 text-[#003B5C] font-extrabold flex items-center justify-center text-sm mb-4">
                  0{index + 1}
                </div>
                <h3 className="font-serif font-bold text-[#003B5C] text-base">{item.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM VALUES */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "COMPASSION", color: "#FF5271" },
            { label: "EXPERTISE", color: "#00A8CD" },
            { label: "TEAMWORK", color: "#003B5C" },
            { label: "PROGRESS", color: "#F5A623" }
          ].map((val, idx) => (
            <div key={idx} className="p-4 space-y-1">
              <span className="w-3 h-3 rounded-full inline-block mb-1" style={{ backgroundColor: val.color }} />
              <h4 className="font-serif text-lg sm:text-xl font-extrabold text-[#003B5C] tracking-wider">{val.label}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* PROFILE MODAL */}
      <TeamProfileModal
        expert={selectedExpert}
        isOpen={isModalOpen}
        onClose={handleCloseProfile}
      />

    </div>
  );
}