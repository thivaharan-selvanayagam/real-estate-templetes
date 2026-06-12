import MyListingsClient from "@/components/MyListingsClient";

export const metadata = {
  title: "My Listings | PREMIER. Real Estate",
  description: "Browse our exclusive properties.",
};

const BROKERAGE_NAME = "Royal Lepage Real Estate Associates"; 

async function getAllListings(page: number) {
  // 🔑 CHANGED: Swapped 'office=' for 'brokerage=' 
  const fetchUrl = `${process.env.REPLIERS_BASE_URL}/listings?listings=true&status=A&resultsPerPage=12&pageNum=${page}&brokerage=${encodeURIComponent(BROKERAGE_NAME)}`;
  
  // DEBUG: This will print the exact URL in your terminal so you can verify it
  console.log("Attempting to fetch:", fetchUrl);

  const res = await fetch(fetchUrl, {
    headers: {
      "REPLIERS-API-KEY": process.env.REPLIERS_API_KEY || "", 
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Failed to fetch listings. Status Code:", res.status);
    return { listings: [], count: 0 }; 
  }

  const data = await res.json();
  
  // DEBUG: This will print how many listings the API actually found
  console.log(`Success! Found ${data.count || 0} active listings for ${BROKERAGE_NAME}.`);
  
  return data;
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MyListingsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams.page;
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  
  const data = await getAllListings(page);
  
  return (
    <div className="mt-[96px] lg:mt-[120px] h-[calc(100vh-96px)] lg:h-[calc(100vh-120px)] bg-white flex flex-col overflow-hidden">
      <MyListingsClient 
        initialListings={data.listings || []} 
        totalResults={data.count || 0} 
        currentPage={page}
      />
    </div>
  );
}

export const dynamic = "force-dynamic";