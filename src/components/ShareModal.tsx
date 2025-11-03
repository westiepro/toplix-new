"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link2, Mail, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyAddress: string;
  propertyCity: string;
  onCopyLink: () => void;
  onShareEmail: () => void;
  onShareFacebook: () => void;
  onShareTwitter: () => void;
  onShareLinkedIn: () => void;
  onShareWhatsApp: () => void;
}

export function ShareModal({
  isOpen,
  onClose,
  propertyAddress,
  propertyCity,
  onCopyLink,
  onShareEmail,
  onShareFacebook,
  onShareTwitter,
  onShareLinkedIn,
  onShareWhatsApp,
}: ShareModalProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("share.title")}</DialogTitle>
          <DialogDescription>
            {propertyAddress} {t("share.inCity")} {propertyCity}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {/* Copy Link */}
          <Button
            onClick={onCopyLink}
            variant="outline"
            className="w-full justify-start gap-3 h-auto py-3 transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Link2 className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-medium">{t("share.copyLink")}</div>
              <div className="text-xs text-muted-foreground">
                {t("share.copyLinkDescription")}
              </div>
            </div>
          </Button>

          {/* Email */}
          <Button
            onClick={onShareEmail}
            variant="outline"
            className="w-full justify-start gap-3 h-auto py-3 transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Mail className="h-5 w-5 text-gray-600" />
            </div>
            <div className="text-left">
              <div className="font-medium">{t("share.shareViaEmail")}</div>
              <div className="text-xs text-muted-foreground">
                {t("share.shareViaEmailDescription")}
              </div>
            </div>
          </Button>

          {/* Social Media Section */}
          <div className="pt-2">
            <p className="text-xs font-medium text-muted-foreground mb-2 px-1">
              {t("share.shareOnSocialMedia")}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {/* Facebook */}
              <Button
                onClick={onShareFacebook}
                variant="outline"
                className="justify-start gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                  <Facebook className="h-4 w-4 text-white" fill="currentColor" />
                </div>
                <span className="font-medium">{t("share.facebook")}</span>
              </Button>

              {/* Twitter */}
              <Button
                onClick={onShareTwitter}
                variant="outline"
                className="justify-start gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
                  <Twitter className="h-4 w-4 text-white" fill="currentColor" />
                </div>
                <span className="font-medium">{t("share.twitter")}</span>
              </Button>

              {/* LinkedIn */}
              <Button
                onClick={onShareLinkedIn}
                variant="outline"
                className="justify-start gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700">
                  <Linkedin className="h-4 w-4 text-white" fill="currentColor" />
                </div>
                <span className="font-medium">{t("share.linkedin")}</span>
              </Button>

              {/* WhatsApp */}
              <Button
                onClick={onShareWhatsApp}
                variant="outline"
                className="justify-start gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                  <MessageCircle className="h-4 w-4 text-white" fill="currentColor" />
                </div>
                <span className="font-medium">{t("share.whatsapp")}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="ghost" onClick={onClose}>
            {t("share.close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

