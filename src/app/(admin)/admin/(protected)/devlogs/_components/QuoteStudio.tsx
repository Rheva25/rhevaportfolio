"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, UploadCloud, RefreshCw, Loader2, Maximize2 } from "lucide-react";
import { toPng } from "html-to-image";
import { uploadDevlogThumbnailAction } from "@/app/actions/devlogs";

interface QuoteStudioProps {
  quote: string;
  attribution?: string;
  entryId: string;
  onUploadSuccess: (url: string, path: string) => void;
  currentThumbnailUrl?: string;
}

export function QuoteStudio({ quote, attribution, entryId, onUploadSuccess, currentThumbnailUrl }: QuoteStudioProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (): Promise<string | null> => {
    if (!previewRef.current) return null;
    try {
      setError(null);
      // Generate a high quality PNG (1080x1350 is scale 1, we can render it exactly at that size)
      const dataUrl = await toPng(previewRef.current, {
        quality: 1.0,
        pixelRatio: 1, // We will size the element to exactly 1080x1350 via CSS transform scale for viewing, but actual DOM size is 1080x1350
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
      link.download = `devlog-quote-${entryId || "draft"}.png`;
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
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Quote Studio</h3>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={handleDownload} disabled={isGenerating || isUploading}>
            {isGenerating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
            Download PNG
          </Button>
          <Button type="button" variant="default" size="sm" onClick={handleUpload} disabled={isUploading || isGenerating}>
            {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <UploadCloud className="h-4 w-4 mr-2" />}
            Save to Storage
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="text-sm text-red-500 bg-red-950/50 border border-red-900 p-3 rounded-md">
          {error}
        </div>
      )}

      {currentThumbnailUrl && (
         <div className="text-sm text-green-500 bg-green-950/50 border border-green-900 p-3 rounded-md flex justify-between items-center">
           <span>Thumbnail is synced with Storage.</span>
           <a href={currentThumbnailUrl} target="_blank" rel="noreferrer" className="flex items-center hover:underline">
             View <Maximize2 className="h-3 w-3 ml-1" />
           </a>
         </div>
      )}

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 flex items-center justify-center overflow-hidden">
        {/* We use a container that scales down the 1080x1350 canvas so it fits on screen */}
        <div className="relative" style={{ width: "1080px", height: "1350px", transform: "scale(0.3)", transformOrigin: "top center", marginBottom: "-945px" }}>
          
          {/* THE CANVAS */}
          <div 
            ref={previewRef}
            className="absolute inset-0 bg-[#F5F1E8] flex flex-col justify-between"
            style={{ width: "1080px", height: "1350px" }}
          >
            {/* Top Border / Label */}
            <div className="pt-24 px-24 flex items-center justify-center">
              <span className="text-[#918779] font-mono tracking-[0.2em] text-2xl uppercase border border-[#DCD5C9] px-6 py-2 rounded-sm">
                Devlog: Unspoken
              </span>
            </div>

            {/* Main Quote */}
            <div className="flex-1 flex flex-col items-center justify-center px-32 text-center gap-12">
              <p className="text-[#24221F] font-serif text-7xl leading-[1.3] tracking-tight">
                "{quote || "The quieter you become, the more you are able to hear."}"
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
        Canvas size: 1080 × 1350 px (Instagram Portrait 4:5). Ensure quote is not excessively long.
      </p>
    </div>
  );
}
