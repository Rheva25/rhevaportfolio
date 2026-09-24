import { getAdminDb, serializeFirestoreData } from "@/lib/firebase/admin";
import { Inquiry, InquiryFormData } from "@/lib/validations/inquiry";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION_NAME = "inquiries";

/**
 * Inquiries Repository (Admin-side)
 * Uses firebase-admin to access Firestore with full privileges.
 */
export const inquiriesAdminRepository = {
  
  async getInquiries(): Promise<Inquiry[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get();
      return snapshot.docs.map(doc => serializeFirestoreData({
        id: doc.id,
        ...doc.data()
      } as Inquiry));
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured. Please set FIREBASE_PRIVATE_KEY to connect to Firestore.");
      }
      throw error;
    }
  },

  async getInquiry(id: string): Promise<Inquiry | null> {
    try {
      const db = getAdminDb();
      const doc = await db.collection(COLLECTION_NAME).doc(id).get();
      if (!doc.exists) return null;
      return serializeFirestoreData({ id: doc.id, ...doc.data() } as Inquiry);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async createInquiry(data: InquiryFormData): Promise<Inquiry> {
    try {
      const db = getAdminDb();
      const docRef = db.collection(COLLECTION_NAME).doc();
      
      const inquiryData = {
        ...data,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      };
      
      await docRef.set(inquiryData);
      
      return serializeFirestoreData({
        id: docRef.id,
        ...inquiryData
      } as unknown as Inquiry);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async updateInquiry(id: string, data: Partial<InquiryFormData>): Promise<void> {
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

  async deleteInquiry(id: string): Promise<void> {
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
