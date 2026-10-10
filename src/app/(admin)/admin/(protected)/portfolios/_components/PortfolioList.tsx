"use client";

import { Portfolio } from "@/lib/validations/portfolio";
import Link from "next/link";
import { ExternalLink, Edit, Globe, FileText, Image as ImageIcon, Trash2 } from "lucide-react";
import { deletePortfolioAction } from "../actions";
import { useTransition } from "react";

export function PortfolioList({ initialPortfolios }: { initialPortfolios: Portfolio[] }) {
  if (initialPortfolios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card rounded-lg border border-border border-dashed">
        <Globe className="h-8 w-8 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-medium">No Portfolios</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">Add your external portfolio websites here.</p>
        <Link href="/admin/portfolios/new">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
            Create First Portfolio
          </button>
        </Link>
      </div>
    );
  }

  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      startTransition(async () => {
        try {
          await deletePortfolioAction(id);
        } catch (error) {
          console.error("Failed to delete portfolio", error);
          alert("Failed to delete portfolio. Please try again.");
        }
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initialPortfolios.map((portfolio) => (
        <div key={portfolio.id} className="group relative bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
          <div className="aspect-video bg-muted relative border-b border-border">
            {portfolio.thumbnailUrl ? (
              <img src={portfolio.thumbnailUrl} alt={portfolio.title.en} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/50">
                <ImageIcon className="h-8 w-8 opacity-20" />
              </div>
            )}
            <div className="absolute top-3 right-3 flex gap-2">
              <span className={`px-2 py-1 text-[10px] font-mono font-medium rounded uppercase ${
                portfolio.status === 'Published' 
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                  : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
              }`}>
                {portfolio.status}
              </span>
            </div>
          </div>
          
          <div className="p-5 flex flex-col gap-3 flex-1">
            <div>
              <span className="text-[10px] font-mono font-semibold text-primary uppercase tracking-wider mb-1 block">
                {portfolio.role}
              </span>
              <h3 className="font-semibold text-foreground line-clamp-1">{portfolio.title.id}</h3>
              <a href={portfolio.url} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mt-1 truncate">
                {portfolio.url} <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mt-auto">
              {portfolio.description.id}
            </p>
            
            <div className="flex items-center justify-end gap-2 pt-4 mt-2 border-t border-border">
              <button 
                onClick={() => handleDelete(portfolio.id!, portfolio.title.id)}
                disabled={isPending}
                className="flex items-center gap-1.5 text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
              <Link href={`/admin/portfolios/${portfolio.id}`}>
                <button className="flex items-center gap-1.5 text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1.5 rounded-md transition-colors">
                  <Edit className="h-3.5 w-3.5" /> Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
