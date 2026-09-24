import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle2, ShieldCheck, Database, Layers, Check } from "lucide-react";
import { projectRepository } from "@/lib/repositories/projects";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";

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
      <section className="w-full bg-background pt-12 pb-16 md:pt-16 md:pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-start max-w-3xl">
            <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-4">
              01 // INDEX CATALOG
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight font-semibold mb-6">
              Engineering Portofolio
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A comprehensive log of production architectures, administrative platforms, and active deployments across education and public sector domains.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Featured Case Studies */}
      {featuredProjects.length > 0 && (
        <section className="w-full bg-card py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="space-y-12">
              {featuredProjects.map((project) => (
                <div key={project.id} className="bg-background border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 p-6 lg:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-4">
                          <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-muted text-foreground font-medium uppercase tracking-wider">
                            {project.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium uppercase tracking-wider">
                            <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                            {project.status}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-3 hover:text-primary transition-colors">
                          <Link href={`/${locale}/projects/${project.slug}`}>{getLocalizedText(project.title, locale)}</Link>
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed mb-6">
                          {getLocalizedText(project.shortDescription, locale)}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <span key={tech} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-6 mt-6 border-t border-border">
                        <Link href={`/${locale}/projects/${project.slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-foreground text-background font-mono text-sm font-semibold hover:bg-foreground/90 transition-colors">
                          <span>View Case Study</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                    
                    {/* Image Preview Right */}
                    <div className="lg:col-span-5 bg-muted/30 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-border flex flex-col justify-center">
                      <div className="bg-card border border-border rounded-lg shadow-sm p-2 text-foreground h-full min-h-[250px] flex items-center justify-center overflow-hidden relative">
                        {project.heroImage?.url ? (
                           <img src={project.heroImage.url} alt={project.heroImage.alt || getLocalizedText(project.title, locale)} className="object-cover w-full h-full rounded-md opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                        ) : (
                          <div className="text-center">
                            <div className="font-mono text-xs text-muted-foreground mb-2">SYSTEM_PREVIEW_UNAVAILABLE</div>
                            <div className="font-mono text-[10px] text-muted-foreground/50">No preview image configured for this asset.</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Grid Catalog */}
      <section className="w-full bg-background py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-2">
                02 // EXTENDED DIRECTORY
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                All Projects
              </h2>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground px-3 py-1.5 rounded-full border border-border">
              {allProjects.length} RECORDS FOUND
            </div>
          </div>

          {regularProjects.length === 0 && featuredProjects.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center border border-dashed border-border rounded-xl">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground">No projects found.</p>
              <p className="text-sm text-muted-foreground max-w-md mt-2">Projects are currently being synchronized or none have been published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project) => (
                <Link key={project.id} href={`/${locale}/projects/${project.slug}`} className="group flex flex-col bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all overflow-hidden h-full hover:border-primary/50">
                  <div className="h-48 bg-muted relative overflow-hidden border-b border-border">
                    {project.heroImage?.url ? (
                      <img src={project.heroImage.url} alt={project.heroImage.alt || getLocalizedText(project.title, locale)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                        <Layers className="h-8 w-8 mb-2 opacity-50" />
                        <span className="font-mono text-[10px] uppercase">NO_PREVIEW</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="font-mono text-[9px] px-2 py-1 rounded bg-background/90 backdrop-blur-sm text-foreground uppercase border border-border">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {getLocalizedText(project.title, locale)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {getLocalizedText(project.shortDescription, locale)}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <span>Details</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <span className={`inline-flex items-center gap-1 font-mono text-[9px] px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                        project.status === 'Completed' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 
                        'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
