import Link from "next/link";
import { ArrowRight, Monitor, Database, Layout, GitMerge, RefreshCw, Box, CheckCircle2, ChevronRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. Header / Hero */}
      <section className="w-full bg-background pt-12 pb-16 md:pt-16 md:pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div>
                <span className="font-mono text-xs uppercase text-primary font-semibold tracking-wider block mb-4">
                  01 // ENGINEERING SERVICES & CAPABILITIES
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight font-semibold leading-tight">
                  Engineering Practical Systems for Complex Workflows.
                </h1>
              </div>
              <p className="text-lg text-foreground font-medium max-w-2xl">
                Specialized software engineering and digital transformation services tailored for educational institutions, public administrative bodies, and organizations requiring resilient internal systems.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                Bridging full-stack software development, UI/UX systems design, and institutional workflow modernization. From untangling legacy spreadsheet processes to architecting turnkey web applications with deterministic data integrity.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-foreground text-background font-mono text-sm font-semibold hover:bg-foreground/90 transition-colors shadow-sm">
                  <span>Start a Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-border text-foreground font-mono text-sm font-medium hover:bg-muted transition-colors">
                  <span>View Case Studies</span>
                  <ArrowRight className="h-4 w-4 -rotate-45" />
                </Link>
              </div>
            </div>

            {/* Spec Card */}
            <div className="lg:col-span-5 bg-card border border-border rounded-xl p-6 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="font-mono text-xs text-foreground font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded bg-primary"></span>
                  SERVICE_SPEC // DIRECT_ENGAGEMENT
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">SPEC_REV_2025</span>
              </div>
              <div className="py-5 space-y-5">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Practitioner Profile</span>
                  <span className="text-sm text-foreground font-medium">Rheva Iqbal Abdillah &mdash; Lead Software Systems Architect</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Engagement Philosophy</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Single-point accountability. Zero account managers, outsourced tickets, or unnecessary agency markup. Code is authored directly by the principal architect.
                  </p>
                </div>
                <div className="p-3 bg-background rounded border border-border space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-foreground">
                    <span className="font-semibold">CORE OPERATIONAL FOCUS</span>
                    <span className="text-green-600 dark:text-green-400 font-bold">VERIFIED</span>
                  </div>
                  <ul className="font-mono text-[11px] text-muted-foreground space-y-1.5">
                    <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /> Internal Systems &amp; Civil Records</li>
                    <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /> Multi-Department Digitisation</li>
                    <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /> High-Density Academic Engines</li>
                    <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /> Self-Hosted Single-Tenant Deployments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Services */}
      <section className="w-full bg-card border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold block mb-2">
                02 // CORE SERVICES
              </span>
              <h2 className="text-3xl font-semibold text-foreground tracking-tight">Structured Engineering Capabilities</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-lg md:text-right">
              Disciplined technical services for institutions seeking to replace fragile workflows with reliable, maintainable software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Web Apps */}
            <div className="bg-background border border-border rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">01 / WEB APPS</span>
                  <Monitor className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Custom Web Application</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Full-lifecycle engineering of bespoke web applications tailored to specific institutional and organizational requirements.
                </p>
                <div className="pt-3 border-t border-border space-y-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1">Key Deliverables</span>
                    <p className="text-xs text-muted-foreground">Production Next.js application, strict TypeScript architecture, secure RBAC authentication.</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">Next.js &bull; TS &bull; Postgres</span>
                <Link href="/contact" className="text-primary hover:text-primary/80 font-mono text-xs font-semibold inline-flex items-center gap-1 transition-colors">
                  Discuss <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* 2. Systems */}
            <div className="bg-background border border-border rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">02 / SYSTEMS</span>
                  <Database className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Internal Information Systems</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Robust centralized administrative systems for personnel, civil service records, and multi-departmental operations.
                </p>
                <div className="pt-3 border-t border-border space-y-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1">Key Deliverables</span>
                    <p className="text-xs text-muted-foreground">Administrative back-office portals, verification engines, audit logging pipelines.</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">Firestore &bull; Audit Trails</span>
                <Link href="/contact" className="text-primary hover:text-primary/80 font-mono text-xs font-semibold inline-flex items-center gap-1 transition-colors">
                  Discuss <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* 3. Architecture */}
            <div className="bg-background border border-border rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">03 / ARCHITECTURE</span>
                  <Layout className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">UI/UX &amp; Product Design</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Comprehensive interface architecture, design systems, ergonomic workflows, and interactive prototypes.
                </p>
                <div className="pt-3 border-t border-border space-y-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1">Key Deliverables</span>
                    <p className="text-xs text-muted-foreground">Figma systems, component specifications, user flow maps, WCAG benchmarks.</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">Figma &bull; WCAG 2.1</span>
                <Link href="/contact" className="text-primary hover:text-primary/80 font-mono text-xs font-semibold inline-flex items-center gap-1 transition-colors">
                  Discuss <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* 4. Workflows */}
            <div className="bg-background border border-border rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">04 / WORKFLOWS</span>
                  <GitMerge className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Digital Workflow Dev</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transforming manual paper-based approval chains and fragmented spreadsheet handoffs into streamlined digital workflows.
                </p>
                <div className="pt-3 border-t border-border space-y-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1">Key Deliverables</span>
                    <p className="text-xs text-muted-foreground">Approval pipelines, digital watermarks, QR verification, notification webhooks.</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">PDF Pipeline &bull; QR Gen</span>
                <Link href="/contact" className="text-primary hover:text-primary/80 font-mono text-xs font-semibold inline-flex items-center gap-1 transition-colors">
                  Discuss <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* 5. Modernization */}
            <div className="bg-background border border-border rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">05 / MODERNIZATION</span>
                  <RefreshCw className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">System Refactoring</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upgrading fragile legacy systems, refactoring unmaintained codebases, and stabilizing data schemas without downtime.
                </p>
                <div className="pt-3 border-t border-border space-y-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1">Key Deliverables</span>
                    <p className="text-xs text-muted-foreground">Incremental API wrappers, schema normalization, edge caching, modern Docker packaging.</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">Migrations &bull; Proxies</span>
                <Link href="/contact" className="text-primary hover:text-primary/80 font-mono text-xs font-semibold inline-flex items-center gap-1 transition-colors">
                  Discuss <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* 6. Product */}
            <div className="bg-background border border-border rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">06 / PRODUCT</span>
                  <Box className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Custom Software Product</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Designing, packaging, and delivering modular, turnkey software products with single-tenant deployment capabilities.
                </p>
                <div className="pt-3 border-t border-border space-y-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1">Key Deliverables</span>
                    <p className="text-xs text-muted-foreground">Self-hosted Docker packages, deployment guides, unencumbered perpetual source access.</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">Self-Hosted &bull; Perpetual</span>
                <Link href="/contact" className="text-primary hover:text-primary/80 font-mono text-xs font-semibold inline-flex items-center gap-1 transition-colors">
                  Discuss <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Engagement Models */}
      <section className="w-full bg-background border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold block mb-2">
                03 // ENGAGEMENT MODELS
              </span>
              <h2 className="text-3xl font-semibold text-foreground tracking-tight">Structured Collaboration Frameworks</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-lg md:text-right">
              Clear engagement structures built around institutional procurement processes and verifiable technical handovers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
              <div className="space-y-4">
                <div className="font-mono text-[10px] font-semibold text-primary uppercase tracking-wider">MODEL 01 // BESPOKE</div>
                <h3 className="text-lg font-semibold text-foreground">Bespoke Custom Project</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  End-to-end development of dedicated software systems built specifically for your institution.
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">Structure</span>
                  <ul className="text-xs text-foreground space-y-1 font-mono">
                    <li>&bull; Fixed milestone scoping</li>
                    <li>&bull; Strict deliverable sign-offs</li>
                    <li>&bull; Full source delivery</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
              <div className="space-y-4">
                <div className="font-mono text-[10px] font-semibold text-primary uppercase tracking-wider">MODEL 02 // MODERNIZATION</div>
                <h3 className="text-lg font-semibold text-foreground">Legacy Modernization</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Re-architecting and modernizing existing fragile applications into resilient web platforms.
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">Structure</span>
                  <ul className="text-xs text-foreground space-y-1 font-mono">
                    <li>&bull; Phased schema migration</li>
                    <li>&bull; Parallel run validation</li>
                    <li>&bull; Zero historical data loss</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
              <div className="space-y-4">
                <div className="font-mono text-[10px] font-semibold text-primary uppercase tracking-wider">MODEL 03 // PACKAGED</div>
                <h3 className="text-lg font-semibold text-foreground">Product Deployment</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Deploying established packaged software products directly on your infrastructure.
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">Structure</span>
                  <ul className="text-xs text-foreground space-y-1 font-mono">
                    <li>&bull; Rapid installation</li>
                    <li>&bull; Institutional custom branding</li>
                    <li>&bull; Perpetual source access</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
              <div className="space-y-4">
                <div className="font-mono text-[10px] font-semibold text-primary uppercase tracking-wider">MODEL 04 // DISCOVERY</div>
                <h3 className="text-lg font-semibold text-foreground">Architecture Review</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Independent technical audit, data schema assessment, and architecture blueprint prior to coding.
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">Structure</span>
                  <ul className="text-xs text-foreground space-y-1 font-mono">
                    <li>&bull; Comprehensive system audit</li>
                    <li>&bull; Technical spec documents</li>
                    <li>&bull; Implementation roadmap</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process */}
      <section className="w-full bg-card border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold block mb-2">
              04 // SYSTEMATIC DELIVERY
            </span>
            <h2 className="text-3xl font-semibold text-foreground tracking-tight mb-3">The Pragmatic Engineering Lifecycle</h2>
            <p className="text-sm text-muted-foreground">
              Predictable milestones with zero ambiguity. Every phase produces documented, verifiable artifacts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: "01", title: "Discovery", desc: "Deep operational problem analysis, mapping user personas, and identifying hurdles." },
              { id: "02", title: "Architecture", desc: "Defining schema contracts, data pipelines, RBAC permission matrices, and infrastructure." },
              { id: "03", title: "UI/UX Systems", desc: "Designing high-density interfaces and interaction flows in Figma before coding." },
              { id: "04", title: "Development", desc: "Writing clean, type-safe Next.js code with schema validation and transactional queries." },
              { id: "05", title: "Verification", desc: "Stress-testing data mutations, validating audit trails, and running role authorization checks." },
              { id: "06", title: "Deployment", desc: "Containerized deployment to dedicated cloud infrastructure or Vercel edge networks." },
            ].map((step) => (
              <div key={step.id} className="p-5 bg-background border border-border rounded-xl space-y-3">
                <div className="font-mono text-xs font-bold text-primary">{step.id} // {step.title.toUpperCase()}</div>
                <h4 className="font-semibold text-foreground">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
            <div className="p-5 bg-background border border-border rounded-xl space-y-3 lg:col-span-2">
              <div className="font-mono text-xs font-bold text-primary">07 // HANDOVER &amp; SOVEREIGNTY</div>
              <h4 className="font-semibold text-foreground">Knowledge Transfer</h4>
              <p className="text-sm text-muted-foreground">
                Providing comprehensive technical documentation, Git repository access, administrative training sessions, schema dictionaries, and post-deployment refinement guarantees to ensure institutional independence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
