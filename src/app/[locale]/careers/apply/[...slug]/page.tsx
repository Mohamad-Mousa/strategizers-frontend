import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { apiGet } from "@/lib/api";
import { Job } from "@/types/job";
import ApplyPageContent from "./pageContent";

interface PageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

// Helper function to get localized content
const getLocalizedContent = (
  content: string | { [key: string]: string },
  locale: string
) => {
  if (typeof content === "string") return content;
  return content[locale] || content.en || Object.values(content)[0];
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const jobSlug = Array.isArray(slug) ? slug.join("/") : slug;
  const t = await getTranslations("jobApplication");

  try {
    // Fetch job data for SEO
    const response = await apiGet<Job>(`/public/job/${jobSlug}`);

    if (response.error || !response.results) {
      return {
        title: t("errors.notFound"),
        description: t("errors.notFoundDescription"),
      };
    }

    const job = response.results;
    const jobTitle = getLocalizedContent(job.title, locale);
    const jobDescription = getLocalizedContent(job.description, locale);

    // Create dynamic title: "Apply | Job Title"
    const pageTitle = `${t("apply")} | ${jobTitle}`;

    // Create dynamic description
    const pageDescription = jobDescription
      ? `${t("applyFor")} ${jobTitle}. ${jobDescription.substring(0, 150)}...`
      : `${t("applyFor")} ${jobTitle}. ${t("joinOurTeam")}`;

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: [
        t("keywords.job"),
        t("keywords.career"),
        t("keywords.apply"),
        jobTitle,
        t("keywords.opportunity"),
        t("keywords.employment"),
      ].join(", "),
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        type: "website",
        locale: locale,
        images: job.image
          ? [
              {
                url: `https://api-strat.othmanconstruction.com/${job.image}`,
                width: 1200,
                height: 630,
                alt: jobTitle,
              },
            ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDescription,
        images: job.image
          ? [`https://api-strat.othmanconstruction.com/${job.image}`]
          : undefined,
      },
      alternates: {
        canonical: `/${locale}/careers/apply/${jobSlug}`,
        languages: {
          en: `/en/careers/apply/${jobSlug}`,
          ar: `/ar/careers/apply/${jobSlug}`,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata for job application page:", error);

    // Fallback metadata
    return {
      title: t("errors.notFound"),
      description: t("errors.notFoundDescription"),
    };
  }
}

export default async function ApplyJobPage() {
  return <ApplyPageContent />;
}
