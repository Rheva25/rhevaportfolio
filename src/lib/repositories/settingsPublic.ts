import { settingsAdminRepository } from "./settingsAdmin";
import { SiteSettings } from "@/lib/validations/settings";

/**
 * Public Settings Repository
 * 
 * Fetches settings for public consumption. 
 * PENDING FIREBASE CONFIGURATION: 
 * This currently falls back to returning null or mock data if Firebase is unconfigured,
 * to prevent breaking the public site during the transition.
 */
export async function getPublicSiteSettings(): Promise<SiteSettings | null> {
  try {
    // Attempt to use the admin repository since public pages are server-rendered
    // Once Firebase is configured, this will fetch the real settings.
    return await settingsAdminRepository.getSiteSettings();
  } catch (e: unknown) {
    // Graceful fallback for unconfigured Firebase so the public site doesn't crash
    console.warn("Public settings fetch failed (Firebase unconfigured). Using fallback.", (e as Error).message);
    return null;
  }
}
