import * as z from "zod";
import { LocalizedStringSchema, RequiredLocalizedStringSchema } from "./common";

export const ProjectSchema = z.object({
  title: RequiredLocalizedStringSchema,
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  shortDescription: RequiredLocalizedStringSchema,
  description: RequiredLocalizedStringSchema,
  
  category: z.string().min(1, "Category is required"),
  
  status: z.enum(["Completed", "In Progress", "Maintenance", "Archived"]),
  visibility: z.enum(["Draft", "Published", "Archived"]),
  featured: z.boolean().default(false),
  year: z.coerce.number().min(2000).max(2100),
  
  technologies: z.array(z.string()).default([]),
  
  heroImage: z.object({
    url: z.string().url("Must be a valid URL").or(z.literal("")),
    alt: z.string()
  }).nullable(),
  
  gallery: z.array(
    z.object({
      url: z.string().url("Must be a valid URL").or(z.literal("")),
      alt: z.string(),
      caption: z.string().optional(),
      order: z.coerce.number().default(0)
    })
  ).default([]),
  
  overview: LocalizedStringSchema,
  problem: LocalizedStringSchema,
  solution: LocalizedStringSchema,
  features: z.array(LocalizedStringSchema).default([]),
  process: z.array(LocalizedStringSchema).default([]),
  challenges: LocalizedStringSchema,
  outcome: LocalizedStringSchema,
  
  links: z.array(
    z.object({
      label: LocalizedStringSchema,
      url: z.string().url("Must be a valid URL")
    })
  ).default([]),
  
  seoTitle: LocalizedStringSchema,
  seoDescription: LocalizedStringSchema,
});

export type ProjectFormData = z.input<typeof ProjectSchema>;

export interface Project extends ProjectFormData {
  id: string;
  createdAt: unknown; // Using unknown for Firebase Timestamp compatibility
  updatedAt: unknown;
}
