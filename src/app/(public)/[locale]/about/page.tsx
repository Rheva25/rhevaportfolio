import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Layers,
  Database,
  Cog,
  Box,
  Wrench,
  ShieldCheck,
  Zap,
  Code,
  Server,
  Cpu,
  Globe,
  Smartphone,
  PenTool,
  Rocket,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { Locale } from "@/i18n/config";
import { getPublicSiteSettings } from "@/lib/repositories/settingsPublic";
import { getLocalizedText } from "@/lib/utils/localization";
import { DEFAULT_ABOUT_PAGE, DEFAULT_CAREER_TIMELINE, DEFAULT_LONG_BIO } from "@/lib/constants/aboutDefaults";
import { FadeUp, MaskReveal, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const ICONS: Record<string, LucideIcon> = {
  Terminal,
  Layers,
  Database,
  Cog,
  Box,
  Wrench,
  ShieldCheck,
  Zap,
  Code,
  Server,
  Cpu,
  Globe,
  Smartphone,
  PenTool,
  Rocket,
  Lock,
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground border border-border/50">
      {children}
    </span>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const settings = await getPublicSiteSettings();
  const t = (field: { id?: string; en?: string } | string | undefined | null) => getLocalizedText(field, locale);

  const profile = settings?.profile;
  const about = settings?.aboutPage ?? DEFAULT_ABOUT_PAGE;
  const capabilities = about.capabilities ?? [];

  const fullName = profile?.fullName || "Rheva Iqbal Abdillah";
  const professionalTitle = t(profile?.professionalTitle);
  const bioParagraphs = (t(profile?.longBio) || t(profile?.shortBio) || t(DEFAULT_LONG_BIO))
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const location = profile?.location || "Indonesia";
  const availability = t(settings?.contact?.availabilityStatus);
  const timeline = profile?.careerTimeline ?? DEFAULT_CAREER_TIMELINE;

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. Header & Intro */}
      <section className="w-full bg-background pt-32 pb-16 md:pt-48 md:pb-28 border-b border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-7 flex flex-col items-start relative z-10">
              <FadeUp delay={0.1}>
                {t(about.profileEyebrow) && (
                  <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest font-semibold block mb-4">
                    {t(about.profileEyebrow)}
                  </span>
                )}
              </FadeUp>
              <MaskReveal delay={0.2}>
                <h1 className="text-5xl sm:text-6xl lg:text-[7rem] font-serif italic text-foreground tracking-tighter mb-6 max-w-2xl leading-[1.05]">
                  {fullName}.
                </h1>
              </MaskReveal>
              <FadeUp delay={0.3}>
                {professionalTitle && (
                  <p className="text-2xl font-serif italic text-muted-foreground mb-8">{professionalTitle}</p>
                )}
                <div className="space-y-4 text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
                  {bioParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </FadeUp>
            </div>
            <StaggerContainer delay={0.4} className="lg:col-span-5 w-full space-y-6">
              {location && (
                <StaggerItem className="bg-background rounded-2xl p-6 border border-border shadow-sm flex flex-col items-start justify-between gap-2 hover:border-foreground/20 transition-colors">
                  <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                    {locale === "id" ? "LOKASI" : "LOCATION"}
                  </span>
                  <span className="font-serif italic text-xl font-light text-foreground text-right">{location}</span>
                </StaggerItem>
              )}
              {availability && (
                <StaggerItem className="bg-background rounded-2xl p-6 border border-border shadow-sm flex flex-col items-start justify-between gap-2 hover:border-foreground/20 transition-colors">
                  <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">STATUS</span>
                  <span className="font-mono text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-2 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0"></span>
                    {availability}
                  </span>
                </StaggerItem>
              )}
              {about.architecturePrinciple && (
                <StaggerItem className="bg-background rounded-2xl p-6 border border-border shadow-sm flex flex-col gap-3 hover:border-foreground/20 transition-colors">
                  <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                    {locale === "id" ? "PRINSIP ARSITEKTUR" : "ARCHITECTURE PRINCIPLE"}
                  </span>
                  <span className="font-serif italic text-lg font-light text-foreground">{about.architecturePrinciple}</span>
                </StaggerItem>
              )}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      {capabilities.length > 0 && (
        <section className="w-full bg-card py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FadeUp className="mb-16">
              <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-4">
                {t(about.capabilitiesEyebrow)}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-foreground tracking-tight">
                {t(about.capabilitiesTitle)}
              </h2>
              {t(about.capabilitiesSubtitle) && (
                <p className="text-lg text-muted-foreground font-light mt-4 max-w-2xl">{t(about.capabilitiesSubtitle)}</p>
              )}
            </FadeUp>

            <StaggerContainer delay={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap, i) => {
                const Icon = ICONS[cap.icon ?? "Terminal"] ?? Terminal;
                const tags = cap.tags ?? [];
                return (
                  <StaggerItem
                    key={i}
                    className="p-8 rounded-xl bg-background border border-border shadow-sm flex flex-col justify-between gap-6 hover:border-foreground/20 transition-all duration-300 group"
                  >
                    <div className="flex flex-col gap-5">
                      <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center text-foreground border border-border/50 group-hover:bg-foreground/5 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-2xl font-serif italic text-foreground">{t(cap.title)}</h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">{t(cap.description)}</p>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
                        {tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    )}
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* 3. Career Timeline */}
      {timeline.length > 0 && (
        <section className="w-full bg-background py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FadeUp className="mb-16">
              <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-4">
                {t(about.timelineEyebrow)}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-foreground tracking-tight">
                {t(about.timelineTitle)}
              </h2>
            </FadeUp>

            <StaggerContainer delay={0.2} className="space-y-4">
              {timeline.map((item, i) => {
                const organization = t(item.organization);
                const stack = item.stack ?? [];
                return (
                  <StaggerItem
                    key={i}
                    className="p-6 md:p-10 rounded-xl bg-card border border-border shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-6 hover:border-foreground/20 transition-all duration-300 group"
                  >
                    <div className="flex flex-col gap-3 max-w-3xl">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-mono text-[10px] px-2.5 py-1 rounded-sm bg-muted/50 font-semibold text-foreground border border-border/50 tracking-widest uppercase">
                          {item.period}
                        </span>
                        {item.isCurrent ? (
                          <span className="font-mono text-[10px] text-green-600 dark:text-green-400 font-medium flex items-center gap-1.5 uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {t(about.timelineCurrentLabel)}
                          </span>
                        ) : (
                          item.label && (
                            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{item.label}</span>
                          )
                        )}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif italic text-foreground mt-1 group-hover:text-primary transition-colors">{t(item.role)}</h3>
                      {organization && <span className="text-sm text-muted-foreground font-mono uppercase tracking-widest">{organization}</span>}
                      <p className="text-base text-muted-foreground font-light pt-3 leading-relaxed">{t(item.description)}</p>
                    </div>
                    {stack.length > 0 && (
                      <div className="flex flex-col lg:items-end gap-3 shrink-0 pt-4 lg:pt-0">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                          {t(about.timelineStackLabel)}
                        </span>
                        <div className="flex flex-wrap lg:justify-end gap-2 max-w-[280px]">
                          {stack.map((s) => (
                            <Tag key={s}>{s}</Tag>
                          ))}
                        </div>
                      </div>
                    )}
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* 4. Collaboration CTA */}
      {t(about.ctaTitle) && (
        <section className="w-full bg-card py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FadeUp className="p-10 md:p-16 rounded-2xl bg-muted/30 border border-border shadow-sm flex flex-col items-center text-center gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-foreground/5 rounded-full blur-3xl pointer-events-none"></div>
              {t(about.ctaEyebrow) && (
                <span className="font-mono text-[10px] text-muted-foreground font-semibold tracking-widest uppercase relative z-10">
                  {t(about.ctaEyebrow)}
                </span>
              )}
              <h2 className="text-4xl md:text-5xl font-serif italic text-foreground tracking-tight max-w-3xl relative z-10">
                {t(about.ctaTitle)}
              </h2>
              {t(about.ctaDescription) && (
                <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed relative z-10">{t(about.ctaDescription)}</p>
              )}
              {t(about.ctaButtonLabel) && (
                <div className="flex flex-wrap items-center justify-center gap-4 pt-6 relative z-10">
                  <Link
                    href={about.ctaButtonHref || "/contact"}
                    className="inline-flex items-center justify-center gap-3 px-8 h-14 rounded-lg bg-foreground text-background font-mono text-xs uppercase tracking-widest shadow-sm hover:opacity-90 transition-opacity"
                  >
                    <span>{t(about.ctaButtonLabel)}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </FadeUp>
          </div>
        </section>
      )}
    </div>
  );
}
