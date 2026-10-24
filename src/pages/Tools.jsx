import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PHONES } from '../data/business';
import {
  Search,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Check,
  ShieldCheck,
  Truck,
  Headphones,
  Lock,
  Sparkles,
  Mic,
  Wind,
  BookOpen,
  Layers,
  Palette,
  Brain,
  Eye,
  Banknote,
  Package,
  ChevronDown,
  Users,
} from 'lucide-react';

// ============================================================
//  SETTINGS  (orders go to the clinic WhatsApp number in src/data/business.js)
// ============================================================
const WHATSAPP_NUMBER = PHONES.whatsapp.number;
const FREE_SHIPPING_ABOVE = 5000;
const SHIPPING_FEE = 250;
const CURRENCY = "Rs.";

const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const money = (n) => `${CURRENCY} ${Number(n).toLocaleString("en-PK")}`;

// ============================================================
//  CATALOG  (6 categories x 10 = 60 products)
//  Item format: [name, price, description, emoji, ageGroup, tag]
//  ageGroup: "1-3" | "3-5" | "5+"      tag: "" | "Best Seller" | "New" | "Therapist Pick" | "Sale"
//  Real photo lagani ho to product object mein  image: "url"  add kar dein.
// ============================================================
const CATALOG = {
  "Speech Therapy Toys": {
    icon: Mic,
    grad: "from-teal-400 to-cyan-500",
    items: [
      ["Mouth Mirror Practice Set", 1450, "Handheld mirror set for watching tongue, lip and jaw movement during articulation practice.", "🪞", "3-5", "Therapist Pick"],
      ["Talking Animal Sound Farm", 2650, "Press and listen to animal sounds to encourage imitation, first words and turn taking.", "🐄", "1-3", "Best Seller"],
      ["Speech Bubble Matching Puzzle", 1350, "Picture-to-word puzzle pieces that build vocabulary and sentence making.", "🧩", "3-5", ""],
      ["Sound Bingo Game", 1850, "Colourful bingo for practising early sounds in a fun group activity.", "🎲", "3-5", "New"],
      ["Pop-Up Pals Cause & Effect Toy", 2200, "Teaches requesting words like more, again and open through pop-up surprises.", "🐹", "1-3", "Best Seller"],
      ["Toy Telephone Conversation Set", 1250, "Pretend-call phones that practise greetings, turn taking and conversation.", "☎️", "1-3", ""],
      ["Feelings Faces Hand Puppets", 2400, "Soft puppets to talk about emotions and build expressive language.", "🎭", "3-5", "Therapist Pick"],
      ["Mini Kitchen Role Play Set", 3200, "Pretend food and utensils to grow everyday vocabulary through play.", "🍳", "3-5", ""],
      ["Syllable Stacking Cups", 1150, "Stack and tap cups to practise clapping out syllables and word length.", "🥤", "1-3", "Sale"],
      ["My Voice Toy Microphone", 1750, "Kids hear their own voice louder, which boosts speech confidence.", "🎤", "3-5", "New"],
    ],
  },
  "Oral Motor Tools": {
    icon: Wind,
    grad: "from-fuchsia-400 to-purple-500",
    items: [
      ["Bubble Blowing Kit", 950, "Strengthens lips and breath control while kids chase bubbles.", "🫧", "1-3", "Best Seller"],
      ["Whistle & Horn Blow Set", 1100, "Safe blow toys that build breath support for clearer speech.", "🎺", "3-5", ""],
      ["Therapy Straws Variety Pack", 850, "Different straw shapes and thicknesses for lip closure and sucking practice.", "🥤", "1-3", "Therapist Pick"],
      ["Vibrating Oral Massager", 1950, "Gentle vibration to wake up lips, cheeks and tongue before speech work.", "🪥", "3-5", ""],
      ["Blow Pinwheel Set", 700, "Colourful pinwheels that reward steady, controlled blowing.", "🎡", "1-3", "Sale"],
      ["Feather Blowing Race Game", 1250, "Race feathers across the table to practise long, smooth breaths.", "🪶", "3-5", "New"],
      ["Ping Pong Blow Race Set", 1450, "Blow the ball through a track to train breath power and focus.", "🏓", "3-5", ""],
      ["Lip Trainer Button Set", 1050, "Hold-and-pull buttons that strengthen lip muscles in a playful way.", "🔘", "3-5", ""],
      ["Chewy Sensory Necklace", 1250, "Safe chew necklace that supports oral sensory needs on the go.", "📿", "5+", "Best Seller"],
      ["Party Blowouts Fun Pack", 600, "Pack of blowouts that make breath practice feel like a party.", "🎉", "1-3", "Sale"],
    ],
  },
  "Children's Books": {
    icon: BookOpen,
    grad: "from-amber-300 to-orange-400",
    items: [
      ["My First Words Picture Book", 1250, "Bright everyday pictures with big labels to build early vocabulary.", "📖", "1-3", "Best Seller"],
      ["Animal Sounds Board Book", 1050, "Sturdy pages with animals and sounds that invite kids to copy.", "🐮", "1-3", ""],
      ["Alphabet Sounds Phonics Book", 1650, "Each letter with its sound and sample words for early phonics.", "🔤", "3-5", "Therapist Pick"],
      ["Urdu Alphabet Picture Book", 1350, "Urdu haroof with large pictures, ideal for bilingual families.", "📘", "3-5", "New"],
      ["Daily Routines Story Book", 1450, "Simple stories about brushing, eating and bedtime to teach sequences.", "🌅", "3-5", ""],
      ["Feelings & Emotions Book", 1550, "Helps kids name feelings and say how they feel in words.", "😊", "3-5", "Therapist Pick"],
      ["Rhymes & Songs Collection", 1750, "Classic rhymes with actions that improve rhythm and memory.", "🎵", "1-3", ""],
      ["Touch & Feel Sensory Book", 1850, "Textured pages that combine touch with new words.", "🖐️", "1-3", "Sale"],
      ["Colours & Shapes Board Book", 950, "Bold pages that make learning basic concepts easy.", "🔷", "1-3", ""],
      ["Lift-the-Flap Questions Book", 1650, "Who, what and where questions hidden under flaps to boost language.", "❓", "5+", "New"],
    ],
  },
  "Flashcards & Games": {
    icon: Layers,
    grad: "from-sky-400 to-indigo-500",
    items: [
      ["Articulation Sound Flashcards", 1850, "Cards grouped by sound position for targeted articulation practice.", "🃏", "3-5", "Therapist Pick"],
      ["Picture Vocabulary Flashcards", 1450, "200 clear photo cards covering everyday objects and places.", "🖼️", "1-3", "Best Seller"],
      ["Action Verbs Cards", 1250, "Cards showing everyday actions to build verb and sentence skills.", "🏃", "3-5", ""],
      ["Opposites Matching Cards", 1150, "Match pairs like big/small and hot/cold to grow concept words.", "↔️", "3-5", ""],
      ["Sequencing Story Cards", 1650, "Put picture steps in order and tell the story in full sentences.", "🧾", "5+", "New"],
      ["Category Sorting Game", 1750, "Sort animals, foods and vehicles to improve language organisation.", "🗂️", "3-5", ""],
      ["Emotions Cards Set", 1350, "Expressive faces and prompts for talking about feelings.", "🙂", "3-5", "Sale"],
      ["Urdu Words Flashcards", 1250, "Common Urdu words with pictures for home and clinic practice.", "🔠", "1-3", "New"],
      ["Memory Match Game", 1450, "Classic memory pairs that train attention and recall.", "🎴", "3-5", ""],
      ["Who-What-Where Question Cards", 1550, "Practise answering wh-questions with real-life picture scenes.", "💬", "5+", "Therapist Pick"],
    ],
  },
  "Sensory & Play Therapy": {
    icon: Palette,
    grad: "from-rose-400 to-pink-500",
    items: [
      ["Fidget Sensory Kit", 1650, "Assorted fidgets that help children stay calm and focused.", "🎈", "3-5", "Best Seller"],
      ["Kinetic Sand Play Set", 2450, "Soft moldable sand for calming hands-on sensory play.", "🏖️", "3-5", ""],
      ["Playdough Therapy Kit", 1850, "Dough with tools for hand strength and imaginative play.", "🎨", "3-5", "Therapist Pick"],
      ["Sensory Bin Starter Set", 2950, "Bin with scoops and fillers for exploring textures and words.", "🪣", "1-3", "New"],
      ["Weighted Lap Pad", 3950, "Gentle deep-pressure comfort for calm seated activities.", "🛋️", "5+", ""],
      ["Textured Sensory Balls", 1350, "Set of bumpy and soft balls for tactile exploration.", "⚽", "1-3", ""],
      ["Liquid Motion Timer Set", 1550, "Mesmerising timers that soothe and teach waiting skills.", "⏳", "3-5", "Sale"],
      ["Stretchy Tube Fidget Pack", 750, "Pull-and-stretch tubes for quiet, discreet fidgeting.", "🌀", "3-5", ""],
      ["Hand Puppet Family Set", 2250, "Family puppets for storytelling and social play therapy.", "🧸", "3-5", "Best Seller"],
      ["Calm Down Jar Kit", 1150, "Make a glitter jar that teaches kids to breathe and settle.", "✨", "3-5", "New"],
    ],
  },
  "ABA & OT Learning Aids": {
    icon: Brain,
    grad: "from-emerald-400 to-teal-600",
    items: [
      ["Token Board Reward Chart", 1450, "Earn tokens for good behaviour and trade them for rewards.", "⭐", "3-5", "Therapist Pick"],
      ["Visual Schedule Cards", 1650, "Picture cards to show the day's routine and reduce anxiety.", "📅", "3-5", "Best Seller"],
      ["Lacing Beads Set", 1250, "Chunky beads and laces for fine motor and eye-hand skills.", "📿", "1-3", ""],
      ["Stacking & Nesting Blocks", 1550, "Blocks for sizes, counting and early problem solving.", "🧱", "1-3", ""],
      ["Shape Sorter Cube", 1350, "Classic sorter that teaches shapes and matching.", "🔶", "1-3", "Sale"],
      ["Pegboard Fine Motor Set", 1850, "Colourful pegs and patterns for pincer grip practice.", "📍", "3-5", "New"],
      ["Pencil Grip Starter Pack", 650, "Soft grips that help children hold a pencil correctly.", "✏️", "5+", ""],
      ["Matching Pairs Puzzle", 1150, "Chunky puzzles for matching and visual perception.", "🧠", "1-3", ""],
      ["Reward Stickers Pack (500 pcs)", 550, "Bright stickers to celebrate every small win.", "🏅", "3-5", "Best Seller"],
      ["Visual Sand Timer Set", 950, "Show how long an activity lasts to ease transitions.", "⌛", "3-5", ""],
    ],
  },
};

const CATEGORIES = Object.keys(CATALOG);

const roundTo50 = (n) => Math.round(n / 50) * 50;

const PRODUCTS = (() => {
  let id = 0;
  const list = [];
  CATEGORIES.forEach((cat) => {
    CATALOG[cat].items.forEach(([name, price, description, emoji, age, tag]) => {
      id += 1;
      list.push({
        id,
        name,
        price,
        oldPrice: tag === "Sale" ? roundTo50(price * 1.25) : null,
        description,
        emoji,
        age,
        tag,
        category: cat,
        grad: CATALOG[cat].grad,
        image: null,
      });
    });
  });
  return list;
})();

const MAX_PRICE = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 500) * 500;
const AGE_OPTIONS = [
  { key: "all", label: "All Ages" },
  { key: "1-3", label: "1–3 yrs" },
  { key: "3-5", label: "3–5 yrs" },
  { key: "5+", label: "5+ yrs" },
];
const PAGE_SIZE = 12;

const TAG_STYLES = {
  "Best Seller": "bg-amber-400 text-slate-900",
  "New": "bg-emerald-500 text-white",
  "Therapist Pick": "bg-[#162C5A] text-white",
  "Sale": "bg-red-500 text-white",
};

const HERO_TILES = [
  { emoji: "🫧", label: "Oral Motor", grad: "from-fuchsia-400 to-purple-500" },
  { emoji: "📚", label: "Story Books", grad: "from-amber-300 to-orange-400" },
  { emoji: "🧩", label: "Speech Toys", grad: "from-teal-400 to-cyan-500" },
  { emoji: "🃏", label: "Flashcards", grad: "from-sky-400 to-indigo-500" },
];

const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ---------- Small helpers ----------
const safeLoad = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
const safeSave = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
};

const ProductVisual = ({ p, className = "", emojiClass = "text-6xl" }) => (
  <div className={`relative overflow-hidden bg-gradient-to-br ${p.grad} flex items-center justify-center ${className}`}>
    {p.image ? (
      <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
    ) : (
      <>
        <span className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/20" />
        <span className="absolute -bottom-10 -right-6 w-40 h-40 rounded-full bg-white/10" />
        <span className={`relative drop-shadow-lg ${emojiClass}`}>{p.emoji}</span>
      </>
    )}
  </div>
);

// ============================================================
//  MAIN COMPONENT
// ============================================================
export default function ShopPage() {
  const [cart, setCart] = useState(() => safeLoad("rex_shop_cart", []));
  const [wishlist, setWishlist] = useState(() => safeLoad("rex_shop_wishlist", []));
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [age, setAge] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [showFilters, setShowFilters] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast] = useState("");
  const [step, setStep] = useState("shop"); // shop | checkout | success
  const [orderInfo, setOrderInfo] = useState(null);

  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", city: "Lahore", address: "", notes: "", payment: "cod",
  });

  useEffect(() => safeSave("rex_shop_cart", cart), [cart]);
  useEffect(() => safeSave("rex_shop_wishlist", wishlist), [wishlist]);
  useEffect(() => { setVisible(PAGE_SIZE); }, [category, search, maxPrice, age, sortBy]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  // ----- cart logic -----
  const addToCart = (product, qty = 1, openDrawer = true) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + qty } : i));
      return [...prev, { id: product.id, quantity: qty }];
    });
    flash(`${product.name} added to cart`);
    if (openDrawer) setIsCartOpen(true);
  };
  const changeQty = (id, delta) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i)).filter((i) => i.quantity > 0)
    );
  const removeItem = (id) => { setCart((prev) => prev.filter((i) => i.id !== id)); flash("Item removed"); };
  const toggleWish = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const cartItems = useMemo(
    () => cart.map((c) => ({ ...PRODUCTS.find((p) => p.id === c.id), quantity: c.quantity })).filter((i) => i.id),
    [cart]
  );
  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const freeLeft = Math.max(0, FREE_SHIPPING_ABOVE - subtotal);
  const freeProgress = Math.min(100, (subtotal / FREE_SHIPPING_ABOVE) * 100);

  // ----- filtering -----
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const score = (p) => (p.tag === "Best Seller" ? 3 : p.tag === "Therapist Pick" ? 2 : p.tag === "New" ? 1 : 0);
    return PRODUCTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (age !== "all" && p.age !== age) return false;
      if (p.price > maxPrice) return false;
      if (q && !(p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "low-high") return a.price - b.price;
      if (sortBy === "high-low") return b.price - a.price;
      if (sortBy === "newest") return (b.tag === "New") - (a.tag === "New");
      if (sortBy === "sale") return (b.oldPrice ? 1 : 0) - (a.oldPrice ? 1 : 0);
      return score(b) - score(a) || a.id - b.id;
    });
  }, [category, search, maxPrice, age, sortBy]);

  const resetFilters = () => { setCategory("All"); setSearch(""); setMaxPrice(MAX_PRICE); setAge("all"); setSortBy("featured"); };

  const goToShop = (cat) => {
    if (cat) setCategory(cat);
    setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  // ----- checkout -----
  const buildOrderText = (order) => {
    const lines = order.items.map((i) => `• ${i.name} x${i.quantity} = ${money(i.price * i.quantity)}`).join("\n");
    return `Assalam o Alaikum! I would like to place an order.\n\nOrder ID: ${order.id}\n${lines}\n\nSubtotal: ${money(order.subtotal)}\nShipping: ${order.shipping ? money(order.shipping) : "Free"}\nTotal: ${money(order.total)}\n\nName: ${order.customer.fullName}\nPhone: ${order.customer.phone}\nCity: ${order.customer.city}\nAddress: ${order.customer.address}\nPayment: ${order.customer.payment === "cod" ? "Cash on Delivery" : "Bank Transfer / Easypaisa / JazzCash"}${order.customer.notes ? `\nNotes: ${order.customer.notes}` : ""}`;
  };

  const submitOrder = (e) => {
    e.preventDefault();
    const order = {
      id: `RX-${Date.now().toString().slice(-6)}`,
      items: cartItems.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
      subtotal, shipping, total, customer: { ...form },
    };
    setOrderInfo(order);
    setCart([]);
    setStep("success");
  };

  const askAboutCart = () => {
    const lines = cartItems.map((i) => `• ${i.name} x${i.quantity}`).join("\n");
    window.open(waLink(`Assalam o Alaikum! I need help with these items:\n${lines}`), "_blank", "noopener");
  };

  const inputCls = "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition";

  // ============================================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
      <style>{`
        @keyframes rxTicker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .rx-ticker { animation: rxTicker 30s linear infinite; }
        .rx-ticker-wrap:hover .rx-ticker { animation-play-state: paused; }
        @keyframes rxPing { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(1.9); opacity: 0; } }
        .rx-ping { animation: rxPing 2s ease-out infinite; }
      `}</style>

      {/* ============ FLOATING WHATSAPP (LEFT) ============ */}
      <a
        href={waLink("Assalam o Alaikum! I have a question about your speech therapy products.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-6 left-4 sm:left-6 z-40 flex items-center"
      >
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-600/40 transition-transform duration-300 group-hover:scale-110">
          <span className="absolute inset-0 rounded-full bg-[#25D366] rx-ping" />
          <WhatsAppIcon className="relative w-7 h-7" />
        </span>
        <span className="ml-3 hidden sm:block bg-white text-slate-800 text-xs font-bold px-4 py-2 rounded-full shadow-xl border border-slate-100 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
          Chat with us
        </span>
      </a>

      {/* ============ FLOATING CART (RIGHT) ============ */}
      {step === "shop" && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsCartOpen(true)}
          aria-label="Open cart"
          className="fixed bottom-6 right-4 sm:right-6 z-40 w-14 h-14 rounded-full bg-[#271E38] text-white shadow-2xl flex items-center justify-center border border-white/20 cursor-pointer hover:bg-teal-600 transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-red-500 text-[11px] font-bold flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}

      {/* ============ TOAST ============ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-24 sm:bottom-8 left-1/2 z-[60] bg-[#271E38] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 max-w-[90vw]"
          >
            <span className="w-6 h-6 rounded-full bg-teal-400 text-[#271E38] flex items-center justify-center flex-shrink-0"><Check className="w-4 h-4" /></span>
            <span className="text-sm font-semibold truncate">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          SHOP VIEW
      ============================================================ */}
      {step === "shop" && (
        <>
          {/* ---------- HERO ---------- */}
          <section className="relative w-full bg-[#271E38] text-white overflow-hidden rounded-none sm:rounded-[2.5rem] my-0 sm:my-6 border-y sm:border border-white/10 max-w-[1400px] mx-auto">
            <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-teal-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-fuchsia-400/15 blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-6 text-left z-10"
              >
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-teal-300 mb-6 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5" /> Rex Therapy Store
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight mb-6">
                  Speech therapy <span className="italic font-semibold text-teal-400">toys, books</span> &amp; tools for little talkers
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-medium">
                  Carefully chosen exercise toys, story books, flashcards and oral motor tools that make speech practice fun at home and in therapy.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <button
                    onClick={() => goToShop("All")}
                    className="relative overflow-hidden inline-flex items-center gap-4 bg-[#EAF7F3] text-[#1E252B] font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                  >
                    <span className="absolute top-0 -left-full w-full h-full bg-white/40 -skew-x-12 group-hover:left-full transition-all duration-700 ease-in-out" />
                    <span className="relative z-10">Shop All Products</span>
                    <span className="relative z-10 w-8 h-8 rounded-full bg-[#271E38] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                  <a
                    href={waLink("Assalam o Alaikum! Please help me choose the right speech therapy products for my child.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-[#25D366] border border-white/20 hover:border-[#25D366] text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-1"
                  >
                    <WhatsAppIcon className="w-5 h-5" /> Ask a Therapist
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-md">
                  {[
                    { n: "60+", l: "Therapy products" },
                    { n: "6", l: "Categories" },
                    { n: "4.8★", l: "Google rating" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.l}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.12 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-3.5 hover:bg-white/10 hover:border-teal-400/40 transition-all duration-300"
                    >
                      <div className="font-serif text-xl sm:text-2xl font-bold text-white">{s.n}</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5">{s.l}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Hero visual */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="lg:col-span-6 relative max-w-md w-full mx-auto"
              >
                <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-teal-400/20 via-transparent to-purple-400/20 blur-2xl pointer-events-none" />
                <div className="relative grid grid-cols-2 gap-4">
                  {HERO_TILES.map((t, i) => (
                    <motion.button
                      key={t.label}
                      onClick={() => goToShop()}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4 + i * 0.6, delay: i * 0.4, ease: "easeInOut" }}
                      whileHover={{ scale: 1.06, rotate: i % 2 ? -2 : 2 }}
                      className={`rounded-3xl p-6 bg-gradient-to-br ${t.grad} shadow-2xl text-left cursor-pointer border border-white/20 ${i % 2 ? "mt-8" : ""}`}
                    >
                      <div className="text-5xl sm:text-6xl drop-shadow-lg">{t.emoji}</div>
                      <div className="mt-4 text-sm font-bold text-white drop-shadow">{t.label}</div>
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-4 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-slate-800 shadow-xl"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> Therapist Approved
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-5 left-2 sm:-left-4 bg-[#EAF7F3] text-[#271E38] rounded-2xl pl-3.5 pr-5 py-3 flex items-center gap-3 shadow-xl border border-white/40"
                >
                  <span className="w-10 h-10 rounded-xl bg-[#271E38] text-teal-300 flex items-center justify-center"><Truck className="w-5 h-5" /></span>
                  <div className="leading-tight">
                    <div className="text-sm font-bold">Free Delivery</div>
                    <div className="text-[10px] font-semibold text-[#271E38]/70">above {money(FREE_SHIPPING_ABOVE)}</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ---------- TRUST STRIP ---------- */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: ShieldCheck, t: "Therapist Approved", d: "Picked by speech pathologists", c: "text-emerald-600 bg-emerald-50" },
                { icon: Truck, t: "Fast Delivery", d: `Free above ${money(FREE_SHIPPING_ABOVE)}`, c: "text-teal-600 bg-teal-50" },
                { icon: Banknote, t: "Cash on Delivery", d: "Pay when you receive", c: "text-amber-600 bg-amber-50" },
                { icon: Headphones, t: "WhatsApp Support", d: "Guidance for every child", c: "text-indigo-600 bg-indigo-50" },
              ].map((f, i) => (
                <motion.div
                  key={f.t}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group flex items-center gap-3.5 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300"
                >
                  <span className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${f.c} group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="w-6 h-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900">{f.t}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">{f.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ---------- CATEGORIES ---------- */}
          <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-3">Shop by Category</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                Everything for <span className="italic text-teal-600">speech &amp; play</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIES.map((cat, i) => {
                const Icon = CATALOG[cat].icon;
                const active = category === cat;
                return (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    whileHover={{ y: -8 }}
                    onClick={() => goToShop(cat)}
                    className={`group relative overflow-hidden rounded-3xl p-5 text-center border transition-all duration-300 cursor-pointer ${active ? "border-teal-500 shadow-xl bg-white" : "border-slate-100 bg-white shadow-sm hover:shadow-xl hover:border-teal-300"}`}
                  >
                    <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${CATALOG[cat].grad}`} />
                    <div className={`mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br ${CATALOG[cat].grad} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">{cat}</h3>
                    <span className="text-xs text-slate-500 mt-1 block">{CATALOG[cat].items.length} Products</span>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* ---------- SHOP ---------- */}
          <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 scroll-mt-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
            >
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-3">Our Products</span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                  Find the <span className="italic text-teal-600">perfect fit</span>
                </h2>
              </div>
              <button
                onClick={() => setShowFilters((s) => !s)}
                className="lg:hidden inline-flex items-center justify-center gap-2 bg-[#271E38] text-white px-5 py-3 rounded-full text-sm font-semibold cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" /> {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters */}
              <aside className={`${showFilters ? "block" : "hidden"} lg:block lg:col-span-1`}>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:sticky lg:top-24 space-y-7">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="font-black text-base text-slate-900 flex items-center gap-2"><SlidersHorizontal className="w-4 h-4 text-teal-600" /> Filters</h3>
                    <button onClick={resetFilters} className="text-xs font-bold text-teal-600 hover:text-red-600 transition-colors cursor-pointer">Clear All</button>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search toys, books..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">Category</label>
                    <div className="space-y-1.5">
                      {["All", ...CATEGORIES].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`w-full flex items-center justify-between text-left text-sm px-3 py-2 rounded-xl transition-all cursor-pointer ${category === cat ? "bg-[#271E38] text-white font-semibold" : "text-slate-700 hover:bg-teal-50 hover:text-teal-700"}`}
                        >
                          <span>{cat === "All" ? "All Products" : cat}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${category === cat ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>
                            {cat === "All" ? PRODUCTS.length : CATALOG[cat].items.length}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">Child's Age</label>
                    <div className="flex flex-wrap gap-2">
                      {AGE_OPTIONS.map((a) => (
                        <button
                          key={a.key}
                          onClick={() => setAge(a.key)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${age === a.key ? "bg-teal-500 text-white border-teal-500" : "bg-white text-slate-600 border-slate-200 hover:border-teal-400 hover:text-teal-700"}`}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      <span>Max Price</span><span className="text-teal-600">{money(maxPrice)}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max={MAX_PRICE}
                      step="50"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />
                  </div>
                </div>
              </aside>

              {/* Grid */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
                  <span className="text-sm font-semibold text-slate-500">
                    Showing <strong className="text-slate-900">{Math.min(visible, filtered.length)}</strong> of <strong className="text-slate-900">{filtered.length}</strong> products
                  </span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-slate-50 border border-slate-200 text-sm font-semibold rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:border-teal-500 cursor-pointer"
                    >
                      <option value="featured">Sort: Featured</option>
                      <option value="newest">Sort: Newest</option>
                      <option value="sale">Sort: On Sale</option>
                      <option value="low-high">Price: Low to High</option>
                      <option value="high-low">Price: High to Low</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {filtered.length === 0 ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl border border-slate-100 p-16 text-center">
                    <div className="text-6xl mb-4">🧸</div>
                    <h3 className="text-xl font-bold text-slate-900">No products found</h3>
                    <p className="text-sm text-slate-500 mt-1 mb-6">Try changing your search or filters.</p>
                    <button onClick={resetFilters} className="bg-[#162C5A] hover:bg-red-600 text-white px-7 py-3 rounded-full text-sm font-semibold transition-colors cursor-pointer">Reset Filters</button>
                  </motion.div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filtered.slice(0, visible).map((p, idx) => {
                        const wished = wishlist.includes(p.id);
                        return (
                          <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                            whileHover={{ y: -8 }}
                            className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-teal-300 transition-all duration-300 flex flex-col"
                          >
                            <div className="relative">
                              <ProductVisual
                                p={p}
                                className="h-52"
                                emojiClass="text-7xl transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6"
                              />
                              {p.tag && (
                                <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow ${TAG_STYLES[p.tag]}`}>{p.tag}</span>
                              )}
                              <button
                                onClick={() => toggleWish(p.id)}
                                aria-label="Wishlist"
                                className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform ${wished ? "text-red-500" : "text-slate-400"}`}
                              >
                                <Heart className={`w-4 h-4 ${wished ? "fill-red-500" : ""}`} />
                              </button>
                              <button
                                onClick={() => setQuickView(p)}
                                className="absolute bottom-0 inset-x-0 bg-[#271E38]/90 backdrop-blur text-white text-xs font-bold py-2.5 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-pointer"
                              >
                                <Eye className="w-4 h-4" /> Quick View
                              </button>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wide">{p.category}</span>
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                  <Users className="w-3 h-3" /> {p.age === "5+" ? "5+ yrs" : `${p.age} yrs`}
                                </span>
                              </div>
                              <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug mb-1.5 group-hover:text-teal-700 transition-colors">{p.name}</h3>
                              <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{p.description}</p>

                              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                                <div>
                                  <div className="text-lg font-black text-[#162C5A]">{money(p.price)}</div>
                                  {p.oldPrice && <div className="text-xs text-slate-400 line-through">{money(p.oldPrice)}</div>}
                                </div>
                                <button
                                  onClick={() => addToCart(p)}
                                  className="relative overflow-hidden bg-[#162C5A] hover:bg-red-600 text-white text-xs font-bold px-4 py-3 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg group/btn"
                                >
                                  <span className="absolute top-0 -left-full w-full h-full bg-white/20 -skew-x-12 group-hover/btn:left-full transition-all duration-700" />
                                  <ShoppingCart className="w-4 h-4 relative z-10" />
                                  <span className="relative z-10">Add</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {visible < filtered.length && (
                      <div className="flex justify-center pt-4">
                        <button
                          onClick={() => setVisible((v) => v + PAGE_SIZE)}
                          className="relative overflow-hidden inline-flex items-center gap-4 bg-[#271E38] hover:bg-teal-600 text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                        >
                          <span className="absolute top-0 -left-full w-full h-full bg-white/15 -skew-x-12 group-hover:left-full transition-all duration-700" />
                          <span className="relative z-10">Load More Products</span>
                          <ChevronDown className="w-4 h-4 relative z-10" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>

          {/* ---------- WHATSAPP PROMO BANNER ---------- */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative py-16 px-6 sm:px-12 bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-400 text-white overflow-hidden shadow-xl rounded-[2.5rem]"
            >
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-900/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 text-left">
                  <p className="text-xs sm:text-sm uppercase tracking-widest font-bold text-teal-100 mb-3">Not sure what to choose?</p>
                  <h2 className="font-serif text-2xl sm:text-4xl font-normal leading-snug tracking-tight">
                    Our speech therapists will help you pick the <span className="italic font-semibold">right toys &amp; books</span> for your child.
                  </h2>
                </div>
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                  <a
                    href={waLink("Assalam o Alaikum! Please recommend speech therapy products for my child.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5b] text-white text-sm font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <span className="absolute top-0 -left-full w-full h-full bg-white/20 -skew-x-12 group-hover:left-full transition-all duration-700" />
                    <WhatsAppIcon className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Chat on WhatsApp</span>
                  </a>
                  <Link
                    to="/book-a-free-consult"
                    className="inline-flex items-center justify-center gap-2 bg-[#1c296b] hover:bg-red-600 text-white text-sm font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    Book Free Consultation <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>
        </>
      )}

      {/* ============================================================
          CHECKOUT
      ============================================================ */}
      {step === "checkout" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button onClick={() => setStep("shop")} className="mb-6 text-sm font-bold text-teal-600 hover:text-red-600 transition-colors cursor-pointer">← Back to Store</button>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Checkout</h2>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-16 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-bold">Your cart is empty</h3>
              <button onClick={() => setStep("shop")} className="mt-6 bg-[#162C5A] hover:bg-red-600 text-white px-7 py-3 rounded-full text-sm font-semibold cursor-pointer transition-colors">Start Shopping</button>
            </div>
          ) : (
            <form onSubmit={submitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
                  <h3 className="font-bold text-lg flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-teal-600" /> Delivery Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-slate-500 mb-1 block">Full Name</label><input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className={inputCls} /></div>
                    <div><label className="text-xs font-bold text-slate-500 mb-1 block">Phone / WhatsApp</label><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="03XX XXXXXXX" className={inputCls} /></div>
                    <div><label className="text-xs font-bold text-slate-500 mb-1 block">Email (optional)</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} /></div>
                    <div><label className="text-xs font-bold text-slate-500 mb-1 block">City</label><input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} /></div>
                    <div className="sm:col-span-2"><label className="text-xs font-bold text-slate-500 mb-1 block">Full Address</label><input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputCls} /></div>
                    <div className="sm:col-span-2"><label className="text-xs font-bold text-slate-500 mb-1 block">Order Notes (optional)</label><textarea rows="3" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputCls} /></div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2"><Banknote className="w-5 h-5 text-teal-600" /> Payment Method</h3>
                  {[
                    { k: "cod", t: "Cash on Delivery", d: "Pay in cash when your order arrives." },
                    { k: "transfer", t: "Bank Transfer / Easypaisa / JazzCash", d: "We will share account details on WhatsApp after you confirm." },
                  ].map((o) => (
                    <label
                      key={o.k}
                      className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${form.payment === o.k ? "border-teal-500 bg-teal-50/60 shadow-sm" : "border-slate-200 hover:border-teal-300"}`}
                    >
                      <input type="radio" name="payment" checked={form.payment === o.k} onChange={() => setForm({ ...form, payment: o.k })} className="mt-1 accent-teal-500" />
                      <div>
                        <div className="font-bold text-sm text-slate-900">{o.t}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{o.d}</div>
                      </div>
                    </label>
                  ))}
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm lg:sticky lg:top-24 space-y-6">
                  <h3 className="font-bold text-lg pb-4 border-b border-slate-100">Order Summary</h3>
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <ProductVisual p={item} className="w-14 h-14 rounded-xl flex-shrink-0" emojiClass="text-2xl" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm truncate">{item.name}</h4>
                          <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                        </div>
                        <span className="font-bold text-sm">{money(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
                    <div className="flex justify-between text-slate-500"><span>Subtotal</span><span className="font-semibold text-slate-900">{money(subtotal)}</span></div>
                    <div className="flex justify-between text-slate-500"><span>Shipping</span><span className={`font-semibold ${shipping ? "text-slate-900" : "text-emerald-600"}`}>{shipping ? money(shipping) : "Free"}</span></div>
                    <div className="flex justify-between text-lg font-black pt-3 border-t border-slate-100"><span>Total</span><span className="text-[#162C5A]">{money(total)}</span></div>
                  </div>
                  <button type="submit" className="w-full bg-[#162C5A] hover:bg-red-600 text-white py-4 rounded-full font-bold text-base shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2">
                    Place Order <Lock className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ============================================================
          SUCCESS
      ============================================================ */}
      {step === "success" && orderInfo && (
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 sm:p-12 rounded-[2rem] border border-slate-100 shadow-2xl space-y-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Package className="w-9 h-9" />
            </motion.div>
            <h2 className="font-serif text-3xl font-bold text-slate-900">Order Received!</h2>
            <p className="text-sm text-slate-500">
              Thank you {orderInfo.customer.fullName}. Please confirm your order on WhatsApp so our team can process it quickly.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl text-left space-y-3 border border-slate-100">
              <div className="flex justify-between text-sm"><span className="text-slate-500">Order Number</span><strong>{orderInfo.id}</strong></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Payment</span><strong>{orderInfo.customer.payment === "cod" ? "Cash on Delivery" : "Bank / Easypaisa / JazzCash"}</strong></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Total</span><strong className="text-[#162C5A]">{money(orderInfo.total)}</strong></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={waLink(buildOrderText(orderInfo))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5b] text-white py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 shadow-lg"
              >
                <WhatsAppIcon className="w-5 h-5" /> Confirm on WhatsApp
              </a>
              <button onClick={() => setStep("shop")} className="flex-1 bg-[#162C5A] hover:bg-red-600 text-white py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 cursor-pointer">
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ============================================================
          QUICK VIEW MODAL
      ============================================================ */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-[#271E38]/70 backdrop-blur-sm" onClick={() => setQuickView(null)} />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[92vh] overflow-y-auto"
            >
              <button onClick={() => setQuickView(null)} aria-label="Close" className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-slate-500 hover:text-red-500 hover:rotate-90 transition-all cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <ProductVisual p={quickView} className="h-64 md:h-full min-h-[260px]" emojiClass="text-8xl" />
              <div className="p-7 sm:p-8 flex flex-col text-left">
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wide">{quickView.category}</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1 leading-snug">{quickView.name}</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {quickView.tag && <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${TAG_STYLES[quickView.tag]}`}>{quickView.tag}</span>}
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                    <Users className="w-3 h-3" /> Ages {quickView.age === "5+" ? "5+" : quickView.age} yrs
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mt-4">{quickView.description}</p>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-[#162C5A]">{money(quickView.price)}</span>
                  {quickView.oldPrice && <span className="text-sm text-slate-400 line-through">{money(quickView.oldPrice)}</span>}
                </div>
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => { addToCart(quickView); setQuickView(null); }}
                    className="w-full bg-[#162C5A] hover:bg-red-600 text-white py-3.5 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-lg cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                  <a
                    href={waLink(`Assalam o Alaikum! I want to order: ${quickView.name} (${money(quickView.price)})`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white py-3.5 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-lg"
                  >
                    <WhatsAppIcon className="w-5 h-5" /> Order on WhatsApp
                  </a>
                  <button
                    onClick={() => toggleWish(quickView.id)}
                    className="w-full border border-slate-200 hover:border-red-300 text-slate-600 hover:text-red-500 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(quickView.id) ? "fill-red-500 text-red-500" : ""}`} />
                    {wishlist.includes(quickView.id) ? "Saved to Wishlist" : "Save to Wishlist"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          CART DRAWER
      ============================================================ */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#271E38]/60 backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#271E38] text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-teal-300" /> Your Cart ({itemCount})
                </h3>
                <button onClick={() => setIsCartOpen(false)} aria-label="Close cart" className="text-slate-300 hover:text-white hover:rotate-90 transition-all cursor-pointer"><X className="w-5 h-5" /></button>
              </div>

              {cartItems.length > 0 && (
                <div className="px-6 pt-5">
                  <p className="text-xs font-semibold text-slate-600 mb-2">
                    {freeLeft > 0 ? <>Add <strong className="text-teal-600">{money(freeLeft)}</strong> more for free delivery</> : <span className="text-emerald-600">🎉 You've unlocked free delivery!</span>}
                  </p>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${freeProgress}%` }} transition={{ duration: 0.6 }} className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500" />
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20 text-slate-500">
                    <div className="text-6xl mb-4">🧺</div>
                    <h4 className="font-bold text-lg text-slate-900">Your cart is empty</h4>
                    <p className="text-sm mt-1">Add some therapy toys and books!</p>
                    <button onClick={() => setIsCartOpen(false)} className="mt-6 bg-[#162C5A] hover:bg-red-600 text-white px-7 py-3 rounded-full text-sm font-semibold transition-colors cursor-pointer">Start Shopping</button>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 60 }}
                        className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-4 relative hover:border-teal-300 transition-colors"
                      >
                        <ProductVisual p={item} className="w-16 h-16 rounded-xl flex-shrink-0" emojiClass="text-3xl" />
                        <div className="flex-1 min-w-0 pr-6">
                          <span className="text-[10px] font-bold text-teal-600 uppercase">{item.category}</span>
                          <h4 className="font-bold text-sm truncate">{item.name}</h4>
                          <div className="text-[#162C5A] font-black text-sm my-1">{money(item.price * item.quantity)}</div>
                          <div className="flex items-center gap-3 mt-1">
                            <button onClick={() => changeQty(item.id, -1)} aria-label="Decrease" className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:border-teal-400 hover:text-teal-600 transition cursor-pointer"><Minus className="w-3 h-3" /></button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => changeQty(item.id, 1)} aria-label="Increase" className="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:border-teal-400 hover:text-teal-600 transition cursor-pointer"><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} aria-label="Remove" className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-3">
                  <div className="flex justify-between text-sm text-slate-500"><span>Subtotal</span><strong className="text-slate-900">{money(subtotal)}</strong></div>
                  <div className="flex justify-between text-sm text-slate-500"><span>Shipping</span><strong className={shipping ? "text-slate-900" : "text-emerald-600"}>{shipping ? money(shipping) : "Free"}</strong></div>
                  <div className="flex justify-between text-base font-black pt-3 border-t border-slate-200"><span>Total</span><span className="text-[#162C5A]">{money(total)}</span></div>
                  <button
                    onClick={() => { setIsCartOpen(false); setStep("checkout"); }}
                    className="w-full bg-[#162C5A] hover:bg-red-600 text-white py-4 rounded-full font-bold shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={askAboutCart}
                    className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white py-3.5 rounded-full font-bold transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 text-sm"
                  >
                    <WhatsAppIcon className="w-5 h-5" /> Ask about these items
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}