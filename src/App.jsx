import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Seo from './components/Seo';

// Pages are code-split; see routes.jsx
import { pageRoutes, isAdminPath } from './routes';
import { redirects } from './data/seoRoutes';
import NotFound from './pages/NotFound';

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
  
  const isAdminRoute = isAdminPath(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-slate-800">
      {!isAdminRoute && <Navbar />}

      <div className="flex-grow">
        <Routes>
          {pageRoutes.map(({ path, Component, props }) => (
            <Route key={path} path={path} element={<Component {...props} />} />
          ))}
          {Object.entries(redirects).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

// The router is supplied by the entry point: BrowserRouter in main.jsx,
// StaticRouter in entry-server.jsx for build-time prerendering.
export default function App() {
  return (
    <>
      <Seo />
      <GlobalScrollToTop />
      <LayoutWrapper />
    </>
  );
}