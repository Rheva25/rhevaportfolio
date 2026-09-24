"use client";

import { Article } from "@/lib/validations/article";
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
  BookOpen
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
import { deleteArticleAction, duplicateArticleAction, updateArticleAction } from "@/app/actions/articles";
import { useRouter } from "next/navigation";

export function ArticleList({ articles, error }: { articles: Article[]; error?: string }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [processingId, setProcessingId] = useState<string | null>(null);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-red-950/20 border border-red-900/50 rounded-lg">
        <div className="bg-red-900/20 p-4 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-red-400 mb-2">Database Connection Failed</h3>
        <p className="text-red-400/80 max-w-md mx-auto mb-6">
          {error}
        </p>
      </div>
    );
  }

  const filtered = articles.filter(a => 
    (a.title as {id?: string})?.id?.toLowerCase()?.includes(search.toLowerCase()) ||
    a.slug.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase()) ||
    a.status.toLowerCase().includes(search.toLowerCase()) ||
    (a.tags && a.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;
    
    setProcessingId(id);
    try {
      await deleteArticleAction(id);
      router.refresh();
    } catch (e: unknown) {
      alert((e as Error).message || "Failed to delete article");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    setProcessingId(id);
    startTransition(async () => {
      try {
        const newId = await duplicateArticleAction(id);
        router.push(`/admin/articles/${newId}`);
      } catch (e: unknown) {
        alert((e as Error).message || "Failed to duplicate article");
      } finally {
        setProcessingId(null);
      }
    });
  };

  const handleStatusChange = async (article: Article, newStatus: Article["status"]) => {
    setProcessingId(article.id);
    try {
      await updateArticleAction(article.id, {
        ...article,
        status: newStatus
      });
      router.refresh();
    } catch (e: unknown) {
      alert((e as Error).message || `Failed to change status to ${newStatus}`);
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (timestamp: unknown) => {
    if (!timestamp) return "Never";
    
    let date: Date;
    const ts = timestamp as { toDate?: () => Date; _seconds?: number };

    if (ts.toDate && typeof ts.toDate === 'function') {
      date = ts.toDate();
    } else if (ts._seconds) {
      date = new Date(ts._seconds * 1000);
    } else {
      date = new Date(timestamp as string | number | Date);
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground mt-1">
            Manage technical articles, development notes, and professional knowledge content.
          </p>
        </div>
        <Link href="/admin/articles/new" className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-8 bg-zinc-900/50 border-zinc-800 focus-visible:ring-zinc-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table / Empty State */}
      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/30 border border-dashed border-zinc-800 rounded-lg">
          <BookOpen className="h-10 w-10 text-zinc-600 mb-4" />
          <h3 className="text-lg font-medium text-zinc-300 mb-1">No articles found</h3>
          <p className="text-zinc-500 mb-6 max-w-sm">
            Get started by writing your first technical article or knowledge base entry.
          </p>
          <Link href="/admin/articles/new" className={buttonVariants({ variant: "outline" })}>
            <Plus className="mr-2 h-4 w-4" />
            Create Article
          </Link>
        </div>
      ) : (
        <div className="rounded-md border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/50 border-b">
                <tr>
                  <th className="h-12 px-4 font-medium">Article</th>
                  <th className="h-12 px-4 font-medium hidden md:table-cell">Category</th>
                  <th className="h-12 px-4 font-medium">Status</th>
                  <th className="h-12 px-4 font-medium hidden lg:table-cell">Author</th>
                  <th className="h-12 px-4 font-medium hidden sm:table-cell">Published</th>
                  <th className="h-12 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((article) => (
                  <tr key={article.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4 align-middle">
                      <div className="font-medium text-foreground">
                        {((article.title as {id?: string})?.id || "")}
                        {article.featured && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px] sm:max-w-[300px]">
                        /{article.slug}
                      </div>
                    </td>
                    <td className="p-4 align-middle hidden md:table-cell text-muted-foreground">
                      {article.category}
                    </td>
                    <td className="p-4 align-middle">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        article.status === 'Published' 
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : article.status === 'Scheduled'
                          ? 'bg-blue-500/10 text-blue-500'
                          : article.status === 'Archived'
                          ? 'bg-zinc-500/10 text-zinc-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {article.status}
                      </div>
                    </td>
                    <td className="p-4 align-middle hidden lg:table-cell text-muted-foreground">
                      {article.author}
                    </td>
                    <td className="p-4 align-middle hidden sm:table-cell text-muted-foreground">
                      {article.status === 'Published' ? formatDate(article.publishedAt) : '-'}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 p-0" })} disabled={processingId === article.id || isPending}>
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/admin/articles/${article.id}`)} className="cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          
                          {article.status === 'Published' && (
                            <DropdownMenuItem onClick={() => window.open(`/articles/${article.slug}`, '_blank')} className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              View Live
                            </DropdownMenuItem>
                          )}
                          
                          {/* We do not expose ?preview=true for drafts per requirements.
                              Previews must remain within the authenticated CMS editor. */}

                          <DropdownMenuItem onClick={() => handleDuplicate(article.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          {article.status === 'Draft' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(article, 'Published')}>
                              Publish
                            </DropdownMenuItem>
                          )}
                          
                          {article.status === 'Published' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(article, 'Draft')}>
                              Unpublish (Draft)
                            </DropdownMenuItem>
                          )}
                          
                          {article.status !== 'Archived' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(article, 'Archived')}>
                              Archive
                            </DropdownMenuItem>
                          )}
                          
                          {article.status === 'Archived' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(article, 'Draft')}>
                              Restore (Draft)
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(article.id)}
                            className="text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-950"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                
                {filtered.length === 0 && articles.length > 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No articles found matching "{search}"
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
