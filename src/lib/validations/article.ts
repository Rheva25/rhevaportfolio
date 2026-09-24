import * as z from "zod";
import { LocalizedStringSchema, RequiredLocalizedStringSchema } from "./common";

export const ArticleSchema = z.object({
  title: RequiredLocalizedStringSchema,
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  excerpt: RequiredLocalizedStringSchema,
  content: RequiredLocalizedStringSchema,
  
  coverImage: z.object({
    url: z.string().url("Must be a valid URL").or(z.literal("")),
    alt: z.string()
  }).nullable(),
  
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  author: z.string().min(1, "Author is required"),
  
  status: z.enum(["Draft", "Published", "Scheduled", "Archived"]),
  featured: z.boolean().default(false),
  
  seoTitle: LocalizedStringSchema,
  seoDescription: LocalizedStringSchema,
  readingTime: z.number().int().min(1).default(5),
});

export type ArticleFormData = z.input<typeof ArticleSchema>;

export interface Article extends ArticleFormData {
  id: string;
  createdAt: unknown;
  updatedAt: unknown;
  publishedAt?: unknown | null;
}
