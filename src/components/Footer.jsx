import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { BUSINESS_NAME, ADDRESS, PHONES } from '../data/business';

function Footer() {
  const BOOK_LINK = "/book-a-free-consult";

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-400 pt-20 pb-12 border-t border-slate-800/80 overflow-hidden">
      
      {/* Decorative Background Lighting Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Colorful Gradient Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-600 to-red-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-slate-800/80">
          
          {/* Col 1: Logo & Description */}
          <div className="space-y-5">
            <div className="flex items-center">
              <Link to="/" className="inline-block group">
                <img 
                  src="/logo.png" 
                  alt="REX Medical Complex" 
                  className="h-16 w-auto transform group-hover:scale-105 transition-all duration-300 drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]" 
                />
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 font-light">
              Providing professional child therapy, modern developmental support, and expert clinical care with utmost integrity and human kindness.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://www.facebook.com/share/188Hyyk26h/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:scale-110 hover:shadow-[0_0_15px_rgba(24,119,242,0.5)] transition-all duration-300"
              >
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>

              <a 
                href="https://instagram.com/rex_medical_centre/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-red-500 hover:to-purple-600 hover:text-white hover:border-transparent hover:scale-110 hover:shadow-[0_0_15px_rgba(225,48,108,0.5)] transition-all duration-300"
              >
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>

              <a 
                href="https://tiktok.com/naveedahmedaftabbhutta" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white hover:border-slate-700 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
              >
                <i className="fa-brands fa-tiktok text-sm"></i>
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:scale-110 hover:shadow-[0_0_15px_rgba(10,102,194,0.5)] transition-all duration-300"
              >
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5 border-l-2 border-emerald-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { name: 'About Our Center', path: '/about' },
                { name: 'Meet Our Team', path: '/about/our-team' },
                { name: 'Our Services', path: '/services' },
                { name: 'Conditions We Support', path: '/conditions' },
                { name: 'Therapy Tools', path: '/therapy-tools' },
                { name: 'Donate Now', path: '/donate' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center text-slate-400 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 mr-1.5 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300 text-emerald-400" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Specialties */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5 border-l-2 border-blue-500 pl-3">
              Our Specialties
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { name: 'Speech Therapy', path: '/services/speech-therapy' },
                { name: 'Behavior Therapy', path: '/services/behavior-therapy' },
                { name: 'Occupational Therapy', path: '/services/occupational-therapy' },
                { name: 'Physiotherapy', path: '/services/physiotherapy' },
                { name: 'Sensory Therapy', path: '/services/sensory-therapy' },
                { name: 'Play Therapy', path: '/services/play-therapy' },
                { name: 'Specialist Consultations', path: '/services/specialist-consultations' },
              ].map((service, idx) => (
                <li key={idx}>
                  <Link 
                    to={service.path} 
                    className="group flex items-center text-slate-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 mr-1.5 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300 text-blue-400" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Get In Touch */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5 border-l-2 border-red-600 pl-3">
              Get In Touch
            </h4>
            
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed pt-1">
                  {ADDRESS}
                </span>
              </li>

              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  {[PHONES.main, PHONES.whatsapp, PHONES.landline].map((p) => (
                    <a
                      key={p.label}
                      href={p.href}
                      {...(p === PHONES.whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-slate-400 group-hover:text-emerald-400 transition-colors"
                    >
                      <span className="text-slate-500">{p.label}:</span> {p.display}
                    </a>
                  ))}
                </div>
              </li>

              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:info@rexmedcomplex.com" className="text-slate-400 group-hover:text-blue-400 transition-colors">
                  info@rexmedcomplex.com
                </a>
              </li>
            </ul>

            {/* Book Assessment Button Below Email */}
            <div className="pt-3">
              <Link
                to={BOOK_LINK} 
                className="w-full inline-flex items-center justify-between px-5 py-3 rounded-xl text-white text-xs font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg shadow-red-900/30 hover:shadow-red-600/40 transform hover:-translate-y-0.5 group border border-red-500/30"
              >
                <span>Book Child Assessment</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </Link>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/contact" className="hover:text-slate-300 transition-colors">FAQ'S</Link>
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/medical-disclaimer" className="hover:text-slate-300 transition-colors">Medical Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;