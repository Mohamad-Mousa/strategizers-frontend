import { Inter } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "../../components/LanguageProvider";
import { use } from "react";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export default function LocaleLayout({ children, params }) {
  const { locale } = use(params);
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body className={inter.className}>
        <LanguageProvider defaultLocale={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
