import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useInRouterContext,
} from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import Seo from './components/seo/Seo';
import NotFound from './pages/public/NotFound';
import { pageRoutes } from './routes';
import { redirects } from './data/seoRoutes';

// Pages ki list routes/index.jsx mein hai, purane URLs ki list data/seoRoutes.js (redirects) mein.
// Yahan sirf unhein <Route> bana kar jora jata hai.
const mainRoutes = pageRoutes.filter((r) => r.layout !== 'bare');
const bareRoutes = pageRoutes.filter((r) => r.layout === 'bare');

function LayoutWrapper() {
  return (
    <Routes>
      {/* ===== Header/Footer WALAY pages ===== */}
      <Route element={<MainLayout />}>
        {mainRoutes.map(({ path, Component, props }) => (
          <Route key={path} path={path} element={<Component {...props} />} />
        ))}
      </Route>

      {/* ===== Header/Footer ke BAGHAIR pages (admin) ===== */}
      {bareRoutes.map(({ path, Component, props }) => (
        <Route key={path} path={path} element={<Component {...props} />} />
      ))}

      {/* ===== Purane / galat URLs jo naye slug par redirect hote hain ===== */}
      {Object.entries(redirects).map(([from, to]) => (
        <Route key={from} path={from} element={<Navigate to={to} replace />} />
      ))}

      {/* ===== Galat slug = 404 page, bina Header/Footer ke ===== */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  // Agar main.jsx mein pehle se <BrowserRouter> laga ho to yahan dobara Router nahi lagate
  // (warna error: "You cannot render a <Router> inside another <Router>")
  const alreadyInRouter = useInRouterContext();

  const content = (
    <>
      <ScrollToTop />
      <Seo />
      <LayoutWrapper />
    </>
  );

  return alreadyInRouter ? content : <Router>{content}</Router>;
}
