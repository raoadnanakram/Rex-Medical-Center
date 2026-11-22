// src/components/WhatsAppFloat.jsx
// Poori website par LEFT side neeche WhatsApp ka official icon (floating button).
// Number ya message badalna ho to sirf neeche ki 2 lines badlein.
const WHATSAPP_NUMBER = '923244409797'; // country code ke saath, + aur spaces ke baghair
const WHATSAPP_MESSAGE = 'Assalam o Alaikum! I would like to know more about REX Medical Complex.';

// Official WhatsApp logo (glyph)
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

export default function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      <style>{`
        @keyframes rxWaPing { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(1.9); opacity: 0; } }
        @keyframes rxWaPop { 0% { transform: scale(0) rotate(-20deg); opacity: 0; } 70% { transform: scale(1.12) rotate(4deg); opacity: 1; } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        @keyframes rxWaWiggle { 0%, 88%, 100% { transform: rotate(0); } 91% { transform: rotate(-12deg); } 94% { transform: rotate(10deg); } 97% { transform: rotate(-6deg); } }
        .rx-wa-ping { animation: rxWaPing 2.2s ease-out infinite; }
        .rx-wa-pop { animation: rxWaPop .6s cubic-bezier(.2,.9,.3,1.2) .8s both; }
        .rx-wa-icon { animation: rxWaWiggle 6s ease-in-out 3s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .rx-wa-ping, .rx-wa-pop, .rx-wa-icon { animation: none; }
        }
      `}</style>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        className="rx-wa-pop group fixed left-4 sm:left-6 z-40 flex items-center focus:outline-none"
        style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        <span className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-700/40 ring-4 ring-white/80 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1ebe5b] group-hover:shadow-green-700/60 group-active:scale-95 group-focus-visible:ring-[#25D366]/50">
          <span className="rx-wa-ping absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" />
          <svg viewBox="0 0 24 24" fill="currentColor" className="rx-wa-icon relative w-8 h-8 sm:w-9 sm:h-9" aria-hidden="true">
            <path d={WHATSAPP_PATH} />
          </svg>
        </span>

        <span className="ml-3 hidden sm:block whitespace-nowrap bg-white text-slate-800 text-xs font-bold px-4 py-2.5 rounded-full shadow-xl border border-slate-100 opacity-0 -translate-x-3 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0">
          Chat with us
        </span>
      </a>
    </>
  );
}
