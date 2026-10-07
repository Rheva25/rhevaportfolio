import { getAdminDb, serializeFirestoreData } from "@/lib/firebase/admin";
import { Portfolio, PortfolioFormData } from "@/lib/validations/portfolio";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION_NAME = "portfolios";

export const portfoliosAdminRepository = {
  async getPortfolios(): Promise<Portfolio[]> {
    const db = getAdminDb();
    const snapshot = await db.collection(COLLECTION_NAME).orderBy("order", "asc").get();
    return snapshot.docs.map(doc => serializeFirestoreData({ id: doc.id, ...doc.data() } as Portfolio));
  },

  async getPortfolio(id: string): Promise<Portfolio | null> {
    const db = getAdminDb();
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();
    if (!doc.exists) return null;
    return serializeFirestoreData({ id: doc.id, ...doc.data() } as Portfolio);
  },

  async createPortfolio(data: PortfolioFormData): Promise<Portfolio> {
    const db = getAdminDb();
    const docRef = db.collection(COLLECTION_NAME).doc();
    const portfolioData = {
      ...data,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      ...(data.status === "Published" ? { publishedAt: FieldValue.serverTimestamp() } : {})
    };
    await docRef.set(portfolioData);
    return serializeFirestoreData({ id: docRef.id, ...portfolioData } as unknown as Portfolio);
  },

  async updatePortfolio(id: string, data: Partial<PortfolioFormData>): Promise<void> {
    const db = getAdminDb();
    const docRef = db.collection(COLLECTION_NAME).doc(id);
    const updateData: Record<string, unknown> = {
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
    };
    if (data.status === "Published") {
      updateData.publishedAt = FieldValue.serverTimestamp();
    }
    await docRef.update(updateData);
  },

  async deletePortfolio(id: string): Promise<void> {
    const db = getAdminDb();
    await db.collection(COLLECTION_NAME).doc(id).delete();
  },
};
