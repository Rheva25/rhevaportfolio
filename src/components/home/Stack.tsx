import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export async function Stack({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  return (
    <section className="w-full bg-background py-24 md:py-32 border-b border-border/40" id="specs">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Editorial Banner */}
        <FadeUp className="mb-20">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest block mb-6">
              {dict.home.stack.tag}
            </span>
            <p className="text-3xl md:text-5xl font-serif italic text-foreground tracking-tight leading-[1.2] text-balance">
              &ldquo;{dict.home.stack.quote}&rdquo;
            </p>
          </div>
        </FadeUp>

        {/* Core Stack Matrix */}
        <div className="space-y-8 mb-24">
          <FadeUp delay={0.1}>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block">
              {dict.home.stack.verified}
            </span>
          </FadeUp>
          
          <StaggerContainer delay={0.2} className="flex flex-wrap gap-x-12 gap-y-6">
            {[
              "Next.js 14",
              "TypeScript",
              "React 18",
              "Tailwind CSS",
              "Cloud Firestore",
              "Firebase Auth",
              "Cloud Storage",
              "Vercel Edge",
            ].map((tech) => (
              <StaggerItem key={tech} className="flex items-center gap-3 text-foreground transition-colors group">
                <span className="w-4 h-[1px] bg-muted-foreground/30 group-hover:bg-foreground transition-colors"></span>
                <span className="font-mono text-sm tracking-wide">{tech}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Three Pillars of Capability Grid */}
        <StaggerContainer delay={0.3} className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 pt-16 border-t border-border/40">
          {/* Pillar 1 */}
          <StaggerItem className="flex flex-col">
            <span className="font-mono text-[10px] text-muted-foreground font-medium tracking-widest mb-6 block uppercase">01 — Foundation</span>
            <h3 className="text-xl font-medium text-foreground mb-4 tracking-tight">{dict.home.stack.level1}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light mb-8 flex-1">
              {dict.home.stack.level1Desc}
            </p>
            <ul className="space-y-3 font-mono text-[11px] text-muted-foreground/80">
              <li>&rarr; Type-safe Server Actions</li>
              <li>&rarr; Optimized Firestore indexes</li>
              <li>&rarr; Zero-drift integration</li>
            </ul>
          </StaggerItem>

          {/* Pillar 2 */}
          <StaggerItem className="flex flex-col">
            <span className="font-mono text-[10px] text-muted-foreground font-medium tracking-widest mb-6 block uppercase">02 — Scale</span>
            <h3 className="text-xl font-medium text-foreground mb-4 tracking-tight">{dict.home.stack.level2}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light mb-8 flex-1">
              {dict.home.stack.level2Desc}
            </p>
            <ul className="space-y-3 font-mono text-[11px] text-muted-foreground/80">
              <li>&rarr; Modular single-tenant scripts</li>
              <li>&rarr; Offline-ready capabilities</li>
              <li>&rarr; Granular tenant validation</li>
            </ul>
          </StaggerItem>

          {/* Pillar 3 */}
          <StaggerItem className="flex flex-col">
            <span className="font-mono text-[10px] text-muted-foreground font-medium tracking-widest mb-6 block uppercase">03 — Security</span>
            <h3 className="text-xl font-medium text-foreground mb-4 tracking-tight">{dict.home.stack.level3}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light mb-8 flex-1">
              {dict.home.stack.level3Desc}
            </p>
            <ul className="space-y-3 font-mono text-[11px] text-muted-foreground/80">
              <li>&rarr; RBAC security schemas</li>
              <li>&rarr; Automated compliance digests</li>
              <li>&rarr; Cryptographic audit trails</li>
            </ul>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
