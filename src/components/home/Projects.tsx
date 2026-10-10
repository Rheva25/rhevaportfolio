import Link from "next/link";
import { ArrowRight, ExternalLink, FolderKanban } from "lucide-react";
import { projectRepository } from "@/lib/repositories/projects";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";
import { FadeUp, MaskReveal, ScaleImageReveal } from "@/components/ui/motion";

export async function Projects({ locale }: { locale: Locale }) {
  const allProjects = await projectRepository.getPublicProjects();
  const projects = allProjects.slice(0, 4);

  return (
    <section className="w-full bg-background py-24 md:py-32 border-b border-border/40" id="projects">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Editorial Header */}
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between mb-24 md:mb-32 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif italic text-foreground tracking-tight mb-4">
              Selected Work
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Production systems engineered for real institutional and enterprise workflows.
            </p>
          </div>
          <Link href="/projects" className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity whitespace-nowrap pb-2">
            <span>Browse All Projects</span>
            <span className="w-8 h-[1px] bg-foreground group-hover:w-12 transition-all duration-300"></span>
          </Link>
        </FadeUp>

        {/* Minimalist Alternating Rows */}
        <div className="space-y-32 md:space-y-48">
          {projects.length === 0 ? (
            <div className="py-32 text-center flex flex-col items-center">
              <FolderKanban className="h-8 w-8 text-muted-foreground/30 mb-6" strokeWidth={1} />
              <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">No public projects available</p>
            </div>
          ) : (
            projects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={project.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24 group`}>
                  
                  {/* Image Column */}
                  <div className="w-full md:w-1/2">
                    <ScaleImageReveal delay={0.1} className="block relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] w-full bg-muted/20">
                      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10 block">
                        {project.heroImage?.url ? (
                          <img 
                            src={project.heroImage.url} 
                            alt={project.heroImage.alt || getLocalizedText(project.title, locale)} 
                            className="object-cover w-full h-full filter grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FolderKanban className="h-8 w-8 text-muted-foreground/20" strokeWidth={1} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-background/0 group-hover:bg-foreground/5 transition-colors duration-500"></div>
                      </Link>
                    </ScaleImageReveal>
                  </div>
                  
                  {/* Text Column */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <FadeUp delay={0.2}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          0{index + 1} &mdash; {project.category || "Software"}
                        </span>
                        {project.status && (
                          <span className={`font-mono text-[10px] uppercase tracking-widest ${project.status === 'Completed' ? 'text-foreground' : 'text-muted-foreground'}`}>
                            [{project.status}]
                          </span>
                        )}
                      </div>
                    </FadeUp>
                    
                    <MaskReveal delay={0.3}>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight mb-8 leading-[1.1]">
                        {getLocalizedText(project.title, locale)}
                      </h3>
                    </MaskReveal>
                    
                    <FadeUp delay={0.4}>
                      <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-10 max-w-lg">
                        {getLocalizedText(project.shortDescription, locale)}
                      </p>
                      
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-12">
                          {project.technologies.slice(0, 4).map((tech: string) => (
                            <span key={tech} className="font-mono text-[11px] text-muted-foreground">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-8">
                        <Link href={`/projects/${project.slug}`} className="group/link flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity">
                          <span>View Case Study</span>
                          <span className="w-8 h-[1px] bg-foreground group-hover/link:w-12 transition-all duration-300"></span>
                        </Link>
                        {project.links?.[0] && (
                          <a href={project.links[0].url} target="_blank" rel="noopener noreferrer" className="group/ext flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                            <span>{getLocalizedText(project.links[0].label, locale)}</span>
                            <ExternalLink className="h-3 w-3 -translate-y-0.5" />
                          </a>
                        )}
                      </div>
                    </FadeUp>
                  </div>
                  
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
