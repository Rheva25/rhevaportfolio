import { getAdminDb, serializeFirestoreData } from "@/lib/firebase/admin";
import { Product, ProductFormData } from "@/lib/validations/product";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION_NAME = "products";

/**
 * Products Repository (Admin-side)
 * Uses firebase-admin to access Firestore with full privileges.
 */
export const productsAdminRepository = {
  
  async getProducts(): Promise<Product[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get();
      return snapshot.docs.map(doc => serializeFirestoreData({
        id: doc.id,
        ...doc.data()
      } as Product));
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured. Please set FIREBASE_PRIVATE_KEY to connect to Firestore.");
      }
      throw error;
    }
  },

  async getProduct(id: string): Promise<Product | null> {
    try {
      const db = getAdminDb();
      const doc = await db.collection(COLLECTION_NAME).doc(id).get();
      if (!doc.exists) return null;
      return serializeFirestoreData({ id: doc.id, ...doc.data() } as Product);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async getProductBySlug(slug: string, excludeId?: string): Promise<Product | null> {
    try {
      const db = getAdminDb();
      const query = db.collection(COLLECTION_NAME).where("slug", "==", slug);
      const snapshot = await query.get();
      
      const docs = snapshot.docs.map(doc => serializeFirestoreData({ id: doc.id, ...doc.data() } as Product));
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

  async createProduct(data: ProductFormData): Promise<Product> {
    try {
      const db = getAdminDb();
      const docRef = db.collection(COLLECTION_NAME).doc();
      
      const productData = {
        ...data,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        ...(data.visibility === "Published" ? { publishedAt: FieldValue.serverTimestamp() } : {})
      };
      
      await docRef.set(productData);
      
      return serializeFirestoreData({
        id: docRef.id,
        ...productData
      } as unknown as Product);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async updateProduct(id: string, data: Partial<ProductFormData>): Promise<void> {
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

  async deleteProduct(id: string): Promise<void> {
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
