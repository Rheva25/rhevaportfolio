import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { articleRepository } from "@/lib/repositories/articles";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { FadeUp, StaggerContainer, StaggerItem, ScaleImageReveal } from "@/components/ui/motion";

export async function Articles({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const allArticles = await articleRepository.getPublicArticles();
  const articles = allArticles.slice(0, 3); // Max 3 on homepage

  return (
    <section className="w-full bg-card py-24 border-t border-border" id="articles">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-2">
              {dict.home.articles.tag}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-foreground tracking-tight">
              {dict.home.articles.title}
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mt-4">
              {dict.home.articles.subtitle}
            </p>
          </div>
          <Link href="/articles" className="group flex items-center gap-4 font-mono text-sm uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity">
            <span>{dict.home.articles.viewAll} ({allArticles.length})</span>
            <span className="w-12 h-[1px] bg-foreground group-hover:w-16 transition-all duration-300"></span>
          </Link>
        </FadeUp>

        {/* Dynamic Articles List */}
        <div className="space-y-4">
          {articles.length === 0 ? (
            <FadeUp delay={0.2} className="py-16 text-center bg-muted/30 border border-border border-dashed rounded-xl flex flex-col items-center">
              <BookOpen className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-muted-foreground font-mono text-sm">{dict.home.articles.empty}</p>
            </FadeUp>
          ) : (
            <StaggerContainer delay={0.2} className="space-y-4">
              {articles.map((article) => {
                const publishDate = article.publishedAt ? new Date(article.publishedAt as string | number | Date) : new Date();
                const dateStr = publishDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
                return (
                  <StaggerItem key={article.id}>
                    <Link 
                      href={`/articles/${article.slug}`} 
                      className="block group"
                    >
                      <article className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm group-hover:border-foreground/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 duration-300 relative overflow-hidden">
                        <div className="flex-1 relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="font-mono text-[10px] px-2.5 py-1 rounded-sm bg-muted text-foreground font-medium uppercase tracking-wider">
                              {article.category || "Engineering"}
                            </span>
                            <span className="font-mono text-[11px] text-muted-foreground flex items-center gap-1.5">
                              <Clock className="h-3 w-3" />
                              {article.readingTime || 5} Min Read
                            </span>
                            <span className="font-mono text-[11px] text-muted-foreground hidden sm:inline-block">
                              • {dateStr}
                            </span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-serif italic text-foreground tracking-tight mb-3">
                            {getLocalizedText(article.title, locale)}
                          </h3>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl line-clamp-2 font-light">
                            {getLocalizedText(article.excerpt, locale)}
                          </p>
                        </div>
                        
                        <div className="shrink-0 flex items-center text-primary font-mono text-sm font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out relative z-10">
                          <span>{dict.home.articles.readNote}</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                        
                        {/* Decorative background hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-muted/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </article>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </div>
    </section>
  );
}
