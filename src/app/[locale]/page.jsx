"use client";
import { useTranslation } from "../../hooks/useTranslation";
import { useLanguage } from "../../components/LanguageProvider";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function LocalePage({ params }) {
  const { locale } = use(params);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const router = useRouter();

  const handleLanguageChange = (newLocale) => {
    // Navigate to the new locale
    router.push(`/${newLocale}`);
  };

  return (
    <main
      style={{
        padding: "2rem",
        direction: isRTL ? "rtl" : "ltr",
        textAlign: isRTL ? "right" : "left",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <LanguageSwitcher onLanguageChange={handleLanguageChange} />
      </div>

      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        {t("home.title")}
      </h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        {t("home.description")}
      </p>

      <button
        style={{
          padding: "12px 24px",
          fontSize: "1rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {t("home.cta")}
      </button>

      <nav style={{ marginTop: "2rem" }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            gap: "1rem",
          }}
        >
          <li>
            <a href="#" style={{ textDecoration: "none", color: "#0070f3" }}>
              {t("navigation.home")}
            </a>
          </li>
          <li>
            <a href="#" style={{ textDecoration: "none", color: "#0070f3" }}>
              {t("navigation.about")}
            </a>
          </li>
          <li>
            <a href="#" style={{ textDecoration: "none", color: "#0070f3" }}>
              {t("navigation.services")}
            </a>
          </li>
          <li>
            <a href="#" style={{ textDecoration: "none", color: "#0070f3" }}>
              {t("navigation.contact")}
            </a>
          </li>
        </ul>
      </nav>
    </main>
  );
}
