"use client";

import { useState } from "react";
import { toast } from "sonner";
import { generateFallbackPropertyUrl } from "@/lib/generate-property-url";
import type { Locale } from "@/lib/i18n-config";

interface ShareProperty {
  id: string;
  address: string;
  city: string;
  price: number;
  country?: string;
  transaction_type?: string;
  url_slug_id?: string;
}

interface UseShareResult {
  handleShare: () => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  copyLink: () => void;
  shareViaEmail: () => void;
  shareOnFacebook: () => void;
  shareOnTwitter: () => void;
  shareOnLinkedIn: () => void;
  shareOnWhatsApp: () => void;
  propertyUrl: string;
}

interface TranslationFunction {
  (key: string, params?: any): string;
}

export function useShare(
  property: ShareProperty,
  lang: string = "en",
  t?: TranslationFunction
): UseShareResult {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Construct the property URL using the SEO-friendly URL generator
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const relativePath = generateFallbackPropertyUrl(property, lang as Locale);
  const propertyUrl = `${baseUrl}${relativePath}`;

  // Share title and text (use translation if available)
  const shareTitle = `${property.address} ${t?.("share.inCity") || "in"} ${property.city}`;
  const shareText = `${t?.("share.checkOutProperty") || "Check out this property"}: ${property.address} ${t?.("share.inCity") || "in"} ${property.city} - €${property.price.toLocaleString()}`;

  // Check if device is mobile
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  // Main share handler
  const handleShare = async () => {
    // Track share event
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible("Property Share", {
        props: {
          propertyId: property.id,
          method: isMobile() ? "mobile" : "desktop",
        },
      });
    }

    // Mobile: Try native share first
    if (isMobile() && typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: propertyUrl,
        });
        toast.success(t?.("share.sharedSuccessfully") || "Shared successfully!");
        return;
      } catch (error) {
        // User cancelled or error occurred
        if ((error as Error).name !== "AbortError") {
          console.error("Native share failed:", error);
          // Fallback to WhatsApp on mobile
          shareOnWhatsApp();
        }
        return;
      }
    }

    // Desktop or no native share: Open modal
    if (!isMobile()) {
      setIsShareModalOpen(true);
    } else {
      // Mobile fallback: WhatsApp
      shareOnWhatsApp();
    }
  };

  // Copy link to clipboard
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(propertyUrl);
      toast.success(t?.("share.linkCopied") || "Link copied to clipboard!");
      setIsShareModalOpen(false);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error(t?.("share.failedToCopyLink") || "Failed to copy link");
    }
  };

  // Share via email
  const shareViaEmail = () => {
    const subject = encodeURIComponent(shareTitle);
    const body = encodeURIComponent(
      `${shareText}\n\n${t?.("share.viewProperty") || "View property"}: ${propertyUrl}\n\n${t?.("share.discoverMore") || "Discover more properties on Toplix!"}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    toast.success(t?.("share.openingEmailClient") || "Opening email client...");
    setIsShareModalOpen(false);
  };

  // Share on Facebook
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      propertyUrl
    )}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
    toast.success(t?.("share.openingFacebook") || "Opening Facebook...");
    setIsShareModalOpen(false);
  };

  // Share on Twitter
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      propertyUrl
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
    toast.success(t?.("share.openingTwitter") || "Opening Twitter...");
    setIsShareModalOpen(false);
  };

  // Share on LinkedIn
  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      propertyUrl
    )}`;
    window.open(linkedInUrl, "_blank", "width=600,height=400");
    toast.success(t?.("share.openingLinkedIn") || "Opening LinkedIn...");
    setIsShareModalOpen(false);
  };

  // Share on WhatsApp
  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${shareText}\n\n${propertyUrl}`
    )}`;
    window.open(whatsappUrl, "_blank");
    toast.success(t?.("share.openingWhatsApp") || "Opening WhatsApp...");
    setIsShareModalOpen(false);
  };

  return {
    handleShare,
    isShareModalOpen,
    setIsShareModalOpen,
    copyLink,
    shareViaEmail,
    shareOnFacebook,
    shareOnTwitter,
    shareOnLinkedIn,
    shareOnWhatsApp,
    propertyUrl,
  };
}

