import { getAdminDb, serializeFirestoreData } from "../firebase/admin";
import { AppModel as Product } from "../models";
import { mapApp } from "./mappers";

const COLLECTION_NAME = "products";

export const productRepository = {
  /**
   * Retrieves all products that are safe for public consumption.
   */
  async getPublicProducts(): Promise<Product[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME)
        .where("visibility", "==", "Published")
        .orderBy("createdAt", "desc")
        .get();
        
      return snapshot.docs.map(doc => mapApp(serializeFirestoreData({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Failed to fetch public products:", error);
      return [];
    }
  },

  /**
   * Retrieves a single public product by slug.
   */
  async getPublicProductBySlug(slug: string): Promise<Product | null> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME)
        .where("slug", "==", slug)
        .where("visibility", "==", "Published")
        .limit(1)
        .get();
        
      if (snapshot.empty) return null;
      const docData = snapshot.docs[0];
      return mapApp(serializeFirestoreData({ id: docData.id, ...docData.data() }));
    } catch (error) {
      console.error("Failed to fetch public product by slug:", error);
      return null;
    }
  }
};
