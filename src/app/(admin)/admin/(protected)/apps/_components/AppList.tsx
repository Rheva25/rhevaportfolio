"use client";

import { Product } from "@/lib/validations/product";
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
  PackageOpen
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
import { deleteProductAction, duplicateProductAction } from "@/app/actions/products";
import { useRouter } from "next/navigation";

export function AppList({ products, error }: { products: Product[]; error?: string }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-red-950/20 border border-red-900/50 rounded-lg">
        <div className="bg-red-900/20 p-4 rounded-full mb-4">
          <PackageOpen className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-red-400 mb-2">Database Connection Failed</h3>
        <p className="text-red-400/80 max-w-md mx-auto mb-6">
          {error}
        </p>
      </div>
    );
  }

  const filtered = products.filter(p => 
    (p.name as {id?: string})?.id?.toLowerCase()?.includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.status.toLowerCase().includes(search.toLowerCase()) ||
    p.pricingModel.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
    
    setDeletingId(id);
    try {
      await deleteProductAction(id);
      router.refresh();
    } catch (e: unknown) {
      alert((e as Error).message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    startTransition(async () => {
      try {
        const newId = await duplicateProductAction(id);
        router.push(`/admin/apps/${newId}`);
      } catch (e: unknown) {
        alert((e as Error).message || "Failed to duplicate product");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Apps / Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage software products, deployment offerings, and product access information.
          </p>
        </div>
        <Link href="/admin/apps/new" className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" />
          New Product
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 bg-zinc-900/50 border-zinc-800 focus-visible:ring-zinc-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table / Empty State */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/30 border border-dashed border-zinc-800 rounded-lg">
          <PackageOpen className="h-10 w-10 text-zinc-600 mb-4" />
          <h3 className="text-lg font-medium text-zinc-300 mb-1">No products found</h3>
          <p className="text-zinc-500 mb-6 max-w-sm">
            Get started by creating your first product or app.
          </p>
          <Link href="/admin/apps/new" className={buttonVariants({ variant: "outline" })}>
            <Plus className="mr-2 h-4 w-4" />
            Create Product
          </Link>
        </div>
      ) : (
        <div className="rounded-md border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/50 border-b">
                <tr>
                  <th className="h-12 px-4 font-medium">Product</th>
                  <th className="h-12 px-4 font-medium hidden md:table-cell">Category</th>
                  <th className="h-12 px-4 font-medium">Status</th>
                  <th className="h-12 px-4 font-medium hidden sm:table-cell">Visibility</th>
                  <th className="h-12 px-4 font-medium hidden lg:table-cell">Pricing</th>
                  <th className="h-12 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4 align-middle">
                      <div className="font-medium text-foreground">
                        {((product.name as {id?: string})?.id || "")}
                        {product.featured && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px]">
                        /{product.slug}
                      </div>
                    </td>
                    <td className="p-4 align-middle hidden md:table-cell text-muted-foreground">
                      {product.category}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300">
                        {product.status}
                      </div>
                    </td>
                    <td className="p-4 align-middle hidden sm:table-cell">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        product.visibility === 'Published' 
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {product.visibility}
                      </div>
                    </td>
                    <td className="p-4 align-middle hidden lg:table-cell text-muted-foreground">
                      {product.pricingModel}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 p-0" })} disabled={deletingId === product.id || isPending}>
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/admin/apps/${product.id}`)} className="cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => window.open(`/apps/${product.slug}`, '_blank')} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(product.id)} className="cursor-pointer">
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(product.id)}
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
                
                {filtered.length === 0 && products.length > 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No products found matching "{search}"
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
