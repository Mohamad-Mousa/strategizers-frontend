"use client";
import Contact from "@/components/Contact";
import Hero from "@/components/layout/Hero";
import { MoveRight, Loader2, AlertCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import NextImage from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { apiGet } from "@/lib/api";
import {
  SingleServiceResponse,
  Service,
  ServicesResponse,
} from "@/types/service";
import Link from "next/link";

const SingleSolutionPage = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("singleSolution");
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;

  const [service, setService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="flex flex-col">
        <Hero title={t("hero.title")} background="/services.webp" />
        <section className="max-w-7xl mx-auto mt-20 px-6">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-web-primary" />
              <span className="text-gray-600">{t("loading")}</span>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col">
        <Hero title={t("hero.title")} background="/services.webp" />
        <section className="max-w-7xl mx-auto mt-20 px-6">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <span>{error}</span>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Service not found
  if (!service) {
    return (
      <div className="flex flex-col">
        <Hero title={t("hero.title")} background="/services.webp" />
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
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Hero title={t("hero.title")} background="/services.webp" />
      <section className="max-w-7xl mx-auto mt-20 px-6 gap-4 grid grid-cols-1 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {t("sidebar.allSolutions")}
              </h3>
              <div className="flex flex-col gap-1 max-h-96 overflow-y-auto">
                {allServices.map((serviceItem) => (
                  <Link
                    key={serviceItem._id}
                    href={`/${locale}/solutions/${serviceItem.slug}`}
                    className={`p-3 rounded-md transition-colors duration-300 flex items-center gap-2 justify-between group ${
                      service?._id === serviceItem._id
                        ? "bg-web-primary text-white"
                        : "bg-gray-50 hover:bg-web-primary hover:text-white text-gray-700"
                    }`}
                  >
                    <span className="text-sm font-medium truncate">
                      {serviceItem.title[
                        locale as keyof typeof serviceItem.title
                      ] || serviceItem.title.en}
                    </span>

                    <MoveRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
            <h1 className="text-2xl font-bold">{t("sidebar.brochures")}</h1>
            <div className="flex flex-col gap-0">
              {service.brochure.pdf && (
                <a
                  href={`https://api-strat.othmanconstruction.com/${service.brochure.pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 p-4 flex items-center gap-2 cursor-pointer transition-colors duration-300 hover:bg-web-primary hover:text-white text-lg font-medium"
                >
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="-4 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.6686 26.0962C25.1812 26.2401 24.4656 26.2563 23.6984 26.145C22.875 26.0256 22.0351 25.7739 21.2096 25.403C22.6817 25.1888 23.8237 25.2548 24.8005 25.6009C25.0319 25.6829 25.412 25.9021 25.6686 26.0962ZM17.4552 24.7459C17.3953 24.7622 17.3363 24.7776 17.2776 24.7939C16.8815 24.9017 16.4961 25.0069 16.1247 25.1005L15.6239 25.2275C14.6165 25.4824 13.5865 25.7428 12.5692 26.0529C12.9558 25.1206 13.315 24.178 13.6667 23.2564C13.9271 22.5742 14.193 21.8773 14.468 21.1894C14.6075 21.4198 14.7531 21.6503 14.9046 21.8814C15.5948 22.9326 16.4624 23.9045 17.4552 24.7459ZM14.8927 14.2326C14.958 15.383 14.7098 16.4897 14.3457 17.5514C13.8972 16.2386 13.6882 14.7889 14.2489 13.6185C14.3927 13.3185 14.5105 13.1581 14.5869 13.0744C14.7049 13.2566 14.8601 13.6642 14.8927 14.2326ZM9.63347 28.8054C9.38148 29.2562 9.12426 29.6782 8.86063 30.0767C8.22442 31.0355 7.18393 32.0621 6.64941 32.0621C6.59681 32.0621 6.53316 32.0536 6.44015 31.9554C6.38028 31.8926 6.37069 31.8476 6.37359 31.7862C6.39161 31.4337 6.85867 30.8059 7.53527 30.2238C8.14939 29.6957 8.84352 29.2262 9.63347 28.8054ZM27.3706 26.1461C27.2889 24.9719 25.3123 24.2186 25.2928 24.2116C24.5287 23.9407 23.6986 23.8091 22.7552 23.8091C21.7453 23.8091 20.6565 23.9552 19.2582 24.2819C18.014 23.3999 16.9392 22.2957 16.1362 21.0733C15.7816 20.5332 15.4628 19.9941 15.1849 19.4675C15.8633 17.8454 16.4742 16.1013 16.3632 14.1479C16.2737 12.5816 15.5674 11.5295 14.6069 11.5295C13.948 11.5295 13.3807 12.0175 12.9194 12.9813C12.0965 14.6987 12.3128 16.8962 13.562 19.5184C13.1121 20.5751 12.6941 21.6706 12.2895 22.7311C11.7861 24.0498 11.2674 25.4103 10.6828 26.7045C9.04334 27.3532 7.69648 28.1399 6.57402 29.1057C5.8387 29.7373 4.95223 30.7028 4.90163 31.7107C4.87693 32.1854 5.03969 32.6207 5.37044 32.9695C5.72183 33.3398 6.16329 33.5348 6.6487 33.5354C8.25189 33.5354 9.79489 31.3327 10.0876 30.8909C10.6767 30.0029 11.2281 29.0124 11.7684 27.8699C13.1292 27.3781 14.5794 27.011 15.985 26.6562L16.4884 26.5283C16.8668 26.4321 17.2601 26.3257 17.6635 26.2153C18.0904 26.0999 18.5296 25.9802 18.976 25.8665C20.4193 26.7844 21.9714 27.3831 23.4851 27.6028C24.7601 27.7883 25.8924 27.6807 26.6589 27.2811C27.3486 26.9219 27.3866 26.3676 27.3706 26.1461ZM30.4755 36.2428C30.4755 38.3932 28.5802 38.5258 28.1978 38.5301H3.74486C1.60224 38.5301 1.47322 36.6218 1.46913 36.2428L1.46884 3.75642C1.46884 1.6039 3.36763 1.4734 3.74457 1.46908H20.263L20.2718 1.4778V7.92396C20.2718 9.21763 21.0539 11.6669 24.0158 11.6669H30.4203L30.4753 11.7218L30.4755 36.2428ZM28.9572 10.1976H24.0169C21.8749 10.1976 21.7453 8.29969 21.7424 7.92417V2.95307L28.9572 10.1976ZM31.9447 36.2428V11.1157L21.7424 0.871022V0.823357H21.6936L20.8742 0H3.74491C2.44954 0 0 0.785336 0 3.75711V36.2435C0 37.5427 0.782956 40 3.74491 40H28.2001C29.4952 39.9997 31.9447 39.2143 31.9447 36.2428Z"
                      fill="currentColor"
                    />
                  </svg>
                  {t("sidebar.downloadPdf")}
                </a>
              )}
              {service.brochure.document && (
                <a
                  href={`https://api-strat.othmanconstruction.com/${service.brochure.document}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 p-4 flex items-center gap-2 cursor-pointer transition-colors duration-300 hover:bg-web-primary hover:text-white text-lg font-medium"
                >
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H10C10.5523 23 11 22.5523 11 22C11 21.4477 10.5523 21 10 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM12.952 12.694C12.783 12.1682 12.2198 11.879 11.694 12.048C11.1682 12.217 10.879 12.7802 11.048 13.306L13.298 20.306C13.4309 20.7196 13.8156 21 14.25 21C14.6844 21 15.0691 20.7196 15.202 20.306L16.5 16.2679L17.798 20.306C17.9309 20.7196 18.3156 21 18.75 21C19.1844 21 19.5691 20.7196 19.702 20.306L21.952 13.306C22.121 12.7802 21.8318 12.217 21.306 12.048C20.7802 11.879 20.217 12.1682 20.048 12.694L18.75 16.7321L17.452 12.694C17.3191 12.2804 16.9344 12 16.5 12C16.0656 12 15.6809 12.2804 15.548 12.694L14.25 16.7321L12.952 12.694Z"
                      fill="currentColor"
                    />
                  </svg>
                  {t("sidebar.downloadDoc")}
                </a>
              )}
            </div>
          </div>
          <Contact />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <NextImage
            src={
              service.image
                ? `https://api-strat.othmanconstruction.com/${service.image}`
                : "/1.jpg"
            }
            alt={
              service.title[locale as keyof typeof service.title] ||
              service.title.en
            }
            width={1920}
            height={1080}
            className="w-full rounded-lg"
          />
          <p
            dangerouslySetInnerHTML={{
              __html:
                service.shortDescription[
                  locale as keyof typeof service.shortDescription
                ] || service.shortDescription.en,
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html:
                service.longDescription[
                  locale as keyof typeof service.longDescription
                ] || service.longDescription.en,
            }}
          />
          <div className="relative">
            <h1 className="border-b border-gray-200 pb-2 text-2xl font-bold">
              {t("sections.subservices")}
            </h1>
            <hr className="w-1/6 border-web-primary border-2 absolute bottom-0" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 py-8">
            {service.subServices.map((subService) => (
              <div
                key={subService._id}
                className="flex flex-col gap-2 border border-gray-200 rounded-md p-4 relative group"
              >
                {/* Icon at top center */}
                <div className="text-web-primary absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow group-hover:bg-web-primary group-hover:text-white transition-colors duration-300 w-12 h-12 flex items-center justify-center">
                  <span dangerouslySetInnerHTML={{ __html: subService.icon }} />
                </div>

                <p className="font-semibold mt-8">
                  {subService.title[locale as keyof typeof subService.title] ||
                    subService.title.en}
                </p>
                <p
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html:
                      subService.description[
                        locale as keyof typeof subService.description
                      ] || subService.description.en,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="relative">
            <h1 className="border-b border-gray-200 pb-2 text-2xl font-bold">
              {t("sections.benefits")}
            </h1>
            <hr className="w-1/6 border-web-primary border-2 absolute bottom-0" />
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html:
                service.benefits.description[
                  locale as keyof typeof service.benefits.description
                ] || service.benefits.description.en,
            }}
          />
          {service.benefits.video && (
            <iframe
              height="400"
              src={service.benefits.video}
              title={
                service.title[locale as keyof typeof service.title] ||
                service.title.en
              }
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full rounded-lg"
            ></iframe>
          )}
          {/* Human Capital Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg p-12 text-white">
            {/* Background Glowing Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Green glowing circles */}
              <div className="absolute top-10 right-20 w-32 h-32 bg-web-primary/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-20 right-40 w-24 h-24 bg-web-primary/40 rounded-full blur-lg animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 right-10 w-16 h-16 bg-web-primary/25 rounded-full blur-md animate-pulse delay-500"></div>

              {/* Curved glowing lines */}
              <div className="absolute top-1/4 right-0 w-64 h-1 bg-gradient-to-l from-web-primary/40 to-transparent blur-sm transform rotate-12"></div>
              <div className="absolute bottom-1/3 right-0 w-48 h-1 bg-gradient-to-l from-web-primary/40 to-transparent blur-sm transform -rotate-12"></div>

              {/* Abstract shapes */}
              <div className="absolute top-20 right-32 w-20 h-20 border border-web-primary/30 rounded-full"></div>
              <div className="absolute bottom-32 right-24 w-12 h-12 border border-web-primary/40 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                {t("cta.title")}
              </h2>

              <h3 className="text-2xl font-bold mb-6 leading-relaxed">
                {t("cta.subtitle")}
                <span className="text-sm align-super ml-1">™</span>
              </h3>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {t("cta.description")}
              </p>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push(`/${locale}/contact`)}
                  className="bg-transparent border-2 border-web-primary text-web-primary hover:bg-web-primary hover:text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-web-primary focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
                >
                  {t("cta.contactButton")}
                </button>
                <button
                  onClick={() => router.push(`/${locale}/proposal`)}
                  className="bg-transparent border-2 border-web-primary text-web-primary hover:bg-web-primary hover:text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-web-primary focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
                >
                  {t("cta.rfpButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleSolutionPage;
