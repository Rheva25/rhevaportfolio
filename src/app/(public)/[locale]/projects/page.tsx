import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle2, ShieldCheck, Database, Layers, Check } from "lucide-react";
import { projectRepository } from "@/lib/repositories/projects";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";
import { ShareButton } from "@/components/ui/share-button";
import { FadeUp, MaskReveal, ScaleImageReveal, StaggerContainer, StaggerItem } from "@/components/ui/motion";

// Force dynamic since we don't know when the admin creates new projects
export const dynamic = "force-dynamic";

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const allProjects = await projectRepository.getPublicProjects();
  const featuredProjects = allProjects.filter(p => p.featured);
  const regularProjects = allProjects.filter(p => !p.featured);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. Header */}
      <section className="w-full bg-background pt-32 pb-16 md:pt-48 md:pb-24 border-b border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-start max-w-3xl">
            <FadeUp delay={0.1}>
              <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-6">
                01 // INDEX CATALOG
              </span>
            </FadeUp>
            <MaskReveal delay={0.2}>
              <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] text-foreground tracking-tighter font-medium mb-8 leading-[1.05] text-balance">
                <span className="font-serif italic font-light pr-4">Engineering</span><br className="hidden md:block"/>
                Portofolio
              </h1>
            </MaskReveal>
            <FadeUp delay={0.3}>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-snug mb-10 text-balance">
                A comprehensive log of production architectures, administrative platforms, and active deployments across education and public sector domains.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. Featured Case Studies */}
      {featuredProjects.length > 0 && (
        <section className="w-full bg-card py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <StaggerContainer className="space-y-16">
              {featuredProjects.map((project) => (
                <StaggerItem key={project.id} className="bg-background border border-border rounded-xl shadow-sm hover:border-foreground/20 transition-all duration-300 overflow-hidden group">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-6">
                          <span className="font-mono text-[10px] px-2.5 py-1 rounded-sm bg-muted text-foreground font-medium uppercase tracking-widest">
                            {project.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded-sm bg-green-500/10 text-green-600 dark:text-green-400 font-medium uppercase tracking-widest border border-green-500/20">
                            <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                            {project.status}
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-serif italic text-foreground tracking-tight mb-4 group-hover:text-primary transition-colors">
                          <Link href={`/${locale}/projects/${project.slug}`}>{getLocalizedText(project.title, locale)}</Link>
                        </h3>
                        <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-8">
                          {getLocalizedText(project.shortDescription, locale)}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <span key={tech} className="font-mono text-[10px] px-2.5 py-1 rounded-sm bg-muted/50 text-foreground border border-border/50 uppercase tracking-widest">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-8 mt-8 border-t border-border/50">
                        <ShareButton 
                          title={getLocalizedText(project.title, locale)} 
                          text={getLocalizedText(project.shortDescription, locale)}
                          url={`/${locale}/projects/${project.slug}`}
                          iconOnly 
                          variant="outline"
                          className="px-4 py-3 rounded-lg border-foreground/20"
                        />
                        <Link href={`/${locale}/projects/${project.slug}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-mono text-[10px] uppercase tracking-widest hover:opacity-80 transition-opacity">
                          <span>View Case Study</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                    
                    {/* Image Preview Right */}
                    <div className="lg:col-span-5 bg-muted/10 p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-border flex flex-col justify-center group-hover:bg-muted/30 transition-colors duration-500">
                      <div className="bg-background border border-border rounded-xl shadow-sm text-foreground h-full min-h-[300px] flex items-center justify-center overflow-hidden relative group-hover:shadow-lg transition-all duration-700">
                        {project.heroImage?.url ? (
                           <ScaleImageReveal className="w-full h-full">
                             <img src={project.heroImage.url} alt={project.heroImage.alt || getLocalizedText(project.title, locale)} className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-all duration-700" />
                           </ScaleImageReveal>
                        ) : (
                          <div className="text-center">
                            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">SYSTEM_PREVIEW_UNAVAILABLE</div>
                            <div className="font-mono text-[9px] text-muted-foreground/50 uppercase">No preview image configured for this asset.</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* 3. Grid Catalog */}
      <section className="w-full bg-background py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-10">
            <div>
              <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-4">
                02 // EXTENDED DIRECTORY
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic tracking-tight text-foreground">
                All Projects
              </h2>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground px-4 py-2 rounded-sm border border-border/60 uppercase tracking-widest">
              {allProjects.length} RECORDS FOUND
            </div>
          </FadeUp>

          {regularProjects.length === 0 && featuredProjects.length === 0 ? (
            <FadeUp delay={0.2} className="py-20 text-center flex flex-col items-center border border-dashed border-border rounded-xl">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground">No projects found.</p>
              <p className="text-sm text-muted-foreground max-w-md mt-2">Projects are currently being synchronized or none have been published yet.</p>
            </FadeUp>
          ) : (
            <StaggerContainer delay={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularProjects.map((project) => (
                <StaggerItem key={project.id} className="group flex flex-col bg-card rounded-xl border border-border shadow-sm hover:border-foreground/20 transition-all duration-300 overflow-hidden h-full">
                  <div className="aspect-[16/9] bg-muted/10 relative overflow-hidden border-b border-border">
                    {project.heroImage?.url ? (
                      <Link href={`/${locale}/projects/${project.slug}`} className="block w-full h-full">
                        <ScaleImageReveal className="w-full h-full">
                          <img src={project.heroImage.url} alt={project.heroImage.alt || getLocalizedText(project.title, locale)} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" />
                        </ScaleImageReveal>
                      </Link>
                    ) : (
                      <Link href={`/${locale}/projects/${project.slug}`} className="w-full h-full flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/80 transition-colors">
                        <Layers className="h-8 w-8 mb-2 opacity-30" />
                        <span className="font-mono text-[10px] uppercase tracking-widest">NO_PREVIEW</span>
                      </Link>
                    )}
                    <div className="absolute top-4 right-4 pointer-events-none z-10">
                      <span className="font-mono text-[9px] px-2.5 py-1 rounded-sm bg-background/90 backdrop-blur-md text-foreground uppercase border border-border/50 shadow-sm tracking-widest">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-serif italic text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-1">
                      <Link href={`/${locale}/projects/${project.slug}`}>{getLocalizedText(project.title, locale)}</Link>
                    </h3>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed mb-8 line-clamp-3 flex-1">
                      {getLocalizedText(project.shortDescription, locale)}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <ShareButton 
                          title={getLocalizedText(project.title, locale)} 
                          text={getLocalizedText(project.shortDescription, locale)}
                          url={`/${locale}/projects/${project.slug}`}
                          iconOnly 
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        />
                        <Link href={`/${locale}/projects/${project.slug}`} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                          <span>Details</span>
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 font-mono text-[9px] px-2.5 py-1 rounded-sm uppercase tracking-widest border ${
                        project.status === 'Completed' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' : 
                        'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
                      }`}>
                        {project.status}
                      </span>
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
