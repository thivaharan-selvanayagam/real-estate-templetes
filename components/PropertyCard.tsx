"use client";

import Link from "next/link";
import { Listing } from "@/lib/repliers";

interface PropertyCardProps {
  listing: Listing & {
    lastStatus?: string;
    standardStatus?: string;
    bedrooms?: number;
    bathrooms?: number;
  };
}

// 🔑 Helper to safely format prices
const formatPrice = (price?: number | string) => {
  if (!price) return "N/A";
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "N/A";

  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  }
  return `$${num.toLocaleString()}`;
};

// 🔑 Safe Square Footage Formatter
const getFormattedSqft = (listing: any) => {
  const rawSqft = 
    listing.details?.sqft || 
    listing.details?.squareFootage || 
    listing.sqft;

  if (!rawSqft) return null;

  const str = String(rawSqft).trim();

  if (!str || str === "0" || str.toLowerCase() === "n/a" || str.toLowerCase() === "null") {
    return null;
  }

  if (str.includes("-")) {
    return `${str} SQ.FT.`;
  }

  const parsedNum = parseFloat(str.replace(/[^0-9.]/g, ""));
  if (isNaN(parsedNum) || parsedNum === 0) {
    return null;
  }

  return `${parsedNum.toLocaleString()} SQ.FT.`;
};

export default function PropertyCard({ listing }: PropertyCardProps) {
  const img = listing.images?.[0];
  
  // 🔑 Type-safe bedroom and bathroom extraction
  const beds = listing.details?.numBedrooms || (listing as any).bedrooms || 0;
  const baths = listing.details?.numBathrooms || (listing as any).bathrooms || 0;
  
  const streetNumber = listing.address?.streetNumber || "";
  const streetName = listing.address?.streetName || "";
  const city = listing.address?.city || "";
  const state = listing.address?.state || "Ontario";
  const zip = listing.address?.zip || "";

  const fullAddress = `${streetNumber} ${streetName}, ${city}, ${state} ${zip}`.trim();
  const sqftDisplay = getFormattedSqft(listing);

  const imageUrl = img 
    ? (img.startsWith("http") ? img : `https://cdn.repliers.io/${img}?w=600`)
    : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600";

  return (
    <div className="flex flex-col group transition-all duration-300 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl text-left border border-stone-100">
      
      {/* Photo Header */}
      <div className="w-full aspect-[4/3] relative overflow-hidden bg-stone-100">
        <img 
          src={imageUrl} 
          alt={city ? `${city} Property` : "Property"} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
          {listing.type === "lease" ? "For Rent" : "For Sale"}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            {formatPrice(listing.listPrice)}
          </h3>

          <p className="text-xs font-semibold text-stone-600 mt-1 truncate" title={fullAddress}>
            {fullAddress}
          </p>
        </div>

        {/* Property Features Line */}
        <div className="flex items-center gap-2 mt-4 text-[11px] font-black uppercase tracking-wider text-slate-800 border-t border-stone-100 pt-3">
          <span>{beds} Beds</span>
          <span>•</span>
          <span>{baths} Full Baths</span>
          
          {sqftDisplay && (
            <>
              <span>•</span>
              <span>{sqftDisplay}</span>
            </>
          )}
        </div>
      </div>

    </div>
  );
}