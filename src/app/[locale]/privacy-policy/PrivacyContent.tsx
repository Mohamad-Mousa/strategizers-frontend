"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { apiGet } from "@/lib/api";
import { SettingsResponse } from "@/types/settings";

export default function PrivacyContent() {
  const locale = useLocale();
  const t = useTranslations("privacyPolicy");
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response: SettingsResponse = await apiGet("/public/setting");

        if (!response.error) {
          const privacyPolicy = response.results.settings.legal?.privacyPolicy;
          if (privacyPolicy) {
            const localizedContent =
              privacyPolicy[locale as keyof typeof privacyPolicy] ||
              privacyPolicy.en;
            setContent(localizedContent);
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [locale]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-web-primary" />
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {t("notAvailable.title")}
          </h1>
          <p className="text-gray-600">{t("notAvailable.description")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
