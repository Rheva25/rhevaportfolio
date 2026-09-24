"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, ProjectFormData, Project } from "@/lib/validations/project";
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
import { createProjectAction, updateProjectAction } from "@/app/actions/projects";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { UnsavedChangesWarning } from "./UnsavedChangesWarning";

interface ProjectFormProps {
  initialData?: Project;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
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
  } = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      category: "",
      status: "Draft", // Default to Draft conceptually, but schema requires strict enums
      visibility: "Draft",
      featured: false,
      year: new Date().getFullYear(),
      technologies: [],
      heroImage: null,
      gallery: [],
      overview: "",
      problem: "",
      solution: "",
      features: [],
      process: [],
      challenges: "",
      outcome: "",
      links: [],
      seoTitle: "",
      seoDescription: "",
    } as unknown as ProjectFormData
  });

  const { fields: linkFields, append: appendLink, remove: removeLink } = useFieldArray({
    control,
    name: "links"
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: "features" as never // react-hook-form typing for flat arrays of strings is tricky, we'll cast
  });
  
  const { fields: processFields, append: appendProcess } = useFieldArray({
    control,
    name: "process" as never
  });

  const { fields: galleryFields, append: appendGallery, remove: removeGallery } = useFieldArray({
    control,
    name: "gallery"
  });

  const onSubmit = async (data: ProjectFormData) => {
    setServerError(null);
    startTransition(async () => {
      try {
        if (isEdit) {
          await updateProjectAction(initialData.id, data);
        } else {
          const newId = await createProjectAction(data);
          // Redirect to edit page on successful create
          router.push(`/admin/projects/${newId}`);
          return;
        }
        router.refresh();
      } catch (err: unknown) {
        setServerError((err as Error).message || "Failed to save project");
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

  // Helper for primitive arrays
  const addStringItem = (name: "features" | "process" | "technologies") => {
    const current = watch(name) || [];
    setValue(name, [...current, name === "technologies" ? "" : { id: "", en: "" }] as never, { shouldDirty: true });
  };
  const updateStringItem = (name: "features" | "process" | "technologies", index: number, val: unknown) => {
    const current = [...(watch(name) || [])];
    current[index] = val as never;
    setValue(name, current as never, { shouldDirty: true });
  };
  const removeStringItem = (name: "features" | "process" | "technologies", index: number) => {
    const current = [...(watch(name) || [])];
    current.splice(index, 1);
    setValue(name, current as never, { shouldDirty: true });
  };

  const loading = isPending || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
      <UnsavedChangesWarning isDirty={isDirty} />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{isEdit ? "Edit Project" : "New Project"}</h1>
            <p className="text-sm text-muted-foreground">
              {isEdit ? "Update portfolio project." : "Create a new portfolio project."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && (
            <a 
              href={`/projects/${initialData?.slug}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              Preview
            </a>
          )}
          <Button type="submit" disabled={loading || !isDirty}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Save Changes" : "Create Project"}
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
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Basic Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" {...register("title")} placeholder="e.g. Rheva Developer Platform" />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Button type="button" variant="ghost" size="sm" onClick={generateSlug} className="h-6 text-xs">
                  Generate from title
                </Button>
              </div>
              <Input id="slug" {...register("slug")} placeholder="e.g. rheva-platform" />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description (Summary)</Label>
              <Textarea id="shortDescription" {...register("shortDescription")} rows={2} />
              {errors.shortDescription && <p className="text-sm text-red-500">{errors.shortDescription.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea id="description" {...register("description")} rows={5} />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>
          </section>

          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Case Study Content</h2>
            
            <div className="space-y-2">
              <Label htmlFor="overview">Overview</Label>
              <Textarea id="overview" {...register("overview")} rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="problem">Problem</Label>
                <Textarea id="problem" {...register("problem")} rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solution">Solution</Label>
                <Textarea id="solution" {...register("solution")} rows={4} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Features</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addStringItem("features")}>
                  <Plus className="mr-1 h-3 w-3" /> Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {(watch("features") || []).map((feat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="grid grid-cols-2 gap-2 w-full">
        <Input value={(feat as {id?: string})?.id || (typeof feat === 'string' ? feat : "") || ""} onChange={(e) => updateStringItem("features", index, typeof feat === 'string' ? { id: e.target.value, en: "" } : { ...(feat as Record<string, string>), id: e.target.value })} placeholder="e.g. Real-time sync (ID)" />
        <Input value={(feat as {en?: string})?.en || ""} onChange={(e) => updateStringItem("features", index, typeof feat === 'string' ? { id: feat, en: e.target.value } : { ...(feat as Record<string, string>), en: e.target.value })} placeholder="e.g. Real-time sync (EN)" />
      </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeStringItem("features", index)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Process</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addStringItem("process")}>
                  <Plus className="mr-1 h-3 w-3" /> Add Step
                </Button>
              </div>
              <div className="space-y-2">
                {(watch("process") || []).map((step, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="grid grid-cols-2 gap-2 w-full">
        <Input value={(step as {id?: string})?.id || (typeof step === 'string' ? step : "") || ""} onChange={(e) => updateStringItem("process", index, typeof step === 'string' ? { id: e.target.value, en: "" } : { ...(step as Record<string, string>), id: e.target.value })} placeholder="e.g. Discovery & Planning (ID)" />
        <Input value={(step as {en?: string})?.en || ""} onChange={(e) => updateStringItem("process", index, typeof step === 'string' ? { id: step, en: e.target.value } : { ...(step as Record<string, string>), en: e.target.value })} placeholder="e.g. Discovery & Planning (EN)" />
      </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeStringItem("process", index)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="challenges">Challenges</Label>
                <Textarea id="challenges" {...register("challenges")} rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outcome">Outcome</Label>
                <Textarea id="outcome" {...register("outcome")} rows={4} />
              </div>
            </div>
          </section>

          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Media & Gallery</h2>
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded flex gap-4 items-start text-sm text-zinc-400">
              <ImageIcon className="h-5 w-5 mt-0.5 text-zinc-500" />
              <div>
                <strong className="text-zinc-300 block mb-1">Storage Integration Pending</strong>
                Firebase Storage integration will be added in a future batch. For now, you must use absolute URLs to existing hosted images (e.g., https://example.com/image.jpg).
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Hero Image URL</Label>
              <Input {...register("heroImage.url")} placeholder="https://" />
              {errors.heroImage?.url && <p className="text-sm text-red-500">{errors.heroImage.url.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Hero Image Alt Text</Label>
              <Input {...register("heroImage.alt")} placeholder="Describe the image" />
            </div>

            <div className="space-y-4 mt-6 pt-6 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <Label>Gallery Images</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => appendGallery({ url: "", alt: "", caption: "", order: galleryFields.length })}>
                  <Plus className="mr-1 h-3 w-3" /> Add Image
                </Button>
              </div>
              <div className="space-y-4">
                {galleryFields.map((field, index) => (
                  <div key={field.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg relative">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 hover:bg-red-950 hover:text-red-500"
                      onClick={() => removeGallery(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="space-y-4 pr-10">
                      <div className="space-y-2">
                        <Label>URL</Label>
                        <Input {...register(`gallery.${index}.url` as const)} placeholder="https://" />
                        {errors.gallery?.[index]?.url && <p className="text-sm text-red-500">{errors.gallery[index]?.url?.message}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Alt Text</Label>
                          <Input {...register(`gallery.${index}.alt` as const)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Caption</Label>
                          <Input {...register(`gallery.${index}.caption` as const)} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Classification</h2>
            
            <div className="space-y-2">
              <Label>Visibility</Label>
              <Select 
                value={watch("visibility")} 
                onValueChange={(val: "Draft" | "Published" | "Archived" | null) => val && setValue("visibility", val, { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select 
                value={watch("status")} 
                onValueChange={(val: "Completed" | "In Progress" | "Maintenance" | "Archived" | null) => val && setValue("status", val, { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register("category")} placeholder="e.g. Web App, E-Commerce" />
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" {...register("year")} />
              {errors.year && <p className="text-sm text-red-500">{errors.year.message}</p>}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="featured" 
                checked={watch("featured")}
                onCheckedChange={(checked) => setValue("featured", checked === true, { shouldDirty: true })}
              />
              <Label htmlFor="featured" className="font-normal cursor-pointer">
                Feature on homepage
              </Label>
            </div>
          </section>

          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h2 className="text-lg font-semibold">Links</h2>
              <Button type="button" variant="ghost" size="sm" onClick={() => appendLink({ label: {id:"", en:""}, url: "" })}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {linkFields.map((field, index) => (
                <div key={field.id} className="space-y-2 p-3 bg-zinc-950 border border-zinc-800 rounded relative">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:text-red-500"
                    onClick={() => removeLink(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <div className="pr-8 space-y-2">
                    <Input {...register(`links.${index}.label` as const)} placeholder="Label (e.g. Live Demo)" className="h-8 text-sm" />
                    {errors.links?.[index]?.label && <p className="text-xs text-red-500">{errors.links[index]?.label?.message}</p>}
                    <Input {...register(`links.${index}.url` as const)} placeholder="https://" className="h-8 text-sm" />
                    {errors.links?.[index]?.url && <p className="text-xs text-red-500">{errors.links[index]?.url?.message}</p>}
                  </div>
                </div>
              ))}
              {linkFields.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No links added.</p>
              )}
            </div>
          </section>

          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Technologies</h2>
            <div className="space-y-2">
              {(watch("technologies") || []).map((tech, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input 
                    value={tech} 
                    onChange={(e) => updateStringItem("technologies", index, e.target.value)} 
                    placeholder="e.g. Next.js"
                    className="h-8 text-sm"
                  />
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeStringItem("technologies", index)}>
                    <Trash2 className="h-3 w-3 text-muted-foreground hover:text-red-500" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => addStringItem("technologies")}>
                <Plus className="mr-1 h-3 w-3" /> Add Technology
              </Button>
            </div>
          </section>

          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">SEO Configuration</h2>
            
            <div className="space-y-2">
              <Label htmlFor="seoTitle">Meta Title</Label>
              <Input id="seoTitle" {...register("seoTitle")} placeholder="Default: Project Title" />
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
              <Textarea id="seoDescription" {...register("seoDescription")} rows={3} placeholder="Default: Short Description" />
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
