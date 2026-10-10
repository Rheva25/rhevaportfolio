"use server";

import { portfoliosAdminRepository } from "@/lib/repositories/portfoliosAdmin";
import { revalidatePath } from "next/cache";

export async function deletePortfolioAction(id: string) {
  await portfoliosAdminRepository.deletePortfolio(id);
  revalidatePath("/admin/portfolios");
  revalidatePath("/[locale]/portfolios", "page");
}
