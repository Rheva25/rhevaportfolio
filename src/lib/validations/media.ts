import * as z from "zod";

export const MediaUsageSchema = z.object({
  type: z.enum([
    "project",
    "product",
    "article",
    "profile",
    "seo",
    "favicon",
    "inquiry"
  ]),
  entityId: z.string(),
  entityName: z.string(),
  field: z.string(),
});

export const MediaAssetSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  storagePath: z.string().min(1, "Storage path is required"),
  downloadURL: z.string().url("Must be a valid URL"),
  
  mimeType: z.enum([
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/svg+xml"
  ]),
  fileSize: z.number().min(1, "File must not be empty"),
  
  width: z.number().nullable().default(null),
  height: z.number().nullable().default(null),
  
  title: z.string().default(""),
  altText: z.string().default(""),
  caption: z.string().default(""),
  description: z.string().default(""),
  
  tags: z.array(z.string()).default([]),
  
  usage: z.array(MediaUsageSchema).default([]),
  
  uploadedBy: z.string().min(1, "Uploader identity required"),
});

export type MediaAssetFormData = z.infer<typeof MediaAssetSchema>;
export type MediaUsage = z.infer<typeof MediaUsageSchema>;

export interface MediaAsset extends MediaAssetFormData {
  id: string;
  createdAt: unknown;
  updatedAt: unknown;
}
