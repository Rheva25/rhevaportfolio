"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InquirySchema, InquiryFormData, Inquiry } from "@/lib/validations/inquiry";
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
import { updateInquiryAction } from "@/app/actions/inquiries";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Paperclip } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { UnsavedChangesWarning } from "@/app/(admin)/admin/(protected)/projects/_components/UnsavedChangesWarning";

interface InquiryFormProps {
  initialData: Inquiry;
}

export function InquiryForm({ initialData }: InquiryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<InquiryFormData>({
    // @ts-expect-error - zodResolver types can mismatch
    resolver: zodResolver(InquirySchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: InquiryFormData) => {
    setServerError(null);
    startTransition(async () => {
      try {
        await updateInquiryAction(initialData.id, data);
        router.refresh();
      } catch (err: unknown) {
        setServerError((err as Error).message || "Failed to save inquiry");
      }
    });
  };

  const loading = isPending || isSubmitting;

  return (
    // @ts-expect-error - React Hook Form types can mismatch
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
      <UnsavedChangesWarning isDirty={isDirty} />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/inquiries" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Inquiry Details</h1>
            <p className="text-sm text-muted-foreground">
              Review and manage contact request.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={loading || !isDirty}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
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
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} readOnly className="bg-zinc-900/50" />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} readOnly className="bg-zinc-900/50" />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="organization">Organization / Company</Label>
                <Input id="organization" {...register("organization")} readOnly className="bg-zinc-900/50" />
                {errors.organization && <p className="text-sm text-red-500">{errors.organization.message}</p>}
              </div>
            </div>
          </section>

          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Inquiry Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Inquiry Type</Label>
                <Input value={watch("inquiryType")} readOnly className="bg-zinc-900/50" />
              </div>

              <div className="space-y-2">
                <Label>Project Name / Subject</Label>
                <Input value={watch("projectName")} readOnly className="bg-zinc-900/50" />
              </div>

              <div className="space-y-2">
                <Label>Budget Context</Label>
                <Input value={watch("budgetContext")} readOnly className="bg-zinc-900/50" />
              </div>

              <div className="space-y-2">
                <Label>Timeline</Label>
                <Input value={watch("timeline")} readOnly className="bg-zinc-900/50" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Message / Description</Label>
                <Textarea 
                  value={watch("description")} 
                  readOnly 
                  className="min-h-[150px] bg-zinc-900/50 resize-none"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label>Source</Label>
                <Input value={watch("source")} readOnly className="bg-zinc-900/50" />
              </div>
            </div>
          </section>

          {watch("attachment") && (
            <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
              <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Attachment</h2>
              <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded flex gap-4 items-start text-sm">
                <Paperclip className="h-5 w-5 mt-0.5 text-zinc-500" />
                <div>
                  <strong className="text-zinc-300 block mb-1">{watch("attachment.name")}</strong>
                  <span className="text-zinc-500 mr-4">Type: {watch("attachment.type")}</span>
                  <span className="text-zinc-500">Size: {Math.round((watch("attachment.size") || 0) / 1024)} KB</span>
                  <div className="mt-2 text-xs text-amber-500/80">
                    Secure attachment downloading is not yet implemented in this batch.
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          <section className="space-y-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-lg font-semibold border-b border-zinc-800 pb-2">Management</h2>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <Select 
                value={watch("status")} 
                onValueChange={(val: InquiryFormData["status"] | null) => val && setValue("status", val, { shouldDirty: true })}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Reviewing">Reviewing</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="In Discussion">In Discussion</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {watch("status") === "Converted" && (
              <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-md text-xs text-emerald-400">
                <strong>Converted:</strong> This inquiry has become an active engagement.
              </div>
            )}
            
            {watch("status") === "Closed" && (
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-400">
                <strong>Closed:</strong> This inquiry requires no further action.
              </div>
            )}
          </section>

          <section className="space-y-4 bg-amber-950/10 p-6 rounded-lg border border-amber-900/20">
            <h2 className="text-lg font-semibold border-b border-amber-900/20 pb-2 text-amber-500">Internal Notes</h2>
            <div className="text-xs text-amber-500/80 mb-2">
              Private admin-only notes. Never exposed to the public.
            </div>
            <div className="space-y-2">
              <Textarea 
                {...register("internalNotes")} 
                className="min-h-[200px] bg-background border-amber-900/30 focus-visible:ring-amber-500/30"
                placeholder="Add private notes about this inquiry, next steps, or context..."
              />
              {errors.internalNotes && <p className="text-sm text-red-500">{errors.internalNotes.message}</p>}
            </div>
          </section>

        </div>
      </div>
    </form>
  );
}
