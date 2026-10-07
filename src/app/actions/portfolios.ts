"use server";

import { portfoliosAdminRepository } from "@/lib/repositories/portfoliosAdmin";
import { PortfolioSchema, PortfolioFormData } from "@/lib/validations/portfolio";
import { verifySuperadmin } from "@/lib/auth/admin";
import { revalidatePath } from "next/cache";
import { autoTranslateSettings } from "@/lib/utils/translateSettings";
import { scrapeOgImage } from "@/lib/utils/ogScraper";

async function requireAuth() {
  const { isAuthorized } = await verifySuperadmin();
  if (!isAuthorized) throw new Error("Unauthorized");
}

export async function createPortfolioAction(data: PortfolioFormData) {
  await requireAuth();
  const parsed = PortfolioSchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid portfolio data");

  const translatedData = await autoTranslateSettings(parsed.data, {});
  
  // Auto-scrape thumbnail if empty
  if (!translatedData.thumbnailUrl) {
    translatedData.thumbnailUrl = await scrapeOgImage(translatedData.url);
  }

  await portfoliosAdminRepository.createPortfolio(translatedData);
  revalidatePath("/admin/portfolios");
  revalidatePath("/portfolios");
}

export async function updatePortfolioAction(id: string, data: PortfolioFormData) {
  await requireAuth();
  const parsed = PortfolioSchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid portfolio data");

  const current = await portfoliosAdminRepository.getPortfolio(id);
  const translatedData = await autoTranslateSettings(parsed.data, current || {});

  // Re-scrape if URL changed and thumbnail is empty
  if (!translatedData.thumbnailUrl && translatedData.url !== current?.url) {
    translatedData.thumbnailUrl = await scrapeOgImage(translatedData.url);
  }

  await portfoliosAdminRepository.updatePortfolio(id, translatedData);
  revalidatePath("/admin/portfolios");
  revalidatePath(`/admin/portfolios/${id}`);
  revalidatePath("/portfolios");
}

export async function deletePortfolioAction(id: string) {
  await requireAuth();
  await portfoliosAdminRepository.deletePortfolio(id);
  revalidatePath("/admin/portfolios");
  revalidatePath("/portfolios");
}
