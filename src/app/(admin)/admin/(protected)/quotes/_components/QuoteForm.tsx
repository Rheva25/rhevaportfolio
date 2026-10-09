"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuoteFormData, QuoteSchema, Quote } from "@/lib/validations/quotes";
import { createQuoteAction, updateQuoteAction, deleteQuoteAction } from "@/app/actions/quotes";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Trash2 } from "lucide-react";
import { UnsavedChangesWarning } from "@/app/(admin)/admin/(protected)/projects/_components/UnsavedChangesWarning";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

interface QuoteFormProps {
  initialData?: Quote;
}

export function QuoteForm({ initialData }: QuoteFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<QuoteFormData>({
    resolver: zodResolver(QuoteSchema),
    defaultValues: initialData || {
      slug: "",
      quote: "",
      content: "",
      author: "Rheva",
      status: "Draft",
    }
  });

  const onSubmit = async (data: QuoteFormData) => {
    setError(null);
    startTransition(async () => {
      try {
        if (initialData) {
          await updateQuoteAction(initialData.id, data);
        } else {
          await createQuoteAction(data);
        }
        router.push("/admin/quotes");
      } catch (err: unknown) {
        setError((err as Error).message);
      }
    });
  };

  const handleDelete = () => {
    if (!initialData) return;
    if (!confirm("Are you sure you want to delete this quote?")) return;
    
    startTransition(async () => {
      try {
        await deleteQuoteAction(initialData.id);
        router.push("/admin/quotes");
      } catch (err: unknown) {
        setError((err as Error).message);
      }
    });
  };

  const loading = isPending || isSubmitting;

  // Auto-generate slug from quote text if empty
  const handleQuoteBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const slug = watch("slug");
    if (!slug && e.target.value) {
      const generated = e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
        .substring(0, 50);
      setValue("slug", generated, { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl pb-24">
      <UnsavedChangesWarning isDirty={isDirty} />
      
      {error && (
        <div className="p-4 bg-red-950 border border-red-900 text-red-400 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          
          <div className="space-y-2">
            <Label htmlFor="quote">The Quote / Short Highlight</Label>
            <Textarea 
              id="quote" 
              {...register("quote")} 
              onBlur={handleQuoteBlur}
              className="bg-zinc-900/50 resize-none h-24 text-lg font-medium" 
              placeholder="e.g. Karena kadang, bug yang paling susah di-debug ada di hati sendiri..."
            />
            {errors.quote && <p className="text-sm text-red-500">{errors.quote.message}</p>}
            <p className="text-xs text-muted-foreground">This is used for the thumbnail and big text.</p>
          </div>

          <div className="space-y-2">
            <Label>Full Rant / Content</Label>
            <div className="min-h-[400px]">
              <RichTextEditor 
                value={watch("content")} 
                onChange={(html) => setValue("content", html, { shouldValidate: true, shouldDirty: true })}
                placeholder="Write your developer rants here..."
              />
            </div>
            {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900/30 p-5 rounded-lg border border-zinc-800 space-y-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={watch("status")} onValueChange={(v: "Draft" | "Published") => setValue("status", v, { shouldDirty: true })}>
                <SelectTrigger className="bg-zinc-900/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug / URL Path</Label>
              <Input id="slug" {...register("slug")} className="bg-zinc-900/50" />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author (Watermark)</Label>
              <Input id="author" {...register("author")} className="bg-zinc-900/50" placeholder="e.g. iqbalabs" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
        <Button type="button" variant="destructive" onClick={handleDelete} disabled={!initialData || loading} className={!initialData ? "invisible" : ""}>
          <Trash2 className="h-4 w-4 mr-2" /> Delete
        </Button>
        <Button type="submit" disabled={loading || !isDirty}>
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {initialData ? "Save Changes" : "Create Quote"}
        </Button>
      </div>
    </form>
  );
}
