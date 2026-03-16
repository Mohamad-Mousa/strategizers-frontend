"use client";

import {
  AlertCircle,
  ArrowLeft,
  MoveRight,
  MoveLeft,
  Folder,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import { apiGet } from "@/lib/api";
import {
  AcademyCategoryResponse,
  AcademyCategory,
  Course,
} from "@/types/academy";
import Link from "next/link";
import NextImage from "next/image";
import { getImageUrl } from "@/lib/image";

interface AcademyCategoryContentProps {
  categoryId: string;
  initialCategory: AcademyCategory | null;
  locale: string;
}

function AcademyCategorySkeleton() {
  return (
    <section className="max-w-[1600px] w-full mx-auto mt-20 px-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-gray-100 rounded-lg p-4 sticky top-24">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AcademyCategoryContent({
  categoryId,
  initialCategory,
  locale,
}: AcademyCategoryContentProps) {
  const t = useTranslations("academyCategory");

  const [category, setCategory] = useState<AcademyCategory | null>(
    initialCategory
  );
  const [allCategories, setAllCategories] = useState<AcademyCategory[]>([]);
  const [isLoading, setIsLoading] = useState(!initialCategory);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response: AcademyCategoryResponse = await apiGet(
        `/public/academy-category`
      );

      if (!response.error && response.results?.data) {
        const found =
          response.results.data.find((c) => c._id === categoryId) || null;
        setCategory(found);
        setAllCategories(response.results.data);
      } else {
        setError(t("errors.fetchFailed"));
      }
    } catch (err) {
      setError(t("errors.fetchError"));
      console.error("Error fetching academy category:", err);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, t]);

  const fetchAllCategories = useCallback(async () => {
    try {
      const response: AcademyCategoryResponse = await apiGet(
        `/public/academy-category`
      );
      if (!response.error && response.results?.data) {
        setAllCategories(response.results.data);
      }
    } catch (err) {
      console.error("Error fetching academy categories:", err);
    }
  }, []);

  useEffect(() => {
    if (!initialCategory) {
      fetchCategory();
    } else {
      fetchAllCategories();
    }
  }, [initialCategory, fetchCategory, fetchAllCategories]);

  if (isLoading) {
    return <AcademyCategorySkeleton />;
  }

  if (error || !category) {
    return (
      <section className="max-w-[1600px] w-full mx-auto mt-20 px-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <div className="flex items-center justify-center gap-3 text-red-600 mb-4">
              <AlertCircle className="w-8 h-8 flex-shrink-0" />
              <span className="text-lg font-medium">
                {error || t("notFound")}
              </span>
            </div>
            <p className="text-gray-600 mb-6">{t("notFoundDescription")}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => fetchCategory()}
                className="inline-flex items-center justify-center gap-2 bg-web-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-web-primary/90 transition-colors"
              >
                {t("retry")}
              </button>
              <Link
                href={`/${locale}/academy-categories`}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {t("backToAcademy")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const courses = category.courses || [];
  const otherCategories = allCategories.filter((c) => c._id !== categoryId);

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
          <Link
            href={`/${locale}/academy-categories`}
            className="hover:text-web-primary transition-colors"
          >
            {t("breadcrumb.categories")}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            {category.title?.[locale as keyof typeof category.title] ||
              category.title?.en}
          </span>
        </nav>
        <Link
          href={`/${locale}/academy-categories`}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-gray-100 rounded-lg p-4 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {t("otherCategories")}
            </h3>
            {otherCategories.length === 0 ? (
              <p className="text-gray-500 text-sm">
                {t("noOtherCategories")}
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {otherCategories.map((c) => (
                  <Link
                    key={c._id}
                    href={`/${locale}/academy-categories/${c._id}`}
                    className="p-3 rounded-lg transition-all duration-300 flex items-center gap-3 justify-between group border bg-white border-gray-200 hover:border-web-primary/50 hover:shadow-sm text-gray-700"
                  >
                    <span className="text-sm font-medium truncate">
                      {c.title?.[locale as keyof typeof c.title] || c.title?.en}
                    </span>
                    {locale === "ar" ? (
                      <MoveLeft className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-web-primary" />
                    ) : (
                      <MoveRight className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-web-primary" />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
              {t("courses")}
            </h2>
            <p className="text-gray-600 mt-2">{t("categoriesDescription")}</p>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">{t("noCoursesFound")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course: Course) => (
                <Link
                  key={course._id}
                  href={`/${locale}/courses/${course.slug}`}
                  className="group flex flex-col rounded-lg border border-gray-200 bg-white overflow-hidden hover:border-web-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-40 bg-gray-100">
                    <NextImage
                      src={
                        getImageUrl(course.image) || "/services.webp"
                      }
                      alt={
                        course.title?.[locale as keyof typeof course.title] ||
                        course.title?.en ||
                        ""
                      }
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-xs font-medium bg-web-primary px-2 py-1 rounded">
                        {t("viewCourse")}
                      </span>
                      {locale === "ar" ? (
                        <MoveLeft className="w-4 h-4 text-white" />
                      ) : (
                        <MoveRight className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <p className="font-semibold text-gray-900 group-hover:text-web-primary transition-colors line-clamp-2">
                      {course.title?.[locale as keyof typeof course.title] ||
                        course.title?.en}
                    </p>
                    {course.shortDescription && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">
                        {course.shortDescription[
                          locale as keyof typeof course.shortDescription
                        ] || course.shortDescription.en}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
