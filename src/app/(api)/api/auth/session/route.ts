import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase/admin";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "No ID token provided" }, { status: 400 });
    }

    const adminAuth = getAdminAuth();
    
    // Verify the token to get the user's email
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // Check if user is the superadmin
    const isSuperadmin = decodedToken.email === process.env.SUPERADMIN_EMAIL;
    
    if (isSuperadmin) {
      // Assign custom claim if not already present
      if (decodedToken.admin !== true) {
        await adminAuth.setCustomUserClaims(decodedToken.uid, { admin: true });
        // We don't need to generate a new idToken here because we'll force refresh on the client
      }
    } else {
      // Ensure non-admins don't have the claim
      if (decodedToken.admin === true) {
        await adminAuth.setCustomUserClaims(decodedToken.uid, { admin: false });
      }
    }

    // Create session cookie with a 5 day expiration
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
