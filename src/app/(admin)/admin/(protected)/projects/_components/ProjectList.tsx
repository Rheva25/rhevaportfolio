"use client";

import { Project } from "@/lib/validations/project";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye, 
  Copy,
  FolderKanban
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useTransition } from "react";
import { deleteProjectAction, duplicateProjectAction } from "@/app/actions/projects";
import { useRouter } from "next/navigation";

export function ProjectList({ projects, error }: { projects: Project[]; error?: string }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-red-950/20 border border-red-900/50 rounded-lg">
        <div className="bg-red-900/20 p-4 rounded-full mb-4">
          <FolderKanban className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-red-400 mb-2">Database Connection Failed</h3>
        <p className="text-red-400/80 max-w-md mx-auto mb-6">
          {error}
        </p>
      </div>
    );
  }

  const filtered = projects.filter(p => 
    (p.title as {id?: string})?.id?.toLowerCase()?.includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;
    
    setDeletingId(id);
    try {
      await deleteProjectAction(id);
      router.refresh();
    } catch (e: unknown) {
      alert((e as Error).message || "Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    startTransition(async () => {
      try {
        const newId = await duplicateProjectAction(id);
        router.push(`/admin/projects/${newId}`);
      } catch (e: unknown) {
        alert((e as Error).message || "Failed to duplicate project");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage portfolio projects and case studies.
          </p>
        </div>
        <Link href="/admin/projects/new" className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8 bg-zinc-900/50 border-zinc-800 focus-visible:ring-zinc-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table / Empty State */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/30 border border-dashed border-zinc-800 rounded-lg">
          <FolderKanban className="h-10 w-10 text-zinc-600 mb-4" />
          <h3 className="text-lg font-medium text-zinc-300 mb-1">No projects found</h3>
          <p className="text-zinc-500 mb-6 max-w-sm">
            Get started by creating your first project for the portfolio.
          </p>
          <Link href="/admin/projects/new" className={buttonVariants({ variant: "outline" })}>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Link>
        </div>
      ) : (
        <div className="rounded-md border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/50 border-b">
                <tr>
                  <th className="h-12 px-4 font-medium">Project</th>
                  <th className="h-12 px-4 font-medium hidden md:table-cell">Category</th>
                  <th className="h-12 px-4 font-medium">Status</th>
                  <th className="h-12 px-4 font-medium hidden sm:table-cell">Visibility</th>
                  <th className="h-12 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4 align-middle">
                      <div className="font-medium text-foreground">{((project.title as {id?: string})?.id || "")}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px]">
                        /{project.slug}
                      </div>
                    </td>
                    <td className="p-4 align-middle hidden md:table-cell text-muted-foreground">
                      {project.category}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300">
                        {project.status}
                      </div>
                    </td>
                    <td className="p-4 align-middle hidden sm:table-cell">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        project.visibility === 'Published' 
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {project.visibility}
                      </div>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 p-0" })} disabled={deletingId === project.id || isPending}>
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/admin/projects/${project.id}`)} className="cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => window.open(`/projects/${project.slug}`, '_blank')} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(project.id)} className="cursor-pointer">
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(project.id)}
                            className="text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-950 cursor-pointer"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                
                {filtered.length === 0 && projects.length > 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No projects found matching "{search}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
