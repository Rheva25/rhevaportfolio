import { Project, AppModel, Article, SiteSettings, MediaAsset } from "../models";
import { normalizeLocalized, normalizeLocalizedArray } from "../utils/localization";
import { DEFAULT_ABOUT_PAGE, DEFAULT_CAREER_TIMELINE, DEFAULT_LONG_BIO } from "../constants/aboutDefaults";

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];

function mapAboutPage(raw: unknown): NonNullable<SiteSettings["aboutPage"]> {
  if (!raw || typeof raw !== "object") return DEFAULT_ABOUT_PAGE;
  const a = raw as Record<string, unknown>;
  const loc = (key: keyof typeof DEFAULT_ABOUT_PAGE) =>
    a[key] === undefined ? (DEFAULT_ABOUT_PAGE[key] as { id: string; en: string }) : normalizeLocalized(a[key]);

  return {
    profileEyebrow: loc("profileEyebrow"),
    architecturePrinciple: typeof a.architecturePrinciple === "string" ? a.architecturePrinciple : DEFAULT_ABOUT_PAGE.architecturePrinciple,
    capabilitiesEyebrow: loc("capabilitiesEyebrow"),
    capabilitiesTitle: loc("capabilitiesTitle"),
    capabilitiesSubtitle: loc("capabilitiesSubtitle"),
    capabilities: Array.isArray(a.capabilities)
      ? a.capabilities.map((c: unknown) => {
          const cap = c as Record<string, unknown>;
          return {
            icon: typeof cap.icon === "string" ? cap.icon : "Terminal",
            title: normalizeLocalized(cap.title),
            description: normalizeLocalized(cap.description),
            tags: toStringArray(cap.tags),
          };
        })
      : DEFAULT_ABOUT_PAGE.capabilities,
    timelineEyebrow: loc("timelineEyebrow"),
    timelineTitle: loc("timelineTitle"),
    timelineStackLabel: loc("timelineStackLabel"),
    timelineCurrentLabel: loc("timelineCurrentLabel"),
    ctaEyebrow: loc("ctaEyebrow"),
    ctaTitle: loc("ctaTitle"),
    ctaDescription: loc("ctaDescription"),
    ctaButtonLabel: loc("ctaButtonLabel"),
    ctaButtonHref: typeof a.ctaButtonHref === "string" && a.ctaButtonHref ? a.ctaButtonHref : DEFAULT_ABOUT_PAGE.ctaButtonHref,
  };
}

export type FirestoreData = {
  id?: string;
  [key: string]: unknown;
};

export function mapProject(data: FirestoreData): Project {
  return {
    ...(data as unknown as Partial<Project>),
    id: data.id || "",
    title: normalizeLocalized(data.title),
    shortDescription: normalizeLocalized(data.shortDescription),
    description: normalizeLocalized(data.description),
    overview: normalizeLocalized(data.overview),
    problem: normalizeLocalized(data.problem),
    solution: normalizeLocalized(data.solution),
    features: normalizeLocalizedArray(data.features),
    process: normalizeLocalizedArray(data.process),
    challenges: normalizeLocalized(data.challenges),
    outcome: normalizeLocalized(data.outcome),
    links: Array.isArray(data.links) ? data.links.map((link: unknown) => ({
      ...(link as Record<string, unknown>),
      label: normalizeLocalized((link as Record<string, unknown>).label)
    })) : [],
    seoTitle: normalizeLocalized(data.seoTitle),
    seoDescription: normalizeLocalized(data.seoDescription),
  } as Project;
}

export function mapApp(data: FirestoreData): AppModel {
  return {
    ...(data as unknown as Partial<AppModel>),
    id: data.id || "",
    name: normalizeLocalized(data.name),
    shortDescription: normalizeLocalized(data.shortDescription),
    description: normalizeLocalized(data.description),
    benefits: normalizeLocalizedArray(data.benefits),
    features: normalizeLocalizedArray(data.features),
    requirements: normalizeLocalizedArray(data.requirements),
    deployment: normalizeLocalized(data.deployment),
    links: Array.isArray(data.links) ? data.links.map((link: unknown) => ({
      ...(link as Record<string, unknown>),
      label: normalizeLocalized((link as Record<string, unknown>).label)
    })) : [],
    seoTitle: normalizeLocalized(data.seoTitle),
    seoDescription: normalizeLocalized(data.seoDescription),
  } as AppModel;
}

export function mapArticle(data: FirestoreData): Article {
  return {
    ...(data as unknown as Partial<Article>),
    id: data.id || "",
    title: normalizeLocalized(data.title),
    excerpt: normalizeLocalized(data.excerpt),
    content: normalizeLocalized(data.content),
    seoTitle: normalizeLocalized(data.seoTitle),
    seoDescription: normalizeLocalized(data.seoDescription),
  } as Article;
}

export function mapSettings(data: FirestoreData): SiteSettings {
  const profile = data.profile as Record<string, unknown> | undefined;
  const contact = data.contact as Record<string, unknown> | undefined;
  const seo = data.seo as Record<string, unknown> | undefined;
  const publicSite = data.publicSite as Record<string, unknown> | undefined;

  return {
    ...(data as unknown as Partial<SiteSettings>),
    siteDescription: normalizeLocalized(data.siteDescription),
    profile: profile ? {
      ...profile,
      professionalTitle: normalizeLocalized(profile.professionalTitle),
      shortBio: normalizeLocalized(profile.shortBio),
      professionalFocus: normalizeLocalized(profile.professionalFocus),
      longBio: profile.longBio === undefined ? DEFAULT_LONG_BIO : normalizeLocalized(profile.longBio),
      technicalGuarantees: Array.isArray(profile.technicalGuarantees) ? profile.technicalGuarantees.map((g: unknown) => ({
        ...(g as Record<string, unknown>),
        title: normalizeLocalized((g as Record<string, unknown>).title),
        description: normalizeLocalized((g as Record<string, unknown>).description)
      })) : [],
      careerTimeline: Array.isArray(profile.careerTimeline) ? profile.careerTimeline.map((t: unknown) => {
        const item = t as Record<string, unknown>;
        return {
          period: typeof item.period === "string" ? item.period : "",
          role: normalizeLocalized(item.role),
          organization: normalizeLocalized(item.organization),
          label: typeof item.label === "string" ? item.label : "",
          isCurrent: item.isCurrent === true,
          description: normalizeLocalized(item.description),
          stack: toStringArray(item.stack),
        };
      }) : DEFAULT_CAREER_TIMELINE,
    } : undefined,
    contact: contact ? {
      ...contact,
      successMessage: normalizeLocalized(contact.successMessage),
      availabilityStatus: normalizeLocalized(contact.availabilityStatus),
    } : undefined,
    seo: seo ? {
      ...seo,
      defaultTitle: normalizeLocalized(seo.defaultTitle),
      defaultDescription: normalizeLocalized(seo.defaultDescription),
    } : undefined,
    publicSite: publicSite ? {
      ...publicSite,
      navigation: Array.isArray(publicSite.navigation) ? publicSite.navigation.map((n: unknown) => ({
        ...(n as Record<string, unknown>),
        label: normalizeLocalized((n as Record<string, unknown>).label)
      })) : [],
      homepageSections: Array.isArray(publicSite.homepageSections) ? publicSite.homepageSections.map((s: unknown) => ({
        ...(s as Record<string, unknown>),
        label: normalizeLocalized((s as Record<string, unknown>).label)
      })) : [],
    } : undefined,
    aboutPage: mapAboutPage(data.aboutPage),
  } as SiteSettings;
}

export function mapMedia(data: FirestoreData): MediaAsset {
  return {
    ...(data as unknown as Partial<MediaAsset>),
    id: data.id || "",
    title: normalizeLocalized(data.title),
    altText: normalizeLocalized(data.altText),
    caption: normalizeLocalized(data.caption),
    description: normalizeLocalized(data.description),
  } as MediaAsset;
}

export function mapTemplate(data: FirestoreData): any {
  return {
    ...(data as unknown as any),
    id: data.id || "",
    name: normalizeLocalized(data.name),
    shortDescription: normalizeLocalized(data.shortDescription),
    description: normalizeLocalized(data.description),
    features: normalizeLocalizedArray(data.features),
  };
}
