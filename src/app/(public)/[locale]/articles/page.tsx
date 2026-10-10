import Link from "next/link";
import { ArrowRight, Clock, Calendar, Terminal, FileText } from "lucide-react";
import { articleRepository } from "@/lib/repositories/articles";
import { Article } from "@/lib/models";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";
import { ShareButton } from "@/components/ui/share-button";
import { FadeUp, MaskReveal, ScaleImageReveal, StaggerContainer, StaggerItem } from "@/components/ui/motion";

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
      <section className="w-full bg-background pt-32 pb-16 md:pt-48 md:pb-24 border-b border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col gap-3 max-w-4xl">
            <FadeUp delay={0.1}>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block font-semibold mb-4">
                01 // Engineering Notes &amp; Architecture Essays
              </span>
            </FadeUp>
            <MaskReveal delay={0.2}>
              <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] text-foreground tracking-tighter font-medium leading-[1.05] mb-8 text-balance">
                <span className="font-serif italic font-light pr-4">Technical Writing</span> <br className="hidden md:block"/>
                &amp; Operational Lessons.
              </h1>
            </MaskReveal>
            <FadeUp delay={0.3}>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-snug max-w-3xl text-balance">
                Essays, architectural breakdowns, and concrete lessons from engineering digital products, institutional personnel platforms, and resilient administrative workflows.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. Featured Technical Essay */}
      {featuredArticle && (
        <FadeUp delay={0.4} className="w-full bg-card py-24 border-b border-border relative overflow-hidden">
          {/* Accent Glow */}
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="bg-background rounded-2xl shadow-sm border border-border p-8 lg:p-12 flex flex-col lg:flex-row gap-10 lg:gap-16 hover:border-foreground/20 transition-all duration-500 group">
              
              <div className="flex-1 flex flex-col justify-between gap-10">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="px-3 py-1.5 rounded-sm bg-muted text-foreground font-mono text-[10px] font-semibold uppercase tracking-widest border border-border/50">
                      FEATURED ESSAY // ARCHITECTURE DEEP DIVE
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase tracking-widest">
                      <Clock className="h-3.5 w-3.5" /> {featuredArticle.readingTime} min read
                    </span>
                    <span className="font-mono text-[10px] text-green-600 dark:text-green-400 font-medium flex items-center gap-1.5 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {featuredArticle.category}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground font-serif italic tracking-tight leading-snug group-hover:text-primary transition-colors">
                    <Link href={`/${locale}/articles/${featuredArticle.slug}`}>
                      {getLocalizedText(featuredArticle.title, locale)}
                    </Link>
                  </h2>
                  
                  <p className="text-lg text-muted-foreground font-light leading-relaxed">
                    {getLocalizedText(featuredArticle.excerpt, locale)}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {featuredArticle.tags.map((tag: string) => (
                      <span key={tag} className="px-2.5 py-1 rounded-sm bg-muted/50 font-mono text-[10px] text-muted-foreground uppercase tracking-widest border border-border/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-8 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-sm font-bold shadow-sm">
                      {featuredArticle.author.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div className="flex flex-col font-mono text-[10px] uppercase tracking-widest">
                      <span className="text-foreground font-semibold mb-1">{featuredArticle.author}</span>
                      <span className="text-muted-foreground">
                        Lead Systems Architect &bull; {formatDate(featuredArticle.publishedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <ShareButton 
                      title={getLocalizedText(featuredArticle.title, locale)} 
                      text={getLocalizedText(featuredArticle.excerpt, locale)}
                      url={`/${locale}/articles/${featuredArticle.slug}`}
                      iconOnly 
                      variant="outline"
                      className="h-12 px-4 rounded-lg border-foreground/20"
                    />
                    <Link href={`/${locale}/articles/${featuredArticle.slug}`} className="h-12 px-8 rounded-lg bg-foreground text-background font-mono text-[10px] uppercase tracking-widest font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition-opacity flex-1 sm:flex-none">
                      <span>Read Essay</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Hero Image */}
              <div className="lg:w-5/12 flex flex-col justify-between rounded-xl overflow-hidden shadow-sm border border-border bg-muted/30 relative">
                {featuredArticle.coverImage?.url ? (
                  <ScaleImageReveal className="w-full h-full min-h-[350px]">
                    <img src={featuredArticle.coverImage.url} alt={featuredArticle.coverImage.alt || getLocalizedText(featuredArticle.title, locale)} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" />
                  </ScaleImageReveal>
                ) : (
                  <div className="w-full h-full min-h-[350px] flex items-center justify-center bg-background text-muted-foreground font-mono text-[10px] uppercase tracking-widest border border-dashed border-border/50 m-4 rounded-lg">
                    [ NO PREVIEW AVAILABLE ]
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeUp>
      )}

      {/* 3. Article Grid */}
      <section className="w-full bg-background py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-border/40 mb-12">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block mb-2">
                ARCHIVAL CATALOGUE
              </span>
              <h3 className="text-4xl md:text-5xl font-serif italic text-foreground tracking-tight">Curated Publications</h3>
            </div>
            <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground tracking-widest px-4 py-2 border border-border/60 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/30"></span>
              <span>{allArticles.length} RECORDS FOUND</span>
            </div>
          </FadeUp>

          {regularArticles.length === 0 && !featuredArticle ? (
            <FadeUp delay={0.2} className="py-24 text-center flex flex-col items-center border border-dashed border-border rounded-xl bg-muted/10">
              <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-6 shadow-sm">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-xl font-serif italic text-foreground mb-2">No articles published yet.</p>
              <p className="text-sm font-light text-muted-foreground max-w-md">Check back later for technical essays and architectural notes.</p>
            </FadeUp>
          ) : (
            <StaggerContainer delay={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article: Article) => (
                <StaggerItem key={article.id} className="group bg-card rounded-xl p-8 border border-border hover:border-foreground/20 shadow-sm transition-all flex flex-col justify-between gap-8 h-full">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                      <span className="px-2.5 py-1 rounded-sm bg-muted font-mono text-[9px] text-foreground font-semibold uppercase tracking-widest border border-border/50">
                        {article.category}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" /> 
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif italic text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/${locale}/articles/${article.slug}`}>{getLocalizedText(article.title, locale)}</Link>
                    </h3>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed line-clamp-3">
                      {getLocalizedText(article.excerpt, locale)}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-border/50 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                       {article.readingTime} min read
                    </div>
                    <div className="flex items-center gap-4">
                      <ShareButton 
                        title={getLocalizedText(article.title, locale)} 
                        text={getLocalizedText(article.excerpt, locale)}
                        url={`/${locale}/articles/${article.slug}`}
                        iconOnly 
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      />
                      <Link href={`/${locale}/articles/${article.slug}`} className="inline-flex items-center gap-2 text-foreground hover:text-primary font-mono text-[10px] font-semibold uppercase tracking-widest transition-colors">
                        Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
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
