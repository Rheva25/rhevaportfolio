import Link from "next/link";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
import { MonitorSmartphone, ShieldCheck, PaintBucket, Workflow, Verified } from "lucide-react";

export async function Services({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  return (
    <section className="w-full bg-background py-24" id="services">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-2">
            03 // SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            What I Can Build
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            Specialized technical consulting and end-to-end development services for organizations that demand precision.
          </p>
        </div>

        {/* 4 Services Bento 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Service 1 */}
          <div className="p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary mb-6 border border-border/50">
              <MonitorSmartphone className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Modern Web Applications</h3>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Production-ready web systems built with Next.js App Router, React, and TypeScript. Optimized for Lighthouse 100 performance, responsive UX, and accessible interfaces.
            </p>
            <div className="flex flex-wrap gap-2 text-foreground font-mono text-[11px]">
              <span className="px-2.5 py-1 rounded bg-muted border border-border/50">SSR / SSG / ISR</span>
              <span className="px-2.5 py-1 rounded bg-muted border border-border/50">Zero Runtime CSS</span>
              <span className="px-2.5 py-1 rounded bg-muted border border-border/50">Strict Type Safety</span>
            </div>
          </div>

          {/* Service 2 */}
          <div className="p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary mb-6 border border-border/50">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Internal Management Systems</h3>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Bespoke administrative portals, ERP modules, employee records, and operational tooling tailored to organizational compliance, data privacy, and security protocols.
            </p>
            <div className="flex flex-wrap gap-2 text-foreground font-mono text-[11px]">
              <span className="px-2.5 py-1 rounded bg-muted border border-border/50">Multi-tenant ACL</span>
              <span className="px-2.5 py-1 rounded bg-muted border border-border/50">Audit Telemetry</span>
              <span className="px-2.5 py-1 rounded bg-muted border border-border/50">High Data Density</span>
            </div>
          </div>

          {/* Service 3 */}
          <div className="p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary mb-6 border border-border/50">
              <PaintBucket className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">UI/UX Interface Design</h3>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Design systems, interactive prototypes, and production design in Figma engineered directly for shadcn/ui and Tailwind implementation without visual drift or code bloat.
            </p>
            <div className="flex flex-wrap gap-2 text-foreground font-mono text-[11px]">
              <span className="px-2.5 py-1 rounded bg-muted border border-border/50">Component Kits</span>
              <span className="px-2.5 py-1 rounded bg-muted border border-border/50">Accessibility (WCAG)</span>
              <span className="px-2.5 py-1 rounded bg-muted border border-border/50">Figma to Code</span>
            </div>
          </div>

          {/* Service 4 */}
          <div className="p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary mb-6 border border-border/50">
              <Workflow className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Data Workflows & Automation</h3>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Automated report pipelines, data migration scripts, Firestore data architecture, and real-time dashboard telemetry systems designed for high fault-tolerance.
            </p>
            <div className="flex flex-wrap gap-2 text-foreground font-mono text-[11px]">
              <span className="px-2.5 py-1 rounded bg-muted border border-border/50">Scheduled Cloud Crons</span>
              <span className="px-2.5 py-1 rounded bg-muted border border-border/50">Batch Migration</span>
              <span className="px-2.5 py-1 rounded bg-muted border border-border/50">Export Engines</span>
            </div>
          </div>
        </div>

        {/* Deliverables Quality Bar */}
        <div className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start md:items-center gap-4">
            <Verified className="text-primary h-8 w-8 shrink-0 mt-1 md:mt-0" />
            <p className="text-sm text-foreground leading-relaxed">
              <strong className="font-semibold text-foreground mr-1">Engineering Guarantee:</strong>
              Every engagement includes clean Git commit history, comprehensive TypeScript declarations, system architecture documentation, and complete deployment pipelines on Vercel or Firebase.
            </p>
          </div>
          <Link href="/contact" className="w-full md:w-auto shrink-0 px-6 py-2.5 text-center rounded-lg bg-muted hover:bg-muted/80 text-foreground font-mono text-sm font-medium transition-colors border border-border">
            Discuss Scope
          </Link>
        </div>
      </div>
    </section>
  );
}
