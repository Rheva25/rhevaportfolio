import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { devlogsPublicRepository } from "@/lib/repositories/devlogsPublic";
import { notFound } from "next/navigation";
import { Locale } from "@/i18n/config";
import ReactMarkdown from 'react-markdown';
import { Metadata } from "next";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const devlog = await devlogsPublicRepository.getPublishedDevlogBySlug(slug);
  
  if (!devlog) {
    return {
      title: "Devlog Not Found | Rheva"
    };
  }

  const title = `${devlog.title} - Devlog: Unspoken | Rheva`;
  const description = devlog.excerpt || devlog.featuredQuote;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(devlog.thumbnailUrl && { images: [{ url: devlog.thumbnailUrl }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(devlog.thumbnailUrl && { images: [devlog.thumbnailUrl] }),
    }
  };
}

export default async function DevlogDetail({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const devlog = await devlogsPublicRepository.getPublishedDevlogBySlug(slug);
  
  if (!devlog) {
    notFound();
  }

  const publishedDate = devlog.publishedAt?.seconds 
    ? format(new Date(devlog.publishedAt.seconds * 1000), "MMMM d, yyyy")
    : format(new Date(devlog.createdAt.seconds * 1000), "MMMM d, yyyy");

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F5F1E8] pb-24">
      
      {/* 1. Header Navigation */}
      <section className="w-full pt-12 pb-6">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link href={`/${locale}/devlog-unspoken`} className="inline-flex items-center gap-1.5 font-sans text-sm text-[#918779] hover:text-[#24221F] transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Devlog</span>
          </Link>
          
          <div className="flex items-center gap-4 text-xs font-mono text-[#918779] uppercase tracking-wider mb-6">
            <time dateTime={publishedDate}>{publishedDate}</time>
            <span className="w-1 h-1 rounded-full bg-[#DCD5C9]"></span>
            <span>{devlog.category}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#24221F] font-serif tracking-tight leading-tight mb-8">
            {devlog.title}
          </h1>
        </div>
      </section>

      {/* 2. Featured Quote & Thumbnail */}
      <section className="w-full py-8 mb-8 border-y border-[#DCD5C9] bg-[#EBE5DA]/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          
          {devlog.thumbnailUrl && (
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="shadow-xl rounded-sm overflow-hidden border border-[#DCD5C9] bg-white">
                <img src={devlog.thumbnailUrl} alt={`Quote from ${devlog.title}`} className="w-full h-auto max-w-[360px] object-cover" />
              </div>
            </div>
          )}

          <div className={`w-full ${devlog.thumbnailUrl ? 'md:w-1/2' : 'max-w-3xl mx-auto text-center'}`}>
            <blockquote className="text-3xl md:text-4xl font-serif text-[#24221F] leading-[1.3] tracking-tight">
              "{devlog.featuredQuote}"
            </blockquote>
            {devlog.quoteAttribution && (
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[#918779]"></div>
                <cite className="text-[#918779] font-sans italic not-italic">
                  {devlog.quoteAttribution}
                </cite>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Article Content */}
      <section className="w-full py-8">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-[#24221F] prose-p:text-[#24221F]/90 prose-p:leading-relaxed prose-a:text-[#24221F] prose-a:underline hover:prose-a:no-underline prose-strong:text-[#24221F] prose-blockquote:border-l-[#DCD5C9] prose-blockquote:text-[#918779] prose-blockquote:font-serif prose-blockquote:italic">
            <ReactMarkdown>
              {devlog.contentMarkdown}
            </ReactMarkdown>
          </article>
          
          {/* Article Footer Tags */}
          {devlog.tags && devlog.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-16 mt-16 border-t border-[#DCD5C9]">
              <span className="font-mono text-xs text-[#918779] uppercase mr-2">Tags:</span>
              {devlog.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded bg-[#EBE5DA] font-mono text-[10px] text-[#24221F] uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
