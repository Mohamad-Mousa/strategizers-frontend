"use client";

import { Course } from "@/types/academy";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/layout/Header";
import {
  Tag,
  Target,
  Users,
  TrendingUp,
  Monitor,
  BookOpen,
  ListChecks,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Clock,
  Layers,
  ArrowLeft,
  MoveRight,
} from "lucide-react";
import { getImageUrl } from "@/lib/image";

interface CourseDetailsProps {
  course: Course;
}

function getLocalized(
  obj: { en: string; ar: string } | undefined,
  locale: string
): string {
  if (!obj) return "";
  return obj[locale as "en" | "ar"] || obj.en || "";
}

function SectionCard({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-200/80 bg-white p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-web-primary/20 transition-all duration-500 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 rounded-xl bg-web-primary/10 flex items-center justify-center text-web-primary group-hover:bg-web-primary group-hover:text-white transition-colors duration-300">
        <Icon className="w-6 h-6" strokeWidth={1.8} />
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  const locale = useLocale();
  const t = useTranslations("course");

  const courseTitle = getLocalized(course.title, locale);
  const categoryTitle =
    getLocalized(course.academyCategory?.title, locale) ||
    getLocalized(course.programCategory?.title, locale);
  const overview =
    getLocalized(course.programOverview, locale) ||
    getLocalized(course.longDescription, locale) ||
    getLocalized(course.shortDescription, locale);

  const firstModuleId = course.programOutline?.[0]?._id;
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    () => (firstModuleId ? new Set([firstModuleId]) : new Set())
  );

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const listItems = (
    items: { _id: string; en: string; ar: string }[] | undefined,
    locale: string
  ) =>
    items?.map((item) => (
      <li key={item._id} className="flex items-start gap-3 py-2 group">
        <CheckCircle2 className="w-5 h-5 text-web-primary flex-shrink-0 mt-0.5" />
        <span className="text-gray-700 leading-relaxed">
          {item[locale as "en" | "ar"] || item.en}
        </span>
      </li>
    ));

  const bannerImage = getImageUrl(course.image) || "/services.webp";

  return (
    <div className="flex flex-col">
      {/* Course Banner - replaces Hero */}
      <div className="relative w-full">
        <div className="w-full flex justify-center">
          <Header className="absolute z-50 w-full md:w-[80%]" />
        </div>
        <div
          className="bg-web-gray min-h-[520px] flex flex-col items-center justify-center relative gap-4 px-4 py-28 md:py-36"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(27, 48, 83, 0.55)" }}
          />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {courseTitle}
            </h1>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {categoryTitle && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium text-sm border border-white/30">
                  <Tag className="w-4 h-4" />
                  {categoryTitle}
                </span>
              )}
              {getLocalized(course.programDuration, locale) && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium text-sm border border-white/30">
                  <Clock className="w-4 h-4" />
                  {getLocalized(course.programDuration, locale)}
                </span>
              )}
            </div>
            {getLocalized(course.programDurationDetails, locale) && (
              <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
                {getLocalized(course.programDurationDetails, locale)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb & Back */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8 animate-slideUpFade">
          <Link
            href={`/${locale}/solutions`}
            className="hover:text-web-primary transition-colors"
          >
            {t("category")}
          </Link>
          <span>/</span>
          {course.academyCategory && (
            <>
              <Link
                href={`/${locale}/academy-categories/${course.academyCategory._id}`}
                className="hover:text-web-primary transition-colors"
              >
                {categoryTitle}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900 font-medium truncate max-w-[200px]">
            {courseTitle}
          </span>
        </nav>

        {/* Program Overview */}
        {overview && (
          <SectionCard className="mb-6 animate-slideUpFade" style={{ animationDelay: "100ms" }}>
<SectionTitle icon={BookOpen} title={t("programOverview")} />
            <p className="text-gray-700 leading-relaxed text-lg">
              {overview}
            </p>
          </SectionCard>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Program Objectives */}
          {course.programObjectives && course.programObjectives.length > 0 && (
            <SectionCard className="animate-slideUpFade" style={{ animationDelay: "150ms" }}>
              <SectionTitle icon={Target} title={t("programObjectives")} />
              <ul className="space-y-0">
                {listItems(course.programObjectives, locale)}
              </ul>
            </SectionCard>
          )}

          {/* Target Audience */}
          {course.targetAudience && course.targetAudience.length > 0 && (
            <SectionCard className="animate-slideUpFade" style={{ animationDelay: "200ms" }}>
              <SectionTitle icon={Users} title={t("targetAudience")} />
              <ul className="space-y-0">
                {listItems(course.targetAudience, locale)}
              </ul>
            </SectionCard>
          )}

          {/* Expected Benefits */}
          {course.expectedOrganizationalBenefits &&
            course.expectedOrganizationalBenefits.length > 0 && (
              <SectionCard className="lg:col-span-2 animate-slideUpFade" style={{ animationDelay: "250ms" }}>
                <SectionTitle icon={TrendingUp} title={t("expectedBenefits")} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.expectedOrganizationalBenefits.map((item, i) => (
                    <div
                      key={item._id}
                      className="flex items-start gap-3 p-4 rounded-xl bg-web-primary/5 border border-web-primary/10 hover:border-web-primary/20 transition-colors"
                    >
                      <Sparkles className="w-5 h-5 text-web-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        {item[locale as "en" | "ar"] || item.en}
                      </span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

          {/* Delivery Format */}
          {course.deliveryFormat && course.deliveryFormat.length > 0 && (
            <SectionCard className="animate-slideUpFade" style={{ animationDelay: "300ms" }}>
              <SectionTitle icon={Monitor} title={t("deliveryFormat")} />
              <div className="flex flex-wrap gap-2">
                {course.deliveryFormat.map((item) => (
                  <span
                    key={item._id}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium text-sm hover:bg-web-primary/10 hover:text-web-primary transition-colors"
                  >
                    {item[locale as "en" | "ar"] || item.en}
                  </span>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Program Methodology */}
          {course.programMethodology &&
            course.programMethodology.length > 0 && (
              <SectionCard className="animate-slideUpFade" style={{ animationDelay: "350ms" }}>
                <SectionTitle icon={Layers} title={t("programMethodology")} />
                <ul className="space-y-0">
                  {listItems(course.programMethodology, locale)}
                </ul>
              </SectionCard>
            )}
        </div>

        {/* Program Outline - Accordion */}
        {course.programOutline && course.programOutline.length > 0 && (
          <SectionCard className="mt-6 animate-slideUpFade" style={{ animationDelay: "400ms" }}>
            <SectionTitle icon={ListChecks} title={t("programOutline")} />
            <div className="space-y-3">
              {course.programOutline.map((module, idx) => {
                const isExpanded = expandedModules.has(module._id);
                const moduleTitle =
                  module.title[locale as "en" | "ar"] || module.title.en;
                return (
                  <div
                    key={module._id}
                    className="rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-web-primary/30"
                  >
                    <button
                      type="button"
                      onClick={() => toggleModule(module._id)}
                      className="w-full flex items-center justify-between p-4 md:p-5 text-left bg-gray-50/50 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-web-primary text-white flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {moduleTitle}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-web-primary transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="p-4 md:p-5 pt-0 border-t border-gray-100 animate-fadeInUp">
                        <ul className="space-y-2">
                          {module.items?.map((item) => (
                            <li
                              key={item._id}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-web-primary mt-2 flex-shrink-0" />
                              <span>
                                {item[locale as "en" | "ar"] || item.en}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </SectionCard>
        )}

        {/* Sample Practical Activities */}
        {course.samplePracticalActivities &&
          course.samplePracticalActivities.length > 0 && (
            <SectionCard className="mt-6 animate-slideUpFade" style={{ animationDelay: "450ms" }}>
              <SectionTitle icon={Sparkles} title={t("sampleActivities")} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {course.samplePracticalActivities.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 rounded-xl bg-gradient-to-br from-web-primary/5 to-web-primary/10 border border-web-primary/10 hover:shadow-md hover:border-web-primary/20 transition-all duration-300"
                  >
                    <span className="text-gray-700 font-medium">
                      {item[locale as "en" | "ar"] || item.en}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

        {/* Back to Academy CTA */}
        <div className="mt-12 flex justify-center animate-slideUpFade" style={{ animationDelay: "500ms" }}>
          <Link
            href={
              course.academyCategory
                ? `/${locale}/academy-categories/${course.academyCategory._id}`
                : `/${locale}/academy-categories`
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-web-primary text-white font-semibold hover:bg-web-primary/90 transition-all duration-300 hover:scale-[1.02]"
          >
            {locale === "ar" ? (
              <MoveRight className="w-5 h-5" />
            ) : (
              <ArrowLeft className="w-5 h-5" />
            )}
            {categoryTitle
              ? `${t("category")}: ${categoryTitle}`
              : t("backToAcademy")}
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
