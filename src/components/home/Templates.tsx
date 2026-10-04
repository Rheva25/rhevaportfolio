import Link from "next/link";
import { ArrowRight, LayoutTemplate, Code2, ExternalLink } from "lucide-react";
import { templateRepository } from "@/lib/repositories/templates";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";

export async function Templates({ locale }: { locale: Locale }) {
  const allTemplates = await templateRepository.getPublicTemplates();
  const templates = allTemplates.slice(0, 4); // Max 4 on homepage

  return (
    <section className="w-full bg-background py-24" id="templates">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase text-primary tracking-wider font-semibold block mb-2">
              03 // UI KITS & TEMPLATES
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Frontend Products
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              Production-ready UI kits, boilerplates, and templates to kickstart your next digital product.
            </p>
          </div>
          <Link href="/templates" className="inline-flex items-center gap-2 font-mono text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            <span>View All Templates ({allTemplates.length})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Dynamic Templates Grid */}
        <div className="space-y-8">
          {templates.length === 0 ? (
            <div className="py-20 text-center bg-muted/30 border border-border border-dashed rounded-xl flex flex-col items-center">
              <LayoutTemplate className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-mono text-sm">No public templates available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {templates.map((template) => (
                <div key={template.id} className="group rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all flex flex-col">
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] w-full bg-muted/50 overflow-hidden border-b border-border">
                    {template.thumbnail?.url ? (
                      <img 
                        src={template.thumbnail.url} 
                        alt={template.thumbnail.alt || getLocalizedText(template.name, locale)} 
                        className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <LayoutTemplate className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}
                    
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-background/90 backdrop-blur-md text-foreground font-medium uppercase tracking-wider shadow-sm border border-border/50">
                        {template.category}
                      </span>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <span className={`font-mono text-[10px] px-2.5 py-1 rounded font-bold uppercase tracking-wider shadow-sm border ${
                        template.pricingType === 'Free' 
                          ? 'bg-green-500/90 text-white border-green-600/50' 
                          : 'bg-primary/90 text-primary-foreground border-primary/50'
                      }`}>
                        {template.price || template.pricingType}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${
                        template.status === 'Coming Soon'
                          ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' 
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          template.status === 'Coming Soon' ? 'bg-yellow-500' : 'bg-emerald-500'
                        }`}></span>
                        {template.status}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      {getLocalizedText(template.name, locale)}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {getLocalizedText(template.shortDescription, locale)}
                    </p>
                    
                    {/* Tech Stack Pills */}
                    {template.technologies && template.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {template.technologies.slice(0, 4).map((tech: string) => (
                          <span key={tech} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-border/50">
                      {template.demoUrl && (
                        <a 
                          href={template.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-foreground text-background hover:bg-foreground/90 font-mono text-sm font-semibold transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      )}
                      
                      {template.sourceUrl && (
                        <a 
                          href={template.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm font-semibold transition-colors"
                        >
                          <Code2 className="h-4 w-4" />
                          Get Source
                        </a>
                      )}
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
