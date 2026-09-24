import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
export async function Stack({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  return (
    <section className="w-full bg-card py-16 border-t border-border" id="specs">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Editorial Banner */}
        <div className="mb-14 pb-12 border-b border-border">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-3">
              {dict.home.stack.tag}
            </span>
            <p className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight leading-snug">
              &ldquo;{dict.home.stack.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Core Stack Matrix Pills */}
        <div className="space-y-4 mb-14">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground block font-medium">
            {dict.home.stack.verified}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
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
              <div key={tech} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-foreground hover:bg-muted transition-colors border border-transparent hover:border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span className="font-mono text-xs font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Three Pillars of Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-xl bg-background border border-border shadow-sm hover:shadow transition-shadow">
            <div className="font-mono text-xs text-primary font-medium mb-3">LEVEL 01</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2 tracking-tight">{dict.home.stack.level1}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {dict.home.stack.level1Desc}
            </p>
            <ul className="space-y-2 text-foreground font-mono text-[11px]">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>
                Type-safe Server Actions & Route Handlers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>
                Optimized Firestore index structures
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>
                Zero-drift shadcn/ui component integration
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-xl bg-background border border-border shadow-sm hover:shadow transition-shadow">
            <div className="font-mono text-xs text-primary font-medium mb-3">LEVEL 02</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2 tracking-tight">{dict.home.stack.level2}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {dict.home.stack.level2Desc}
            </p>
            <ul className="space-y-2 text-foreground font-mono text-[11px]">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>
                Modular single-tenant deployment scripts
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>
                Offline-ready PWA & geofencing capabilities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>
                Granular tenant validation
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-xl bg-background border border-border shadow-sm hover:shadow transition-shadow">
            <div className="font-mono text-xs text-primary font-medium mb-3">LEVEL 03</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2 tracking-tight">{dict.home.stack.level3}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {dict.home.stack.level3Desc}
            </p>
            <ul className="space-y-2 text-foreground font-mono text-[11px]">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>
                Role-Based Access Control (RBAC) schemas
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>
                Automated institutional compliance digests
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary"></span>
                Audit trails with cryptographic tamper prevention
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
