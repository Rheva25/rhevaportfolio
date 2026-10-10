import Link from "next/link";
import { ArrowRight, Code2, FolderKanban } from "lucide-react";
import { portfoliosPublicRepository } from "@/lib/repositories/portfoliosPublic";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";

export async function Portfolios({ locale }: { locale: Locale }) {
  const allPortfolios = await portfoliosPublicRepository.getPublishedPortfolios();
  const portfolios = allPortfolios.slice(0, 4); // Max 4 on homepage

  return (
    <section className="w-full bg-background py-24" id="portfolios">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase text-primary tracking-wider font-semibold block mb-2">
              03 // PROGRAMMER GALLERY
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Backend & Architecture
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              Systems, APIs, and infrastructure engineered for scale and reliability.
            </p>
          </div>
          <Link href="/portfolios" className="inline-flex items-center gap-2 font-mono text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            <span>View All Works ({allPortfolios.length})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Dynamic Portfolios Grid */}
        <div className="space-y-8">
          {portfolios.length === 0 ? (
            <div className="py-20 text-center bg-muted/30 border border-border border-dashed rounded-xl flex flex-col items-center">
              <FolderKanban className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-mono text-sm">No public portfolios available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolios.map((portfolio) => (
                <div key={portfolio.id} className="group rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all flex flex-col">
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] w-full bg-muted/50 overflow-hidden border-b border-border">
                    {portfolio.thumbnailUrl ? (
                      <img 
                        src={portfolio.thumbnailUrl} 
                        alt={getLocalizedText(portfolio.title, locale)} 
                        className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code2 className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}
                    
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-background/90 backdrop-blur-md text-foreground font-medium uppercase tracking-wider shadow-sm border border-border/50">
                        {portfolio.role}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      {getLocalizedText(portfolio.title, locale)}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {getLocalizedText(portfolio.description, locale)}
                    </p>
                    
                    {/* Action Link */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-border/50 mt-auto">
                      <a 
                        href={portfolio.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-foreground text-background hover:bg-foreground/90 font-mono text-sm font-semibold transition-colors"
                      >
                        <span>Visit Site</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
