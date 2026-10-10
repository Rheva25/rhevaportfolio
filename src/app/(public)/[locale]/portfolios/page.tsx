import { portfoliosPublicRepository } from "@/lib/repositories/portfoliosPublic";
import { Locale } from "@/i18n/config";
import { getLocalizedText } from "@/lib/utils/localization";
import { ExternalLink } from "lucide-react";
import { getOptimizedOgImageUrl } from "@/lib/utils/ogImage";
import { FadeUp, MaskReveal, ScaleImageReveal, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default async function PublicPortfoliosPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const portfolios = await portfoliosPublicRepository.getPublishedPortfolios();

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-20">
      <section className="w-full bg-background pt-32 pb-16 md:pt-48 md:pb-24 border-b border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <FadeUp delay={0.1}>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block font-semibold mb-4">
                EXTERNAL_SHOWCASES
              </span>
            </FadeUp>
            <MaskReveal delay={0.2}>
              <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] text-foreground font-serif italic tracking-tighter leading-[1.05] text-balance">
                Other Portfolios
              </h1>
            </MaskReveal>
            <FadeUp delay={0.3}>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-snug mt-6 text-balance">
                Explore my specialized portfolios across different roles, domains, and expertise areas.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {portfolios.length === 0 ? (
            <FadeUp delay={0.4} className="col-span-full py-20 text-center text-muted-foreground font-mono text-sm border border-dashed border-border/50 rounded-xl bg-muted/10">
              No external portfolios published yet.
            </FadeUp>
          ) : (
            <StaggerContainer delay={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((portfolio) => {
                const optImg = getOptimizedOgImageUrl(portfolio.thumbnailUrl) || portfolio.thumbnailUrl;
                return (
                  <StaggerItem
                    key={portfolio.id}
                    className="h-full"
                  >
                    <a 
                      href={portfolio.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden hover:border-foreground/20 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="aspect-[16/9] bg-muted/10 relative border-b border-border overflow-hidden">
                        {optImg ? (
                          <ScaleImageReveal className="w-full h-full">
                            <img 
                              src={optImg} 
                              alt={getLocalizedText(portfolio.title, locale)} 
                              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" 
                            />
                          </ScaleImageReveal>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/20">
                            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-8 flex flex-col flex-1">
                        <span className="text-[9px] font-mono font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                          {portfolio.role}
                        </span>
                        <h3 className="text-2xl font-serif italic text-foreground flex items-center justify-between mb-3 group-hover:text-primary transition-colors">
                          {getLocalizedText(portfolio.title, locale)}
                          <ExternalLink className="h-4 w-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-sm font-light text-muted-foreground leading-relaxed line-clamp-3">
                          {getLocalizedText(portfolio.description, locale)}
                        </p>
                        <div className="mt-auto pt-6 border-t border-border/50 flex items-center text-[10px] text-muted-foreground font-mono">
                          <span className="truncate">{portfolio.url.replace(/^https?:\/\//, '')}</span>
                        </div>
                      </div>
                    </a>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>
    </div>
  );
}
