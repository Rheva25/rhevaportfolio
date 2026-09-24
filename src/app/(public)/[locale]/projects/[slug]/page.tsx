import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldAlert, ArrowRight, ExternalLink } from "lucide-react";
import { projectRepository } from "@/lib/repositories/projects";
import { notFound } from "next/navigation";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function ProjectDetail({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const project = await projectRepository.getPublicProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-20">
      {/* 1. Case Study Header (Dark/Editorial) */}
      <section className="w-full bg-background pt-12 pb-16 md:pt-16 md:pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Link href={`/${locale}/projects`} className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Portfolio Index</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-muted text-foreground font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 font-medium uppercase tracking-wider border border-green-500/20">
                  <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  {project.status}
                </span>
                <span className="font-mono text-[11px] px-2 py-1 rounded bg-muted text-muted-foreground">
                  {project.year}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight font-semibold mb-6 leading-tight">
                {getLocalizedText(project.title, locale)}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {getLocalizedText(project.shortDescription, locale)}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-card border border-border p-6 rounded-xl space-y-4 shadow-sm">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Core Architecture</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.technologies.map(tech => (
                      <span key={tech} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">{tech}</span>
                    ))}
                  </div>
                </div>
                {project.links && project.links.length > 0 && (
                  <div className="pt-4 border-t border-border flex items-center gap-3">
                    {project.links.map(link => (
                      <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center flex-1 gap-1.5 py-2 rounded-lg bg-foreground text-background font-mono text-sm font-semibold hover:bg-foreground/90 transition-colors">
                        <span>{getLocalizedText(link.label, locale)}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hero Image */}
      {project.heroImage?.url && (
        <section className="w-full bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="py-12 md:py-16">
              <div className="w-full rounded-2xl overflow-hidden border border-border shadow-lg relative bg-muted aspect-video flex items-center justify-center">
                <img src={project.heroImage.url} alt={project.heroImage.alt || getLocalizedText(project.title, locale)} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Overview Context */}
      <section className="w-full py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="border-b border-border pb-4 mb-12">
            <span className="font-mono text-xs text-primary font-semibold uppercase tracking-wider block mb-2">
              01 // ARCHITECTURAL CONTEXT
            </span>
            <h2 className="text-3xl font-semibold text-foreground tracking-tight">
              Project Overview
            </h2>
          </div>
          <div className="prose prose-invert max-w-none text-muted-foreground">
            {getLocalizedText(project.overview, locale).split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Problem Deep Dive */}
      {project.problem && getLocalizedText(project.problem, locale) && (
        <section className="w-full py-20 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-mono text-xs text-red-500 font-semibold uppercase tracking-wider block mb-2">
                    02 // THE PROBLEM
                  </span>
                  <h2 className="text-3xl font-semibold text-foreground tracking-tight leading-snug">
                    Identifying the friction
                  </h2>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="prose prose-invert max-w-none text-muted-foreground">
                  {getLocalizedText(project.problem, locale).split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Solution Deep Dive */}
      {project.solution && getLocalizedText(project.solution, locale) && (
        <section className="w-full py-20 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-mono text-xs text-primary font-semibold uppercase tracking-wider block mb-2">
                    03 // THE SOLUTION
                  </span>
                  <h2 className="text-3xl font-semibold text-foreground tracking-tight leading-snug">
                    Architecting the answer
                  </h2>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="prose prose-invert max-w-none text-muted-foreground">
                  {getLocalizedText(project.solution, locale).split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* 6. Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="w-full py-20 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
            <div className="border-b border-border pb-4">
              <h2 className="text-3xl font-semibold text-foreground tracking-tight">System Gallery</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((img, i) => (
                <div key={i} className="rounded-xl border border-border overflow-hidden bg-muted flex flex-col">
                  <div className="aspect-video relative flex items-center justify-center">
                    {img.url ? (
                      <img src={img.url} alt={img.alt || `Gallery image ${i+1}`} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-muted-foreground font-mono text-sm">NO IMAGE</span>
                    )}
                  </div>
                  {img.caption && (
                    <div className="p-4 bg-background border-t border-border font-mono text-xs text-muted-foreground text-center">
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
