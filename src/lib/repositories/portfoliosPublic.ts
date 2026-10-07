import { db } from "@/lib/firebase/config";
import { Portfolio } from "@/lib/validations/portfolio";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

const COLLECTION_NAME = "portfolios";

export const portfoliosPublicRepository = {
  async getPublishedPortfolios(): Promise<Portfolio[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("status", "==", "Published")
      );
      const snapshot = await getDocs(q);
      const portfolios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Portfolio));
      return portfolios.sort((a, b) => (a.order || 0) - (b.order || 0));
    } catch (error) {
      console.error("Failed to fetch public portfolios", error);
      return [];
    }
  }
};
