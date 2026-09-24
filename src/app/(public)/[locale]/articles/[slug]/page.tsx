import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { articleRepository } from "@/lib/repositories/articles";
import { notFound } from "next/navigation";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function ArticleDetail({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const article = await articleRepository.getPublicArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }

  const formatDate = (date: Date | { _seconds?: number } | string | number | null | undefined) => {
    if (!date) return 'Recently';
    const d = new Date(typeof date === 'object' && '_seconds' in date && date._seconds ? date._seconds * 1000 : (date as string | number | Date));
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(d);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-20">
      
      {/* 1. Article Header */}
      <section className="w-full bg-background pt-12 pb-16 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Link href={`/${locale}/articles`} className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Articles</span>
          </Link>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-mono text-[10px] font-semibold uppercase tracking-wider border border-primary/20">
                {article.category}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase">
                <Clock className="h-3.5 w-3.5" /> {article.readingTime} min read
              </span>
              <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1.5 uppercase">
                <Calendar className="h-3.5 w-3.5" /> 
                {formatDate(article.publishedAt)}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground font-semibold tracking-tight leading-tight">
              {getLocalizedText(article.title, locale)}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {getLocalizedText(article.excerpt, locale)}
            </p>

            <div className="flex items-center justify-between pt-6 mt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-xs font-bold">
                  {article.author.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="flex flex-col font-mono text-[10px]">
                  <span className="text-foreground font-semibold uppercase tracking-wider">{article.author}</span>
                  <span className="text-muted-foreground">Author</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hero Image (Optional) */}
      {article.coverImage?.url && (
        <section className="w-full bg-background border-b border-border py-8">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="rounded-xl overflow-hidden bg-muted aspect-[21/9] border border-border shadow-sm flex items-center justify-center">
              <img src={article.coverImage.url} alt={article.coverImage.alt || getLocalizedText(article.title, locale)} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* 3. Article Content */}
      <section className="w-full bg-background py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <article className="prose prose-invert prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-img:rounded-xl prose-img:border prose-img:border-border">
            {getLocalizedText(article.content, locale).split('\n').map((para: string, i: number) => {
              if (para.startsWith('## ')) {
                return <h2 key={i}>{para.replace('## ', '')}</h2>;
              } else if (para.startsWith('### ')) {
                return <h3 key={i}>{para.replace('### ', '')}</h3>;
              } else if (para.startsWith('- ')) {
                return <li key={i}>{para.replace('- ', '')}</li>;
              } else if (para.trim() === '') {
                return null;
              }
              return <p key={i}>{para}</p>;
            })}
          </article>
          
          {/* Article Footer Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-16 mt-16 border-t border-border">
            <span className="font-mono text-[10px] text-muted-foreground uppercase font-semibold mr-2">Tags:</span>
            {article.tags.map((tag: string) => (
              <span key={tag} className="px-2.5 py-1 rounded bg-muted font-mono text-[10px] text-foreground border border-border/50 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
