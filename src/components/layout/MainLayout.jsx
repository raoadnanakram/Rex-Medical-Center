import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

// Header + Footer sirf main website pages ke liye (admin pages is layout ke bahar hain).
export default function MainLayout() {
  const { pathname } = useLocation();

  // Tools page par pehle se apna WhatsApp button hai, wahan dobara nahi dikhana
  const showWhatsApp = pathname.toLowerCase() !== '/therapy-tools';

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-slate-800">
      <Navbar />

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />

      {showWhatsApp && <WhatsAppFloat />}
    </div>
  );
}
