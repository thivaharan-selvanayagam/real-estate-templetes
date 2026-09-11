import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata = { 
  title: `GTA Neighbourhoods | ${BRAND_CONFIG.meta.siteName}` 
};

interface Neighborhood {
  name: string;
  slug: string;
  description: string;
  image: string;
}

const neighborhoods: Neighborhood[] = [
  {
    name: "Pickering",
    slug: "pickering",
    description: "Vibrant waterfront community offering direct GO Transit access to downtown Toronto, expanding pre-construction projects, and strong long-term equity potential.",
    image: "/images/neighborhood/pickering.jpg",
  },
  {
    name: "Ajax",
    slug: "ajax",
    description: "Family-centric Durham Region community featuring spacious residential floor plans, scenic lakeside parks, and accessible commuter routes.",
    image: "/images/neighborhood/ajax.jpg",
  },
  {
    name: "Whitby",
    slug: "whitby",
    description: "Picturesque historic downtown combined with modern family subdivisions, highly rated schools, and excellent access to Highway 401 and 407.",
    image: "/images/neighborhood/whitby.jpg",
  },
  {
    name: "Oshawa",
    slug: "oshawa",
    description: "One of Durham's top investment hubs, delivering accessible entry prices for first-time buyers and strong rental demand near post-secondary institutions.",
    image: "/images/neighborhood/oshawa.jpeg",
  },
  {
    name: "Stouffville",
    slug: "stouffville",
    description: "Charming small-town atmosphere surrounded by scenic country landscapes, newer master-planned developments, and a quiet pace of life.",
    image: "/images/neighborhood/stouffville.jpg",
  },
  {
    name: "Markham",
    slug: "markham",
    description: "Dynamic technology and corporate hub renowned for top-tier school catchments, established neighborhoods, and high resale stability.",
    image: "/images/neighborhood/markham.jpg",
  },
  {
    name: "Vaughan",
    slug: "vaughan",
    description: "Rapidly expanding urban center anchored by subway line connectivity, major commercial developments, and versatile family properties.",
    image: "/images/neighborhood/vaughan.jpg",
  },
  {
    name: "Richmond Hill",
    slug: "richmond-hill",
    description: "Sought-after York Region enclave featuring pristine greenbelt trails, highly ranked educational options, and enduring real estate value.",
    image: "/images/neighborhood/richmond-hill.jpg",
  },
  {
    name: "Toronto",
    slug: "toronto",
    description: "Canada's economic heart, featuring diverse downtown condo developments, historic tree-lined neighborhoods, and high-demand investment corridors.",
    image: "/images/neighborhood/toronto.avif",
  }
];

export default function NeighborhoodsPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[420px] lg:h-[480px] flex flex-col items-center justify-center bg-slate-950 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/neighborhood/toronto.avif" 
            alt="Greater Toronto Area Neighborhoods"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase mb-4 text-stone-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-stone-500">/</span>
            <span className="text-white">Neighbourhoods</span>
          </div>

          <div className="inline-block bg-[#4D71A3] text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-4 shadow-md">
            GTA Community Guides
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight uppercase mb-4 leading-tight">
            Neighbourhoods
          </h1>
          <p className="max-w-xl mx-auto text-[#F9F6F0]/85 text-sm md:text-base leading-relaxed font-light">
            Explore communities across Toronto, Durham Region, and York Region to find the right environment for your lifestyle and goals.
          </p>
        </div>
      </section>

      {/* 2. MAIN GRID SECTION */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="bg-stone-200/60 text-stone-900 text-[10px] md:text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-4 w-fit mx-auto shadow-sm border border-stone-300/40">
              Local Expertise
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-5">
              Find Your Ideal Community
            </h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed font-normal">
              Reema Shahzad and Pirasha Vygunthavasa bring hands-on market insight across the Greater Toronto Area. Explore local amenities, school catchments, and real estate opportunities below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neighborhoods.map((city) => (
              <Link 
                href={`/neighbourhoods/${city.slug}`} 
                key={city.slug}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80"
              >
                <div className="w-full h-60 relative overflow-hidden bg-stone-100">
                  <img 
                    src={city.image} 
                    alt={`${city.name} community overview`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70" />
                  <span className="absolute bottom-4 left-6 text-white font-display text-2xl font-bold tracking-tight">
                    {city.name}
                  </span>
                </div>

                <div className="p-8 flex flex-col flex-grow text-left">
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-8 flex-grow font-normal">
                    {city.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-900 group-hover:text-[#4D71A3] transition-colors mt-auto font-sans">
                    <span>Explore Community</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Global Contact Form */}
      <GetInTouch dark={true} />
    </div>
  );
}

export const dynamic = "force-dynamic";