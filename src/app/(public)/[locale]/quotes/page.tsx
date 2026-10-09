import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { quotesPublicRepository } from "@/lib/repositories/quotesPublic";
import Link from "next/link";
import { MessageSquareQuote } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Quotes & Thoughts | RHEVA",
  description: "Curhatan developer, quotes harian, dan cerita di balik layar.",
};

export default async function QuotesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const quotes = await quotesPublicRepository.getPublished();

  return (
    <div className="w-full bg-background min-h-screen pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl mb-2">
            <MessageSquareQuote className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Daily Quotes
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Thoughts, rants, and everything in between.
          </p>
        </div>

        {quotes.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground">No quotes published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((quote) => (
              <Link 
                key={quote.id} 
                href={\`/\${locale}/quotes/\${quote.slug}\`}
                className="group flex flex-col bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-md transition-all h-full"
              >
                <div className="text-4xl text-muted-foreground/30 font-serif leading-none mb-4 group-hover:text-primary/30 transition-colors">
                  "
                </div>
                <p className="text-foreground font-medium text-lg mb-6 flex-1 line-clamp-4">
                  {quote.quote}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                    Read more →
                  </span>
                  {quote.author && (
                    <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded-md">
                      {quote.author}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
