import { getAdminDb } from "@/lib/firebase/admin";
import { DevlogEntry, DevlogEntryFormData } from "@/lib/validations/devlog";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION_NAME = "devlogEntries";

export const devlogsAdminRepository = {
  async getDevlogs(): Promise<DevlogEntry[]> {
    const db = getAdminDb();
    const snapshot = await db.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as DevlogEntry[];
  },

  async getDevlog(id: string): Promise<DevlogEntry | null> {
    const db = getAdminDb();
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as DevlogEntry;
  },

  async createDevlog(data: DevlogEntryFormData): Promise<string> {
    const db = getAdminDb();
    
    // Check slug uniqueness
    const existing = await db.collection(COLLECTION_NAME).where("slug", "==", data.slug).get();
    if (!existing.empty) throw new Error("Slug already exists");

    const docData: any = {
      ...data,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (data.status === "published") {
      docData.publishedAt = FieldValue.serverTimestamp();
    }

    const docRef = await db.collection(COLLECTION_NAME).add(docData);
    return docRef.id;
  },

  async updateDevlog(id: string, data: Partial<DevlogEntryFormData>): Promise<void> {
    const db = getAdminDb();
    
    // Check slug uniqueness if slug changed
    if (data.slug) {
      const existing = await db.collection(COLLECTION_NAME).where("slug", "==", data.slug).get();
      if (!existing.empty && existing.docs[0].id !== id) {
        throw new Error("Slug already exists");
      }
    }

    const docData: any = {
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (data.status === "published") {
      const current = (await db.collection(COLLECTION_NAME).doc(id).get()).data();
      if (current?.status !== "published") {
        docData.publishedAt = FieldValue.serverTimestamp();
      }
    }

    await db.collection(COLLECTION_NAME).doc(id).update(docData);
  },

  async deleteDevlog(id: string): Promise<void> {
    const db = getAdminDb();
    await db.collection(COLLECTION_NAME).doc(id).delete();
  }
};
