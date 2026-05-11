import Hero from "@/components/layout/Hero";
import { getTranslations } from "next-intl/server";
import AcademyCategoriesContent from "./AcademyCategoriesContent";
import type { Metadata } from "next";
import { sanitizeTitle } from "@/lib/metadata";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.strategizers-me.com/api/v1";

async function getAcademyCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/academy-category`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return data.results?.data || [];
  } catch (error) {
    console.error("Error fetching academy categories:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  const t = await getTranslations("academyCategory");
  const title = sanitizeTitle(t("hero.listTitle"), "Academy");

  return {
    title,
    description: `Explore our academy categories and courses`,
    openGraph: { title, type: "website" },
    twitter: { card: "summary", title },
  };
}

export default async function AcademyCategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("academyCategory");
  const categories = await getAcademyCategories();

  const totalCourses = categories.reduce(
    (sum: number, cat: { courses?: unknown[] }) =>
      sum + (cat.courses?.length ?? 0),
    0
  );

  const heroSubtitle =
    categories.length > 0 ? (
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <span className="text-white font-bold text-lg">
            {categories.length}
          </span>
          <span className="text-white/90 text-sm font-medium">
            {t("breadcrumb.categories")}
          </span>
        </div>
        <span className="text-white/50 text-xl">•</span>
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <span className="text-white font-bold text-lg">{totalCourses}</span>
          <span className="text-white/90 text-sm font-medium">
            {t("courses")}
          </span>
        </div>
      </div>
    ) : undefined;

  return (
    <div className="flex flex-col">
      <Hero
        title={t("hero.listTitle")}
        subtitle={heroSubtitle}
        background="/services.webp"
      />
      <AcademyCategoriesContent
        initialCategories={categories}
        locale={locale}
      />
    </div>
  );
}
