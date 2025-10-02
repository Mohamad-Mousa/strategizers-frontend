"use client";
import { useLocale } from "next-intl";
import ServiceCard from "./ServiceCard";
import { useWebsite } from "@/hooks/useWebsite";
import { AlertCircle, RefreshCw } from "lucide-react";

const SectionOne = () => {
  const { website, loading, error, refetchWebsite } = useWebsite();
  const locale = useLocale();

  // Loading state with skeleton
  if (loading || !website?.homePage?.welcomeSection?.featuredServices) {
    return (
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8">
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
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Failed to load featured services
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn&apos;t load the featured services section. Please try
                again.
              </p>
              <button
                onClick={refetchWebsite}
                className="inline-flex items-center gap-2 px-4 py-2 bg-web-primary text-white rounded-lg hover:bg-web-primary/90 transition-colors duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {website?.homePage?.welcomeSection?.featuredServices?.map(
            (service) => (
              <ServiceCard
                key={service._id}
                title={
                  service.title[locale as keyof typeof service.title] ||
                  service.title.en
                }
                description={
                  service.description[
                    locale as keyof typeof service.description
                  ] || service.description.en
                }
                image={
                  service.image
                    ? `https://api-strat.othmanconstruction.com/${service.image}`
                    : "/1.jpg"
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
