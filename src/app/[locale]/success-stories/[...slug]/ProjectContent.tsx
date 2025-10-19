"use client";

import NextImage from "next/image";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { apiGet } from "@/lib/api";
import { SingleProjectResponse, Project } from "@/types/project";
import {
  Loader2,
  AlertCircle,
  ExternalLink,
  Calendar,
  Tag,
  Building2,
} from "lucide-react";
import Link from "next/link";

interface ProjectContentProps {
  slug: string;
}

export default function ProjectContent({ slug }: ProjectContentProps) {
  const locale = useLocale();
  const t = useTranslations("singleProject");
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get localized text based on current locale
  const getLocalizedText = (text: { en: string; ar: string }) => {
    return text[locale as keyof typeof text] || text.en;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Build image URL
  const buildImageUrl = (imagePath: string) => {
    return imagePath.startsWith("http")
      ? imagePath
      : `https://api-strat.othmanconstruction.com/${imagePath}`;
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response: SingleProjectResponse = await apiGet(
          `/public/project/${slug}`
        );

        if (!response.error) {
          setProject(response.results.project);
        } else {
          setError(response.message || t("errors.fetchFailed"));
        }
      } catch (err) {
        setError(t("errors.fetchError"));
        console.error("Error fetching project:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug, t]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-web-primary" />
          <span className="text-gray-600">{t("loading")}</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-red-600">
          <AlertCircle className="w-6 h-6" />
          <span>{error || t("notFound")}</span>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto mt-20 px-6 flex flex-col gap-10">
      {/* Project Hero Image */}
      <NextImage
        src={buildImageUrl(project.image)}
        alt={getLocalizedText(project.title)}
        width={1920}
        height={1080}
        className="w-full rounded-lg"
      />

      {/* Project Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Project Details */}
        <div className="flex flex-col gap-5 bg-gray-100 p-6 rounded-md">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-web-primary" />
            <p className="text-web-primary font-medium w-1/4">
              {t("details.customer")}
            </p>
            <p className="font-medium">{project.customer}</p>
          </div>
          <div className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-web-primary" />
            <p className="text-web-primary font-medium w-1/4">
              {t("details.liveDemo")}
            </p>
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-web-primary hover:text-web-primary/80 underline"
            >
              {project.link}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-web-primary" />
            <p className="text-web-primary font-medium w-1/4">
              {t("details.category")}
            </p>
            <p className="font-medium">
              {getLocalizedText(project.service.title)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-web-primary" />
            <p className="text-web-primary font-medium w-1/4">
              {t("details.date")}
            </p>
            <p className="font-medium">{formatDate(project.date)}</p>
          </div>
          <div className="flex items-start gap-2">
            <Tag className="w-5 h-5 text-web-primary mt-1" />
            <p className="text-web-primary font-medium w-1/4">
              {t("details.tags")}
            </p>
            <div className="flex flex-wrap gap-2">
              {project?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-web-primary/10 text-web-primary text-sm rounded-full"
                >
                  {tag[locale as keyof typeof tag] || tag.en}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-gray-900">
            {getLocalizedText(project.title)}
          </h1>
          <p className="text-lg text-web-primary font-medium">
            {getLocalizedText(project.service.title)}
          </p>
          <p
            className="text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: getLocalizedText(project.shortDescription),
            }}
          />
          <button
            onClick={() => window.open(project.link, "_blank")}
            className="bg-web-primary text-white px-6 py-4 rounded-full hover:text-web-primary hover:bg-white transition-all duration-300 cursor-pointer hover:border-web-primary border w-48"
          >
            {t("launchButton")}
          </button>
        </div>
      </div>

      {/* Project Analysis */}
      <div className="flex flex-col gap-6">
        <div className="relative">
          <h2 className="border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
            {t("sections.analysis")}
          </h2>
          <hr className="w-1/6 border-web-primary border-2 absolute bottom-0" />
        </div>
        <p
          className="text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: getLocalizedText(project.projectAnalysis.description),
          }}
        />
        {project.projectAnalysis.image && (
          <NextImage
            src={buildImageUrl(project.projectAnalysis.image)}
            alt={t("sections.analysis")}
            width={1920}
            height={1080}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
      </div>

      {/* Project Solutions */}
      <div className="flex flex-col gap-6">
        <div className="relative">
          <h2 className="border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
            {t("sections.solutions")}
          </h2>
          <hr className="w-1/6 border-web-primary border-2 absolute bottom-0" />
        </div>
        <p
          className="text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: getLocalizedText(project.projectSolutions.description),
          }}
        />
        {project.projectSolutions.image && (
          <NextImage
            src={buildImageUrl(project.projectSolutions.image)}
            alt={t("sections.solutions")}
            width={1920}
            height={1080}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
      </div>

      {/* Project Results */}
      <div className="flex flex-col gap-6">
        <div className="relative">
          <h2 className="border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
            {t("sections.results")}
          </h2>
          <hr className="w-1/6 border-web-primary border-2 absolute bottom-0" />
        </div>
        <p
          className="text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: getLocalizedText(project.projectResults.description),
          }}
        />
        {project.projectResults.image && (
          <NextImage
            src={buildImageUrl(project.projectResults.image)}
            alt={t("sections.results")}
            width={1920}
            height={1080}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
      </div>
    </section>
  );
}
