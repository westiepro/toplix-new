"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

interface ContactAgentFormProps {
  propertyId: string;
  propertyAddress: string;
}

export function ContactAgentForm({ propertyId, propertyAddress }: ContactAgentFormProps) {
  const { t } = useTranslation();
  
  // Initialize message with translated default
  const defaultMessage = t("contact.defaultMessage", { address: propertyAddress });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: defaultMessage,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success(t("contact.successTitle"), {
      description: t("contact.successDescription"),
    });

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-4">{t("contact.title")}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder={t("contact.namePlaceholder")}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder={t("contact.emailPlaceholder")}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="tel"
            placeholder={t("contact.phonePlaceholder")}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full"
          />
        </div>
        <div>
          <textarea
            placeholder={t("contact.messagePlaceholder")}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? t("contact.sending") : t("contact.sendButton")}
        </Button>
      </form>
    </div>
  );
}


