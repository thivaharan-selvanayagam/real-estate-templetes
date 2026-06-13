import TestimonialsSlider from "@/components/TestimonialsSlider";

export default function VideoTestimonials() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gray-950 py-24">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" poster="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-at-sunset-41618-large.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/75 md:bg-black/70 z-10" />
      
      <div className="relative z-20 w-full animate-fade-up">
        <TestimonialsSlider />
      </div>
    </section>
  );
}