import PageHero from "@/components/layout/PageHero";
import { getTranslations } from "next-intl/server";
import { WebsiteResponse, SeoTag } from "@/types/website";
import { sanitizeTitle } from "@/lib/metadata";
import { getImageUrl } from "@/lib/image";
import TalentsContent from "./TalentsContent";
import TalentsCTA from "./TalentsCTA";
import type { Metadata } from "next";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://api.strategizers-me.com/api/v1";

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
  const seo = websiteData?.teamPage?.seo;

  if (!seo) {
    return {
      title: "Our Talents",
      description: "Meet our talented team",
    };
  }

  const title = sanitizeTitle(
    seo.title[locale as "en" | "ar"] || seo.title.en,
    "Our Talents"
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

export default async function OurTalentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // Consume params to avoid lint warning
  const t = await getTranslations("ourTeam");
  const websiteData = await getWebsiteData();

  const bannerUrl = getImageUrl(websiteData?.teamPage?.banner) || "/services.webp";

  return (
    <div className="-mb-10">
      <PageHero title={t("hero.title")} background={bannerUrl} />

      {/* Team Content - Client Component */}
      <TalentsContent />

      {/* CTA Section - Client Component */}
      <TalentsCTA />
    </div>
  );
}
