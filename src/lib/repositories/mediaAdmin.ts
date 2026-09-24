import { getAdminDb, serializeFirestoreData } from "@/lib/firebase/admin";
import { MediaAsset, MediaAssetFormData } from "@/lib/validations/media";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION_NAME = "media";

/**
 * Media Repository (Admin-side)
 * Uses firebase-admin to access Firestore with full privileges.
 */
export const mediaAdminRepository = {
  
  async getMediaAssets(): Promise<MediaAsset[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get();
      return snapshot.docs.map(doc => serializeFirestoreData({
        id: doc.id,
        ...doc.data()
      } as MediaAsset));
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured. Please set FIREBASE_PRIVATE_KEY to connect to Firestore.");
      }
      throw error;
    }
  },

  async getMediaAsset(id: string): Promise<MediaAsset | null> {
    try {
      const db = getAdminDb();
      const doc = await db.collection(COLLECTION_NAME).doc(id).get();
      if (!doc.exists) return null;
      return serializeFirestoreData({ id: doc.id, ...doc.data() } as MediaAsset);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async createMediaAsset(data: MediaAssetFormData): Promise<MediaAsset> {
    try {
      const db = getAdminDb();
      const docRef = db.collection(COLLECTION_NAME).doc();
      
      const mediaData = {
        ...data,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      };
      
      await docRef.set(mediaData);
      
      return serializeFirestoreData({
        id: docRef.id,
        ...mediaData
      } as unknown as MediaAsset);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async updateMediaAsset(id: string, data: Partial<MediaAssetFormData>): Promise<void> {
    try {
      const db = getAdminDb();
      const docRef = db.collection(COLLECTION_NAME).doc(id);
      
      const updateData = {
        ...data,
        updatedAt: FieldValue.serverTimestamp(),
      };
      
      await docRef.update(updateData);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async deleteMediaAsset(id: string): Promise<void> {
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
