import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";

export const metadata = { title: "Real Estate News | PREMIER. Real Estate" };

// Shared news data
export const newsArticles = [
  {
    slug: "bc-home-sales-down-in-may",
    title: "B.C. home sales down in May, with rising mortgage rates and weak labour market",
    source: "CBC",
    date: "June 11, 2026",
    time: "6:04pm",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "can-stantec-benefit-from-canada-infrastructure",
    title: "Can Stantec Benefit From Canada’s Infrastructure Spending Cycle?",
    source: "Kalkine Media",
    date: "June 11, 2026",
    time: "4:37pm",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "blackstone-talks-to-buy-hr-reit",
    title: "Blackstone Said to Be in Talks to Buy Canada Property Firm H&R REIT",
    source: "Bloomberg.com",
    date: "June 11, 2026",
    time: "2:20pm",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "wave-of-purpose-built-rental-units",
    title: "Wave of purpose-built rental units gives tenants an edge in changing market",
    source: "The Globe and Mail",
    date: "June 11, 2026",
    time: "12:57pm",
    image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "canada-needs-condos-people-want",
    title: "Canada Needs Condos People Actually Want to Live In",
    source: "Macleans.ca",
    date: "June 11, 2026",
    time: "12:49pm",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "real-estate-vs-rings",
    title: "Real estate vs. rings: which wins out?",
    source: "Yahoo News Canada",
    date: "June 11, 2026",
    time: "9:50am",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "bc-real-estate-struggling-to-gather-pace",
    title: "BC’s real estate market is still struggling to gather pace",
    source: "mpamag.com",
    date: "June 11, 2026",
    time: "8:56am",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "confusion-concerns-deter-canadians-us-real-estate",
    title: "Confusion, Concerns Deter Canadians from Buying U.S. Recreational Real Estate",
    source: "Connect CRE Canada",
    date: "June 11, 2026",
    time: "4:22am",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "petawawa-prepares-for-construction-boom",
    title: "Petawawa prepares for construction boom thanks to major investment in military housing",
    source: "CBC",
    date: "June 11, 2026",
    time: "3:00am",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "bank-of-canada-holds-key-rate-affordability",
    title: "As Bank of Canada holds key rate, expert says housing may be at an ‘affordability bottom’",
    source: "Toronto Star",
    date: "June 10, 2026",
    time: "11:45am",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "ottawa-seeks-to-designate-heritage-properties",
    title: "Ottawa seeks to designate 5 more James Strutt buildings as heritage properties",
    source: "CBC",
    date: "June 10, 2026",
    time: "10:52am",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "bank-of-canada-holds-rates-steady-market-complexity",
    title: "Bank of Canada holds rates steady as property pros see more market complexity",
    source: "CoStar",
    date: "June 10, 2026",
    time: "10:45am",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "leadership-transition-cameron-stephens-expands-west",
    title: "Leadership transition as Cameron Stephens expands to the West",
    source: "RENX",
    date: "June 10, 2026",
    time: "10:23am",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "yardi-expands-payment-options",
    title: "Yardi expands payment options for Canadian property managers with new Yardi Payment Processing capabilities",
    source: "Yahoo Finance",
    date: "June 10, 2026",
    time: "7:00am",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "rents-fall-in-major-cities-like-toronto",
    title: "Rents fall in major cities like Toronto, but rebound expected: report",
    source: "TorontoToday.ca",
    date: "June 10, 2026",
    time: "6:02am",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "record-breaking-sale-lake-tremblant-estate",
    title: "Record-Breaking Sale of Magnificent Lake Tremblant Estate Sets New Benchmark in Québec Luxury Market",
    source: "Yahoo Finance",
    date: "June 10, 2026",
    time: "4:55am",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "visitt-bgo-partner-ai-enabled-property-software",
    title: "Visitt, BGO Partner to Deploy AI-Enabled Property Software Across Canadian Portfolio",
    source: "Commercial Observer",
    date: "June 9, 2026",
    time: "3:52pm",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "canada-tax-court-sides-with-real-estate-co",
    title: "Canada Tax Court Sides With Real Estate Co. In $9.5M Dispute",
    source: "Law360",
    date: "June 9, 2026",
    time: "2:42pm",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop"
  },
  {
    slug: "rents-fall-as-new-completions-surge",
    title: "Rents fall as new completions surge and demand slows, but rebound expected: CMHC",
    source: "BNN Bloomberg",
    date: "June 9, 2026",
    time: "11:47am",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"
  }
];

export default function NewsPage() {
  return (
    <div className="bg-[#F8F7F4] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-[400px] flex flex-col items-center justify-center bg-navy overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600&auto=format&fit=crop" 
            alt="Real Estate News"
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase mb-4 text-white/70 animate-fade-up">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">News</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-widest uppercase mb-4 animate-fade-up delay-100">
            Real Estate News
          </h1>
          <p className="max-w-xl mx-auto text-white/80 text-sm md:text-base leading-relaxed tracking-wide font-medium animate-fade-up delay-200">
            Stay informed with the latest updates, market trends, and breaking news in the Canadian real estate sector.
          </p>
        </div>
      </section>

      {/* 2. NEWS GRID SECTION */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Link 
                href={`/news/${article.slug}`} 
                key={article.slug}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Image Container */}
                <div className="w-full h-56 relative overflow-hidden bg-gray-100">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-navy text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded shadow-sm">
                    {article.source}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gold"/> {article.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-gold"/> {article.time}</span>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-navy mb-6 flex-grow leading-snug group-hover:text-gold transition-colors">
                    {article.title}
                  </h3>
                  
                  {/* Footer Link */}
                  <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-navy transition-colors mt-auto pt-6 border-t border-gray-100">
                    Read Full Story <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 text-gold" />
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