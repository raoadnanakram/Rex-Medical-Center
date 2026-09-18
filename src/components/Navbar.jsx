import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dropdown links array
  const serviceDropdownLinks = [
    { name: 'Applied Behavior Analysis (ABA Therapy)', path: '/services/behavior-therapy' },
    { name: 'Speech & Language Therapy', path: '/services/speech-therapy' },
    { name: 'Occupational Therapy & Sensory Integration', path: '/services/occupational-therapy' },
    { name: 'Pediatric Physiotherapy', path: '/services/physiotherapy' },
    { name: 'Specialist Doctor Consultations', path: '/services/specialist-consultations' },
  ];

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          
          {/* Logo with Hover & Scale Animation */}
          <Link to="/" className="flex items-center group">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              src="/logo.png" 
              alt="Rex Medical Centre" 
              className="h-16 sm:h-20 w-auto drop-shadow-sm" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 text-base font-semibold text-slate-700">
            
            <Link to="/" className="relative group py-1 hover:text-[#1c296b] transition-colors duration-200">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#1c296b] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/about" className="relative group py-1 hover:text-[#1c296b] transition-colors duration-200">
              About Us
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#1c296b] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* --- Services Dropdown Section --- */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link to="/services" className="relative group hover:text-[#1c296b] transition-colors duration-200 flex items-center gap-1.5 cursor-pointer">
                Services 
                <motion.i 
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="fa-solid fa-chevron-down text-xs text-slate-500 group-hover:text-[#1c296b]"
                ></motion.i>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#1c296b] transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Animated Dropdown Menu Box */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full -left-4 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 mt-2 overflow-hidden"
                  >
                    {serviceDropdownLinks.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-5 py-3 text-sm text-slate-700 hover:bg-[#f0f4ff] hover:text-[#1c296b] font-medium transition-colors border-b border-slate-50 last:border-none"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* ------------------------------- */}

            <Link to="/conditions" className="relative group py-1 hover:text-[#1c296b] transition-colors duration-200">
              Conditions
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#1c296b] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/contact" className="relative group py-1 hover:text-[#1c296b] transition-colors duration-200">
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#1c296b] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Desktop CTA Buttons (Book Appointment & Donate Now) */}
          <div className="hidden lg:flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link 
                to="/book-a-free-consult" 
                className="block relative overflow-hidden bg-[#1c296b] hover:bg-[#152052] text-white text-sm font-bold px-5 py-3 rounded-full transition-all duration-300 shadow-md text-center"
              >
                Book Appointment
              </Link>
            </motion.div>
      
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link 
                to="/donat-now" 
                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-red-600/40"
              >
                <span className="text-lg font-bold">+</span>
                <span>Donate Now</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Animated Icon Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2.5 rounded-xl text-slate-700 hover:text-[#1c296b] hover:bg-slate-100 transition-all focus:outline-none text-2xl"
              aria-label="Toggle Menu"
            >
              <i className={`fa-solid ${isOpen ? 'fa-xmark rotate-90' : 'fa-bars'} transition-transform duration-300`}></i>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu with Framer Motion Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white px-6 pt-3 pb-6 space-y-3 shadow-xl border-b border-slate-200"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-slate-700 hover:text-[#1c296b] font-semibold py-2 transition-colors border-b border-slate-100">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block text-slate-700 hover:text-[#1c296b] font-semibold py-2 transition-colors border-b border-slate-100">About Us</Link>
            
            {/* Mobile Services & Sub-links */}
            <Link to="/services" onClick={() => setIsOpen(false)} className="block text-slate-700 hover:text-[#1c296b] font-semibold py-2 transition-colors">Services</Link>
            <div className="pl-4 border-l-2 border-[#1c296b]/20 space-y-2 mb-3">
              {serviceDropdownLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-1.5 text-sm text-slate-600 hover:text-[#1c296b] font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Link to="/conditions" onClick={() => setIsOpen(false)} className="block text-slate-700 hover:text-[#1c296b] font-semibold py-2 transition-colors border-b border-slate-100">Conditions</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-slate-700 hover:text-[#1c296b] font-semibold py-2 transition-colors border-b border-slate-100">Contact</Link>
            
            {/* Mobile Buttons */}
            <div className="pt-3 space-y-2.5">
              <Link to="/book-a-free-consult"  onClick={() => setIsOpen(false)}
               className="relative overflow-hidden bg-[#1c296b] hover:bg-red-600 text-white text-base font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-600/40 transform hover:-translate-y-0.5 active:translate-y-0 text-center group">
                Book Appointment
              </Link>
              <Link to="/book-a-free-consult" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-1.5 text-center bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-6 py-3 rounded-full shadow-md transition-all duration-300">
                <span className="text-lg font-bold">+</span>
                <span>Donate Now</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;