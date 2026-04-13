import { getTranslations } from "next-intl/server";
import {
  SingleServiceResponse,
  SingleSubServiceResponse,
} from "@/types/service";
import ServiceContent from "./ServiceContent";
import SubServiceContent from "./SubServiceContent";
import type { Metadata } from "next";
import { sanitizeTitle } from "@/lib/metadata";
import { getImageUrl } from "@/lib/image";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://strategizers-backend.onrender.com/api/v1";

// Fetch service data server-side
async function getServiceData(slug: string) {
  try {
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

// Fetch subservice data server-side
async function getSubServiceData(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/sub-service/${slug}`);

    if (!response.ok) {
      throw new Error("Failed to fetch subservice data");
    }

    const data: SingleSubServiceResponse = await response.json();
    return data.results.subService;
  } catch (error) {
    console.error("Error fetching subservice data:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugArray = Array.isArray(slug) ? slug : [slug];
  const isSubService = slugArray.length === 2;

  if (isSubService) {
    const subServiceSlug = slugArray[1];
    const subService = await getSubServiceData(subServiceSlug);

    if (!subService) {
      return {
        title: "Subservice Not Found",
        description: "The requested subservice could not be found",
      };
    }

    const title = sanitizeTitle(
      subService.title[locale as "en" | "ar"] || subService.title.en,
      "Subservice"
    );
    const description =
      subService.oneLineValuePromise[locale as "en" | "ar"] ||
      subService.oneLineValuePromise.en;
    const plainDescription = description
      .replace(/<[^>]*>/g, "")
      .substring(0, 160)
      .trim();

    return {
      title,
      description: plainDescription,
      openGraph: { title, description: plainDescription, type: "website" },
      twitter: {
        card: "summary_large_image",
        title,
        description: plainDescription,
      },
    };
  }

  const serviceSlug = slugArray[0];
  const service = await getServiceData(serviceSlug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found",
    };
  }

  const title = sanitizeTitle(
    service.title[locale as "en" | "ar"] || service.title.en,
    "Solution"
  );
  const shortDescription =
    service.shortDescription[locale as "en" | "ar"] ||
    service.shortDescription.en;
  const longDescription =
    service.longDescription[locale as "en" | "ar"] ||
    service.longDescription.en;
  const combinedDescription = `${shortDescription} ${longDescription}`;
  const plainDescription = combinedDescription
    .replace(/<[^>]*>/g, "")
    .substring(0, 160)
    .trim();
  const subserviceNames = service.subServices.map(
    (sub) => sub.title[locale as "en" | "ar"] || sub.title.en
  );
  const imageUrl = getImageUrl(service.image) || undefined;

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
  const slugArray = Array.isArray(slug) ? slug : [slug];
  const isSubService = slugArray.length === 2;

  const t = await getTranslations(
    isSubService ? "singleSubService" : "singleSolution"
  );

  return (
    <div className="flex flex-col">
      {isSubService ? (
        <SubServiceContent slug={slugArray[1]} />
      ) : (
        <ServiceContent slug={slugArray[0]} />
      )}
    </div>
  );
}
