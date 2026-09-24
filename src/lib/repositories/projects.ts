import { getAdminDb, serializeFirestoreData } from "../firebase/admin";
import { Project } from "../models";
import { mapProject } from "./mappers";

const COLLECTION_NAME = "projects";

export const projectRepository = {
  /**
   * Retrieves all projects that are safe for public consumption.
   */
  async getPublicProjects(): Promise<Project[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME)
        .where("visibility", "==", "Published")
        .orderBy("year", "desc")
        .get();
        
      return snapshot.docs.map(doc => mapProject(serializeFirestoreData({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Failed to fetch public projects:", error);
      return [];
    }
  },

  /**
   * Retrieves a single public project by slug.
   */
  async getPublicProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME)
        .where("slug", "==", slug)
        .where("visibility", "==", "Published")
        .limit(1)
        .get();
        
      if (snapshot.empty) return null;
      const docData = snapshot.docs[0];
      return mapProject(serializeFirestoreData({ id: docData.id, ...docData.data() }));
    } catch (error) {
      console.error("Failed to fetch public project by slug:", error);
      return null;
    }
  }
};
