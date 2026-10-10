"use client";

import Link from "next/link";
import { format } from "date-fns";
import { DevlogEntry } from "@/lib/validations/devlog";
import { ArrowRight } from "lucide-react";
import { ShareButton } from "@/components/ui/share-button";
import { ScaleImageReveal } from "@/components/ui/motion";

export function DevlogCard({ devlog, locale }: { devlog: DevlogEntry, locale: string }) {
  const getSeconds = (obj: any) => obj?._seconds || obj?.seconds || 0;
  const publishedDate = devlog.publishedAt 
    ? format(new Date(getSeconds(devlog.publishedAt) * 1000), "MMMM d, yyyy")
    : format(new Date(getSeconds(devlog.createdAt) * 1000), "MMMM d, yyyy");

  return (
    <article className="group relative flex flex-col bg-card hover:bg-card/80 transition-colors rounded-xl border border-border overflow-hidden shadow-sm">
      <div className="relative w-full aspect-[4/5] bg-muted overflow-hidden border-b border-border">
        {devlog.thumbnailUrl ? (
          <ScaleImageReveal className="w-full h-full">
            <img 
              src={devlog.thumbnailUrl} 
              alt={`Quote from ${devlog.title}`} 
              className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:opacity-100" 
            />
          </ScaleImageReveal>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F5F1E8]">
            <h3 className="text-xl md:text-2xl font-semibold leading-tight text-[#24221F] font-serif">
              "{devlog.featuredQuote}"
            </h3>
            {devlog.quoteAttribution && (
              <p className="mt-4 text-sm italic text-[#918779]">— {devlog.quoteAttribution}</p>
            )}
          </div>
        )}
        <Link href={`/${locale}/devlog-unspoken/${devlog.slug}`}>
          <span className="absolute inset-0 z-20" />
        </Link>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-x-4 text-xs font-mono text-muted-foreground mb-3 w-full justify-between">
          <time dateTime={publishedDate}>{publishedDate}</time>
          <span className="relative z-10 rounded-full bg-muted px-2.5 py-0.5 font-medium text-foreground">
            {devlog.category}
          </span>
        </div>

        <div className="flex-1 w-full mb-6">
          <h4 className="text-2xl font-serif italic text-foreground mb-3 leading-tight group-hover:text-[#918779] transition-colors">{devlog.title}</h4>
          {devlog.excerpt && (
            <p className="line-clamp-3 text-sm font-light text-muted-foreground leading-relaxed">
              {devlog.excerpt}
            </p>
          )}
        </div>

        <div className="mt-auto flex flex-row items-center justify-between w-full pt-4 border-t border-border/50">
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
              className="h-8 w-8 text-muted-foreground hover:text-foreground -mr-2"
              iconOnly={true}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
