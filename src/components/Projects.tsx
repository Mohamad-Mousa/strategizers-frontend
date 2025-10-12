/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useWebsite } from "@/hooks/useWebsite";
import ProjectCard from "./ProjectCard";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

const Projects = () => {
  const { website, loading, error, refetchWebsite } = useWebsite();
  const t = useTranslations("projectsComponent");

  // Loading state with skeleton
  if (loading || !website?.homePage?.projects) {
    return (
      <div className="bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto p-6 flex flex-col items-center justify-center gap-8 w-full">
          <div className="relative flex flex-col items-center justify-center">
            {/* Title skeleton */}
            <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-64 mb-2"></div>
            <hr className="w-1/3 border-gray-200 border-1 absolute bottom-0" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden w-full"
              >
                {/* Project Image Skeleton */}
                <div className="h-48 bg-gray-200 animate-pulse"></div>

                {/* Project Content Skeleton */}
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
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
      <div className="bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto p-6">
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
    <div className="bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto p-6 flex flex-col items-center justify-center gap-8 ">
        <div className="relative flex flex-col items-center justify-center">
          <h1 className="border-b border-gray-200 pb-2 text-3xl font-normal text-center max-w-5xl">
            {t("title")}
          </h1>
          <hr className="w-1/3 border-web-primary border-1 absolute bottom-0" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {website?.homePage?.projects?.map((item) => (
            <ProjectCard key={item._id} project={item as any} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
