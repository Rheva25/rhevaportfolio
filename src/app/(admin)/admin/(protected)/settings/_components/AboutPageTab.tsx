"use client";

import { useState } from "react";
import { Control, Controller, UseFormRegister, useFieldArray, FieldPath } from "react-hook-form";
import { SiteSettingsFormData } from "@/lib/validations/settings";
import { ABOUT_ICON_NAMES } from "@/lib/constants/aboutDefaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

type Register = UseFormRegister<SiteSettingsFormData>;
type FormControl = Control<SiteSettingsFormData>;

/**
 * Bilingual input: renders an ID + EN field side by side for a LocalizedString path
 * (e.g. "aboutPage.ctaTitle" → registers "aboutPage.ctaTitle.id" and "aboutPage.ctaTitle.en").
 */
export function LocalizedField({
  register,
  path,
  label,
  multiline = false,
  rows = "h-20",
  placeholder,
}: {
  register: Register;
  path: string;
  label: string;
  multiline?: boolean;
  rows?: string;
  placeholder?: string;
}) {
  const idPath = `${path}.id` as FieldPath<SiteSettingsFormData>;
  const enPath = `${path}.en` as FieldPath<SiteSettingsFormData>;
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {(["id", "en"] as const).map((lang) => (
          <div key={lang} className="relative">
            <span className="absolute top-2 right-2 z-10 font-mono text-[10px] uppercase text-zinc-500 pointer-events-none">
              {lang}
            </span>
            {multiline ? (
              <Textarea
                {...register(lang === "id" ? idPath : enPath)}
                placeholder={placeholder}
                className={`bg-zinc-900/50 resize-y text-sm pr-8 ${rows}`}
              />
            ) : (
              <Input
                {...register(lang === "id" ? idPath : enPath)}
                placeholder={placeholder}
                className="bg-zinc-900/50 pr-8"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Comma-separated text input bound to a string[] value. Keeps raw text locally so typing commas feels natural. */
export function CommaListInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[] | undefined;
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [text, setText] = useState((value ?? []).join(", "));
  return (
    <Input
      value={text}
      placeholder={placeholder}
      className="bg-zinc-900/50 h-8 font-mono text-xs"
      onChange={(e) => {
        setText(e.target.value);
        onChange(
          e.target.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        );
      }}
    />
  );
}

export function AboutPageTab({ register, control }: { register: Register; control: FormControl }) {
  const {
    fields: capFields,
    append: appendCap,
    remove: removeCap,
    move: moveCap,
  } = useFieldArray({ control, name: "aboutPage.capabilities" });

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold mb-1">About Page</h2>
        <p className="text-sm text-muted-foreground">
          Everything shown on <span className="font-mono">/about</span>. Name, title, bio, location and status come from
          the <b>Profile</b> &amp; <b>Contact</b> tabs; career timeline entries are edited in <b>Profile → Career Timeline</b>.
        </p>
      </div>

      {/* Header */}
      <section className="space-y-5 bg-zinc-900/20 p-5 rounded-lg border border-zinc-800">
        <h3 className="font-semibold">1. Header &amp; Intro</h3>
        <LocalizedField register={register} path="aboutPage.profileEyebrow" label="Section Label" placeholder="01 // PERSONAL PROFILE" />
        <div className="space-y-2">
          <Label htmlFor="aboutPage.architecturePrinciple">Architecture Principle Card</Label>
          <Input
            id="aboutPage.architecturePrinciple"
            {...register("aboutPage.architecturePrinciple")}
            className="bg-zinc-900/50"
            placeholder="Sovereign • Deterministic (leave empty to hide)"
          />
        </div>
      </section>

      {/* Capabilities */}
      <section className="space-y-5 bg-zinc-900/20 p-5 rounded-lg border border-zinc-800">
        <h3 className="font-semibold">2. Core Capabilities</h3>
        <LocalizedField register={register} path="aboutPage.capabilitiesEyebrow" label="Section Label" />
        <LocalizedField register={register} path="aboutPage.capabilitiesTitle" label="Heading" />
        <LocalizedField register={register} path="aboutPage.capabilitiesSubtitle" label="Subheading" multiline />

        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <Label className="text-base">Capability Cards ({capFields.length})</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendCap({ icon: "Terminal", title: { id: "", en: "" }, description: { id: "", en: "" }, tags: [] })
              }
            >
              <Plus className="h-4 w-4 mr-2" /> Add Capability
            </Button>
          </div>

          {capFields.map((field, index) => (
            <div key={field.id} className="space-y-4 bg-zinc-900/40 p-4 rounded-md border border-zinc-800">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-zinc-500">CARD #{index + 1}</span>
                <div className="flex items-center gap-1">
                  <Button type="button" variant="ghost" size="icon" className="h-7 w-7" disabled={index === 0} onClick={() => moveCap(index, index - 1)}>
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-7 w-7" disabled={index === capFields.length - 1} onClick={() => moveCap(index, index + 1)}>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:bg-red-950/30" onClick={() => removeCap(index)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Icon</Label>
                  <Controller
                    control={control}
                    name={`aboutPage.capabilities.${index}.icon`}
                    render={({ field: f }) => (
                      <Select value={f.value || "Terminal"} onValueChange={(v) => v && f.onChange(v)}>
                        <SelectTrigger className="bg-zinc-900/50 h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ABOUT_ICON_NAMES.map((name) => (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <Label className="text-xs text-muted-foreground">Tags (comma separated)</Label>
                  <Controller
                    control={control}
                    name={`aboutPage.capabilities.${index}.tags`}
                    render={({ field: f }) => (
                      <CommaListInput value={f.value} onChange={f.onChange} placeholder="Next.js, TypeScript, Server Actions" />
                    )}
                  />
                </div>
              </div>

              <LocalizedField register={register} path={`aboutPage.capabilities.${index}.title`} label="Title" />
              <LocalizedField register={register} path={`aboutPage.capabilities.${index}.description`} label="Description" multiline />
            </div>
          ))}
        </div>
      </section>

      {/* Timeline labels */}
      <section className="space-y-5 bg-zinc-900/20 p-5 rounded-lg border border-zinc-800">
        <h3 className="font-semibold">3. Career Timeline (section text)</h3>
        <LocalizedField register={register} path="aboutPage.timelineEyebrow" label="Section Label" />
        <LocalizedField register={register} path="aboutPage.timelineTitle" label="Heading" />
        <div className="grid grid-cols-1 gap-5">
          <LocalizedField register={register} path="aboutPage.timelineStackLabel" label='"Key Stack" Label' />
          <LocalizedField register={register} path="aboutPage.timelineCurrentLabel" label='"Current" Badge Label' />
        </div>
      </section>

      {/* CTA */}
      <section className="space-y-5 bg-zinc-900/20 p-5 rounded-lg border border-zinc-800">
        <h3 className="font-semibold">4. Call to Action</h3>
        <LocalizedField register={register} path="aboutPage.ctaEyebrow" label="Label" />
        <LocalizedField register={register} path="aboutPage.ctaTitle" label="Heading (empty both = hide section)" />
        <LocalizedField register={register} path="aboutPage.ctaDescription" label="Description" multiline />
        <LocalizedField register={register} path="aboutPage.ctaButtonLabel" label="Button Text" />
        <div className="space-y-2">
          <Label htmlFor="aboutPage.ctaButtonHref">Button Link</Label>
          <Input id="aboutPage.ctaButtonHref" {...register("aboutPage.ctaButtonHref")} className="bg-zinc-900/50 font-mono text-sm" placeholder="/contact" />
        </div>
      </section>
    </div>
  );
}
