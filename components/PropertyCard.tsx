import Link from "next/link";
import Image from "next/image";
import { Listing, formatPrice, formatAddress } from "@/lib/repliers";

interface Props { listing: Listing; }

export default function PropertyCard({ listing }: Props) {
  const img = listing.images?.[0];
  const price = formatPrice(listing.listPrice);
  const isLease = listing.type === "lease" || listing.status === "Lsd";
  const priceLabel = isLease ? `${price}/mo` : price;

  // Extract clean address components to build the exact block format from the design
  const streetAddress = formatAddress(listing.address);
  const city = listing.address?.city || "";
  const state = listing.address?.state || "";
  const zip = listing.address?.zip || "";
  const completeAddress = `${streetAddress}, ${city}, ${state} ${zip}`.trim().replace(/,\s*$/, "");

  // Specs calculations matching the layout style
  const beds = listing.details?.numBedrooms || 0;
  const bedsPlus = listing.details?.numBedroomsPlus ? `+${listing.details.numBedroomsPlus}` : "";
  const baths = listing.details?.numBathrooms || 0;
  const sqft = listing.details?.sqft;

  // Resolves the raw filename into an absolute URL pointing to the Repliers CDN
  const getSafeImageUrl = (src: string | undefined) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("/")) return src;
    return `https://cdn.repliers.io/${src}`;
  };

  return (
    <Link href={`/listings/${listing.mlsNumber}`} className="block group w-full bg-transparent cursor-pointer">
      
      {/* 1. Image Container with All-Around Rounded Design */}
      <div className="relative overflow-hidden aspect-[4/3] w-full rounded-2xl bg-gray-100 shadow-sm">
        {img ? (
          <Image 
            src={getSafeImageUrl(img)} 
            alt={streetAddress} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-102" 
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy/20 to-navy/40 flex items-center justify-center">
            <span className="text-white/40 font-display text-4xl font-bold">PREMIER</span>
          </div>
        )}

        {/* Top-Left Crisp Status Tag */}
        <div className="absolute top-4 left-4">
          <span className="bg-white text-navy text-[10px] font-extrabold tracking-widest uppercase px-3 py-1.5 shadow-sm rounded-[2px]">
            {isLease ? "For Lease" : "For Sale"}
          </span>
        </div>

        {/* 🔑 Asymmetrical Black Signature Pill Banner in Bottom-Left */}
        {/* <div className="absolute bottom-0 left-0 bg-black text-white text-xs font-bold tracking-wide px-5 py-2.5 rounded-tr-[20px] flex items-center justify-center min-w-[160px]">
          <span>PREMIER<span className="text-gold">.</span> Signature</span>
        </div> */}
      </div>

      {/* 2. Text Meta Details Content Area */}
      <div className="pt-4 pb-1 px-1">
        {/* Bold Price Display */}
        <p className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
          {priceLabel}
        </p>

        {/* Full Wrapped Address Context */}
        <p className="text-sm font-medium text-gray-800 mt-1.5 line-clamp-2 min-h-[40px] leading-snug max-w-md">
          {completeAddress}
        </p>

        {/* 🔑 Typographic Specs Row (Clean text separated by dots, no icons) */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-3 text-[11px] font-extrabold tracking-wider text-black uppercase">
          <span>{beds}{bedsPlus} Beds</span>
          <span className="text-gray-300 font-normal select-none text-xs">•</span>
          <span>{baths} Full Baths</span>
          {sqft && (
            <>
              <span className="text-gray-300 font-normal select-none text-xs">•</span>
              <span>{Number(sqft).toLocaleString()} Sq.Ft.</span>
            </>
          )}
        </div>
      </div>

    </Link>
  );
}