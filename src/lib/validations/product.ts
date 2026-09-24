import * as z from "zod";
import { LocalizedStringSchema, RequiredLocalizedStringSchema } from "./common";

export const ProductSchema = z.object({
  name: RequiredLocalizedStringSchema,
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  shortDescription: RequiredLocalizedStringSchema,
  description: RequiredLocalizedStringSchema,
  
  category: z.string().min(1, "Category is required"),
  
  status: z.enum([
    "Available", 
    "In Development", 
    "Coming Soon", 
    "Custom Deployment", 
    "Request Access", 
    "Archived"
  ]),
  visibility: z.enum(["Draft", "Published", "Archived"]),
  featured: z.boolean().default(false),
  
  pricingModel: z.enum([
    "Fixed Price", 
    "Request Pricing", 
    "Custom Deployment", 
    "Request Access", 
    "Free / Open", 
    "Coming Soon"
  ]),
  platform: z.string().default(""),
  
  technologies: z.array(z.string()).default([]),
  
  logo: z.object({
    url: z.string().url("Must be a valid URL").or(z.literal("")),
    alt: z.string()
  }).nullable(),
  
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
  
  benefits: z.array(LocalizedStringSchema).default([]),
  features: z.array(LocalizedStringSchema).default([]),
  requirements: z.array(LocalizedStringSchema).default([]),
  deployment: LocalizedStringSchema,
  
  links: z.array(
    z.object({
      label: LocalizedStringSchema,
      url: z.string().url("Must be a valid URL")
    })
  ).default([]),
  
  seoTitle: LocalizedStringSchema,
  seoDescription: LocalizedStringSchema,
  
  ogImage: z.object({
    url: z.string().url("Must be a valid URL").or(z.literal("")),
    alt: z.string()
  }).nullable(),
});

export type ProductFormData = z.input<typeof ProductSchema>;

export interface Product extends ProductFormData {
  id: string;
  createdAt: unknown; // Using unknown for Firebase Timestamp compatibility client-side
  updatedAt: unknown;
  publishedAt?: unknown | null;
}
