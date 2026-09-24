"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiteSettingsSchema, SiteSettingsFormData, SiteSettings } from "@/lib/validations/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { updateSiteSettingsAction } from "@/app/actions/settings";
import { useRouter } from "next/navigation";
import { Loader2, Settings, User, Mail, Search, Globe, Layout, ShieldAlert, Plus, Trash2, GripVertical, AlertTriangle } from "lucide-react";
import { UnsavedChangesWarning } from "@/app/(admin)/admin/(protected)/projects/_components/UnsavedChangesWarning";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type TabId = 'general' | 'profile' | 'contact' | 'seo' | 'publicSite' | 'defaults' | 'security' | 'danger';

interface SettingsFormProps {
  initialData: SiteSettings;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<SiteSettingsFormData>({
    resolver: zodResolver(SiteSettingsSchema),
    defaultValues: initialData
  });

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control,
    name: "socialLinks"
  });

  const { fields: navFields, append: appendNav, remove: removeNav, move: moveNav } = useFieldArray({
    control,
    name: "publicSite.navigation"
  });

  const onSubmit = async (data: SiteSettingsFormData) => {
    setServerError(null);
    setSaveSuccess(false);
    startTransition(async () => {
      try {
        await updateSiteSettingsAction(data);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        router.refresh();
      } catch (err: unknown) {
        setServerError((err as Error).message || "Failed to save settings");
      }
    });
  };

  const loading = isPending || isSubmitting;

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'general', label: 'General', icon: <Settings className="h-4 w-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="h-4 w-4" /> },
    { id: 'seo', label: 'SEO & Social', icon: <Search className="h-4 w-4" /> },
    { id: 'publicSite', label: 'Public Site', icon: <Globe className="h-4 w-4" /> },
    { id: 'defaults', label: 'Content Defaults', icon: <Layout className="h-4 w-4" /> },
    { id: 'security', label: 'Security', icon: <ShieldAlert className="h-4 w-4" /> },
    { id: 'danger', label: 'Danger Zone', icon: <AlertTriangle className="h-4 w-4" /> },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-24">
      <UnsavedChangesWarning isDirty={isDirty} />
      
      {/* Header & Mobile Tabs */}
      <div className="flex flex-col gap-6 mb-8 border-b border-zinc-800 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage platform configuration and site behavior.
            </p>
          </div>
          
          <div className="flex items-center gap-4 fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-zinc-800 sm:relative sm:p-0 sm:bg-transparent sm:border-0 z-40">
            <Button type="submit" disabled={loading || !isDirty} className="w-full sm:w-auto">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {saveSuccess ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </div>
        
        {serverError && (
          <div className="p-4 rounded-md bg-red-950 border border-red-900 text-red-400">
            {serverError}
          </div>
        )}

        <div className="lg:hidden">
          <Select value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
            <SelectTrigger className="w-full bg-zinc-900/50">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((tab) => (
                <SelectItem key={tab.id} value={tab.id}>
                  <div className="flex items-center gap-2">
                    {tab.icon} {tab.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Desktop Sidebar Navigation */}
        <div className="hidden lg:block w-64 shrink-0">
          <nav className="flex flex-col gap-1 sticky top-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-zinc-800 text-foreground' 
                    : 'text-muted-foreground hover:bg-zinc-900 hover:text-foreground'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content Area */}
        <div className="flex-1 max-w-4xl min-w-0">
          
          {/* GENERAL TAB */}
          <div className={activeTab === 'general' ? 'block space-y-8' : 'hidden'}>
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">General Settings</h2>
                <p className="text-sm text-muted-foreground">Basic platform identity and localization.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" {...register("siteName")} className="bg-zinc-900/50" />
                  {errors.siteName && <p className="text-sm text-red-500">{errors.siteName.message}</p>}
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea id="siteDescription" {...register("siteDescription")} className="bg-zinc-900/50 resize-none h-20" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Canonical Site URL</Label>
                  <Input id="siteUrl" {...register("siteUrl")} className="bg-zinc-900/50" />
                  {errors.siteUrl && <p className="text-sm text-red-500">{errors.siteUrl.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" {...register("language")} className="bg-zinc-900/50" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" {...register("timezone")} className="bg-zinc-900/50" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Input id="dateFormat" {...register("dateFormat")} className="bg-zinc-900/50" />
                </div>
              </div>
            </section>
          </div>

          {/* PROFILE TAB */}
          <div className={activeTab === 'profile' ? 'block space-y-8' : 'hidden'}>
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Professional Profile</h2>
                <p className="text-sm text-muted-foreground">Your identity across the platform.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="profile.fullName">Full Name</Label>
                  <Input id="profile.fullName" {...register("profile.fullName")} className="bg-zinc-900/50" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile.professionalTitle">Professional Title</Label>
                  <Input id="profile.professionalTitle" {...register("profile.professionalTitle")} className="bg-zinc-900/50" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="profile.shortBio">Short Bio</Label>
                  <Textarea id="profile.shortBio" {...register("profile.shortBio")} className="bg-zinc-900/50 resize-none h-24" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="profile.professionalFocus">Professional Focus</Label>
                  <Input id="profile.professionalFocus" {...register("profile.professionalFocus")} className="bg-zinc-900/50" placeholder="e.g. Full-stack engineering, Systems architecture" />
                </div>

                <div className="space-y-2 md:col-span-2 pt-4 border-t border-zinc-800">
                  <Label>Profile Photo Reference</Label>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <Input {...register("profile.profilePhoto.url")} placeholder="https://... image URL from Media Library" className="bg-zinc-900/50" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input {...register("profile.profilePhoto.alt")} placeholder="Alt text" className="bg-zinc-900/50" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Paste a URL from the Media Library here.</p>
                </div>
              </div>
            </section>
          </div>

          {/* CONTACT TAB */}
          <div className={activeTab === 'contact' ? 'block space-y-8' : 'hidden'}>
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Contact Configuration</h2>
                <p className="text-sm text-muted-foreground">Manage how clients get in touch with you.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact.primaryEmail">Primary Email</Label>
                  <Input id="contact.primaryEmail" type="email" {...register("contact.primaryEmail")} className="bg-zinc-900/50" />
                  {errors.contact?.primaryEmail && <p className="text-sm text-red-500">{errors.contact.primaryEmail.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact.secondaryEmail">Secondary Email (Optional)</Label>
                  <Input id="contact.secondaryEmail" type="email" {...register("contact.secondaryEmail")} className="bg-zinc-900/50" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact.whatsapp">WhatsApp Number</Label>
                  <Input id="contact.whatsapp" {...register("contact.whatsapp")} className="bg-zinc-900/50" placeholder="+1234567890" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact.serviceArea">Service Area</Label>
                  <Input id="contact.serviceArea" {...register("contact.serviceArea")} className="bg-zinc-900/50" placeholder="e.g. Worldwide, Remote" />
                </div>

                <div className="space-y-2">
                  <Label>Preferred Contact Method</Label>
                  <Select value={watch("contact.preferredContactMethod")} onValueChange={(val) => val && setValue("contact.preferredContactMethod", val, { shouldDirty: true })}>
                    <SelectTrigger className="bg-zinc-900/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="form">Contact Form</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 md:col-span-2 pt-4 border-t border-zinc-800">
                  <div className="flex items-center justify-between bg-zinc-900/30 p-4 rounded-lg border border-zinc-800">
                    <div>
                      <Label className="text-base">Contact Form Enabled</Label>
                      <p className="text-sm text-muted-foreground">Enable the public inquiry form.</p>
                    </div>
                    <Switch
                      checked={watch("contact.contactFormEnabled")}
                      onCheckedChange={(checked: boolean) => setValue("contact.contactFormEnabled", checked, { shouldDirty: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact.successMessage">Contact Form Success Message</Label>
                    <Textarea id="contact.successMessage" {...register("contact.successMessage")} className="bg-zinc-900/50 resize-none" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* SEO TAB */}
          <div className={activeTab === 'seo' ? 'block space-y-8' : 'hidden'}>
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">SEO & Social</h2>
                <p className="text-sm text-muted-foreground">Search engine optimization and social metadata.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="seo.defaultTitle">Default SEO Title</Label>
                  <Input id="seo.defaultTitle" {...register("seo.defaultTitle")} className="bg-zinc-900/50" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo.defaultDescription">Default SEO Description</Label>
                  <Textarea id="seo.defaultDescription" {...register("seo.defaultDescription")} className="bg-zinc-900/50 h-20 resize-none" />
                </div>

                <div className="space-y-2">
                  <Label>Open Graph Image URL</Label>
                  <Input {...register("seo.ogImage.url")} className="bg-zinc-900/50" placeholder="https://..." />
                </div>
                
                <div className="space-y-2">
                  <Label>Favicon URL</Label>
                  <Input {...register("seo.favicon.url")} className="bg-zinc-900/50" placeholder="https://..." />
                </div>

                <div className="space-y-4 pt-6 border-t border-zinc-800">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Social Links</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendSocial({ platform: "", url: "" })}>
                      <Plus className="h-4 w-4 mr-2" /> Add Social Link
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {socialFields.length === 0 && (
                      <p className="text-sm text-muted-foreground italic text-center py-4 bg-zinc-900/20 rounded-md border border-dashed border-zinc-800">No social links configured.</p>
                    )}
                    {socialFields.map((field, index) => (
                      <div key={field.id} className="flex items-start gap-3 bg-zinc-900/30 p-3 rounded-md border border-zinc-800">
                        <div className="flex-1 space-y-2">
                          <Input {...register(`socialLinks.${index}.platform`)} placeholder="Platform (e.g. GitHub, LinkedIn)" className="bg-zinc-900/50 h-8 text-sm" />
                          {errors.socialLinks?.[index]?.platform && <p className="text-xs text-red-500">{errors.socialLinks[index]?.platform?.message}</p>}
                        </div>
                        <div className="flex-[2] space-y-2">
                          <Input {...register(`socialLinks.${index}.url`)} placeholder="URL" className="bg-zinc-900/50 h-8 text-sm" />
                          {errors.socialLinks?.[index]?.url && <p className="text-xs text-red-500">{errors.socialLinks[index]?.url?.message}</p>}
                        </div>
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-950/30 shrink-0" onClick={() => removeSocial(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* PUBLIC SITE TAB */}
          <div className={activeTab === 'publicSite' ? 'block space-y-8' : 'hidden'}>
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Public Site Configuration</h2>
                <p className="text-sm text-muted-foreground">Manage navigation and homepage layout.</p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label className="text-base">Main Navigation</Label>
                  <Button type="button" variant="outline" size="sm" onClick={() => appendNav({ label: {id: "New Link", en: ""}, href: "/", visible: true, order: navFields.length })}>
                    <Plus className="h-4 w-4 mr-2" /> Add Link
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {navFields.length === 0 && (
                    <p className="text-sm text-muted-foreground italic text-center py-4 bg-zinc-900/20 rounded-md border border-dashed border-zinc-800">No navigation items configured.</p>
                  )}
                  {navFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3 bg-zinc-900/30 p-2 rounded-md border border-zinc-800">
                      <div className="flex flex-col gap-1 shrink-0 px-1">
                        <Button type="button" variant="ghost" size="icon" className="h-5 w-5" onClick={() => index > 0 && moveNav(index, index - 1)} disabled={index === 0}>
                          ▲
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="h-5 w-5" onClick={() => index < navFields.length - 1 && moveNav(index, index + 1)} disabled={index === navFields.length - 1}>
                          ▼
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 items-center">
                        <Input {...register(`publicSite.navigation.${index}.label`)} placeholder="Label" className="bg-zinc-900/50 h-8 text-sm" />
                        <Input {...register(`publicSite.navigation.${index}.href`)} placeholder="/path" className="bg-zinc-900/50 h-8 text-sm sm:col-span-2" />
                        <div className="flex items-center justify-end gap-2">
                          <Label className="text-xs text-muted-foreground">Visible</Label>
                          <Switch 
                            checked={watch(`publicSite.navigation.${index}.visible`)} 
                            onCheckedChange={(c: boolean) => setValue(`publicSite.navigation.${index}.visible`, c, { shouldDirty: true })} 
                          />
                        </div>
                      </div>
                      
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-950/30 shrink-0" onClick={() => removeNav(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

            </section>
          </div>

          {/* DEFAULTS TAB */}
          <div className={activeTab === 'defaults' ? 'block space-y-8' : 'hidden'}>
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Content Defaults</h2>
                <p className="text-sm text-muted-foreground">Default values applied when creating new CMS records.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="space-y-4 bg-zinc-900/20 p-5 rounded-lg border border-zinc-800/50">
                  <h3 className="font-medium text-blue-400">Projects</h3>
                  <div className="space-y-2">
                    <Label>Default Category</Label>
                    <Input {...register("contentDefaults.project.category")} className="bg-zinc-900/50 h-8" />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Status</Label>
                    <Select value={watch("contentDefaults.project.status")} onValueChange={(val) => val && setValue("contentDefaults.project.status", val, { shouldDirty: true })}>
                      <SelectTrigger className="bg-zinc-900/50 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4 bg-zinc-900/20 p-5 rounded-lg border border-zinc-800/50">
                  <h3 className="font-medium text-emerald-400">Apps / Products</h3>
                  <div className="space-y-2">
                    <Label>Default Category</Label>
                    <Input {...register("contentDefaults.app.category")} className="bg-zinc-900/50 h-8" />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Pricing Model</Label>
                    <Input {...register("contentDefaults.app.pricingModel")} className="bg-zinc-900/50 h-8" />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Status</Label>
                    <Select value={watch("contentDefaults.app.status")} onValueChange={(val) => val && setValue("contentDefaults.app.status", val, { shouldDirty: true })}>
                      <SelectTrigger className="bg-zinc-900/50 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4 bg-zinc-900/20 p-5 rounded-lg border border-zinc-800/50 md:col-span-2">
                  <h3 className="font-medium text-amber-400">Articles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Default Category</Label>
                      <Input {...register("contentDefaults.article.category")} className="bg-zinc-900/50 h-8" />
                    </div>
                    <div className="space-y-2">
                      <Label>Default Author Name</Label>
                      <Input {...register("contentDefaults.article.author")} className="bg-zinc-900/50 h-8" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Default Status</Label>
                      <Select value={watch("contentDefaults.article.status")} onValueChange={(val) => val && setValue("contentDefaults.article.status", val, { shouldDirty: true })}>
                        <SelectTrigger className="bg-zinc-900/50 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </div>

          {/* SECURITY TAB */}
          <div className={activeTab === 'security' ? 'block space-y-8' : 'hidden'}>
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Security & Access</h2>
                <p className="text-sm text-muted-foreground">Information regarding platform administration.</p>
              </div>

              <div className="bg-zinc-900/30 p-6 rounded-lg border border-zinc-800 space-y-4">
                <div className="flex items-center gap-3 text-emerald-500 mb-4">
                  <ShieldAlert className="h-6 w-6" />
                  <h3 className="text-lg font-medium">Single-Superadmin Architecture</h3>
                </div>
                <p className="text-sm text-zinc-400">
                  This platform is currently configured for a single authoritative superadmin. All administrative actions require verification via Firebase Auth matching the <code className="bg-zinc-800 px-1 py-0.5 rounded text-zinc-300">SUPERADMIN_EMAIL</code> environment variable.
                </p>
                <div className="pt-4 border-t border-zinc-800/50">
                  <p className="text-xs text-zinc-500">
                    Roles, permissions matrix, and team management features are intentionally omitted per architectural design.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* DANGER ZONE TAB */}
          <div className={activeTab === 'danger' ? 'block space-y-8' : 'hidden'}>
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1 text-red-500">Danger Zone</h2>
                <p className="text-sm text-muted-foreground">Destructive actions and global resets.</p>
              </div>

              <div className="border border-red-900/30 bg-red-950/10 rounded-lg p-6 space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-red-200">Reset Settings</h4>
                    <p className="text-sm text-red-400/80">Revert all unsaved local changes in this form.</p>
                  </div>
                  <Button type="button" variant="outline" className="border-red-900/50 text-red-400 hover:bg-red-950/50" onClick={() => {
                    if (confirm("Reset form to last saved values?")) {
                      window.location.reload();
                    }
                  }}>
                    Discard Changes
                  </Button>
                </div>

                <div className="pt-4 border-t border-red-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-red-200">Database Reset</h4>
                    <p className="text-sm text-red-400/80">Destructive global operations are explicitly disabled by architecture.</p>
                  </div>
                  <Button type="button" disabled variant="outline" className="border-red-900/20 text-red-400/50">
                    Unavailable
                  </Button>
                </div>

              </div>
            </section>
          </div>

        </div>
      </div>
    </form>
  );
}
