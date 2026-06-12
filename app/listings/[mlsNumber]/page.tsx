import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Map as MapIcon, Send, Phone, Link2, Mail } from "lucide-react";
import { getListing, getFeaturedListings, formatPrice, formatAddress, formatFullAddress } from "@/lib/repliers";
import GetInTouch from "@/components/GetInTouch";
import ListingImageGallery from "@/components/ListingImageGallery";

export const metadata = { title: "Property Details | PREMIER. Real Estate" };

export default async function ListingDetailPage({ params }: { params: Promise<{ mlsNumber: string }> }) {
  const { mlsNumber } = await params;

  let listing: any;
  try { 
    listing = await getListing(mlsNumber); 
  } catch (e) { 
    notFound(); 
  }

  let related = { listings: [] as any[] };
  try { 
    related = await getFeaturedListings({ type: listing.type === "lease" ? "lease" : "sale", pageSize: 3 }); 
  } catch (e) {}

  const address = formatAddress(listing.address);
  const fullAddress = formatFullAddress(listing.address);
  const price = formatPrice(listing.listPrice);
  const isLease = listing.type === "lease";
  const d = listing.details || {};
  const imgs = listing.images || [];

  const getSafeImageUrl = (src: string | undefined) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("/")) return src;
    return `https://cdn.repliers.io/${src}`;
  };

  const safeImages = imgs.map(getSafeImageUrl);

  // Derived variables for display safely type-cast
  const beds = d.numBedrooms ? `${d.numBedrooms}${d.numBedroomsPlus ? `+${d.numBedroomsPlus}` : ""}` : "-";
  const baths = d.numBathrooms ? `${d.numBathrooms}${d.numBathroomsPlus ? `+${d.numBathroomsPlus}` : ""}` : "-";
  const sqft = d.sqft || "-";
  const parking = (d as any).numParkingSpaces || (d as any).numGarageSpaces || "-";
  const mapQuery = encodeURIComponent(fullAddress);

  return (
    <div className="bg-white min-h-screen pt-24 text-navy">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        
        {/* 1. TOP NAVIGATION / BREADCRUMB */}
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-8 border-b border-gray-100 pb-4">
          <Link href="/all-homes" className="flex items-center gap-2 hover:text-navy transition-colors">
            <ArrowLeft size={14} /> Back to Search
          </Link>
          <button className="flex items-center gap-2 hover:text-navy transition-colors text-gold">
            <Share2 size={14} /> Share Listing
          </button>
        </div>

        {/* 2. HEADER: TITLE, PRICE & QUICK STATS */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-8">
          <h1 className="font-display text-3xl md:text-5xl font-normal text-navy max-w-3xl leading-tight">
            {fullAddress}
          </h1>
          <div className="text-4xl md:text-5xl font-normal text-navy">
            {isLease ? `${price}/mo` : price}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-100 pb-6">
          <span>Beds <span className="text-navy text-sm ml-1">{beds}</span></span>
          <span className="w-px h-4 bg-gray-200"></span>
          <span>Baths <span className="text-navy text-sm ml-1">{baths}</span></span>
          <span className="w-px h-4 bg-gray-200"></span>
          <span>Sqft <span className="text-navy text-sm ml-1">{sqft}</span></span>
          <span className="w-px h-4 bg-gray-200"></span>
          <span>Parking <span className="text-navy text-sm ml-1">{parking}</span></span>
        </div>

        {/* 3. INTERACTIVE IMAGE GALLERY (Client Component) */}
        <ListingImageGallery images={safeImages} address={address} />

        {/* 4. MAIN CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          
          {/* LEFT CONTENT COLUMN (Spans 8 columns) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Description */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {d.description || "No description provided for this property."}
              </p>
            </div>

            {/* Interactive Map Embed */}
            <div id="property-map" className="w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative mt-4">
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

            {/* Details Breakdown Grids */}
            <div className="flex flex-col gap-8 mt-4">
              
              {/* Home Details */}
              <div>
                <h3 className="font-display text-xl font-bold mb-4 border-b border-gray-200 pb-3">Home Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">List Date</p>
                    <p className="text-sm font-semibold">
                      {(listing as any).listDate ? new Date((listing as any).listDate).toISOString().split('T')[0] : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Style</p>
                    <p className="text-sm font-semibold">{d.style || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Type</p>
                    <p className="text-sm font-semibold">{d.propertyType || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Status</p>
                    <p className="text-sm font-semibold text-green-600">{listing.status === "A" ? "Active" : listing.status}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Year Built</p>
                    <p className="text-sm font-semibold">{d.yearBuilt || "UNKNOWN"}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-display text-xl font-bold mb-4 border-b border-gray-200 pb-3">Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Bedrooms</p>
                    <p className="text-sm font-semibold">{beds}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Bathrooms</p>
                    <p className="text-sm font-semibold">{baths}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Heating</p>
                    <p className="text-sm font-semibold">{d.heating || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Cooling</p>
                    <p className="text-sm font-semibold">{d.cooling || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Parking</p>
                    <p className="text-sm font-semibold">{parking} Spaces</p>
                  </div>
                </div>
              </div>

              {/* Appliances & Equipment (Inclusions) */}
              <div>
                <h3 className="font-display text-xl font-bold mb-4">Appliances & Equipment</h3>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-2">Inclusions</p>
                  <p className="text-sm leading-relaxed text-gray-700">{d.extras || "None specified."}</p>
                </div>
              </div>

              {/* Exterior */}
              <div>
                <h3 className="font-display text-xl font-bold mb-4 border-b border-gray-200 pb-3">Exterior</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Construction</p>
                    <p className="text-sm font-semibold">{d.exteriorConstruction1 || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Water & Sewer</p>
                    <p className="text-sm font-semibold">Municipal</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Lot Size</p>
                    <p className="text-sm font-semibold">{listing.lot?.width ? `${listing.lot.width} x ${listing.lot.depth} Feet` : "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Garage</p>
                    <p className="text-sm font-semibold">{d.garage || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Taxes</p>
                    <p className="text-sm font-semibold">{listing.taxes?.annualAmount ? formatPrice(listing.taxes.annualAmount) : "-"} <span className="text-[10px] text-gray-400 font-normal">({listing.taxes?.assessmentYear || new Date().getFullYear()})</span></p>
                  </div>
                </div>
              </div>

              {/* Listing Brokerage */}
              <div>
                <h3 className="font-display text-xl font-bold mb-4">Listing Brokerage</h3>
                <div className="border border-gray-200 p-6 rounded-xl w-full sm:w-1/2">
                  <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Brokerage Name</p>
                  <p className="text-sm font-bold uppercase">{listing.office?.brokerageName || "Unknown Brokerage"}</p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDEBAR COLUMN (Sticky Contact Cards) */}
          <div className="lg:col-span-4 sticky top-28 z-10 w-full space-y-6">
            
            {/* Sidebar Card 1: Contact Form & Profile */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
              
              {/* Agent Profile */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-gold relative">
                  <Image 
                    src="/images/rajivan-headshot.webp" 
                    alt="Rajivan Varatharajah" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-navy text-lg">Rajivan Varatharajah</h3>
                  <p className="text-xs text-gray-500 font-medium">Real Estate Professional</p>
                  <p className="text-[10px] uppercase tracking-widest text-gold mt-1">Royal Lepage Associates</p>
                </div>
              </div>

              {/* Contact Form */}
              <form className="flex flex-col gap-4">
                <input type="hidden" name="listing" value={mlsNumber} />
                <input type="text" placeholder="Your Name" required className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy focus:bg-white transition-colors placeholder:text-gray-400 text-navy" />
                <input type="email" placeholder="Email Address" required className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy focus:bg-white transition-colors placeholder:text-gray-400 text-navy" />
                <input type="tel" placeholder="Phone Number" className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy focus:bg-white transition-colors placeholder:text-gray-400 text-navy" />
                <textarea rows={4} placeholder="I'm interested in this property..." className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy focus:bg-white transition-colors resize-none placeholder:text-gray-400 text-navy" defaultValue={`I'm interested in ${fullAddress}. Please contact me.`} />
                
                <button type="button" className="w-full flex items-center justify-center gap-2 bg-navy text-white py-4 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gold transition-colors shadow-md mt-2">
                  <Send size={16} /> Request Info
                </button>
              </form>

              {/* Direct Contact Options */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a href="tel:6472985523" className="w-full flex items-center justify-center gap-2 border border-navy text-navy py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-navy hover:text-white transition-colors">
                  <Phone size={16} /> (647) 298-5523
                </a>
              </div>
            </div>

            {/* Sidebar Card 2: Share Listing */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h4 className="font-display font-bold text-navy mb-4">Share This Listing</h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 border border-gray-200 bg-gray-50 text-gray-600 hover:text-navy hover:border-navy py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">
                  <Link2 size={14} /> Copy Link
                </button>
                <a href={`mailto:?subject=Check out this property: ${fullAddress}&body=Here is a property you might be interested in: https://yourwebsite.com/listings/${mlsNumber}`} className="flex items-center justify-center gap-2 border border-gray-200 bg-gray-50 text-gray-600 hover:text-navy hover:border-navy py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">
                  <Mail size={14} /> Email
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* SPACING BEFORE FOOTER */}
        <div className="h-24 lg:h-32"></div>

      </div>

      {/* Global Footer Inclusion */}
      <GetInTouch dark={true} />
    </div>
  );
}

export const dynamic = "force-dynamic";