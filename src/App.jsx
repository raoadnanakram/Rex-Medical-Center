import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Main Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Tools from './pages/Tools';
import Conditions from './pages/Conditions';
import Contact from './pages/Contact';
import BookConsult from './pages/BookConsult';
import DonateNow from './pages/DonateNow';

// Import Service Subpages
import SpeechTherapy from './pages/SpeechTherapy';
import BehaviorTherapy from './pages/BehaviorTherapy';
import OccupationalTherapy from './pages/OccupationalTherapy';
import Physiotherapy from './pages/Physiotherapy';
import Sensorytherapy from './pages/Sensorytherapy';
import Playtherapy from './pages/Playtherapy';
import SpecialistConsultations from './pages/SpecialistConsultations';
import OurTeam from './pages/OurTeam';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function GlobalScrollToTop() {
  const { pathname } = useLocation();

  const scrollToTopInstant = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const appWrapper = document.querySelector('.flex flex-col min-h-screen, .app-container, .main-layout');
    if (appWrapper) {
      appWrapper.scrollTop = 0;
    }
  };

  // Rule 1: Page change hone par top par le kar jaye
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    scrollToTopInstant();
  }, [pathname]);

  // Rule 2: Global click handler - Videos, Video Lists, Forms & Pickers ko ignore karega
  useEffect(() => {
    const handleGlobalClick = (event) => {
      
      // 1. YouTube videos, iframes, and main player screen detection
      const isVideoElement = event.target.closest(
        'iframe, video, embed, object, [src*="youtube"], [src*="youtu.be"], .video-container, [class*="video"], [id*="video"]'
      );

      // 2. DETAILED VIDEO LIST/RESOURCE BUTTONS DETECTION
      const isGeneralizedVideoButtonList = event.target.closest(
        'button.group, .group[class*="resource"], .cursor-pointer[class*="resource"], .cursor-pointer[class*="video"]'
      );

      if (isVideoElement || isGeneralizedVideoButtonList) {
        return; 
      }

      // 3. Check if click is inside Form, Dropdown, or Date/Time pickers
      const isFormOrPickerElement = event.target.closest(
        [
          'input', 'select', 'option', 'textarea', 'form', '[role="listbox"]', '[role="combobox"]', '[role="option"]', '[role="dialog"]', '[role="gridcell"]', '.react-datepicker', '.react-datepicker-wrapper', '.flatpickr-calendar', '.MuiPickersPopper-root', '.ant-picker-dropdown', '.dropdown-menu', '.dropdown-content', '.form-control', '.form-select', '.form-input'
        ].join(',')
      );

      if (isFormOrPickerElement) {
        return; 
      }

      const isInteractiveElement = event.target.closest(
        'button, a, [role="button"], .group, .cursor-pointer'
      );

      if (isInteractiveElement) {
        setTimeout(() => {
          scrollToTopInstant();
        }, 30);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return null;
}

// Helper component to conditionally render Navbar & Footer
function LayoutWrapper() {
  const location = useLocation();
  
  const isAdminRoute = 
    location.pathname.startsWith('/admin') || 
    location.pathname === '/admin-login' || 
    location.pathname === '/admin-dashboard';

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-slate-800">
      {!isAdminRoute && <Navbar />}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/Tools" element={<Tools />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-a-free-consult" element={<BookConsult />} />
          <Route path="/donat-now" element={<DonateNow />} />
          
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          <Route path="/services/speech-therapy" element={<SpeechTherapy />} />
          <Route path="/services/behavior-therapy" element={<BehaviorTherapy />} />
          <Route path="/services/occupational-therapy" element={<OccupationalTherapy />} />
          <Route path="/services/physiotherapy" element={<Physiotherapy />} />
          <Route path="/services/sensorytherapy" element={<Sensorytherapy />} />
          <Route path="/services/playtherapy" element={<Playtherapy />} />
          <Route path="/services/specialist-consultations" element={<SpecialistConsultations />} />
          <Route path="/about/our-team" element={<OurTeam />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <GlobalScrollToTop />
      <LayoutWrapper />
    </Router>
  );
}