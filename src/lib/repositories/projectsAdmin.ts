import { getAdminDb, serializeFirestoreData } from "@/lib/firebase/admin";
import { Project, ProjectFormData } from "@/lib/validations/project";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION_NAME = "projects";

/**
 * Projects Repository (Admin-side)
 * Uses firebase-admin to access Firestore with full privileges.
 */
export const projectsAdminRepository = {
  
  async getProjects(): Promise<Project[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get();
      return snapshot.docs.map(doc => serializeFirestoreData({
        id: doc.id,
        ...doc.data()
      } as Project));
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured. Please set FIREBASE_PRIVATE_KEY to connect to Firestore.");
      }
      throw error;
    }
  },

  async getProject(id: string): Promise<Project | null> {
    try {
      const db = getAdminDb();
      const doc = await db.collection(COLLECTION_NAME).doc(id).get();
      if (!doc.exists) return null;
      return serializeFirestoreData({ id: doc.id, ...doc.data() } as Project);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async getProjectBySlug(slug: string, excludeId?: string): Promise<Project | null> {
    try {
      const db = getAdminDb();
      const query = db.collection(COLLECTION_NAME).where("slug", "==", slug);
      const snapshot = await query.get();
      
      const docs = snapshot.docs.map(doc => serializeFirestoreData({ id: doc.id, ...doc.data() } as Project));
      if (excludeId) {
        return docs.find(doc => doc.id !== excludeId) || null;
      }
      return docs[0] || null;
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async createProject(data: ProjectFormData): Promise<Project> {
    try {
      const db = getAdminDb();
      const docRef = db.collection(COLLECTION_NAME).doc();
      
      const projectData = {
        ...data,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };
      
      await docRef.set(projectData);
      
      return serializeFirestoreData({
        id: docRef.id,
        ...projectData
      } as unknown as Project);
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async updateProject(id: string, data: Partial<ProjectFormData>): Promise<void> {
    try {
      const db = getAdminDb();
      const docRef = db.collection(COLLECTION_NAME).doc(id);
      
      await docRef.update({
        ...data,
        updatedAt: FieldValue.serverTimestamp(),
      });
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },

  async deleteProject(id: string): Promise<void> {
    try {
      const db = getAdminDb();
      await db.collection(COLLECTION_NAME).doc(id).delete();
    } catch (error: unknown) {
      if ((error as Error).message?.includes("FIREBASE_PRIVATE_KEY is not set")) {
        throw new Error("Firebase is not configured.");
      }
      throw error;
    }
  },
};
