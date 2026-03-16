"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLeft, MoveRight, MoveLeft, Folder } from "lucide-react";
import { getImageUrl } from "@/lib/image";
import type { AcademyCategory } from "@/types/academy";

interface AcademyCategoriesContentProps {
  initialCategories: AcademyCategory[];
  locale: string;
}

export default function AcademyCategoriesContent({
  initialCategories,
  locale,
}: AcademyCategoriesContentProps) {
  const t = useTranslations("academyCategory");
  const categories = initialCategories;

  if (categories.length === 0) {
    return (
      <section className="max-w-[1600px] w-full mx-auto mt-20 px-6 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link
              href={`/${locale}/solutions`}
              className="hover:text-web-primary transition-colors"
            >
              {t("breadcrumb.academy")}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {t("breadcrumb.categories")}
            </span>
          </nav>
          <Link
            href={`/${locale}/solutions`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-web-primary transition-colors font-medium w-fit"
          >
            {locale === "ar" ? (
              <MoveRight className="w-4 h-4" />
            ) : (
              <ArrowLeft className="w-4 h-4" />
            )}
            {t("backToAcademy")}
          </Link>
        </div>
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">{t("noCategoriesFound")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1600px] w-full mx-auto mt-20 px-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link
            href={`/${locale}/solutions`}
            className="hover:text-web-primary transition-colors"
          >
            {t("breadcrumb.academy")}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            {t("breadcrumb.categories")}
          </span>
        </nav>
        <Link
          href={`/${locale}/solutions`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-web-primary transition-colors font-medium w-fit"
        >
          {locale === "ar" ? (
            <MoveRight className="w-4 h-4" />
          ) : (
            <ArrowLeft className="w-4 h-4" />
          )}
          {t("backToAcademy")}
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const courses = category.courses || [];
          const firstCourseImage = courses[0]?.image;

          return (
            <Link
              key={category._id}
              href={`/${locale}/academy-categories/${category._id}`}
              className="group flex flex-col rounded-lg border border-gray-200 bg-white overflow-hidden hover:border-web-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-40 bg-gray-100">
                <NextImage
                  src={
                    getImageUrl(firstCourseImage) || "/services.webp"
                  }
                  alt={
                    category.title?.[locale as keyof typeof category.title] ||
                    category.title?.en ||
                    ""
                  }
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xs font-medium bg-web-primary px-2 py-1 rounded">
                    {t("viewCategory")}
                  </span>
                  {locale === "ar" ? (
                    <MoveLeft className="w-4 h-4 text-white" />
                  ) : (
                    <MoveRight className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="font-semibold text-gray-900 group-hover:text-web-primary transition-colors">
                  {category.title?.[locale as keyof typeof category.title] ||
                    category.title?.en}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {courses.length} {t("courses")}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
