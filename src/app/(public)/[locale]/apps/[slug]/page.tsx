import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldAlert, ArrowRight, ExternalLink, Terminal, Server, MapPin } from "lucide-react";
import { productRepository } from "@/lib/repositories/products";
import { notFound } from "next/navigation";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function ProductDetail({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const product = await productRepository.getPublicProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-20">
      {/* 1. Product Header */}
      <section className="w-full bg-background pt-12 pb-16 md:pt-16 md:pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Link href={`/${locale}/apps`} className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Software Catalog</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-muted text-foreground font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded font-medium uppercase tracking-wider border ${
                  product.status === 'Available' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' :
                  product.status === 'Coming Soon' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' :
                  'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    product.status === 'Available' ? 'bg-green-500' :
                    product.status === 'Coming Soon' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}></span>
                  {product.status}
                </span>
                <span className="font-mono text-[11px] px-2 py-1 rounded bg-muted text-muted-foreground">
                  {product.pricingModel}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight font-semibold mb-6 leading-tight">
                {getLocalizedText(product.name, locale)}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {getLocalizedText(product.shortDescription, locale)}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-card border border-border p-6 rounded-xl space-y-4 shadow-sm">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Deployment Context</span>
                  <span className="font-mono text-sm text-foreground font-medium">{getLocalizedText(product.deployment, locale)}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Platform Base</span>
                  <span className="font-mono text-sm text-foreground font-medium">{product.platform}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Technologies</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {product.technologies.map(tech => (
                      <span key={tech} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">{tech}</span>
                    ))}
                  </div>
                </div>
                {product.links && product.links.length > 0 && (
                  <div className="pt-4 border-t border-border flex items-center gap-3">
                    {product.links.map(link => (
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

      {/* 2. Mock Interface Preview (Technical UI) */}
      {product.heroImage?.url && (
        <section className="w-full py-16 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="bg-background rounded-2xl border border-border shadow-md overflow-hidden max-w-5xl mx-auto aspect-video">
              <img src={product.heroImage.url} alt={product.heroImage.alt || getLocalizedText(product.name, locale)} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* 3. Overview Context */}
      <section className="w-full py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="border-b border-border pb-4 mb-12">
            <span className="font-mono text-xs text-primary font-semibold uppercase tracking-wider block mb-2">
              01 // PRODUCT OVERVIEW
            </span>
            <h2 className="text-3xl font-semibold text-foreground tracking-tight">
              System Architecture
            </h2>
          </div>
          <div className="prose prose-invert max-w-none text-muted-foreground">
            {getLocalizedText(product.description, locale).split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Features list */}
      {product.features && product.features.length > 0 && (
        <section className="w-full py-20 bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <span className="font-mono text-xs text-green-500 font-semibold uppercase tracking-wider block mb-2">
                    02 // CAPABILITIES
                  </span>
                  <h2 className="text-3xl font-semibold text-foreground tracking-tight leading-snug">
                    Core Capabilities
                  </h2>
                </div>
              </div>
              <div className="lg:col-span-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, i) => (
                    <div key={i} className="p-4 bg-muted/50 rounded-lg border border-border/50 space-y-2 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm font-medium">{getLocalizedText(feature, locale)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Gallery */}
      {product.gallery && product.gallery.length > 0 && (
        <section className="w-full py-20 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
            <div className="border-b border-border pb-4">
              <span className="font-mono text-xs text-primary font-semibold uppercase tracking-wider block mb-2">
                03 // VISUALS
              </span>
              <h2 className="text-3xl font-semibold text-foreground tracking-tight">System Gallery</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.gallery.map((img, i) => (
                <div key={i} className="rounded-xl border border-border overflow-hidden bg-card flex flex-col shadow-sm">
                  <div className="aspect-video relative flex items-center justify-center bg-muted">
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
