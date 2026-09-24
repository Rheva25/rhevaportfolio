import { getAdminDb, serializeFirestoreData } from "../firebase/admin";
import { Article } from "../models";
import { mapArticle } from "./mappers";

const COLLECTION_NAME = "articles";

export const articleRepository = {
  /**
   * Retrieves all articles that are safe for public consumption.
   */
  async getPublicArticles(): Promise<Article[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME)
        .where("status", "==", "Published")
        .orderBy("publishedAt", "desc")
        .get();
        
      return snapshot.docs.map(doc => mapArticle(serializeFirestoreData({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Failed to fetch public articles:", error);
      return [];
    }
  },

  /**
   * Retrieves a single public article by slug.
   */
  async getPublicArticleBySlug(slug: string): Promise<Article | null> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME)
        .where("slug", "==", slug)
        .where("status", "==", "Published")
        .limit(1)
        .get();
        
      if (snapshot.empty) return null;
      const docData = snapshot.docs[0];
      return mapArticle(serializeFirestoreData({ id: docData.id, ...docData.data() }));
    } catch (error) {
      console.error("Failed to fetch public article by slug:", error);
      return null;
    }
  }
};
