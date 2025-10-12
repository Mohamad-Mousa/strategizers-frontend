"use client";
import { useWebsite } from "@/hooks/useWebsite";
import { useLocale, useTranslations } from "next-intl";
import { AlertCircle, RefreshCw } from "lucide-react";

const Welcome = () => {
  const { website, loading, error, refetchWebsite } = useWebsite();
  const locale = useLocale();
  const t = useTranslations("welcomeComponent");

  // Loading state with skeleton
  if (loading || !website?.homePage?.welcomeSection) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="relative flex flex-col items-center justify-center">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-80 mb-2"></div>
          <hr className="w-1/3 border-gray-200 border-1 absolute bottom-0" />
        </div>
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-80 mb-2 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-80 mb-2 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-40 mb-2 mx-auto"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t("errors.loadFailed")}
          </h3>
          <p className="text-gray-600 mb-4">{t("errors.loadDescription")}</p>
          <button
            onClick={refetchWebsite}
            className="inline-flex items-center gap-2 px-4 py-2 bg-web-primary text-white rounded-lg hover:bg-web-primary/90 transition-colors duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            {t("errors.retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative flex flex-col items-center justify-center">
        <h1 className="border-b border-gray-200 pb-2 text-3xl font-normal text-center max-w-5xl">
          {website?.homePage?.welcomeSection?.title?.[
            locale as keyof typeof website.homePage.welcomeSection.title
          ] ||
            website?.homePage?.welcomeSection?.title?.en ||
            t("defaults.title")}
        </h1>
        <hr className="w-1/3 border-web-primary border-1 absolute bottom-0" />
      </div>
      <p
        className="max-w-[400px] text-center text-gray-500 text-lg"
        dangerouslySetInnerHTML={{
          __html:
            website?.homePage?.welcomeSection?.description?.[
              locale as keyof typeof website.homePage.welcomeSection.description
            ] ||
            website?.homePage?.welcomeSection?.description?.en ||
            t("defaults.description"),
        }}
      />
    </div>
  );
};

export default Welcome;
