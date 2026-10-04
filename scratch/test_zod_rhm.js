const { z } = require('zod');
const LocalizedStringSchema = z.object({
  id: z.string().default(""),
  en: z.string().default(""),
});

const SiteSettingsSchema = z.object({
  seo: z.object({
    ogImage: z.object({
      url: z.string().url("Must be a valid URL").or(z.literal("")),
      alt: z.string()
    }).nullable(),
  })
});

const data = {
  seo: {
    ogImage: { url: "" } // Simulated React Hook Form data when alt is missing
  }
};

const res = SiteSettingsSchema.safeParse(data);
console.log(res.success ? "SUCCESS" : JSON.stringify(res.error.format(), null, 2));
