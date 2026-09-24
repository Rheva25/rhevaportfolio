import { getAdminDb, serializeFirestoreData } from "@/lib/firebase/admin";
import { SiteSettings, SiteSettingsFormData, SiteSettingsSchema } from "@/lib/validations/settings";
import { mapSettings } from "./mappers";
import { FieldValue } from "firebase-admin/firestore";

const SETTINGS_COLLECTION = "settings";
const SITE_DOCUMENT = "site";

/**
 * Settings Repository (Admin-side)
 * Uses firebase-admin to access Firestore with full privileges.
 */
export const settingsAdminRepository = {
  
  async getSiteSettings(): Promise<SiteSettings | null> {
    try {
      const db = getAdminDb();
      const doc = await db.collection(SETTINGS_COLLECTION).doc(SITE_DOCUMENT).get();
      
      if (!doc.exists) {
        // Return default constructed schema if no document exists yet
        const defaultSettings: SiteSettingsFormData = {
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
        
        return {
          ...defaultSettings,
          updatedAt: null,
          updatedBy: "system"
        } as unknown as SiteSettings;
      }
      
      return mapSettings(serializeFirestoreData(doc.data() || {}) as Record<string, unknown>);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured. Please set FIREBASE_PRIVATE_KEY to connect to Firestore.");
      }
      throw error;
    }
  },

  async updateSiteSettings(data: SiteSettingsFormData, updatedBy: string): Promise<void> {
    try {
      const db = getAdminDb();
      const docRef = db.collection(SETTINGS_COLLECTION).doc(SITE_DOCUMENT);
      
      const updateData = {
        ...data,
        updatedBy,
        updatedAt: FieldValue.serverTimestamp(),
      };
      
      await docRef.set(updateData, { merge: true });
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },
};
