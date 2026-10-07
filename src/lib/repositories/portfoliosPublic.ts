import { db } from "@/lib/firebase/config";
import { Portfolio } from "@/lib/validations/portfolio";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

const COLLECTION_NAME = "portfolios";

export const portfoliosPublicRepository = {
  async getPublishedPortfolios(): Promise<Portfolio[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("status", "==", "Published"),
        orderBy("order", "asc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Portfolio));
    } catch (error) {
      console.error("Failed to fetch public portfolios", error);
      return [];
    }
  }
};
