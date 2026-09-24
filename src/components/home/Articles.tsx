import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { articleRepository } from "@/lib/repositories/articles";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export async function Articles({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const allArticles = await articleRepository.getPublicArticles();
  const articles = allArticles.slice(0, 3); // Max 3 on homepage

  return (
    <section className="w-full bg-card py-24 border-t border-border" id="articles">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-2">
              {dict.home.articles.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              {dict.home.articles.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
              {dict.home.articles.subtitle}
            </p>
          </div>
          <Link href="/articles" className="inline-flex items-center gap-2 font-mono text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            <span>{dict.home.articles.viewAll} ({allArticles.length})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Dynamic Articles List */}
        <div className="space-y-4">
          {articles.length === 0 ? (
            <div className="py-16 text-center bg-muted/30 border border-border border-dashed rounded-xl flex flex-col items-center">
              <BookOpen className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-muted-foreground font-mono text-sm">{dict.home.articles.empty}</p>
            </div>
          ) : (
            articles.map((article) => {
              const publishDate = article.publishedAt ? new Date(article.publishedAt as string | number | Date) : new Date();
              const dateStr = publishDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
              return (
                <Link 
                  key={article.id} 
                  href={`/articles/${article.slug}`} 
                  className="block group"
                >
                  <article className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm group-hover:shadow-md group-hover:border-primary/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-muted text-foreground font-medium uppercase tracking-wider">
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
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors mb-2">
                        {getLocalizedText(article.title, locale)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl line-clamp-2">
                        {getLocalizedText(article.excerpt, locale)}
                      </p>
                    </div>
                    
                    <div className="shrink-0 flex items-center text-primary font-mono text-sm font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <span>{dict.home.articles.readNote}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </article>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
