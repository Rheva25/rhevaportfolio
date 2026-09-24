import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import { productRepository } from "@/lib/repositories/products";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";

export async function Apps({ locale }: { locale: Locale }) {
  const allProducts = await productRepository.getPublicProducts();
  const products = allProducts.slice(0, 3); // Max 3 on homepage

  return (
    <section className="w-full bg-card py-24 border-t border-border" id="apps">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-2">
              02 // PRODUCT CATALOG
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Apps & Digital Products
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Self-hosted, production-ready software tools built to solve specific operational bottlenecks.
            </p>
          </div>
          <Link href="/apps" className="inline-flex items-center gap-2 font-mono text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            <span>Visit Software Catalog ({allProducts.length})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Dynamic Products Grid */}
        <div className="space-y-8">
          {products.length === 0 ? (
            <div className="py-20 text-center bg-muted/30 border border-border border-dashed rounded-xl flex flex-col items-center">
              <FolderKanban className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-mono text-sm">No public products available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-muted text-foreground font-medium uppercase tracking-wider">
                        {product.category || "Software"}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${
                        product.status === 'Coming Soon' || product.status === 'In Development'
                          ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' 
                          : 'bg-green-500/10 text-green-600 dark:text-green-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          product.status === 'Coming Soon' || product.status === 'In Development' 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                        }`}></span>
                        {product.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-1">{getLocalizedText(product.name, locale)}</h3>
                    <p className="font-mono text-[11px] text-primary font-semibold mb-4 tracking-wide uppercase">
                      {product.platform || "Platform"}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {getLocalizedText(product.shortDescription, locale)}
                    </p>
                    
                    <div className="p-4 rounded-lg bg-muted/50 mb-8 space-y-2 border border-border/50">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Access / Deployment Model</div>
                      <div className="font-mono text-xs font-semibold text-foreground">{getLocalizedText(product.deployment, locale) || "Standard Deployment"}</div>
                      <div className="font-mono text-xs text-primary font-bold pt-1">
                        {product.pricingModel || "Contact for pricing"}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    {product.links?.[0] ? (
                      <Link href={product.links[0].url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex-1 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-semibold text-center transition-colors hover:bg-primary/90">
                        {getLocalizedText(product.links[0].label, locale)}
                      </Link>
                    ) : (
                       <Link href="/contact" className="w-full sm:w-auto flex-1 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-semibold text-center transition-colors hover:bg-primary/90">
                        Request Access
                      </Link>
                    )}
                    <Link href={`/apps/${product.slug}`} className="w-full sm:w-auto py-2.5 px-4 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-mono text-sm font-medium text-center transition-colors border border-border">
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
