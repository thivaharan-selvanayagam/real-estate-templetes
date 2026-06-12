import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";

export const metadata = { title: "Neighborhoods | PREMIER. Real Estate" };

const neighborhoods = [
  {
    name: "Toronto",
    slug: "toronto",
    description: "Canada's largest city offering vibrant urban living, diverse neighborhoods, and endless cultural hotspots.",
    // 🔑 FIXED: Reliable Toronto skyline image
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Oakville",
    slug: "oakville",
    description: "Prestigious lakeside town renowned for its historic downtown, upscale lifestyle, and top-ranked schools.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mississauga",
    slug: "mississauga",
    description: "A booming urban center with a beautiful waterfront, diverse communities, and excellent transit hubs.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Burlington",
    slug: "burlington",
    description: "Highly rated lakeside city perfectly balancing scenic nature, great schools, and modern family living.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Markham",
    slug: "markham",
    description: "Canada's high-tech capital featuring highly sought-after schools, modern developments, and rich heritage.",
    // 🔑 FIXED: Reliable modern home image
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Vaughan",
    slug: "vaughan",
    description: "Rapidly growing city famous for premium master-planned communities, luxury homes, and fantastic amenities.",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Richmond Hill",
    slug: "richmond-hill",
    description: "An upscale, green-filled municipality known for its excellent schools, pristine parks, and estate homes.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Hamilton",
    slug: "hamilton",
    description: "A vibrant, historic city blending a booming arts culture with stunning Niagara Escarpment nature.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Brampton",
    slug: "brampton",
    description: "One of Canada's fastest-growing, family-centric cities featuring diverse neighborhoods and great recreation.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Pickering",
    slug: "pickering",
    description: "A beautiful coastal community offering scenic waterfront trails and quick, easy transit access to Toronto.",
    image: "https://images.unsplash.com/photo-1600607687126-8a3414349a51?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Barrie",
    slug: "barrie",
    description: "A scenic lakeside city serving as the perfect gateway to outdoor recreation and cottage country.",
    // 🔑 FIXED: Reliable scenic lakeside image
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop",
  }
];

export default function NeighborhoodsPage() {
  return (
    <div className="bg-[#F8F7F4] min-h-screen">
      {/* 1. PAGE HERO */}
      <section className="relative h-[400px] lg:h-[450px] flex flex-col items-center justify-center bg-navy overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1600&auto=format&fit=crop" 
            alt="Toronto Neighborhoods"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase mb-4 text-white/80 animate-fade-up">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/50">/</span>
            <span className="text-white">Neighborhoods</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight animate-fade-up delay-100">
            Neighborhoods
          </h1>
          <p className="mt-4 text-white/90 text-sm md:text-base font-medium tracking-wide animate-fade-up delay-200">
            Explore Toronto's finest communities
          </p>
        </div>
      </section>

      {/* 2. MAIN SECTION */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy/50 mb-4 block">
              EXPLORE
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight mb-6">
              Find Your Community
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Rajivan has extensive knowledge of neighborhoods across Toronto. Find the community that's right for you.
            </p>
          </div>

          {/* Neighborhoods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neighborhoods.map((city) => (
              <Link 
                href={`/neighbourhoods/${city.slug}`} 
                key={city.slug}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Image Container */}
                <div className="w-full h-56 relative overflow-hidden bg-gray-100">
                  <img 
                    src={city.image} 
                    alt={city.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-display text-2xl font-bold text-navy mb-3">
                    {city.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                    {city.description}
                  </p>
                  
                  {/* Footer Link */}
                  <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-navy group-hover:text-gold transition-colors mt-auto">
                    EXPLORE <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Global Footer Inclusion */}
      <GetInTouch dark={true} />
    </div>
  );
}

export const dynamic = "force-dynamic";