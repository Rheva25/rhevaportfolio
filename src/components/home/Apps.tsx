import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import { productRepository } from "@/lib/repositories/products";
import { getLocalizedText } from "@/lib/utils/localization";
import { Locale } from "@/i18n/config";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export async function Apps({ locale }: { locale: Locale }) {
  const allProducts = await productRepository.getPublicProducts();
  const products = allProducts.slice(0, 3); // Max 3 on homepage

  return (
    <section className="w-full bg-background py-24 md:py-32 border-b border-border/40" id="apps">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Editorial Header */}
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-light text-foreground tracking-tight mb-4">
              Apps & Digital Products
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Self-hosted, production-ready software tools built to solve specific operational bottlenecks.
            </p>
          </div>
          <Link href="/apps" className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity whitespace-nowrap pb-2">
            <span>Visit Software Catalog</span>
            <span className="w-8 h-[1px] bg-foreground group-hover:w-12 transition-all duration-300"></span>
          </Link>
        </FadeUp>

        {/* Minimalist 3-Column Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {products.length === 0 ? (
            <div className="col-span-full py-32 text-center flex flex-col items-center">
              <FolderKanban className="h-8 w-8 text-muted-foreground/30 mb-6" strokeWidth={1} />
              <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">No public products available</p>
            </div>
          ) : (
            products.map((product) => (
              <StaggerItem key={product.id} className="flex flex-col group border-t border-border/40 pt-8">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {product.category || "Software"}
                  </span>
                  {product.status && (
                    <span className={`font-mono text-[10px] uppercase tracking-widest ${
                      product.status === 'Coming Soon' || product.status === 'In Development'
                        ? 'text-muted-foreground' 
                        : 'text-foreground'
                    }`}>
                      [{product.status}]
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-medium text-foreground tracking-tight mb-3">
                  {getLocalizedText(product.name, locale)}
                </h3>
                
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-6">
                  Platform: {product.platform || "Web"}
                </p>
                
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-10 flex-1">
                  {getLocalizedText(product.shortDescription, locale)}
                </p>
                
                <div className="flex flex-col gap-2 mb-10">
                  <div className="flex justify-between items-center border-b border-border/40 pb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Deployment</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground text-right">{getLocalizedText(product.deployment, locale) || "Standard"}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/40 pb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Pricing</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground text-right">{product.pricingModel || "Contact"}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-auto">
                  {product.links?.[0] ? (
                    <a href={product.links[0].url} target="_blank" rel="noopener noreferrer" className="group/ext flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity">
                      <span>{getLocalizedText(product.links[0].label, locale)}</span>
                      <span className="w-6 h-[1px] bg-foreground group-hover/ext:w-10 transition-all duration-300"></span>
                    </a>
                  ) : (
                    <Link href="/contact" className="group/ext flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity">
                      <span>Request Access</span>
                      <span className="w-6 h-[1px] bg-foreground group-hover/ext:w-10 transition-all duration-300"></span>
                    </Link>
                  )}
                  <Link href={`/apps/${product.slug}`} className="group/link flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                    <span>Details</span>
                    <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-300" />
                  </Link>
                </div>
              </StaggerItem>
            ))
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
