export type LocalizedString = {
  id: string;
  en: string;
};

export interface Project {
  id: string;
  title: LocalizedString;
  slug: string;
  shortDescription: LocalizedString;
  description: LocalizedString;
  category: string;
  status: "Completed" | "In Progress" | "Maintenance" | "Archived";
  featured: boolean;
  visibility: "Draft" | "Published" | "Archived";
  year: number;
  technologies: string[];
  heroImage: {
    url: string;
    alt: string;
  } | null;
  gallery: {
    url: string;
    alt: string;
    caption?: string;
    order: number;
  }[];
  overview: LocalizedString;
  problem: LocalizedString;
  solution: LocalizedString;
  features: LocalizedString[];
  process: LocalizedString[];
  challenges: LocalizedString;
  outcome: LocalizedString;
  links: {
    label: LocalizedString;
    url: string;
  }[];
  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface AppModel {
  id: string;
  name: LocalizedString;
  slug: string;
  shortDescription: LocalizedString;
  description: LocalizedString;
  category: string;
  status:
    | "Available"
    | "In Development"
    | "Coming Soon"
    | "Custom Deployment"
    | "Request Access"
    | "Archived";
  visibility: "Draft" | "Published" | "Archived";
  featured: boolean;
  pricingModel:
    | "Fixed Price"
    | "Request Pricing"
    | "Custom Deployment"
    | "Request Access"
    | "Free / Open"
    | "Coming Soon";
  platform: string;
  technologies: string[];
  logo: {
    url: string;
    alt: string;
  } | null;
  heroImage: {
    url: string;
    alt: string;
  } | null;
  gallery: {
    url: string;
    alt: string;
    caption?: string;
    order: number;
  }[];
  benefits: LocalizedString[];
  features: LocalizedString[];
  requirements: LocalizedString[];
  deployment: LocalizedString;
  links: {
    label: LocalizedString;
    url: string;
  }[];
  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
  ogImage: {
    url: string;
    alt: string;
  } | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  publishedAt?: Date | null;
}

export interface Article {
  id: string;
  title: LocalizedString;
  slug: string;
  excerpt: LocalizedString;
  content: LocalizedString;
  coverImage: {
    url: string;
    alt: string;
  } | null;
  category: string;
  tags: string[];
  author: string;
  status: "Draft" | "Published" | "Scheduled" | "Archived";
  featured: boolean;
  publishedAt?: Date | null;
  updatedAt: Date | null;
  createdAt: Date | null;
  readingTime: number;
  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  organization: string;
  inquiryType:
    | "General Inquiry"
    | "Custom Software"
    | "Web Application"
    | "System Modernization"
    | "UI/UX & Product Design"
    | "Software Deployment"
    | "Product Access"
    | "Consultation"
    | "Other";
  projectName: string;
  budgetContext: string;
  timeline: string;
  description: string;
  attachment: {
    url: string;
    name: string;
    type: string;
    size: number;
  } | null;
  source: string;
  status:
    | "New"
    | "Reviewing"
    | "Contacted"
    | "In Discussion"
    | "Converted"
    | "Closed";
  internalNotes?: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface MediaAsset {
  id: string;
  fileName: string;
  storagePath: string;
  downloadURL: string;
  mimeType: string;
  fileSize: number;
  width: number | null;
  height: number | null;
  title: LocalizedString;
  altText: LocalizedString;
  caption: LocalizedString;
  description: LocalizedString;
  tags: string[];
  usage: {
    type:
      | "project"
      | "product"
      | "article"
      | "profile"
      | "seo"
      | "favicon"
      | "inquiry";
    entityId: string;
    entityName: string;
    field: string;
  }[];
  uploadedBy: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

// Media is an alias to match previous index.ts usage
export type Media = MediaAsset;

export interface SiteSettings {
  siteName: string;
  siteDescription: LocalizedString;
  siteUrl: string;
  language: string;
  timezone: string;
  dateFormat: string;

  profile: {
    fullName: string;
    professionalTitle: LocalizedString;
    shortBio: LocalizedString;
    profilePhoto: {
      url: string;
      alt: string;
    } | null;
    location: string;
    email: string;
    phone: string;
    professionalFocus: LocalizedString;
  };

  contact: {
    primaryEmail: string;
    whatsapp: string;
    secondaryEmail: string;
    serviceArea: string;
    preferredContactMethod: string;
    contactFormEnabled: boolean;
    successMessage: LocalizedString;
  };

  seo: {
    defaultTitle: LocalizedString;
    defaultDescription: LocalizedString;
    keywords: string[];
    ogImage: {
      url: string;
      alt: string;
    } | null;
    favicon: {
      url: string;
      alt: string;
    } | null;
  };

  socialLinks: {
    platform: string;
    url: string;
  }[];

  publicSite: {
    navigation: {
      label: LocalizedString;
      href: string;
      visible: boolean;
      order: number;
    }[];

    homepageSections: {
      key: string;
      label: LocalizedString;
      visible: boolean;
      order: number;
    }[];
  };

  contentDefaults: {
    project: {
      category: string;
      status: string;
    };

    app: {
      category: string;
      status: string;
      pricingModel: string;
    };

    article: {
      category: string;
      status: string;
      author: string;
    };
  };

  updatedAt: Date | null;
  updatedBy: string;
}
