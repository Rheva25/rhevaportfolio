"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, ProductFormData, Product } from "@/lib/validations/product";
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
import { createProductAction, updateProductAction } from "@/app/actions/products";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { UnsavedChangesWarning } from "@/app/(admin)/admin/(protected)/projects/_components/UnsavedChangesWarning";

interface AppFormProps {
  initialData?: Product;
}

export function AppForm({ initialData }: AppFormProps) {
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
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      shortDescription: "",
      description: "",
      category: "",
      status: "In Development",
      visibility: "Draft",
      featured: false,
      pricingModel: "Free / Open",
      platform: "",
      technologies: [],
      logo: null,
      heroImage: null,
      gallery: [],
      benefits: [],
      features: [],
      requirements: [],
      deployment: "",
      links: [],
      seoTitle: "",
      seoDescription: "",
      ogImage: null,
    } as unknown as ProductFormData
  });

  const { fields: linkFields, append: appendLink, remove: removeLink } = useFieldArray({
    control,
    name: "links"
  });

  const { fields: galleryFields, append: appendGallery, remove: removeGallery } = useFieldArray({
    control,
    name: "gallery"
  });

  const onSubmit = async (data: ProductFormData) => {
    setServerError(null);
    startTransition(async () => {
      try {
        if (isEdit) {
          await updateProductAction(initialData.id, data);
        } else {
          const newId = await createProductAction(data);
          router.push(`/admin/apps/${newId}`);
          return;
        }
        router.refresh();
      } catch (err: unknown) {
        setServerError((err as Error).message || "Failed to save product");
      }
    });
  };

  const generateSlug = () => {
    const name = watch("name");
    if (name && (!initialData || confirm("Warning: Changing a published slug can break links. Continue?"))) {
      const newSlug = (name as {id?: string})?.id?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      setValue("slug", newSlug || "", { shouldDirty: true, shouldValidate: true });
    }
  };

  const addStringItem = (name: "features" | "benefits" | "requirements" | "technologies") => {
    const current = watch(name) || [];
    setValue(name, [...current, name === "technologies" ? "" : { id: "", en: "" }] as never, { shouldDirty: true });
  };
  const updateStringItem = (name: "features" | "benefits" | "requirements" | "technologies", index: number, val: unknown) => {
    const current = [...(watch(name) || [])];
    current[index] = val as never;
    setValue(name, current as never, { shouldDirty: true });
  };
  const removeStringItem = (name: "features" | "benefits" | "requirements" | "technologies", index: number) => {
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
          <Link href="/admin/apps" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{isEdit ? "Edit Product" : "New Product"}</h1>
            <p className="text-sm text-muted-foreground">
              {isEdit ? "Update product details." : "Create a new product or app."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && (
            <a 
              href={`/apps/${initialData?.slug}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              Preview
            </a>
          )}
          <Button type="submit" disabled={loading || !isDirty}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Save Changes" : "Create Product"}
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
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" {...register("name")} placeholder="e.g. Rheva CMS" />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Button type="button" variant="ghost" size="sm" onClick={generateSlug} className="h-6 text-xs">
                  Generate from name
                </Button>
              </div>
              <Input id="slug" {...register("slug")} placeholder="e.g. rheva-cms" />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
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
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Product Capabilities</h2>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Benefits</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addStringItem("benefits")}>
                  <Plus className="mr-1 h-3 w-3" /> Add Benefit
                </Button>
              </div>
              <div className="space-y-2">
                {(watch("benefits") || []).map((feat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="grid grid-cols-2 gap-2 w-full">
        <Input value={(feat as {id?: string})?.id || (typeof feat === 'string' ? feat : "") || ""} onChange={(e) => updateStringItem("benefits", index, typeof feat === 'string' ? { id: e.target.value, en: "" } : { ...(feat as Record<string, string>), id: e.target.value })} placeholder="e.g. Centralized administration (ID)" />
        <Input value={(feat as {en?: string})?.en || ""} onChange={(e) => updateStringItem("benefits", index, typeof feat === 'string' ? { id: feat, en: e.target.value } : { ...(feat as Record<string, string>), en: e.target.value })} placeholder="e.g. Centralized administration (EN)" />
      </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeStringItem("benefits", index)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 mt-4">
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
        <Input value={(feat as {id?: string})?.id || (typeof feat === 'string' ? feat : "") || ""} onChange={(e) => updateStringItem("features", index, typeof feat === 'string' ? { id: e.target.value, en: "" } : { ...(feat as Record<string, string>), id: e.target.value })} placeholder="e.g. Drag-and-drop builder (ID)" />
        <Input value={(feat as {en?: string})?.en || ""} onChange={(e) => updateStringItem("features", index, typeof feat === 'string' ? { id: feat, en: e.target.value } : { ...(feat as Record<string, string>), en: e.target.value })} placeholder="e.g. Drag-and-drop builder (EN)" />
      </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeStringItem("features", index)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <Label>Requirements</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addStringItem("requirements")}>
                  <Plus className="mr-1 h-3 w-3" /> Add Requirement
                </Button>
              </div>
              <div className="space-y-2">
                {(watch("requirements") || []).map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="grid grid-cols-2 gap-2 w-full">
        <Input value={(req as {id?: string})?.id || (typeof req === 'string' ? req : "") || ""} onChange={(e) => updateStringItem("requirements", index, typeof req === "string" ? { id: e.target.value, en: "" } : { ...(req as Record<string, string>), id: e.target.value })} placeholder="e.g. Modern web browser (ID)" />
        <Input value={(req as {en?: string})?.en || ""} onChange={(e) => updateStringItem("requirements", index, typeof req === "string" ? { id: req, en: e.target.value } : { ...(req as Record<string, string>), en: e.target.value })} placeholder="e.g. Modern web browser (EN)" />
      </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeStringItem("requirements", index)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="deployment">Deployment Options</Label>
              <Textarea id="deployment" {...register("deployment")} rows={3} placeholder="e.g. Vercel, Custom Server, On-premise" />
            </div>
          </section>

          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Branding & Media</h2>
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded flex gap-4 items-start text-sm text-zinc-400">
              <ImageIcon className="h-5 w-5 mt-0.5 text-zinc-500" />
              <div>
                <strong className="text-zinc-300 block mb-1">Storage Integration Pending</strong>
                Firebase Storage integration will be added in a future batch. For now, use absolute URLs to existing hosted images.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input {...register("logo.url")} placeholder="https://" />
                {errors.logo?.url && <p className="text-sm text-red-500">{errors.logo.url.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Logo Alt Text</Label>
                <Input {...register("logo.alt")} placeholder="Describe the logo" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Hero Image URL</Label>
                <Input {...register("heroImage.url")} placeholder="https://" />
                {errors.heroImage?.url && <p className="text-sm text-red-500">{errors.heroImage.url.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Hero Image Alt Text</Label>
                <Input {...register("heroImage.alt")} placeholder="Describe the image" />
              </div>
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
                onValueChange={(val: "Available" | "In Development" | "Coming Soon" | "Custom Deployment" | "Request Access" | "Archived" | null) => val && setValue("status", val, { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="In Development">In Development</SelectItem>
                  <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                  <SelectItem value="Custom Deployment">Custom Deployment</SelectItem>
                  <SelectItem value="Request Access">Request Access</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register("category")} placeholder="e.g. Admin Tool, API" />
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Input id="platform" {...register("platform")} placeholder="e.g. Web, iOS, macOS" />
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
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Pricing & Access</h2>
            
            <div className="space-y-2">
              <Label>Pricing Model</Label>
              <Select 
                value={watch("pricingModel")} 
                onValueChange={(val: "Fixed Price" | "Request Pricing" | "Custom Deployment" | "Request Access" | "Free / Open" | "Coming Soon" | null) => val && setValue("pricingModel", val, { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select pricing model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fixed Price">Fixed Price</SelectItem>
                  <SelectItem value="Request Pricing">Request Pricing</SelectItem>
                  <SelectItem value="Custom Deployment">Custom Deployment</SelectItem>
                  <SelectItem value="Request Access">Request Access</SelectItem>
                  <SelectItem value="Free / Open">Free / Open</SelectItem>
                  <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                </SelectContent>
              </Select>
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
                    placeholder="e.g. React"
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
              <Input id="seoTitle" {...register("seoTitle")} placeholder="Default: Product Name" />
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

            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="space-y-2">
                <Label>OG Image URL (Optional)</Label>
                <Input {...register("ogImage.url")} placeholder="https://" />
                {errors.ogImage?.url && <p className="text-sm text-red-500">{errors.ogImage.url.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>OG Image Alt Text</Label>
                <Input {...register("ogImage.alt")} placeholder="Describe the OG image" />
              </div>
            </div>
          </section>

        </div>
      </div>
    </form>
  );
}
