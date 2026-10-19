"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, UploadCloud, Loader2, Maximize2, Type, Sparkles } from "lucide-react";
import { toPng } from "html-to-image";
import { uploadDevlogThumbnailAction } from "@/app/actions/devlogs";

interface QuoteStudioProps {
  quote: string;
  attribution?: string;
  entryId: string;
  onUploadSuccess: (url: string, path: string) => void;
  currentThumbnailUrl?: string;
}

export type PosterStyle = "classic" | "modern";

export function QuoteStudio({ quote, attribution, entryId, onUploadSuccess, currentThumbnailUrl }: QuoteStudioProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [stylePreset, setStylePreset] = useState<PosterStyle>("classic");
  const [fontSize, setFontSize] = useState<"auto" | "large" | "medium" | "small">("auto");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto calculate font size based on quote length
  const quoteText = quote || "The quieter you become, the more you are able to hear.";
  const quoteLength = quoteText.length;

  let calculatedTextSize = "text-7xl";
  if (fontSize === "auto") {
    if (quoteLength > 200) calculatedTextSize = "text-5xl";
    else if (quoteLength > 120) calculatedTextSize = "text-6xl";
    else calculatedTextSize = "text-7xl";
  } else if (fontSize === "small") {
    calculatedTextSize = "text-5xl";
  } else if (fontSize === "medium") {
    calculatedTextSize = "text-6xl";
  } else {
    calculatedTextSize = "text-7xl";
  }

  const generateImage = async (): Promise<string | null> => {
    if (!previewRef.current) return null;
    try {
      setError(null);
      // Wait for all fonts (including Playfair Display and Inter) to be fully ready
      if (typeof document !== "undefined" && document.fonts) {
        await document.fonts.ready;
      }
      
      // Generate a high quality PNG (1080x1350 is scale 1, canvas is exactly 1080x1350)
      const dataUrl = await toPng(previewRef.current, {
        quality: 1.0,
        pixelRatio: 1,
        cacheBust: true,
      });
      return dataUrl;
    } catch (err) {
      console.error(err);
      setError("Failed to generate image.");
      return null;
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    const dataUrl = await generateImage();
    if (dataUrl) {
      const link = document.createElement("a");
      link.download = `devlog-quote-${entryId || "draft"}-${stylePreset}.png`;
      link.href = dataUrl;
      link.click();
    }
    setIsGenerating(false);
  };

  const handleUpload = async () => {
    if (!entryId) {
      setError("Please save the devlog entry first before uploading the thumbnail.");
      return;
    }
    setIsUploading(true);
    const dataUrl = await generateImage();
    if (dataUrl) {
      try {
        const result = await uploadDevlogThumbnailAction(dataUrl, entryId);
        onUploadSuccess(result.url, result.path);
      } catch (err) {
        console.error(err);
        setError("Failed to upload image to Cloudinary.");
      }
    }
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span>Quote Studio</span>
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/40">
              Instagram 4:5
            </span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Pilih model typography untuk menyamakan konsistensi poster quote.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleDownload} 
            disabled={isGenerating || isUploading}
          >
            {isGenerating ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Download className="h-4 w-4 mr-1.5" />}
            Download
          </Button>
          <Button 
            type="button" 
            variant="default" 
            size="sm" 
            onClick={handleUpload} 
            disabled={isUploading || isGenerating}
            className="bg-primary text-primary-foreground"
          >
            {isUploading ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <UploadCloud className="h-4 w-4 mr-1.5" />}
            Sync ke Poster
          </Button>
        </div>
      </div>

      {/* Style Preset Selector & Size Options */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/40 rounded-lg border border-border/50 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-muted-foreground uppercase text-[11px]">Model Style:</span>
          <div className="flex bg-background rounded-md p-0.5 border border-border/60">
            <button
              type="button"
              onClick={() => setStylePreset("classic")}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                stylePreset === "classic"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Classic (Serif)
            </button>
            <button
              type="button"
              onClick={() => setStylePreset("modern")}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                stylePreset === "modern"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Modern (Sans)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-muted-foreground uppercase text-[11px]">Font Size:</span>
          <div className="flex bg-background rounded-md p-0.5 border border-border/60">
            {(["auto", "large", "medium", "small"] as const).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setFontSize(size)}
                className={`px-2 py-1 rounded text-[11px] font-mono capitalize transition-colors ${
                  fontSize === size
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-md">
          {error}
        </div>
      )}

      {currentThumbnailUrl && (
         <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-md flex justify-between items-center font-mono">
           <span>✓ Poster saat ini tersinkronisasi di Cloudinary</span>
           <a href={currentThumbnailUrl} target="_blank" rel="noreferrer" className="flex items-center hover:underline text-emerald-300">
             Lihat File <Maximize2 className="h-3 w-3 ml-1" />
           </a>
         </div>
      )}

      {/* Preview Container with accurate scale */}
      <div className="bg-zinc-950/60 border border-border/60 rounded-xl p-4 sm:p-8 flex items-center justify-center overflow-hidden">
        {/* Container that scales down the 1080x1350 canvas to fit comfortably */}
        <div className="relative" style={{ width: "1080px", height: "1350px", transform: "scale(0.28)", transformOrigin: "top center", marginBottom: "-972px" }}>
          
          {/* THE CANVAS */}
          <div 
            ref={previewRef}
            className="absolute inset-0 bg-[#F5F1E8] flex flex-col justify-between"
            style={{ 
              width: "1080px", 
              height: "1350px",
              fontFamily: stylePreset === "classic" 
                ? "var(--font-playfair), 'Playfair Display', Georgia, serif" 
                : "var(--font-sans), Inter, system-ui, sans-serif"
            }}
          >
            {/* Top Border / Label */}
            <div className="pt-24 px-24 flex items-center justify-center">
              <span className="text-[#918779] font-mono tracking-[0.2em] text-2xl uppercase border border-[#DCD5C9] px-6 py-2 rounded-sm font-semibold">
                Devlog: Unspoken
              </span>
            </div>

            {/* Main Quote */}
            <div className="flex-1 flex flex-col items-center justify-center px-28 text-center gap-12">
              <p 
                className={`text-[#24221F] ${calculatedTextSize} leading-[1.3] tracking-tight`}
                style={{
                  fontFamily: stylePreset === "classic" 
                    ? "var(--font-playfair), 'Playfair Display', Georgia, serif" 
                    : "var(--font-sans), Inter, system-ui, sans-serif"
                }}
              >
                "{quoteText}"
              </p>
              {attribution && (
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[2px] bg-[#DCD5C9]"></div>
                  <span className="text-[#918779] font-sans text-3xl italic">
                    {attribution}
                  </span>
                  <div className="w-16 h-[2px] bg-[#DCD5C9]"></div>
                </div>
              )}
            </div>

            {/* Bottom Watermark */}
            <div className="pb-24 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-[2px] bg-[#DCD5C9] mb-4"></div>
              <span className="text-[#24221F] font-sans font-bold tracking-[0.2em] text-2xl uppercase">
                iqbalabs
              </span>
            </div>
          </div>

        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Ukuran Canvas: 1080 × 1350 px (Instagram Portrait 4:5). Klik <strong>"Sync ke Poster"</strong> untuk memperbarui poster card live.
      </p>
    </div>
  );
}
