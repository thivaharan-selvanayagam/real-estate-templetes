import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { BRAND_CONFIG } from "@/config/brand";

interface FeaturedPropertiesProps {
  listings: any[];
}

export default function FeaturedProperties({ listings }: FeaturedPropertiesProps) {
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;
  const cleanPrimaryBg = BRAND_CONFIG.theme.primaryBg;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-12 max-w-2xl">
          <h2 className={`font-display text-4xl md:text-5xl font-bold ${cleanPrimaryText} tracking-tight`}>
            Featured Properties
          </h2>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            Explore some of our most exclusive houses, apartments, townhomes, penthouses, and asset portfolios.
          </p>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {listings.slice(0, 9).map((l) => (
              <PropertyCard key={l.mlsNumber} listing={l} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No listings available at the moment.</p>
          </div>
        )}

        <div className="mt-14 flex justify-start">
          <Link href="/all-homes" className={`inline-flex items-center gap-3 ${cleanPrimaryBg} text-white text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-md`}>
            <span>View More</span>
            <ChevronRight size={14} className="stroke-[3px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}