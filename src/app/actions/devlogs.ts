"use strict";
"use server";

import { devlogsAdminRepository } from "@/lib/repositories/devlogsAdmin";
import { DevlogEntrySchema, DevlogEntryFormData } from "@/lib/validations/devlog";
import { verifySuperadmin } from "@/lib/auth/admin";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const { isAuthorized } = await verifySuperadmin();
  if (!isAuthorized) throw new Error("Unauthorized");
}

export async function createDevlogAction(data: DevlogEntryFormData) {
  await requireAuth();
  const parsed = DevlogEntrySchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid devlog data");

  const newId = await devlogsAdminRepository.createDevlog(parsed.data);
  revalidatePath("/admin/devlogs");
  revalidatePath("/devlog-unspoken");
  return newId;
}

export async function updateDevlogAction(id: string, data: DevlogEntryFormData) {
  await requireAuth();
  const parsed = DevlogEntrySchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid devlog data");

  await devlogsAdminRepository.updateDevlog(id, parsed.data);
  revalidatePath("/admin/devlogs");
  revalidatePath(`/admin/devlogs/${id}`);
  revalidatePath("/devlog-unspoken");
  revalidatePath(`/devlog-unspoken/${parsed.data.slug}`);
}

export async function deleteDevlogAction(id: string) {
  await requireAuth();
  await devlogsAdminRepository.deleteDevlog(id);
  revalidatePath("/admin/devlogs");
  revalidatePath("/devlog-unspoken");
}
