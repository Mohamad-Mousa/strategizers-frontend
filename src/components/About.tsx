"use client";
import { useWebsite } from "@/hooks/useWebsite";
import { useLocale, useTranslations } from "next-intl";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";
import { getImageUrl } from "@/lib/image";

const About = () => {
  const { website, loading, error, refetchWebsite } = useWebsite();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("aboutComponent");

  // Loading state with skeleton
  if (loading || !website?.aboutPage) {
    return (
      <section className="py-16 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            {/* Title skeleton */}
            <div className="h-8 bg-gray-200 rounded-lg mx-auto mb-6 animate-pulse max-w-2xl"></div>
            <div className="h-6 bg-gray-200 rounded-lg mx-auto mb-6 animate-pulse max-w-xl"></div>

            {/* Divider skeleton */}
            <div className="relative w-full flex items-center justify-center">
              <div className="w-1/4 h-0.5 bg-gray-200"></div>
              <div className="absolute left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gray-200 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-1">
              {/* Image skeleton */}
              <div className="w-full h-[400px] bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            <div className="order-2 space-y-6">
              {/* Text content skeleton */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>

              {/* Button skeleton */}
              <div className="w-32 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("errors.loadFailed")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("errors.loadDescription")}
              </p>
              <button
                onClick={refetchWebsite}
                className="inline-flex items-center gap-2 px-4 py-2 bg-web-primary text-white rounded-lg hover:bg-web-primary/90 transition-colors duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                {t("errors.retry")}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1
            className="text-[32px] font-medium text-gray-900 leading-tight mx-auto mb-6"
            dangerouslySetInnerHTML={{
              __html:
                website?.aboutPage?.shortDescription?.[
                  locale as keyof typeof website.aboutPage.shortDescription
                ] ||
                website?.aboutPage?.shortDescription?.en ||
                t("defaults.shortDescription"),
            }}
          />
          <div className="relative w-full flex items-center justify-center">
            <div className="w-1/4 h-0.5 bg-gray-200"></div>
            <div className="absolute left-1/2 -translate-x-1/2 w-24 h-0.5 bg-web-primary"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-1">
            <div className="relative">
              <NextImage
                src={
                  getImageUrl(website?.aboutPage?.banner) || "/1.jpg"
                }
                alt={t("altText.teamCollaboration")}
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                priority
              />
            </div>
          </div>

          <div className="order-2 space-y-6">
            <p
              className="text-base text-gray-700 leading-relaxed line-clamp-13"
              dangerouslySetInnerHTML={{
                __html:
                  website?.aboutPage?.longDescription?.[
                    locale as keyof typeof website.aboutPage.longDescription
                  ] ||
                  website?.aboutPage?.longDescription?.en ||
                  t("defaults.longDescription"),
              }}
            />
            <button
              onClick={() => router.push(`/${locale}/about`)}
              className="bg-web-primary text-white px-8 py-2 rounded-full uppercase transition-all duration-300  hover:bg-white hover:text-web-primary border border-web-primary cursor-pointer"
            >
              {t("cta.readMore")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
