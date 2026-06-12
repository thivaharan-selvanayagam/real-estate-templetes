import { getListings } from "@/lib/repliers";
import OurRegions from "@/components/OurNeighborhoods";
import GetInTouch from "@/components/GetInTouch";
import ListingsGrid from "@/components/ListingsGrid";
import { BRAND_CONFIG } from "@/config/brand"; // 🔑 IMPORT: Connected to your master config file

export const metadata = { title: `All Homes | ${BRAND_CONFIG.meta.siteName}` };

export default async function AllHomesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let data = { listings: [] as any[], numResults: 0 };
  
  const resolvedParams = await searchParams;
  const searchString = typeof resolvedParams.search === "string" ? resolvedParams.search : undefined;

  try { 
    // Fetch ANY type of listing (Sale + Lease), but strictly Residential properties
    data = await getListings({ 
      type: "all", 
      class: "Residential", 
      pageSize: 9, 
      search: searchString 
    }); 
  } catch (e) {
    console.error("Failed to load all homes:", e);
  }
  
  return (
    <>
      {/* 1. DYNAMIC THEMED PORTFOLIO HERO AREA */}
      <section className={`relative pt-40 pb-28 lg:pt-48 lg:pb-32 ${BRAND_CONFIG.theme.primaryBg} overflow-hidden flex flex-col items-center justify-center min-h-[45vh]`}>
        {/* Absolute SVG background asset mask over theme layouts */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center relative z-10 w-full">
          <p className="text-white/60 text-xs font-bold tracking-[0.3em] uppercase mb-5 animate-fade-up">
            Portfolio
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight animate-fade-up delay-100">
            All Homes
          </h1>
          <p className="text-white/70 mt-6 max-w-lg mx-auto text-sm md:text-base leading-relaxed animate-fade-up delay-200">
            Explore our complete collection of premier residential sales and exclusive rentals under {BRAND_CONFIG.meta.siteName}.
          </p>
        </div>
      </section>

      {/* 2. MAIN RESULTS DIRECTORY GRID VIEW */}
      <section className="section bg-off-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <ListingsGrid 
            type="all" 
            propertyClass="Residential"
            initialListings={data.listings} 
            initialTotal={data.numResults} 
            initialSearch={searchString || ""} 
          />
        </div>
      </section>

      <OurRegions />
      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";