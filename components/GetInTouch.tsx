"use client";
import { useState } from "react";

const topics = ["Buying a Property","Renting a Property","Selling a Property","New Development","General Inquiry"];

export default function GetInTouch({ dark = true }: { dark?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className={`${dark ? "get-in-touch-section" : "bg-off-white"} py-20 lg:py-28`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-4">Contact</p>
            <h2 className={`font-display text-4xl lg:text-5xl font-bold leading-tight ${dark ? "text-white" : "text-navy"}`}>Get in Touch</h2>
            <p className={`mt-4 text-base leading-relaxed max-w-sm ${dark ? "text-white/60" : "text-gray-500"}`}>
              Ready to find your next home? Our team is here to guide you every step of the way.
            </p>
          </div>
          <div className="bg-white p-8 lg:p-10">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-navy">Thank You!</h3>
                <p className="text-gray-500 text-sm mt-2">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name *" required className="form-input-light" />
                  <input type="text" placeholder="Last Name" className="form-input-light" />
                </div>
                <input type="email" placeholder="Email *" required className="form-input-light" />
                <input type="tel" placeholder="Phone" className="form-input-light" />
                <select className="form-input-light text-gray-400" defaultValue="">
                  <option value="" disabled>Select a Topic</option>
                  {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <textarea placeholder="Your Message *" rows={4} required className="form-input-light resize-none" />
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  By clicking Submit, I agree to be contacted by our team via call, email, and text for real estate services. Message and data rates may apply.
                </p>
                <button type="submit" disabled={loading}
                  className="w-full bg-navy text-white py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-navy-light transition-colors disabled:opacity-60">
                  {loading ? "Sending..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
