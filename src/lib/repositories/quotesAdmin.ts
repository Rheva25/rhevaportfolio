import { getAdminDb } from "@/lib/firebase/admin";
import { Quote, QuoteFormData } from "@/lib/validations/quotes";

const COLLECTION = "quotes";

export const quotesAdminRepository = {
  async getAll(): Promise<Quote[]> {
    const db = getAdminDb();
    const snapshot = await db.collection(COLLECTION).orderBy("createdAt", "desc").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quote));
  },

  async getById(id: string): Promise<Quote | null> {
    const db = getAdminDb();
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Quote;
  },

  async create(data: QuoteFormData): Promise<string> {
    const db = getAdminDb();
    const docRef = db.collection(COLLECTION).doc();
    const now = Date.now();
    await docRef.set({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  },

  async update(id: string, data: Partial<QuoteFormData>): Promise<void> {
    const db = getAdminDb();
    await db.collection(COLLECTION).doc(id).update({
      ...data,
      updatedAt: Date.now(),
    });
  },

  async delete(id: string): Promise<void> {
    const db = getAdminDb();
    await db.collection(COLLECTION).doc(id).delete();
  }
};
