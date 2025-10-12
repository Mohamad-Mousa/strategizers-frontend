"use client";
import { Course } from "@/types/academy";
import { useLocale, useTranslations } from "next-intl";
import NextImage from "next/image";
import { Calendar, BookOpen, Tag } from "lucide-react";

interface CourseDetailsProps {
  course: Course;
}

const CourseDetails = ({ course }: CourseDetailsProps) => {
  const locale = useLocale();
  const t = useTranslations("course");

  const courseTitle =
    course.title[locale as keyof typeof course.title] || course.title.en;
  const shortDescription =
    course.shortDescription?.[locale as keyof typeof course.shortDescription] ||
    course.shortDescription?.en ||
    "";
  const longDescription =
    course.longDescription?.[locale as keyof typeof course.longDescription] ||
    course.longDescription?.en ||
    "";
  const categoryTitle =
    course.programCategory?.title[
      locale as keyof typeof course.programCategory.title
    ] || course.programCategory?.title.en;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Course Image */}
            <div className="relative h-96 md:h-full">
              <NextImage
                src={
                  course.image
                    ? `https://api-strat.othmanconstruction.com/${course.image}`
                    : "/1.jpg"
                }
                alt={courseTitle}
                fill
                className="object-contain"
              />
            </div>

            {/* Course Info */}
            <div className="p-8 flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {courseTitle}
              </h1>

              {shortDescription && (
                <p className="text-xl text-gray-600 mb-6">{shortDescription}</p>
              )}

              {/* Course Meta Information */}
              <div className="space-y-4">
                {categoryTitle && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-web-primary/10 flex items-center justify-center">
                      <Tag className="text-web-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t("category")}</p>
                      <p className="font-semibold text-gray-900">
                        {categoryTitle}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-web-primary/10 flex items-center justify-center">
                    <Calendar className="text-web-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("createdAt")}</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(course.createdAt).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {course.updatedAt && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-web-primary/10 flex items-center justify-center">
                      <BookOpen className="text-web-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t("updatedAt")}</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(course.updatedAt).toLocaleDateString(locale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course Description */}
        {longDescription && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("aboutCourse")}
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {longDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
