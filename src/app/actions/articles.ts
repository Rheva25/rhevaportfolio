"use server";

import { articlesAdminRepository } from "@/lib/repositories/articlesAdmin";
import { ArticleSchema, ArticleFormData } from "@/lib/validations/article";
import { verifySuperadmin } from "@/lib/auth/admin";
import { revalidatePath } from "next/cache";

/**
 * Checks authorization. Throws if not authorized.
 */
async function requireAuth() {
  const { isAuthorized } = await verifySuperadmin();
  if (!isAuthorized) {
    throw new Error("Unauthorized");
  }
}

export async function createArticleAction(data: ArticleFormData) {
  await requireAuth();
  
  // Validate input
  const parsed = ArticleSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid article data");
  }

  // Check unique slug
  const existing = await articlesAdminRepository.getArticleBySlug(parsed.data.slug);
  if (existing) {
    throw new Error("Slug already in use");
  }

  const article = await articlesAdminRepository.createArticle(parsed.data);
  
  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  
  return article.id;
}

export async function updateArticleAction(id: string, data: ArticleFormData) {
  await requireAuth();
  
  const parsed = ArticleSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid article data");
  }

  // Check unique slug (excluding current article)
  const existing = await articlesAdminRepository.getArticleBySlug(parsed.data.slug, id);
  if (existing) {
    throw new Error("Slug already in use by another article");
  }

  await articlesAdminRepository.updateArticle(id, parsed.data);
  
  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}`);
  revalidatePath("/articles");
  revalidatePath(`/articles/${parsed.data.slug}`);
}

export async function deleteArticleAction(id: string) {
  await requireAuth();
  
  await articlesAdminRepository.deleteArticle(id);
  
  revalidatePath("/admin/articles");
  revalidatePath("/articles");
}

export async function duplicateArticleAction(id: string) {
  await requireAuth();
  
  const existing = await articlesAdminRepository.getArticle(id);
  if (!existing) {
    throw new Error("Article not found");
  }

  const newArticleData: ArticleFormData = {
    ...existing,
    title: { id: `${existing.title.id} (Copy)`, en: `${existing.title.en || existing.title.id} (Copy)` },
    slug: `${existing.slug}-copy-${Date.now()}`,
    status: "Draft" as const, // Reset to Draft
  };

  const article = await articlesAdminRepository.createArticle(newArticleData);
  revalidatePath("/admin/articles");
  
  return article.id;
}
