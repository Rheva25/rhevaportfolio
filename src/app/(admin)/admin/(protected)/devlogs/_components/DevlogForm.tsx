"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevlogEntrySchema, DevlogEntryFormData, DevlogEntry } from "@/lib/validations/devlog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createDevlogAction, updateDevlogAction, deleteDevlogAction } from "@/app/actions/devlogs";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { UnsavedChangesWarning } from "@/app/(admin)/admin/(protected)/projects/_components/UnsavedChangesWarning";
import { QuoteStudio } from "./QuoteStudio";

interface DevlogFormProps {
  initialData?: DevlogEntry;
}

export function DevlogForm({ initialData }: DevlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<DevlogEntryFormData>({
    resolver: zodResolver(DevlogEntrySchema) as any,
    defaultValues: initialData || {
      title: "",
      slug: "",
      contentMarkdown: "",
      excerpt: "",
      language: "mixed",
      category: "",
      tags: [],
      featuredQuote: "",
      quoteAttribution: "",
      status: "draft",
      thumbnailPreset: "literary-minimalist"
    }
  });

  const onSubmit = async (data: DevlogEntryFormData) => {
    setServerError(null);
    startTransition(async () => {
      try {
        if (isEdit) {
          await updateDevlogAction(initialData.id, data);
        } else {
          const newId = await createDevlogAction(data);
          router.push(`/admin/devlogs/${newId}`);
          return;
        }
        router.refresh();
      } catch (err: unknown) {
        setServerError((err as Error).message || "Failed to save devlog entry");
      }
    });
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = () => {
    if (!initialData || !confirm("Are you sure you want to delete this devlog entry? This action cannot be undone.")) return;
    setIsDeleting(true);
    startTransition(async () => {
      try {
        await deleteDevlogAction(initialData.id);
        router.push("/admin/devlogs");
        router.refresh();
      } catch (err: unknown) {
        setServerError((err as Error).message || "Failed to delete devlog entry");
        setIsDeleting(false);
      }
    });
  };

  const generateSlug = () => {
    const title = watch("title");
    if (title && (!initialData || confirm("Changing a published slug can break links. Continue?"))) {
      const newSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      setValue("slug", newSlug, { shouldDirty: true, shouldValidate: true });
    }
  };

  const addTag = () => {
    const current = watch("tags") || [];
    setValue("tags", [...current, ""], { shouldDirty: true });
  };
  const updateTag = (index: number, val: string) => {
    const current = [...(watch("tags") || [])];
    current[index] = val;
    setValue("tags", current, { shouldDirty: true });
  };
  const removeTag = (index: number) => {
    const current = [...(watch("tags") || [])];
    current.splice(index, 1);
    setValue("tags", current, { shouldDirty: true });
  };

  const loading = isPending || isSubmitting;

  return (
    <div className="space-y-8 pb-20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <UnsavedChangesWarning isDirty={isDirty} />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/devlogs" className={buttonVariants({ variant: "ghost", size: "icon" })}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{isEdit ? "Edit Devlog" : "New Devlog Entry"}</h1>
              <p className="text-sm text-muted-foreground">
                {isEdit ? "Update your literary journal entry." : "Write a new journal entry."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEdit && watch("status") === "published" && (
              <a 
                href={`/devlog-unspoken/${initialData?.slug}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline" })}
              >
                View Live
              </a>
            )}
            {isEdit && (
              <Button 
                type="button" 
                variant="outline" 
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-500/20"
                onClick={handleDelete}
                disabled={isDeleting || loading}
              >
                {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                Delete
              </Button>
            )}
            
            <Button type="submit" disabled={loading || !isDirty || isDeleting}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Save Draft"}
            </Button>
          </div>
        </div>

        {serverError && (
          <div className="p-4 rounded-md bg-red-950 border border-red-900 text-red-400">
            {serverError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
              <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Journal Content</h2>
              
              <div className="space-y-2">
                <Label htmlFor="title">Journal Title</Label>
                <Input id="title" {...register("title")} placeholder="e.g. The Architecture of Silence" />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={generateSlug} className="h-6 text-xs">
                    Generate from title
                  </Button>
                </div>
                <Input id="slug" {...register("slug")} placeholder="e.g. the-architecture-of-silence" />
                {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt / Meta Description</Label>
                <Textarea id="excerpt" {...register("excerpt")} rows={3} placeholder="A short summary of this journal entry..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentMarkdown">Story Content (Markdown)</Label>
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-md text-sm text-zinc-400 mb-2">
                  Write your story. Markdown is supported.
                </div>
                <Textarea 
                  id="contentMarkdown" 
                  {...register("contentMarkdown")} 
                  className="min-h-[600px] font-mono text-sm leading-relaxed bg-zinc-950" 
                  placeholder="Start writing..." 
                />
                {errors.contentMarkdown && <p className="text-sm text-red-500">{errors.contentMarkdown.message}</p>}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
              <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Featured Quote</h2>
              
              <div className="space-y-2">
                <Label htmlFor="featuredQuote">Main Quote</Label>
                <Textarea id="featuredQuote" {...register("featuredQuote")} rows={3} placeholder="Extract a powerful sentence from your journal..." />
                {errors.featuredQuote && <p className="text-sm text-red-500">{errors.featuredQuote.message}</p>}
                <p className="text-xs text-muted-foreground">{watch("featuredQuote")?.length || 0} characters. Keep it under 150 for best results.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quoteAttribution">Attribution (Optional)</Label>
                <Input id="quoteAttribution" {...register("quoteAttribution")} placeholder="e.g. Rheva" />
              </div>
            </section>

            <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
              <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Publishing</h2>
              
              <div className="space-y-2">
                <Label>Status</Label>
                <Select 
                  value={watch("status")} 
                  onValueChange={(val: "draft" | "review" | "published" | null) => val && setValue("status", val, { shouldDirty: true })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft (Private)</SelectItem>
                    <SelectItem value="review">Review (Private)</SelectItem>
                    <SelectItem value="published">Published (Public)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select 
                  value={watch("language")} 
                  onValueChange={(val: "en" | "id" | "mixed" | null) => val && setValue("language", val, { shouldDirty: true })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Indonesian</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" {...register("category")} placeholder="e.g. Reflection" />
                {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
              </div>
            </section>

            <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
              <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Tags</h2>
              <div className="space-y-2">
                {(watch("tags") || []).map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input 
                      value={tag} 
                      onChange={(e) => updateTag(index, e.target.value)} 
                      className="h-8 text-sm"
                    />
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeTag(index)}>
                      <Trash2 className="h-3 w-3 text-muted-foreground hover:text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" className="w-full" onClick={addTag}>
                  <Plus className="mr-1 h-3 w-3" /> Add Tag
                </Button>
              </div>
            </section>

          </div>
        </div>
      </form>

      {/* Quote Studio Section */}
      <section className="bg-zinc-900/30 p-6 rounded-lg border border-zinc-800 mt-12">
        <h2 className="text-xl font-bold mb-6">Instagram Thumbnail Generator</h2>
        <QuoteStudio 
          quote={watch("featuredQuote")} 
          attribution={watch("quoteAttribution")}
          entryId={initialData?.id || ""}
          currentThumbnailUrl={watch("thumbnailUrl")}
          onUploadSuccess={(url, path) => {
            setValue("thumbnailUrl", url, { shouldDirty: true });
            setValue("thumbnailPath", path, { shouldDirty: true });
            if (initialData) {
              // Auto-save the form if it was uploaded successfully to persist the URL
              const submitFn = handleSubmit(onSubmit);
              submitFn();
            }
          }}
        />
      </section>
    </div>
  );
}
