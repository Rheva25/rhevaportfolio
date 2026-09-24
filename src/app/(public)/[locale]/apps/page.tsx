import Link from "next/link";
import { ArrowRight, Terminal, Calendar, MapPin, Bell, Key, Server, Package } from "lucide-react";
import { productRepository } from "@/lib/repositories/products";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function AppsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const allProducts = await productRepository.getPublicProducts();
  const featuredProducts = allProducts.filter(p => p.featured);
  const regularProducts = allProducts.filter(p => !p.featured);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. Header */}
      <section className="w-full bg-background pt-12 pb-16 md:pt-16 md:pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-start max-w-3xl">
            <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-4">
              01 // DIGITAL PRODUCTS
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight font-semibold mb-6">
              Software Catalog
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Packaged, deployable software products available for commercial deployment, single-tenant hosting, and institutional integration.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="w-full bg-card py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-background border border-border rounded-xl shadow-sm overflow-hidden flex flex-col lg:flex-row group hover:shadow-md transition-all">
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0 border border-border/50 overflow-hidden">
                        {product.logo?.url ? (
                          <img src={product.logo.url} alt={product.logo.alt || getLocalizedText(product.name, locale)} className="w-full h-full object-cover" />
                        ) : (
                          <Server className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground tracking-tight">{getLocalizedText(product.name, locale)}</h2>
                        <span className="font-mono text-xs text-muted-foreground uppercase">{product.category}</span>
                      </div>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed mb-6">
                      {getLocalizedText(product.shortDescription, locale)}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase">Deployment</span>
                        <span className="font-mono text-xs font-semibold text-foreground">{getLocalizedText(product.deployment, locale)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase">Platform</span>
                        <span className="font-mono text-xs font-semibold text-foreground">{product.platform}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-border flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Access Model</span>
                      <span className="text-xl font-bold text-foreground">{product.pricingModel}</span>
                    </div>
                    <Link href={`/${locale}/apps/${product.slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-foreground text-background font-mono text-sm font-semibold hover:bg-foreground/90 transition-colors">
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                
                {/* Image / Hero preview */}
                <div className="lg:w-1/2 bg-muted/30 p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-border flex flex-col justify-center relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-4 font-mono text-[11px] text-muted-foreground relative z-10">
                    <span className="text-foreground">{product.slug}_dist.tar.gz</span>
                    <span>// INSTANCE READY</span>
                    <span className="w-2 h-2 rounded-full bg-green-500 ml-auto"></span>
                  </div>
                  <div className="relative z-10 w-full h-full min-h-[250px] bg-background border border-border shadow-inner rounded-xl overflow-hidden flex items-center justify-center">
                    {product.heroImage?.url ? (
                      <img src={product.heroImage.url} alt={product.heroImage.alt || getLocalizedText(product.name, locale)} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-mono text-xs text-muted-foreground">PREVIEW_UNAVAILABLE</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Catalog Grid */}
      <section className="w-full bg-background py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-2">
                02 // COMMERCIAL SOFTWARE LIBRARY
              </span>
              <h2 className="text-3xl font-semibold text-foreground tracking-tight">
                Standard Packaged Software
              </h2>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground px-3 py-1.5 rounded-full border border-border">
              {allProducts.length} PRODUCTS FOUND
            </div>
          </div>

          {regularProducts.length === 0 && featuredProducts.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center border border-dashed border-border rounded-xl">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground">No products available.</p>
              <p className="text-sm text-muted-foreground max-w-md mt-2">Check back soon for new software releases.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProducts.map((product) => (
                <article key={product.id} className="flex flex-col justify-between bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0 border border-border/50 overflow-hidden">
                        {product.logo?.url ? (
                          <img src={product.logo.url} alt={product.logo.alt || getLocalizedText(product.name, locale)} className="w-full h-full object-cover" />
                        ) : (
                          <Terminal className="h-5 w-5" />
                        )}
                      </div>
                      <div className={`flex items-center gap-1.5 font-medium uppercase tracking-wider font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                        product.status === 'Available' ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' :
                        product.status === 'Coming Soon' ? 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400' :
                        'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          product.status === 'Available' ? 'bg-green-500' :
                          product.status === 'Coming Soon' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}></span> {product.status}
                      </div>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{product.category}</span>
                      <h3 className="text-xl font-semibold text-foreground tracking-tight mt-1 group-hover:text-primary transition-colors">
                        <Link href={`/${locale}/apps/${product.slug}`}>{getLocalizedText(product.name, locale)}</Link>
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {getLocalizedText(product.shortDescription, locale)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {product.technologies.slice(0, 4).map(t => (
                        <span key={t} className="font-mono text-[10px] bg-muted px-2 py-0.5 rounded text-foreground border border-border/50">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[10px] text-muted-foreground">Access Model</div>
                      <span className="font-semibold text-foreground text-sm">{product.pricingModel}</span>
                    </div>
                    <Link href={`/${locale}/apps/${product.slug}`} className="px-3 py-2 rounded bg-foreground text-background font-mono text-xs font-semibold hover:bg-foreground/90 transition-colors">
                      Details
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
