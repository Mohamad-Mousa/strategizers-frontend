"use client";

import {
  MoveRight,
  Loader2,
  AlertCircle,
  MoveLeft,
  Target,
  Package,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  FileText,
} from "lucide-react";
import Contact from "@/components/Contact";
import Header from "@/components/layout/Header";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { apiGet } from "@/lib/api";
import {
  SingleSubServiceResponse,
  SubServiceDetail,
  Service,
} from "@/types/service";
import Link from "next/link";
import { getImageUrl } from "@/lib/image";
import Image from "next/image";

interface SubServiceContentProps {
  slug: string;
}

function getLocalized(
  obj: { en: string; ar: string } | undefined,
  locale: string
): string {
  if (!obj) return "";
  return obj[locale as "en" | "ar"] || obj.en || "";
}

export default function SubServiceContent({ slug }: SubServiceContentProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("singleSubService");

  const [subService, setSubService] = useState<SubServiceDetail | null>(null);
  const [parentService, setParentService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubService = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response: SingleSubServiceResponse = await apiGet(
        `/public/sub-service/${slug}`
      );

      if (!response.error) {
        setSubService(response.results.subService);
      } else {
        setError(response.message || t("errors.fetchFailed"));
      }
    } catch (err) {
      setError(t("errors.fetchError"));
      console.error("Error fetching subservice:", err);
    } finally {
      setIsLoading(false);
    }
  }, [slug, t]);

  const fetchParentService = useCallback(async (serviceSlug: string) => {
    try {
      const response = await apiGet(`/public/service/${serviceSlug}`);
      if (!response.error) {
        setParentService(response.results.service);
      }
    } catch (err) {
      console.error("Error fetching parent service:", err);
    }
  }, []);

  useEffect(() => {
    if (slug) {
      fetchSubService();
    }
  }, [slug, fetchSubService]);

  useEffect(() => {
    if (subService?.service?.slug) {
      fetchParentService(subService.service.slug);
    }
  }, [subService?.service?.slug, fetchParentService]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-web-primary" />
          <span className="text-white/80 text-lg">{t("loading")}</span>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-red-400">
          <AlertCircle className="w-8 h-8" />
          <span className="text-lg">{error}</span>
        </div>
      </div>
    );
  }

  // Subservice not found
  if (!subService) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/80 text-xl">{t("notFound")}</p>
          <p className="text-white/50 mt-2">{t("notFoundDescription")}</p>
        </div>
      </div>
    );
  }

  const subServiceTitle = getLocalized(subService.title, locale);
  const parentServiceTitle = getLocalized(subService.service?.title, locale);
  const outcome = getLocalized(subService.outcome, locale);
  const valuePromise = getLocalized(subService.oneLineValuePromise, locale);
  const bannerImage =
    parentService?.image || parentService?.banner
      ? getImageUrl(parentService.image || parentService.banner)
      : "/services.webp";

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section - Dark immersive */}
      <section className="relative min-h-[75vh] bg-web-gray overflow-hidden">
        <div className="w-full flex justify-center">
          <Header className="absolute z-50 w-full md:w-[80%]" />
        </div>

        {/* Background Image with Gradient */}
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt={subServiceTitle}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-20 pt-40 min-h-[75vh]">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6 animate-slideUpFade flex-wrap">
              <Link
                href={`/${locale}/solutions`}
                className="hover:text-white transition-colors"
              >
                {t("sidebar.allSolutions")}
              </Link>
              <span>/</span>
              <Link
                href={`/${locale}/solutions/${subService.service.slug}`}
                className="hover:text-white transition-colors"
              >
                {parentServiceTitle}
              </Link>
              <span>/</span>
              <span className="text-white/90">{subServiceTitle}</span>
            </nav>

            {/* Parent Service Badge */}
            {parentServiceTitle && (
              <Link
                href={`/${locale}/solutions/${subService.service.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-web-primary/20 backdrop-blur-sm text-white/90 font-medium text-sm border border-web-primary/30 hover:bg-web-primary/30 transition-colors mb-6 animate-slideUpFade"
                style={{ animationDelay: "50ms" }}
              >
                <span
                  className="w-4 h-4 [&_svg]:w-4 [&_svg]:h-4"
                  dangerouslySetInnerHTML={{ __html: parentService?.icon || "" }}
                />
                {parentServiceTitle}
              </Link>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slideUpFade" style={{ animationDelay: "100ms" }}>
              {subServiceTitle}
            </h1>

            {outcome && (
              <p
                className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed animate-slideUpFade [&_strong]:font-semibold [&_strong]:text-white"
                style={{ animationDelay: "200ms" }}
                dangerouslySetInnerHTML={{ __html: outcome }}
              />
            )}
          </div>
        </div>
      </section>

      {/* Value Promise Section */}
      {valuePromise && (
        <section className="py-20 md:py-28 bg-white border-b border-gray-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center animate-slideUpFade">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-web-primary/10 text-web-primary mb-8">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-relaxed">
                <span
                  className="[&_strong]:text-web-primary [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: valuePromise }}
                />
              </h2>
            </div>
          </div>
        </section>
      )}

      {/* Key Points Section - Numbered Cards */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Strategic Issues */}
              {subService.strategicIssuesWeResolve?.length > 0 && (
                <div className="animate-slideUpFade">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                      <Target className="w-6 h-6 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {t("sections.strategicIssues")}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {subService.strategicIssuesWeResolve.map((item, idx) => (
                      <div
                        key={item._id}
                        className="flex gap-6 p-6 rounded-2xl bg-white border border-gray-100 hover:border-web-primary/20 hover:shadow-lg transition-all duration-300"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <span className="text-5xl font-bold text-gray-100 select-none leading-none">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <p
                          className="text-gray-700 leading-relaxed pt-2 [&_strong]:text-gray-900 [&_strong]:font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: getLocalized(item, locale),
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What You Get */}
              {subService.whatYouGet?.length > 0 && (
                <div className="animate-slideUpFade" style={{ animationDelay: "150ms" }}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Package className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {t("sections.whatYouGet")}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {subService.whatYouGet.map((item, idx) => (
                      <div
                        key={item._id}
                        className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                        <p className="text-gray-700 leading-relaxed pt-1.5">
                          {getLocalized(item, locale)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Subservices & Contact */}
      {parentService && parentService.subServices?.length > 1 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Other Subservices */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span>More from</span>
                    <span className="text-web-primary">{parentServiceTitle}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {parentService.subServices
                      .filter((sub) => sub.slug !== slug)
                      .map((sub) => (
                        <Link
                          key={sub._id}
                          href={`/${locale}/solutions/${parentService.slug}/${sub.slug}`}
                          className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-web-primary/40 hover:bg-web-primary/5 transition-all duration-300"
                        >
                          <span
                            className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-web-primary/10 group-hover:text-web-primary transition-colors [&_svg]:w-5 [&_svg]:h-5"
                            dangerouslySetInnerHTML={{ __html: sub.icon }}
                          />
                          <span className="font-medium text-gray-700 group-hover:text-web-primary transition-colors flex-1">
                            {getLocalized(sub.title, locale)}
                          </span>
                          {locale === "ar" ? (
                            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-web-primary group-hover:-translate-x-1 transition-all" />
                          ) : (
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-web-primary group-hover:translate-x-1 transition-all" />
                          )}
                        </Link>
                      ))}
                  </div>

                  {/* Back to Parent Service */}
                  <Link
                    href={`/${locale}/solutions/${subService.service.slug}`}
                    className="inline-flex items-center gap-2 mt-8 text-gray-600 hover:text-web-primary transition-colors font-medium"
                  >
                    {locale === "ar" ? (
                      <MoveRight className="w-5 h-5" />
                    ) : (
                      <ArrowLeft className="w-5 h-5" />
                    )}
                    {t("backToSolution")}
                  </Link>
                </div>

                {/* Contact */}
                <div>
                  <Contact />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Full-width CTA Section */}
      <section className="relative py-24 md:py-32 bg-web-gray overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-web-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-web-primary/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              {t("cta.title")}
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-web-primary mb-6">
              {t("cta.subtitle")}
              <span className="text-sm align-super">™</span>
            </h3>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push(`/${locale}/contact`)}
                className="inline-flex items-center justify-center gap-2 bg-white text-web-gray hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                {t("cta.contactButton")}
              </button>
              <button
                onClick={() => router.push(`/${locale}/proposal`)}
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
              >
                <FileText className="w-5 h-5" />
                {t("cta.rfpButton")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
