import { getAdminDb, serializeFirestoreData } from "../firebase/admin";
import { Template } from "../validations/template";
import { mapTemplate } from "./mappers";

const COLLECTION_NAME = "templates";

export const templateRepository = {
  async getPublicTemplates(limitCount?: number): Promise<Template[]> {
    try {
      const db = getAdminDb();
      let query: FirebaseFirestore.Query = db.collection(COLLECTION_NAME)
        .where("visibility", "==", "Published")
        .orderBy("createdAt", "desc");
        
      if (limitCount) {
        query = query.limit(limitCount);
      }
      
      const snapshot = await query.get();
      
      return snapshot.docs.map(doc => mapTemplate(serializeFirestoreData({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching templates:", error);
      return [];
    }
  },

  async getTemplateBySlug(slug: string): Promise<Template | null> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME)
        .where("slug", "==", slug)
        .where("visibility", "==", "Published")
        .limit(1)
        .get();
      
      if (snapshot.empty) return null;
      
      const doc = snapshot.docs[0];
      return mapTemplate(serializeFirestoreData({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching template by slug:", error);
      return null;
    }
  }
};
