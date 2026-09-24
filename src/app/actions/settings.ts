"use server";

import { settingsAdminRepository } from "@/lib/repositories/settingsAdmin";
import { SiteSettingsSchema, SiteSettingsFormData } from "@/lib/validations/settings";
import { verifySuperadmin } from "@/lib/auth/admin";
import { revalidatePath } from "next/cache";

/**
 * Checks authorization. Throws if not authorized.
 */
async function requireAuth() {
  const session = await verifySuperadmin();
  if (!session.isAuthorized) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function updateSiteSettingsAction(data: SiteSettingsFormData) {
  const session = await requireAuth();
  
  const parsed = SiteSettingsSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid settings data");
  }

  // Uses the verified superadmin email as the updater
  await settingsAdminRepository.updateSiteSettings(parsed.data, session.user?.email || "superadmin");
  
  // Settings touch the whole app, so we can revalidate the layout/global cache
  revalidatePath("/", "layout");
}
