import Hero from "@/components/layout/Hero";
import { getTranslations } from "next-intl/server";
import ProgramContent from "./ProgramContent";
import type { Metadata } from "next";
import { sanitizeTitle } from "@/lib/metadata";
import { getImageUrl } from "@/lib/image";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:4000/api/v1";

// Fetch program data server-side
async function getProgramData(slug: string) {
  try {
    // Try single program endpoint first
    const response = await fetch(`${API_BASE_URL}/public/program/${slug}`, {
      next: { revalidate: 60 },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.results?.program) return data.results.program;
    }

    // Fallback: fetch from list and find by slug
    const listResponse = await fetch(
      `${API_BASE_URL}/public/program?page=1&limit=100&sortBy=createdAt&sortDirection=desc&term=&program=`,
      { next: { revalidate: 60 } }
    );
    if (!listResponse.ok) return null;

    const listData = await listResponse.json();
    const programs = listData.results?.data || [];
    return (
      programs.find((p: { slug: string; _id: string }) => p.slug === slug) ||
      null
    );
  } catch (error) {
    console.error("Error fetching program data:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const program = await getProgramData(slug);

  if (!program) {
    return {
      title: "Program Not Found",
      description: "The requested program could not be found",
    };
  }

  const title = sanitizeTitle(
    program.title?.[locale as "en" | "ar"] || program.title?.en || "Program",
    "Program"
  );

  return {
    title,
    description: `Explore ${title} - categories and courses`,
    openGraph: { title, type: "website" },
    twitter: { card: "summary", title },
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("program");
  const program = await getProgramData(slug);

  const bannerUrl = getImageUrl(program?.image) || "/services.webp";

  const heroTitle = program
    ? program.title?.[locale as "en" | "ar"] ||
      program.title?.en ||
      t("hero.title")
    : t("hero.title");

  const categoriesCount = program?.categories?.length ?? 0;
  const coursesCount =
    program?.categories?.reduce(
      (sum: number, cat: { courses?: unknown[] }) =>
        sum + (cat.courses?.length ?? 0),
      0
    ) ?? 0;

  const heroSubtitle =
    program && (categoriesCount > 0 || coursesCount > 0) ? (
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <span className="text-white font-bold text-lg">{categoriesCount}</span>
          <span className="text-white/90 text-sm font-medium">
            {t("stats.categories")}
          </span>
        </div>
        <span className="text-white/50 text-xl">•</span>
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <span className="text-white font-bold text-lg">{coursesCount}</span>
          <span className="text-white/90 text-sm font-medium">
            {t("stats.courses")}
          </span>
        </div>
      </div>
    ) : (
      program?.description?.[locale as "en" | "ar"] ||
      program?.description?.en
    );

  return (
    <div className="flex flex-col">
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        background={bannerUrl}
      />
      <ProgramContent slug={slug} initialProgram={program} />
    </div>
  );
}
