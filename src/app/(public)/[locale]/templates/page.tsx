import Link from "next/link";
import { ArrowRight, LayoutTemplate, Code2, ExternalLink, Package } from "lucide-react";
import { templateRepository } from "@/lib/repositories/templates";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";
import { getOptimizedOgImageUrl } from "@/lib/utils/ogImage";
import { ShareButton } from "@/components/ui/share-button";
import { Metadata } from "next";
import { FadeUp, MaskReveal, ScaleImageReveal, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const dynamic = "force-dynamic";

export async function generateMetadata({ 
  params,
  searchParams 
}: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { template: slug } = await searchParams;
  
  if (!slug || typeof slug !== 'string') {
    return {
      title: "UI Kits & Templates | Rheva",
      description: "Production-ready frontend boilerplate, UI kits, and completely designed templates."
    };
  }

  const allTemplates = await templateRepository.getPublicTemplates();
  const template = allTemplates.find(t => t.slug === slug);
  
  if (!template) {
    return {
      title: "UI Kits & Templates | Rheva"
    };
  }

  const title = `${getLocalizedText(template.name, locale as Locale)} - Template`;
  const description = getLocalizedText(template.shortDescription, locale as Locale);
  
  const optimizedUrl = getOptimizedOgImageUrl(template.thumbnail?.url);
  const ogImages = optimizedUrl ? [{ url: optimizedUrl }] : undefined;
  const twitterImages = optimizedUrl ? [optimizedUrl] : undefined;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImages && { images: ogImages }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(twitterImages && { images: twitterImages }),
    }
  };
}

export default async function TemplatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const localeStr = (await params).locale;
  const locale = localeStr as Locale;
  const allTemplates = await templateRepository.getPublicTemplates();
  const featuredTemplates = allTemplates.filter(t => t.featured);
  const regularTemplates = allTemplates.filter(t => !t.featured);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. Header */}
      <section className="w-full bg-background pt-32 pb-16 md:pt-48 md:pb-24 border-b border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-start max-w-3xl">
            <FadeUp delay={0.1}>
              <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-6">
                01 // FRONTEND PRODUCTS
              </span>
            </FadeUp>
            <MaskReveal delay={0.2}>
              <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] text-foreground tracking-tighter font-medium mb-8 leading-[1.05] text-balance">
                <span className="font-serif italic font-light pr-4">UI Kits</span><br className="hidden md:block"/>
                & Templates
              </h1>
            </MaskReveal>
            <FadeUp delay={0.3}>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-snug mb-10 text-balance">
                Production-ready frontend boilerplate, UI kits, and completely designed templates to accelerate your web development projects.
              </p>
              <ShareButton 
                title="UI Kits & Templates by Rheva" 
                text="Check out these production-ready frontend templates and UI kits!"
                variant="default"
                className="font-mono text-sm font-semibold"
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. Featured Templates */}
      {featuredTemplates.length > 0 && (
        <section className="w-full bg-card py-16 md:py-24 border-b border-border">
            <StaggerContainer className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
              {featuredTemplates.map((template) => (
                <StaggerItem key={template.id} id={template.slug} className="bg-background border border-border rounded-xl shadow-sm overflow-hidden flex flex-col lg:flex-row group hover:shadow-md transition-all">
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div>
                          <span className="font-mono text-xs text-muted-foreground uppercase mb-2 block">{template.category}</span>
                          <h2 className="text-3xl md:text-4xl font-serif italic text-foreground tracking-tight">{getLocalizedText(template.name, locale)}</h2>
                        </div>
                      </div>
                      <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-6">
                        {getLocalizedText(template.description, locale) || getLocalizedText(template.shortDescription, locale)}
                      </p>
                      
                      {/* Tech Stack Pills */}
                      {template.technologies && template.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                          {template.technologies.map((tech: string) => (
                            <span key={tech} className="font-mono text-[11px] px-2.5 py-1 rounded-sm bg-muted/50 text-foreground border border-border/50 uppercase tracking-widest">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Pricing</span>
                        <span className="text-xl font-serif italic text-foreground">{template.price || template.pricingType}</span>
                      </div>
                      <div className="flex gap-3">
                        {template.demoUrl && (
                          <a href={template.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:opacity-80 transition-opacity">
                            <ExternalLink className="h-3 w-3" />
                            <span>Live Demo</span>
                          </a>
                        )}
                        {template.sourceUrl && (
                          <a href={template.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-transparent border border-foreground/20 text-foreground font-mono text-xs uppercase tracking-widest hover:border-foreground/50 transition-all">
                            <Code2 className="h-3 w-3" />
                            <span>Get Source</span>
                          </a>
                        )}
                        <ShareButton 
                          title={`${getLocalizedText(template.name, locale)} - Template by Rheva`} 
                          text={getLocalizedText(template.shortDescription, locale)} 
                          url={`?template=${template.slug}#${template.slug}`}
                          iconOnly 
                          variant="outline"
                          className="px-4 py-3 rounded-lg border-foreground/20"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Image / Hero preview */}
                  <div className="lg:w-1/2 bg-muted/10 p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-border flex flex-col justify-center relative overflow-hidden group-hover:bg-muted/30 transition-colors duration-500">
                    <div className="flex items-center gap-2 mb-6 font-mono text-[11px] text-muted-foreground relative z-10 tracking-widest uppercase">
                      <span className="text-foreground">/{template.slug}</span>
                      <span>// {template.status}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ml-auto ${
                        template.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></span>
                    </div>
                    <div className="relative z-10 w-full aspect-[16/9] bg-background border border-border shadow-sm rounded-xl overflow-hidden flex items-center justify-center group-hover:shadow-lg transition-all duration-700">
                      {template.thumbnail?.url ? (
                        <ScaleImageReveal>
                          <img src={template.thumbnail.url} alt={template.thumbnail.alt || getLocalizedText(template.name, locale)} className="w-full h-full object-cover" />
                        </ScaleImageReveal>
                      ) : (
                        <LayoutTemplate className="h-12 w-12 text-muted-foreground/30" />
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
        </section>
      )}

      {/* 3. Catalog Grid */}
      <section className="w-full bg-background py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-10">
            <div>
              <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-4">
                02 // ALL TEMPLATES
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-foreground tracking-tight">
                Browse Collection
              </h2>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground px-4 py-2 rounded-sm border border-border/60 uppercase tracking-widest">
              {allTemplates.length} TEMPLATES FOUND
            </div>
          </FadeUp>

          {regularTemplates.length === 0 && featuredTemplates.length === 0 ? (
            <FadeUp delay={0.2} className="py-20 text-center flex flex-col items-center border border-dashed border-border rounded-xl">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <LayoutTemplate className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground">No templates available yet.</p>
              <p className="text-sm text-muted-foreground max-w-md mt-2">Check back soon for new frontend products.</p>
            </FadeUp>
          ) : (
            <StaggerContainer delay={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularTemplates.map((template) => (
                <StaggerItem key={template.id} id={template.slug} className="flex flex-col justify-between bg-card rounded-xl border border-border overflow-hidden hover:border-foreground/20 transition-colors duration-300 group">
                  <div className="relative aspect-[16/9] w-full bg-muted/10 overflow-hidden border-b border-border">
                    {template.thumbnail?.url ? (
                      <ScaleImageReveal className="w-full h-full">
                        <img 
                          src={template.thumbnail.url} 
                          alt={template.thumbnail.alt || getLocalizedText(template.name, locale)} 
                          className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-all duration-700" 
                        />
                      </ScaleImageReveal>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <LayoutTemplate className="h-10 w-10 text-muted-foreground/30" />
                      </div>
                    )}
                    
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                      <span className="font-mono text-[10px] px-2.5 py-1 rounded-sm bg-background/90 backdrop-blur-md text-foreground font-medium uppercase tracking-widest shadow-sm border border-border/50">
                        {template.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex items-center gap-1.5 font-medium uppercase tracking-widest font-mono text-[10px] px-2.5 py-1 rounded-sm border ${
                        template.status === 'Available' ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' :
                        'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          template.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></span> {template.status}
                      </div>
                      <span className="font-serif italic text-sm text-foreground">
                        {template.price || template.pricingType}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-serif italic text-foreground tracking-tight mt-2 mb-3 group-hover:text-primary transition-colors">
                      {getLocalizedText(template.name, locale)}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-2 mb-6 flex-1">
                      {getLocalizedText(template.shortDescription, locale)}
                    </p>
                    
                    {template.technologies && template.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {template.technologies.slice(0, 4).map((t: string) => (
                          <span key={t} className="font-mono text-[10px] bg-muted/50 px-2.5 py-1 rounded-sm text-foreground border border-border/50 uppercase tracking-widest">{t}</span>
                        ))}
                      </div>
                    )}

                    <div className="pt-6 mt-auto border-t border-border/50 flex gap-3">
                      {template.demoUrl && (
                        <a href={template.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-4 py-3 rounded-lg bg-foreground text-background font-mono text-[10px] uppercase tracking-widest hover:opacity-80 transition-opacity">
                          Demo
                        </a>
                      )}
                      {template.sourceUrl && (
                        <a href={template.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-4 py-3 rounded-lg bg-transparent border border-foreground/20 text-foreground font-mono text-[10px] uppercase tracking-widest hover:border-foreground/50 transition-colors">
                          Code
                        </a>
                      )}
                      <ShareButton 
                        title={`${getLocalizedText(template.name, locale)} - Template by Rheva`} 
                        text={getLocalizedText(template.shortDescription, locale)}
                        url={`?template=${template.slug}#${template.slug}`}
                        iconOnly 
                        variant="outline"
                        className="px-4 py-3 rounded-lg border-foreground/20"
                      />
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </div>
  );
}
