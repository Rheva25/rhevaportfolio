import { getAdminAuth } from "@/lib/firebase/admin";
import { cookies } from "next/headers";

export async function verifySuperadmin() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return { isAuthorized: false, user: null };
  }

  try {
    const decodedClaims = await getAdminAuth().verifySessionCookie(sessionCookie, true);
    
    // Check if the authenticated user matches the SUPERADMIN_EMAIL
    if (decodedClaims.email === process.env.SUPERADMIN_EMAIL) {
      return { isAuthorized: true, user: decodedClaims };
    }

    return { isAuthorized: false, user: decodedClaims };
  } catch (error) {
    console.error("Session verification failed", error);
    return { isAuthorized: false, user: null };
  }
}
