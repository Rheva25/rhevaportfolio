"use client";

import Link from "next/link";
import { format } from "date-fns";
import { DevlogEntry } from "@/lib/validations/devlog";
import { ArrowRight } from "lucide-react";
import { ShareButton } from "@/components/ui/share-button";

export function DevlogCard({ devlog, locale }: { devlog: DevlogEntry, locale: string }) {
  const getSeconds = (obj: any) => obj?._seconds || obj?.seconds || 0;
  const publishedDate = devlog.publishedAt 
    ? format(new Date(getSeconds(devlog.publishedAt) * 1000), "MMMM d, yyyy")
    : format(new Date(getSeconds(devlog.createdAt) * 1000), "MMMM d, yyyy");

  return (
    <article className="group relative flex flex-col items-start justify-between bg-card hover:bg-card/80 transition-colors rounded-xl border border-border p-6 shadow-sm overflow-hidden">
      
      {/* Decorative subtle texture/bg if it has a thumbnail */}
      {devlog.thumbnailUrl && (
        <div 
          className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity mix-blend-overlay pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: `url(${devlog.thumbnailUrl})` }}
        />
      )}

      <div className="flex items-center gap-x-4 text-xs font-mono text-muted-foreground mb-4 w-full justify-between">
        <time dateTime={publishedDate}>{publishedDate}</time>
        <span className="relative z-10 rounded-full bg-muted px-3 py-1 font-medium text-foreground">
          {devlog.category}
        </span>
      </div>

      <div className="group relative w-full border-l-2 border-primary/20 pl-4 py-2 mb-6">
        <h3 className="text-xl md:text-2xl font-semibold leading-tight text-foreground font-serif">
          <Link href={`/${locale}/devlog-unspoken/${devlog.slug}`}>
            <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-xl" />
            "{devlog.featuredQuote}"
          </Link>
        </h3>
        {devlog.quoteAttribution && (
          <p className="mt-2 text-sm italic text-muted-foreground">— {devlog.quoteAttribution}</p>
        )}
      </div>

      <div className="flex-1 w-full">
        <h4 className="text-lg font-medium text-foreground mb-2">{devlog.title}</h4>
        {devlog.excerpt && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {devlog.excerpt}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-row items-center justify-between w-full">
        <span className="flex items-center text-sm font-medium text-primary">
          Read Story <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
        <div className="relative z-30" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <ShareButton 
            title={`${devlog.title} - Devlog: Unspoken | Rheva`}
            text={`"${devlog.featuredQuote}" - Read the full reflection.`}
            url={`/${locale}/devlog-unspoken/${devlog.slug}`}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            iconOnly={true}
          />
        </div>
      </div>
    </article>
  );
}
