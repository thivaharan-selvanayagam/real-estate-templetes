import { cookies } from "next/headers";
import Link from "next/link";
import { Lock, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { getListings } from "@/lib/repliers";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata = {
  title: `Recently Sold Properties | ${BRAND_CONFIG.meta.siteName}`,
  description: `Access exclusive GTA sold prices and historical sales data.`,
};

// Safe price formatting helper
const formatPrice = (price?: number | string) => {
  if (!price) return "N/A";
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "N/A";
  return `$${num.toLocaleString()}`;
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

export default async function SoldHomesPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  
  // 1. Pagination Parameters
  const rawPage = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page, 10) : 1;
  const currentPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
  const pageSize = 24;

  // 2. Verify User Session from Cookies
  const cookieStore = await cookies();
  const sessionToken = 
    cookieStore.get("session")?.value || 
    cookieStore.get("auth_token")?.value || 
    cookieStore.get("user")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  const isAuthenticated = Boolean(sessionToken);

  // 3. Fetch Sold Listings with Pagination
  let soldListings: any[] = [];
  let totalCount = 0;

  try {
    // 🔑 Fix TS2353: Declare payload as `any` to prevent excess property checking
    const queryPayload: any = {
      status: "U",
      lastStatus: "Sld",
      class: "Residential",
      pageSize,
      pageNum: currentPage,
      page: currentPage,
      resultsPerPage: pageSize,
    };

    const data: any = await getListings(queryPayload);

    soldListings = data?.listings || [];
    totalCount = Number(data?.numResults || data?.count || data?.metadata?.numResults || soldListings.length);
  } catch (error) {
    console.error("Error fetching sold properties:", error);
  }

  // 4. Calculate Total & Visible Pages
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  
  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
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

  return (
    <main className="min-h-screen bg-stone-50 pt-28 lg:pt-36 pb-20 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles size={13} />
              {isAuthenticated ? "Verified VOW Member Access" : "Exclusive VOW Market Data"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Recently Sold Properties
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Showing <span className="font-bold text-slate-900">{totalCount.toLocaleString()}</span> properties sold across the Greater Toronto Area.
          </p>
        </div>

        {/* Listings Grid Container */}
        <div className="relative">
          
          {/* 🔒 FLOATING BLUR OVERLAY (Only visible when unauthenticated) */}
          {!isAuthenticated && (
            <div className="absolute inset-0 z-30 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-gradient-to-b from-stone-50/40 via-stone-50/70 to-stone-50/95 backdrop-blur-[2px]">
              <div className="sticky top-40 max-w-lg w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl border border-stone-200 text-center">
                
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-[#2b4b46]/10 text-[#2b4b46] flex items-center justify-center shadow-inner">
                  <Lock size={26} />
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2b4b46] bg-emerald-50 px-3 py-1 rounded-full inline-block mb-3">
                  Protected MLS® Sold Data
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Sign In to Reveal Sold Prices
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                  Per Toronto Regional Real Estate Board (TRREB) VOW rules, actual sold prices and transaction histories require free account verification.
                </p>

                <div className="mt-7 space-y-3">
                  <a
                    href={`/api/auth/google?redirect=/sold-homes${currentPage > 1 ? `?page=${currentPage}` : ''}`}
                    className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md text-sm hover:scale-[1.01]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </a>

                  <div className="flex items-center justify-center gap-1.5 text-stone-500 text-[11px] pt-1">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>Free member access • No credit card required</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Cards Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500 ${
              !isAuthenticated ? "filter blur-[6px] select-none pointer-events-none opacity-60" : ""
            }`}
          >
            {soldListings.map((listing) => {
              const img = listing.images?.[0];
              const beds = listing.details?.numBedrooms || listing.bedrooms || 0;
              const baths = listing.details?.numBathrooms || listing.bathrooms || 0;
              const sqft = getFormattedSqft(listing);

              const listed = Number(listing.listPrice || 0);
              const sold = Number(listing.soldPrice || 0);
              const isOverAsking = sold > 0 && listed > 0 && sold > listed;

              const streetNumber = listing.address?.streetNumber || "";
              const streetName = listing.address?.streetName || "";
              const city = listing.address?.city || "";
              const address = `${streetNumber} ${streetName}, ${city}`.trim();

              return (
                <div
                  key={listing.mlsNumber}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200/70 shadow-sm flex flex-col"
                >
                  <div className="aspect-[4/3] w-full relative bg-stone-100 overflow-hidden">
                    {img ? (
                      <img
                        src={img.startsWith("http") ? img : `https://cdn.repliers.io/${img}?w=500`}
                        alt={address}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
                        No Image
                      </div>
                    )}

                    <div className="absolute top-3 left-3 bg-slate-900 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                      Sold
                    </div>

                    {isOverAsking && (
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                        Over Asking
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between text-left">
                    <div>
                      {listed > 0 && (
                        <div className="mb-1">
                          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
                            Listed Price
                          </span>
                          <span className="text-sm font-bold text-stone-500">
                            {formatPrice(listed)}
                          </span>
                        </div>
                      )}

                      <div>
                        <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                          Final Sold Price
                        </span>
                        
                        <span
                          className={`text-2xl font-black text-slate-900 tracking-tight ${
                            !isAuthenticated ? "filter blur-sm select-none" : ""
                          }`}
                        >
                          {isAuthenticated ? formatPrice(sold || listed) : "$•••,•••"}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-stone-600 mt-2 truncate" title={address}>
                        {address || "GTA Property"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-4 text-[11px] font-bold text-stone-500 border-t border-stone-100 pt-3">
                      <span>{beds} Bd</span>
                      <span>{baths} Ba</span>
                      {sqft && <span>{sqft}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🔑 PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className={`mt-14 flex items-center justify-center gap-2 pb-6 ${!isAuthenticated ? "filter blur-sm pointer-events-none opacity-40" : ""}`}>
              
              {/* Previous Page Button */}
              {currentPage > 1 ? (
                <Link
                  href={`/sold-homes?page=${currentPage - 1}`}
                  className="w-10 h-10 rounded-xl border border-stone-200 bg-white flex items-center justify-center text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={18} />
                </Link>
              ) : (
                <div className="w-10 h-10 rounded-xl border border-stone-100 bg-stone-50 flex items-center justify-center text-stone-300 cursor-not-allowed">
                  <ChevronLeft size={18} />
                </div>
              )}

              {/* Numbered Page Links */}
              {visiblePages.map((p) => {
                const isActive = p === currentPage;
                return (
                  <Link
                    key={p}
                    href={`/sold-homes?page=${p}`}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                      isActive
                        ? `${BRAND_CONFIG.theme.primaryBg} text-white shadow-md`
                        : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300 shadow-sm"
                    }`}
                  >
                    {p}
                  </Link>
                );
              })}

              {/* Next Page Button */}
              {currentPage < totalPages ? (
                <Link
                  href={`/sold-homes?page=${currentPage + 1}`}
                  className="w-10 h-10 rounded-xl border border-stone-200 bg-white flex items-center justify-center text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm"
                  aria-label="Next Page"
                >
                  <ChevronRight size={18} />
                </Link>
              ) : (
                <div className="w-10 h-10 rounded-xl border border-stone-100 bg-stone-50 flex items-center justify-center text-stone-300 cursor-not-allowed">
                  <ChevronRight size={18} />
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";