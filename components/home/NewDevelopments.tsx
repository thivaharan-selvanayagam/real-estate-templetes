import DevelopmentsSlider from "@/components/DevelopmentsSlider";
import { BRAND_CONFIG } from "@/config/brand";

export default function NewDevelopments() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-12">
        <h2 className={`font-display text-4xl md:text-5xl font-bold ${BRAND_CONFIG.theme.primaryText} tracking-tight`}>
          The Boldest New Developments
        </h2>
        <p className="text-gray-500 text-sm mt-3 leading-relaxed">
          Explore transformative new buildings that elevate modern luxury living.
        </p>
      </div>

      <DevelopmentsSlider />
    </section>
  );
}