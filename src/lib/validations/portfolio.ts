import * as z from "zod";
import { LocalizedStringSchema, RequiredLocalizedStringSchema } from "./common";

export const PortfolioSchema = z.object({
  title: RequiredLocalizedStringSchema,
  url: z.string().url("Valid URL is required"),
  role: z.string().min(1, "Role/Tag is required"),
  description: LocalizedStringSchema,
  thumbnailUrl: z.string().default(""),
  status: z.enum(["Draft", "Published"]).default("Draft"),
  order: z.number().default(0),
});

export type PortfolioFormData = z.infer<typeof PortfolioSchema>;

export interface Portfolio extends PortfolioFormData {
  id: string;
  createdAt: unknown;
  updatedAt: unknown;
  publishedAt?: unknown;
}
