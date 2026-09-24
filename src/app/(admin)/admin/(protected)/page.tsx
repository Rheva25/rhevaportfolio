import { projectsAdminRepository } from "@/lib/repositories/projectsAdmin";
import { productsAdminRepository } from "@/lib/repositories/productsAdmin";
import { articlesAdminRepository } from "@/lib/repositories/articlesAdmin";
import { inquiriesAdminRepository } from "@/lib/repositories/inquiriesAdmin";
import { FolderGit2, AppWindow, FileText, MessageSquare, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/validations/project";
import { Inquiry } from "@/lib/validations/inquiry";

function formatDistanceToNow(date: Date) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const daysDifference = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  
  if (Math.abs(daysDifference) < 1) {
    const hoursDifference = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60));
    if (Math.abs(hoursDifference) < 1) {
      const minutesDifference = Math.round((date.getTime() - Date.now()) / (1000 * 60));
      return rtf.format(minutesDifference, "minute");
    }
    return rtf.format(hoursDifference, "hour");
  }
  return rtf.format(daysDifference, "day");
}

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let isFirebaseConfigured = true;
  let errorMsg = "";
  const stats = {
    projects: 0,
    products: 0,
    articles: 0,
    newInquiries: 0,
  };
  let recentInquiries: Inquiry[] = [];
  let recentProjects: Project[] = [];

  try {
    const [projects, products, articles, inquiries] = await Promise.all([
      projectsAdminRepository.getProjects(),
      productsAdminRepository.getProducts(),
      articlesAdminRepository.getArticles(),
      inquiriesAdminRepository.getInquiries(),
    ]);

    stats.projects = projects.length;
    stats.products = products.length;
    stats.articles = articles.length;
    stats.newInquiries = inquiries.filter(i => i.status === "New").length;

    recentInquiries = inquiries.slice(0, 5);
    recentProjects = projects.slice(0, 5);
  } catch (e: unknown) {
    console.error("Dashboard error:", e);
    isFirebaseConfigured = false;
    errorMsg = (e as Error).message || "Unknown error";
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the Rheva Developer Platform administration area.
        </p>
      </div>
      
      {!isFirebaseConfigured ? (
        <div className="p-6 bg-red-950/20 border border-red-900/50 rounded-xl flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-red-500 shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-red-500 mb-2">Firebase is Not Fully Configured</h3>
            <p className="text-muted-foreground mb-4">
              The application failed to connect to Firestore. Ensure that the Service Account key is configured in the environment variables and the database is accessible.
            </p>
            <div className="p-4 bg-black/50 font-mono text-xs text-red-400 rounded overflow-auto">
              {errorMsg}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase">
                <FolderGit2 className="h-4 w-4" />
                <span>Total Projects</span>
              </div>
              <div className="text-3xl font-bold">{stats.projects}</div>
            </div>
            
            <div className="p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase">
                <AppWindow className="h-4 w-4" />
                <span>Total Products</span>
              </div>
              <div className="text-3xl font-bold">{stats.products}</div>
            </div>
            
            <div className="p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase">
                <FileText className="h-4 w-4" />
                <span>Total Articles</span>
              </div>
              <div className="text-3xl font-bold">{stats.articles}</div>
            </div>
            
            <div className="p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col gap-2 relative overflow-hidden">
              <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs uppercase relative z-10">
                <MessageSquare className="h-4 w-4" />
                <span>New Inquiries</span>
              </div>
              <div className="text-3xl font-bold relative z-10">{stats.newInquiries}</div>
              {stats.newInquiries > 0 && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Inquiries */}
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold">Recent Inquiries</h3>
                <Link href="/admin/inquiries" className="text-xs text-primary hover:underline">View All</Link>
              </div>
              <div className="flex-1">
                {recentInquiries.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground text-sm">
                    No inquiries found.
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {recentInquiries.map((inq) => (
                      <Link 
                        key={inq.id} 
                        href={`/admin/inquiries/${inq.id}`}
                        className="p-4 flex flex-col gap-1 hover:bg-muted/50 transition-colors block"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{inq.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                            inq.status === 'New' ? 'bg-blue-500/10 text-blue-500' : 'bg-muted text-muted-foreground'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{inq.inquiryType}</div>
                        {!!inq.createdAt && (
                          <div className="text-[10px] text-muted-foreground/50 mt-1">
                            {formatDistanceToNow(new Date((inq.createdAt as { _seconds?: number })?._seconds ? (inq.createdAt as { _seconds: number })._seconds * 1000 : (inq.createdAt as string | number)))} ago
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Projects */}
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold">Recent Projects</h3>
                <Link href="/admin/projects" className="text-xs text-primary hover:underline">View All</Link>
              </div>
              <div className="flex-1">
                {recentProjects.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground text-sm">
                    No projects found.
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {recentProjects.map((p) => (
                      <Link 
                        key={p.id} 
                        href={`/admin/projects/${p.id}`}
                        className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors block"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-sm">{(p.title as {id?: string})?.id || ""}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[200px]">{p.category}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                          p.visibility === 'Published' ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'
                        }`}>
                          {p.visibility}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
