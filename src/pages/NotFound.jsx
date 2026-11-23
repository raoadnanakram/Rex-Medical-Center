import { Link } from 'react-router-dom';
import { PHONES } from '../data/business';

const popularLinks = [
  { name: 'Speech Therapy', path: '/services/speech-therapy' },
  { name: 'ABA Therapy', path: '/services/behavior-therapy' },
  { name: 'Occupational Therapy', path: '/services/occupational-therapy' },
  { name: 'All Services', path: '/services' },
  { name: 'Contact Us', path: '/contact' },
];

export default function NotFound() {
  return (
    <main className="bg-slate-50 py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700 mb-3">Error 404</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4">We couldn't find that page</h1>
        <p className="text-slate-600 mb-10">
          The link may be out of date or mistyped. Try one of these pages, or call us on{' '}
          <a href={PHONES.main.href} className="font-semibold text-[#1c296b]">{PHONES.main.display}</a>.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {popularLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:border-[#1c296b] hover:text-[#1c296b] transition-colors"
            >
              {l.name}
            </Link>
          ))}
        </div>
        <Link
          to="/book-a-free-consult"
          className="inline-flex items-center gap-2 bg-[#1c296b] hover:bg-[#162257] text-white font-bold px-7 py-3.5 rounded-full text-sm transition-colors"
        >
          Book a Free Consultation
        </Link>
      </div>
    </main>
  );
}
