import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
export async function About({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  return (
    <section className="w-full bg-card py-24 border-t border-border" id="about">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-2">
            {dict.home.about.tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Behind the code.
          </h2>
        </div>

        {/* Two-Column Editorial & Principles Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-normal">
              I am <strong className="font-semibold">Rheva Iqbal Abdillah</strong>, a software engineer combining fullstack engineering, UI/UX systems design, and data analysis with a deep understanding of organizational realities.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Rather than treating code as an isolated output, I approach engineering through product thinking&mdash;identifying bottlenecks in daily operations and crafting software that teams actually enjoy using. My work spans enterprise faculty portals, automated attendance validation, and self-hosted utility engines.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              I believe software should be quiet, dependable, and structurally sound. Every line of TypeScript is drafted to survive operational scale without excessive overhead or third-party vendor bloat.
            </p>

            {/* Key Competencies */}
            <div className="pt-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground block mb-3 font-semibold">
                Core Competencies
              </span>
              <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                {["Systems Architecture", "Fullstack TypeScript", "shadcn/ui Design Systems", "Public Sector Workflows", "Cloud Firestore Optimization"].map((comp) => (
                  <span key={comp} className="px-3 py-1.5 rounded-md bg-muted text-foreground font-medium border border-border/50">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Principles Card */}
          <div className="lg:col-span-5 bg-muted/30 border border-border p-8 rounded-xl space-y-6">
            <div className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
              Technical Guarantees & Standards
            </div>
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
                  <span className="text-primary">01.</span>
                  <span>Zero Bloat Architecture</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Minimal dependencies, rapid initial load speeds, strict compile-time types, and zero reliance on heavy runtimes.
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
                  <span className="text-primary">02.</span>
                  <span>Pragmatic Product Delivery</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Working, verified software shipped in iterative milestones tested against authentic production datasets.
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
                  <span className="text-primary">03.</span>
                  <span>Maintainable Systems</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Documented schema definitions, isolated state transitions, and zero proprietary lock-in. You own your code entirely.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Timeline */}
        <div className="pt-8 border-t border-border">
          <h3 className="text-2xl font-semibold text-foreground mb-8">Career Timeline & Experience</h3>
          <div className="space-y-4">
            <div className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-border/80 transition-colors">
              <div className="md:w-1/4 font-mono text-sm font-bold text-foreground">
                2023 &mdash; PRESENT
              </div>
              <div className="md:w-3/4 space-y-2">
                <div className="font-semibold text-lg text-foreground">Lead Systems Engineer & Consultant (Independent)</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Architecting and shipping specialized administration and attendance verification infrastructure for regional educational institutions and public sector agencies. Maintaining digital products with continuous update cycles.
                </p>
              </div>
            </div>
            
            <div className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-border/80 transition-colors">
              <div className="md:w-1/4 font-mono text-sm font-bold text-foreground">
                2022 &mdash; 2023
              </div>
              <div className="md:w-3/4 space-y-2">
                <div className="font-semibold text-lg text-foreground">Fullstack Software Engineer</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Built high-concurrency internal web portals, Next.js applications, and database synchronization pipelines. Spearheaded data model redesigns on Firebase Firestore reducing query billings by 40%.
                </p>
              </div>
            </div>
            
            <div className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-border/80 transition-colors">
              <div className="md:w-1/4 font-mono text-sm font-bold text-foreground">
                2021 &mdash; 2022
              </div>
              <div className="md:w-3/4 space-y-2">
                <div className="font-semibold text-lg text-foreground">Frontend & UI Systems Developer</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Engineered standardized component libraries, accessible web interfaces, and responsive administrative dashboards using Tailwind CSS and TypeScript.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
