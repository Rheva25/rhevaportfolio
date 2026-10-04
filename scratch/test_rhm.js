const { z } = require('zod');

// ... (abbreviated schema)
const SiteSettingsSchema = z.object({
  seo: z.object({
    ogImage: z.object({
      url: z.string().url("Must be a valid URL").or(z.literal("")),
      alt: z.string().default("")
    }).nullable().default(null),
    favicon: z.object({
      url: z.string().url("Must be a valid URL").or(z.literal("")),
      alt: z.string().default("")
    }).nullable().default(null),
  })
});
