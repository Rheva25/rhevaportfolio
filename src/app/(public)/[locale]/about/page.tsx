import Link from "next/link";
import { ArrowRight, Terminal, Layers, Database, Cog, Box, Wrench, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. Header & Intro */}
      <section className="w-full bg-background pt-12 pb-24 md:pt-16 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-4">
                01 // PERSONAL PROFILE
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl text-foreground tracking-tight font-semibold mb-6 max-w-2xl leading-[1.08]">
                Rheva Iqbal Abdillah.
              </h1>
              <p className="text-xl text-foreground mb-6 font-medium">
                Software Engineer &amp; Systems Designer.
              </p>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
                <p>
                  I build practical digital products and administrative systems that solve real operational bottlenecks. Rather than treating code as an isolated output, I approach engineering through product thinking&mdash;identifying the root problems in daily operations and crafting software that teams actually enjoy using.
                </p>
                <p>
                  My work spans enterprise faculty portals, automated attendance validation, self-hosted utility engines, and comprehensive UI/UX design systems.
                </p>
                <p>
                  I believe software should be quiet, dependable, and structurally sound. Every line of TypeScript is drafted to survive operational scale without excessive overhead or third-party vendor bloat.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 w-full space-y-6">
              <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">LOCATION</span>
                <span className="font-mono text-sm font-semibold text-foreground">INDONESIA</span>
              </div>
              <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">STATUS</span>
                <span className="font-mono text-sm font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  AVAILABLE
                </span>
              </div>
              <div className="bg-card border border-border p-6 rounded-xl flex flex-col gap-3">
                <span className="font-mono text-xs text-muted-foreground">ARCHITECTURE PRINCIPLE</span>
                <span className="font-mono text-sm font-semibold text-primary">Sovereign &bull; Deterministic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      <section className="w-full bg-card py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-14">
            <span className="font-mono text-xs uppercase text-primary tracking-wider font-semibold block mb-2">
              02 // CORE CAPABILITIES
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Disciplines Engineered for Daily Reliability.
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
              A balanced capability matrix combining high-velocity application development, resilient data modeling, and rigorous product delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary border border-border/50">
                  <Terminal className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Full-Stack Web Applications</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Production architectures using Next.js 14 App Router, React Server Components, TypeScript strict mode, and fine-grained data hydration for peak responsiveness.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Next.js 14", "TypeScript", "Server Actions"].map(t => (
                  <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">{t}</span>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary border border-border/50">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">UI/UX &amp; Design Systems</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Systematic design token foundations, headless accessibility primitives with Radix UI, Tailwind CSS utilities, and zero visual drift between design and code.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Tailwind CSS", "shadcn/ui", "Radix UI"].map(t => (
                  <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">{t}</span>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary border border-border/50">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Data &amp; Information Systems</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Optimized NoSQL collections (Firestore) and relational schemas (Postgres). Batch data migrations, query cost optimization, and robust audit logging.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Firestore", "PostgreSQL", "Zod Schemas"].map(t => (
                  <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">{t}</span>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary border border-border/50">
                  <Cog className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Internal Tools &amp; Admin</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bureaucratic workflow engines, employee dossier lifecycle management, granular role-based access controls (RBAC), and civil-service appraisal calculations.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {["SIMPEG Tools", "Audit Trails", "RBAC Security"].map(t => (
                  <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">{t}</span>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary border border-border/50">
                  <Box className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Packaged Software Products</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Turnkey software delivered as pre-configured single-tenant packages. Easy Docker container deployment with transparent pricing and guaranteed source sovereignty.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Docker", "Self-Hosted", "Single-Tenant"].map(t => (
                  <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">{t}</span>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary border border-border/50">
                  <Wrench className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Technical Problem Solving</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Untangling messy legacy codebases, reverse-engineering unverified data formats, optimizing slow SQL queries, and zero-downtime database migrations.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Data Cutovers", "Refactoring", "Performance"].map(t => (
                  <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Career Timeline */}
      <section className="w-full bg-background py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-14">
            <span className="font-mono text-xs uppercase text-primary tracking-wider font-semibold block mb-2">
              03 // CAREER TIMELINE
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Professional Experience &amp; Roles.
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-6 hover:border-primary/30 transition-colors group">
              <div className="flex flex-col gap-2 max-w-3xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-muted font-semibold text-foreground border border-border/50">2023 &mdash; Present</span>
                  <span className="font-mono text-[11px] text-green-600 dark:text-green-400 font-medium flex items-center gap-1.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Current
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Lead Systems Engineer &amp; Independent Consultant</h3>
                <span className="text-sm text-primary font-medium">Independent Practice // Institutional Systems</span>
                <p className="text-base text-muted-foreground pt-2 leading-relaxed">
                  Architecting and shipping specialized administrative and attendance verification infrastructure for regional educational institutions and public sector agencies. Engineered customized biometric geofencing portals, document archival pipelines, and self-hosted turnkey administrative software with strict regulatory compliance.
                </p>
              </div>
              <div className="flex flex-col lg:items-end gap-3 shrink-0 pt-2 lg:pt-0">
                <span className="font-mono text-[10px] text-muted-foreground uppercase">Key Stack</span>
                <div className="flex flex-wrap lg:justify-end gap-1.5">
                  {["Next.js 14", "Firestore", "Docker", "PostgreSQL"].map(t => (
                     <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-6 hover:border-primary/30 transition-colors group">
              <div className="flex flex-col gap-2 max-w-3xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-muted font-semibold text-foreground border border-border/50">2022 &mdash; 2023</span>
                  <span className="font-mono text-[11px] text-muted-foreground uppercase">Enterprise Services</span>
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Full-Stack Software Engineer</h3>
                <span className="text-sm text-primary font-medium">Digital Systems Group // Production Engineering</span>
                <p className="text-base text-muted-foreground pt-2 leading-relaxed">
                  Built high-concurrency internal web portals, Next.js applications, and database synchronization pipelines. Spearheaded complete data model redesigns on Firebase Firestore, resolving collection read cascades and reducing cloud query billing by 40% while maintaining sub-second query latency under peak load.
                </p>
              </div>
              <div className="flex flex-col lg:items-end gap-3 shrink-0 pt-2 lg:pt-0">
                <span className="font-mono text-[10px] text-muted-foreground uppercase">Key Stack</span>
                <div className="flex flex-wrap lg:justify-end gap-1.5">
                  {["React / Next.js", "Firebase", "Node.js", "TypeScript"].map(t => (
                     <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-6 hover:border-primary/30 transition-colors group">
              <div className="flex flex-col gap-2 max-w-3xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-muted font-semibold text-foreground border border-border/50">2021 &mdash; 2022</span>
                  <span className="font-mono text-[11px] text-muted-foreground uppercase">UI Architecture</span>
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Frontend &amp; UI Systems Developer</h3>
                <span className="text-sm text-primary font-medium">Software Development Lab</span>
                <p className="text-base text-muted-foreground pt-2 leading-relaxed">
                  Engineered standardized component design libraries, accessible web interfaces, and responsive administrative dashboards using Tailwind CSS, React, and TypeScript. Codified typography systems, consistent elevation hierarchies, and reduced bundle weights across client portals.
                </p>
              </div>
              <div className="flex flex-col lg:items-end gap-3 shrink-0 pt-2 lg:pt-0">
                <span className="font-mono text-[10px] text-muted-foreground uppercase">Key Stack</span>
                <div className="flex flex-wrap lg:justify-end gap-1.5">
                  {["Tailwind CSS", "React", "Figma Tokens", "PHP"].map(t => (
                     <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 4. Collaboration CTA */}
      <section className="w-full bg-card py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="p-8 md:p-12 rounded-2xl bg-background border border-border shadow-sm flex flex-col items-center text-center gap-6">
            <span className="font-mono text-xs text-primary font-semibold tracking-wide uppercase">
              INITIATE DIALOGUE
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight max-w-3xl">
              Have a System, Workflow, or Operational Bottleneck to Solve?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Whether you need a custom administrative web platform, an auditable workflow engine, or want to deploy one of my packaged digital products&mdash;let&rsquo;s examine your requirements directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-mono text-sm shadow-sm hover:bg-primary/90 transition-colors">
                <span>Start Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
