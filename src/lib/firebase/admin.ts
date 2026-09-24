import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

export function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];
  
  if (!process.env.FIREBASE_PRIVATE_KEY) {
    throw new Error("FIREBASE_PRIVATE_KEY is not set.");
  }
  
  return initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

export const getAdminDb = () => { getAdminApp(); return getFirestore(); };
export const getAdminAuth = () => { getAdminApp(); return getAuth(); };

/**
 * Deeply serializes Firestore data to strip classes (like Timestamp) 
 * so it can be safely passed from Server to Client Components in Next.js.
 */
export function serializeFirestoreData<T>(data: T): T {
  if (!data) return data;
  return JSON.parse(JSON.stringify(data));
}
