import Link from "next/link";
import { Star, Quote, ArrowRight } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import { BRAND_CONFIG } from "@/config/brand"; // 🔑 IMPORT: Connected to your master config file

export const metadata = { title: `Testimonials | ${BRAND_CONFIG.meta.siteName}` };

const testimonials = [
  {
    name: "Mathieu & Sarah Tremblay",
    location: "Toronto, ON",
    text: "Working with our agent to find our family home was an absolute masterclass in real estate. The market here is notoriously fierce, but their strategic negotiation got us our dream detached home under asking price! Their attention to detail and calming presence made a highly stressful move feel completely seamless.",
    rating: 5,
    tag: "Buyer Success"
  },
  {
    name: "Dr. Aris & Navneet Chander",
    location: "Markham, ON",
    text: "This is hands down the most professional brokerage team we've ever encountered. They helped us sell our luxury property. From the high-end cinematic video tour to the tailored digital marketing, the presentation was flawless. We received multiple clean offers within the first 4 days on the market. Highly recommend!",
    rating: 5,
    tag: "Seller Success"
  },
  {
    name: "Elena Rostova",
    location: "Oakville, ON",
    text: "As a first-time homebuyer, I was terrified of making the wrong move. They didn't just show me houses—they walked me through an incredible step-by-step framework, explaining budgets, hidden costs, and neighborhood growth trends. They found me the perfect townhouse and negotiated fantastic terms. I am forever grateful.",
    rating: 5,
    tag: "First-Time Buyer"
  },
  {
    name: "The Gallagher Family",
    location: "Burlington, ON",
    text: "We utilized their team for both selling our old property and purchasing our new home. Managing simultaneous closings is usually a logistical nightmare, but everything was synchronized perfectly. Their market intelligence and constant communication kept us relaxed throughout the process.",
    rating: 5,
    tag: "Relocation"
  },
  {
    name: "James & Chloe McDonald",
    location: "Vaughan, ON",
    text: "The home evaluation tool was our starting point, but their in-person expertise is where the true value lies. They pinpointed exactly which minor renovations would yield the highest return, staged our home beautifully, and secured a closing price that broke our street's historical record.",
    rating: 5,
    tag: "Record Sale"
  },
  {
    name: "Marcus & Priya Singh",
    location: "Richmond Hill, ON",
    text: "We were looking for an investment property with specific cash-flow metrics. Their analytical approach to the local market was refreshing. They calculated carrying costs, rental yields, and area vacancy rates precisely, steering us toward a high-performing property. An invaluable partner for any investor.",
    rating: 5,
    tag: "Investor Elite"
  },
  {
    name: "Jean-Pierre & Sophie Dubois",
    location: "Mississauga, ON",
    text: "Unparalleled integrity and tireless work ethic. They spent months helping us find a lakeside property that fit our criteria perfectly. They never rushed us, pointed out hidden flaws during showings, and looked out for our long-term financial health. A true professional ecosystem of the highest caliber.",
    rating: 5,
    tag: "Luxury Purchase"
  },
  {
    name: "Amanda Chen",
    location: "Hamilton, ON",
    text: "They brought a sophisticated modern approach to selling my loft. The multi-channel marketing system generated enormous traffic, and their masterful negotiation skills handled a complex multi-offer situation seamlessly. I wouldn't trust any other real estate partner.",
    rating: 5,
    tag: "Modern Loft Sale"
  },
  {
    name: "David & Laura Fletcher",
    location: "Barrie, ON",
    text: "Moving from the dense city core to a quiet lakeside community was a huge transition. Their extensive local knowledge proved vital. They guided us to the perfect master-planned neighborhood, handled the remote offer process seamlessly, and made sure our family was beautifully set up for the future.",
    rating: 5,
    tag: "City to Suburb"
  }
];

export default function TestimonialsPage() {
  const firstName = BRAND_CONFIG.agent.name.split(" ")[0];

  // 🔑 THEME HOOKS: Dynamic parsing of style variables to maintain compile-time safety
  const cleanPrimaryBg = BRAND_CONFIG.theme.primaryBg;
  const cleanPrimaryText = BRAND_CONFIG.theme.primaryText;
  const cleanAccentText = BRAND_CONFIG.theme.accentText;
  const cleanAccentBg = BRAND_CONFIG.theme.accentBg;

  // Custom text hover indicators safely combined as single strings
  const hoverPrimaryText = `hover:${cleanPrimaryText}`;
  const groupHoverQuoteColor = `group-hover:${cleanAccentText}/10`;
  const ratingStarColor = cleanAccentText.includes('gold') ? 'text-gold fill-gold' : `text-${cleanAccentText.replace('text-', '')} fill-${cleanAccentText.replace('text-', '')}`;
  const badgeBorderColor = `border-${cleanAccentText.replace('text-', '')}/10`;
  const badgeBgColor = `bg-${cleanAccentText.replace('text-', '')}/5`;

  return (
    <div className="bg-[#F8F7F4] min-h-screen text-navy">
      {/* 1. DYNAMIC THEMED HERO SECTION */}
      <section className={`relative h-[450px] flex flex-col items-center justify-center ${cleanPrimaryBg} overflow-hidden pt-20`}>
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80" 
            alt="Luxury Interior Living Space"
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-overlay"
          />
          <div className={`absolute inset-0 bg-gradient-to-b from-${cleanPrimaryBg.replace('bg-', '')}/90 via-${cleanPrimaryBg.replace('bg-', '')}/75 to-${cleanPrimaryBg.replace('bg-', '')}`} />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase mb-4 text-white/70 animate-fade-up">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Client Testimonials</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-widest uppercase mb-4 animate-fade-up delay-100">
            Client Stories
          </h1>
          <p className="max-w-xl mx-auto text-white/80 text-sm md:text-base leading-relaxed tracking-wide font-medium animate-fade-up delay-200">
            Discover how our model guides homebuyers and sellers across the region to successful, premium, stress-free conclusions.
          </p>
        </div>
      </section>

      {/* 2. REVIEWS MASONRY COLUMNS SECTION */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          {/* Responsive Masonry / Multicolumn Grid System */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 [column-fill:_balance]">
            {testimonials.map((review, index) => (
              <div 
                key={index} 
                className="break-inside-avoid bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden"
              >
                {/* Accent design quote mark backed by dynamic template colors */}
                <Quote className={`absolute right-6 top-6 text-gray-100 w-12 h-12 pointer-events-none ${groupHoverQuoteColor} transition-colors duration-300`} />

                {/* Tag & Stars */}
                <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${cleanAccentText} ${badgeBgColor} border ${badgeBorderColor} px-3 py-1 rounded-full`}>
                    {review.tag}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className={ratingStarColor} />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-sm lg:text-[14.5px] leading-relaxed font-medium mb-8 relative z-10 text-justify">
                  "{review.text}"
                </p>

                {/* Reviewer Profile Card */}
                <div className="flex items-center gap-4 mt-auto border-t border-gray-50 pt-6 relative z-10">
                  <div className={`w-10 h-10 rounded-full ${cleanPrimaryBg} text-white flex items-center justify-center font-bold text-xs shrink-0 tracking-wider`}>
                    {review.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className={`font-bold ${cleanPrimaryText} text-sm tracking-wide`}>{review.name}</h4>
                    <p className="text-gray-400 text-xs font-semibold mt-0.5">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. CTA BOTTOM BANNER */}
      <section className={`${cleanPrimaryBg} py-20 text-center border-t border-white/5 relative overflow-hidden`}>
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <p className={`text-[11px] font-bold tracking-[0.2em] uppercase ${cleanAccentText} mb-4`}>Your Success Story Starts Here</p>
          <h2 className="font-display text-3xl md:text-4xl font-normal text-white tracking-widest uppercase mb-10 leading-snug">
            Ready to Experience Elite Real Estate Service?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/all-homes" className={`bg-white ${cleanPrimaryText} px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-neutral-100 transition-colors shadow-xl flex items-center justify-center gap-2`}>
              Browse Listings <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="border border-white/20 text-white px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-gray-950 transition-colors">
              Schedule A Call
            </Link>
          </div>
        </div>
      </section>

      {/* Global Contact Form Component configured with context themes */}
      <GetInTouch dark={false} />
    </div>
  );
}

export const dynamic = "force-dynamic";