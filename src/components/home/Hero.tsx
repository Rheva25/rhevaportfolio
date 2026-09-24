import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";

export async function Hero({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  return (
    <section className="w-full bg-background pt-12 pb-24 md:pt-16 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="font-mono text-xs text-foreground font-medium">
                {dict.home.hero.availability}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl text-foreground tracking-tight font-semibold mb-6 max-w-2xl leading-[1.08]">
              {dict.home.hero.title}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
              {dict.home.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <Link href="#projects" className="inline-flex items-center justify-center gap-2 px-6 h-11 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-colors shadow-sm hover:bg-primary/90">
                <span>{dict.home.hero.viewWork}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/apps" className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-lg bg-card border border-border text-foreground text-sm font-medium transition-colors shadow-sm hover:bg-accent hover:text-accent-foreground">
                <span>{dict.home.hero.exploreApps}</span>
              </Link>
              <Link href="#specs" className="inline-flex items-center gap-1.5 px-3 h-11 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span>architecture.spec</span>
                <Terminal className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="pt-6 w-full flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"></span>
                <span>Next.js 14 App Router</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"></span>
                <span>TypeScript Strict Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"></span>
                <span>Firebase Cloud Firestore</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>100% Type Safe End-to-End</span>
              </div>
            </div>
          </div>
          
          {/* Right Column: Diagram */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-muted"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-muted"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-muted"></span>
                  <span className="font-mono text-xs text-muted-foreground ml-2">SPEC_TOPOLOGY_01</span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-muted text-primary font-medium">PIPELINE</span>
              </div>
              
              <div className="space-y-3.5 relative">
                <div className="p-4 rounded-lg bg-muted/50 border border-transparent hover:border-border transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-sm font-semibold text-foreground flex items-center gap-2">
                      Client Browser
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">Client Components (React 18)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Zustand optimistic store, shadcn/ui components, responsive viewport adapters</p>
                </div>
                
                <div className="flex items-center justify-center py-0.5 text-muted-foreground">
                  <div className="flex items-center gap-2 px-3 py-1 rounded bg-muted font-mono text-[11px]">
                    <span>Server Actions / Fetch API (HTTP/2)</span>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50 border border-transparent hover:border-border transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-sm font-semibold text-foreground flex items-center gap-2">
                      Next.js App Router (Edge Runtime)
                    </span>
                    <span className="font-mono text-[11px] text-green-500 font-medium">ISR + Edge Caching</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Zod schema payload validation, session decryption, and tenant routing</p>
                </div>
                
                <div className="flex items-center justify-center py-0.5 text-muted-foreground">
                  <div className="flex items-center gap-2 px-3 py-1 rounded bg-muted font-mono text-[11px]">
                    <span>Signed Admin SDK Protocol</span>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50 border border-transparent hover:border-border transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-sm font-semibold text-foreground flex items-center gap-2">
                      Firebase Cloud Firestore & Auth
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">ACID Transactions</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Granular Security Rules, multi-region snapshots, and real-time subscription sync</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
