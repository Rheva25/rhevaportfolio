"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TemplateSchema, TemplateFormData, Template } from "@/lib/validations/template";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, Save, Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createTemplateAction, updateTemplateAction } from "@/app/actions/templates";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function TemplateForm({ template }: { template?: Template }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const defaultValues: Partial<TemplateFormData> = template || {
    name: { id: "", en: "" },
    slug: "",
    shortDescription: { id: "", en: "" },
    description: { id: "", en: "" },
    category: "Frontend Template",
    status: "Available",
    visibility: "Draft",
    featured: false,
    pricingType: "Free",
    price: "Free",
    demoUrl: "",
    sourceUrl: "",
    thumbnail: { url: "", alt: "" },
    features: [],
    technologies: [],
  };

  const { register, handleSubmit, control, formState: { errors } } = useForm<TemplateFormData>({
    resolver: zodResolver(TemplateSchema),
    defaultValues,
  });

  const onSubmit = (data: TemplateFormData) => {
    setError("");
    startTransition(async () => {
      try {
        if (template?.id) {
          await updateTemplateAction(template.id, data);
        } else {
          await createTemplateAction(data);
        }
        router.push("/admin/templates");
        router.refresh();
      } catch (err: unknown) {
        console.error(err);
        setError((err as Error).message || "Failed to save template");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10 bg-background/95 backdrop-blur py-4 border-b">
        <div className="flex items-center gap-4">
          <Link href="/admin/templates" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {template ? "Edit Template" : "New Template"}
            </h1>
            <p className="text-sm text-muted-foreground hidden sm:block">
              {template ? `Editing template details` : "Create a new frontend template"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {error && <span className="text-sm text-red-500 mr-4">{error}</span>}
          <Link href="/admin/templates" className={buttonVariants({ variant: "outline" })}>
            Cancel
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="en">
                <TabsList className="mb-4">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="id">Indonesian</TabsTrigger>
                </TabsList>
                
                <TabsContent value="en" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name (EN)</Label>
                    <Input {...register("name.en")} />
                    {errors.name?.en && <p className="text-sm text-red-500">{errors.name.en.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Short Description (EN)</Label>
                    <Textarea {...register("shortDescription.en")} />
                    {errors.shortDescription?.en && <p className="text-sm text-red-500">{errors.shortDescription.en.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Full Description (EN)</Label>
                    <Textarea rows={6} {...register("description.en")} />
                    {errors.description?.en && <p className="text-sm text-red-500">{errors.description.en.message}</p>}
                  </div>
                </TabsContent>
                
                <TabsContent value="id" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name (ID)</Label>
                    <Input {...register("name.id")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Short Description (ID)</Label>
                    <Textarea {...register("shortDescription.id")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Full Description (ID)</Label>
                    <Textarea rows={6} {...register("description.id")} />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input {...register("slug")} />
                <p className="text-sm text-muted-foreground">URL friendly name (lowercase, hyphens only)</p>
                {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links & Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Demo URL</Label>
                <Input placeholder="https://..." {...register("demoUrl")} />
                {errors.demoUrl && <p className="text-sm text-red-500">{errors.demoUrl.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Source / Purchase URL (Gumroad/Github)</Label>
                <Input placeholder="https://..." {...register("sourceUrl")} />
                {errors.sourceUrl && <p className="text-sm text-red-500">{errors.sourceUrl.message}</p>}
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">Thumbnail Image</h3>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input {...register("thumbnail.url")} />
                </div>
                <div className="space-y-2">
                  <Label>Alt Text</Label>
                  <Input {...register("thumbnail.alt")} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Visibility</Label>
                <Controller
                  name="visibility"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Featured</Label>
                  <p className="text-sm text-muted-foreground">Show on homepage</p>
                </div>
                <Controller
                  name="featured"
                  control={control}
                  render={({ field }) => (
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Pricing Type</Label>
                <Controller
                  name="pricingType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Free">Free</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label>Display Price</Label>
                <Input placeholder="e.g. Free, $49, Rp150.000" {...register("price")} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
