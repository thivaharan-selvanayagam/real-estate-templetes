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
  const propClass = typeof resolvedParams.class === "string" && resolvedParams.class !== "all" 
    ? resolvedParams.class 
    : "Residential"; 

  const trxType = typeof resolvedParams.type === "string" ? resolvedParams.type : "buy"; 
  const minPrice = typeof resolvedParams.minPrice === "string" ? resolvedParams.minPrice : undefined;
  const maxPrice = typeof resolvedParams.maxPrice === "string" ? resolvedParams.maxPrice : undefined;
  const beds = typeof resolvedParams.beds === "string" ? resolvedParams.beds : undefined;
  const baths = typeof resolvedParams.baths === "string" ? resolvedParams.baths : undefined;
  
  const urlPage = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page, 10) : 1;
  const activePage = isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;

  const reqBeds = beds && beds !== "Any" ? parseInt(beds, 10) : undefined;
  const reqBaths = baths && baths !== "Any" ? parseInt(baths, 10) : undefined;

  try { 
    // 🔑 Repliers API Payload
    const baseQueryPayload: any = {
      pageSize: 24,
      pageNum: activePage,
      search: searchString || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      // Pass all parameter name variations so Repliers receives the constraint
      minBedrooms: reqBeds,
      minBeds: reqBeds,
      minBaths: reqBaths,
      minBathrooms: reqBaths,
      class: propClass
    };

    // 🔑 Explicit transaction mapping (Buy vs Lease vs Sold)
    if (trxType === "sold") {
      baseQueryPayload.status = "U";
      baseQueryPayload.lastStatus = "Sld";
    } else if (trxType === "lease") {
      baseQueryPayload.status = "A";
      baseQueryPayload.type = "lease";
    } else { // "buy" / "sale"
      baseQueryPayload.status = "A";
      baseQueryPayload.type = "sale";
    }

    const data = await getListings(baseQueryPayload);
    let rawListings = data?.listings || [];

    // 🔑 IN-MEMORY POST-FILTER GUARANTEE
    // 1. Bedroom Filter Pass
    if (reqBeds) {
      rawListings = rawListings.filter((l: any) => {
        const numBeds = Number(l.details?.numBedrooms || l.numBedrooms || l.bedrooms || 0);
        return numBeds >= reqBeds;
      });
    }

    // 2. Bathroom Filter Pass
    if (reqBaths) {
      rawListings = rawListings.filter((l: any) => {
        const numBaths = Number(l.details?.numBathrooms || l.numBathrooms || l.bathrooms || l.details?.numBaths || 0);
        return numBaths >= reqBaths;
      });
    }

    // 3. Transaction Type Filter Pass
    if (trxType === "sold") {
      rawListings = rawListings.filter((l: any) => 
        l.lastStatus === "Sld" || l.status === "U" || l.standardStatus === "Closed"
      );
    } else if (trxType === "lease") {
      rawListings = rawListings.filter((l: any) => 
        (l.type === "lease" || l.status === "Lsd") && l.lastStatus !== "Sld" && l.status !== "U"
      );
    } else if (trxType === "buy" || trxType === "sale") {
      rawListings = rawListings.filter((l: any) => 
        l.type !== "lease" && l.lastStatus !== "Sld" && l.status !== "U"
      );
    }

    combinedListings = rawListings;
    
    const genericData = data as any;
    totalResultsCount = Number(genericData?.numResults || genericData?.count || genericData?.metadata?.numResults || combinedListings.length);

  } catch (e) {
    console.error("Repliers database aggregation failure:", e);
  }

  if (totalResultsCount <= 0 && combinedListings.length > 0) {
    totalResultsCount = combinedListings.length; 
  }
  
  return (
    <>
      <section className="bg-[#FDFBF7] min-h-[90vh] relative z-20 w-full pt-28 lg:pt-36 pb-8">
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