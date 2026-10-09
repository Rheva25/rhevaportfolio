import * as z from "zod";

export const QuoteSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  quote: z.string().min(1, "Quote is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().default(""),
  status: z.enum(["Draft", "Published"]).default("Draft"),
});

export type QuoteFormData = z.infer<typeof QuoteSchema>;

export interface Quote extends QuoteFormData {
  id: string;
  createdAt: number;
  updatedAt: number;
}
