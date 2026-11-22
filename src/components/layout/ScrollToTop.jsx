import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Page change par (aur interactive elements par click ke baad) page ko top par le jata hai.
// Pehle yeh App.jsx ke andar GlobalScrollToTop naam se tha; logic bilkul wahi hai.
export default function ScrollToTop() {
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

      // 4. Jis page / section par data-no-scroll-top laga ho (jaise Tools / Reviews), wahan click par upar na jaye
      if (event.target.closest('[data-no-scroll-top]')) {
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
