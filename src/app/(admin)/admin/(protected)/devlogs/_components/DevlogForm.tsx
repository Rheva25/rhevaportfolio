"use client";

import { useState, useTransition, useRef, useEffect } from "react";
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
import { 
  Loader2, 
  Trash2, 
  ArrowLeft, 
  Maximize2, 
  Minimize2, 
  Bold, 
  Italic, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Heading3, 
  Quote, 
  List, 
  ListOrdered, 
  Code, 
  Minus, 
  Link2, 
  SlidersHorizontal, 
  Eye, 
  Columns, 
  PenLine, 
  Sparkles, 
  ExternalLink, 
  Check, 
  Wand2, 
  X,
  Type,
  Clock,
  FileText,
  Palette,
  Music
} from "lucide-react";
import Link from "next/link";
import { UnsavedChangesWarning } from "@/app/(admin)/admin/(protected)/projects/_components/UnsavedChangesWarning";
import { QuoteStudio } from "./QuoteStudio";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

interface DevlogFormProps {
  initialData?: DevlogEntry;
}

type ViewMode = "write" | "split" | "preview";
type FontTheme = "serif" | "sans" | "mono";

function getNodeText(node: any): string {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;
  if (Array.isArray(node.children)) {
    return node.children.map(getNodeText).join("");
  }
  return "";
}

function extractText(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node.props?.children) return extractText(node.props.children);
  return "";
}

function cleanQuote(str: string): string {
  return str
    .trim()
    .replace(/^["'“”″„«‹‘\s]+/, "")
    .replace(/["'“”″»›’\s]+[.!?]?$/, "")
    .trim();
}

function isQuoteText(str: string): boolean {
  const t = str.trim();
  if (t.length < 10 || t.length > 500) return false;

  const startsWithQuote = /^["'“”″„«‹‘]/.test(t);
  const endsWithQuote = /["'“”″»›’][.!?,\s]*$/.test(t);

  return startsWithQuote && endsWithQuote;
}

function DramaticQuoteDark({ text, children }: { text?: string; children?: React.ReactNode }) {
  const quoteContent = text ? cleanQuote(text) : undefined;

  return (
    <figure className="my-8 md:my-12 pl-5 sm:pl-7 border-l-2 border-primary/70 py-2 not-prose">
      <blockquote className="font-serif italic text-xl sm:text-2xl text-foreground leading-[1.65] tracking-tight m-0 p-0">
        <span className="font-serif font-bold text-3xl sm:text-4xl text-primary/70 mr-1.5 select-none inline-block align-top -mt-0.5 leading-none">
          “
        </span>
        <span className="align-middle">
          {quoteContent || children}
        </span>
        <span className="font-serif font-bold text-3xl sm:text-4xl text-primary/70 ml-1.5 select-none inline-block align-bottom -mb-0.5 leading-none">
          ”
        </span>
      </blockquote>
    </figure>
  );
}

const PRESET_TAGS = ["reflection", "architecture", "thoughts", "minimalism", "philosophy", "coding", "life"];
const PRESET_CATEGORIES = ["Reflection", "Architecture", "Philosophy", "Engineering", "Journal", "Life"];

export function DevlogForm({ initialData }: DevlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  // Editor states
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [isZenMode, setIsZenMode] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [fontTheme, setFontTheme] = useState<FontTheme>("serif");
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");
  const [showStudioModal, setShowStudioModal] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);

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
      category: "Reflection",
      tags: [],
      featuredQuote: "",
      quoteAttribution: "Rheva",
      status: "draft",
      thumbnailPreset: "literary-minimalist",
      soundtrackUrl: "",
      soundtrackTitle: ""
    }
  });

  const { ref: titleHookRef, ...titleRegister } = register("title");
  const { ref: contentHookRef, ...contentRegister } = register("contentMarkdown");

  const contentMarkdown = watch("contentMarkdown") || "";
  const titleValue = watch("title") || "";
  const excerptValue = watch("excerpt") || "";
  const featuredQuote = watch("featuredQuote") || "";
  const quoteAttribution = watch("quoteAttribution") || "";
  const currentTags = watch("tags") || [];
  const currentCategory = watch("category") || "Reflection";
  const currentStatus = watch("status") || "draft";
  const currentSlug = watch("slug") || "";

  // Metrics
  const wordCount = contentMarkdown.trim() ? contentMarkdown.trim().split(/\s+/).length : 0;
  const charCount = contentMarkdown.length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Auto-resize title textarea
  useEffect(() => {
    if (titleTextareaRef.current) {
      titleTextareaRef.current.style.height = "auto";
      titleTextareaRef.current.style.height = `${Math.max(60, titleTextareaRef.current.scrollHeight)}px`;
    }
  }, [titleValue]);

  // Handle Zen Mode Escape key & Cmd+S shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isZenMode) {
        setIsZenMode(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZenMode, handleSubmit]);

  const onSubmit = async (data: DevlogEntryFormData) => {
    setServerError(null);

    // Smart fallback values so writing isn't blocked by validations
    const processedData: DevlogEntryFormData = {
      ...data,
      category: data.category?.trim() || "Reflection",
      quoteAttribution: data.quoteAttribution?.trim() || "Rheva",
    };

    // Auto-generate slug if empty
    if (!processedData.slug || processedData.slug.trim() === "") {
      processedData.slug = processedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || `devlog-${Date.now()}`;
      setValue("slug", processedData.slug, { shouldDirty: true });
    }

    // Auto-fill featured quote if empty
    if (!processedData.featuredQuote || processedData.featuredQuote.trim() === "") {
      const quoteMatch = processedData.contentMarkdown.match(/^>\s*(.+)$/m);
      if (quoteMatch && quoteMatch[1]) {
        processedData.featuredQuote = quoteMatch[1].trim().slice(0, 150);
      } else {
        const sentences = processedData.contentMarkdown
          .replace(/[#*`_~\[\]]/g, "")
          .split(/[.!?\n]/)
          .map((s) => s.trim())
          .filter((s) => s.length > 10);
        processedData.featuredQuote = sentences.length > 0 
          ? sentences[0].slice(0, 140) 
          : (processedData.excerpt || processedData.title || "Reflections in progress.");
      }
      setValue("featuredQuote", processedData.featuredQuote, { shouldDirty: true });
    }

    startTransition(async () => {
      try {
        if (isEdit) {
          await updateDevlogAction(initialData.id, processedData);
        } else {
          const newId = await createDevlogAction(processedData);
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
    if (titleValue) {
      const newSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setValue("slug", newSlug, { shouldDirty: true, shouldValidate: true });
    }
  };

  // Tag management
  const handleAddTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim().toLowerCase();
    if (!trimmed) return;
    if (!currentTags.includes(trimmed)) {
      setValue("tags", [...currentTags, trimmed], { shouldDirty: true });
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      currentTags.filter((t) => t !== tagToRemove),
      { shouldDirty: true }
    );
  };

  // Auto-extract quote helper
  const handleExtractQuote = () => {
    const quoteMatch = contentMarkdown.match(/^>\s*(.+)$/m);
    if (quoteMatch && quoteMatch[1]) {
      setValue("featuredQuote", quoteMatch[1].trim(), { shouldDirty: true, shouldValidate: true });
      return;
    }
    const sentences = contentMarkdown
      .replace(/[#*`_~\[\]]/g, "")
      .split(/[.!?\n]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 15);
    if (sentences.length > 0) {
      setValue("featuredQuote", sentences[0].slice(0, 150), { shouldDirty: true, shouldValidate: true });
    } else if (titleValue) {
      setValue("featuredQuote", titleValue, { shouldDirty: true, shouldValidate: true });
    }
  };

  // Markdown formatting insertion helpers
  const insertMarkdown = (prefix: string, suffix: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selection = text.substring(start, end) || defaultText;

    const replacement = `${prefix}${selection}${suffix}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);

    setValue("contentMarkdown", newText, { shouldDirty: true, shouldValidate: true });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selection.length);
    }, 10);
  };

  const insertLinePrefix = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const text = textarea.value;

    const lastNewline = text.lastIndexOf("\n", start - 1);
    const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;

    const newText = text.substring(0, lineStart) + prefix + text.substring(lineStart);
    setValue("contentMarkdown", newText, { shouldDirty: true, shouldValidate: true });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    }, 10);
  };

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      insertMarkdown("  ");
    }
  };

  const loading = isPending || isSubmitting;

  return (
    <div className={`relative transition-all duration-300 ${isZenMode ? "fixed inset-0 z-50 bg-background overflow-y-auto" : "w-full pb-20"}`}>
      <UnsavedChangesWarning isDirty={isDirty} />

      {/* Top Navigation & Status Bar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border/40 px-4 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Back & Breadcrumb info */}
        <div className="flex items-center gap-3">
          {!isZenMode && (
            <Link
              href="/admin/devlogs"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              title="Return to devlogs"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )}

          <div className="flex items-center gap-2.5">
            <span className="font-serif text-sm tracking-wide text-foreground/80 font-medium">
              {isEdit ? "Devlog Entry" : "New Devlog"}
            </span>
            <span className="text-zinc-600 text-xs">•</span>
            {/* Status Pill */}
            <span
              className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                currentStatus === "published"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : currentStatus === "review"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
              }`}
            >
              {currentStatus}
            </span>

            {/* Dirty indicator */}
            {isDirty && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-400/80 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Unsaved
              </span>
            )}
          </div>
        </div>

        {/* Center: View Switcher (Write / Split / Preview) */}
        <div className="flex items-center bg-muted/60 p-1 rounded-lg border border-border/40 text-xs">
          <button
            type="button"
            onClick={() => setViewMode("write")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === "write"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <PenLine className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Write</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("split")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === "split"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Columns className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Split</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === "preview"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>

        {/* Right: Actions, Font Switcher, Settings Drawer Toggle & Save */}
        <div className="flex items-center gap-2">
          {/* Word count badge */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground px-2 py-1 bg-muted/30 rounded border border-border/30">
            <span title={`${charCount} characters`}>{wordCount} words</span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>

          {/* Font Theme dropdown / toggle */}
          <button
            type="button"
            onClick={() => {
              const next: FontTheme = fontTheme === "serif" ? "sans" : fontTheme === "sans" ? "mono" : "serif";
              setFontTheme(next);
            }}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            title={`Font: ${fontTheme.toUpperCase()} (Click to change)`}
          >
            <Type className="h-3.5 w-3.5 mr-1" />
            <span className="capitalize text-xs font-mono">{fontTheme}</span>
          </button>

          {/* Zen Mode toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsZenMode(!isZenMode)}
            title={isZenMode ? "Exit Zen Mode (Esc)" : "Enter Zen Focus Mode"}
          >
            {isZenMode ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>

          {/* Social Studio Card Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowStudioModal(!showStudioModal)}
            className="hidden sm:inline-flex items-center gap-1.5 border-border/60 hover:bg-muted/60"
            title="Instagram / Social Thumbnail Card"
          >
            <Palette className="h-3.5 w-3.5" />
            <span>Card Studio</span>
          </Button>

          {/* Settings Drawer Button */}
          <Button
            type="button"
            variant={showSettingsDrawer ? "secondary" : "outline"}
            size="sm"
            onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
            className="flex items-center gap-1.5 border-border/60"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Settings</span>
          </Button>

          {/* Live URL Link if published */}
          {isEdit && currentStatus === "published" && (
            <a
              href={`/devlog-unspoken/${currentSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              title="View Live Article"
            >
              <ExternalLink className="h-4 w-4 text-primary" />
            </a>
          )}

          {/* Save Button */}
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={loading || isDeleting}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-4 shadow-sm"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
            ) : (
              <Check className="h-4 w-4 mr-1.5" />
            )}
            <span>{isEdit ? "Save" : "Publish / Save"}</span>
          </Button>
        </div>
      </header>

      {/* Server Error Alert */}
      {serverError && (
        <div className="max-w-4xl mx-auto mt-4 mx-4 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center justify-between">
          <span>{serverError}</span>
          <button type="button" onClick={() => setServerError(null)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Studio Drawer Modal (when clicked) */}
      <AnimatePresence>
        {showStudioModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-border/60 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-border/40 mb-6">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Social Quote Card Studio</h3>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowStudioModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <QuoteStudio
                quote={featuredQuote || titleValue || "The quieter you become, the more you are able to hear."}
                attribution={quoteAttribution}
                entryId={initialData?.id || ""}
                currentThumbnailUrl={watch("thumbnailUrl")}
                onUploadSuccess={(url, path) => {
                  setValue("thumbnailUrl", url, { shouldDirty: true });
                  setValue("thumbnailPath", path, { shouldDirty: true });
                  if (initialData) {
                    handleSubmit(onSubmit)();
                  }
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Writing Workspace */}
      <div className="flex relative">
        {/* Writing Canvas / Preview Area */}
        <main className={`flex-1 transition-all duration-300 ${showSettingsDrawer ? "lg:mr-80" : ""}`}>
          <div className={`mx-auto px-4 md:px-8 py-6 ${viewMode === "split" ? "max-w-7xl" : "max-w-3xl"}`}>
            
            {/* Title & Metadata Top Banner (Only in Write or Split mode) */}
            {viewMode !== "preview" && (
              <div className="mb-6 space-y-4">
                {/* Large Borderless Title */}
                <div className="relative group">
                  <textarea
                    ref={(e) => {
                      titleHookRef(e);
                      titleTextareaRef.current = e;
                    }}
                    {...titleRegister}
                    rows={1}
                    placeholder="Title of your reflection..."
                    className="w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 px-0 text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight placeholder:text-muted-foreground/30 text-foreground resize-none leading-tight"
                  />
                  {errors.title && (
                    <p className="text-xs text-destructive mt-1">{errors.title.message}</p>
                  )}
                </div>

                {/* Subtitle / Excerpt Input */}
                <div className="relative">
                  <input
                    {...register("excerpt")}
                    placeholder="Add a quiet subtitle, premise, or fleeting thought..."
                    className="w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 px-0 text-base md:text-lg font-sans text-muted-foreground/80 placeholder:text-muted-foreground/30"
                  />
                </div>

                {/* Subtle Meta Tag Bar */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-border/40 pb-4 text-xs font-mono text-muted-foreground">
                  <span className="text-primary font-medium">{currentCategory}</span>
                  <span>•</span>
                  <span>{watch("language")?.toUpperCase()}</span>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setShowSettingsDrawer(true)}
                    className="hover:text-foreground underline decoration-dotted transition-colors"
                  >
                    {currentSlug ? `/${currentSlug}` : "Set URL slug"}
                  </button>
                  {currentTags.length > 0 && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {currentTags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 rounded bg-muted/60 text-[11px]">
                            #{tag}
                          </span>
                        ))}
                        {currentTags.length > 3 && (
                          <span className="text-[10px]">+{currentTags.length - 3}</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Markdown Toolbar (for Write & Split modes) */}
            {viewMode !== "preview" && (
              <div className="sticky top-[58px] z-20 mb-4 bg-background/90 backdrop-blur-md border border-border/50 rounded-lg p-1.5 flex items-center justify-between gap-1 shadow-sm overflow-x-auto">
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => insertLinePrefix("# ")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Heading 1"
                  >
                    <Heading1 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertLinePrefix("## ")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Heading 2"
                  >
                    <Heading2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertLinePrefix("### ")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Heading 3"
                  >
                    <Heading3 className="h-4 w-4" />
                  </button>

                  <div className="w-[1px] h-4 bg-border/60 mx-1" />

                  <button
                    type="button"
                    onClick={() => insertMarkdown("**", "**", "bold text")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Bold (**text**)"
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("*", "*", "italic text")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Italic (*text*)"
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("~~", "~~", "strikethrough text")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Strikethrough"
                  >
                    <Strikethrough className="h-4 w-4" />
                  </button>

                  <div className="w-[1px] h-4 bg-border/60 mx-1" />

                  <button
                    type="button"
                    onClick={() => insertLinePrefix("> ")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Blockquote (> quote)"
                  >
                    <Quote className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertLinePrefix("- ")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Bullet List (- item)"
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertLinePrefix("1. ")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Numbered List"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </button>

                  <div className="w-[1px] h-4 bg-border/60 mx-1" />

                  <button
                    type="button"
                    onClick={() => insertMarkdown("`", "`", "code")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Inline Code"
                  >
                    <Code className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("\n```\n", "\n```\n", "// your code here")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors font-mono text-xs px-2"
                    title="Code Block"
                  >
                    {"{ }"}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("\n---\n\n")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Horizontal Divider"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("[", "](url)", "link label")}
                    className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Add Link"
                  >
                    <Link2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Right formatting helpers */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <button
                    type="button"
                    onClick={handleExtractQuote}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-muted/80 text-primary transition-colors text-[11px]"
                    title="Extract quote from text"
                  >
                    <Wand2 className="h-3 w-3" />
                    <span>Extract Quote</span>
                  </button>
                </div>
              </div>
            )}

            {/* Editor & Preview Panes */}
            <div
              className={`w-full ${
                viewMode === "split" ? "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" : ""
              }`}
            >
              {/* Write Pane (shown in Write and Split mode) */}
              {viewMode !== "preview" && (
                <div className="w-full">
                  <div className="relative">
                    <Textarea
                      id="contentMarkdown"
                      ref={(e) => {
                        contentHookRef(e);
                        textareaRef.current = e;
                      }}
                      {...contentRegister}
                      onKeyDown={handleTabKey}
                      placeholder="Pour your unspoken thoughts, ideas, architecture decisions, and observations here... Markdown is supported."
                      className={`w-full min-h-[650px] p-4 bg-transparent border-border/40 focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl leading-relaxed resize-y ${
                        fontTheme === "serif"
                          ? "font-serif text-lg leading-[1.8]"
                          : fontTheme === "mono"
                          ? "font-mono text-sm leading-relaxed"
                          : "font-sans text-base leading-relaxed"
                      }`}
                    />
                    {errors.contentMarkdown && (
                      <p className="text-xs text-destructive mt-1">{errors.contentMarkdown.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Preview Pane (shown in Split and Preview mode) */}
              {viewMode !== "write" && (
                <div
                  className={`w-full ${
                    viewMode === "preview" ? "max-w-3xl mx-auto" : "lg:sticky lg:top-24 max-h-[85vh] overflow-y-auto pr-2"
                  }`}
                >
                  {/* Public-Style Article Card Preview */}
                  <div className="p-6 md:p-8 rounded-2xl bg-zinc-950/60 border border-border/50 backdrop-blur-md shadow-sm space-y-8">
                    {/* Header info */}
                    <div className="border-b border-border/40 pb-6 space-y-4">
                      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        <span>{currentCategory}</span>
                        <span>•</span>
                        <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span>•</span>
                        <span>{readTime} MIN READ</span>
                      </div>

                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground font-normal tracking-tight leading-tight">
                        {titleValue || "Untitled Devlog Entry"}
                      </h1>

                      {excerptValue && (
                        <p className="text-muted-foreground font-sans text-base leading-relaxed italic">
                          {excerptValue}
                        </p>
                      )}
                    </div>

                    {/* Featured Quote Preview */}
                    {featuredQuote && (
                      <div className="p-6 rounded-xl bg-muted/30 border-y border-border/40 text-center space-y-3">
                        <blockquote className="font-serif text-xl md:text-2xl text-foreground/90 italic tracking-tight">
                          "{featuredQuote}"
                        </blockquote>
                        {quoteAttribution && (
                          <cite className="block text-xs font-mono text-muted-foreground uppercase tracking-wider not-italic">
                            — {quoteAttribution}
                          </cite>
                        )}
                      </div>
                    )}

                    {/* Rendered Markdown Body */}
                    <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-serif prose-headings:font-normal prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-border/40 font-serif text-foreground/90 text-base md:text-lg leading-[1.8]">
                      {contentMarkdown ? (
                        <ReactMarkdown
                          components={{
                            p: ({ node, children }: any) => {
                              const rawText = getNodeText(node) || extractText(children);
                              if (isQuoteText(rawText)) {
                                return <DramaticQuoteDark text={rawText} />;
                              }
                              return <p className="leading-relaxed">{children}</p>;
                            },
                            blockquote: ({ node, children }: any) => {
                              const rawText = getNodeText(node) || extractText(children);
                              return <DramaticQuoteDark text={rawText || undefined}>{children}</DramaticQuoteDark>;
                            },
                          }}
                        >
                          {contentMarkdown}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-muted-foreground/40 italic">Nothing written yet. Start typing on the left to see the literary preview live...</p>
                      )}
                    </article>

                    {/* Tags preview */}
                    {currentTags.length > 0 && (
                      <div className="pt-6 border-t border-border/40 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground uppercase mr-1">Tags:</span>
                        {currentTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded bg-muted/60 font-mono text-[11px] text-foreground/80 tracking-wide uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>

        {/* Collapsible Settings & Metadata Slide-over Panel */}
        <AnimatePresence>
          {showSettingsDrawer && (
            <motion.aside
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-14 right-0 bottom-0 w-80 bg-background/95 backdrop-blur-xl border-l border-border/50 z-40 p-6 overflow-y-auto space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm">Entry Settings</h3>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setShowSettingsDrawer(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-xs uppercase font-mono tracking-wider text-muted-foreground">Publishing Status</Label>
                <Select
                  value={currentStatus}
                  onValueChange={(val: "draft" | "review" | "published" | null) =>
                    val && setValue("status", val, { shouldDirty: true })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft (Private)</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="published">Published (Public)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* URL Slug */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="slug" className="text-xs uppercase font-mono tracking-wider text-muted-foreground">URL Slug</Label>
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1"
                  >
                    <Wand2 className="h-3 w-3" /> Auto
                  </button>
                </div>
                <Input
                  id="slug"
                  {...register("slug")}
                  placeholder="e.g. the-architecture-of-silence"
                  className="font-mono text-xs"
                />
                {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
                <p className="text-[11px] text-muted-foreground font-mono truncate">
                  /devlog-unspoken/{currentSlug || "slug"}
                </p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs uppercase font-mono tracking-wider text-muted-foreground">Category</Label>
                <Input
                  id="category"
                  {...register("category")}
                  placeholder="e.g. Reflection"
                  className="text-sm"
                />
                {/* Category Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PRESET_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setValue("category", cat, { shouldDirty: true })}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                        currentCategory === cat
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/40 hover:bg-muted text-muted-foreground border-border/40"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
              </div>

              {/* Language */}
              <div className="space-y-2">
                <Label className="text-xs uppercase font-mono tracking-wider text-muted-foreground">Language</Label>
                <Select
                  value={watch("language")}
                  onValueChange={(val: "en" | "id" | "mixed" | null) =>
                    val && setValue("language", val, { shouldDirty: true })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Indonesian</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="mixed">Mixed (ID / EN)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Featured Quote & Attribution */}
              <div className="space-y-2 pt-2 border-t border-border/40">
                <div className="flex items-center justify-between">
                  <Label htmlFor="featuredQuote" className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
                    Featured Quote
                  </Label>
                  <button
                    type="button"
                    onClick={handleExtractQuote}
                    className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1"
                  >
                    <Wand2 className="h-3 w-3" /> Auto
                  </button>
                </div>
                <Textarea
                  id="featuredQuote"
                  {...register("featuredQuote")}
                  rows={3}
                  placeholder="Key quote for the header & social card..."
                  className="text-sm font-serif italic"
                />
                {errors.featuredQuote && (
                  <p className="text-xs text-destructive">{errors.featuredQuote.message}</p>
                )}
                <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>{featuredQuote.length} / 150 chars</span>
                </div>

                <div className="pt-2">
                  <Label htmlFor="quoteAttribution" className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
                    Quote Attribution
                  </Label>
                  <Input
                    id="quoteAttribution"
                    {...register("quoteAttribution")}
                    placeholder="e.g. Rheva"
                    className="mt-1 text-sm"
                  />
                </div>
              </div>

              {/* Interactive Tags */}
              <div className="space-y-2 pt-2 border-t border-border/40">
                <Label className="text-xs uppercase font-mono tracking-wider text-muted-foreground">Tags</Label>
                <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-muted/20 border border-border/40 rounded-lg">
                  {currentTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-xs font-mono text-foreground"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        handleAddTag(tagInput);
                      }
                    }}
                    placeholder={currentTags.length === 0 ? "Type tag & Enter..." : "+ tag"}
                    className="bg-transparent border-0 outline-none text-xs font-mono placeholder:text-muted-foreground/50 w-24 flex-1 p-0.5"
                  />
                </div>

                {/* Preset tag suggestions */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {PRESET_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddTag(tag)}
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                        currentTags.includes(tag)
                          ? "bg-primary/20 text-primary border-primary/30"
                          : "bg-muted/30 hover:bg-muted text-muted-foreground border-border/30"
                      }`}
                    >
                      +{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ambient Soundtrack (YouTube) */}
              <div className="space-y-2 pt-2 border-t border-border/40">
                <Label htmlFor="soundtrackUrl" className="text-xs uppercase font-mono tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Music className="h-3.5 w-3.5 text-primary" />
                  <span>Ambient Soundtrack (YouTube)</span>
                </Label>
                <Input
                  id="soundtrackUrl"
                  {...register("soundtrackUrl")}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="font-mono text-xs"
                />
                <p className="text-[11px] text-muted-foreground">
                  Lagu latar yang bisa diputar langsung oleh pembaca devlog.
                </p>

                <div className="pt-1">
                  <Label htmlFor="soundtrackTitle" className="text-[11px] uppercase font-mono tracking-wider text-muted-foreground">
                    Judul Lagu / Artist (Opsional)
                  </Label>
                  <Input
                    id="soundtrackTitle"
                    {...register("soundtrackTitle")}
                    placeholder="e.g. Ludovico Einaudi - Nuvole Bianche"
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              {/* Card Studio Link */}
              <div className="pt-4 border-t border-border/40">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowStudioModal(true)}
                  className="w-full justify-center gap-2 border-border/60"
                >
                  <Palette className="h-4 w-4" />
                  <span>Open Card Studio</span>
                </Button>
              </div>

              {/* Danger Zone: Delete Entry */}
              {isEdit && (
                <div className="pt-4 border-t border-destructive/20">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive justify-center gap-2"
                    onClick={handleDelete}
                    disabled={isDeleting || loading}
                  >
                    {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    <span>Delete Entry</span>
                  </Button>
                </div>
              )}
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
