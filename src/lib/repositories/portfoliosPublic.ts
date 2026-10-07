import { getAdminDb, serializeFirestoreData } from "@/lib/firebase/admin";
import { Portfolio } from "@/lib/validations/portfolio";

const COLLECTION_NAME = "portfolios";

export const portfoliosPublicRepository = {
  async getPublishedPortfolios(): Promise<Portfolio[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME)
        .where("status", "==", "Published")
        .get();
        
      const portfolios = snapshot.docs.map(doc => serializeFirestoreData({ id: doc.id, ...doc.data() } as Portfolio));
      return portfolios.sort((a, b) => (a.order || 0) - (b.order || 0));
    } catch (error) {
      console.error("Failed to fetch public portfolios", error);
      return [];
    }
  }
};
