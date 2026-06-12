import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import GetInTouch from "@/components/GetInTouch";
import { notFound } from "next/navigation";
import { newsArticles } from "../page"; // Import the data array from the main news page

export const metadata = { title: "Article | PREMIER. Real Estate" };

// Next.js 15 requires params to be a Promise
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: Props) {
  // Await the dynamic slug
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Find the matching article
  const article = newsArticles.find((n) => n.slug === slug);

  // If someone types an invalid slug, show 404
  if (!article) {
    notFound();
  }

  return (
    <div className="bg-[#F8F7F4] min-h-screen">
      
      {/* 1. ARTICLE HERO SECTION */}
      <section className="relative h-[60vh] lg:h-[70vh] flex flex-col items-center justify-end bg-navy overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        </div>
        
        <div className="relative z-10 px-6 max-w-4xl mx-auto w-full text-center">
          <div className="inline-block bg-gold text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            Real Estate News
          </div>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight animate-fade-up leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-xs font-semibold text-white/70 mt-8">
            <span className="flex items-center gap-2"><Calendar size={16} className="text-gold"/> {article.date}</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-gold"/> {article.time}</span>
            <span className="text-white border-l border-white/20 pl-6">Source: {article.source}</span>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE CONTENT SECTION */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          
          <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-12">
            <Link href="/news" className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-navy hover:text-gold transition-colors">
              <ArrowLeft size={16} /> Back to News
            </Link>
            <button className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-navy hover:text-gold transition-colors">
              <Share2 size={16} /> Share
            </button>
          </div>

          <article className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed text-navy font-medium mb-8">
              (This is a simulated article view for <strong>{article.source}</strong>). {article.title}
            </p>
            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <h3 className="text-2xl font-display font-bold text-navy mt-10 mb-4">Market Implications & Insights</h3>
            <p className="mb-6">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <blockquote className="border-l-4 border-gold pl-6 py-2 my-8 italic text-lg text-navy bg-white shadow-sm p-6 rounded-r-xl">
              "The current shift in the Canadian real estate landscape, as highlighted by recent reports, requires strategic navigation by both buyers and sellers to maximize their respective positions."
            </blockquote>
            <p className="mb-6">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
          </article>

        </div>
      </section>

      {/* Global Footer Inclusion */}
      <GetInTouch dark={true} />
    </div>
  );
}

export const dynamic = "force-dynamic";