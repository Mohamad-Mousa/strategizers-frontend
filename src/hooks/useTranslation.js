import { useLanguage } from "../components/LanguageProvider";
import ar from "../locales/ar.json";
import en from "../locales/en.json";

const translations = {
  ar,
  en,
};

export function useTranslation() {
  const { locale } = useLanguage();

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[locale] || translations.en;

    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }

    return value || key;
  };

  return {
    t,
    locale,
  };
}
