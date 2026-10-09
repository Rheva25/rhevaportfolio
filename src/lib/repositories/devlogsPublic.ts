import { getAdminDb, serializeFirestoreData } from "@/lib/firebase/admin";
import { DevlogEntry } from "@/lib/validations/devlog";

const COLLECTION_NAME = "devlogEntries";

export const devlogsPublicRepository = {
  async getPublishedDevlogs(): Promise<DevlogEntry[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME)
        .where("status", "==", "published")
        .orderBy("publishedAt", "desc")
        .get();
        
      return snapshot.docs.map(doc => serializeFirestoreData({ id: doc.id, ...doc.data() }) as DevlogEntry);
    } catch (error) {
      console.error("Failed to fetch public devlogs", error);
      return [];
    }
  },

  async getPublishedDevlogBySlug(slug: string): Promise<DevlogEntry | null> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME)
        .where("slug", "==", slug)
        .where("status", "==", "published")
        .limit(1)
        .get();
        
      if (snapshot.empty) return null;
      return serializeFirestoreData({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() }) as DevlogEntry;
    } catch (error) {
      console.error(`Failed to fetch devlog slug ${slug}`, error);
      return null;
    }
  }
};
