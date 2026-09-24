"use server";

import { mediaAdminRepository } from "@/lib/repositories/mediaAdmin";
import { MediaAssetSchema, MediaAssetFormData } from "@/lib/validations/media";
import { verifySuperadmin } from "@/lib/auth/admin";
import { revalidatePath } from "next/cache";
import { cloudinary } from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

/**
 * Checks authorization. Throws if not authorized.
 */
async function requireAuth() {
  const { isAuthorized } = await verifySuperadmin();
  if (!isAuthorized) {
    throw new Error("Unauthorized");
  }
}

export async function createMediaAssetAction(data: MediaAssetFormData) {
  await requireAuth();
  
  const parsed = MediaAssetSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid media asset data");
  }

  const asset = await mediaAdminRepository.createMediaAsset(parsed.data);
  
  revalidatePath("/admin/media");
  
  return asset.id;
}

export async function updateMediaAssetAction(id: string, data: Partial<MediaAssetFormData>) {
  await requireAuth();
  
  // Minimal validation for updates, assuming client passes valid partial schema
  await mediaAdminRepository.updateMediaAsset(id, data);
  
  revalidatePath("/admin/media");
}

export async function deleteMediaAssetAction(id: string) {
  await requireAuth();
  
  const asset = await mediaAdminRepository.getMediaAsset(id);
  if (!asset) {
    throw new Error("Media asset not found");
  }
  
  if (asset.usage && asset.usage.length > 0) {
    throw new Error("Cannot delete media asset because it is currently used by other records.");
  }
  
  // Delete from Cloudinary
  if (asset.storagePath) {
    try {
      await cloudinary.uploader.destroy(asset.storagePath);
    } catch (error) {
      console.error("Failed to delete from Cloudinary", error);
      // We continue to delete from Firestore even if Cloudinary fails, 
      // or we can throw. Throwing is safer for referential integrity.
      throw new Error("Failed to delete asset from Cloudinary");
    }
  }
  
  await mediaAdminRepository.deleteMediaAsset(id);
  
  revalidatePath("/admin/media");
}

export async function uploadMediaAction(formData: FormData) {
  await requireAuth();

  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file provided");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size exceeds 5MB limit.");
  }

  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
  if (!validTypes.includes(file.type)) {
    throw new Error("Invalid file type. Only JPG, PNG, WebP, and SVG are supported.");
  }

  // Convert File to ArrayBuffer, then to Buffer for Cloudinary upload stream
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "rheva-platform/media",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Failed to upload to Cloudinary"));
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });

  const mediaData: MediaAssetFormData = {
    fileName: file.name,
    storagePath: uploadResult.public_id, // Cloudinary public_id used as storagePath
    mimeType: file.type as "image/jpeg" | "image/png" | "image/webp" | "image/svg+xml",
    fileSize: file.size,
    downloadURL: uploadResult.secure_url,
    width: uploadResult.width || null,
    height: uploadResult.height || null,
    title: file.name,
    altText: "",
    caption: "",
    description: "",
    tags: [],
    usage: [],
    uploadedBy: "admin",
  };

  const parsed = MediaAssetSchema.safeParse(mediaData);
  if (!parsed.success) {
    // Attempt rollback on Cloudinary if validation fails
    await cloudinary.uploader.destroy(uploadResult.public_id).catch(console.error);
    throw new Error("Invalid media asset data mapping");
  }

  const asset = await mediaAdminRepository.createMediaAsset(parsed.data);
  revalidatePath("/admin/media");

  return asset.id;
}
