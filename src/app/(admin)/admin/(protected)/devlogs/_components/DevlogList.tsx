"use client";

import { useState } from "react";
import { DevlogEntry } from "@/lib/validations/devlog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { format } from "date-fns";
import { Edit, Image as ImageIcon, Trash2, Loader2 } from "lucide-react";
import { deleteDevlogAction } from "@/app/actions/devlogs";

interface DevlogListProps {
  initialData: DevlogEntry[];
}

export function DevlogList({ initialData }: DevlogListProps) {
  const [devlogs, setDevlogs] = useState<DevlogEntry[]>(initialData);
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this devlog entry? This action cannot be undone.")) return;
    
    setDeletingId(id);
    startTransition(async () => {
      try {
        await deleteDevlogAction(id);
        setDevlogs(prev => prev.filter(d => d.id !== id));
      } catch (error) {
        console.error("Failed to delete devlog:", error);
        alert("Failed to delete devlog. Please try again.");
      } finally {
        setDeletingId(null);
      }
    });
  };

  if (devlogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-lg border-dashed">
        <p className="text-muted-foreground mb-4">No devlog entries found.</p>
        <Link href="/admin/devlogs/new">
          <Button variant="outline">Create First Devlog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Title & Quote</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Thumbnail</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {devlogs.map((devlog) => (
              <tr key={devlog.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground mb-1">{devlog.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1 italic">"{devlog.featuredQuote}"</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                    ${devlog.status === 'published' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                      devlog.status === 'review' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'}`}>
                    {devlog.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-muted rounded text-xs font-mono">{devlog.category}</span>
                </td>
                <td className="px-6 py-4">
                  {devlog.thumbnailUrl ? (
                    <div className="w-12 h-16 bg-muted rounded overflow-hidden border border-border">
                      <img src={devlog.thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-16 bg-muted/50 rounded flex items-center justify-center border border-border border-dashed text-muted-foreground">
                      <ImageIcon className="h-4 w-4 opacity-50" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">
                  {devlog.createdAt ? format(new Date((devlog.createdAt as any)?._seconds ? (devlog.createdAt as any)._seconds * 1000 : (devlog.createdAt as any)?.seconds * 1000 || 0), "MMM d, yyyy") : "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/devlogs/${devlog.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                      onClick={() => handleDelete(devlog.id)}
                      disabled={isPending && deletingId === devlog.id}
                    >
                      {isPending && deletingId === devlog.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
