"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortfolioSchema, PortfolioFormData, Portfolio } from "@/lib/validations/portfolio";
import { createPortfolioAction, updatePortfolioAction, deletePortfolioAction } from "@/app/actions/portfolios";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { normalizeLocalized } from "@/lib/utils/localization";

interface PortfolioFormProps {
  initialData?: Portfolio;
}

export function PortfolioForm({ initialData }: PortfolioFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const isEdit = !!initialData;

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<PortfolioFormData>({
    resolver: zodResolver(PortfolioSchema) as any,
    defaultValues: initialData ? {
      ...initialData,
      title: normalizeLocalized(initialData.title),
      description: normalizeLocalized(initialData.description),
    } : {
      title: { id: "", en: "" },
      url: "",
      role: "",
      description: { id: "", en: "" },
      thumbnailUrl: "",
      status: "Draft",
      order: 0,
    }
  });

  const onSubmit = async (data: PortfolioFormData) => {
    setLoading(true);
    setServerError(null);
    try {
      if (isEdit) {
        await updatePortfolioAction(initialData.id, data);
      } else {
        await createPortfolioAction(data);
      }
      router.push("/admin/portfolios");
    } catch (err: unknown) {
      setServerError((err as Error).message || "Failed to save portfolio");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this portfolio?")) return;
    setLoading(true);
    try {
      await deletePortfolioAction(initialData!.id);
      router.push("/admin/portfolios");
    } catch (err: unknown) {
      setServerError((err as Error).message || "Failed to delete portfolio");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {serverError && (
        <div className="p-4 rounded-md bg-red-950 border border-red-900 text-red-400">
          {serverError}
        </div>
      )}

      <div className="flex flex-col gap-6 p-6 bg-card border border-border rounded-xl">
        <h3 className="font-semibold text-lg border-b border-border pb-4">Basic Information</h3>
        
        <div className="grid gap-4">
          <label className="text-sm font-medium">URL / Website Link</label>
          <input 
            {...register("url")} 
            className="w-full bg-background border border-border rounded-md px-3 py-2" 
            placeholder="https://your-frontend-portfolio.com"
          />
          {errors.url && <span className="text-red-500 text-sm">{errors.url.message}</span>}
        </div>
        
        <div className="grid gap-4">
          <label className="text-sm font-medium">Title (Indonesian)</label>
          <input 
            {...register("title.id")} 
            className="w-full bg-background border border-border rounded-md px-3 py-2" 
            placeholder="e.g. Frontend Developer Portfolio"
          />
          {errors.title?.id && <span className="text-red-500 text-sm">{errors.title.id.message}</span>}
        </div>

        <div className="grid gap-4">
          <label className="text-sm font-medium">Role / Specialty</label>
          <input 
            {...register("role")} 
            className="w-full bg-background border border-border rounded-md px-3 py-2" 
            placeholder="e.g. Frontend Engineer"
          />
          {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
        </div>

        <div className="grid gap-4">
          <label className="text-sm font-medium">Description (Indonesian)</label>
          <textarea 
            {...register("description.id")} 
            rows={4}
            className="w-full bg-background border border-border rounded-md px-3 py-2" 
            placeholder="Describe this portfolio..."
          />
          {errors.description?.id && <span className="text-red-500 text-sm">{errors.description.id.message}</span>}
        </div>

        <div className="grid gap-4">
          <label className="text-sm font-medium">Thumbnail URL (Optional)</label>
          <p className="text-xs text-muted-foreground">Leave empty to auto-scrape from the URL when saved.</p>
          <input 
            {...register("thumbnailUrl")} 
            className="w-full bg-background border border-border rounded-md px-3 py-2" 
            placeholder="https://..."
          />
        </div>

        <div className="grid gap-4">
          <label className="text-sm font-medium">Status</label>
          <select 
            {...register("status")} 
            className="w-full bg-background border border-border rounded-md px-3 py-2"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        {isEdit ? (
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        ) : <div></div>}
        
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/portfolios")} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading || (!isDirty && isEdit)}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Save Changes" : "Create Portfolio"}
          </Button>
        </div>
      </div>
    </form>
  );
}
