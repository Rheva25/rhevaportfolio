"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleSchema, ArticleFormData, Article } from "@/lib/validations/article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createArticleAction, updateArticleAction } from "@/app/actions/articles";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { UnsavedChangesWarning } from "@/app/(admin)/admin/(protected)/projects/_components/UnsavedChangesWarning";

interface ArticleFormProps {
  initialData?: Article;
}

export function ArticleForm({ initialData }: ArticleFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const isEdit = !!initialData;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<ArticleFormData>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: null,
      category: "",
      tags: [],
      author: "Rheva", // Default author based on single-author assumption
      status: "Draft",
      featured: false,
      readingTime: 5,
      seoTitle: "",
      seoDescription: "",
    } as unknown as ArticleFormData
  });

  const onSubmit = async (data: ArticleFormData) => {
    setServerError(null);
    startTransition(async () => {
      try {
        if (isEdit) {
          await updateArticleAction(initialData.id, data);
        } else {
          const newId = await createArticleAction(data);
          router.push(`/admin/articles/${newId}`);
          return;
        }
        router.refresh();
      } catch (err: unknown) {
        setServerError((err as Error).message || "Failed to save article");
      }
    });
  };

  const generateSlug = () => {
    const title = watch("title");
    if (title && (!initialData || confirm("Warning: Changing a published slug can break links. Continue?"))) {
      const newSlug = (title as {id?: string})?.id?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      setValue("slug", newSlug || "", { shouldDirty: true, shouldValidate: true });
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
      <UnsavedChangesWarning isDirty={isDirty} />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/articles" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{isEdit ? "Edit Article" : "New Article"}</h1>
            <p className="text-sm text-muted-foreground">
              {isEdit ? "Update technical article." : "Write a new technical article."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* We do NOT bypass preview via URL parameters. If it's published, we can view it live. */}
          {isEdit && watch("status") === "Published" && (
            <a 
              href={`/articles/${initialData?.slug}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              View Live
            </a>
          )}
          
          <Button type="submit" disabled={loading || !isDirty}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Save Changes" : "Save Article"}
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
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Content</h2>
            
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input id="title" {...register("title")} placeholder="e.g. Understanding Next.js Server Actions" />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Button type="button" variant="ghost" size="sm" onClick={generateSlug} className="h-6 text-xs">
                  Generate from title
                </Button>
              </div>
              <Input id="slug" {...register("slug")} placeholder="e.g. understanding-nextjs-server-actions" />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt / Summary</Label>
              <Textarea id="excerpt" {...register("excerpt")} rows={3} placeholder="A short summary for lists and cards..." />
              {errors.excerpt && <p className="text-sm text-red-500">{errors.excerpt.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Structured Content (Markdown compatible)</Label>
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-md text-sm text-zinc-400 mb-2">
                Use Markdown formatting. H2-H4, paragraphs, lists, `inline code`, code blocks (```language), blockquotes (&gt;), tables, and callouts are supported by the public renderer.
              </div>
              <Textarea 
                id="content" 
                {...register("content")} 
                className="min-h-[500px] font-mono text-sm leading-relaxed" 
                placeholder="Write your technical article here..." 
              />
              {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
            </div>
          </section>

          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Cover Image</h2>
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded flex gap-4 items-start text-sm text-zinc-400">
              <ImageIcon className="h-5 w-5 mt-0.5 text-zinc-500" />
              <div>
                <strong className="text-zinc-300 block mb-1">Storage Integration Pending</strong>
                Firebase Storage integration will be added in Batch 29. For now, use absolute URLs to existing hosted images.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <Input {...register("coverImage.url")} placeholder="https://" />
                {errors.coverImage?.url && <p className="text-sm text-red-500">{errors.coverImage.url.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Cover Image Alt Text</Label>
                <Input {...register("coverImage.alt")} placeholder="Describe the image" />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Publication</h2>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <Select 
                value={watch("status")} 
                onValueChange={(val: "Draft" | "Published" | "Scheduled" | "Archived" | null) => val && setValue("status", val, { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {watch("status") === "Scheduled" && (
              <div className="p-3 bg-blue-950/30 border border-blue-900/50 rounded-md text-xs text-blue-400">
                <strong>Note:</strong> Automated publishing scheduler is not yet active. Setting to "Scheduled" will keep this article hidden from public view until manually changed to "Published" or infrastructure is enabled.
              </div>
            )}

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="featured" 
                checked={watch("featured")}
                onCheckedChange={(checked) => setValue("featured", checked === true, { shouldDirty: true })}
              />
              <Label htmlFor="featured" className="font-normal cursor-pointer">
                Feature article
              </Label>
            </div>
          </section>

          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Metadata</h2>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={watch("category")} 
                onValueChange={(val: string | null) => val && setValue("category", val, { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Next.js">Next.js</SelectItem>
                  <SelectItem value="Firebase">Firebase</SelectItem>
                  <SelectItem value="UI/UX">UI/UX</SelectItem>
                  <SelectItem value="Software Architecture">Software Architecture</SelectItem>
                  <SelectItem value="Data & Information Systems">Data & Information Systems</SelectItem>
                  <SelectItem value="Digital Administration">Digital Administration</SelectItem>
                  <SelectItem value="Productivity">Productivity</SelectItem>
                  <SelectItem value="Development Notes">Development Notes</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" {...register("author")} />
              {errors.author && <p className="text-sm text-red-500">{errors.author.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="readingTime">Est. Reading Time (minutes)</Label>
              <Input id="readingTime" type="number" min="1" {...register("readingTime", { valueAsNumber: true })} />
              {errors.readingTime && <p className="text-sm text-red-500">{errors.readingTime.message}</p>}
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
                    placeholder="e.g. Tutorial"
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

          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">SEO Configuration</h2>
            
            <div className="space-y-2">
              <Label htmlFor="seoTitle">Meta Title</Label>
              <Input id="seoTitle" {...register("seoTitle")} placeholder="Default: Article Title" />
              <div className="flex justify-between">
                {errors.seoTitle ? (
                  <span className="text-xs text-red-500">{errors.seoTitle.message}</span>
                ) : (
                  <span className="text-xs text-muted-foreground">Keep under 60 chars</span>
                )}
                <span className="text-xs text-muted-foreground">{watch("seoTitle")?.id?.length || 0}/60</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoDescription">Meta Description</Label>
              <Textarea id="seoDescription" {...register("seoDescription")} rows={3} placeholder="Default: Excerpt" />
              <div className="flex justify-between">
                {errors.seoDescription ? (
                  <span className="text-xs text-red-500">{errors.seoDescription.message}</span>
                ) : (
                  <span className="text-xs text-muted-foreground">Keep under 160 chars</span>
                )}
                <span className="text-xs text-muted-foreground">{watch("seoDescription")?.id?.length || 0}/160</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </form>
  );
}
