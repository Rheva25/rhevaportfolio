"use server";

import { revalidatePath } from "next/cache";
import { QuoteFormData } from "@/lib/validations/quotes";
import { quotesAdminRepository } from "@/lib/repositories/quotesAdmin";
import { verifySuperadmin } from "@/lib/auth/admin";

export async function createQuoteAction(data: QuoteFormData) {
  const { isAuthorized } = await verifySuperadmin();
  if (!isAuthorized) throw new Error("Unauthorized");
  const id = await quotesAdminRepository.create(data);
  revalidatePath("/admin/quotes");
  revalidatePath("/quotes");
  return { id };
}

export async function updateQuoteAction(id: string, data: Partial<QuoteFormData>) {
  const { isAuthorized } = await verifySuperadmin();
  if (!isAuthorized) throw new Error("Unauthorized");
  await quotesAdminRepository.update(id, data);
  revalidatePath("/admin/quotes");
  revalidatePath("/quotes");
}

export async function deleteQuoteAction(id: string) {
  const { isAuthorized } = await verifySuperadmin();
  if (!isAuthorized) throw new Error("Unauthorized");
  await quotesAdminRepository.delete(id);
  revalidatePath("/admin/quotes");
  revalidatePath("/quotes");
}
