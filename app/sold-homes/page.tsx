import { cookies } from "next/headers";
import Link from "next/link";
import { 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Home, 
  Calendar, 
  Layers,
  Bed,
  Bath,
  Maximize,
  Search,
  MapPin,
  RotateCcw,
  SlidersHorizontal
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";
import GetInTouch from "@/components/GetInTouch";

// 🔑 ALLOWED GTA CITIES ONLY
export const ALLOWED_CITIES = [
  "Toronto",
  // "Etobicoke",
  // "North York",
  // "Scarborough",
  // "East York",
  // "York",
  "Mississauga",
  "Brampton",
  "Vaughan",
  "Markham",
  // "Whitchurch-Stouffville",
  "Stouffville",
  "Pickering",
  "Ajax",
  "Oshawa",
];

interface PageProps {
  searchParams?: Promise<{ 
    page?: string; 
    city?: string; 
    search?: string; 
    beds?: string; 
    minPrice?: string; 
    maxPrice?: string; 
    [key: string]: string | string[] | undefined 
  }>;
}

export const metadata = {
  title: `Recently Sold Portfolio | ${BRAND_CONFIG.meta.siteName}`,
  description: `Access verified GTA sold prices, historical asking prices, and closing records.`,
};

// Safe price formatting helper
const formatPrice = (price?: number | string | null) => {
  if (price === undefined || price === null || price === "" || price === 0) {
    return "Price Upon Request";
  }
  const num = typeof price === "string" ? parseFloat(price.replace(/[^0-9.]/g, "")) : price;
  if (isNaN(num) || num === 0) return "Price Upon Request";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(num);
};

// Parse clean number from API fields
const parsePrice = (value: any): number => {
  if (value === undefined || value === null || value === "") return 0;
  if (typeof value === "number") return value;
  const cleaned = String(value).replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

// Safe date formatter for closed transactions
const formatSoldDate = (dateVal?: string) => {
  if (!dateVal) return "Recently Settled";
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal).split("T")[0];
    return d.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Recently Settled";
  }
};

// Safe sqft formatter (prevents NaN)
const getFormattedSqft = (listing: any) => {
  const raw = listing.details?.sqft || listing.details?.squareFootage || listing.sqft;
  if (!raw) return null;
  const str = String(raw).trim();
  if (!str || str === "0" || str.toLowerCase() === "n/a" || str.toLowerCase() === "null") return null;
  if (str.includes("-")) return `${str} sqft`;
  const parsed = parseFloat(str.replace(/[^0-9.]/g, ""));
  if (isNaN(parsed) || parsed === 0) return null;
  return `${parsed.toLocaleString()} sqft`;
};

// 🔑 DIRECT REPLIERS SOLD FETCH WITH STATUS=U & LASTSTATUS=SLD
async function fetchSoldListings({
  page = 1,
  pageSize = 16,
  city,
  search,
  beds,
  minPrice,
  maxPrice,
}: {
  page?: number;
  pageSize?: number;
  city?: string;
  search?: string;
  beds?: string;
  minPrice?: string;
  maxPrice?: string;
}) {
  const apiKey = process.env.REPLIERS_API_KEY;
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("❌ Repliers API key is missing from environment variables.");
    return { listings: [], totalCount: 0, numPages: 1 };
  }

  try {
    const url = new URL("https://api.repliers.io/listings");
    url.searchParams.set("status", "U");
    url.searchParams.set("lastStatus", "Sld");
    url.searchParams.set("type", "sale");
    url.searchParams.set("resultsPerPage", String(pageSize));
    
    // 🔑 FIX: Repliers API requires `pageNum` for pagination offset
    url.searchParams.set("pageNum", String(page));
    url.searchParams.set("page", String(page));

    // Handle City Filtering
    const normalizedCity = city?.trim().toLowerCase();
    if (normalizedCity && normalizedCity !== "all" && normalizedCity !== "gta") {
      const matchedCity = ALLOWED_CITIES.find(
        (c) => c.toLowerCase() === normalizedCity
      );
      if (matchedCity) {
        url.searchParams.append("city", matchedCity);
      } else {
        ALLOWED_CITIES.forEach((c) => url.searchParams.append("city", c));
      }
    } else {
      ALLOWED_CITIES.forEach((c) => url.searchParams.append("city", c));
    }

    if (search && search.trim()) {
      url.searchParams.set("search", search.trim());
    }
    if (minPrice && !isNaN(Number(minPrice)) && Number(minPrice) > 0) {
      url.searchParams.set("minPrice", minPrice);
    }
    if (maxPrice && !isNaN(Number(maxPrice)) && Number(maxPrice) > 0) {
      url.searchParams.set("maxPrice", maxPrice);
    }
    if (beds && !isNaN(Number(beds)) && Number(beds) > 0) {
      url.searchParams.set("minBedrooms", beds);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "REPLIERS-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(`Repliers API responded with status ${response.status}`);
      return { listings: [], totalCount: 0, numPages: 1 };
    }

    const data = await response.json();
    const rawListings = Array.isArray(data.listings) ? data.listings : [];

    // Boundary filter: Ensure all items match allowed GTA cities
    const filteredListings = rawListings.filter((listing: any) => {
      const listingCity = (listing.address?.city || "").trim().toLowerCase();
      return ALLOWED_CITIES.some((allowed) => {
        const allowedLower = allowed.toLowerCase();
        return (
          listingCity === allowedLower ||
          listingCity.includes(allowedLower) ||
          allowedLower.includes(listingCity)
        );
      });
    });

    const totalCount = Number(data.count || data.numResults || rawListings.length);
    const calculatedPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const numPages = Number(data.numPages) || calculatedPages;

    return {
      listings: filteredListings.length > 0 ? filteredListings : rawListings,
      totalCount,
      numPages,
    };
  } catch (error) {
    console.error("❌ Failed to fetch sold properties from Repliers:", error);
    return { listings: [], totalCount: 0, numPages: 1 };
  }
}

export default async function SoldHomesPage({ searchParams }: PageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const currentPage = Math.max(1, parseInt(resolvedParams.page || "1", 10));
  const currentCity = typeof resolvedParams.city === "string" ? resolvedParams.city : "";
  const currentSearch = typeof resolvedParams.search === "string" ? resolvedParams.search : "";
  const currentBeds = typeof resolvedParams.beds === "string" ? resolvedParams.beds : "";
  const currentMinPrice = typeof resolvedParams.minPrice === "string" ? resolvedParams.minPrice : "";
  const currentMaxPrice = typeof resolvedParams.maxPrice === "string" ? resolvedParams.maxPrice : "";

  const pageSize = 16;

  // 1. Session verification for VOW compliance
  const cookieStore = await cookies();
  const sessionToken = 
    cookieStore.get("session")?.value || 
    cookieStore.get("auth_token")?.value || 
    cookieStore.get("auth-token")?.value || 
    cookieStore.get("user")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  const isAuthenticated = Boolean(sessionToken);

  // 2. Fetch sold listings with active page offset
  const { listings: soldListings, totalCount, numPages } = await fetchSoldListings({
    page: currentPage,
    pageSize,
    city: currentCity,
    search: currentSearch,
    beds: currentBeds,
    minPrice: currentMinPrice,
    maxPrice: currentMaxPrice,
  });

  const hasActiveFilters = Boolean(
    (currentCity && currentCity !== "all" && currentCity !== "gta") ||
    currentSearch ||
    currentBeds ||
    currentMinPrice ||
    currentMaxPrice
  );

  // Helper to maintain query parameters across pagination links
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    params.set("page", String(pageNumber));
    if (currentCity && currentCity !== "all") params.set("city", currentCity);
    if (currentSearch) params.set("search", currentSearch);
    if (currentBeds) params.set("beds", currentBeds);
    if (currentMinPrice) params.set("minPrice", currentMinPrice);
    if (currentMaxPrice) params.set("maxPrice", currentMaxPrice);
    return `/sold-homes?${params.toString()}`;
  };

  // Generate numbered page buttons
  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(numPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();
  const primaryText = BRAND_CONFIG.theme.primaryText || "text-slate-900";

  return (
    <div className="w-full bg-[#FAF9F6] min-h-screen pt-28 lg:pt-36 pb-0 flex flex-col justify-between">
      
      {/* HERO SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-6 pb-8 w-full text-left border-b border-stone-200/70">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 text-xs font-bold text-[#2b4b46] bg-emerald-50/80 tracking-wide uppercase">
            <Sparkles size={12} />
            {isAuthenticated ? "Verified VOW Member Access" : "Exclusive Market Insights"}
          </span>
        </div>

        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${primaryText} uppercase leading-tight max-w-4xl`}>
          Recently Closed Transactions & Sold Properties
        </h1>

        <p className="text-stone-500 text-sm sm:text-base font-medium max-w-2xl mt-3 leading-relaxed">
          {isAuthenticated 
            ? `Displaying verified final transaction values across ${totalCount.toLocaleString()} closed properties in the Greater Toronto Area.`
            : "Under Toronto Regional Real Estate Board (TRREB) VOW compliance regulations, historical sales yields and closing values require a complimentary member sign-in."}
        </p>
      </section>

      {/* DEDICATED SOLD SEARCH & FILTER SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-8 w-full">
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-stone-200/80">
          <form action="/sold-homes" method="GET" className="flex flex-col gap-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
              
              {/* Keyword / Address Search */}
              <div className="lg:col-span-4">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1">
                  <Search size={12} className="text-[#2b4b46]" /> Search Address or MLS®
                </label>
                <input
                  type="text"
                  name="search"
                  defaultValue={currentSearch}
                  placeholder="Street name, address, or MLS#..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-stone-400 focus:outline-none focus:border-[#2b4b46] focus:bg-white transition-all font-medium"
                />
              </div>

              {/* City Selector */}
              <div className="lg:col-span-3">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1">
                  <MapPin size={12} className="text-[#2b4b46]" /> GTA Municipality
                </label>
                <select
                  name="city"
                  defaultValue={currentCity || "all"}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#2b4b46] focus:bg-white transition-all font-semibold"
                >
                  <option value="all">All GTA Municipalities ({ALLOWED_CITIES.length})</option>
                  {ALLOWED_CITIES.map((c) => (
                    <option key={c} value={c.toLowerCase()}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div className="lg:col-span-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1">
                  <Bed size={12} className="text-[#2b4b46]" /> Bedrooms
                </label>
                <select
                  name="beds"
                  defaultValue={currentBeds}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#2b4b46] focus:bg-white transition-all font-semibold"
                >
                  <option value="">Any Beds</option>
                  <option value="1">1+ Beds</option>
                  <option value="2">2+ Beds</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
              </div>

              {/* Min Price */}
              <div className="lg:col-span-1">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1">
                  <DollarSign size={12} className="text-[#2b4b46]" /> Min
                </label>
                <select
                  name="minPrice"
                  defaultValue={currentMinPrice}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-2 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#2b4b46] focus:bg-white transition-all font-semibold"
                >
                  <option value="">Min</option>
                  <option value="500000">$500k</option>
                  <option value="750000">$750k</option>
                  <option value="1000000">$1.0M</option>
                  <option value="1250000">$1.25M</option>
                  <option value="1500000">$1.5M</option>
                  <option value="2000000">$2.0M</option>
                </select>
              </div>

              {/* Max Price */}
              <div className="lg:col-span-1">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1">
                  <DollarSign size={12} className="text-[#2b4b46]" /> Max
                </label>
                <select
                  name="maxPrice"
                  defaultValue={currentMaxPrice}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-2 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#2b4b46] focus:bg-white transition-all font-semibold"
                >
                  <option value="">Max</option>
                  <option value="750000">$750k</option>
                  <option value="1000000">$1.0M</option>
                  <option value="1250000">$1.25M</option>
                  <option value="1500000">$1.5M</option>
                  <option value="2000000">$2.0M</option>
                  <option value="3000000">$3.0M+</option>
                </select>
              </div>

              {/* Search Submit Button */}
              <div className="lg:col-span-1 flex items-center gap-1.5">
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-[#2b4b46] text-white py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Search size={14} /> Search
                </button>
              </div>

            </div>

            {/* Quick City Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-3 border-t border-stone-100 pb-1 scrollbar-none">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider whitespace-nowrap mr-1 flex items-center gap-1">
                <SlidersHorizontal size={11} /> Quick Filter:
              </span>
              
              <Link
                href="/sold-homes"
                prefetch={false}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all whitespace-nowrap ${
                  !currentCity || currentCity === "all" || currentCity === "gta"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                All GTA
              </Link>

              {ALLOWED_CITIES.map((c) => {
                const isSelected = currentCity.toLowerCase() === c.toLowerCase();
                return (
                  <Link
                    key={c}
                    href={`/sold-homes?city=${encodeURIComponent(c.toLowerCase())}`}
                    prefetch={false}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all whitespace-nowrap ${
                      isSelected
                        ? "bg-[#2b4b46] text-white shadow-sm"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-slate-900"
                    }`}
                  >
                    {c}
                  </Link>
                );
              })}

              {hasActiveFilters && (
                <Link
                  href="/sold-homes"
                  prefetch={false}
                  className="ml-auto px-3 py-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 whitespace-nowrap"
                >
                  <RotateCcw size={11} /> Reset Filters
                </Link>
              )}
            </div>

          </form>
        </div>
      </section>

      {/* DATA GRID & INTERACTION AREA */}
      <main className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10 flex-1 w-full relative">
        
        {soldListings.length === 0 ? (
          <div className="w-full text-center py-20 bg-white border border-dashed border-stone-200 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
            <Layers className="mx-auto w-12 h-12 text-stone-300 mb-4" strokeWidth={1.5} />
            <h3 className={`text-lg font-bold ${primaryText} mb-1`}>No Sold Records Found</h3>
            <p className="text-xs text-stone-400 font-medium max-w-xs mx-auto mb-4">
              We couldn't retrieve archived properties matching your current criteria in the selected GTA cities.
            </p>
            {hasActiveFilters && (
              <Link
                href="/sold-homes"
                prefetch={false}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 text-slate-800 text-xs font-bold uppercase tracking-wider hover:bg-stone-200 transition-colors"
              >
                <RotateCcw size={12} /> Clear All Filters
              </Link>
            )}
          </div>
        ) : (
          <div className="relative">

            {/* COMPLIANCE LOCK OVERLAY */}
            {!isAuthenticated && (
              <div className="absolute inset-0 z-30 flex items-start justify-center pt-16 sm:pt-28 px-4 bg-gradient-to-b from-[#FAF9F6]/50 via-[#FAF9F6]/85 to-[#FAF9F6] backdrop-blur-[2px]">
                <div className="sticky top-44 max-w-lg w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl border border-stone-200 text-center">
                  
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-[#2b4b46]/10 text-[#2b4b46] flex items-center justify-center shadow-inner">
                    <Lock size={26} />
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2b4b46] bg-emerald-50 px-3 py-1 rounded-full inline-block mb-3">
                    TRREB VOW Regulated Data
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Reveal Historical Sold Prices
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                    Access final selling yields, original listing price spreads, and transaction settlement dates instantly.
                  </p>

                  <div className="mt-7 space-y-3">
                    <a
                      href={`/api/auth/google?redirect=/sold-homes${currentPage > 1 ? `?page=${currentPage}` : ''}`}
                      className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md text-sm hover:scale-[1.01]"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Continue with Google</span>
                    </a>

                    <div className="flex items-center justify-center gap-1.5 text-stone-500 text-[11px] pt-1">
                      <ShieldCheck size={14} className="text-emerald-600" />
                      <span>Compliant VOW Access • Instant & 100% Free</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 4-COLUMN RESPONSIVE GRID (Keyed by page to trigger immediate DOM updates) */}
            <div
              key={`page-grid-${currentPage}`}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500 ${
                !isAuthenticated ? "filter blur-[6px] select-none pointer-events-none opacity-60" : ""
              }`}
            >
              {soldListings.map((listing: any) => {
                const rawSold =
                  listing.soldPrice ??
                  listing.soldData?.price ??
                  listing.details?.soldPrice ??
                  listing.raw?.ClosePrice ??
                  listing.raw?.Sp_dol;

                const soldPrice = parsePrice(rawSold);

                const rawList =
                  listing.listPrice ??
                  listing.details?.listPrice ??
                  listing.raw?.ListPrice ??
                  listing.raw?.Lp_dol;

                const rawOriginal =
                  listing.originalPrice ??
                  listing.details?.originalPrice ??
                  listing.raw?.OriginalListPrice ??
                  listing.raw?.Ol_dol;

                const listPrice = parsePrice(rawList);
                const originalPrice = parsePrice(rawOriginal);

                let displayListPrice = listPrice;
                if ((displayListPrice === 0 || displayListPrice === soldPrice) && originalPrice > 0) {
                  displayListPrice = originalPrice;
                }
                if (displayListPrice === 0 && originalPrice > 0) {
                  displayListPrice = originalPrice;
                }

                const displaySoldPrice = soldPrice > 0 ? soldPrice : null;

                const hasBoth = displayListPrice > 0 && displaySoldPrice !== null && displaySoldPrice > 0;
                const priceDiff = hasBoth ? (displaySoldPrice! - displayListPrice) : 0;
                const percentDiff = hasBoth && displayListPrice > 0
                  ? ((Math.abs(priceDiff) / displayListPrice) * 100).toFixed(1)
                  : null;

                const isOverAsking = priceDiff > 0;
                const isUnderAsking = priceDiff < 0;

                const settledDate = listing.soldDate || listing.soldData?.soldDate || listing.closedDate || listing.updatedOn;
                const beds = listing.details?.numBedrooms || listing.bedrooms || 0;
                const baths = listing.details?.numBathrooms || listing.bathrooms || 0;
                const sqft = getFormattedSqft(listing);

                const streetAddress = `${listing.address?.streetNumber || ""} ${listing.address?.streetName || ""}`.trim();
                const cityArea = `${listing.address?.city || ""}, ${listing.address?.state || "ON"}`;

                let mainPhoto = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600";
                if (listing.images && listing.images.length > 0) {
                  const img = listing.images[0];
                  mainPhoto = img.startsWith("http") ? img : `https://cdn.repliers.io/${img.replace(/^\//, "")}?w=600`;
                }

                const cardContent = (
                  <>
                    <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                      <img 
                        src={mainPhoto} 
                        alt={streetAddress || "Sold GTA Property"} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      <div className="absolute top-3.5 left-3.5 bg-slate-900/90 backdrop-blur-md text-white font-extrabold text-[9px] tracking-widest px-3 py-1 rounded-full uppercase z-10 shadow-md">
                        Sold Portfolio
                      </div>

                      {isOverAsking && (
                        <div className="absolute top-3.5 right-3.5 bg-emerald-600 text-white font-black text-[9px] tracking-wider px-2.5 py-1 rounded-full uppercase z-10 shadow-md flex items-center gap-1">
                          <TrendingUp size={11} /> Over Asking
                        </div>
                      )}
                      {isUnderAsking && (
                        <div className="absolute top-3.5 right-3.5 bg-amber-700 text-white font-black text-[9px] tracking-wider px-2.5 py-1 rounded-full uppercase z-10 shadow-md flex items-center gap-1">
                          <TrendingDown size={11} /> Under Asking
                        </div>
                      )}
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-grow text-left">
                      <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase mb-1">
                        MLS® #{listing.mlsNumber}
                      </span>

                      <h3 className={`font-display text-lg font-bold tracking-tight ${primaryText} mb-0.5 transition-colors line-clamp-1`}>
                        {streetAddress || "Confidential GTA Address"}
                      </h3>

                      <p className="text-xs text-stone-500 font-medium mb-4">
                        {cityArea}
                      </p>

                      <div className="bg-stone-50/80 border border-stone-200/80 rounded-2xl p-3.5 space-y-2 mb-4 text-xs font-medium">
                        <div className="flex items-center justify-between text-stone-500">
                          <span className="flex items-center gap-1 text-[11px]">
                            <DollarSign size={12} className="text-stone-400" /> Original List:
                          </span>
                          <span className="font-semibold text-stone-600 line-through decoration-stone-300 text-xs">
                            {formatPrice(displayListPrice)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between border-t border-stone-200/60 pt-2">
                          <span className="flex items-center gap-1 font-bold text-stone-800 text-[11px]">
                            <Home size={12} className="text-emerald-700" /> Final Sold:
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-sm sm:text-base font-black text-emerald-700">
                              {isAuthenticated 
                                ? (displaySoldPrice ? formatPrice(displaySoldPrice) : "Price Withheld") 
                                : "$•••,•••"}
                            </span>
                            
                            {isAuthenticated && hasBoth && priceDiff !== 0 && percentDiff && (
                              <span className={`text-[9px] font-extrabold px-1 py-0.5 rounded ${
                                isOverAsking ? "text-emerald-800 bg-emerald-100/80" : "text-amber-800 bg-amber-100/80"
                              }`}>
                                {isOverAsking ? `+${percentDiff}%` : `-${percentDiff}%`}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-medium text-stone-400 pt-0.5">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} className="text-stone-400" /> Settled:
                          </span>
                          <span className="font-semibold text-stone-600">
                            {formatSoldDate(settledDate)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-stone-500 text-xs pt-3 border-t border-stone-100 font-bold mt-auto">
                        <span className="flex items-center gap-1">
                          <Bed size={13} className="text-stone-400" /> {beds} Beds
                        </span>
                        <span className="text-stone-300">•</span>
                        <span className="flex items-center gap-1">
                          <Bath size={13} className="text-stone-400" /> {baths} Baths
                        </span>
                        {sqft && (
                          <>
                            <span className="text-stone-300">•</span>
                            <span className="flex items-center gap-1">
                              <Maximize size={12} className="text-stone-400" /> {sqft}
                            </span>
                          </>
                        )}
                      </div>

                    </div>
                  </>
                );

                if (isAuthenticated) {
                  return (
                    <Link
                      key={listing.mlsNumber}
                      href={`/sold-homes/${listing.mlsNumber}`}
                      className="group bg-white rounded-3xl overflow-hidden border border-stone-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                    >
                      {cardContent}
                    </Link>
                  );
                }

                return (
                  <div
                    key={listing.mlsNumber}
                    className="bg-white rounded-3xl overflow-hidden border border-stone-200/70 shadow-sm flex flex-col"
                  >
                    {cardContent}
                  </div>
                );
              })}
            </div>

            {/* 🔑 DYNAMIC PAGINATION CONTROLS (With Numbered Buttons) */}
            {numPages > 1 && (
              <div className={`flex flex-wrap items-center justify-center gap-2 mt-16 pt-8 border-t border-stone-200/60 ${!isAuthenticated ? "filter blur-sm pointer-events-none opacity-40" : ""}`}>
                
                {/* Previous Button */}
                {currentPage > 1 ? (
                  <Link
                    href={createPageUrl(currentPage - 1)}
                    prefetch={false}
                    className={`flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold uppercase tracking-wider ${primaryText} hover:bg-stone-50 transition-colors shadow-sm`}
                  >
                    <ChevronLeft size={16} /> Prev
                  </Link>
                ) : (
                  <div className="flex items-center gap-1 px-4 py-2 rounded-xl bg-stone-100 border border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-400 cursor-not-allowed select-none">
                    <ChevronLeft size={16} /> Prev
                  </div>
                )}

                {/* Numbered Page Buttons */}
                {visiblePages.map((p) => {
                  const isActive = p === currentPage;
                  return (
                    <Link
                      key={p}
                      href={createPageUrl(p)}
                      prefetch={false}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                        isActive
                          ? "bg-slate-900 text-white shadow-md scale-105"
                          : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300 shadow-sm"
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}

                {/* Next Button */}
                {currentPage < numPages ? (
                  <Link
                    href={createPageUrl(currentPage + 1)}
                    prefetch={false}
                    className={`flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold uppercase tracking-wider ${primaryText} hover:bg-stone-50 transition-colors shadow-sm`}
                  >
                    Next <ChevronRight size={16} />
                  </Link>
                ) : (
                  <div className="flex items-center gap-1 px-4 py-2 rounded-xl bg-stone-100 border border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-400 cursor-not-allowed select-none">
                    Next <ChevronRight size={16} />
                  </div>
                )}

                <span className="w-full text-center text-[11px] font-bold text-stone-400 mt-2 block">
                  Page {currentPage} of {numPages} ({totalCount.toLocaleString()} listings)
                </span>
              </div>
            )}

          </div>
        )}
      </main>

      {/* FOOTER CTA */}
      <GetInTouch dark={true} />
    </div>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;