import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";

export const metadata = { title: "Buyer's Guide | PREMIER. Real Estate" };

const buyerSteps = [
  { 
    title: 'Research', 
    text: `Do you already know where you want to buy? If you want a condo, townhome, or single-family home? Which features do you like and dislike? What’s available on the market now? If you answered no to any of these questions, now is the time to start researching. In addition to looking for homes that interest you, also take note of any changes in asking prices. This could give you valuable insight into housing trends in specific neighborhoods and help you when the time comes to make an offer.`,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80'
  },
  { 
    title: 'Decide on Your Budget', 
    text: `Notice I said to decide on your budget—not determine how much the mortgage company will give you. In many cases, a mortgage company will pre-approve you for more than you’re comfortable spending, which is why you need to determine the monthly payment you feel comfortable with before talking to a lender. This likely includes doing a full household budget and taking into consideration what changes other than a mortgage payment will occur once you move into your new home. If you’ve lived in an apartment or with roommates, you may overlook new expenses like garbage, water, or HOA fees that could easily blow your budget.`,
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80'
  },
  { 
    title: 'Get Prequalified', 
    text: `Just because you think you can afford a certain payment every month doesn’t mean the mortgage company will agree. Just as they may approve you for too large of an amount, they may also approve you for a lesser amount or deny you a mortgage altogether. Lack of time at a job, insufficient credit, past bankruptcies, or other financial issues can cause major problems when trying to secure a mortgage. Before you get your heart set on a home, talk to a mortgage professional to find out what amount you can qualify for. This will also be an advantage when you make an offer on a home, as some sellers won’t entertain offers from those who aren’t already prequalified for a loan.`,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80'
  },
  { 
    title: 'Choose a Real Estate Agent', 
    text: `Can you shop for, look at, and ultimately make an offer on a home without a real estate agent? Technically yes, but why would you when it costs you nothing for an agent like me to take much of the stress off your shoulders? Not only will I help identify properties you might be interested in, arrange showings, and ultimately handle the offer process, but I also have a knowledge of the market that you don’t possess. Finding the perfect home can be a daunting task, this is where my expertise and wealth of knowledge come into play. Let me show you around some homes that meet your dream home criteria so you can find the one that's right for you.`,
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=80'
  },
  { 
    title: 'Find the Right Home', 
    text: `This should be the most enjoyable step of the entire process (other than moving in!). I will arrange showings of homes you’re interested in that are within your price range. Take notes about what you like and don’t like, and make sure to pay attention to details. Turn light switches on and off, open and close doors, and run the faucets in various rooms. Don’t limit your inspection to the home itself. Make sure to take time to explore the neighborhood and keep an eye on traffic at certain times of the day, the parking situation, and how close it is to necessities like schools and grocery stores.`,
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&q=80'
  },
  { 
    title: 'Make an Offer', 
    text: `Once you have selected the perfect home, work with your agent to craft a fair offer based on the value of comparable homes on the market. Depending on what the home is listed at and whether the current environment is a buyer’s or seller’s market, your offer may be below, at, or even above the asking price. I will be able to help you negotiate if you receive a counteroffer and reach an agreement. At this point, the house will go into escrow.`,
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80'
  },
  { 
    title: 'Have the Home Inspected', 
    text: `In most cases, your offer will be contingent on having the home inspected to ensure there is no major structural damage or large repairs needed. I can help you arrange this, and you can schedule it within days of making an offer. If there are no major issues, the process goes to step eight. If there is, you can renegotiate your offer based on what needs to be fixed, or you can withdraw it.`,
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1000&q=80'
  },
  { 
    title: 'Select Your Loan', 
    text: `Now is the time to go back to the mortgage lender who pre-approved or pre-qualified you and choose your mortgage. You will be presented with various options based on your unique financial situation, including fixed-rate, variable-rate, 15-year, 30-year, or special programs such as VA loans or FHA loans. Work with your mortgage lender to select the option you feel the most comfortable with.`,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80'
  },
  { 
    title: 'Get a Home Appraisal', 
    text: `Your lender will have your new home appraised so they have their independent value of it. The appraisal is to ensure that all parties involved are paying a fair price for the house.`,
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80'
  },
  { 
    title: 'Finish Paperwork', 
    text: `No one looks forward to all the paperwork involved in buying a home, but it’s a necessary part of the process. Fortunately, everything will be arranged by your lender and title company and, when you’re finished, you’ll know you are the legal owner of your new home.`,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80'
  }
];

export default function BuyersGuidePage() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] lg:h-[70vh] flex flex-col items-center justify-center bg-navy overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80" 
            alt="Buyer's Guide Blueprint"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full mt-10">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight animate-fade-up">
            Buyer's Guide
          </h1>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-[760px] mx-auto px-6 text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Your Roadmap</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy tracking-tight">
            Steps to Buying Your Home
          </h2>
          <div className="w-10 h-[1px] bg-gold mx-auto my-6"></div>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Buying property is one of the most significant financial milestones of your life. Rajivan Varatharajah provides a tailored, step-by-step framework to navigate the competitive market with absolute confidence.
          </p>
        </div>
      </section>

      {/* 3. EDITORIAL MATRIX (Alternating Z-Pattern Layout) */}
      <section className="w-full">
        {buyerSteps.map((step, index) => {
          const isEven = index % 2 !== 0; // Alternating logic (0-indexed)

          return (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? 'bg-gray-50' : 'bg-white'}`}>
              
              {/* Media Frame Container */}
              <div className={`relative min-h-[400px] lg:min-h-[600px] group overflow-hidden ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <img 
                  src={step.img} 
                  alt={step.title} 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Text Panel Container */}
              <div className={`flex flex-col justify-center px-8 py-16 lg:px-20 xl:px-24 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold">
                    Phase {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="w-6 h-[1px] bg-gold hidden md:block"></div>
                </div>
                
                <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-navy mb-5 uppercase tracking-wide leading-snug">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 text-sm lg:text-[15px] leading-loose font-medium">
                  {step.text}
                </p>
              </div>

            </div>
          );
        })}
      </section>

      {/* 4. ACTIONS FOOTER */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy tracking-wide uppercase mb-10">
            Ready to Begin Your Search?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/all-homes" className="btn flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gold transition-colors">
              Browse Live Listings <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn flex items-center justify-center gap-2 border border-navy text-navy px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-navy hover:text-white transition-colors">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CALCULATOR CTA SECTION */}
      <section className="py-20 bg-navy text-center border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold mb-4">Financial Analytics</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-10">
            Estimate Your Real Estate Carrying Costs
          </h2>
          <Link href="/calculator" className="inline-flex items-center gap-3 bg-white text-navy px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-neutral-100 transition-colors shadow-xl">
            <Calculator size={16} /> Launch Calculator Matrix
          </Link>
        </div>
      </section>

      {/* 6. WORK WITH RAJIVAN HERO */}
      <section className="relative h-[500px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1400&q=80" 
            alt="Work with Rajivan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative z-10 px-6 max-w-2xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold mb-4">Start Today</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Work With Rajivan
          </h2>
          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-10">
            With a passion for real estate and years of experience in sales and negotiation, Rajivan ensures every client gets top-tier service. Call him today to see how he can help you navigate the real estate market with confidence.
          </p>
          <Link href="/contact" className="bg-gold text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-navy transition-colors inline-block shadow-xl">
            Let's Connect
          </Link>
        </div>
      </section>

      {/* Global Footer Inclusion */}
      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";