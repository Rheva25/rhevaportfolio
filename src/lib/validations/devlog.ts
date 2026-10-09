import { z } from "zod";

// Wait, prompt says: "language: 'id' | 'en' | 'mixed';" 
// Let's stick to the prompt's schema.

export const DevlogEntrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  contentMarkdown: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),

  language: z.enum(["id", "en", "mixed"]).default("mixed"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),

  featuredQuote: z.string().min(1, "Featured quote is required"),
  quoteAttribution: z.string().optional(),

  status: z.enum(["draft", "review", "published"]).default("draft"),

  thumbnailPath: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  thumbnailPreset: z.enum(["literary-minimalist"]).default("literary-minimalist"),
});

export type DevlogEntryFormData = z.infer<typeof DevlogEntrySchema>;

export type DevlogEntry = DevlogEntryFormData & {
  id: string;
  createdAt: any;
  updatedAt: any;
  publishedAt?: any;
};
