import * as z from "zod";

export const LocalizedStringSchema = z.object({
  id: z.string().default(""),
  en: z.string().default(""),
});

export const RequiredLocalizedStringSchema = z.object({
  id: z.string().min(1, "Indonesian text is required"),
  en: z.string().default(""), // English is allowed to be empty during draft, fallback will be used
});
