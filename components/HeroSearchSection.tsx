"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, User, Hash, ChevronDown, Loader2 } from "lucide-react";

interface SearchResult {
  type: "location" | "agent" | "mls" | "zip";
  label: string;
  category: string;
  queryParam: string;
}

export default function HeroSearchSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // REAL DATA FETCH ENGINE WITH DEBOUNCING
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.results || []);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Search fetch failed:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Close auto-suggest box when clicking outside input zone
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const executeSearch = (searchVal: string) => {
    if (!searchVal.trim()) return;
    setShowDropdown(false);
    router.push(`/buy?search=${encodeURIComponent(searchVal)}`);
  };

  return (
    // Parent wrapper with clear stacking z-index contexts
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-navy pt-24 z-40 w-full">
      
      {/* Background Media Engine Layout */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400"
        >
          {/* <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-at-sunset-41618-large.mp4" type="video/mp4" /> */}
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-navy/35 to-navy" />
      </div>

      <div className="relative z-30 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.12]捷 animate-fade-up">
          Serving Durham, <br/>York and Greater Toronto

        </h1>
        
        {/* <p className="text-white/80 text-sm md:text-base font-medium tracking-wide mt-6 max-w-xl mx-auto animate-fade-up delay-100">
          Earth's Most Followed and Subscribed to Real Estate Brand
        </p> */}
        
        {/* Search Bar Core Pillar Container */}
        <div ref={containerRef} className="mt-10 max-w-2xl mx-auto px-2 w-full relative z-[100]">
          
          {/* Mobile Responsive Input Bar Component */}
          <div className="flex items-center bg-white rounded-full shadow-2xl p-1.5 pl-5 sm:pl-6 border border-white/10 relative z-[101]">
            <input 
              type="text" 
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={(e) => e.key === "Enter" && executeSearch(query)}
              placeholder="Search by Area, City, Postal Code or MLS® number..." 
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none py-3 sm:py-3.5 pr-2 w-full" 
            />

            <button 
              type="button" 
              onClick={() => executeSearch(query)}
              className="bg-navy text-white p-3 rounded-full hover:bg-navy-light transition-colors flex items-center justify-center shrink-0 shadow-md h-10 w-10 sm:h-12 sm:w-12"
            >
              <Search size={16} />
            </button>
          </div>

          {/* 🔑 FIXED: Absolute Dropdown Layer with updated visibility checking and bulletproof transitions */}
          {showDropdown && query.trim().length >= 2 && (
            <div className="absolute top-[115%] left-0 right-0 bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border border-gray-100 text-left z-[999] overflow-hidden transition-all max-h-[380px] overflow-y-auto">
              
              {isLoading ? (
                <div className="p-8 flex flex-col items-center justify-center text-gray-400">
                  <Loader2 className="animate-spin mb-2 text-navy" size={24} />
                  <p className="text-xs font-bold tracking-widest uppercase">Searching Real Database...</p>
                </div>
              ) : suggestions.length > 0 ? (
                <div className="p-3 space-y-4">
                  {Array.from(new Set(suggestions.map((s) => s.category))).map((categoryName) => (
                    <div key={categoryName}>
                      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-3 mb-1.5">
                        {categoryName}
                      </p>
                      
                      <div className="space-y-0.5">
                        {suggestions
                          .filter((item) => item.category === categoryName)
                          .map((item, index) => (
                            <div
                              key={`${item.queryParam}-${index}`}
                              onClick={() => {
                                setQuery(item.label);
                                executeSearch(item.queryParam || item.label);
                              }}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-100 cursor-pointer transition-colors text-gray-800 text-sm font-medium"
                            >
                              {item.type === "location" && <MapPin size={15} className="text-gray-400 shrink-0" />}
                              {item.type === "agent" && <User size={15} className="text-gray-400 shrink-0" />}
                              {(item.type === "mls" || item.type === "zip") && <Hash size={15} className="text-gray-400 shrink-0" />}
                              <span className="truncate flex-1 pr-2">{item.label}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-sm font-semibold text-gray-500">No active listings found for "{query}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce z-10">
        <ChevronDown size={20} />
      </div>
    </section>
  );
}