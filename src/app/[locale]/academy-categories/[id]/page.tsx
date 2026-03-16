import Hero from "@/components/layout/Hero";
import { getTranslations } from "next-intl/server";
import AcademyCategoryContent from "./AcademyCategoryContent";
import type { Metadata } from "next";
import { sanitizeTitle } from "@/lib/metadata";
import { getImageUrl } from "@/lib/image";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:4000/api/v1";

async function getAcademyCategoryData(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/academy-category`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const categories = data.results?.data || [];
    return categories.find((c: { _id: string }) => c._id === id) || null;
  } catch (error) {
    console.error("Error fetching academy category:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const category = await getAcademyCategoryData(id);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found",
    };
  }

  const title = sanitizeTitle(
    category.title?.[locale as "en" | "ar"] || category.title?.en || "Category",
    "Academy Category"
  );

  return {
    title,
    description: `Explore ${title} - courses and learning materials`,
    openGraph: { title, type: "website" },
    twitter: { card: "summary", title },
  };
}

export default async function AcademyCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getTranslations("academyCategory");
  const category = await getAcademyCategoryData(id);

  const courses = category?.courses || [];
  const bannerUrl =
    courses[0]?.image
      ? getImageUrl(courses[0].image)
      : "/services.webp";

  const heroTitle = category
    ? category.title?.[locale as "en" | "ar"] ||
      category.title?.en ||
      t("hero.title")
    : t("hero.title");

  const heroSubtitle =
    category && courses.length > 0 ? (
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <span className="text-white font-bold text-lg">{courses.length}</span>
          <span className="text-white/90 text-sm font-medium">
            {t("courses")}
          </span>
        </div>
      </div>
    ) : undefined;

  return (
    <div className="flex flex-col">
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        background={bannerUrl || "/services.webp"}
      />
      <AcademyCategoryContent
        categoryId={id}
        initialCategory={category}
        locale={locale}
      />
    </div>
  );
}
