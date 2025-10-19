import Hero from "@/components/layout/Hero";
import { getTranslations } from "next-intl/server";
import { SingleProjectResponse } from "@/types/project";
import ProjectContent from "./ProjectContent";
import type { Metadata } from "next";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1";

// Fetch project data server-side
async function getProjectData(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/project/${slug}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error("Failed to fetch project data");
    }

    const data: SingleProjectResponse = await response.json();
    return data.results.project;
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
}

// Generate metadata for SEO based on project data
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugString = Array.isArray(slug) ? slug[0] : slug;
  const project = await getProjectData(slugString);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found",
    };
  }

  const title = project.title[locale as "en" | "ar"] || project.title.en;
  const shortDescription =
    project.shortDescription[locale as "en" | "ar"] ||
    project.shortDescription.en;
  const serviceTitle =
    project.service.title[locale as "en" | "ar"] || project.service.title.en;

  // Use project tags as keywords
  const keywords = project.tags || [];

  // Get project image for OpenGraph
  const imageUrl = project.image
    ? project.image.startsWith("http")
      ? project.image
      : `https://api-strat.othmanconstruction.com/${project.image}`
    : undefined;

  return {
    title: `${title} - ${serviceTitle}`,
    description: shortDescription,
    keywords: keywords
      .map((tag) => tag[locale as keyof typeof tag] || tag.en)
      .join(", "),
    openGraph: {
      title: `${title} - ${serviceTitle}`,
      description: shortDescription,
      type: "article",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      tags: project.tags
        .map((tag) => tag[locale as keyof typeof tag] || tag.en)
        .join(", "),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${serviceTitle}`,
      description: shortDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function SingleProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("singleProject");
  const slugString = Array.isArray(slug) ? slug[0] : slug;

  return (
    <div className="flex flex-col">
      <Hero title={t("hero.title")} background="/services.webp" />

      {/* Project Content - Client Component */}
      <ProjectContent slug={slugString} />
    </div>
  );
}
