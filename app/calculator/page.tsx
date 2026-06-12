"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GetInTouch from "@/components/GetInTouch";
import { BRAND_CONFIG } from "@/config/brand"; // 🔑 IMPORT: Connected to your master config file


// Helper to format prices
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function CalculatorPage() {
  // Calculator State
  const [homePrice, setHomePrice] = useState<number>(350000);
  const [downPayment, setDownPayment] = useState<number>(70000);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(7.0);
  const [propertyTax, setPropertyTax] = useState<number>(4200);
  const [homeInsurance, setHomeInsurance] = useState<number>(1800);
  const [hoaFees, setHoaFees] = useState<number>(0);

  // Derived Values
  const downPaymentPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
  const loanAmount = homePrice - downPayment;
  
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyHomeInsurance = homeInsurance / 12;

  // Principal & Interest Calculation
  let monthlyPrincipalAndInterest = 0;
  if (interestRate > 0 && loanAmount > 0) {
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
    monthlyPrincipalAndInterest = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else if (loanAmount > 0) {
    monthlyPrincipalAndInterest = loanAmount / (loanTerm * 12);
  }

  const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + hoaFees;

  // Handlers
  const handleHomePriceChange = (val: string) => {
    const num = Number(val);
    setHomePrice(num);
    setDownPayment(num * (downPaymentPercent / 100));
  };

  const handleDownPaymentChange = (val: string) => {
    setDownPayment(Number(val));
  };

  const handleDownPaymentPercentChange = (val: string) => {
    const pct = Number(val);
    setDownPayment(homePrice * (pct / 100));
  };

  // 🔑 THEME MAPPINGS: Strip decorators to assemble focus utility rules safely
  const cleanPrimaryBg = BRAND_CONFIG.theme.primaryBg;
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;
  const cleanAccentText = BRAND_CONFIG.theme.accentText;
  const cleanAccentBg = BRAND_CONFIG.theme.accentBg;

  const focusBorderAccent = `focus-within:border-${cleanAccentText.replace('text-', '')}`;
  const focusSelectBorderAccent = `focus:border-${cleanAccentText.replace('text-', '')}`;
  const rangeAccentColor = `accent-${cleanAccentText.replace('text-', '')}`;

  return (
    <div className={`${cleanPrimaryBg} min-h-screen text-white`}>
      {/* 1. HERO SECTION */}
      <section className="relative h-[400px] lg:h-[450px] flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop" 
            alt="Financial analytics overview"
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-overlay"
          />
          <div className={`absolute inset-0 bg-gradient-to-b from-${cleanPrimaryBg.replace('bg-', '')}/70 via-${cleanPrimaryBg.replace('bg-', '')}/80 to-${cleanPrimaryBg.replace('bg-', '')}`} />
        </div>
        
        <div className="relative z-10 text-center px-6 w-full mt-10">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[0.1em] uppercase animate-fade-up">
            Mortgage Calculator
          </h1>
        </div>
      </section>

      {/* 2. CALCULATOR SECTION */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${cleanAccentText} mb-4 block`}>
              Plan Your Purchase
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-white tracking-widest uppercase">
              Calculate Your Monthly Payment
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: FORM */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Home Price */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-white/70">Home Price</label>
                <div className={`flex items-center bg-white/5 border border-white/10 rounded overflow-hidden ${focusBorderAccent} transition-colors`}>
                  <span className="px-4 text-white/50 border-r border-white/10">$</span>
                  <input 
                    type="number" 
                    value={Math.round(homePrice)}
                    onChange={(e) => handleHomePriceChange(e.target.value)}
                    className="w-full bg-transparent text-white px-4 py-3 outline-none"
                  />
                </div>
              </div>

              {/* Down Payment (Dual Input) */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-white/70">Down Payment</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className={`flex items-center bg-white/5 border border-white/10 rounded overflow-hidden ${focusBorderAccent} transition-colors flex-1`}>
                    <span className="px-4 text-white/50 border-r border-white/10">$</span>
                    <input 
                      type="number" 
                      value={Math.round(downPayment)}
                      onChange={(e) => handleDownPaymentChange(e.target.value)}
                      className="w-full bg-transparent text-white px-4 py-3 outline-none"
                    />
                  </div>
                  <div className={`flex items-center bg-white/5 border border-white/10 rounded overflow-hidden ${focusBorderAccent} transition-colors w-full sm:w-28 shrink-0`}>
                    <input 
                      type="number" 
                      value={downPaymentPercent.toFixed(1)}
                      onChange={(e) => handleDownPaymentPercentChange(e.target.value)}
                      className="w-full bg-transparent text-white px-4 py-3 outline-none text-center"
                    />
                    <span className="px-4 text-white/50 border-l border-white/10">%</span>
                  </div>
                </div>
              </div>

              {/* Loan Term */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-white/70">Loan Term</label>
                <div className="relative">
                  <select 
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className={`w-full bg-white/5 border border-white/10 rounded text-white px-4 py-3 outline-none appearance-none ${focusSelectBorderAccent} transition-colors`}
                  >
                    <option value={30} className="bg-slate-900">30 Years</option>
                    <option value={20} className="bg-slate-900">20 Years</option>
                    <option value={15} className="bg-slate-900">15 Years</option>
                    <option value={10} className="bg-slate-900">10 Years</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-bold tracking-widest uppercase text-white/70">Interest Rate</label>
                <div className={`flex flex-col gap-4 bg-white/5 border border-white/10 rounded p-4 ${focusBorderAccent} transition-colors`}>
                  <div className="flex items-center justify-between">
                    <input 
                      type="number" 
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="bg-transparent text-white w-20 outline-none font-bold"
                    />
                    <span className="text-white/50">%</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="15" 
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className={`w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer ${rangeAccentColor}`}
                  />
                </div>
              </div>

              {/* Property Tax */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-white/70">Property Tax (Annual)</label>
                <div className={`flex items-center bg-white/5 border border-white/10 rounded overflow-hidden ${focusBorderAccent} transition-colors`}>
                  <span className="px-4 text-white/50 border-r border-white/10">$</span>
                  <input 
                    type="number" 
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                    className="w-full bg-transparent text-white px-4 py-3 outline-none"
                  />
                </div>
              </div>

              {/* Home Insurance */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-white/70">Home Insurance (Annual)</label>
                <div className={`flex items-center bg-white/5 border border-white/10 rounded overflow-hidden ${focusBorderAccent} transition-colors`}>
                  <span className="px-4 text-white/50 border-r border-white/10">$</span>
                  <input 
                    type="number" 
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                    className="w-full bg-transparent text-white px-4 py-3 outline-none"
                  />
                </div>
              </div>

              {/* HOA Fees */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-white/70">HOA Fees (Monthly)</label>
                <div className={`flex items-center bg-white/5 border border-white/10 rounded overflow-hidden ${focusBorderAccent} transition-colors`}>
                  <span className="px-4 text-white/50 border-r border-white/10">$</span>
                  <input 
                    type="number" 
                    value={hoaFees}
                    onChange={(e) => setHoaFees(Number(e.target.value))}
                    className="w-full bg-transparent text-white px-4 py-3 outline-none"
                  />
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: RESULTS CARD */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-white/5 border border-white/10 p-8 rounded-lg shadow-2xl">
                
                <h3 className="text-sm text-white/90 font-medium mb-2">Estimated Monthly Payment</h3>
                <div className={`font-display text-5xl md:text-6xl ${cleanAccentText} mb-1`}>
                  {formatPrice(totalMonthlyPayment)}
                </div>
                <p className="text-[10px] tracking-widest uppercase text-white/50 mb-8">Per Month</p>

                <div className="flex flex-col gap-5 text-sm mb-10">
                  <div className="flex justify-between items-center pb-5 border-b border-white/5">
                    <span className="text-white/70">Principal & Interest</span>
                    <span className="font-bold">{formatPrice(monthlyPrincipalAndInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-5 border-b border-white/5">
                    <span className="text-white/70">Property Tax</span>
                    <span className="font-bold">{formatPrice(monthlyPropertyTax)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-5 border-b border-white/5">
                    <span className="text-white/70">Home Insurance</span>
                    <span className="font-bold">{formatPrice(monthlyHomeInsurance)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-5 border-b border-white/5">
                    <span className="text-white/70">HOA Fees</span>
                    <span className="font-bold">{formatPrice(hoaFees)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white/70">Loan Amount</span>
                    <span className="font-bold">{formatPrice(loanAmount)}</span>
                  </div>
                </div>

                <Link 
                  href="/contact" 
                  className={`block w-full ${cleanAccentBg} text-white text-center py-4 rounded text-xs font-bold tracking-widest uppercase hover:bg-white ${cleanPrimaryText} transition-all shadow-md`}
                >
                  Talk To Our Team
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global Footer Inclusion */}
      <GetInTouch dark={true} />
    </div>
  );
}