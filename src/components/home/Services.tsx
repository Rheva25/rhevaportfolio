import Link from "next/link";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export async function Services({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  return (
    <section className="w-full bg-background py-24 md:py-32 border-b border-border/40" id="services">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Editorial Header */}
        <FadeUp className="mb-20 md:mb-32 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-light text-foreground tracking-tight mb-6">
            Capabilities & Services
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            Specialized technical consulting and end-to-end development services for organizations that demand precision and scalability.
          </p>
        </FadeUp>

        {/* Minimalist Service List */}
        <StaggerContainer className="flex flex-col">
          {/* Service 1 */}
          <StaggerItem className="group flex flex-col md:flex-row gap-6 md:gap-12 py-10 md:py-16 border-t border-border/40">
            <div className="w-full md:w-1/3 flex items-start justify-between">
              <h3 className="text-xl md:text-2xl font-medium text-foreground tracking-tight group-hover:text-muted-foreground transition-colors">
                Modern Web Applications
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground mt-2 hidden md:block">01</span>
            </div>
            <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-8 md:gap-12">
              <p className="text-base text-muted-foreground font-light leading-relaxed md:w-3/5">
                Production-ready web systems built with Next.js App Router, React, and TypeScript. Optimized for Lighthouse 100 performance, responsive UX, and accessible interfaces.
              </p>
              <div className="md:w-2/5 flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground pb-2 border-b border-border/40 mb-2">Deliverables</span>
                <span className="font-mono text-xs text-muted-foreground">&mdash; SSR / SSG / ISR Architecture</span>
                <span className="font-mono text-xs text-muted-foreground">&mdash; Zero Runtime CSS</span>
                <span className="font-mono text-xs text-muted-foreground">&mdash; Strict Type Safety</span>
              </div>
            </div>
          </StaggerItem>

          {/* Service 2 */}
          <StaggerItem className="group flex flex-col md:flex-row gap-6 md:gap-12 py-10 md:py-16 border-t border-border/40">
            <div className="w-full md:w-1/3 flex items-start justify-between">
              <h3 className="text-xl md:text-2xl font-medium text-foreground tracking-tight group-hover:text-muted-foreground transition-colors">
                Internal Management Systems
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground mt-2 hidden md:block">02</span>
            </div>
            <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-8 md:gap-12">
              <p className="text-base text-muted-foreground font-light leading-relaxed md:w-3/5">
                Bespoke administrative portals, ERP modules, employee records, and operational tooling tailored to organizational compliance, data privacy, and security protocols.
              </p>
              <div className="md:w-2/5 flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground pb-2 border-b border-border/40 mb-2">Deliverables</span>
                <span className="font-mono text-xs text-muted-foreground">&mdash; Multi-tenant ACL</span>
                <span className="font-mono text-xs text-muted-foreground">&mdash; Audit Telemetry</span>
                <span className="font-mono text-xs text-muted-foreground">&mdash; High Data Density UI</span>
              </div>
            </div>
          </StaggerItem>

          {/* Service 3 */}
          <StaggerItem className="group flex flex-col md:flex-row gap-6 md:gap-12 py-10 md:py-16 border-t border-border/40">
            <div className="w-full md:w-1/3 flex items-start justify-between">
              <h3 className="text-xl md:text-2xl font-medium text-foreground tracking-tight group-hover:text-muted-foreground transition-colors">
                UI/UX Interface Design
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground mt-2 hidden md:block">03</span>
            </div>
            <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-8 md:gap-12">
              <p className="text-base text-muted-foreground font-light leading-relaxed md:w-3/5">
                Design systems, interactive prototypes, and production design in Figma engineered directly for component-based implementation without visual drift or code bloat.
              </p>
              <div className="md:w-2/5 flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground pb-2 border-b border-border/40 mb-2">Deliverables</span>
                <span className="font-mono text-xs text-muted-foreground">&mdash; Component Kits</span>
                <span className="font-mono text-xs text-muted-foreground">&mdash; Accessibility (WCAG)</span>
                <span className="font-mono text-xs text-muted-foreground">&mdash; Figma to Code Specs</span>
              </div>
            </div>
          </StaggerItem>

          {/* Service 4 */}
          <StaggerItem className="group flex flex-col md:flex-row gap-6 md:gap-12 py-10 md:py-16 border-t border-border/40">
            <div className="w-full md:w-1/3 flex items-start justify-between">
              <h3 className="text-xl md:text-2xl font-medium text-foreground tracking-tight group-hover:text-muted-foreground transition-colors">
                Data Workflows & Automation
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground mt-2 hidden md:block">04</span>
            </div>
            <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-8 md:gap-12">
              <p className="text-base text-muted-foreground font-light leading-relaxed md:w-3/5">
                Automated report pipelines, data migration scripts, database architecture, and real-time dashboard telemetry systems designed for high fault-tolerance.
              </p>
              <div className="md:w-2/5 flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground pb-2 border-b border-border/40 mb-2">Deliverables</span>
                <span className="font-mono text-xs text-muted-foreground">&mdash; Scheduled Cloud Crons</span>
                <span className="font-mono text-xs text-muted-foreground">&mdash; Batch Migration</span>
                <span className="font-mono text-xs text-muted-foreground">&mdash; Export Engines</span>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Deliverables Quality Bar */}
        <FadeUp delay={0.4} className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-border/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-3xl">
            <p className="text-sm text-foreground font-light leading-relaxed">
              <span className="font-mono uppercase tracking-widest text-[10px] text-muted-foreground mr-4 block md:inline mb-2 md:mb-0">Engineering Guarantee</span>
              Every engagement includes clean Git commit history, comprehensive TypeScript declarations, system architecture documentation, and complete deployment pipelines on Vercel or Firebase.
            </p>
          </div>
          <Link href="/contact" className="group flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity whitespace-nowrap">
            <span>Discuss Scope</span>
            <span className="w-12 h-[1px] bg-foreground group-hover:w-16 transition-all duration-300"></span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
