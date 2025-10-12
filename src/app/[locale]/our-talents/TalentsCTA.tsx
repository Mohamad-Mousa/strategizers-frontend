"use client";

import { useTranslations } from "next-intl";

export default function TalentsCTA() {
  const t = useTranslations("ourTeam");

  return (
    <div className="bg-web-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{t("cta.title")}</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          {t("cta.description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-web-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            {t("cta.contactButton")}
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-web-primary transition-colors">
            {t("cta.scheduleButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
