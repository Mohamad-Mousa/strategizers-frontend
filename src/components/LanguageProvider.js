"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children, defaultLocale = "en" }) {
  const [locale, setLocale] = useState(defaultLocale);
  const [isRTL, setIsRTL] = useState(defaultLocale === "ar");

  useEffect(() => {
    // Set RTL based on locale
    setIsRTL(locale === "ar");

    // Update document direction and language
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [locale, isRTL]);

  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, isRTL, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
