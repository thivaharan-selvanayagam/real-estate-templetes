"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Search, ChevronDown, Grid, List as ListIcon, Bed, Bath, Maximize } from "lucide-react";

// Dynamic import for Leaflet map to prevent SSR crashes
const DynamicMap = dynamic(() => import("./ListingsMap"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">Loading Map...</div> 
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

interface MyListingsClientProps {
  initialListings: any[];
  totalResults: number;
  currentPage: number;
}

export default function MyListingsClient({ initialListings, totalResults, currentPage }: MyListingsClientProps) {
  const [activeListing, setActiveListing] = useState<string | null>(null);
  const [hoveredListing, setHoveredListing] = useState<string | null>(null);
  
  // 🔑 NEW: State to track which dropdown menu is currently open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const router = useRouter();
  
  // Calculate total pages based on exactly 12 items per page
  const totalPages = Math.ceil(totalResults / 12);

  const center = useMemo(() => {
    if (initialListings.length === 0) return { lat: 43.6532, lng: -79.3832 };
    const validListings = initialListings.filter(l => l.map?.latitude && l.map?.longitude);
    if (validListings.length === 0) return { lat: 43.6532, lng: -79.3832 };
    
    const lat = validListings.reduce((sum, l) => sum + Number(l.map.latitude), 0) / validListings.length;
    const lng = validListings.reduce((sum, l) => sum + Number(l.map.longitude), 0) / validListings.length;
    return { lat, lng };
  }, [initialListings]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/my-listings?page=${newPage}`);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Toggle dropdown helper
  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      
      {/* FILTER TOP BAR */}
      <div className="border-b border-gray-200 bg-white px-4 py-3 flex items-center justify-between z-20 shrink-0 overflow-visible gap-4">
        <div className="flex items-center w-full max-w-sm border border-gray-200 rounded-full px-4 py-2 bg-gray-50 shrink-0 focus-within:border-navy focus-within:ring-1 focus-within:ring-navy transition-all">
          <Search size={16} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search by city or neighborhood" 
            className="bg-transparent outline-none text-sm w-full text-gray-800 placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0 relative">
          <button className="bg-navy text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:bg-navy-light transition-colors">
            Residential
          </button>
          <button className="border border-gray-200 text-navy px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:bg-gray-50 transition-colors">
            For Sale
          </button>

          {/* 🔑 FUNCTIONAL BEDS DROPDOWN */}
          <div className="relative">
            <button onClick={() => toggleDropdown('beds')} className="border border-gray-200 text-navy px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:bg-gray-50 transition-colors">
              <Bed size={14} className="mr-1" /> Beds <ChevronDown size={14} className={`transition-transform ${openDropdown === 'beds' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'beds' && (
              <div className="absolute top-full mt-2 right-0 bg-white shadow-xl border border-gray-100 rounded-xl p-3 w-48 z-50 flex flex-col gap-1">
                {['Any', '1+ Beds', '2+ Beds', '3+ Beds', '4+ Beds', '5+ Beds'].map(bed => (
                  <button key={bed} onClick={() => setOpenDropdown(null)} className="text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy rounded-lg transition-colors font-medium">
                    {bed}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 🔑 FUNCTIONAL BATHS DROPDOWN */}
          <div className="relative">
            <button onClick={() => toggleDropdown('baths')} className="border border-gray-200 text-navy px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:bg-gray-50 transition-colors">
              <Bath size={14} className="mr-1" /> Baths <ChevronDown size={14} className={`transition-transform ${openDropdown === 'baths' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'baths' && (
              <div className="absolute top-full mt-2 right-0 bg-white shadow-xl border border-gray-100 rounded-xl p-3 w-48 z-50 flex flex-col gap-1">
                {['Any', '1+ Baths', '2+ Baths', '3+ Baths', '4+ Baths'].map(bath => (
                  <button key={bath} onClick={() => setOpenDropdown(null)} className="text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy rounded-lg transition-colors font-medium">
                    {bath}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 🔑 FUNCTIONAL PRICE DROPDOWN */}
          <div className="relative">
            <button onClick={() => toggleDropdown('price')} className="border border-gray-200 text-navy px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:bg-gray-50 transition-colors">
              Price <ChevronDown size={14} className={`transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'price' && (
              <div className="absolute top-full mt-2 right-0 bg-white shadow-xl border border-gray-100 rounded-xl p-5 w-72 z-50">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Price Range</p>
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Min Price" className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-navy" />
                  <span className="text-gray-400">-</span>
                  <input type="text" placeholder="Max Price" className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-navy" />
                </div>
                <button onClick={() => setOpenDropdown(null)} className="w-full mt-4 bg-navy text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-navy-light transition-colors">
                  Apply Filter
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* SPLIT SCREEN LAYOUT */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT SIDE: MAP */}
        <div className="hidden lg:block w-[45%] h-full relative bg-gray-100 border-r border-gray-200 z-0">
          <DynamicMap 
            listings={initialListings.slice(0, 12)} 
            center={center} 
            activeListing={activeListing} 
            setActiveListing={setActiveListing}
            hoveredListing={hoveredListing}
          />
        </div>

        {/* RIGHT SIDE: LISTINGS GRID */}
        <div className="w-full lg:w-[55%] h-full overflow-y-auto p-4 lg:p-6 bg-white relative z-0">
          
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg font-bold text-gray-800">
              <span className="text-gold">{totalResults.toLocaleString()}</span> properties available
            </h1>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button className="p-1.5 bg-white shadow-sm rounded text-navy"><Grid size={16} /></button>
              <button className="p-1.5 text-gray-400 hover:text-gray-800"><ListIcon size={16} /></button>
            </div>
          </div>

          {initialListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {initialListings.slice(0, 12).map((listing) => {
                const img = listing.images?.[0];
                const beds = listing.details?.numBedrooms || 0;
                const baths = listing.details?.numBathrooms || 0;
                const sqft = listing.details?.sqft || "N/A";
                const address = `${listing.address?.streetNumber || ''} ${listing.address?.streetName || ''}, ${listing.address?.city || ''}`;
                const isHovered = hoveredListing === listing.mlsNumber;

                return (
                  <Link 
                    href={`/listings/${listing.mlsNumber}`}
                    key={listing.mlsNumber} 
                    onMouseEnter={() => setHoveredListing(listing.mlsNumber)}
                    onMouseLeave={() => setHoveredListing(null)}
                    className={`flex flex-col group transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-95 hover:opacity-100"}`}
                  >
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 relative bg-gray-100 shadow-sm border border-gray-50">
                      {img && (
                        <img 
                          src={`https://cdn.repliers.io/${img}`} 
                          alt={address} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      )}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded text-navy shadow-sm">
                        {listing.status === "A" ? "Active" : listing.status}
                      </div>
                    </div>
                    <div className="px-1">
                      <h3 className="text-xl font-bold text-navy tracking-tight">{formatPrice(listing.listPrice)}</h3>
                      <p className="text-xs text-gray-500 mt-1 truncate">{address}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-gray-600">
                        <span className="flex items-center gap-1"><Bed size={14} className="text-gray-400"/> {beds}</span>
                        <span className="flex items-center gap-1"><Bath size={14} className="text-gray-400"/> {baths}</span>
                        {sqft !== "N/A" && (
                          <span className="flex items-center gap-1"><Maximize size={12} className="text-gray-400"/> {sqft} sqft</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p>No listings found.</p>
            </div>
          )}

          {/* PAGE NUMBERS BOTTOM SECTION */}
          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2 pb-10">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded border border-gray-200 flex items-center justify-center text-navy hover:bg-gray-50 disabled:opacity-30 transition-colors"
              >
                <ChevronDown size={16} className="rotate-90" />
              </button>
              
              {getVisiblePages().map(p => (
                <button 
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-9 h-9 rounded flex items-center justify-center font-bold text-sm transition-colors ${
                    currentPage === p 
                      ? "border border-navy bg-navy text-white shadow-md" 
                      : "border border-gray-200 text-navy hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded border border-gray-200 flex items-center justify-center text-navy hover:bg-gray-50 disabled:opacity-30 transition-colors"
              >
                <ChevronDown size={16} className="-rotate-90" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}