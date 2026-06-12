"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { Listing } from "@/lib/repliers";

interface Props {
  type: "sale" | "lease" | "all";
  propertyClass?: string;
  initialListings?: Listing[];
  initialTotal?: number;
  initialSearch?: string;
  initialCity?: string;
}

const PAGE_SIZE = 9;

export default function ListingsGrid({ 
  type, 
  propertyClass = "", // 🔑 FIXED: Destructured the variable here so it exists!
  initialListings = [], 
  initialTotal = 0, 
  initialSearch = "",
  initialCity = ""
}: Props) {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [inputValue, setInputValue] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);
  const [city, setCity] = useState(initialCity);
  
  const [minBeds, setMinBeds] = useState("");
  const [sortBy, setSortBy] = useState("listDate:desc");
  const [showFilters, setShowFilters] = useState(false);
  
  const isFirstMount = useRef(true);

  useEffect(() => {
    setSearch(initialSearch);
    setInputValue(initialSearch);
    setCity(initialCity);
    setListings(initialListings);
    setTotal(initialTotal);
  }, [initialSearch, initialListings, initialTotal]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue !== search) {
        setSearch(inputValue);
        setPage(1); 
        setCity("");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, search]);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        type,
        page: String(page),
        pageSize: String(PAGE_SIZE),
        sortBy,
        ...(propertyClass ? { class: propertyClass } : {}), // 🔑 Now this works perfectly
        ...(search ? { search } : {}),
        ...(city ? { city } : {}),
        ...(minBeds ? { minBeds } : {}),
      });
      const res = await fetch(`/api/listings?${params}`);
      const data = await res.json();
      
      if (data && !data.error) {
        setListings(data.listings || []);
        setTotal(data.numResults || 0);
      } else {
        console.error("API Error context:", data?.error);
      }
    } catch (e) {
      console.error("Failed to fetch listings:", e);
    } finally {
      setLoading(false);
    }
  }, [type, page, search, city, minBeds, sortBy, propertyClass]); // 🔑 Add city to dependencies

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return; 
    }
    fetchListings();
  }, [fetchListings]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      {/* Search / Filter bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-4">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            <div className="relative flex-1 max-w-lg">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by city, neighborhood or MLS..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearch(inputValue);
                    setPage(1);
                  }
                }}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:border-navy"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-navy border border-navy px-4 py-2.5 hover:bg-navy hover:text-white transition-colors">
                <SlidersHorizontal size={14} /> Filters
              </button>
              <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                className="text-xs font-medium text-gray-700 border border-gray-200 px-3 py-2.5 focus:outline-none focus:border-navy">
                <option value="listDate:desc">Newest First</option>
                <option value="listPrice:desc">Price: High to Low</option>
                <option value="listPrice:asc">Price: Low to High</option>
              </select>
              <span className="text-xs text-gray-400 whitespace-nowrap">{total.toLocaleString()} results</span>
            </div>
          </div>
          {showFilters && (
            <div className="mt-3 flex flex-wrap gap-3 pb-1">
              <select value={minBeds} onChange={(e) => { setMinBeds(e.target.value); setPage(1); }}
                className="text-xs border border-gray-200 px-3 py-2 focus:outline-none focus:border-navy">
                <option value="">Any Beds</option>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+ Beds</option>)}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className={`transition-opacity duration-200 ${loading ? "opacity-50" : "opacity-100"}`}>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {listings.map((l) => <PropertyCard key={l.mlsNumber} listing={l} />)}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-medium">No listings found.</p>
            <p className="text-sm mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="p-2 border border-gray-200 disabled:opacity-40 hover:border-navy transition-colors">
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
            const p = totalPages <= 7 ? i + 1 : page <= 4 ? i + 1 : page >= totalPages - 3 ? totalPages - 6 + i : page - 3 + i;
            return (
              <button key={p} onClick={() => setPage(p)}
                className={`w-10 h-10 text-sm font-medium transition-colors ${p === page ? "bg-navy text-white" : "border border-gray-200 hover:border-navy text-gray-700"}`}>
                {p}
              </button>
            );
          })}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="p-2 border border-gray-200 disabled:opacity-40 hover:border-navy transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}