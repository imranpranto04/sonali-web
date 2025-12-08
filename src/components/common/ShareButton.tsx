"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    // 1. Try Native Share (Mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this event: ${title}`,
          url: url,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        console.log("Share cancelled");
      }
    }

    // 2. Fallback: Copy to Clipboard (Desktop)
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="gap-2 bg-white hover:text-blue-600 hover:border-blue-200 min-w-[120px]"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
      {copied ? "Copied Link" : "Share Link"}
    </Button>
  );
}
