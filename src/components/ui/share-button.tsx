"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  iconOnly?: boolean;
}

export function ShareButton({ 
  title, 
  text, 
  url, 
  variant = "outline", 
  size = "default",
  className,
  iconOnly = false
}: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    // Determine the URL to share, default to current location if not provided
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    
    const shareData = {
      title: title || (typeof document !== "undefined" ? document.title : "Check this out!"),
      text: text || "Check this out!",
      url: shareUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed, fallback to copy if it's not a user abort
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      // Fallback for desktop/unsupported browsers
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleShare}
      className={className}
      title="Share"
    >
      {isCopied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {!iconOnly && <span className="ml-2">{isCopied ? "Copied" : "Share"}</span>}
    </Button>
  );
}
