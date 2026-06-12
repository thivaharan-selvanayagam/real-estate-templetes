"use client";

import { useState } from "react";
import Link from "next/link";
import GetInTouch from "@/components/GetInTouch";
import { BRAND_CONFIG } from "@/config/brand"; // 🔑 IMPORT: Connected to your master config file

export default function HomeEvaluationPage() {
  // Form State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    timeframe: "",
    consent: false,
  });

  // Handlers
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim().length > 5) {
      setStep(2);
    } else {
      alert("Please enter a valid address execution string.");
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please agree to the communication terms to proceed.");
      return;
    }
    // Simulate API submission here
    setStep(3);
  };

  // 🔑 TAILWIND HOOKS: Dynamic parsing of brand configuration design tokens
  const cleanPrimaryTextClass = BRAND_CONFIG.theme.primaryText;
  const cleanPrimaryBgClass = BRAND_CONFIG.theme.primaryBg;
  const cleanAccentBgClass = BRAND_CONFIG.theme.accentBg;
  const cleanAccentTextClass = BRAND_CONFIG.theme.accentText;

  const inputFocusRingClass = `focus:ring-${BRAND_CONFIG.theme.accentText.replace('text-', '')}`;
  const inputFocusBorderClass = `focus:border-${BRAND_CONFIG.theme.primaryText.replace('text-', '')}`;

  return (
    <div className="bg-[#F8F7F4] min-h-screen text-navy">
      {/* 1. HERO SECTION WITH 3-STEP FORM */}
      <section className="relative h-[650px] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=80" 
            alt="Luxury Home Exterior"
            className="w-full h-full object-cover"
          />
          {/* Dynamic opacity overlay matched to primary theme configuration tokens */}
          <div className={`absolute inset-0 ${cleanPrimaryBgClass}/60`} />
        </div>
        
        <div className="relative z-10 text-navy w-full max-w-4xl mx-auto px-6 flex flex-col items-center mt-8">
          
          {/* Step Indicator */}
          <div className="flex items-center gap-4 mb-12">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step >= 1 ? `bg-white ${cleanPrimaryTextClass} border-white` : 'border-white/50 text-white/50'}`}>1</div>
            <div className={`w-16 h-px ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step >= 2 ? `bg-white ${cleanPrimaryTextClass} border-white` : 'border-white/50 text-white/50'}`}>2</div>
            <div className={`w-16 h-px ${step >= 3 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step === 3 ? `bg-white ${cleanPrimaryTextClass} border-white` : 'border-white/50 text-white/50'}`}>3</div>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-widest uppercase mb-12 text-center">
            How Much Is Your Home Worth?
          </h1>

          {/* FORM CONTAINER */}
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
            
            {/* STEP 1 */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-2">
                  <label className="text-white text-xs font-bold tracking-widest uppercase ml-2">Property Address</label>
                  <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter property street address details..." 
                    className={`w-full bg-white/90 border-none outline-none text-navy placeholder:text-gray-500 px-6 py-4 rounded-full focus:ring-2 ${inputFocusRingClass}`}
                    required
                  />
                </div>
                <button type="submit" className={`${cleanAccentBgClass} text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white ${cleanPrimaryTextClass} transition-colors self-center mt-4 shadow-md`}>
                  Continue
                </button>
              </form>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="flex flex-col gap-5 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input 
                    type="text" placeholder="Full Name" required
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full bg-white/90 outline-none text-navy px-5 py-3 rounded-xl focus:ring-2 ${inputFocusRingClass}`}
                  />
                  <input 
                    type="email" placeholder="Email Address" required
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full bg-white/90 outline-none text-navy px-5 py-3 rounded-xl focus:ring-2 ${inputFocusRingClass}`}
                  />
                  <input 
                    type="tel" placeholder="Phone Number" required
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full bg-white/90 outline-none text-navy px-5 py-3 rounded-xl focus:ring-2 ${inputFocusRingClass}`}
                  />
                  <select 
                    value={formData.timeframe} onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
                    className={`w-full bg-white/90 outline-none text-navy px-5 py-3 rounded-xl focus:ring-2 ${inputFocusRingClass} appearance-none`}
                  >
                    <option value="" disabled>Select Timeframe (Optional)</option>
                    <option value="now">I want to sell now</option>
                    <option value="3_months">Sell in 3 months</option>
                    <option value="6_months">Sell in 6 months</option>
                    <option value="12_months">Sell in 12 months</option>
                    <option value="curious">I’m just curious about my home’s value</option>
                  </select>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <input 
                    type="checkbox" id="consent" required
                    checked={formData.consent} onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                    className={`mt-1 w-4 h-4 rounded border-gray-300 ${cleanAccentTextClass} focus:${cleanAccentTextClass}`}
                  />
                  <label htmlFor="consent" className="text-[10px] leading-relaxed text-white/80">
                    I agree to be contacted by {BRAND_CONFIG.agent.name} via call, email, and text for real estate services. To opt out, you can reply 'stop' at any time or reply 'help' for assistance. You can also click the unsubscribe link in the emails. Message and data rates may apply. Message frequency may vary.
                  </label>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button type="button" onClick={() => setStep(1)} className="text-white/80 text-xs uppercase tracking-widest hover:text-white font-bold">
                    &larr; Back
                  </button>
                  <button type="submit" className={`${cleanAccentBgClass} text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white ${cleanPrimaryTextClass} transition-colors shadow-md`}>
                    Get Estimate
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="text-center text-white py-8 animate-fade-in">
                <div className={`w-16 h-16 ${cleanAccentBgClass} rounded-full flex items-center justify-center mx-auto mb-6 shadow-md`}>
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl font-bold mb-4">Thank You!</h3>
                <p className="text-white/90 leading-relaxed max-w-md mx-auto">
                  Your request has been received. Our team is currently preparing a detailed and customized home valuation report for <strong className={cleanAccentTextClass}>{address}</strong>. We will be in touch shortly.
                </p>
                <button onClick={() => { setStep(1); setAddress(""); }} className={`mt-8 text-xs font-bold uppercase tracking-widest ${cleanAccentTextClass} hover:text-white transition-colors`}>
                  Submit Another Property
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 2. WHAT'S YOUR PROPERTY WORTH SECTION */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className={`font-display text-3xl md:text-4xl font-normal ${cleanPrimaryTextClass} mb-6 uppercase tracking-wide`}>
              What's Your Property Worth?
            </h2>
            <p className="text-gray-600 text-sm leading-loose mb-6">
              Home valuations give you valuable knowledge that can help you plan for the future and make smart decisions. It's good practice to stay informed about how much equity you have in your home and how much you may be able to borrow against it or sell it for.
            </p>
            <p className="text-gray-600 text-sm leading-loose">
              Our tool provides a more robust, accurate assessment than you'll get from the major real estate portals. For the most precise valuation, reach out to discuss a customized Comparative Market Analysis or an appraisal.
            </p>
          </div>
          <div className="aspect-[4/3] w-full">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80" 
              alt="Modern Kitchen" 
              className="w-full h-full object-cover rounded-sm shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* 3. INFO CARDS */}
      <section className="pb-24 max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className={`border border-${cleanPrimaryTextClass.replace('text-', '')}/20 p-8 lg:p-10 text-center bg-transparent`}>
            <h3 className={`font-display text-lg font-normal ${cleanPrimaryTextClass} mb-6 uppercase tracking-widest leading-relaxed`}>What Is a Home Valuation?</h3>
            <p className="text-gray-600 text-sm leading-loose">
              A home valuation determines the current market value of a residential property. It is crucial for real estate transactions, preventing excessive borrowing and financial losses. When getting a mortgage, the home acts as collateral. If the borrower defaults, the lender may sell the property to recover funds. A thorough home valuation safeguards the lender's ability to recover costs if the mortgage is not fully repaid.
            </p>
          </div>

          <div className={`border border-${cleanPrimaryTextClass.replace('text-', '')}/20 p-8 lg:p-10 text-center bg-transparent`}>
            <h3 className={`font-display text-lg font-normal ${cleanPrimaryTextClass} mb-6 uppercase tracking-widest leading-relaxed`}>How Is the Valuation Calculated?</h3>
            <p className="text-gray-600 text-sm leading-loose">
              The value of your home is calculated using a combination of factors including its location, age, size, condition, any improvements or renovations made, and recent sale prices of comparable homes in the neighborhood. It also factors in current market trends and local market conditions. The valuation tool is dynamic and can be influenced by data such as inventory trends, interest rates, and current buyer sentiment.
            </p>
          </div>

          <div className={`border border-${cleanPrimaryTextClass.replace('text-', '')}/20 p-8 lg:p-10 text-center bg-transparent`}>
            <h3 className={`font-display text-lg font-normal ${cleanPrimaryTextClass} mb-6 uppercase tracking-widest leading-relaxed`}>How Accurate Is the Online Valuation?</h3>
            <p className="text-gray-600 text-sm leading-loose">
              Online home valuations provide a good starting point and offer a general estimate of your property's worth. However, they may not factor in recent renovations, unique features, historical value, architectural significance, and subjective market perception that could impact your home's actual market value. For the most accurate assessment, consider scheduling an in-person appraisal.
            </p>
          </div>

        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className={`${cleanPrimaryBgClass} py-16`}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <h2 className="font-display text-2xl lg:text-3xl text-white uppercase tracking-widest">
            Start Your Property Search
          </h2>
          <Link href="/all-homes" className="bg-[#E6D5B8] text-navy px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
            Search Homes
          </Link>
        </div>
      </section>

      {/* 5. TIMELINE: HOW IS A VALUATION PERFORMED */}
      <section className="py-24 max-w-[1000px] mx-auto px-6 lg:px-12 text-center">
        <h2 className={`font-display text-3xl md:text-4xl font-normal ${cleanPrimaryTextClass} uppercase tracking-widest mb-4`}>
          How Is a Valuation Performed?
        </h2>
        <p className="text-sm tracking-widest text-gray-500 uppercase mb-20">Two Accurate Ways to Perform Home Valuations</p>

        <div className="relative">
          {/* Vertical Center Line (Hidden on mobile) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2"></div>

          {/* Timeline Item 1 */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full mb-16 relative">
            <div className="w-full md:w-1/2 md:pr-16 text-right hidden md:block">
              <span className="bg-[#B97A42] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest">Market Analysis</span>
            </div>
            
            {/* Timeline Dot */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-[#B97A42] rounded-full border-[3px] border-[#F8F7F4] box-content z-10"></div>
            
            <div className="w-full md:w-1/2 md:pl-16 text-left">
              <span className="md:hidden bg-[#B97A42] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest inline-block mb-4">Market Analysis</span>
              <h3 className={`font-bold ${cleanPrimaryTextClass} uppercase tracking-widest text-sm mb-4`}>Comparative Market Analysis</h3>
              <p className="text-gray-600 text-xs leading-loose text-justify md:text-left">
                A Comparative Market Analysis (CMA) is a tool used by real estate agents to value a home. It evaluates similar homes that have recently sold in the same area. Agents find comparable sales and use them to conduct a sales comparison. In most cases, an agent will find three homes that have recently sold and are as similar to and located as close to the home being valued as possible. Each one is then analyzed to pinpoint differences between it and the home being valued. Once those differences are priced out, the price of each comp is adjusted to see what it would cost if it was identical to the home being valued were it to be sold in the current market.
              </p>
            </div>
          </div>

          {/* Timeline Item 2 */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full relative">
            <div className="w-full md:w-1/2 md:pr-16 text-left md:text-right mb-6 md:mb-0">
              <span className="md:hidden bg-[#B97A42] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest inline-block mb-4">Appraisals</span>
              <h3 className={`font-bold ${cleanPrimaryTextClass} uppercase tracking-widest text-sm mb-4`}>Based on a Professional's Opinion</h3>
              <p className="text-gray-600 text-xs leading-loose text-justify md:text-right">
                An appraisal is an unbiased valuation of a home based on a professional's opinion. They are usually what mortgage companies use for home purchases and refinances. A lender usually orders a home appraisal and the cost of the appraisal, sometimes up to $500, is paid by the homeowner. An appraiser does a complete visual inspection of the interior and exterior of the home as well as taking into consideration recent sales of similar properties and market trends. The appraiser then compiles a detailed report on the home, including an exterior building sketch, a street map showing the home and any comparable sales, photos of the home and street, an explanation of how the square footage was calculated, and any other relevant information.
              </p>
            </div>

            {/* Timeline Dot */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-[#B97A42] rounded-full border-[3px] border-[#F8F7F4] box-content z-10"></div>

            <div className="w-full md:w-1/2 md:pl-16 text-left hidden md:block">
              <span className="bg-[#B97A42] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest">Appraisals</span>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TIMELINE: WHY IS A VALUATION IMPORTANT */}
      <section className="py-24 max-w-[1000px] mx-auto px-6 lg:px-12 text-center border-t border-gray-200">
        <h2 className={`font-display text-3xl md:text-4xl font-normal ${cleanPrimaryTextClass} uppercase tracking-widest mb-4`}>
          Why Is a Valuation Important?
        </h2>
        <p className="text-sm tracking-widest text-gray-500 uppercase mb-20">Situations When a Home Valuation May Be Necessary</p>

        <div className="relative">
          {/* Vertical Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2"></div>

          {/* Item 1 */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full mb-16 relative">
            <div className="w-full md:w-1/2 md:pr-16 text-right hidden md:block">
              <span className="bg-[#B97A42] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest">Refinancing</span>
            </div>
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-[#B97A42] rounded-full box-content z-10"></div>
            <div className="w-full md:w-1/2 md:pl-16 text-left">
              <span className="md:hidden bg-[#B97A42] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest inline-block mb-4">Refinancing</span>
              <p className="text-gray-600 text-xs leading-loose text-justify md:text-left">
                Lenders base the amount of their loans on the value of your property and usually allow you to borrow a maximum of 75% to 95.5% against your property. Knowing what your home is worth allows lenders to calculate your equity in the home. The more equity you have, the better terms you will receive on your refinance.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full mb-16 relative">
            <div className="w-full md:w-1/2 md:pr-16 text-left md:text-right mb-6 md:mb-0">
              <span className="md:hidden bg-[#B97A42] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest inline-block mb-4">Home Improvements</span>
              <p className="text-gray-600 text-xs leading-loose text-justify md:text-right">
                If you're doing home improvement projects to increase the resale value, you want to make sure you're not pricing it out of the market. If your home is already priced on the high end for your neighborhood, making too many improvements could make it more difficult to sell. When you get a valuation, you can see how your home compares with others in the neighborhood and let this guide your home improvement decisions.
              </p>
            </div>
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-[#B97A42] rounded-full box-content z-10"></div>
            <div className="w-full md:w-1/2 md:pl-16 text-left hidden md:block">
              <span className="bg-[#B97A42] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest">Home Improvements</span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full mb-16 relative">
            <div className="w-full md:w-1/2 md:pr-16 text-right hidden md:block">
              <span className="bg-[#B97A42] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest">Qualifying For Credit</span>
            </div>
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-[#B97A42] rounded-full box-content z-10"></div>
            <div className="w-full md:w-1/2 md:pl-16 text-left">
              <span className="md:hidden bg-[#B97A42] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest inline-block mb-4">Qualifying For Credit</span>
              <p className="text-gray-600 text-xs leading-loose text-justify md:text-left">
                If you want to borrow cash against your home, getting a Home Equity Line of Credit (HELOC) could be a good option. To qualify, you must have a certain level of equity in your home. Most lenders require at least 20%. Getting a home valuation will help you determine if you qualify and will be used by the lender to make a decision on your loan.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full relative">
            <div className="w-full md:w-1/2 md:pr-16 text-left md:text-right mb-6 md:mb-0">
              <span className="md:hidden bg-[#B97A42] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest inline-block mb-4">Planning</span>
              <p className="text-gray-600 text-xs leading-loose text-justify md:text-right">
                Though it's not a necessity, simply knowing the value of your home is good information to have. It will help you plan for the future and deal with unforeseen circumstances when you might be in a position that requires extra money or a quick relocation. Knowing how much equity you have in your home and how much you may be able to borrow against it or sell it for will help you respond to any financial curveballs that life throws at you.
              </p>
            </div>
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-[#B97A42] rounded-full box-content z-10"></div>
            <div className="w-full md:w-1/2 md:pl-16 text-left hidden md:block">
              <span className="bg-[#B97A42] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest">Planning</span>
            </div>
          </div>

        </div>
      </section>

      {/* Global Footer Inclusion */}
      <GetInTouch dark={true} />
    </div>
  );
}