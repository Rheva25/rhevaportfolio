import { getAdminDb, serializeFirestoreData } from "@/lib/firebase/admin";
import { Template, TemplateFormData } from "@/lib/validations/template";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION_NAME = "templates";

export const templatesAdminRepository = {
  
  async getTemplates(): Promise<Template[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get();
      return snapshot.docs.map(doc => serializeFirestoreData({
        id: doc.id,
        ...doc.data()
      } as Template));
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async getTemplate(id: string): Promise<Template | null> {
    try {
      const db = getAdminDb();
      const doc = await db.collection(COLLECTION_NAME).doc(id).get();
      if (!doc.exists) return null;
      return serializeFirestoreData({ id: doc.id, ...doc.data() } as Template);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async createTemplate(data: TemplateFormData): Promise<Template> {
    try {
      const db = getAdminDb();
      const docRef = db.collection(COLLECTION_NAME).doc();
      
      const templateData = {
        ...data,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        ...(data.visibility === "Published" ? { publishedAt: FieldValue.serverTimestamp() } : {})
      };
      
      await docRef.set(templateData);
      
      return serializeFirestoreData({
        id: docRef.id,
        ...templateData
      } as unknown as Template);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async updateTemplate(id: string, data: Partial<TemplateFormData>): Promise<void> {
    try {
      const db = getAdminDb();
      const docRef = db.collection(COLLECTION_NAME).doc(id);
      
      const updateData: Record<string, unknown> = {
        ...data,
        updatedAt: FieldValue.serverTimestamp(),
      };
      
      if (data.visibility === "Published") {
        updateData.publishedAt = FieldValue.serverTimestamp();
      }
      
      await docRef.update(updateData);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async deleteTemplate(id: string): Promise<void> {
    try {
      const db = getAdminDb();
      await db.collection(COLLECTION_NAME).doc(id).delete();
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },
};
