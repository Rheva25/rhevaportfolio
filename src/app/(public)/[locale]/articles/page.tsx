import Link from "next/link";
import { ArrowRight, Clock, Calendar, Terminal, FileText } from "lucide-react";
import { articleRepository } from "@/lib/repositories/articles";
import { Article } from "@/lib/models";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const allArticles = await articleRepository.getPublicArticles();
  const featuredArticle = allArticles.find((a: Article) => a.featured);
  const regularArticles = allArticles.filter((a: Article) => a.id !== featuredArticle?.id);

  const formatDate = (date: Date | { _seconds?: number } | string | number | null | undefined) => {
    if (!date) return 'Recently';
    const d = new Date(typeof date === 'object' && '_seconds' in date && date._seconds ? date._seconds * 1000 : (date as string | number | Date));
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(d);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. Header */}
      <section className="w-full bg-background pt-12 pb-16 md:pt-16 md:pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-3 max-w-4xl">
            <span className="font-mono text-xs text-primary uppercase tracking-wider block font-semibold mb-2">
              01 // Engineering Notes &amp; Architecture Essays
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight font-semibold leading-tight mb-4">
              Technical Writing &amp; Operational Lessons.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Essays, architectural breakdowns, and concrete lessons from engineering digital products, institutional personnel platforms, and resilient administrative workflows.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Featured Technical Essay */}
      {featuredArticle && (
        <section className="w-full bg-card py-16 md:py-20 border-b border-border relative overflow-hidden">
          {/* Accent Glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="bg-background rounded-2xl shadow-sm border border-border p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
              
              <div className="flex-1 flex flex-col justify-between gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-mono text-[10px] font-semibold uppercase tracking-wider border border-primary/20">
                      FEATURED ESSAY // ARCHITECTURE DEEP DIVE
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase">
                      <Clock className="h-3.5 w-3.5" /> {featuredArticle.readingTime} min read
                    </span>
                    <span className="font-mono text-[10px] text-green-600 dark:text-green-400 font-medium flex items-center gap-1.5 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {featuredArticle.category}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl text-foreground font-semibold tracking-tight leading-snug">
                    <Link href={`/${locale}/articles/${featuredArticle.slug}`} className="hover:text-primary transition-colors">
                      {getLocalizedText(featuredArticle.title, locale)}
                    </Link>
                  </h2>
                  
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {getLocalizedText(featuredArticle.excerpt, locale)}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {featuredArticle.tags.map((tag: string) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full bg-muted font-mono text-[10px] text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-xs font-bold">
                      {featuredArticle.author.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div className="flex flex-col font-mono text-[10px]">
                      <span className="text-foreground font-semibold uppercase tracking-wider">{featuredArticle.author}</span>
                      <span className="text-muted-foreground">
                        Lead Systems Architect &bull; {formatDate(featuredArticle.publishedAt)}
                      </span>
                    </div>
                  </div>
                  <Link href={`/${locale}/articles/${featuredArticle.slug}`} className="h-10 px-5 rounded-lg bg-foreground text-background font-mono text-xs font-semibold flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors w-full sm:w-auto">
                    <span>Read Essay</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Right Hero Image */}
              <div className="lg:w-5/12 flex flex-col justify-between rounded-xl overflow-hidden shadow-inner border border-border bg-muted">
                {featuredArticle.coverImage?.url ? (
                  <img src={featuredArticle.coverImage.url} alt={featuredArticle.coverImage.alt || getLocalizedText(featuredArticle.title, locale)} className="w-full h-full object-cover min-h-[300px]" />
                ) : (
                  <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-zinc-950 text-zinc-500 font-mono text-xs">
                    [ NO PREVIEW AVAILABLE ]
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Article Grid */}
      <section className="w-full bg-background py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between pb-8 border-b border-border mb-8">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
                ARCHIVAL CATALOGUE
              </span>
              <h3 className="text-2xl font-semibold text-foreground tracking-tight">Curated Technical Publications</h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>{allArticles.length} RECORDS FOUND</span>
            </div>
          </div>

          {regularArticles.length === 0 && !featuredArticle ? (
            <div className="py-20 text-center flex flex-col items-center border border-dashed border-border rounded-xl">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground">No articles published yet.</p>
              <p className="text-sm text-muted-foreground max-w-md mt-2">Check back later for technical essays and architectural notes.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularArticles.map((article: Article) => (
                <article key={article.id} className="group bg-card rounded-xl p-6 border border-border hover:shadow-md transition-all flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded bg-muted font-mono text-[10px] text-foreground font-semibold uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="font-mono text-[10px] uppercase text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> 
                        {formatDate(article.publishedAt)} &bull; {article.readingTime} min read
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                      <Link href={`/${locale}/articles/${article.slug}`}>{getLocalizedText(article.title, locale)}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {getLocalizedText(article.excerpt, locale)}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="font-mono text-[9px] uppercase text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/${locale}/articles/${article.slug}`} className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-mono text-xs font-semibold uppercase tracking-wider transition-colors">
                      Read Article <ArrowRight className="h-3 w-3" />
                    </Link>
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
