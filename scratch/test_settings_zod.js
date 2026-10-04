const { z } = require('zod');

const LocalizedStringSchema = z.object({
  id: z.string().default(""),
  en: z.string().default(""),
});

const RequiredLocalizedStringSchema = z.object({
  id: z.string().min(1, "Indonesian text is required"),
  en: z.string().default(""),
});

const SiteSettingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  siteDescription: RequiredLocalizedStringSchema,
  siteUrl: z.string().url("Must be a valid URL"),
  language: z.string().default("en"),
  timezone: z.string().default("UTC"),
  dateFormat: z.string().default("MMM dd, yyyy"),

  profile: z.object({
    fullName: z.string().min(1, "Full name is required"),
    professionalTitle: RequiredLocalizedStringSchema,
    shortBio: RequiredLocalizedStringSchema,
    profilePhoto: z.object({
      url: z.string().url("Must be a valid URL").or(z.literal("")),
      alt: z.string()
    }).nullable(),
    location: z.string().default(""),
    email: z.string().email("Must be a valid email"),
    phone: z.string().default(""),
    professionalFocus: RequiredLocalizedStringSchema,
  }),

  contact: z.object({
    primaryEmail: z.string().email("Must be a valid email"),
    whatsapp: z.string().default(""),
    secondaryEmail: z.string().email("Must be a valid email").or(z.literal("")),
    serviceArea: z.string().default(""),
    preferredContactMethod: z.string().default(""),
    contactFormEnabled: z.boolean().default(true),
    successMessage: LocalizedStringSchema,
  }),

  seo: z.object({
    defaultTitle: RequiredLocalizedStringSchema,
    defaultDescription: RequiredLocalizedStringSchema,
    keywords: z.array(z.string()).default([]),
    ogImage: z.object({
      url: z.string().url("Must be a valid URL").or(z.literal("")),
      alt: z.string()
    }).nullable(),
    favicon: z.object({
      url: z.string().url("Must be a valid URL").or(z.literal("")),
      alt: z.string()
    }).nullable(),
  }),

  socialLinks: z.array(
    z.object({
      platform: z.string().min(1, "Platform is required"),
      url: z.string().url("Must be a valid URL")
    })
  ).default([]),

  publicSite: z.object({
    navigation: z.array(
      z.object({
        label: LocalizedStringSchema,
        href: z.string().min(1, "Href is required"),
        visible: z.boolean().default(true),
        order: z.coerce.number().default(0)
      })
    ).default([]),

    homepageSections: z.array(
      z.object({
        key: z.string().min(1, "Key is required"),
        label: LocalizedStringSchema,
        visible: z.boolean().default(true),
        order: z.coerce.number().default(0)
      })
    ).default([]),
  }),

  contentDefaults: z.object({
    project: z.object({
      category: z.string().default("Web Development"),
      status: z.string().default("In Progress"),
    }),
    app: z.object({
      category: z.string().default("SaaS"),
      status: z.string().default("In Development"),
      pricingModel: z.string().default("Fixed Price"),
    }),
    article: z.object({
      category: z.string().default("Technology"),
      status: z.string().default("Draft"),
      author: z.string().default(""),
    }),
  }),
});

const defaultData = {
  siteName: "Rheva Developer Platform",
  siteDescription: { id: "Platform developer modern", en: "Modern developer platform" },
  siteUrl: "https://rheva.id",
  language: "en",
  timezone: "UTC",
  dateFormat: "MMM dd, yyyy",
  profile: {
    fullName: "Rheva",
    professionalTitle: { id: "Software Engineer", en: "Software Engineer" },
    shortBio: { id: "Saya membangun produk digital", en: "I build digital products" },
    profilePhoto: null,
    location: "Indonesia",
    email: "hello@rheva.id",
    phone: "",
    professionalFocus: { id: "Pengembangan Web", en: "Web Development" }
  },
  contact: {
    primaryEmail: "hello@rheva.id",
    whatsapp: "",
    secondaryEmail: "",
    serviceArea: "Global",
    preferredContactMethod: "Email",
    contactFormEnabled: true,
    successMessage: { id: "Pesan terkirim", en: "Message sent" }
  },
  seo: {
    defaultTitle: { id: "Rheva | Developer Platform", en: "Rheva | Developer Platform" },
    defaultDescription: { id: "Platform pengembang modern", en: "Modern developer platform" },
    keywords: [],
    ogImage: null,
    favicon: null
  },
  socialLinks: [],
  publicSite: {
    navigation: [],
    homepageSections: []
  },
  contentDefaults: {
    project: { category: "Web Development", status: "In Progress" },
    app: { category: "SaaS", status: "In Development", pricingModel: "Fixed Price" },
    article: { category: "Technology", status: "Draft", author: "Rheva" }
  }
};

const res = SiteSettingsSchema.safeParse(defaultData);
console.log(res.success ? "SUCCESS" : JSON.stringify(res.error.format(), null, 2));

