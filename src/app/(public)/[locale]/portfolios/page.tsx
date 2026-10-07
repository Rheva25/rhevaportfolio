import { portfoliosPublicRepository } from "@/lib/repositories/portfoliosPublic";
import { Locale } from "@/i18n/config";
import { getLocalizedText } from "@/lib/utils/localization";
import { ExternalLink } from "lucide-react";
import { getOptimizedOgImageUrl } from "@/lib/utils/ogImage";

export default async function PublicPortfoliosPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const portfolios = await portfoliosPublicRepository.getPublishedPortfolios();

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-20">
      <section className="w-full bg-background pt-12 pb-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="font-mono text-xs text-primary uppercase tracking-wider block font-semibold mb-2">
              EXTERNAL_SHOWCASES
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground font-semibold tracking-tight leading-tight">
              Other Portfolios
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mt-2">
              Explore my specialized portfolios across different roles, domains, and expertise areas.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio) => {
              const optImg = getOptimizedOgImageUrl(portfolio.thumbnailUrl) || portfolio.thumbnailUrl;
              return (
                <a 
                  key={portfolio.id}
                  href={portfolio.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-md"
                >
                  <div className="aspect-[16/9] bg-muted relative border-b border-border overflow-hidden">
                    {optImg ? (
                      <img 
                        src={optImg} 
                        alt={getLocalizedText(portfolio.title, locale)} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/50">
                        <span className="font-mono text-xs uppercase opacity-50">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] font-mono font-semibold text-primary uppercase tracking-wider mb-2">
                      {portfolio.role}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground flex items-center justify-between mb-3 group-hover:text-primary transition-colors">
                      {getLocalizedText(portfolio.title, locale)}
                      <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {getLocalizedText(portfolio.description, locale)}
                    </p>
                    <div className="mt-6 pt-4 border-t border-border flex items-center text-xs text-muted-foreground font-mono">
                      <span className="truncate">{portfolio.url.replace(/^https?:\/\//, '')}</span>
                    </div>
                  </div>
                </a>
              );
            })}
            
            {portfolios.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground font-mono text-sm border border-dashed border-border rounded-xl">
                No external portfolios published yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
