import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Main Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Conditions from './pages/Conditions';
import Contact from './pages/Contact';
import BookConsult from './pages/BookConsult';
import DonateNow from './pages/DonateNow';




// Import Service Subpages (Directly from pages folder)
import SpeechTherapy from './pages/SpeechTherapy';
import BehaviorTherapy from './pages/BehaviorTherapy';
import OccupationalTherapy from './pages/OccupationalTherapy';
import Physiotherapy from './pages/Physiotherapy';
import SpecialistConsultations from './pages/SpecialistConsultations';
import OurTeam from './pages/OurTeam';



function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-slate-800">

        {/* Navigation Bar */}
        <Navbar />

        {/* Main Route Content */}
        <div className="flex-grow">
          <Routes>

            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-a-free-consult" element={<BookConsult />} />
            <Route path="/donat-now" element={<DonateNow />} />

            {/* Service Subpages */}
            <Route path="/services/speech-therapy" element={<SpeechTherapy />} />
            <Route path="/services/behavior-therapy" element={<BehaviorTherapy />} />
            <Route path="/services/occupational-therapy" element={<OccupationalTherapy />} />
            <Route path="/services/physiotherapy" element={<Physiotherapy />} />
            <Route path="/services/specialist-consultations" element={<SpecialistConsultations />} />
            <Route path="/about/our-team" element={<OurTeam />} />

          </Routes>
        </div>

        {/* Footer */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;