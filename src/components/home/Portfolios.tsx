import Link from "next/link";
import { ArrowRight, Code2, FolderKanban } from "lucide-react";
import { portfoliosPublicRepository } from "@/lib/repositories/portfoliosPublic";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";
import { FadeUp, StaggerContainer, StaggerItem, ScaleImageReveal, MaskReveal } from "@/components/ui/motion";

export async function Portfolios({ locale }: { locale: Locale }) {
  const allPortfolios = await portfoliosPublicRepository.getPublishedPortfolios();
  const portfolios = allPortfolios.slice(0, 4); // Max 4 on homepage

  return (
    <section className="w-full bg-background py-24 md:py-32 border-b border-border/40" id="portfolios">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Editorial Header */}
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif italic text-foreground tracking-tight mb-4">
              Backend & Architecture
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Systems, APIs, and infrastructure engineered for scale and reliability.
            </p>
          </div>
          <Link href="/portfolios" className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity whitespace-nowrap pb-2">
            <span>View All Works ({allPortfolios.length})</span>
            <span className="w-8 h-[1px] bg-foreground group-hover:w-12 transition-all duration-300"></span>
          </Link>
        </FadeUp>

        {/* Minimalist Image-Centric Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-24">
          {portfolios.length === 0 ? (
            <div className="col-span-full py-32 text-center flex flex-col items-center">
              <Code2 className="h-8 w-8 text-muted-foreground/30 mb-6" strokeWidth={1} />
              <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">No public works available</p>
            </div>
          ) : (
            portfolios.map((portfolio, index) => (
              <StaggerItem key={portfolio.id} className={`group flex flex-col ${index % 2 !== 0 ? 'md:mt-24' : ''}`}>
                {/* Massive Borderless Image */}
                <ScaleImageReveal className="block relative aspect-[4/3] w-full bg-muted/20 mb-6">
                  <a href={portfolio.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 block">
                    {portfolio.thumbnailUrl ? (
                      <img 
                        src={portfolio.thumbnailUrl} 
                        alt={getLocalizedText(portfolio.title, locale)} 
                        className="object-cover w-full h-full filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code2 className="h-8 w-8 text-muted-foreground/20" strokeWidth={1} />
                      </div>
                    )}
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-foreground/5 transition-colors duration-500"></div>
                  </a>
                </ScaleImageReveal>
                
                {/* Elegant Caption */}
                <div className="flex flex-col flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                    <MaskReveal>
                      <a href={portfolio.url} target="_blank" rel="noopener noreferrer" className="text-2xl md:text-3xl font-medium text-foreground tracking-tight hover:opacity-70 transition-opacity">
                        {getLocalizedText(portfolio.title, locale)}
                      </a>
                    </MaskReveal>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground shrink-0 pt-1">
                      {portfolio.role}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-2">
                    {getLocalizedText(portfolio.description, locale)}
                  </p>
                </div>
              </StaggerItem>
            ))
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
