"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function AdminAuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithGoogle();
      
      // On success, redirect to admin home.
      // The server layout will perform the superadmin check.
      router.push("/admin");
      router.refresh(); // Force server layout to re-run its checks
    } catch (err: unknown) {
      console.error(err);
      const errorCode = (err as { code?: string }).code;
      if (errorCode === "auth/popup-closed-by-user") {
        setError("Authentication was cancelled.");
      } else {
        setError("Google sign-in failed. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-300 p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-lg p-8 shadow-xl text-center space-y-8">
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Rheva Developer Platform</h1>
          <p className="text-sm text-zinc-400">Admin Access</p>
        </div>

        {error && (
          <div className="p-3 text-sm rounded bg-red-950/50 border border-red-900 text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <p className="text-sm text-zinc-400">
            Sign in with your authorized Google account to access the administration area.
          </p>
          
          <Button 
            className="w-full bg-white text-black hover:bg-zinc-200 h-11"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Sign in with Google"
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}
