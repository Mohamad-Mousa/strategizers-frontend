"use client";

import {
  MoveRight,
  Loader2,
  AlertCircle,
  MoveLeft,
  Target,
  Package,
  ArrowLeft,
  Sparkles,
  Zap,
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
      <div className="w-12 h-12 rounded-xl bg-web-primary/10 flex items-center justify-center text-web-primary">
        <Icon className="w-6 h-6" strokeWidth={1.8} />
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
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

  const fetchParentService = useCallback(
    async (serviceSlug: string) => {
      try {
        const response = await apiGet(`/public/service/${serviceSlug}`);
        if (!response.error) {
          setParentService(response.results.service);
        }
      } catch (err) {
        console.error("Error fetching parent service:", err);
      }
    },
    []
  );

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
      <section className="max-w-7xl mx-auto mt-20 px-6">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-web-primary" />
            <span className="text-gray-600">{t("loading")}</span>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="max-w-7xl mx-auto mt-20 px-6">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="w-6 h-6" />
            <span>{error}</span>
          </div>
        </div>
      </section>
    );
  }

  // Subservice not found
  if (!subService) {
    return (
      <section className="max-w-7xl mx-auto mt-20 px-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-600 text-lg">{t("notFound")}</p>
            <p className="text-gray-400 text-sm mt-2">
              {t("notFoundDescription")}
            </p>
          </div>
        </div>
      </section>
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
    <div className="flex flex-col">
      {/* Subservice Banner */}
      <div className="relative w-full">
        <div className="w-full flex justify-center">
          <Header className="absolute z-50 w-full md:w-[80%]" />
        </div>
        <div
          className="bg-web-gray min-h-[500px] flex flex-col items-center justify-center relative gap-4 px-4 py-28 md:py-36"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(27, 48, 83, 0.6)" }}
          />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {parentServiceTitle && (
              <Link
                href={`/${locale}/solutions/${subService.service.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white/90 font-medium text-sm border border-white/30 hover:bg-white/30 transition-colors mb-4"
              >
                {parentServiceTitle}
                {locale === "ar" ? (
                  <MoveLeft className="w-4 h-4" />
                ) : (
                  <MoveRight className="w-4 h-4" />
                )}
              </Link>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {subServiceTitle}
            </h1>
            {outcome && (
              <p
                className="text-white/95 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: outcome }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24 space-y-6">
                {parentService && parentService.subServices?.length > 0 && (
                  <SectionCard
                    className="animate-slideUpFade"
                    style={{ animationDelay: "50ms" }}
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-web-primary" />
                      {parentServiceTitle}
                    </h3>
                    <nav className="flex flex-col gap-2">
                      {parentService.subServices.map((sub) => (
                        <Link
                          key={sub._id}
                          href={`/${locale}/solutions/${parentService.slug}/${sub.slug}`}
                          className={`p-3 rounded-xl transition-all duration-300 flex items-center gap-3 justify-between group border ${
                            sub.slug === slug
                              ? "bg-web-primary text-white border-web-primary shadow-md"
                              : "bg-gray-50/50 border-gray-200 hover:border-web-primary/40 hover:bg-web-primary/5 text-gray-700"
                          }`}
                        >
                          <span className="text-sm font-medium truncate">
                            {getLocalized(sub.title, locale)}
                          </span>
                          {locale === "ar" ? (
                            <MoveLeft
                              className={`w-4 h-4 flex-shrink-0 ${
                                sub.slug === slug ? "text-white" : "text-gray-400"
                              }`}
                            />
                          ) : (
                            <MoveRight
                              className={`w-4 h-4 flex-shrink-0 ${
                                sub.slug === slug ? "text-white" : "text-gray-400"
                              }`}
                            />
                          )}
                        </Link>
                      ))}
                    </nav>
                  </SectionCard>
                )}
                <div className="animate-slideUpFade" style={{ animationDelay: "100ms" }}>
                  <Contact />
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
              {/* Breadcrumb & Back */}
              <nav className="flex items-center gap-2 text-sm text-gray-600 animate-slideUpFade">
                <Link
                  href={`/${locale}/solutions`}
                  className="hover:text-web-primary transition-colors"
                >
                  {t("sidebar.allSolutions")}
                </Link>
                <span>/</span>
                {subService.service?.slug && (
                  <>
                    <Link
                      href={`/${locale}/solutions/${subService.service.slug}`}
                      className="hover:text-web-primary transition-colors"
                    >
                      {parentServiceTitle}
                    </Link>
                    <span>/</span>
                  </>
                )}
                <span className="text-gray-900 font-medium">{subServiceTitle}</span>
              </nav>

              <Link
                href={`/${locale}/solutions/${subService.service.slug}`}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-web-primary transition-colors duration-300 font-medium w-fit animate-slideUpFade"
                style={{ animationDelay: "80ms" }}
              >
                {locale === "ar" ? (
                  <MoveRight className="w-4 h-4" />
                ) : (
                  <ArrowLeft className="w-4 h-4" />
                )}
                {t("backToSolution")}
              </Link>

              {/* Value Promise */}
              {valuePromise && (
                <SectionCard
                  className="animate-slideUpFade"
                  style={{ animationDelay: "120ms" }}
                >
                  <SectionTitle
                    icon={Sparkles}
                    title={t("sections.valuePromise")}
                  />
                  <p
                    className="text-gray-700 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: valuePromise }}
                  />
                </SectionCard>
              )}

              {/* Strategic Issues */}
              {subService.strategicIssuesWeResolve?.length > 0 && (
                <SectionCard
                  className="animate-slideUpFade"
                  style={{ animationDelay: "180ms" }}
                >
                  <SectionTitle
                    icon={Target}
                    title={t("sections.strategicIssues")}
                  />
                  <div className="space-y-4">
                    {subService.strategicIssuesWeResolve.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-start gap-4 p-4 rounded-xl bg-amber-50/50 border border-amber-100 hover:border-web-primary/20 transition-all duration-300"
                      >
                        <CheckCircle2 className="w-5 h-5 text-web-primary flex-shrink-0 mt-0.5" />
                        <p
                          className="text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: getLocalized(item, locale),
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* What You Get */}
              {subService.whatYouGet?.length > 0 && (
                <SectionCard
                  className="animate-slideUpFade"
                  style={{ animationDelay: "240ms" }}
                >
                  <SectionTitle
                    icon={Package}
                    title={t("sections.whatYouGet")}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {subService.whatYouGet.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 hover:border-web-primary/20 hover:shadow-sm transition-all duration-300"
                      >
                        <Package className="w-5 h-5 text-web-primary flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 leading-relaxed">
                          {getLocalized(item, locale)}
                        </p>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* CTA Section */}
              <div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-web-gray to-gray-900 p-8 md:p-12 text-white animate-slideUpFade"
                style={{ animationDelay: "300ms" }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-web-primary/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-web-primary/15 rounded-full blur-2xl" />
                </div>
                <div className="relative z-10 max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {t("cta.title")}
                  </h2>
                  <h3 className="text-xl font-semibold mb-4 text-white/95">
                    {t("cta.subtitle")}
                    <span className="text-sm align-super ml-1">™</span>
                  </h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {t("cta.description")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => router.push(`/${locale}/contact`)}
                      className="inline-flex items-center justify-center gap-2 bg-web-primary hover:bg-web-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 border-web-primary focus:outline-none focus:ring-2 focus:ring-web-primary focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
                    >
                      <MessageSquare className="w-5 h-5" />
                      {t("cta.contactButton")}
                    </button>
                    <button
                      onClick={() => router.push(`/${locale}/proposal`)}
                      className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:border-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
                    >
                      <FileText className="w-5 h-5" />
                      {t("cta.rfpButton")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
