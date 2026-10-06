"use server";

import { revalidatePath } from "next/cache";
import { templatesAdminRepository } from "@/lib/repositories/templatesAdmin";
import { TemplateFormData, TemplateSchema } from "@/lib/validations/template";
import { verifySuperadmin } from "@/lib/auth/admin";
import { autoTranslateSettings } from "@/lib/utils/translateSettings";

export async function createTemplateAction(data: TemplateFormData) {
  const { isAuthorized } = await verifySuperadmin();
  if (!isAuthorized) throw new Error("Unauthorized");
  
  const parsed = TemplateSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid template data");
  }

  const translatedData = await autoTranslateSettings(parsed.data, {});
  const result = await templatesAdminRepository.createTemplate(translatedData);
  
  revalidatePath("/admin/templates");
  revalidatePath("/");
  
  return result;
}

export async function updateTemplateAction(id: string, data: Partial<TemplateFormData>) {
  const { isAuthorized } = await verifySuperadmin();
  if (!isAuthorized) throw new Error("Unauthorized");
  
  const current = await templatesAdminRepository.getTemplate(id);
  const translatedData = await autoTranslateSettings(data, current || {});
  await templatesAdminRepository.updateTemplate(id, translatedData);
  
  revalidatePath("/admin/templates");
  revalidatePath("/");
  revalidatePath(`/${data.slug}`);
}

export async function deleteTemplateAction(id: string) {
  const { isAuthorized } = await verifySuperadmin();
  if (!isAuthorized) throw new Error("Unauthorized");
  
  await templatesAdminRepository.deleteTemplate(id);
  
  revalidatePath("/admin/templates");
  revalidatePath("/");
}
