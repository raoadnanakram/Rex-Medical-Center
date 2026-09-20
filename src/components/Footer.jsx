import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-slate-800">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Link to="/" className="inline-block group">
                <img 
                  src="/logo.png" 
                  alt="Rex Medical Centre" 
                  className="h-14 sm:h-16 w-auto transform group-hover:scale-105 transition-all duration-300" 
                />
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Providing professional child therapy, modern developmental support, and expert clinical care with utmost integrity and human kindness.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 shadow-sm"
              >
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-red-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm"
              >
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>

              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm"
              >
                <i className="fa-brands fa-tiktok text-sm"></i>
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300 shadow-sm"
              >
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2.5">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/about" className="hover:text-white transition-colors">About Our Center</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/conditions" className="hover:text-white transition-colors">Conditions We Support</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Specialties */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2.5">Our Specialties</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/services/speech-therapy" className="hover:text-white transition-colors">Speech Therapy</Link></li>
              <li><Link to="/services/behavior-therapy" className="hover:text-white transition-colors">Behavior Therapy</Link></li>
              <li><Link to="/services/occupational-therapy" className="hover:text-white transition-colors">Occupational Therapy</Link></li>
              <li><Link to="/services/physiotherapy" className="hover:text-white transition-colors">Physiotherapy</Link></li>
              <li><Link to="/services/specialist-consultations" className="hover:text-white transition-colors">Specialist Doctor Consultations</Link></li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2.5">Get In Touch</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <i className="fa-solid fa-location-dot text-red-600 mt-0.5"></i>
                <span>91 A, College Block, Allama Iqbal Town, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-phone text-emerald-500"></i>
                <span>+92 324 4409-797</span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-envelope text-blue-500"></i>
                <span>info@rexmedcomplex.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Rex Medical Centre. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">FAQ'S</a>
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;