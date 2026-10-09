import { Locale } from "@/i18n/config";
import { quotesPublicRepository } from "@/lib/repositories/quotesPublic";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const quote = await quotesPublicRepository.getBySlug(slug);
  
  if (!quote) return {};

  const ogUrl = \`/api/og/quote?slug=\${slug}\`;

  return {
    title: \`\${quote.quote.substring(0, 50)}... | RHEVA\`,
    description: "Daily Quotes & Developer Thoughts",
    openGraph: {
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogUrl],
    },
  };
}

export default async function QuoteDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const quote = await quotesPublicRepository.getBySlug(slug);

  if (!quote) notFound();

  const igImageUrl = \`/api/og/quote?slug=\${slug}&format=ig\`;

  return (
    <div className="w-full bg-background min-h-screen pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <Link 
          href={\`/\${locale}/quotes\`}
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quotes
        </Link>

        {/* The Quote Card (Visual representation) */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12 flex flex-col items-center text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="text-6xl text-zinc-700 font-serif leading-none mb-6 relative z-10">"</div>
          <h1 className="text-2xl md:text-4xl font-bold text-zinc-100 leading-relaxed relative z-10 mb-10">
            {quote.quote}
          </h1>
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-sm font-mono text-zinc-500 tracking-widest uppercase bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-800">
              {quote.author || "iqbalabs"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 pb-12 border-b border-border">
          <a href={igImageUrl} download={\`quote-\${slug}-ig.png\`} target="_blank" rel="noreferrer">
            <Button size="lg" className="rounded-full w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download for Instagram Story
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-2 sm:mt-0 text-center sm:text-left">
            1080x1350px Portrait format with watermark
          </p>
        </div>

        {/* The Rant / Content */}
        <div className="prose prose-zinc dark:prose-invert max-w-none prose-lg">
          <div dangerouslySetInnerHTML={{ __html: quote.content }} />
        </div>
      </div>
    </div>
  );
}
