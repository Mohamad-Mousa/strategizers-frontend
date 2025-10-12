"use client";
import { useWebsite } from "@/hooks/useWebsite";
import { useLocale, useTranslations } from "next-intl";
import NextImage from "next/image";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

const Services = () => {
  const { website, loading, error, refetchWebsite } = useWebsite();
  const locale = useLocale();
  const t = useTranslations("servicesComponent");

  // Loading state with skeleton
  if (loading || !website?.homePage?.services) {
    return (
      <div className="w-full bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8">
          <div className="relative flex flex-col items-center justify-center">
            {/* Title skeleton */}
            <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-48 mb-2"></div>
            <hr className="w-1/3 border-gray-200 border-1 absolute bottom-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Service Image Skeleton */}
                <div className="h-48 bg-gray-200 animate-pulse"></div>

                {/* Service Content Skeleton */}
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8">
        <div className="relative flex flex-col items-center justify-center">
          <h1 className="border-b border-gray-200 pb-2 text-3xl font-normal text-center max-w-5xl">
            {t("title")}
          </h1>
          <hr className="w-1/3 border-web-primary border-1 absolute bottom-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {website?.homePage?.services?.map((service) => (
            <Link
              href={`/${locale}/solutions/${service.slug}`}
              key={service._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Service Image */}
              <div className="h-48 overflow-hidden">
                <NextImage
                  src={
                    service.image
                      ? `https://api-strat.othmanconstruction.com/${service.image}`
                      : "/1.jpg"
                  }
                  alt={
                    service.title[locale as keyof typeof service.title] ||
                    service.title.en
                  }
                  width={400}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-web-primary">
                  {service.title[locale as keyof typeof service.title] ||
                    service.title.en}
                </h3>
                <p
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html:
                      service.shortDescription[
                        locale as keyof typeof service.shortDescription
                      ] || service.shortDescription.en,
                  }}
                ></p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
