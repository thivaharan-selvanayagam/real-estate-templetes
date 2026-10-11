import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { BRAND_CONFIG } from "@/config/brand";

interface FeaturedPropertiesProps {
  listings: any[];
}

const TARGET_CITIES = [
  "toronto", "etobicoke", "north york", "scarborough", "east york", "york",
  "markham", "stouffville", "whitchurch-stouffville", "pickering", "ajax",
  "oshawa", "mississauga", "brampton", "vaughan", "gta"
];

export default function FeaturedProperties({ listings = [] }: FeaturedPropertiesProps) {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;
  const cleanPrimaryBg = BRAND_CONFIG.theme.primaryBg;

  // 1. Filter out commercial / non-residential properties
  const residentialListings = listings.filter((listing) => {
    const pClass = (
      listing.class || 
      listing.details?.class || 
      listing.type || 
      ""
    ).toLowerCase();

    const pType = (
      listing.details?.propertyType || 
      listing.propertyType || 
      ""
    ).toLowerCase();

    const isCommercial = 
      pClass.includes("commercial") || 
      pClass.includes("industrial") || 
      pClass.includes("business") || 
      pClass.includes("retail") ||
      pType.includes("commercial") || 
      pType.includes("industrial") ||
      pType.includes("business") ||
      pType.includes("retail");

    return !isCommercial;
  });

  // 2. City-based filter
  const cityFiltered = residentialListings.filter((listing) => {
    const city = (listing.address?.city || listing.city || "").toLowerCase().trim();
    const area = (listing.address?.area || "").toLowerCase().trim();
    const district = (listing.address?.district || "").toLowerCase().trim();

    return TARGET_CITIES.some((target) => 
      city.includes(target) || area.includes(target) || district.includes(target)
    );
  });

  // 🔑 Fallback: Use cityFiltered if 6+ match; otherwise use all residential listings
  const displayListings = cityFiltered.length >= 6 ? cityFiltered : residentialListings;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-12 max-w-2xl text-left">
          <h2 className={`font-display text-4xl md:text-5xl font-bold ${cleanPrimaryText} tracking-tight`}>
            Featured Properties
          </h2>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            Explore active residential listings across Toronto, Markham, Stouffville, Pickering, Ajax, Oshawa, Mississauga, Brampton, and Vaughan.
          </p>
        </div>

        {displayListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {/* 🔑 Displays top 6 residential properties */}
            {displayListings.slice(0, 6).map((l) => (
              <PropertyCard key={l.mlsNumber || l.id} listing={l} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 border border-dashed border-stone-200 rounded-3xl">
            <p className="text-lg font-medium text-slate-700 mb-1">No Active Residential Listings Found</p>
            <p className="text-xs text-stone-500">There are currently no active residential properties matched in the target municipalities.</p>
          </div>
        )}

        <div className="mt-14 flex justify-start">
          <Link href="/all-homes" className={`inline-flex items-center gap-3 ${cleanPrimaryBg} text-white text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-md font-sans`}>
            <span>View All GTA Listings</span>
            <ChevronRight size={14} className="stroke-[3px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}