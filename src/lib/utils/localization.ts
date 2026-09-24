import { LocalizedString } from "../models";

export function normalizeLocalized(field: unknown): LocalizedString {
  if (typeof field === "string") {
    return { id: field, en: "" };
  }
  if (field && typeof field === "object") {
    const obj = field as Record<string, unknown>;
    return {
      id: typeof obj.id === 'string' ? obj.id : "",
      en: typeof obj.en === 'string' ? obj.en : "",
    };
  }
  return { id: "", en: "" };
}

export function normalizeLocalizedArray(fields: unknown): LocalizedString[] {
  if (!fields || !Array.isArray(fields)) return [];
  return fields.map(normalizeLocalized);
}

export function getLocalizedText(field: { id: string; en?: string } | string | undefined | null, locale: "id" | "en" | string): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  
  if (locale === "en") {
    return field.en || field.id || "";
  }
  
  return field.id || field.en || "";
}
