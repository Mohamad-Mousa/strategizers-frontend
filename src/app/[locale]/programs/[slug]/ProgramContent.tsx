"use client";

import {
  AlertCircle,
  ChevronRight,
  Folder,
  ArrowLeft,
  MoveRight,
  MoveLeft,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect, useCallback, useRef } from "react";
import { apiGet } from "@/lib/api";
import {
  SingleProgramResponse,
  AcademyResponse,
  Program,
  Category,
  Course,
} from "@/types/academy";
import Link from "next/link";
import NextImage from "next/image";
import { slugify } from "@/lib/slugify";
import { getImageUrl } from "@/lib/image";

interface ProgramContentProps {
  slug: string;
  initialProgram: Program | null;
}

// Skeleton loader for program page
function ProgramSkeleton() {
  return (
    <section className="max-w-[1600px] w-full mx-auto mt-20 px-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar skeleton */}
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
        {/* Main content skeleton */}
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

export default function ProgramContent({
  slug,
  initialProgram,
}: ProgramContentProps) {
  const locale = useLocale();
  const t = useTranslations("program");

  const [program, setProgram] = useState<Program | null>(initialProgram);
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    null
  );
  const hasInitializedExpanded = useRef(false);
  const [isLoading, setIsLoading] = useState(!initialProgram);
  const [error, setError] = useState<string | null>(null);

  const fetchProgram = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Try single program endpoint
      try {
        const response: SingleProgramResponse = await apiGet(
          `/public/program/${slug}`
        );
        if (!response.error && response.results?.program) {
          setProgram(response.results.program);
          // Fetch all programs for sidebar (fire and forget)
          apiGet(
            `/public/program?page=1&limit=100&sortBy=createdAt&sortDirection=desc&term=&program=`
          ).then((listRes: AcademyResponse) => {
            if (!listRes.error && listRes.results?.data) {
              setAllPrograms(listRes.results.data);
            }
          });
          return;
        }
      } catch {
        // Fall through to list fallback
      }

      // Fallback: fetch from list
      const listResponse: AcademyResponse = await apiGet(
        `/public/program?page=1&limit=100&sortBy=createdAt&sortDirection=desc&term=&program=`
      );
      if (!listResponse.error && listResponse.results?.data) {
        const found =
          listResponse.results.data.find((p) => p.slug === slug) || null;
        setProgram(found);
        setAllPrograms(listResponse.results.data);
      } else {
        setError(t("errors.fetchFailed"));
      }
    } catch (err) {
      setError(t("errors.fetchError"));
      console.error("Error fetching program:", err);
    } finally {
      setIsLoading(false);
    }
  }, [slug, t]);

  const fetchAllPrograms = useCallback(async () => {
    try {
      const response: AcademyResponse = await apiGet(
        `/public/program?page=1&limit=100&sortBy=createdAt&sortDirection=desc&term=&program=`
      );
      if (!response.error && response.results?.data) {
        setAllPrograms(response.results.data);
      }
    } catch (err) {
      console.error("Error fetching programs:", err);
    }
  }, []);

  useEffect(() => {
    if (!initialProgram) {
      fetchProgram();
    } else {
      fetchAllPrograms();
    }
  }, [initialProgram, fetchProgram, fetchAllPrograms]);

  // Reset expanded state when program/slug changes
  useEffect(() => {
    hasInitializedExpanded.current = false;
  }, [slug]);

  // Set first category expanded by default only on initial program load
  useEffect(() => {
    if (
      program?.categories?.length &&
      !hasInitializedExpanded.current
    ) {
      setExpandedCategoryId(program.categories[0]._id);
      hasInitializedExpanded.current = true;
    }
  }, [program?.categories]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategoryId((prev) =>
      prev === categoryId ? null : categoryId
    );
  };

  if (isLoading) {
    return <ProgramSkeleton />;
  }

  if (error || !program) {
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
                onClick={() => fetchProgram()}
                className="inline-flex items-center justify-center gap-2 bg-web-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-web-primary/90 transition-colors"
              >
                {t("retry")}
              </button>
              <Link
                href={`/${locale}/solutions`}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {t("backToSolutions")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const categories = program.categories || [];
  const otherPrograms = allPrograms.filter((p) => p.slug !== slug);

  return (
    <section className="max-w-[1600px] w-full mx-auto mt-20 px-6 pb-20">
      {/* Breadcrumb & Back button */}
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
            href={`/${locale}/solutions`}
            className="hover:text-web-primary transition-colors"
          >
            {t("breadcrumb.programs")}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            {program.title?.[locale as keyof typeof program.title] ||
              program.title?.en}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar - Other Programs */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-gray-100 rounded-lg p-4 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {t("otherPrograms")}
            </h3>
            {otherPrograms.length === 0 ? (
              <p className="text-gray-500 text-sm">
                {t("noOtherPrograms")}
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {otherPrograms.map((p) => (
                  <Link
                    key={p._id}
                    href={`/${locale}/programs/${p.slug}`}
                    className="p-3 rounded-lg transition-all duration-300 flex items-center gap-3 justify-between group border bg-white border-gray-200 hover:border-web-primary/50 hover:shadow-sm text-gray-700"
                  >
                    <span className="text-sm font-medium truncate">
                      {p.title?.[locale as keyof typeof p.title] || p.title?.en}
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

        {/* Main content - Categories & Courses */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
              {t("categories")}
            </h2>
            <p className="text-gray-600 mt-2">{t("categoriesDescription")}</p>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">{t("noCategoriesFound")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categories.map((category: Category) => {
                const isExpanded = expandedCategoryId === category._id;
                const courses = category.courses || [];

                return (
                  <div
                    key={category._id}
                    className={`border rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-300 ${
                      isExpanded
                        ? "border-web-primary/50 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleCategory(category._id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`transition-transform duration-300 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        >
                          <ChevronRight className="w-5 h-5 text-web-primary flex-shrink-0" />
                        </span>
                        <Folder className="w-5 h-5 text-web-primary flex-shrink-0" />
                        <span className="font-semibold text-gray-900">
                          {category.title?.[
                            locale as keyof typeof category.title
                          ] || category.title?.en}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({courses.length} {t("courses")})
                        </span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="transition-opacity duration-300">
                        <div className="border-t border-gray-200 bg-gray-50/50 p-4">
                          {courses.length === 0 ? (
                            <p className="text-gray-500 text-sm py-4 pl-4">
                              {t("noCoursesFound")}
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {courses.map((course: Course) => {
                                const categorySlug =
                                  category.slug ||
                                  slugify(
                                    category.title?.["en"] ||
                                      category.title?.["ar"] ||
                                      ""
                                  ) ||
                                  category._id;
                                return (
                                <Link
                                  key={course._id}
                                  href={`/${locale}/programs/${program.slug}/${categorySlug}/${course.slug}`}
                                  className="group flex flex-col rounded-lg border border-gray-200 bg-white overflow-hidden hover:border-web-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
                                >
                                  <div className="relative h-40 bg-gray-100">
                                    <NextImage
                                      src={
                                        getImageUrl(course.image) || "/services.webp"
                                      }
                                      alt={
                                        course.title?.[
                                          locale as keyof typeof course.title
                                        ] || course.title?.en || ""
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
                                      {course.title?.[
                                        locale as keyof typeof course.title
                                      ] || course.title?.en}
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
                              );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
