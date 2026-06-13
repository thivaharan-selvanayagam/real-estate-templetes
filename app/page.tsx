import { getFeaturedListings } from "@/lib/repliers";

// 🔑 CORE COMPONENTS: Modular component layers
import HeroSearchSection from "@/components/HeroSearchSection"; // Variant controls happen here
import OurNeighborhoods from "@/components/OurNeighborhoods";
import BrandInnovationSection from "@/components/BrandInnovationSection";
import GetInTouch from "@/components/GetInTouch";

// 🔑 LOCAL SECTION LAYOUTS: Abstracted section blocks imported cleanly
import FeaturedProperties from "@/components/home/FeaturedProperties";
import VideoTestimonials from "@/components/home/VideoTestimonials";
import PremiumCollection from "@/components/home/PremiumCollection";
import NewDevelopments from "@/components/home/NewDevelopments";
import GlobalReferralNetwork from "@/components/home/GlobalReferralNetwork";
import BecomeAnAgent from "@/components/home/BecomeAnAgent";
import HeroVariant4 from "@/components/home/HeroVariant4";
import AgentValueSection from "@/components/home/AgentValueSection";
import FeaturedListingsSlider from "@/components/home/FeaturedListingsSlider";
import NeighborhoodGrid from "@/components/home/NeighborhoodGrid";

export default async function HomePage() {
  let featured = { listings: [] as any[], numResults: 0 };
  let rentals = { listings: [] as any[], numResults: 0 };
  
  try {
    [featured, rentals] = await Promise.all([
      getFeaturedListings({ type: "sale", pageSize: 9 }),
      getFeaturedListings({ type: "lease", pageSize: 9 }),
    ]);
  } catch (e) { 
    console.error("Failed to compile master home page payloads:", e); 
  }

  return (
    <>
      {/* 1. Hero Section Engine Layer */}
      <HeroVariant4 />
      {/* <HeroSearchSection /> */}
      <AgentValueSection />
      <FeaturedListingsSlider listings={featured.listings} />
      <NeighborhoodGrid />

      {/* 2. Neighborhood Map Geographies Directory */}
      <OurNeighborhoods />

      {/* 3. Featured Sub-Market Property Layout */}
      <FeaturedProperties listings={featured.listings} />

      {/* 4. Multimedia Client Story Module */}
      <VideoTestimonials />

      {/* 5. Contrast Grid Showcase Collection */}
      <PremiumCollection listings={featured.listings} />

      {/* 6. High-Density Asset Development Slider */}
      <NewDevelopments />

      {/* 7. Corporate Brand Optimization Block */}
      <BrandInnovationSection />

      {/* 8. Geolocation Network Web Engine */}
      <GlobalReferralNetwork />

      {/* 9. Internal Recruitment Callout Vector */}
      <BecomeAnAgent />

      {/* 10. Global Footer Contact Submission Block */}
      <GetInTouch dark={true} />
    </>
  );
}

export const dynamic = "force-dynamic";