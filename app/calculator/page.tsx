"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Calendar } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import { BRAND_CONFIG } from "@/config/brand";

// Helper to format currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function CalculatorPage() {
  // Calculator State (Realistic GTA Benchmarks)
  const [homePrice, setHomePrice] = useState<number>(850000);
  const [downPayment, setDownPayment] = useState<number>(170000);
  const [loanTerm, setLoanTerm] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(5.25);
  const [propertyTax, setPropertyTax] = useState<number>(5800);
  const [homeInsurance, setHomeInsurance] = useState<number>(2100);
  const [hoaFees, setHoaFees] = useState<number>(0);

  // Derived Values
  const downPaymentPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
  const loanAmount = Math.max(0, homePrice - downPayment);
  
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

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[380px] lg:h-[440px] flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop" 
            alt="GTA Property Calculator Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>
        
        <div className="relative z-10 text-center px-6 w-full max-w-4xl mx-auto mt-10">
          <div className="inline-block bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-4 shadow-md">
            GTA Mortgage & Carrying Costs
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase">
            Mortgage Calculator
          </h1>
          <p className="text-[#F9F6F0]/85 text-sm md:text-base font-light mt-3 max-w-xl mx-auto">
            Estimate your monthly payments, principal breakdown, taxes, and carrying costs for GTA properties.
          </p>
        </div>
      </section>

      {/* 2. CALCULATOR FORM & RESULTS SECTION */}
      <section className="py-12 lg:py-20 bg-[#FDFBF7] text-slate-900 border-t border-stone-200/80">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Calculate Your Monthly Payment
            </h2>
            <p className="text-stone-600 text-sm font-normal">
              Adjust home price, down payment, interest rates, and fees to see estimated monthly costs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: FORM INPUTS */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Home Price */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Home Price
                </label>
                <div className="flex items-center bg-white border border-stone-300 rounded-xl overflow-hidden focus-within:border-[#4D71A3] transition-colors shadow-sm">
                  <span className="px-4 text-stone-500 font-semibold border-r border-stone-200">$</span>
                  <input 
                    type="number" 
                    value={Math.round(homePrice)}
                    onChange={(e) => handleHomePriceChange(e.target.value)}
                    className="w-full bg-transparent text-slate-900 font-semibold px-4 py-3.5 outline-none text-sm"
                  />
                </div>
              </div>

              {/* Down Payment (Dual Input) */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Down Payment
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center bg-white border border-stone-300 rounded-xl overflow-hidden focus-within:border-[#4D71A3] transition-colors shadow-sm flex-1">
                    <span className="px-4 text-stone-500 font-semibold border-r border-stone-200">$</span>
                    <input 
                      type="number" 
                      value={Math.round(downPayment)}
                      onChange={(e) => handleDownPaymentChange(e.target.value)}
                      className="w-full bg-transparent text-slate-900 font-semibold px-4 py-3.5 outline-none text-sm"
                    />
                  </div>
                  <div className="flex items-center bg-white border border-stone-300 rounded-xl overflow-hidden focus-within:border-[#4D71A3] transition-colors shadow-sm w-full sm:w-32 shrink-0">
                    <input 
                      type="number" 
                      value={downPaymentPercent.toFixed(1)}
                      onChange={(e) => handleDownPaymentPercentChange(e.target.value)}
                      className="w-full bg-transparent text-slate-900 font-semibold px-4 py-3.5 outline-none text-center text-sm"
                    />
                    <span className="px-4 text-stone-500 font-semibold border-l border-stone-200">%</span>
                  </div>
                </div>
              </div>

              {/* Loan Term */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Amortization Period
                </label>
                <div className="relative">
                  <select 
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full bg-white border border-stone-300 rounded-xl text-slate-900 font-semibold px-4 py-3.5 outline-none appearance-none focus:border-[#4D71A3] transition-colors shadow-sm text-sm"
                  >
                    <option value={30}>30 Years</option>
                    <option value={25}>25 Years (Standard Canadian Amortization)</option>
                    <option value={20}>20 Years</option>
                    <option value={15}>15 Years</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Interest Rate (%)
                </label>
                <div className="flex flex-col gap-3 bg-white border border-stone-300 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <input 
                      type="number" 
                      step="0.05"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="bg-transparent text-slate-900 w-24 outline-none font-bold text-base"
                    />
                    <span className="text-stone-500 font-semibold">%</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="12" 
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#4D71A3]"
                  />
                </div>
              </div>

              {/* Property Tax */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Property Tax (Annual)
                </label>
                <div className="flex items-center bg-white border border-stone-300 rounded-xl overflow-hidden focus-within:border-[#4D71A3] transition-colors shadow-sm">
                  <span className="px-4 text-stone-500 font-semibold border-r border-stone-200">$</span>
                  <input 
                    type="number" 
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                    className="w-full bg-transparent text-slate-900 font-semibold px-4 py-3.5 outline-none text-sm"
                  />
                </div>
              </div>

              {/* Home Insurance */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Home Insurance (Annual)
                </label>
                <div className="flex items-center bg-white border border-stone-300 rounded-xl overflow-hidden focus-within:border-[#4D71A3] transition-colors shadow-sm">
                  <span className="px-4 text-stone-500 font-semibold border-r border-stone-200">$</span>
                  <input 
                    type="number" 
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                    className="w-full bg-transparent text-slate-900 font-semibold px-4 py-3.5 outline-none text-sm"
                  />
                </div>
              </div>

              {/* HOA / Condo Fees */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Condo Fees (Monthly)
                </label>
                <div className="flex items-center bg-white border border-stone-300 rounded-xl overflow-hidden focus-within:border-[#4D71A3] transition-colors shadow-sm">
                  <span className="px-4 text-stone-500 font-semibold border-r border-stone-200">$</span>
                  <input 
                    type="number" 
                    value={hoaFees}
                    onChange={(e) => setHoaFees(Number(e.target.value))}
                    className="w-full bg-transparent text-slate-900 font-semibold px-4 py-3.5 outline-none text-sm"
                  />
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: RESULTS CARD & POST-CALCULATOR CONSULTATION CTA */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="bg-white border border-stone-200/80 p-8 rounded-3xl shadow-xl text-left">
                
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  Estimated Monthly Payment
                </h3>
                <div className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mb-1">
                  {formatPrice(totalMonthlyPayment)}
                </div>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-[#4D71A3] mb-8">
                  Per Month
                </p>

                <div className="flex flex-col gap-4 text-xs sm:text-sm mb-8 border-t border-stone-100 pt-6">
                  <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                    <span className="text-stone-600">Principal & Interest</span>
                    <span className="font-bold text-slate-900">{formatPrice(monthlyPrincipalAndInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                    <span className="text-stone-600">Property Tax</span>
                    <span className="font-bold text-slate-900">{formatPrice(monthlyPropertyTax)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                    <span className="text-stone-600">Home Insurance</span>
                    <span className="font-bold text-slate-900">{formatPrice(monthlyHomeInsurance)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                    <span className="text-stone-600">Maintenance / HOA</span>
                    <span className="font-bold text-slate-900">{formatPrice(hoaFees)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-stone-600 font-medium">Total Loan Amount</span>
                    <span className="font-bold text-slate-900">{formatPrice(loanAmount)}</span>
                  </div>
                </div>

                {/* REQUIRED POST-CALCULATOR PROMPT & CTA */}
                <div className="bg-[#F9F6F0] p-6 rounded-2xl border border-stone-200/80 text-center">
                  <h4 className="font-display text-base font-bold text-slate-900 mb-2">
                    Want us to run the numbers on a real property?
                  </h4>
                  <p className="text-stone-600 text-xs mb-5 leading-relaxed font-normal">
                    Get Reema and Pirasha to analyze exact cash flows, maintenance fees, taxes, and rental yields for specific GTA listings.
                  </p>
                  <Link 
                    href="/contact?intent=Book%20a%20Consultation" 
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#4D71A3] text-white hover:bg-[#3B5B88] py-3.5 px-6 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-md font-sans"
                  >
                    <span>Book a Consultation</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global Contact Form */}
      <GetInTouch dark={true} />
    </div>
  );
}