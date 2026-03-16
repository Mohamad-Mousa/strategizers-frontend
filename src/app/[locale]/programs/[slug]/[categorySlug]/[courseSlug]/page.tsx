"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Hero from "@/components/layout/Hero";
import { useTranslations, useLocale } from "next-intl";
import { apiGet } from "@/lib/api";
import { getImageUrl } from "@/lib/image";
import { CourseDetailsResponse, Course } from "@/types/academy";
import CourseDetails from "@/components/CourseDetails";
import Link from "next/link";
import { ArrowLeft, MoveRight } from "lucide-react";

const CoursePage = () => {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("course");
  const tProgram = useTranslations("program");
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const programSlug = params.slug as string;
  const courseSlug = params.courseSlug as string;

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseSlug) return;

      try {
        setLoading(true);
        const response: CourseDetailsResponse = await apiGet(
          `/public/course/${courseSlug}`
        );

        if (!response.error && response.results.course) {
          setCourse(response.results.course);
        } else {
          setError(t("error.notFound"));
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError(t("error.fetchFailed"));
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseSlug, t]);

  if (loading) {
    return (
      <div className="flex flex-col gap-10 items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-web-primary"></div>
        <p className="text-gray-600">{t("loading")}</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col gap-10 items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("error.title")}
          </h2>
          <p className="text-gray-600 mb-6">{error || t("error.notFound")}</p>
          <div className="flex gap-4 justify-center">
            <Link
              href={`/${locale}/programs/${programSlug}`}
              className="bg-web-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-web-primary/90 transition-colors duration-300 inline-flex items-center gap-2"
            >
              {locale === "ar" ? (
                <MoveRight className="w-4 h-4" />
              ) : (
                <ArrowLeft className="w-4 h-4" />
              )}
              {tProgram("backToProgram")}
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
            >
              {t("error.refresh")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <Hero
        title={
          course.title[locale as keyof typeof course.title] || course.title.en
        }
        background={
          getImageUrl(course.image) || "/services.webp"
        }
      />
      <div className="w-full max-w-7xl mx-auto px-6">
        <Link
          href={`/${locale}/programs/${programSlug}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-web-primary transition-colors font-medium w-fit"
        >
          {locale === "ar" ? (
            <MoveRight className="w-4 h-4" />
          ) : (
            <ArrowLeft className="w-4 h-4" />
          )}
          {tProgram("backToProgram")}
        </Link>
      </div>
      <CourseDetails course={course} />
    </div>
  );
};

export default CoursePage;
