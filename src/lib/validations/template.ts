import * as z from "zod";
import { LocalizedStringSchema, RequiredLocalizedStringSchema } from "./common";

export const TemplateSchema = z.object({
  name: RequiredLocalizedStringSchema,
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  shortDescription: RequiredLocalizedStringSchema,
  description: RequiredLocalizedStringSchema,
  
  category: z.string().default("Frontend Template"),
  
  status: z.enum([
    "Available", 
    "Coming Soon", 
    "Archived"
  ]),
  visibility: z.enum(["Draft", "Published", "Archived"]),
  featured: z.boolean().default(false),
  
  pricingType: z.enum(["Free", "Paid"]),
  price: z.string().default("Free"), // e.g., "Free", "$49", "Rp 150.000"
  
  technologies: z.array(z.string()).default([]),
  
  demoUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  sourceUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  
  thumbnail: z.object({
    url: z.string().url("Must be a valid URL").or(z.literal("")),
    alt: z.string()
  }).nullable(),
  
  features: z.array(LocalizedStringSchema).default([]),
});

export type TemplateFormData = z.input<typeof TemplateSchema>;

export interface Template extends TemplateFormData {
  id: string;
  createdAt: unknown;
  updatedAt: unknown;
  publishedAt?: unknown | null;
}
