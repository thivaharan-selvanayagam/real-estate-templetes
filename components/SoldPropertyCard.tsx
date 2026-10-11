"use client";

import { Bed, Bath, Maximize, Lock, Tag } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

interface SoldPropertyCardProps {
  listing: any;
  isLoggedIn: boolean;
  onGoogleSignIn?: () => void;
}

const formatPrice = (price?: number | string) => {
  if (!price) return "N/A";
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "N/A";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(num);
};

export default function SoldPropertyCard({ listing, isLoggedIn, onGoogleSignIn }: SoldPropertyCardProps) {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;

  const img = listing.images?.[0];
  const bedsCount = listing.details?.numBedrooms || listing.bedrooms || 0;
  const bathsCount = listing.details?.numBathrooms || listing.bathrooms || 0;
  const sqftMeasure = listing.details?.sqft || "N/A";

  const streetNumber = listing.address?.streetNumber || "";
  const streetName = listing.address?.streetName || "";
  const city = listing.address?.city || "";
  const state = listing.address?.state || "ON";

  const fullAddress = `${streetNumber} ${streetName}, ${city}, ${state}`.trim();

  const listPrice = listing.listPrice;
  const rawSoldPrice = listing.soldData?.price || listing.soldPrice;
  const soldPrice = rawSoldPrice ? Number(rawSoldPrice) : listPrice;
  const overAsking = soldPrice && listPrice && Number(soldPrice) > Number(listPrice);

  const imageUrl = img 
    ? (img.startsWith("http") ? img : `https://cdn.repliers.io/${img}?w=600`)
    : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600";

  const handleGoogleAuth = () => {
    if (onGoogleSignIn) {
      onGoogleSignIn();
      return;
    }
    // Redirect to your authentication endpoint or set standard session cookie
    window.location.href = "/api/auth/google?callbackUrl=/sold-homes";
  };

  return (
    <div className="flex flex-col group transition-all duration-300 border border-stone-200/80 bg-white p-3 rounded-3xl shadow-sm hover:shadow-xl relative overflow-hidden text-left">
      
      {/* 1. PHOTO - ALWAYS VISIBLE */}
      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 relative bg-stone-100 border border-stone-100">
        <img 
          src={imageUrl} 
          alt={city ? `${city} Property` : "Sold Property"} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Sold Badge */}
        <div className="absolute top-3 left-3 bg-[#2b4b46] text-white text-[9px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm z-10">
          Sold
        </div>

        {overAsking && isLoggedIn && (
          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm z-10 flex items-center gap-1">
            <Tag size={10} /> Over Asking
          </div>
        )}
      </div>

      {/* 2. CARD CONTENT */}
      <div className="px-1 flex flex-col flex-1 justify-between">
        <div>
          {/* ALWAYS VISIBLE LISTED PRICE */}
          <div className="flex items-baseline justify-between gap-2 flex-wrap mb-1">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block">
                Listed Price
              </span>
              <span className={`text-xl font-black ${cleanPrimaryText} tracking-tight`}>
                {formatPrice(listPrice)}
              </span>
            </div>
          </div>

          {/* GATED SECTION: SOLD PRICE & ADDRESS */}
          {isLoggedIn ? (
            <div className="mt-2 pt-2 border-t border-stone-100">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                    Final Sold Price
                  </span>
                  <span className="text-lg font-black text-emerald-800 tracking-tight">
                    {formatPrice(soldPrice)}
                  </span>
                </div>
              </div>
              <p className="text-xs font-semibold text-stone-600 mt-2 truncate" title={fullAddress}>
                {fullAddress}
              </p>
            </div>
          ) : (
            <div className="mt-3 p-3 bg-stone-50 border border-stone-200/80 rounded-2xl flex flex-col items-center text-center gap-2">
              <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-bold">
                <Lock size={12} className="text-[#2b4b46]" />
                <span>Sold Price Protected</span>
              </div>
              
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-slate-800 border border-stone-300 hover:bg-stone-100 px-3 py-2 rounded-xl text-xs font-bold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          )}
        </div>

        {/* SPECS FOOTER (Shown when logged in) */}
        {isLoggedIn && (
          <div className="flex items-center gap-3 mt-4 text-xs font-bold text-stone-400 border-t border-stone-100 pt-2.5">
            <span className="flex items-center gap-1"><Bed size={14} className="text-stone-400"/> {bedsCount} Bd</span>
            <span className="flex items-center gap-1"><Bath size={14} className="text-stone-400"/> {bathsCount} Ba</span>
            {sqftMeasure !== "N/A" && sqftMeasure !== "0" && (
              <span className="flex items-center gap-1 ml-auto"><Maximize size={12} className="text-stone-400"/> {Number(sqftMeasure).toLocaleString()} sqft</span>
            )}
          </div>
        )}
      </div>

    </div>
  );
}