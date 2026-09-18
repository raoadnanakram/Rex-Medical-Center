import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, CheckCircle2, Copy, Building2, Smartphone, MessageCircle } from 'lucide-react';

export default function DonateNow() {
  const [selectedAmount, setSelectedAmount] = useState('5000');
  const [customAmount, setCustomAmount] = useState('');
  const [activeTab, setActiveTab] = useState('faysal'); // 'faysal', 'mcb', 'islamic', 'jazzcash'
  const [copiedText, setCopiedText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [donorInfo, setDonorInfo] = useState({ name: '', phone: '', gender: 'Male' });

  const predefinedAmounts = ['1000', '3000', '5000', '10000', '25000'];

  const contactWhatsApp = "+92 324 4409797";
  const finalAmount = customAmount || selectedAmount;

  const salutation = donorInfo.gender === 'Female' ? 'Madam' : 'Sir';

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum ${salutation},\n\nRex Medical Center, I have made a donation of *Rs. ${Number(finalAmount).toLocaleString()}*.\n\n*Donor Name:* ${donorInfo.name}\n*Phone:* ${donorInfo.phone}\n\nPlease find my payment screenshot attached:`
  );
  const whatsappDirectUrl = `https://wa.me/923244409797?text=${whatsappMessage}`;

  const accountDetails = {
    faysal: {
      name: "Faysal Bank",
      title: "REX Medical Centre",
      accountNo: "3232301000002085",
      iban: "PK53FAYS3232301000002085"
    },
    mcb: {
      name: "MCB Islamic Bank",
      title: "REX Medical Centre",
      accountNo: "1601005590330001",
      iban: "PK90MUCB1601005590330001"
    },
    islamic: {
      name: "BankIslami",
      title: "REX Medical Centre",
      accountNo: "209300272940001",
      iban: "PK84BKSP02093002729"
    },
    jazzcash: {
      name: "JazzCash",
      title: "Naveed Ahmed Aftab",
      accountNo: "0324-4409797",
      type: "Mobile Account"
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(''), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F4F9F8] to-[#EBF5F3] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-teal-700 font-bold text-xs uppercase tracking-[0.3em] bg-teal-50 px-4 py-1.5 rounded-full inline-block mb-4 border border-teal-100 shadow-sm">
            Support a Child's Journey
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-900 tracking-tight mb-4">
            Direct Donation Channels
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Support special therapies directly through secure Bank Transfers or JazzCash. Every contribution brings a child closer to independence.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-teal-100/60 p-8 sm:p-12 mb-20 relative overflow-hidden"
      >
        {submitted ? (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-3xl font-bold text-slate-900">Thank You, {donorInfo.name}!</h3>
              <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
                Your details have been successfully recorded. Please click the button below to share your payment screenshot directly via WhatsApp.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl max-w-md mx-auto space-y-4">
              <div className="flex items-center justify-center gap-2 text-emerald-900 font-bold text-sm">
                <MessageCircle className="w-5 h-5 text-emerald-600 animate-bounce" />
                <span>Final Step: Send Payment Screenshot</span>
              </div>
              
              <a 
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-4 rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Open WhatsApp & Send Screenshot</span>
              </a>
              <p className="text-xs text-emerald-700">This will automatically open WhatsApp with a professional greeting ({salutation}) and your donation details.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 max-w-lg mx-auto text-left space-y-4">
              <h4 className="font-serif font-bold text-slate-900 border-b pb-2">Transfer Accounts Reference:</h4>
              
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-bold text-[#1c296b]">Faysal Bank</p>
                  <p className="text-xs text-slate-500 font-mono">3232301000002085</p>
                </div>
                <button 
                  type="button"
                  onClick={() => handleCopy("3232301000002085", "faysal-sub")}
                  className="px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold rounded-lg hover:bg-teal-100 cursor-pointer"
                >
                  {copiedText === "faysal-sub" ? "Copied!" : "Copy Number"}
                </button>
              </div>

              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200">
                <div>
                  <p className="font-bold text-[#1c296b]">MCB Islamic Bank</p>
                  <p className="text-xs text-slate-500 font-mono">1601005590330001</p>
                </div>
                <button 
                  type="button"
                  onClick={() => handleCopy("1601005590330001", "mcb-sub")}
                  className="px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold rounded-lg hover:bg-teal-100 cursor-pointer"
                >
                  {copiedText === "mcb-sub" ? "Copied!" : "Copy Number"}
                </button>
              </div>

              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200">
                <div>
                  <p className="font-bold text-[#1c296b]">BankIslami</p>
                  <p className="text-xs text-slate-500 font-mono">209300272940001</p>
                </div>
                <button 
                  type="button"
                  onClick={() => handleCopy("209300272940001", "islamic-sub")}
                  className="px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold rounded-lg hover:bg-teal-100 cursor-pointer"
                >
                  {copiedText === "islamic-sub" ? "Copied!" : "Copy Number"}
                </button>
              </div>

              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200">
                <div>
                  <p className="font-bold text-red-600">JazzCash</p>
                  <p className="text-xs text-slate-500 font-mono">0324-4409797 (Naveed Ahmed)</p>
                </div>
                <button 
                  type="button"
                  onClick={() => handleCopy("03244409797", "jazz-sub")}
                  className="px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold rounded-lg hover:bg-teal-100 cursor-pointer"
                >
                  {copiedText === "jazz-sub" ? "Copied!" : "Copy Number"}
                </button>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 bg-[#1c296b] text-white text-xs font-bold rounded-full hover:bg-red-600 transition-colors cursor-pointer"
            >
              Back to Donation Form
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block text-center">
                Step 1: Select Donation Amount (PKR)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {predefinedAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                    className={`py-3.5 rounded-2xl font-bold text-sm transition-all border cursor-pointer ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-teal-700 text-white border-teal-700 shadow-lg scale-105'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-400'
                    }`}
                  >
                    Rs. {Number(amt).toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="max-w-xs mx-auto pt-2">
                <input 
                  type="number" 
                  placeholder="Or enter custom amount" 
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(''); }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-slate-50 text-center font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200/80">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block text-center">
                Step 2: Choose Bank or JazzCash Account Details
              </label>

              {/* Account Tabs Selector */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('faysal')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    activeTab === 'faysal' ? 'bg-[#1c296b] text-white border-[#1c296b] shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Faysal Bank
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('mcb')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    activeTab === 'mcb' ? 'bg-[#1c296b] text-white border-[#1c296b] shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  MCB Islamic
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('islamic')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    activeTab === 'islamic' ? 'bg-[#1c296b] text-white border-[#1c296b] shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  BankIslami
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('jazzcash')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    activeTab === 'jazzcash' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  JazzCash
                </button>
              </div>

              {/* Dynamic Details Box */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

                {activeTab !== 'jazzcash' ? (
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">Account Title: {accountDetails[activeTab].title}</span>
                        <h4 className="font-serif text-2xl font-bold text-white mt-1">{accountDetails[activeTab].name}</h4>
                      </div>
                      <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-teal-200">Verified</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
                      <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex justify-between items-center">
                        <div>
                          <p className="text-slate-400 text-xs uppercase">Account Number</p>
                          <p className="font-bold text-teal-300 font-mono mt-0.5">{accountDetails[activeTab].accountNo}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(accountDetails[activeTab].accountNo, activeTab + '-acc')}
                          className="p-2 bg-white/10 hover:bg-teal-600 text-white rounded-xl transition-colors cursor-pointer"
                          title="Copy Account Number"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex justify-between items-center">
                        <div>
                          <p className="text-slate-400 text-xs uppercase">IBAN</p>
                          <p className="font-bold text-teal-300 font-mono mt-0.5">{accountDetails[activeTab].iban}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(accountDetails[activeTab].iban, activeTab + '-iban')}
                          className="p-2 bg-white/10 hover:bg-teal-600 text-white rounded-xl transition-colors cursor-pointer"
                          title="Copy IBAN"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {copiedText && <p className="text-xs text-emerald-400 font-semibold text-center pt-1 animate-pulse">✓ Copied to clipboard successfully!</p>}
                  </div>
                ) : (
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Account Title: {accountDetails.jazzcash.title}</span>
                        <h4 className="font-serif text-2xl font-bold text-white mt-1">JazzCash Account</h4>
                      </div>
                      <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-red-200">Instant</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
                      <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                        <p className="text-slate-400 text-xs uppercase">Account Type</p>
                        <p className="font-bold text-slate-200 mt-0.5">Mobile Account</p>
                      </div>

                      <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex justify-between items-center">
                        <div>
                          <p className="text-slate-400 text-xs uppercase">Mobile Number</p>
                          <p className="font-bold text-red-300 font-mono mt-0.5">{accountDetails.jazzcash.accountNo}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy("03244409797", "jazz-acc")}
                          className="p-2 bg-white/10 hover:bg-red-600 text-white rounded-xl transition-colors cursor-pointer"
                          title="Copy Number"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {copiedText && <p className="text-xs text-emerald-400 font-semibold text-center pt-1 animate-pulse">✓ Copied to clipboard successfully!</p>}
                  </div>
                )}

              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs sm:text-sm">
                <MessageCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <p>
                  After making the transfer, please share your payment screenshot on our official WhatsApp number: <strong className="font-mono text-emerald-700">{contactWhatsApp}</strong>
                </p>
              </div>

            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200/80">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block text-center">
                Step 3: Confirm Your Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  value={donorInfo.name}
                  onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-slate-50"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number (for confirmation)" 
                  value={donorInfo.phone}
                  onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-slate-50"
                />
                <select
                  value={donorInfo.gender}
                  onChange={(e) => setDonorInfo({...donorInfo, gender: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1c296b] text-sm bg-slate-50 cursor-pointer"
                >
                  <option value="Male">Male (Sir)</option>
                  <option value="Female">Female (Madam)</option>
                </select>
              </div>
            </div>

            <div className="text-center pt-2">
              <button 
                type="submit" 
                className="inline-flex items-center gap-3 bg-[#1c296b] hover:bg-red-600 text-white font-bold text-base px-10 py-4 rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              >
                <Heart className="w-5 h-5 text-teal-300 group-hover:text-white transition-colors" />
                <span>I Have Made the Transfer</span>
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </button>
            </div>

          </form>
        )}
      </motion.div>

    </div>
  );
}