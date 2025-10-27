import Hero from "@/components/layout/Hero";
import { getTranslations } from "next-intl/server";
import { SingleServiceResponse } from "@/types/service";
import ServiceContent from "./ServiceContent";
import type { Metadata } from "next";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api-strat.othmanconstruction.com/api/v1";

// Fetch service data server-side
async function getServiceData(slug: string) {
  try {
    console.log({ slug: `${API_BASE_URL}/public/service/${slug}` });
    const response = await fetch(`${API_BASE_URL}/public/service/${slug}`);

    if (!response.ok) {
      throw new Error("Failed to fetch service data");
    }

    const data: SingleServiceResponse = await response.json();
    return data.results.service;
  } catch (error) {
    console.error("Error fetching service data:", error);
    return null;
  }
}

// Generate metadata for SEO based on service data
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const service = await getServiceData(slugString);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found",
    };
  }

  const title = service.title[locale as "en" | "ar"] || service.title.en;
  const shortDescription =
    service.shortDescription[locale as "en" | "ar"] ||
    service.shortDescription.en;
  const longDescription =
    service.longDescription[locale as "en" | "ar"] ||
    service.longDescription.en;

  // Extract text from HTML descriptions for meta description (limit to 160 chars)
  const combinedDescription = `${shortDescription} ${longDescription}`;
  const plainDescription = combinedDescription
    .replace(/<[^>]*>/g, "")
    .substring(0, 160)
    .trim();

  // Extract subservice titles as keywords
  const subserviceNames = service.subServices.map(
    (sub) => sub.title[locale as "en" | "ar"] || sub.title.en
  );

  // Get service image for OpenGraph
  const imageUrl = service.image
    ? `https://api-strat.othmanconstruction.com/${service.image}`
    : undefined;

  return {
    title,
    description: plainDescription,
    keywords: subserviceNames,
    openGraph: {
      title,
      description: plainDescription,
      type: "website",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: plainDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function SingleSolutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("singleSolution");
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;

  return (
    <div className="flex flex-col">
      <Hero title={t("hero.title")} background="/services.webp" />

      {/* Service Content - Client Component */}
      <ServiceContent slug={slugString} />
    </div>
  );
}
