import { Project, AppModel, Article, SiteSettings, MediaAsset } from "../models";
import { normalizeLocalized, normalizeLocalizedArray } from "../utils/localization";

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
    } : undefined,
    contact: contact ? {
      ...contact,
      successMessage: normalizeLocalized(contact.successMessage),
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
