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
      <section className="w-full bg-background pt-12 pb-24 md:pt-16 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-7 flex flex-col items-start">
              {t(about.profileEyebrow) && (
                <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-semibold block mb-4">
                  {t(about.profileEyebrow)}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl text-foreground tracking-tight font-semibold mb-6 max-w-2xl leading-[1.08]">
                {fullName}.
              </h1>
              {professionalTitle && (
                <p className="text-xl text-foreground mb-6 font-medium">{professionalTitle}</p>
              )}
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
                {bioParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 w-full space-y-6">
              {location && (
                <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    {locale === "id" ? "LOKASI" : "LOCATION"}
                  </span>
                  <span className="font-mono text-sm font-semibold text-foreground uppercase text-right">{location}</span>
                </div>
              )}
              {availability && (
                <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-muted-foreground">STATUS</span>
                  <span className="font-mono text-sm font-semibold text-green-600 dark:text-green-400 flex items-center gap-2 uppercase text-right">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></span>
                    {availability}
                  </span>
                </div>
              )}
              {about.architecturePrinciple && (
                <div className="bg-card border border-border p-6 rounded-xl flex flex-col gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {locale === "id" ? "PRINSIP ARSITEKTUR" : "ARCHITECTURE PRINCIPLE"}
                  </span>
                  <span className="font-mono text-sm font-semibold text-primary">{about.architecturePrinciple}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      {capabilities.length > 0 && (
        <section className="w-full bg-card py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="mb-14">
              <span className="font-mono text-xs uppercase text-primary tracking-wider font-semibold block mb-2">
                {t(about.capabilitiesEyebrow)}
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                {t(about.capabilitiesTitle)}
              </h2>
              {t(about.capabilitiesSubtitle) && (
                <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{t(about.capabilitiesSubtitle)}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap, i) => {
                const Icon = ICONS[cap.icon ?? "Terminal"] ?? Terminal;
                const tags = cap.tags ?? [];
                return (
                  <div
                    key={i}
                    className="p-6 md:p-8 rounded-xl bg-background border border-border shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary border border-border/50">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{t(cap.title)}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t(cap.description)}</p>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 3. Career Timeline */}
      {timeline.length > 0 && (
        <section className="w-full bg-background py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="mb-14">
              <span className="font-mono text-xs uppercase text-primary tracking-wider font-semibold block mb-2">
                {t(about.timelineEyebrow)}
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                {t(about.timelineTitle)}
              </h2>
            </div>

            <div className="space-y-6">
              {timeline.map((item, i) => {
                const organization = t(item.organization);
                const stack = item.stack ?? [];
                return (
                  <div
                    key={i}
                    className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-6 hover:border-primary/30 transition-colors group"
                  >
                    <div className="flex flex-col gap-2 max-w-3xl">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-muted font-semibold text-foreground border border-border/50">
                          {item.period}
                        </span>
                        {item.isCurrent ? (
                          <span className="font-mono text-[11px] text-green-600 dark:text-green-400 font-medium flex items-center gap-1.5 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {t(about.timelineCurrentLabel)}
                          </span>
                        ) : (
                          item.label && (
                            <span className="font-mono text-[11px] text-muted-foreground uppercase">{item.label}</span>
                          )
                        )}
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground">{t(item.role)}</h3>
                      {organization && <span className="text-sm text-primary font-medium">{organization}</span>}
                      <p className="text-base text-muted-foreground pt-2 leading-relaxed">{t(item.description)}</p>
                    </div>
                    {stack.length > 0 && (
                      <div className="flex flex-col lg:items-end gap-3 shrink-0 pt-2 lg:pt-0">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase">
                          {t(about.timelineStackLabel)}
                        </span>
                        <div className="flex flex-wrap lg:justify-end gap-1.5">
                          {stack.map((s) => (
                            <Tag key={s}>{s}</Tag>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. Collaboration CTA */}
      {t(about.ctaTitle) && (
        <section className="w-full bg-card py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="p-8 md:p-12 rounded-2xl bg-background border border-border shadow-sm flex flex-col items-center text-center gap-6">
              {t(about.ctaEyebrow) && (
                <span className="font-mono text-xs text-primary font-semibold tracking-wide uppercase">
                  {t(about.ctaEyebrow)}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight max-w-3xl">
                {t(about.ctaTitle)}
              </h2>
              {t(about.ctaDescription) && (
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t(about.ctaDescription)}</p>
              )}
              {t(about.ctaButtonLabel) && (
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <Link
                    href={about.ctaButtonHref || "/contact"}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-mono text-sm shadow-sm hover:bg-primary/90 transition-colors"
                  >
                    <span>{t(about.ctaButtonLabel)}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
