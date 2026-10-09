"use server";

import { revalidatePath } from "next/cache";
import { QuoteFormData } from "@/lib/validations/quotes";
import { quotesAdminRepository } from "@/lib/repositories/quotesAdmin";
import { requireSuperAdminServer } from "@/lib/auth/server";

export async function createQuoteAction(data: QuoteFormData) {
  await requireSuperAdminServer();
  const id = await quotesAdminRepository.create(data);
  revalidatePath("/admin/quotes");
  revalidatePath("/quotes");
  return { id };
}

export async function updateQuoteAction(id: string, data: Partial<QuoteFormData>) {
  await requireSuperAdminServer();
  await quotesAdminRepository.update(id, data);
  revalidatePath("/admin/quotes");
  revalidatePath("/quotes");
}

export async function deleteQuoteAction(id: string) {
  await requireSuperAdminServer();
  await quotesAdminRepository.delete(id);
  revalidatePath("/admin/quotes");
  revalidatePath("/quotes");
}
