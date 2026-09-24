import { auth } from "./config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    
    // Send the token to the server to establish a secure session
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to create session");
    }

    // Force refresh token to ensure custom claims (like admin: true) 
    // are immediately available to the client SDK for Storage uploads
    await result.user.getIdToken(true);

    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    await fetch("/api/auth/logout", {
      method: "POST",
    });
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};
