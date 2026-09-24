import { getAdminDb, serializeFirestoreData } from "@/lib/firebase/admin";
import { Article, ArticleFormData } from "@/lib/validations/article";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION_NAME = "articles";

/**
 * Articles Repository (Admin-side)
 * Uses firebase-admin to access Firestore with full privileges.
 */
export const articlesAdminRepository = {
  
  async getArticles(): Promise<Article[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get();
      return snapshot.docs.map(doc => serializeFirestoreData({
        id: doc.id,
        ...doc.data()
      } as Article));
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured. Please set FIREBASE_PRIVATE_KEY to connect to Firestore.");
      }
      throw error;
    }
  },

  async getArticle(id: string): Promise<Article | null> {
    try {
      const db = getAdminDb();
      const doc = await db.collection(COLLECTION_NAME).doc(id).get();
      if (!doc.exists) return null;
      return serializeFirestoreData({ id: doc.id, ...doc.data() } as Article);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async getArticleBySlug(slug: string, excludeId?: string): Promise<Article | null> {
    try {
      const db = getAdminDb();
      const query = db.collection(COLLECTION_NAME).where("slug", "==", slug);
      const snapshot = await query.get();
      
      const docs = snapshot.docs.map(doc => serializeFirestoreData({ id: doc.id, ...doc.data() } as Article));
      if (excludeId) {
        return docs.find(doc => doc.id !== excludeId) || null;
      }
      return docs[0] || null;
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async createArticle(data: ArticleFormData): Promise<Article> {
    try {
      const db = getAdminDb();
      const docRef = db.collection(COLLECTION_NAME).doc();
      
      const articleData = {
        ...data,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        ...(data.status === "Published" ? { publishedAt: FieldValue.serverTimestamp() } : {})
      };
      
      await docRef.set(articleData);
      
      return serializeFirestoreData({
        id: docRef.id,
        ...articleData
      } as unknown as Article);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async updateArticle(id: string, data: Partial<ArticleFormData>): Promise<void> {
    try {
      const db = getAdminDb();
      const docRef = db.collection(COLLECTION_NAME).doc(id);
      
      const updateData: Record<string, unknown> = {
        ...data,
        updatedAt: FieldValue.serverTimestamp(),
      };
      
      if (data.status === "Published") {
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

  async deleteArticle(id: string): Promise<void> {
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
