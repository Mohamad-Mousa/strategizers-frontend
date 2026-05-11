"use client";

import Contact from "@/components/Contact";
import Header from "@/components/layout/Header";
import {
  MoveRight,
  Loader2,
  AlertCircle,
  MoveLeft,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  FileText,
  Download,
  Play,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { apiGet } from "@/lib/api";
import { getImageUrl } from "@/lib/image";
import {
  SingleServiceResponse,
  Service,
  ServicesResponse,
} from "@/types/service";
import Link from "next/link";
import Image from "next/image";

interface ServiceContentProps {
  slug: string;
}

function getLocalized(
  obj: { en: string; ar: string } | undefined,
  locale: string
): string {
  if (!obj) return "";
  return obj[locale as "en" | "ar"] || obj.en || "";
}

export default function ServiceContent({ slug }: ServiceContentProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("singleSolution");

  const [service, setService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const fetchService = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response: SingleServiceResponse = await apiGet(
        `/public/service/${slug}`
      );

      if (!response.error) {
        setService(response.results.service);
      } else {
        setError(response.message || t("errors.fetchFailed"));
      }
    } catch (err) {
      setError(t("errors.fetchError"));
      console.error("Error fetching service:", err);
    } finally {
      setIsLoading(false);
    }
  }, [slug, t]);

  const fetchAllServices = useCallback(async () => {
    try {
      const response: ServicesResponse = await apiGet(
        `/public/service?page=1&limit=100`
      );

      if (!response.error) {
        setAllServices(response.results.data);
      }
    } catch (err) {
      console.error("Error fetching all services:", err);
    }
  }, []);

  useEffect(() => {
    if (slug) {
      fetchService();
    }
    fetchAllServices();
  }, [slug, fetchService, fetchAllServices]);

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

  // Service not found
  if (!service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/80 text-xl">{t("notFound")}</p>
          <p className="text-white/50 mt-2">{t("notFoundDescription")}</p>
        </div>
      </div>
    );
  }

  const serviceTitle = getLocalized(service.title, locale);
  const shortDescription = getLocalized(service.shortDescription, locale);
  const longDescription = getLocalized(service.longDescription, locale);
  const benefitsDescription = getLocalized(
    service.benefits.description,
    locale
  );

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section - Dark immersive */}
      <section className="relative min-h-[85vh] bg-web-gray overflow-hidden">
        <div className="w-full flex justify-center">
          <Header className="absolute z-50 w-full md:w-[80%]" />
        </div>

        {/* Background Image with Gradient */}
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(service.banner || service.image)}
            alt={serviceTitle}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-20 pt-40 min-h-[85vh]">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-8 animate-slideUpFade">
              <Link
                href={`/${locale}/solutions`}
                className="hover:text-white transition-colors"
              >
                {t("sidebar.allSolutions")}
              </Link>
              <span>/</span>
              <span className="text-white/90">{serviceTitle}</span>
            </nav>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slideUpFade" style={{ animationDelay: "100ms" }}>
              {serviceTitle}
            </h1>

            {shortDescription && (
              <p
                className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed animate-slideUpFade [&_strong]:font-semibold [&_strong]:text-white"
                style={{ animationDelay: "200ms" }}
                dangerouslySetInnerHTML={{ __html: shortDescription }}
              />
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-16 animate-slideUpFade">
              <span className="text-sm font-medium text-web-primary uppercase tracking-wider mb-4 block">
                {t("sections.whatWeDo")}
              </span>
              {longDescription && (
                <div
                  className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-snug max-w-4xl prose prose-lg [&_p]:mb-0 [&_strong]:text-web-primary"
                  dangerouslySetInnerHTML={{ __html: longDescription }}
                />
              )}
            </div>

            {/* Subservices Grid */}
            {service.subServices && service.subServices.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {service.subServices.map((subService, index) => (
                  <Link
                    key={subService._id}
                    href={`/${locale}/solutions/${service.slug}/${subService.slug}`}
                    className="group animate-slideUpFade"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <article className="h-full">
                      {/* Icon Grid */}
                      <div className="mb-6 grid grid-cols-3 gap-1 w-12 h-12">
                        {[...Array(9)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-sm transition-all duration-300 ${
                              i < 4
                                ? "bg-web-primary group-hover:bg-web-primary/80"
                                : "bg-gray-200 group-hover:bg-web-primary/20"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-web-primary transition-colors">
                        {getLocalized(subService.title, locale)}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4"
                        dangerouslySetInnerHTML={{
                          __html: getLocalized(subService.outcome, locale),
                        }}
                      />

                      {/* Read More Link */}
                      <span className="text-sm font-medium text-gray-400 group-hover:text-web-primary transition-colors flex items-center gap-1">
                        {t("readMore")}
                        {locale === "ar" ? (
                          <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        ) : (
                          <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        )}
                      </span>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section with Video */}
      {(service.benefits.features?.length > 0 || service.benefits.video) && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              {/* Section Title */}
              <div className="text-center mb-16 animate-slideUpFade">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
                  {t("sections.benefits")}
                </h2>
                {benefitsDescription && (
                  <p
                    className="text-gray-600 text-lg max-w-2xl mx-auto"
                    dangerouslySetInnerHTML={{ __html: benefitsDescription }}
                  />
                )}
              </div>

              {/* Video Section */}
              {service.benefits.video && (
                <div className="mb-16 animate-slideUpFade" style={{ animationDelay: "100ms" }}>
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                    {!showVideo ? (
                      <>
                        <Image
                          src={getImageUrl(service.banner || service.image)}
                          alt={serviceTitle}
                          fill
                          className="object-cover opacity-60"
                        />
                        <button
                          onClick={() => setShowVideo(true)}
                          className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                        >
                          <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-web-primary transition-all duration-300">
                            <Play className="w-10 h-10 text-web-primary group-hover:text-white transition-colors ml-1" />
                          </div>
                        </button>
                      </>
                    ) : (
                      <iframe
                        src={`${service.benefits.video}?autoplay=1`}
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Benefits Grid */}
              {service.benefits.features && service.benefits.features.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.benefits.features.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-web-primary/20 hover:shadow-lg transition-all duration-300 animate-slideUpFade"
                      style={{ animationDelay: `${(idx + 2) * 80}ms` }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      </div>
                      <p
                        className="text-gray-700 leading-relaxed pt-2"
                        dangerouslySetInnerHTML={{
                          __html: getLocalized(benefit, locale),
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Solutions Navigation */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Other Solutions */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t("sidebar.allSolutions")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allServices
                    .filter((s) => s._id !== service._id)
                    .slice(0, 6)
                    .map((serviceItem) => (
                      <Link
                        key={serviceItem._id}
                        href={`/${locale}/solutions/${serviceItem.slug}`}
                        className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-web-primary/40 hover:bg-web-primary/5 transition-all duration-300"
                      >
                        <span
                          className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-web-primary/10 group-hover:text-web-primary transition-colors [&_svg]:w-5 [&_svg]:h-5"
                          dangerouslySetInnerHTML={{ __html: serviceItem.icon }}
                        />
                        <span className="font-medium text-gray-700 group-hover:text-web-primary transition-colors flex-1">
                          {getLocalized(serviceItem.title, locale)}
                        </span>
                        {locale === "ar" ? (
                          <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-web-primary group-hover:-translate-x-1 transition-all" />
                        ) : (
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-web-primary group-hover:translate-x-1 transition-all" />
                        )}
                      </Link>
                    ))}
                </div>
              </div>

              {/* Brochure Downloads & Contact */}
              <div className="space-y-6">
                {/* Brochures */}
                {(service.brochure?.pdf || service.brochure?.document) && (
                  <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Download className="w-5 h-5 text-web-primary" />
                      {t("sidebar.brochures")}
                    </h4>
                    <div className="space-y-3">
                      {service.brochure.pdf && (
                        <a
                          href={getImageUrl(service.brochure.pdf)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100 hover:border-red-200 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-900 block">
                              {t("sidebar.pdfBrochure")}
                            </span>
                            <span className="text-xs text-gray-500">PDF</span>
                          </div>
                          <Download className="w-4 h-4 text-red-500 group-hover:translate-y-0.5 transition-transform" />
                        </a>
                      )}
                      {service.brochure.document && (
                        <a
                          href={getImageUrl(service.brochure.document)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100 hover:border-blue-200 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-900 block">
                              {t("sidebar.wordBrochure")}
                            </span>
                            <span className="text-xs text-gray-500">DOC</span>
                          </div>
                          <Download className="w-4 h-4 text-blue-500 group-hover:translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact CTA */}
                <Contact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width CTA Section */}
      <section className="relative py-24 md:py-32 bg-web-gray overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-web-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-web-primary/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6">
              {t("cta.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
              {t("cta.title")}
            </h2>
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
