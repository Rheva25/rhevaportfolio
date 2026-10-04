import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
import { getLocalizedText } from "@/lib/utils/localization";
import { getPublicSiteSettings } from "@/lib/repositories/settingsPublic";
export async function About({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const settings = await getPublicSiteSettings();
  const fullName = settings?.profile?.fullName || "Rheva Iqbal Abdillah";
  const title = settings?.profile?.professionalTitle ? getLocalizedText(settings.profile.professionalTitle as { id: string; en?: string }, locale) : "software engineer";
  const focus = settings?.profile?.professionalFocus ? getLocalizedText(settings.profile.professionalFocus as { id: string; en?: string }, locale) : "fullstack engineering and UI/UX design";
  
  const longBio = settings?.profile?.longBio?.id 
    ? getLocalizedText(settings.profile.longBio as { id: string; en?: string }, locale) 
    : "Rather than treating code as an isolated output, I approach engineering through product thinking—identifying bottlenecks in daily operations and crafting software that teams actually enjoy using. My work spans enterprise faculty portals, automated attendance validation, and self-hosted utility engines.\n\nI believe software should be quiet, dependable, and structurally sound. Every line of TypeScript is drafted to survive operational scale without excessive overhead or third-party vendor bloat.";

  const coreCompetencies = settings?.profile?.coreCompetencies && settings.profile.coreCompetencies.length > 0
    ? settings.profile.coreCompetencies
    : ["Systems Architecture", "Fullstack TypeScript", "shadcn/ui Design Systems", "Public Sector Workflows", "Cloud Firestore Optimization"];

  const technicalGuarantees = settings?.profile?.technicalGuarantees && settings.profile.technicalGuarantees.length > 0
    ? settings.profile.technicalGuarantees
    : [
        { title: { id: "Zero Bloat Architecture" }, description: { id: "Minimal dependencies, rapid initial load speeds, strict compile-time types, and zero reliance on heavy runtimes." } },
        { title: { id: "Pragmatic Product Delivery" }, description: { id: "Working, verified software shipped in iterative milestones tested against authentic production datasets." } },
        { title: { id: "Maintainable Systems" }, description: { id: "Documented schema definitions, isolated state transitions, and zero proprietary lock-in. You own your code entirely." } }
      ];

  const careerTimeline = settings?.profile?.careerTimeline && settings.profile.careerTimeline.length > 0
    ? settings.profile.careerTimeline
    : [
        { period: "2023 — PRESENT", role: { id: "Lead Systems Engineer & Consultant (Independent)" }, description: { id: "Architecting and shipping specialized administration and attendance verification infrastructure for regional educational institutions and public sector agencies. Maintaining digital products with continuous update cycles." } },
        { period: "2022 — 2023", role: { id: "Fullstack Software Engineer" }, description: { id: "Built high-concurrency internal web portals, Next.js applications, and database synchronization pipelines. Spearheaded data model redesigns on Firebase Firestore reducing query billings by 40%." } },
        { period: "2021 — 2022", role: { id: "Frontend & UI Systems Developer" }, description: { id: "Engineered standardized component libraries, accessible web interfaces, and responsive administrative dashboards using Tailwind CSS and TypeScript." } }
      ];

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
              I am <strong className="font-semibold">{fullName}</strong>, a {title.toLowerCase()} focusing on {focus.toLowerCase()}.
            </p>
            <div className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {longBio}
            </div>

            {/* Key Competencies */}
            <div className="pt-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground block mb-3 font-semibold">
                Core Competencies
              </span>
              <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                {coreCompetencies.map((comp) => (
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
              {technicalGuarantees.map((tg, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
                    <span className="text-primary">0{index + 1}.</span>
                    <span>{getLocalizedText(tg.title as { id: string; en?: string }, locale)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {getLocalizedText(tg.description as { id: string; en?: string }, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Timeline */}
        <div className="pt-8 border-t border-border">
          <h3 className="text-2xl font-semibold text-foreground mb-8">Career Timeline & Experience</h3>
          <div className="space-y-4">
            {careerTimeline.map((item, index) => (
              <div key={index} className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-border/80 transition-colors">
                <div className="md:w-1/4 font-mono text-sm font-bold text-foreground">
                  {item.period}
                </div>
                <div className="md:w-3/4 space-y-2">
                  <div className="font-semibold text-lg text-foreground">{getLocalizedText(item.role as { id: string; en?: string }, locale)}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {getLocalizedText(item.description as { id: string; en?: string }, locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
