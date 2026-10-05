import Link from "next/link";
import { ArrowRight, LayoutTemplate, Code2, ExternalLink, Package } from "lucide-react";
import { templateRepository } from "@/lib/repositories/templates";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";
import { getOptimizedOgImageUrl } from "@/lib/utils/ogImage";
import { ShareButton } from "@/components/ui/share-button";
import { Metadata } from "next";

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
      <section className="w-full bg-background pt-12 pb-16 md:pt-16 md:pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-start max-w-3xl">
            <span className="font-mono text-xs uppercase text-primary tracking-wider font-semibold block mb-4">
              01 // FRONTEND PRODUCTS
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight font-semibold mb-6">
              UI Kits & Templates
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Production-ready frontend boilerplate, UI kits, and completely designed templates to accelerate your web development projects.
            </p>
            <ShareButton 
              title="UI Kits & Templates by Rheva" 
              text="Check out these production-ready frontend templates and UI kits!"
              variant="default"
              className="font-mono text-sm font-semibold"
            />
          </div>
        </div>
      </section>

      {/* 2. Featured Templates */}
      {featuredTemplates.length > 0 && (
        <section className="w-full bg-card py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
            {featuredTemplates.map((template) => (
              <div key={template.id} id={template.slug} className="bg-background border border-border rounded-xl shadow-sm overflow-hidden flex flex-col lg:flex-row group hover:shadow-md transition-all">
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div>
                        <span className="font-mono text-xs text-muted-foreground uppercase mb-2 block">{template.category}</span>
                        <h2 className="text-3xl font-semibold text-foreground tracking-tight">{getLocalizedText(template.name, locale)}</h2>
                      </div>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed mb-6">
                      {getLocalizedText(template.description, locale) || getLocalizedText(template.shortDescription, locale)}
                    </p>
                    
                    {/* Tech Stack Pills */}
                    {template.technologies && template.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {template.technologies.map((tech: string) => (
                          <span key={tech} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-muted text-foreground border border-border/50">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Pricing</span>
                      <span className="text-xl font-bold text-foreground">{template.price || template.pricingType}</span>
                    </div>
                    <div className="flex gap-3">
                      {template.demoUrl && (
                        <a href={template.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-foreground text-background font-mono text-sm font-semibold hover:bg-foreground/90 transition-colors">
                          <ExternalLink className="h-4 w-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {template.sourceUrl && (
                        <a href={template.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-primary text-primary-foreground font-mono text-sm font-semibold hover:bg-primary/90 transition-colors">
                          <Code2 className="h-4 w-4" />
                          <span>Get Source</span>
                        </a>
                      )}
                      <ShareButton 
                        title={`${getLocalizedText(template.name, locale)} - Template by Rheva`} 
                        text={getLocalizedText(template.shortDescription, locale)} 
                        url={`?template=${template.slug}#${template.slug}`}
                        iconOnly 
                        variant="outline"
                        className="px-4 py-2.5 rounded"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Image / Hero preview */}
                <div className="lg:w-1/2 bg-muted/30 p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-border flex flex-col justify-center relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-4 font-mono text-[11px] text-muted-foreground relative z-10">
                    <span className="text-foreground">/{template.slug}</span>
                    <span>// {template.status.toUpperCase()}</span>
                    <span className={`w-2 h-2 rounded-full ml-auto ${
                      template.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></span>
                  </div>
                  <div className="relative z-10 w-full aspect-[16/9] min-h-[300px] bg-background border border-border shadow-inner rounded-xl overflow-hidden flex items-center justify-center">
                    {template.thumbnail?.url ? (
                      <img src={template.thumbnail.url} alt={template.thumbnail.alt || getLocalizedText(template.name, locale)} className="w-full h-full object-cover" />
                    ) : (
                      <LayoutTemplate className="h-12 w-12 text-muted-foreground/30" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Catalog Grid */}
      <section className="w-full bg-background py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <span className="font-mono text-xs uppercase text-primary tracking-wider font-semibold block mb-2">
                02 // ALL TEMPLATES
              </span>
              <h2 className="text-3xl font-semibold text-foreground tracking-tight">
                Browse Collection
              </h2>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground px-3 py-1.5 rounded-full border border-border">
              {allTemplates.length} TEMPLATES FOUND
            </div>
          </div>

          {regularTemplates.length === 0 && featuredTemplates.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center border border-dashed border-border rounded-xl">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <LayoutTemplate className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground">No templates available yet.</p>
              <p className="text-sm text-muted-foreground max-w-md mt-2">Check back soon for new frontend products.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularTemplates.map((template) => (
                <article key={template.id} id={template.slug} className="flex flex-col justify-between bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="relative aspect-[16/9] w-full bg-muted/50 overflow-hidden border-b border-border">
                    {template.thumbnail?.url ? (
                      <img 
                        src={template.thumbnail.url} 
                        alt={template.thumbnail.alt || getLocalizedText(template.name, locale)} 
                        className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <LayoutTemplate className="h-10 w-10 text-muted-foreground/30" />
                      </div>
                    )}
                    
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-background/90 backdrop-blur-md text-foreground font-medium uppercase tracking-wider shadow-sm border border-border/50">
                        {template.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex items-center gap-1.5 font-medium uppercase tracking-wider font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                        template.status === 'Available' ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' :
                        'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          template.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></span> {template.status}
                      </div>
                      <span className="font-semibold font-mono text-xs text-foreground">
                        {template.price || template.pricingType}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground tracking-tight mt-1 mb-2">
                      {getLocalizedText(template.name, locale)}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
                      {getLocalizedText(template.shortDescription, locale)}
                    </p>
                    
                    {template.technologies && template.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {template.technologies.slice(0, 4).map((t: string) => (
                          <span key={t} className="font-mono text-[10px] bg-muted px-2 py-0.5 rounded text-foreground border border-border/50">{t}</span>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 mt-auto border-t border-border flex gap-2">
                      {template.demoUrl && (
                        <a href={template.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-3 py-2 rounded bg-foreground text-background font-mono text-xs font-semibold hover:bg-foreground/90 transition-colors">
                          Demo
                        </a>
                      )}
                      {template.sourceUrl && (
                        <a href={template.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-3 py-2 rounded bg-primary text-primary-foreground font-mono text-xs font-semibold hover:bg-primary/90 transition-colors">
                          Get Source
                        </a>
                      )}
                      <ShareButton 
                        title={`${getLocalizedText(template.name, locale)} - Template by Rheva`} 
                        text={getLocalizedText(template.shortDescription, locale)}
                        url={`?template=${template.slug}#${template.slug}`}
                        iconOnly 
                        variant="outline"
                        className="px-3 py-2"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
