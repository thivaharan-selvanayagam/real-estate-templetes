const BASE_URL = process.env.REPLIERS_BASE_URL || "https://api.repliers.io";
const API_KEY = process.env.REPLIERS_API_KEY || "";

export interface Listing {
  mlsNumber: string;
  status: string;
  listPrice: number;
  soldPrice?: number;
  address: {
    streetNumber: string;
    streetName: string;
    streetSuffix?: string;
    city: string;
    state?: string;
    zip?: string;
    neighborhood?: string;
    area?: string;
  };
  details: {
    numBedrooms?: number;
    numBedroomsPlus?: number;
    numBathrooms?: number;
    numBathroomsPlus?: number;
    sqft?: string;
    propertyType?: string;
    yearBuilt?: string;
    garage?: string;
    numGarageSpaces?: string;
    description?: string;
    extras?: string;
    virtualTourUrl?: string;
  };
  images?: string[];
  map?: { latitude?: number; longitude?: number };
  agents?: {
    listingAgent?: { firstName?: string; lastName?: string; phone?: string };
  };
  office?: { brokerageName?: string };
  timestamps?: { listDate?: string; updatedDate?: string };
  daysOnMarket?: number;
  class?: string;
  type?: string;
}

interface ListingsResponse {
  listings: Listing[];
  numResults: number;
  page?: number;
  pageSize?: number;
}

async function apiGet(path: string, params: Record<string, string | number | boolean> = {}): Promise<any> {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  
  const res = await fetch(url.toString(), {
    headers: { "REPLIERS-API-KEY": API_KEY, "Content-Type": "application/json" },
    next: { revalidate: 300 },
  });
  
  if (!res.ok) throw new Error(`Repliers API error: ${res.status} ${res.statusText}`);
  return res.json();
}

// 🔑 RESTORED: This is the function your homepage was looking for!
export async function getFeaturedListings(params?: {
  type?: "sale" | "lease";
  pageSize?: number;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<ListingsResponse> {
  return apiGet("/listings", {
    status: "A",
    type: params?.type || "sale",
    resultsPerPage: params?.pageSize || 6,
    ...(params?.city ? { city: params.city } : {}),
    ...(params?.minPrice ? { minPrice: params.minPrice } : {}),
    ...(params?.maxPrice ? { maxPrice: params.maxPrice } : {}),
    fields: "mlsNumber,status,listPrice,address,details,images,map,timestamps,type,class",
  });
}

// 🔑 PRESERVED: Contains all our Smart Search and "All Homes" routing logic
export async function getListings(params?: {
  type?: "sale" | "lease" | "all";
  class?: string;
  page?: number;
  pageSize?: number;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  sortBy?: string;
  search?: string;
}): Promise<ListingsResponse> {
  
  let mappedSortBy = params?.sortBy || "createdOnDesc";
  if (mappedSortBy === "listDate:desc" || mappedSortBy === "listDateDesc") mappedSortBy = "createdOnDesc";
  if (mappedSortBy === "price:asc" || mappedSortBy === "priceAsc") mappedSortBy = "listPriceAsc";
  if (mappedSortBy === "price:desc" || mappedSortBy === "priceDesc") mappedSortBy = "listPriceDesc";

  const apiParams: Record<string, string | number | boolean> = {
    status: "A",
    resultsPerPage: params?.pageSize || 12,
    pageNum: params?.page || 1,             
    sortBy: mappedSortBy,
  };

  if (params?.type && params.type !== "all") {
    apiParams.type = params.type;
  } else if (!params?.type) {
    apiParams.type = "sale";
  }

  if (params?.class) apiParams.class = params.class;
  if (params?.city) apiParams.city = params.city;
  if (params?.minPrice) apiParams.minPrice = params.minPrice;
  if (params?.maxPrice) apiParams.maxPrice = params.maxPrice;
  if (params?.minBeds) apiParams.minBeds = params.minBeds;

  if (params?.search) {
    const query = params.search.trim();
    const isMls = /^[a-zA-Z]\d{6,9}$/.test(query);
    
    if (isMls) {
      apiParams.mlsNumber = query.toUpperCase();
      delete apiParams.type; 
    } else {
      apiParams.search = query;
      apiParams.searchFields = "address.streetNumber,address.streetName,address.city,address.neighborhood";
    }
  }

  return apiGet("/listings", apiParams);
}

export async function getListing(mlsNumber: string): Promise<Listing> {
  return apiGet(`/listings/${mlsNumber}`);
}

export function formatPrice(price: number): string {
  if (!price) return "Price Upon Request";
  if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 2)}M`;
  if (price >= 1_000) return `$${(price / 1_000).toFixed(0)}K`;
  return `$${price.toLocaleString()}`;
}

export function formatAddress(address: Listing["address"]): string {
  if (!address) return "";
  return [address.streetNumber, address.streetName, address.streetSuffix].filter(Boolean).join(" ");
}

export function formatFullAddress(address: Listing["address"]): string {
  if (!address) return "";
  const line1 = formatAddress(address);
  const line2 = [address.city, address.state, address.zip].filter(Boolean).join(", ");
  return [line1, line2].filter(Boolean).join(", ");
}