import { getAdminDb } from "@/lib/firebase/admin";
import { Quote } from "@/lib/validations/quotes";

const COLLECTION = "quotes";

export const quotesPublicRepository = {
  async getPublished(): Promise<Quote[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION)
        .where("status", "==", "Published")
        .orderBy("createdAt", "desc")
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quote));
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async getBySlug(slug: string): Promise<Quote | null> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION)
        .where("slug", "==", slug)
        .where("status", "==", "Published")
        .limit(1)
        .get();
      
      if (snapshot.empty) return null;
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Quote;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
};
