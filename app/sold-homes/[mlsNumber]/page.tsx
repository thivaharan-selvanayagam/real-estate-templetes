import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { 
  ArrowLeft, 
  Share2, 
  DollarSign, 
  Home, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Send, 
  Phone, 
  Link2, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { getListing, formatAddress, formatFullAddress } from "@/lib/repliers";
import GetInTouch from "@/components/GetInTouch";
import ListingImageGallery from "@/components/ListingImageGallery";
import { BRAND_CONFIG } from "@/config/brand";

interface PageProps {
  params: Promise<{ mlsNumber: string }>;
}

export const metadata = { 
  title: `Sold Property Record | ${BRAND_CONFIG.meta.siteName}` 
};

// Safe price parser
const parsePrice = (value: any): number => {
  if (value === undefined || value === null || value === "") return 0;
  if (typeof value === "number") return value;
  const cleaned = String(value).replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

// CAD Standard Currency Formatter
const formatCurrency = (price?: number | string | null) => {
  if (!price) return "Price Upon Request";
  const num = typeof price === "string" ? parsePrice(price) : price;
  if (isNaN(num) || num === 0) return "Price Upon Request";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(num);
};

// Date formatter
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

export default async function SoldListingDetailPage({ params }: PageProps) {
  const { mlsNumber } = await params;

  // 1. Session verification for TRREB VOW compliance
  const cookieStore = await cookies();
  const sessionToken = 
    cookieStore.get("session")?.value || 
    cookieStore.get("auth_token")?.value || 
    cookieStore.get("auth-token")?.value || 
    cookieStore.get("user")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  const isAuthenticated = Boolean(sessionToken);

  // If unauthenticated, gate the details page
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-stone-50 pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-200 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#2b4b46]/10 text-[#2b4b46] flex items-center justify-center shadow-inner">
            <Lock size={28} />
          </div>

          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2b4b46] bg-emerald-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Protected MLS® Sold Archive
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sign In to View Sold Details
          </h1>

          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Per Toronto Regional Real Estate Board (TRREB) VOW rules, historical sold yields, closing dates, and transaction records for MLS® #{mlsNumber} require free account authentication.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={`/api/auth/google?redirect=/sold-homes/${mlsNumber}`}
              className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-md text-sm hover:scale-[1.01]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </a>

            <div className="flex items-center justify-center gap-2 text-stone-500 text-xs pt-2">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Free instant access • No password needed</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 2. Fetch Listing Data
  let listing: any;
  try { 
    listing = await getListing(mlsNumber); 
  } catch (e) { 
    notFound(); 
  }

  const d = listing.details || {};
  const address = formatAddress(listing.address);
  const fullAddress = formatFullAddress(listing.address);
  const imgs = listing.images || [];

  const getSafeImageUrl = (src: string | undefined) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("/")) return src;
    return `https://cdn.repliers.io/${src.replace(/^\//, "")}`;
  };

  const safeImages = imgs.map(getSafeImageUrl);

  // 3. Price & Spread Extractions
  const rawSold =
    listing.soldPrice ??
    listing.soldData?.price ??
    listing.details?.soldPrice ??
    listing.raw?.ClosePrice ??
    listing.raw?.Sp_dol;

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

  const soldPrice = parsePrice(rawSold);
  const listPrice = parsePrice(rawList);
  const originalPrice = parsePrice(rawOriginal);

  let displayListPrice = listPrice;
  if ((displayListPrice === 0 || displayListPrice === soldPrice) && originalPrice > 0) {
    displayListPrice = originalPrice;
  }
  if (displayListPrice === 0 && originalPrice > 0) {
    displayListPrice = originalPrice;
  }

  const finalSoldPrice = soldPrice > 0 ? soldPrice : listPrice;
  const priceDiff = finalSoldPrice - displayListPrice;
  const hasDiff = displayListPrice > 0 && finalSoldPrice > 0 && priceDiff !== 0;
  const percentDiff = hasDiff ? ((Math.abs(priceDiff) / displayListPrice) * 100).toFixed(1) : null;
  const isOverAsking = priceDiff > 0;
  const isUnderAsking = priceDiff < 0;

  const settledDate = listing.soldDate || listing.soldData?.soldDate || listing.closedDate || listing.updatedOn;
  const dom = listing.daysOnMarket || listing.soldData?.daysOnMarket || d.daysOnMarket || null;

  // Property Features
  const beds = d.numBedrooms ? `${d.numBedrooms}${d.numBedroomsPlus ? `+${d.numBedroomsPlus}` : ""}` : "-";
  const baths = d.numBathrooms ? `${d.numBathrooms}${d.numBathroomsPlus ? `+${d.numBathroomsPlus}` : ""}` : "-";
  const sqft = d.sqft || "-";
  const parking = (d as any).numParkingSpaces || (d as any).numGarageSpaces || "-";
  const mapQuery = encodeURIComponent(fullAddress);

  return (
    <div className="bg-white min-h-screen pt-24 text-slate-900">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        
        {/* 1. TOP BREADCRUMB */}
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-6 border-b border-stone-100 pb-4">
          <Link href="/sold-homes" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
            <ArrowLeft size={14} /> Back to Sold Properties
          </Link>
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            <CheckCircle2 size={12} /> Closed MLS® Transaction
          </div>
        </div>

        {/* 2. HEADER: TITLE & SOLD VS LISTED PRICING */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">
                Sold Portfolio
              </span>
              <span className="text-xs font-semibold text-stone-400">
                MLS® #{mlsNumber}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 max-w-3xl leading-tight">
              {fullAddress}
            </h1>
          </div>

          {/* Pricing Stack */}
          <div className="flex flex-col items-start lg:items-end">
            <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider">
              Final Sold Price
            </span>
            <div className="text-4xl md:text-5xl font-black text-emerald-600 tracking-tight">
              {formatCurrency(finalSoldPrice)}
            </div>
            
            {displayListPrice > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-stone-400 font-medium">Original List:</span>
                <span className="text-sm font-semibold text-stone-500 line-through">
                  {formatCurrency(displayListPrice)}
                </span>

                {hasDiff && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    isOverAsking ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {isOverAsking ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {isOverAsking ? `+${formatCurrency(priceDiff)} (+${percentDiff}%)` : `-${formatCurrency(Math.abs(priceDiff))} (-${percentDiff}%)`}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Spec Pills */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-8 border-b border-stone-100 pb-6">
          <span>Beds <span className="text-slate-900 text-sm ml-1 font-extrabold">{beds}</span></span>
          <span className="w-px h-4 bg-stone-200"></span>
          <span>Baths <span className="text-slate-900 text-sm ml-1 font-extrabold">{baths}</span></span>
          <span className="w-px h-4 bg-stone-200"></span>
          <span>Sqft <span className="text-slate-900 text-sm ml-1 font-extrabold">{sqft}</span></span>
          <span className="w-px h-4 bg-stone-200"></span>
          <span>Parking <span className="text-slate-900 text-sm ml-1 font-extrabold">{parking}</span></span>
        </div>

        {/* 3. IMAGE GALLERY */}
        <ListingImageGallery images={safeImages} address={address} />

        {/* 4. MAIN DETAIL CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative mt-10">
          
          {/* LEFT COLUMN: SPECS & MAP (Spans 8 columns) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Transaction Intelligence Card */}
            <div className="bg-[#FAF9F6] border border-stone-200 rounded-3xl p-6 sm:p-8">
              <h2 className="font-display text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-[#2b4b46]" /> Transaction Intelligence Record
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1">Final Sold Yield</p>
                  <p className="text-lg font-black text-emerald-700">{formatCurrency(finalSoldPrice)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1">Asking List Price</p>
                  <p className="text-lg font-bold text-slate-800">{formatCurrency(displayListPrice)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1">Settled Date</p>
                  <p className="text-sm font-bold text-slate-800">{formatSoldDate(settledDate)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1">Days on Market</p>
                  <p className="text-sm font-bold text-slate-800">{dom ? `${dom} Days` : "Fast Settlement"}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-4">Property Description</h2>
              <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
                {d.description || "No official description provided for this closed listing archive."}
              </p>
            </div>

            {/* Embedded Google Map */}
            <div id="property-map" className="w-full h-[400px] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 relative">
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                referrerPolicy="no-referrer-when-downgrade" 
                src={`https://maps.google.com/maps?q=${mapQuery}&t=m&z=15&output=embed&iwloc=near`}
              ></iframe>
            </div>

            {/* Home Details & Features Breakdown */}
            <div className="flex flex-col gap-8">
              
              {/* Home Details */}
              <div>
                <h3 className="font-display text-xl font-bold mb-4 border-b border-stone-200 pb-3">Home Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Closing Status</p>
                    <p className="text-sm font-bold text-emerald-700">Sold (Closed)</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Style</p>
                    <p className="text-sm font-semibold">{d.style || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Property Type</p>
                    <p className="text-sm font-semibold">{d.propertyType || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Year Built</p>
                    <p className="text-sm font-semibold">{d.yearBuilt || "UNKNOWN"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Settlement Date</p>
                    <p className="text-sm font-semibold">{formatSoldDate(settledDate)}</p>
                  </div>
                </div>
              </div>

              {/* Interior Features */}
              <div>
                <h3 className="font-display text-xl font-bold mb-4 border-b border-stone-200 pb-3">Features & Layout</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Bedrooms</p>
                    <p className="text-sm font-semibold">{beds}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Bathrooms</p>
                    <p className="text-sm font-semibold">{baths}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Heating</p>
                    <p className="text-sm font-semibold">{d.heating || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Cooling</p>
                    <p className="text-sm font-semibold">{d.cooling || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Parking</p>
                    <p className="text-sm font-semibold">{parking} Spaces</p>
                  </div>
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h3 className="font-display text-xl font-bold mb-4">Appliances & Inclusions</h3>
                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                  <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-2">Inclusions</p>
                  <p className="text-sm leading-relaxed text-stone-700">{d.extras || "None specified in MLS record."}</p>
                </div>
              </div>

              {/* Exterior */}
              <div>
                <h3 className="font-display text-xl font-bold mb-4 border-b border-stone-200 pb-3">Exterior & Lot</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Construction</p>
                    <p className="text-sm font-semibold">{d.exteriorConstruction1 || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Lot Size</p>
                    <p className="text-sm font-semibold">{listing.lot?.width ? `${listing.lot.width} x ${listing.lot.depth} Feet` : "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Garage</p>
                    <p className="text-sm font-semibold">{d.garage || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Property Taxes</p>
                    <p className="text-sm font-semibold">
                      {listing.taxes?.annualAmount ? formatCurrency(listing.taxes.annualAmount) : "-"}
                      <span className="text-[10px] text-stone-400 font-normal ml-1">({listing.taxes?.assessmentYear || new Date().getFullYear()})</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Listing Brokerage */}
              <div>
                <h3 className="font-display text-xl font-bold mb-4">Historical Brokerage Representation</h3>
                <div className="border border-stone-200 p-6 rounded-2xl w-full sm:w-2/3">
                  <p className="text-[10px] uppercase text-stone-400 tracking-widest mb-1">Listing Office</p>
                  <p className="text-sm font-bold uppercase text-slate-800">{listing.office?.brokerageName || "Unknown Brokerage"}</p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDEBAR: MARKET EVALUATION & ADVISORY (Spans 4 columns) */}
          <div className="lg:col-span-4 sticky top-28 z-10 w-full space-y-6">
            
            {/* Sidebar Card 1: What is Your Home Worth? */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xl">
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-emerald-600 relative">
                  <Image 
                    src={BRAND_CONFIG.agent.headshot} 
                    alt={BRAND_CONFIG.agent.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-lg">{BRAND_CONFIG.agent.name}</h3>
                  <p className="text-xs text-stone-500 font-medium">{BRAND_CONFIG.agent.title}</p>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold mt-1">{BRAND_CONFIG.brokerage.shortName}</p>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="font-black text-slate-900 text-base">Curious What Your Home Is Worth?</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Request a confidential comparative market analysis based on recent closings near {address || "this neighborhood"}.
                </p>
              </div>

              {/* Evaluation Request Form */}
              <form className="flex flex-col gap-3.5">
                <input type="hidden" name="soldReferenceMls" value={mlsNumber} />
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-slate-900 focus:bg-white transition-colors placeholder:text-stone-400 text-slate-900" 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-slate-900 focus:bg-white transition-colors placeholder:text-stone-400 text-slate-900" 
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-slate-900 focus:bg-white transition-colors placeholder:text-stone-400 text-slate-900" 
                />
                <textarea 
                  rows={3} 
                  placeholder="Tell us about your property..." 
                  className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-slate-900 focus:bg-white transition-colors resize-none placeholder:text-stone-400 text-slate-900" 
                  defaultValue={`I saw ${fullAddress} sold recently. I'd like a market valuation for my home nearby.`} 
                />
                
                <button 
                  type="button" 
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#2b4b46] transition-colors shadow-md mt-1"
                >
                  <Send size={15} /> Request Market Analysis
                </button>
              </form>

              {/* Direct Phone Call */}
              <div className="mt-4 pt-4 border-t border-stone-100">
                <a 
                  href={`tel:${BRAND_CONFIG.agent.phoneRaw}`} 
                  className="w-full flex items-center justify-center gap-2 border border-slate-900 text-slate-900 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-colors"
                >
                  <Phone size={15} /> {BRAND_CONFIG.agent.phone}
                </a>
              </div>
            </div>

            {/* Sidebar Card 2: Share Record */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
              <h4 className="font-display font-bold text-slate-900 text-sm mb-3">Share Sold Transaction</h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 border border-stone-200 bg-stone-50 text-stone-600 hover:text-slate-900 hover:border-slate-900 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">
                  <Link2 size={13} /> Copy Link
                </button>
                <a 
                  href={`mailto:?subject=Sold Property Record: ${fullAddress}&body=Here is the sold transaction report for ${fullAddress}: ${BRAND_CONFIG.meta.domain}/sold-homes/${mlsNumber}`} 
                  className="flex items-center justify-center gap-2 border border-stone-200 bg-stone-50 text-stone-600 hover:text-slate-900 hover:border-slate-900 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Mail size={13} /> Email
                </a>
              </div>
            </div>

          </div>

        </div>

        <div className="h-24 lg:h-32"></div>

      </div>

      <GetInTouch dark={true} />
    </div>
  );
}

export const dynamic = "force-dynamic";