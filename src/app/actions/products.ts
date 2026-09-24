"use server";

import { productsAdminRepository } from "@/lib/repositories/productsAdmin";
import { ProductSchema, ProductFormData } from "@/lib/validations/product";
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

export async function createProductAction(data: ProductFormData) {
  await requireAuth();
  
  // Validate input
  const parsed = ProductSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid product data");
  }

  // Check unique slug
  const existing = await productsAdminRepository.getProductBySlug(parsed.data.slug);
  if (existing) {
    throw new Error("Slug already in use");
  }

  const product = await productsAdminRepository.createProduct(parsed.data);
  
  revalidatePath("/admin/apps");
  revalidatePath("/apps");
  
  return product.id;
}

export async function updateProductAction(id: string, data: ProductFormData) {
  await requireAuth();
  
  const parsed = ProductSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid product data");
  }

  // Check unique slug (excluding current product)
  const existing = await productsAdminRepository.getProductBySlug(parsed.data.slug, id);
  if (existing) {
    throw new Error("Slug already in use by another product");
  }

  await productsAdminRepository.updateProduct(id, parsed.data);
  
  revalidatePath("/admin/apps");
  revalidatePath(`/admin/apps/${id}`);
  revalidatePath("/apps");
  revalidatePath(`/apps/${parsed.data.slug}`);
}

export async function deleteProductAction(id: string) {
  await requireAuth();
  
  await productsAdminRepository.deleteProduct(id);
  
  revalidatePath("/admin/apps");
  revalidatePath("/apps");
}

export async function duplicateProductAction(id: string) {
  await requireAuth();
  
  const existing = await productsAdminRepository.getProduct(id);
  if (!existing) {
    throw new Error("Product not found");
  }

  const newProductData: ProductFormData = {
    ...existing,
    name: { id: `${existing.name.id} (Copy)`, en: `${existing.name.en || existing.name.id} (Copy)` },
    slug: `${existing.slug}-copy-${Date.now()}`,
    status: "In Development" as const, // Reset to In Development
    visibility: "Draft" as const,
  };

  const product = await productsAdminRepository.createProduct(newProductData);
  revalidatePath("/admin/apps");
  
  return product.id;
}
