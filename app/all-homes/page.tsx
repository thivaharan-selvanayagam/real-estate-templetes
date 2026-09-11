import { getListings } from "@/lib/repliers";
import OurRegions from "@/components/OurNeighborhoods";
import GetInTouch from "@/components/GetInTouch";
import ListingsGrid from "@/components/ListingsGrid";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata = { 
  title: `GTA Homes & Properties | ${BRAND_CONFIG.meta.siteName}` 
};

export default async function AllHomesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let combinedListings: any[] = [];
  let totalResultsCount = 0;
  
  const resolvedParams = await searchParams;

  const searchString = typeof resolvedParams.search === "string" ? resolvedParams.search : undefined;
  const propClass = typeof resolvedParams.class === "string" ? resolvedParams.class : "all"; 
  const trxType = typeof resolvedParams.type === "string" ? resolvedParams.type : "all"; 
  const minPrice = typeof resolvedParams.minPrice === "string" ? resolvedParams.minPrice : undefined;
  const maxPrice = typeof resolvedParams.maxPrice === "string" ? resolvedParams.maxPrice : undefined;
  const beds = typeof resolvedParams.beds === "string" ? resolvedParams.beds : undefined;
  const baths = typeof resolvedParams.baths === "string" ? resolvedParams.baths : undefined;
  
  const urlPage = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page, 10) : 1;
  const activePage = isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;

  try { 
    const baseQueryPayload: any = {
      type: trxType === "all" ? "all" : trxType,
      pageSize: 24,
      pageNum: activePage,
      search: searchString,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      beds: beds || undefined,
      baths: baths || undefined
    };

    if (propClass === "all") {
      const [residentialData, commercialData] = await Promise.all([
        getListings({ ...baseQueryPayload, class: "Residential" }).catch(() => ({ listings: [], numResults: 0 })),
        getListings({ ...baseQueryPayload, class: "Commercial", pageSize: 12 }).catch(() => ({ listings: [], numResults: 0 }))
      ]);
      
      combinedListings = [...(residentialData?.listings || []), ...(commercialData?.listings || [])];
      
      const resData = residentialData as any;
      const commData = commercialData as any;

      const resCount = Number(resData?.numResults || resData?.count || resData?.metadata?.numResults || 0);
      const commCount = Number(commData?.numResults || commData?.count || commData?.metadata?.numResults || 0);
      
      totalResultsCount = resCount + commCount;
      
      if (totalResultsCount === 0 && combinedListings.length > 0) {
        totalResultsCount = combinedListings.length * 15; 
      }
    } else {
      const data = await getListings({ ...baseQueryPayload, class: propClass });
      combinedListings = data?.listings || [];
      
      const genericData = data as any;
      totalResultsCount = Number(genericData?.numResults || genericData?.count || genericData?.metadata?.numResults || combinedListings.length);
    }

  } catch (e) {
    console.error("Repliers database aggregation failure:", e);
  }

  if (totalResultsCount <= 0 && combinedListings.length > 0) {
    totalResultsCount = 120; 
  }
  
  return (
    <>
      {/* GTA-FOCUSED HERO SECTION */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-slate-950 overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
            alt="Greater Toronto Area Real Estate"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center relative z-10 w-full">
          <div className="inline-block bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-md">
            Greater Toronto Area Real Estate
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            GTA Homes & Properties
          </h1>
          
          <p className="text-[#F9F6F0]/85 mt-4 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
            Explore active residential, pre-construction, and investment listings across Toronto, Durham Region, York Region, and surrounding GTA communities.
          </p>
        </div>
      </section>

      {/* LISTINGS CONTAINER */}
      <section className="bg-[#FDFBF7] min-h-[90vh] relative z-20 w-full py-8">
        <ListingsGrid 
          type={trxType} 
          propertyClass={propClass}
          initialListings={combinedListings} 
          initialTotal={totalResultsCount} 
          initialSearch={searchString || ""} 
          currentPage={activePage}
          currentMinPrice={minPrice || ""}
          currentMaxPrice={maxPrice || ""}
          currentBeds={beds || "Any"}
          currentBaths={baths || "Any"}
        />
      </section>

      <OurRegions />
      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";