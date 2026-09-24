"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { 
  Menu, 
  LayoutDashboard, 
  FolderKanban, 
  AppWindow, 
  FileText, 
  MessageSquare, 
  Image as ImageIcon, 
  Settings,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { logOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export function AdminSidebar({ 
  pathname, 
  onNavigate 
}: { 
  pathname: string;
  onNavigate?: () => void;
}) {
  const adminLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Apps", href: "/admin/apps", icon: AppWindow },
    { name: "Articles", href: "/admin/articles", icon: FileText },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Media", href: "/admin/media", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
      {adminLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
        
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminHeader({ user, pathname }: { user: { email?: string } | null | undefined; pathname: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/admin/auth");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  // Generate breadcrumb text
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbText = segments.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" / ");

  return (
    <header className="hidden md:flex h-14 items-center gap-4 border-b bg-background px-6 sticky top-0 z-30 justify-between">
      <div className="text-sm font-medium text-muted-foreground">
        {breadcrumbText || "Admin"}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground">{user?.email}</span>
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
          <LogOut className="h-4 w-4" />
          <span className="sr-only lg:not-sr-only">Sign Out</span>
        </Button>
      </div>
    </header>
  );
}

export function AdminShell({ children, user }: { children: React.ReactNode; user?: { email?: string } | null }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/admin/auth");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 left-0 border-r bg-sidebar">
        <div className="h-14 flex items-center px-6 border-b">
          <span className="font-bold tracking-tight">Admin System</span>
        </div>
        <AdminSidebar pathname={pathname} />
      </aside>

      {/* Mobile Drawer & Header */}
      <div className="md:hidden flex h-14 items-center justify-between px-4 border-b bg-background sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="-ml-2" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open admin menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 flex flex-col">
              <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
              <div className="h-14 flex items-center px-6 border-b">
                <span className="font-bold tracking-tight">Admin System</span>
              </div>
              <AdminSidebar pathname={pathname} onNavigate={() => setIsOpen(false)} />
              <div className="p-4 border-t mt-auto">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="font-semibold text-sm capitalize">
            {pathname.split("/").pop() || "Dashboard"}
          </div>
        </div>
      </div>

      <div className="md:pl-64 flex flex-col min-h-screen">
        <AdminHeader user={user} pathname={pathname} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
