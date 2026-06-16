"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link"; 
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Search, ChevronDown, Grid, List as ListIcon, Bed, Bath, Maximize } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

// Dynamic import for Leaflet map to prevent SSR crashes completely
const DynamicMap = dynamic(() => import("./ListingsMap"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold uppercase tracking-widest text-xs animate-pulse">Loading Map Layer...</div> 
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
};

interface ListingsGridProps {
  type: string;
  propertyClass: string;
  initialListings: any[];
  initialTotal: number;
  initialSearch: string;
  currentPage: number;
  currentMinPrice: string;
  currentMaxPrice: string;
  currentBeds: string;
  currentBaths: string;
}

export default function ListingsGrid({ 
  initialListings = [], 
  initialSearch, 
  initialTotal, 
  currentPage = 1,
  type,
  propertyClass,
  currentMinPrice,
  currentMaxPrice,
  currentBeds,
  currentBaths
}: ListingsGridProps) {
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"split" | "grid">("split");
  
  const [activeListing, setActiveListing] = useState<string | null>(null);
  const [hoveredListing, setHoveredListing] = useState<string | null>(null);

  useEffect(() => {
    setSearchInput(initialSearch);
  }, [initialSearch]);

  // --- PAGINATION MATH ---
  const listingsPerPage = 24;
  
  const totalResults = useMemo(() => {
    if (initialTotal && initialTotal > 0) return initialTotal;
    if (initialListings && initialListings.length > 0) return initialListings.length * 8;
    return 0;
  }, [initialTotal, initialListings]);

  const totalPages = useMemo(() => {
    const pages = Math.ceil(totalResults / listingsPerPage);
    return pages > 0 ? pages : 1;
  }, [totalResults, listingsPerPage]);

  const stableMapCenter = useMemo(() => {
    if (!initialListings || initialListings.length === 0) return { lat: 43.6532, lng: -79.3832 };
    const validListings = initialListings.filter(l => l?.map?.latitude && l?.map?.longitude);
    if (validListings.length === 0) return { lat: 43.6532, lng: -79.3832 };
    
    const lat = validListings.reduce((sum, l) => sum + Number(l.map.latitude), 0) / validListings.length;
    const lng = validListings.reduce((sum, l) => sum + Number(l.map.longitude), 0) / validListings.length;
    return { lat, lng };
  }, [initialListings]);

  // Syncs parameters to the URL query string
  const applyFilters = (updates: Record<string, string>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", "1");

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all" || value === "Any") {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    setOpenDropdown(null);
    router.push(`/all-homes?${current.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("page", newPage.toString());
      router.push(`/all-homes?${current.toString()}`);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const cleanPrimaryClass = BRAND_CONFIG.theme.primaryText.replace('text-', '');
  const focusBorderPrimary = `focus-within:border-${cleanPrimaryClass} focus:border-${cleanPrimaryClass}`;
  const focusRingPrimary = `focus-within:ring-${cleanPrimaryClass}`;

  // Helper labels for cleaner button UI text
  const displayBedsLabel = currentBeds === "Any" ? "Any" : `${currentBeds}+ Beds`;
  const displayBathsLabel = currentBaths === "Any" ? "Any" : `${currentBaths}+ Baths`;

  return (
    <div className="flex flex-col flex-1 h-[calc(100vh-80px)] w-full overflow-hidden bg-neutral-50">
      
      {/* ─── FILTER TOP BAR ─── */}
      <div className="border-b border-gray-200 bg-white px-6 py-4 flex flex-wrap items-center justify-between z-30 shrink-0 overflow-visible gap-4 w-full shadow-sm">
        
        {/* Search Input Field */}
        <div className={`flex items-center w-full sm:max-w-xs md:max-w-sm border border-gray-200 rounded-full px-4 py-2 bg-gray-50 shrink-0 ${focusBorderPrimary} ${focusRingPrimary} focus-within:ring-1 transition-all`}>
          <Search size={16} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search by city, neighborhood, MLS#..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') applyFilters({ search: searchInput });
            }}
            className="bg-transparent outline-none text-sm w-full text-gray-800 placeholder:text-gray-400"
          />
        </div>

        {/* Dropdowns Filters Deck Container */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 relative">
          
          {/* PROPERTY CLASS SWITCH */}
          <select
            value={propertyClass}
            onChange={(e) => applyFilters({ class: e.target.value })}
            className={`border border-gray-200 ${BRAND_CONFIG.theme.primaryText} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide outline-none bg-white cursor-pointer hover:bg-gray-50 transition-colors`}
          >
            <option value="all">All Classifications</option>
            <option value="Residential">Residential Feed</option>
            <option value="Commercial">Commercial Portfolio</option>
          </select>

          {/* TRANSACTION TYPE TOGGLE */}
          <select
            value={type}
            onChange={(e) => applyFilters({ type: e.target.value })}
            className={`border border-gray-200 ${BRAND_CONFIG.theme.primaryText} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide outline-none bg-white cursor-pointer hover:bg-gray-50 transition-colors`}
          >
            <option value="all">Buy or Lease</option>
            <option value="sale">For Sale</option>
            <option value="lease">For Lease</option>
          </select>

          {propertyClass !== "Commercial" && (
            <>
              {/* BEDS FILTER */}
              <div className="relative">
                <button onClick={() => toggleDropdown('beds')} className={`border border-gray-200 ${BRAND_CONFIG.theme.primaryText} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:bg-gray-50 transition-colors`}>
                  <Bed size={14} className="mr-1" /> Beds ({displayBedsLabel}) <ChevronDown size={14} className={`transition-transform ${openDropdown === 'beds' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'beds' && (
                  <div className="absolute top-full mt-2 right-0 bg-white shadow-xl border border-gray-100 rounded-xl p-3 w-48 z-50 flex flex-col gap-1">
                    {/* 🔑 FIXED: Maps matching clean numeric items directly into URL state to ensure API processes query counts */}
                    {[
                      { val: "Any", label: "Any Beds" },
                      { val: "1", label: "1+ Beds" },
                      { val: "2", label: "2+ Beds" },
                      { val: "3", label: "3+ Beds" },
                      { val: "4", label: "4+ Beds" },
                      { val: "5", label: "5+ Beds" }
                    ].map(bed => (
                      <button 
                        key={bed.val} 
                        onClick={() => applyFilters({ beds: bed.val })} 
                        className={`text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium ${currentBeds === bed.val ? BRAND_CONFIG.theme.accentText : ""}`}
                      >
                        {bed.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* BATHS FILTER */}
              <div className="relative">
                <button onClick={() => toggleDropdown('baths')} className={`border border-gray-200 ${BRAND_CONFIG.theme.primaryText} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:bg-gray-50 transition-colors`}>
                  <Bath size={14} className="mr-1" /> Baths ({displayBathsLabel}) <ChevronDown size={14} className={`transition-transform ${openDropdown === 'baths' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'baths' && (
                  <div className="absolute top-full mt-2 right-0 bg-white shadow-xl border border-gray-100 rounded-xl p-3 w-48 z-50 flex flex-col gap-1">
                    {/* 🔑 FIXED: Maps matching clean numeric items directly into URL state to ensure API processes query counts */}
                    {[
                      { val: "Any", label: "Any Baths" },
                      { val: "1", label: "1+ Baths" },
                      { val: "2", label: "2+ Baths" },
                      { val: "3", label: "3+ Baths" },
                      { val: "4", label: "4+ Baths" }
                    ].map(bath => (
                      <button 
                        key={bath.val} 
                        onClick={() => applyFilters({ baths: bath.val })} 
                        className={`text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium ${currentBaths === bath.val ? BRAND_CONFIG.theme.accentText : ""}`}
                      >
                        {bath.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* PRICE RANGE DROPDOWN */}
          <div className="relative">
            <button onClick={() => toggleDropdown('price')} className={`border border-gray-200 ${BRAND_CONFIG.theme.primaryText} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:bg-gray-50 transition-colors`}>
              Price Range <ChevronDown size={14} className={`transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'price' && (
              <div className="absolute top-full mt-2 right-0 bg-white shadow-xl border border-gray-100 rounded-xl p-5 w-72 z-50">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Custom Constraints</p>
                <div className="flex items-center gap-2">
                  <input id="minPriceInput" type="number" placeholder="Min Price" defaultValue={currentMinPrice} className={`w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none ${focusBorderPrimary}`} />
                  <span className="text-gray-400">-</span>
                  <input id="maxPriceInput" type="number" placeholder="Max Price" defaultValue={currentMaxPrice} className={`w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none ${focusBorderPrimary}`} />
                </div>
                <button 
                  onClick={() => {
                    const minEl = document.getElementById("minPriceInput") as HTMLInputElement;
                    const maxEl = document.getElementById("maxPriceInput") as HTMLInputElement;
                    applyFilters({ minPrice: minEl?.value, maxPrice: maxEl?.value });
                  }} 
                  className={`w-full mt-4 ${BRAND_CONFIG.theme.primaryBg} text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-colors shadow-md`}
                >
                  Apply Filter
                </button>
              </div>
            )}
          </div>

          {(initialSearch || currentMinPrice || currentMaxPrice || currentBeds !== "Any" || currentBaths !== "Any" || propertyClass !== "all" || type !== "all") && (
            <button onClick={() => router.push('/all-homes')} className="text-xs font-bold text-red-500 hover:underline px-2 py-1">
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* ─── DISPLAY SYSTEM PANELS ─── */}
      <div className="flex flex-1 overflow-hidden relative w-full h-full">
        
        {/* LEFT SIDE MAP CONTAINER */}
        {viewMode === "split" && (
          <div className="hidden lg:block lg:w-[45%] h-full relative border-r border-gray-200 bg-neutral-100">
            <div className="absolute inset-0 w-full h-full">
              <DynamicMap 
                listings={initialListings} 
                center={stableMapCenter} 
                activeListing={activeListing} 
                setActiveListing={setActiveListing}
                hoveredListing={hoveredListing}
                setHoveredListing={setHoveredListing}
              />
            </div>
          </div>
        )}

        {/* RIGHT SIDEBAR COMPONENT PANEL: Listings Grid */}
        <div id="listings-grid-scroll-wrap" className={`h-full overflow-y-auto p-4 lg:p-6 bg-white relative transition-all duration-300 ${viewMode === "split" ? "w-full lg:w-[55%]" : "w-full"}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-gray-800">
              Showing <span className={BRAND_CONFIG.theme.accentText}>{totalResults.toLocaleString()}</span> listings found across Canada
            </h2>
            
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              <button onClick={() => setViewMode("split")} className={`p-1.5 rounded-lg transition-all ${viewMode === "split" ? `bg-white shadow-sm ${BRAND_CONFIG.theme.primaryText}` : "text-gray-400 hover:text-gray-700"}`}><Grid size={16} /></button>
              <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? `bg-white shadow-sm ${BRAND_CONFIG.theme.primaryText}` : "text-gray-400 hover:text-gray-700"}`}><ListIcon size={16} /></button>
            </div>
          </div>

          {initialListings.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === "split" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}`}>
              {initialListings.map((listing) => {
                const img = listing.images?.[0];
                const bedsCount = listing.details?.numBedrooms || 0;
                const bathsCount = listing.details?.numBathrooms || 0;
                const sqftMeasure = listing.details?.sqft || "N/A";
                const streetAddress = `${listing.address?.streetNumber || ''} ${listing.address?.streetName || ''}`.trim();
                const completeAddress = `${streetAddress}, ${listing.address?.city || ''}, ${listing.address?.state || listing.address?.area || ''}`.trim().replace(/,\s*$/, "");
                const isHovered = hoveredListing === listing.mlsNumber;

                return (
                  <Link 
                    href={`/listings/${listing.mlsNumber}`}
                    key={listing.mlsNumber} 
                    onMouseEnter={() => setHoveredListing(listing.mlsNumber)}
                    onMouseLeave={() => setHoveredListing(null)}
                    className={`flex flex-col group transition-all duration-300 border border-gray-100 bg-white p-3 rounded-3xl ${isHovered ? "shadow-xl border-gray-300 scale-[1.01]" : "shadow-sm"}`}
                  >
                    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 relative bg-gray-100 border border-gray-50">
                      {img ? <img src={`https://cdn.repliers.io/${img}?w=500`} alt={completeAddress} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104" /> : <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase bg-neutral-900">No Image</div>}
                      <div className={`absolute top-3 left-3 bg-white/90 backdrop-blur text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${BRAND_CONFIG.theme.primaryText} shadow-sm`}>{listing.type === "lease" || listing.status === "Lsd" ? "For Lease" : "For Sale"}</div>
                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-[9px] font-bold text-white uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">{listing.class || "Residential"}</div>
                    </div>

                    <div className="px-1 text-left">
                      <h3 className={`text-lg font-black ${BRAND_CONFIG.theme.primaryText} tracking-tight`}>{formatPrice(listing.listPrice)}</h3>
                      <p className="text-xs font-semibold text-gray-500 mt-0.5 truncate" title={completeAddress}>{completeAddress || "Premium Property"}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs font-bold text-gray-400 border-t border-gray-50 pt-2.5">
                        {(listing.class || "").toLowerCase() === "commercial" ? <span className="text-xs uppercase tracking-wide font-extrabold text-[#2F527E]">Commercial Asset</span> : <><span className="flex items-center gap-1"><Bed size={14} className="text-gray-400"/> {bedsCount} Bd</span><span className="flex items-center gap-1"><Bath size={14} className="text-gray-400"/> {bathsCount} Ba</span></>}
                        {sqftMeasure !== "N/A" && sqftMeasure !== "0" && <span className="flex items-center gap-1 ml-auto"><Maximize size={12} className="text-gray-400"/> {Number(sqftMeasure).toLocaleString()} sqft</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-200 rounded-3xl bg-neutral-50 p-6 w-full">
              <p className="text-sm font-bold text-gray-400">No properties found matching criteria.</p>
            </div>
          )}

          {/* PAGINATION PANEL */}
          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2 pb-10">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-30 transition-colors bg-white shadow-sm"><ChevronDown size={16} className="rotate-90" /></button>
              {getVisiblePages().map(p => (
                <button key={p} onClick={() => handlePageChange(p)} className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${currentPage === p ? `border-2 border-transparent ${BRAND_CONFIG.theme.primaryBg} text-white shadow-md` : "border border-gray-200 hover:bg-gray-50 bg-white shadow-sm"}`}>{p}</button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-30 transition-colors bg-white shadow-sm"><ChevronDown size={16} className="-rotate-90" /></button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}