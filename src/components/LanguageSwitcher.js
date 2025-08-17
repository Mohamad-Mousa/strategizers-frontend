"use client";
import { useLanguage } from "./LanguageProvider";
import { useTranslation } from "../hooks/useTranslation";

export default function LanguageSwitcher({ onLanguageChange }) {
  const { locale, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const newLocale = e.target.value;
    changeLanguage(newLocale);

    // Call the navigation callback if provided
    if (onLanguageChange) {
      onLanguageChange(newLocale);
    }
  };

  return (
    <div className="language-switcher">
      <select
        value={locale}
        onChange={handleChange}
        style={{
          padding: "8px 12px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "14px",
          direction: locale === "ar" ? "rtl" : "ltr",
        }}
      >
        <option value="ar">{t("common.arabic")}</option>
        <option value="en">{t("common.english")}</option>
      </select>
    </div>
  );
}
