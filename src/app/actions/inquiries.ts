"use server";

import { inquiriesAdminRepository } from "@/lib/repositories/inquiriesAdmin";
import { InquirySchema, InquiryFormData } from "@/lib/validations/inquiry";
import { verifySuperadmin } from "@/lib/auth/admin";
import { revalidatePath } from "next/cache";
import { checkExplicitContent } from "@/lib/utils/moderation";

/**
 * Checks authorization. Throws if not authorized.
 */
async function requireAuth() {
  const { isAuthorized } = await verifySuperadmin();
  if (!isAuthorized) {
    throw new Error("Unauthorized");
  }
}

export async function createInquiryAction(data: InquiryFormData) {
  // Only superadmins can manually create inquiries from the admin panel for now
  await requireAuth();
  
  // Validate input
  const parsed = InquirySchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid inquiry data");
  }

  const inquiry = await inquiriesAdminRepository.createInquiry(parsed.data);
  
  revalidatePath("/admin/inquiries");
  
  return inquiry.id;
}

export async function updateInquiryAction(id: string, data: InquiryFormData) {
  await requireAuth();
  
  const parsed = InquirySchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid inquiry data");
  }

  await inquiriesAdminRepository.updateInquiry(id, parsed.data);
  
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
}

export async function deleteInquiryAction(id: string) {
  await requireAuth();
  
  await inquiriesAdminRepository.deleteInquiry(id);
  
  revalidatePath("/admin/inquiries");
}

export async function updateInquiryStatusAction(id: string, status: InquiryFormData["status"]) {
  await requireAuth();
  
  await inquiriesAdminRepository.updateInquiry(id, { status });
  
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
}

export async function submitPublicInquiryAction(data: Partial<InquiryFormData>) {
  // Public submission, no auth required, but strict validation.
  // Force secure defaults for public submissions
  const safeData: InquiryFormData = {
    ...data,
    status: "New",
    internalNotes: "",
  } as InquiryFormData;

  const parsed = InquirySchema.safeParse(safeData);
  if (!parsed.success) {
    throw new Error("Invalid inquiry data");
  }

  // AI Content Moderation for spam and explicit content
  const isExplicit = await checkExplicitContent(parsed.data.description, parsed.data.name);
  if (isExplicit) {
    console.warn(`Blocked explicit inquiry from ${parsed.data.name} (${parsed.data.email})`);
    throw new Error("Your message contains inappropriate content and has been blocked by our moderation system.");
  }

  const inquiry = await inquiriesAdminRepository.createInquiry(parsed.data);
  return inquiry.id;
}
