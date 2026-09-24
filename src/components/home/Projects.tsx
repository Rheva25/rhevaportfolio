import Link from "next/link";
import { ArrowRight, ExternalLink, FolderKanban } from "lucide-react";
import { projectRepository } from "@/lib/repositories/projects";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";

export async function Projects({ locale }: { locale: Locale }) {
  const allProjects = await projectRepository.getPublicProjects();
  // Ensure we sort by latest or just take first 4 (if we add sorting to repo)
  const projects = allProjects.slice(0, 4);

  return (
    <section className="w-full bg-background py-24" id="projects">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-2">
              01 // PROJECTS
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Selected Work
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Production systems engineered for real institutional and enterprise workflows.
            </p>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-2 font-mono text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            <span>Browse All Projects ({allProjects.length})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Dynamic Grid */}
        <div className="space-y-8">
          {projects.length === 0 ? (
            <div className="py-20 text-center bg-muted/30 border border-border border-dashed rounded-xl flex flex-col items-center">
              <FolderKanban className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-mono text-sm">No public projects available yet.</p>
            </div>
          ) : null}

          {/* Large Cards (First 2 Projects) */}
          {projects.slice(0, 2).map((project) => (
            <div key={project.id} className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-6 p-6 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                      <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium uppercase tracking-wider">
                        {project.category || "Software"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium border border-green-500/20 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-3">
                      {getLocalizedText(project.title, locale)}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed mb-6">
                      {getLocalizedText(project.shortDescription, locale)}
                    </p>
                    
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies?.slice(0, 5).map((tech: string) => (
                        <span key={tech} className="font-mono text-[11px] px-2 py-0.5 rounded bg-muted text-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Links */}
                  <div className="flex items-center gap-6 pt-4 border-t border-border/50">
                    <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      <span>View Full Case Study</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    {project.links?.[0] && (
                      <Link href={project.links[0].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-flex">
                        <ExternalLink className="h-4 w-4" />
                        <span>{getLocalizedText(project.links[0].label, locale)}</span>
                      </Link>
                    )}
                  </div>
                </div>
                
                {/* Right Preview Image / Fallback */}
                <div className="lg:col-span-6 bg-muted/30 border-t lg:border-t-0 lg:border-l border-border p-6 lg:p-8 flex flex-col justify-center">
                  <div className="bg-card border border-border rounded-lg shadow-sm p-2 text-foreground h-full min-h-[250px] flex items-center justify-center overflow-hidden relative">
                    {project.heroImage?.url ? (
                       <img src={project.heroImage.url} alt={project.heroImage.alt || getLocalizedText(project.title, locale)} className="object-cover w-full h-full rounded-md opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    ) : (
                      <div className="text-center">
                        <div className="w-12 h-1 bg-primary/20 mx-auto rounded-full overflow-hidden">
                          <div className="w-1/3 h-full bg-primary animate-pulse"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Small Cards (Next 2 Projects) */}
          {projects.length > 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.slice(2, 4).map((project) => (
                <div key={project.id} className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="font-mono text-[10px] text-green-600 dark:text-green-400 font-medium flex items-center gap-1.5 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{getLocalizedText(project.title, locale)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {getLocalizedText(project.shortDescription, locale)}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies?.slice(0, 4).map((tech: string) => (
                        <span key={tech} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    <span>View Case Study</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
