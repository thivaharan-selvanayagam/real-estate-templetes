import Link from "next/link";
import { BRAND_CONFIG } from "@/config/brand";
import { formatPrice, formatAddress } from "@/lib/repliers";

interface PremiumCollectionProps {
  listings: any[];
}

export default function PremiumCollection({ listings }: PremiumCollectionProps) {
  const cleanAccentText = BRAND_CONFIG.theme.accentText;
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {listings.slice(0, 6).map((l: any) => {
              const img = l.images?.[0];
              const price = formatPrice(l.listPrice);
              const isLease = l.type === "lease" || l.status === "Lsd";
              const priceLabel = isLease ? `${price}/mo` : price;

              const streetAddress = formatAddress(l.address);
              const city = l.address?.city || "";
              const state = l.address?.state || "";
              const zip = l.address?.zip || "";
              const completeAddress = `${streetAddress}, ${city}, ${state} ${zip}`.trim().replace(/,\s*$/, "");

              const beds = l.details?.numBedrooms || 0;
              const bedsPlus = l.details?.numBedroomsPlus ? `+${l.details.numBedroomsPlus}` : "";
              const baths = l.details?.numBathrooms || 0;
              const sqft = l.details?.sqft;

              return (
                <Link key={l.mlsNumber} href={`/listings/${l.mlsNumber}`} className="relative block aspect-[3/4] w-full rounded-2xl overflow-hidden cursor-pointer group shadow-xl transition-all duration-300">
                  {img ? (
                    <img src={`https://cdn.repliers.io/${img}`} alt={streetAddress} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                      <span className="text-white/20 font-display text-2xl font-bold uppercase tracking-widest">{BRAND_CONFIG.meta.siteName}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/35" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent" />
                  <div className="absolute top-0 left-0 z-20">
                    <span className="inline-block bg-[#DCE2EC] text-[#0A0F2E] text-[10px] font-black tracking-widest uppercase px-5 py-2.5 rounded-br-[22px]">
                      {isLease ? "FOR LEASE" : "FOR SALE"}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end">
                    <p className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                      {priceLabel}
                    </p>
                    <p className="text-xs md:text-sm font-medium text-white/95 mt-1 truncate">
                      {completeAddress}
                    </p>
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-2 text-[10px] md:text-[11px] font-extrabold tracking-wider text-white/80 uppercase">
                      <span>{beds}{bedsPlus} BEDROOMS</span>
                      <span className="text-white/30 font-normal select-none text-xs">•</span>
                      <span>{baths} FULL BATHS</span>
                      {sqft && (
                        <>
                          <span className="text-white/30 font-normal select-none text-xs">•</span>
                          <span>{Number(sqft).toLocaleString()} SQ.FT.</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600">
            <p className="text-lg">No listings available at the moment.</p>
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <Link href="/all-homes" className={`inline-flex items-center bg-white ${cleanPrimaryText} text-xs font-black tracking-widest uppercase px-12 py-4 rounded-full hover:bg-neutral-100 transition-all duration-200 shadow-xl border border-neutral-100`}>
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}