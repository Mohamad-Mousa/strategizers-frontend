import { WebsiteResponse, SeoTag } from "@/types/website";
import { sanitizeTitle } from "@/lib/metadata";
import HomeContent from "./HomeContent";
import type { Metadata } from "next";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:4000/api/v1";

// Fetch website data server-side
async function getWebsiteData() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/website`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error("Failed to fetch website data");
    }

    const data: WebsiteResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching website data:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const websiteData = await getWebsiteData();
  const seo = websiteData?.homePage?.seo;

  if (!seo) {
    return {
      title: "Home",
      description:
        "Welcome to Strategizers - Your trusted partner for business solutions",
    };
  }

  const title = sanitizeTitle(
    seo.title[locale as "en" | "ar"] || seo.title.en,
    "Home"
  );
  const description =
    seo.description[locale as "en" | "ar"] || seo.description.en;

  // Handle tags - they can be either an array of objects or an object with language arrays
  let keywords: string[] = [];
  if (Array.isArray(seo.tags)) {
    // If tags is an array of objects with en/ar properties
    keywords = (seo.tags as SeoTag[])
      .map((tag) => tag[locale as "en" | "ar"] || tag.en)
      .filter(Boolean);
  } else if (seo.tags && typeof seo.tags === "object") {
    // If tags is an object with en/ar arrays
    const tagsObj = seo.tags as { en: string[]; ar: string[] };
    keywords = tagsObj[locale as "en" | "ar"] || tagsObj.en || [];
  }

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // Consume params to avoid lint warning

  return <HomeContent />;
}
