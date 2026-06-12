import Link from "next/link";
import GetInTouch from "@/components/GetInTouch";

export const metadata = { title: "New Development | Premier Real Estate" };

// 🔑 FIXED: Replaced the broken Unsplash IDs for properties 3, 7, 10, 12, and 13
const activeDevs = [
  { name: "The One", location: "Toronto, ON", status: "Active", image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=800" },
  { name: "Vancouver House", location: "Vancouver, BC", status: "Active", image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=800" },
  { name: "Tour des Canadiens", location: "Montreal, QC", status: "Active", image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=800" }, // Fixed (3)
  { name: "The Bow Residences", location: "Calgary, AB", status: "Active", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800" },
  { name: "M3 Condos", location: "Mississauga, ON", status: "Active", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800" },
  { name: "King Toronto", location: "Toronto, ON", status: "Active", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
  { name: "Alberni by Kengo Kuma", location: "Vancouver, BC", status: "Active", image: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=800" }, // Fixed (7)
  { name: "Victoria Sur le Parc", location: "Montreal, QC", status: "Active", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800" },
  { name: "Telus Sky Residences", location: "Calgary, AB", status: "Active", image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=800" },
  { name: "Sugar Wharf", location: "Toronto, ON", status: "Active", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" }, // Fixed (10)
  { name: "Oakridge Park", location: "Vancouver, BC", status: "Active", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=800" },
  { name: "Maestria Condominiums", location: "Montreal, QC", status: "Active", image: "https://images.unsplash.com/photo-1428366890462-dd4baecf492b?q=80&w=800" }, // Fixed (12)
  { name: "Pinnacle One Yonge", location: "Toronto, ON", status: "Active", image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=800" }, // Fixed (13)
  { name: "Senakw", location: "Vancouver, BC", status: "Active", image: "https://images.unsplash.com/photo-1430285561322-7808604715df?q=80&w=800" },
  { name: "Nobu Residences", location: "Toronto, ON", status: "Active", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800" },
];

const services = [
  { title: "Tech-Powered Solutions", desc: "AI-driven marketing and analytics platforms providing unprecedented visibility for your development." },
  { title: "Impactful Content Creation", desc: "Studio-quality photography, videography, and virtual tours that capture buyers' imagination from the first moment." },
  { title: "World-Class Branding", desc: "Distinctive brand identities that differentiate your development in competitive markets." },
  { title: "Design Consulting", desc: "Expert guidance on finishes, layouts, and amenities that today's luxury buyers demand." },
  { title: "Research & Market Intelligence", desc: "Deep data analysis and buyer profiling to position your project competitively and maximize returns." },
];

export default function NewDevelopmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center bg-navy overflow-hidden pt-40 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10 w-full">
          <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-fade-up">PREMIER. New Development</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white max-w-3xl leading-[1.15] animate-fade-up delay-100">
            Changing the way buildings are imagined, planned, marketed, and sold.
          </h1>
          <Link href="/contact" className="mt-8 btn-gold inline-flex animate-fade-up delay-200">Explore All Projects</Link>
        </div>
      </section>

      {/* Active Developments Grid */}
      <section className="section bg-off-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-2">Portfolio</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy">The Boldest New Developments</h2>
            <p className="text-gray-500 text-sm mt-2">Buildings transforming skylines and redefining modern luxury living across Canada.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {activeDevs.map((dev, i) => (
              <Link key={dev.name} href="/contact"
                className="group block relative overflow-hidden bg-navy aspect-square rounded-sm">
                
                {/* Image Background with Zoom Effect */}
                <div className="absolute inset-0">
                  <img 
                    src={dev.image} 
                    alt={dev.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 z-10" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20 transition-transform duration-300 group-hover:-translate-y-2">
                  <p className="text-white font-bold text-base leading-tight">{dev.name}</p>
                  <p className="text-white/80 text-xs font-medium tracking-wide mt-1.5">{dev.location}</p>
                </div>
                
                {/* Status Badge for the first 3 */}
                {i < 3 && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-gold text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 shadow-md">Active</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sold Developments */}
      <section className="section bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-2">Track Record</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy mb-4">Sold Developments</h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mb-8">Consistently delivering exceptional results for our developer partners across every market cycle in Canada's most competitive cities.</p>
          <Link href="/contact" className="btn-outline inline-block">View Our History</Link>
        </div>
      </section>

      {/* New Marketplace */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-4">Philosophy</p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-snug">New Marketplace.<br />New Rules.</h2>
              <p className="text-white/60 mt-6 text-sm leading-relaxed max-w-md">
                PREMIER. New Development provides comprehensive sales, marketing, and design support covering every aspect of ground-up construction and residential conversions.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="text-center sm:text-left border-t border-white/10 pt-6">
                <h3 className="font-display text-2xl font-bold text-white mb-2">A One Stop Shop<br/>For Developers</h3>
              </div>
              <div className="text-center sm:text-left border-t border-white/10 pt-6">
                <h3 className="font-display text-2xl font-bold text-white mb-2">Succeed With a<br/>Proven Team</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-off-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-2">What We Offer</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy mb-10">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm hover:shadow-md transition-shadow">
                <h3 className="font-display text-lg font-bold text-navy mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GetInTouch dark={true} />
    </>
  );
}
export const dynamic = "force-dynamic";