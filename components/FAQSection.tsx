interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
}

export default function FAQSection({ 
  title = "Frequently Asked Questions", 
  items 
}: FAQSectionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="my-16 py-12 px-6 sm:px-10 bg-white rounded-3xl border border-stone-200/80 max-w-[1440px] mx-auto text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-3xl mb-8">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2b4b46] bg-emerald-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Market Intelligence
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {title}
        </h2>
      </div>

      <div className="divide-y divide-stone-100 max-w-4xl">
        {items.map((item, idx) => (
          <details key={idx} className="group py-5 text-left cursor-pointer">
            <summary className="flex justify-between items-center font-bold text-slate-900 text-base group-hover:text-[#2b4b46] transition-colors list-none">
              <span>{item.question}</span>
              <span className="text-xl font-light text-stone-400 group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3 text-stone-600 text-sm leading-relaxed pr-6">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}