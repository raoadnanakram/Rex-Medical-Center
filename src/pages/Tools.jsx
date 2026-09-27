import React, { useState, useEffect } from 'react';
import { 
  Wrench, Search, Heart, ShoppingCart, Star, SlidersHorizontal, 
  X, Plus, Minus, Trash2, ArrowRight, Check, ShieldCheck, 
  Truck, RotateCcw, Headphones, Menu, ChevronRight, Lock, CreditCard, Sparkles 
} from 'lucide-react';

// Categories List
const CATEGORIES = ["Hand Tools", "Power Tools", "Measuring", "Safety Gear", "Hardware", "Storage"];

// 50 Realistic Tool Products Generator
const GENERATE_PRODUCTS = () => {
  const productTemplates = [
    { name: "Professional Hammer", cat: "Hand Tools", basePrice: 29.99, img: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=500&q=80", desc: "Forged steel head with shock-absorbing ergonomic rubber grip." },
    { name: "Cordless Drill", cat: "Power Tools", basePrice: 149.99, img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80", desc: "High-torque dual-speed motor with fast-charging lithium-ion battery." },
    { name: "Digital Measuring Tape", cat: "Measuring", basePrice: 39.99, img: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=500&q=80", desc: "Laser precision digital readout with rugged rubberized casing." },
    { name: "Safety Helmet", cat: "Safety Gear", basePrice: 24.99, img: "https://images.unsplash.com/photo-1541888946425-d0fbb18f1f3d?auto=format&fit=crop&w=500&q=80", desc: "ANSI certified industrial protection helmet with adjustable suspension." },
    { name: "Heavy Duty Tool Box", cat: "Storage", basePrice: 79.99, img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=500&q=80", desc: "Weather-resistant waterproof container with modular compartment trays." },
    { name: "Electric Impact Wrench", cat: "Power Tools", basePrice: 189.99, img: "https://images.unsplash.com/photo-1508873696983-2df5c920ac1c?auto=format&fit=crop&w=500&q=80", desc: "Heavy-duty fastening performance with variable speed trigger." },
    { name: "Precision Screwdriver Set", cat: "Hand Tools", basePrice: 34.99, img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=500&q=80", desc: "Magnetic chrome-vanadium steel bits for electronics and DIY." },
    { name: "Angle Grinder", cat: "Power Tools", basePrice: 99.99, img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80", desc: "Powerful motor designed for rapid cutting, grinding, and polishing." }
  ];

  return Array.from({ length: 50 }, (_, i) => {
    const template = productTemplates[i % productTemplates.length];
    const price = Number((template.basePrice + (i * 1.5)).toFixed(2));
    const oldPrice = Number((price * 1.25).toFixed(2));
    const cat = CATEGORIES[i % CATEGORIES.length];
    return {
      id: i + 1,
      name: `${template.name} Pro-${i + 1}`,
      category: cat,
      price: price,
      oldPrice: oldPrice,
      discount: `${Math.floor((1 - price/oldPrice) * 100)}% OFF`,
      rating: Number((4.2 + (i % 8) * 0.1).toFixed(1)),
      reviews: 20 + (i * 7) % 150,
      image: template.img,
      description: template.desc,
      inStock: i % 10 !== 0,
      isNew: i % 4 === 0,
      isFeatured: i % 5 === 0
    };
  });
};

const PRODUCTS = GENERATE_PRODUCTS();

export default function ToolsStore() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('protools_cart')) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('protools_wishlist')) || []);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [checkoutStep, setCheckoutStep] = useState("shop");

  const [formData, setFormData] = useState({
    fullName: "John Doe", email: "customer@example.com", phone: "+1 555-0192",
    address: "123 Industrial Parkway", city: "New York", country: "United States",
    cardName: "JOHN DOE", cardNum: "4532 8921 7920 4910", cardExp: "12/28", cardCvv: "482"
  });

  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => { localStorage.setItem('protools_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('protools_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast("Product added to cart");
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast("Item removed from cart");
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    const matchesRating = p.rating >= minRating;
    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  }).sort((a, b) => {
    if (sortBy === "newest") return b.isNew - a.isNew;
    if (sortBy === "low-high") return a.price - b.price;
    if (sortBy === "high-low") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "discount") return parseFloat(b.discount) - parseFloat(a.discount);
    return 0;
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal > 100 ? 20 : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      orderId: `#PT-20260926-${Math.floor(100 + Math.random() * 900)}`,
      email: formData.email,
      total: total.toFixed(2),
      items: [...cart]
    };
    setOrderInfo(newOrder);
    setCart([]);
    setCheckoutStep("success");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#2563EB] selection:text-white">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <Check className="w-5 h-5 text-[#10B981]" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCheckoutStep('shop')}>
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-md">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight">Pro<span className="text-[#2563EB]">Tools</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#shop" onClick={() => setCheckoutStep('shop')} className="font-semibold text-sm text-[#0F172A] hover:text-[#2563EB]">Home</a>
            <a href="#shop" onClick={() => setCheckoutStep('shop')} className="font-semibold text-sm text-[#64748B] hover:text-[#2563EB]">Shop</a>
            <a href="#categories" onClick={() => setCheckoutStep('shop')} className="font-semibold text-sm text-[#64748B] hover:text-[#2563EB]">Categories</a>
            <a href="#footer" className="font-semibold text-sm text-[#64748B] hover:text-[#2563EB]">About</a>
            <a href="#footer" className="font-semibold text-sm text-[#64748B] hover:text-[#2563EB]">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-blue-50 text-[#0F172A] hover:text-[#2563EB] transition-all cursor-pointer">
              <ShoppingCart className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-xl bg-[#F8FAFC]">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E2E8F0] px-6 py-4 space-y-3">
            <a href="#shop" onClick={() => {setCheckoutStep('shop'); setIsMobileMenuOpen(false);}} className="block font-medium text-[#0F172A]">Home</a>
            <a href="#shop" onClick={() => {setCheckoutStep('shop'); setIsMobileMenuOpen(false);}} className="block font-medium text-[#64748B]">Shop</a>
            <a href="#categories" onClick={() => {setCheckoutStep('shop'); setIsMobileMenuOpen(false);}} className="block font-medium text-[#64748B]">Categories</a>
            <a href="#footer" onClick={() => setIsMobileMenuOpen(false)} className="block font-medium text-[#64748B]">About & Contact</a>
          </div>
        )}
      </header>

      {/* SHOP VIEW */}
      {checkoutStep === 'shop' && (
        <>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="bg-gradient-to-br from-[#1D4ED8] to-[#0F172A] rounded-3xl p-8 sm:p-14 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
              <div className="max-w-xl z-10">
                <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-blue-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" /> Industrial Grade Standard
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold mt-4 leading-tight tracking-tight">
                  Professional Tools.<br />Built for <span className="text-[#F59E0B]">Performance.</span>
                </h1>
                <p className="text-slate-300 mt-4 text-base sm:text-lg">
                  Explore high-quality tools and equipment designed for professionals, workshops, contractors and DIY experts.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href="#shop" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#categories" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold transition-all">
                    Explore Categories
                  </a>
                </div>
              </div>
              <div className="z-10 w-full lg:w-auto flex justify-center">
                <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80" alt="" className="rounded-2xl shadow-2xl object-cover w-full max-w-md h-72 sm:h-80 border border-white/10" />
              </div>
            </div>
          </section>

          <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-[#0F172A]">Top Categories</h2>
              <p className="text-sm text-[#64748B] mt-1">Browse equipment tailored for every specific industrial need</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div onClick={() => setSelectedCategory("All")} className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center ${selectedCategory === "All" ? 'border-[#2563EB] shadow-md bg-blue-50/50' : 'border-[#E2E8F0]'}`}>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-3"><Wrench className="w-6 h-6" /></div>
                <h3 className="font-bold text-sm text-[#0F172A]">All Tools</h3>
                <span className="text-xs text-[#64748B] mt-1">{PRODUCTS.length} Items</span>
              </div>
              {CATEGORIES.map((cat) => {
                const count = PRODUCTS.filter(p => p.category === cat).length;
                return (
                  <div key={cat} onClick={() => setSelectedCategory(cat)} className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center ${selectedCategory === cat ? 'border-[#2563EB] shadow-md bg-blue-50/50' : 'border-[#E2E8F0]'}`}>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-3"><Wrench className="w-6 h-6" /></div>
                    <h3 className="font-bold text-sm text-[#0F172A]">{cat}</h3>
                    <span className="text-xs text-[#64748B] mt-1">{count} Items</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <aside className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] sticky top-28">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                    <h3 className="font-black text-base text-[#0F172A]">Filters</h3>
                    <button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setMinPrice(0); setMaxPrice(300); setMinRating(0); }} className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer">Clear All</button>
                  </div>
                  <div className="mt-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                      <input type="text" placeholder="Search tools..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3 block">Category</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2.5 text-sm text-[#0F172A] cursor-pointer">
                        <input type="radio" name="cat" checked={selectedCategory === "All"} onChange={() => setSelectedCategory("All")} className="accent-[#2563EB]" /> All Products
                      </label>
                      {CATEGORIES.map(cat => (
                        <label key={cat} className="flex items-center gap-2.5 text-sm text-[#0F172A] cursor-pointer">
                          <input type="radio" name="cat" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="accent-[#2563EB]" /> {cat}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                      <span>Max Price</span><span className="text-[#2563EB]">${maxPrice}</span>
                    </div>
                    <input type="range" min="20" max="300" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#2563EB] cursor-pointer" />
                  </div>
                </div>
              </aside>

              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-sm font-semibold text-[#64748B]">Showing <strong className="text-[#0F172A]">{filteredProducts.length}</strong> of <strong className="text-[#0F172A]">{PRODUCTS.length}</strong> products</span>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[#F8FAFC] border border-[#E2E8F0] text-sm font-semibold rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#2563EB] cursor-pointer">
                    <option value="featured">Sort by: Featured</option>
                    <option value="newest">Sort by: Newest</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-16 text-center">
                    <Wrench className="w-16 h-16 text-slate-300 mx-auto mb-4 stroke-1" />
                    <h3 className="text-xl font-bold text-[#0F172A]">No products found</h3>
                    <p className="text-sm text-[#64748B] mt-1">Try adjusting your search or filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => {
                      const isWishlisted = wishlist.includes(product.id);
                      return (
                        <div key={product.id} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-[#2563EB]">
                          <div className="relative h-48 bg-slate-100 overflow-hidden">
                            <span className="absolute top-3 left-3 bg-[#EF4444] text-white text-[10px] font-extrabold px-2 py-1 rounded-md z-10">{product.discount}</span>
                            <button onClick={() => toggleWishlist(product.id)} className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md z-10 cursor-pointer ${isWishlisted ? 'text-[#EF4444]' : 'text-[#64748B]'}`}>
                              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#EF4444]' : ''}`} />
                            </button>
                            <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <span className="text-[10px] font-bold text-[#2563EB] uppercase mb-1">{product.category}</span>
                            <h3 className="font-bold text-sm text-[#0F172A] mb-1 line-clamp-1">{product.name}</h3>
                            <p className="text-xs text-[#64748B] mb-3 line-clamp-2">{product.description}</p>
                            <div className="flex items-center gap-1 text-[#F59E0B] text-xs font-bold mb-3">
                              <Star className="w-3.5 h-3.5 fill-[#F59E0B]" /> <span>{product.rating}</span> <span className="text-[#64748B]">({product.reviews})</span>
                            </div>
                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#E2E8F0]">
                              <div>
                                <span className="text-base font-black text-[#0F172A]">${product.price.toFixed(2)}</span>
                                <span className="text-xs text-[#64748B] line-through ml-1.5">${product.oldPrice.toFixed(2)}</span>
                              </div>
                              <button onClick={() => addToCart(product)} className="bg-[#0F172A] hover:bg-[#2563EB] text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer">
                                <ShoppingCart className="w-3.5 h-3.5" /> Add
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CHECKOUT VIEW */}
      {checkoutStep === 'checkout' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button onClick={() => setCheckoutStep('shop')} className="mb-6 text-sm font-bold text-[#2563EB] hover:underline cursor-pointer">← Back to Store</button>
          <h2 className="text-3xl font-black text-[#0F172A] mb-8">Secure Checkout</h2>
          <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] space-y-4">
                <h3 className="font-black text-lg text-[#0F172A] mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[#2563EB]" /> Customer Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-bold text-[#64748B] mb-1 block">Full Name</label><input type="text" required value={formData.fullName} onChange={(e)=>setFormData({...formData, fullName: e.target.value})} className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-bold text-[#64748B] mb-1 block">Email Address</label><input type="email" required value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-bold text-[#64748B] mb-1 block">Phone Number</label><input type="text" required value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-bold text-[#64748B] mb-1 block">City</label><input type="text" required value={formData.city} onChange={(e)=>setFormData({...formData, city: e.target.value})} className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm" /></div>
                  <div className="sm:col-span-2"><label className="text-xs font-bold text-[#64748B] mb-1 block">Delivery Address</label><input type="text" required value={formData.address} onChange={(e)=>setFormData({...formData, address: e.target.value})} className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm" /></div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] space-y-6">
                <h3 className="font-black text-lg text-[#0F172A] flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#2563EB]" /> Payment Details (Demo)</h3>
                <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="w-10 h-8 bg-amber-300/80 rounded-md mb-6"></div>
                  <div className="font-mono text-lg tracking-widest mb-6">{formData.cardNum || "•••• •••• •••• ••••"}</div>
                  <div className="flex justify-between text-xs font-mono uppercase">
                    <div><span className="text-blue-200 block text-[9px]">Card Holder</span><span>{formData.cardName || "YOUR NAME"}</span></div>
                    <div><span className="text-blue-200 block text-[9px]">Expires</span><span>{formData.cardExp || "MM/YY"}</span></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><label className="text-xs font-bold text-[#64748B] mb-1 block">Cardholder Name</label><input type="text" required value={formData.cardName} onChange={(e)=>setFormData({...formData, cardName: e.target.value})} className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm uppercase" /></div>
                  <div className="sm:col-span-2"><label className="text-xs font-bold text-[#64748B] mb-1 block">Card Number</label><input type="text" maxLength="19" required value={formData.cardNum} onChange={(e)=>setFormData({...formData, cardNum: e.target.value})} className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-mono" /></div>
                  <div><label className="text-xs font-bold text-[#64748B] mb-1 block">Expiry Date</label><input type="text" maxLength="5" placeholder="MM/YY" required value={formData.cardExp} onChange={(e)=>setFormData({...formData, cardExp: e.target.value})} className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-bold text-[#64748B] mb-1 block">CVV</label><input type="password" maxLength="4" required value={formData.cardCvv} onChange={(e)=>setFormData({...formData, cardCvv: e.target.value})} className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm" /></div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] sticky top-28 space-y-6">
                <h3 className="font-black text-lg text-[#0F172A] pb-4 border-b border-[#E2E8F0]">Order Summary</h3>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img src={item.image} alt="" className="w-14 h-14 object-cover rounded-xl border border-[#E2E8F0]" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-[#0F172A] truncate">{item.name}</h4>
                        <span className="text-xs text-[#64748B]">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-bold text-sm text-[#0F172A]">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 pt-4 border-t border-[#E2E8F0] text-sm">
                  <div className="flex justify-between text-[#64748B]"><span>Subtotal</span><span className="font-semibold text-[#0F172A]">${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-[#64748B]"><span>Shipping</span><span className="font-semibold text-[#10B981]">Free</span></div>
                  <div className="flex justify-between text-lg font-black text-[#0F172A] pt-3 border-t border-[#E2E8F0]"><span>Total</span><span className="text-[#2563EB]">${total.toFixed(2)}</span></div>
                </div>
                <button type="submit" className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-4 rounded-xl font-bold text-base shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2">
                  Pay ${total.toFixed(2)} <Lock className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* SUCCESS PAGE */}
      {checkoutStep === 'success' && orderInfo && (
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E2E8F0] shadow-xl space-y-6">
            <div className="w-20 h-20 bg-emerald-50 text-[#10B981] rounded-full flex items-center justify-center mx-auto text-3xl font-bold animate-bounce">✓</div>
            <h2 className="text-3xl font-black text-[#0F172A]">Payment Successful!</h2>
            <p className="text-sm text-[#64748B]">Thank you for your order. Your payment has been successfully processed.</p>
            <div className="bg-[#F8FAFC] p-6 rounded-2xl text-left space-y-3 border border-[#E2E8F0]">
              <div className="flex justify-between text-sm"><span className="text-[#64748B]">Order Number:</span><strong>{orderInfo.orderId}</strong></div>
              <div className="flex justify-between text-sm"><span className="text-[#64748B]">Customer Email:</span><strong>{orderInfo.email}</strong></div>
              <div className="flex justify-between text-sm"><span className="text-[#64748B]">Total Paid:</span><strong className="text-[#2563EB]">${orderInfo.total}</strong></div>
            </div>
            <div className="pt-4 flex gap-4">
              <button onClick={() => setCheckoutStep('shop')} className="flex-1 bg-[#2563EB] text-white py-3.5 rounded-xl font-bold cursor-pointer">Continue Shopping</button>
            </div>
          </div>
        </div>
      )}

      {/* SLIDING CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
                <h3 className="text-lg font-black text-[#0F172A] flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#2563EB]" /> Your Cart ({totalItemsCount})
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="text-[#64748B] hover:text-[#0F172A] cursor-pointer"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-[#64748B]">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-slate-300 stroke-1" />
                    <h4 className="font-bold text-lg text-[#0F172A]">Your cart is empty</h4>
                    <button onClick={() => setIsCartOpen(false)} className="mt-6 bg-[#2563EB] text-white px-6 py-2.5 rounded-xl text-sm font-bold cursor-pointer">Start Shopping</button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl flex items-center gap-4 relative">
                      <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-xl border" />
                      <div className="flex-1 min-w-0 pr-4">
                        <span className="text-[10px] font-bold text-[#2563EB] uppercase">{item.category}</span>
                        <h4 className="font-bold text-sm text-[#0F172A] truncate">{item.name}</h4>
                        <div className="text-[#2563EB] font-black text-sm my-1">${(item.price * item.quantity).toFixed(2)}</div>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 bg-white border border-[#E2E8F0] rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 bg-white border border-[#E2E8F0] rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="absolute top-3 right-3 text-[#64748B] hover:text-[#EF4444] cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
                  <div className="flex justify-between text-sm text-[#64748B]"><span>Subtotal</span><strong className="text-[#0F172A]">${subtotal.toFixed(2)}</strong></div>
                  <div className="flex justify-between text-sm text-[#64748B]"><span>Shipping</span><strong className="text-[#10B981]">Free</strong></div>
                  <div className="flex justify-between text-base font-black text-[#0F172A] pt-3 border-t border-[#E2E8F0]">
                    <span>Total</span><span className="text-[#2563EB]">${total.toFixed(2)}</span>
                  </div>
                  <button onClick={() => { setIsCartOpen(false); setCheckoutStep('checkout'); }} className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-4 rounded-xl font-bold shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2">
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}