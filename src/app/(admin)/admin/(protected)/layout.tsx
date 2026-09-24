import { AdminShell } from "@/components/layout/AdminShell";
import { verifySuperadmin } from "@/lib/auth/admin";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthorized, user } = await verifySuperadmin();

  if (!isAuthorized) {
    if (!user) {
      // Not authenticated at all or session expired
      redirect("/admin/auth");
    } else {
      // Authenticated but not authorized (wrong email)
      return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-300 p-4">
          <div className="max-w-md w-full bg-zinc-900 border border-red-900/50 rounded-lg p-6 shadow-xl text-center space-y-6">
            <h1 className="text-xl font-bold text-red-500">Access Denied</h1>
            <p className="text-sm">
              Your Google account ({user.email}) is authenticated, but it is not authorized to access the Rheva Developer Platform administration area.
            </p>
            <form action="/api/auth/logout" method="POST">
              <button 
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      );
    }
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}
