"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export default function CTASection() {
  const locale = useLocale();
  const t = useTranslations("testimonials");

  return (
    <div className="bg-web-primary py-8 flex flex-col md:flex-row items-center justify-between px-4">
      <p className="text-lg text-white">{t("cta.description")}</p>
      <Link
        href={`/${locale}/contact`}
        className="text-white border border-white rounded-full px-8 py-3 font-medium hover:bg-white hover:text-web-primary transition-colors"
      >
        {t("cta.button")}
      </Link>
    </div>
  );
}
