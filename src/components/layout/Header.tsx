"use client";
import {
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Facebook,
  Folder,
  Handshake,
  House,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Newspaper,
  Phone,
  Twitter,
  Users,
  X,
  Youtube,
} from "lucide-react";
import TikTokIcon from "../TikTokIcon";
import { useState, useEffect, useCallback, useRef } from "react";
import NextImage from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useSettings } from "@/hooks/useSettings";
import { apiGet } from "@/lib/api";
import { getImageUrl } from "@/lib/image";
import {
  ServicesResponse,
  Service,
  SingleServiceResponse,
} from "@/types/service";
import {
  AcademyCategoryResponse,
  AcademyCategory,
} from "@/types/academy";

function stripLeadingLocale(pathname: string): string {
  // result always starts with "/" (or is just "/")
  const stripped = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped; // never return undefined/empty
}

const Header = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const currentPage = pathname.split("/")[2];

  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { settings } = useSettings();
  const t = useTranslations("header");

  // Services state
  const [services, setServices] = useState<Service[]>([]);

  // Academy state (categories)
  const [academyCategories, setAcademyCategories] = useState<
    AcademyCategory[]
  >([]);

  // Hovered service (for subservices submenu)
  const [hoveredServiceSlug, setHoveredServiceSlug] = useState<string | null>(
    null
  );
  const [hoveredServiceDetails, setHoveredServiceDetails] =
    useState<Service | null>(null);
  const [isLoadingSubservices, setIsLoadingSubservices] = useState(false);
  const hoverServiceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch service details (with subservices) when hovering
  const fetchServiceDetails = useCallback(async (slug: string) => {
    setIsLoadingSubservices(true);
    setHoveredServiceDetails(null);
    try {
      const response: SingleServiceResponse = await apiGet(
        `/public/service/${slug}`
      );
      if (!response.error && response.results?.service) {
        setHoveredServiceDetails(response.results.service);
      } else {
        setHoveredServiceDetails(null);
      }
    } catch (err) {
      setHoveredServiceDetails(null);
    } finally {
      setIsLoadingSubservices(false);
    }
  }, []);

  // Helper function to format social media URLs
  const formatSocialUrl = (url: string, platform: string) => {
    if (!url) return null;

    // If URL already has protocol, return as is
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // Add https:// if not present
    if (url.startsWith("www.")) {
      return `https://${url}`;
    }

    // For platform-specific URLs, construct the full URL
    const domainMap: { [key: string]: string } = {
      facebook: "facebook.com",
      instagram: "instagram.com",
      twitter: "twitter.com",
      linkedin: "linkedin.com",
      youtube: "youtube.com",
      tiktok: "tiktok.com",
    };

    const domain = domainMap[platform] || platform;
    return `https://${url.includes(domain) ? url : `${domain}/${url}`}`;
  };

  // Fetch services function
  const fetchServices = useCallback(async () => {
    try {
      const response: ServicesResponse = await apiGet(
        `/public/service?page=1&limit=6`
      );

      if (!response.error) {
        setServices(response.results.data);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  }, []);

  // Fetch academy categories function
  const fetchAcademyCategories = useCallback(async () => {
    try {
      const response: AcademyCategoryResponse = await apiGet(
        `/public/academy-category`
      );

      if (!response.error) {
        setAcademyCategories(response.results.data || []);
      }
    } catch (err) {
      console.error("Error fetching academy categories:", err);
    }
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isSolutionsHovered, setIsSolutionsHovered] = useState(false);

  // Timeout ref for Solutions dropdown close delay
  const solutionsCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Language toggle function
  const toggleLanguage = useCallback(() => {
    const newLocale = locale === "ar" ? "en" : "ar";

    const basePath = stripLeadingLocale(pathname);

    const qs = searchParams.toString();
    const href = `${basePath}${qs ? `?${qs}` : ""}`;

    router.push(href, { locale: newLocale });
  }, [locale, pathname, searchParams, router]);

  // Fetch services and academy categories on component mount
  useEffect(() => {
    fetchServices();
    fetchAcademyCategories();
  }, [fetchServices, fetchAcademyCategories]);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu when escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMenuOpen]);

  return (
    <header className={`${className}`}>
      {/* Top Bar */}
      <div className="bg-none text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          {/* Contact Info */}
          <div className="flex items-center space-x-6">
            <Link
              href={`tel:${
                settings?.contact?.phone
                  ? `+${settings.contact.phone.code}${settings.contact.phone.number}`
                  : "+96179322736"
              }`}
              className="flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4 text-web-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>
                {t("contact.phone")}:{" "}
                {settings?.contact?.phone
                  ? `+${settings.contact.phone.code} ${settings.contact.phone.number}`
                  : "+961 79322736"}
              </span>
            </Link>
            <Link
              href={`mailto:${
                settings?.contact?.email || "strategizers@gmail.com"
              }`}
              className="flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4 text-web-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>
                {settings?.contact?.email || "strategizers@gmail.com"}
              </span>
            </Link>
          </div>

          {/* Social Media & Language */}
          <div className="flex items-center space-x-4">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              {settings?.social?.facebook && (
                <Link
                  href={
                    formatSocialUrl(settings.social.facebook, "facebook") || "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-web-primary transition-colors duration-300"
                >
                  <Facebook size={20} />
                </Link>
              )}
              {settings?.social?.twitter && (
                <Link
                  href={
                    formatSocialUrl(settings.social.twitter, "twitter") || "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-web-primary transition-colors duration-300"
                >
                  <Twitter size={20} />
                </Link>
              )}
              {settings?.social?.linkedin && (
                <Link
                  href={
                    formatSocialUrl(settings.social.linkedin, "linkedin") || "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-web-primary transition-colors duration-300"
                >
                  <Linkedin size={20} />
                </Link>
              )}
              {settings?.social?.instagram && (
                <Link
                  href={
                    formatSocialUrl(settings.social.instagram, "instagram") ||
                    "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-web-primary transition-colors duration-300"
                >
                  <Instagram size={20} />
                </Link>
              )}
              {settings?.social?.youtube && (
                <Link
                  href={
                    formatSocialUrl(settings.social.youtube, "youtube") || "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-web-primary transition-colors duration-300"
                >
                  <Youtube size={20} />
                </Link>
              )}
              {settings?.social?.tiktok && (
                <Link
                  href={
                    formatSocialUrl(settings.social.tiktok, "tiktok") || "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-web-primary transition-colors duration-300"
                >
                  <TikTokIcon size={20} />
                </Link>
              )}
            </div>
            {/* Language Selection */}
            <div
              className="flex items-center space-x-3"
              onClick={toggleLanguage}
            >
              <span className="text-white cursor-pointer hover:text-web-primary transition-colors duration-300">
                {locale === "ar" ? t("language.english") : t("language.arabic")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg relative">
        <div className="container mx-auto relative">
          {/* Solutions Dropdown */}
          <div
            onMouseEnter={() => {
              if (solutionsCloseTimeoutRef.current) {
                clearTimeout(solutionsCloseTimeoutRef.current);
                solutionsCloseTimeoutRef.current = null;
              }
              setIsSolutionsHovered(true);
            }}
            onMouseLeave={() => {
              setIsSolutionsHovered(false);
              if (hoverServiceTimeoutRef.current) {
                clearTimeout(hoverServiceTimeoutRef.current);
                hoverServiceTimeoutRef.current = null;
              }
              setHoveredServiceSlug(null);
              setHoveredServiceDetails(null);
              setIsLoadingSubservices(false);
            }}
            className={`absolute top-full w-full bg-white shadow-lg transition-all duration-300 flex items-stretch gap-4 ${
              isSolutionsHovered
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-2"
            }`}
          >
            <div
              className="relative flex flex-col gap-4 items-center justify-center p-8 max-w-80 text-wrap"
              style={{
                backgroundImage: "url('/bg.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/65"></div>

              {/* Content */}
              <div className="relative z-10 space-y-4 en:text-left ar:text-right">
                <h1 className="font-bold text-2xl text-white">
                  {t("solutions.title")}
                </h1>
                <p className="text-white">{t("solutions.description")}</p>
                <button
                  onClick={() => router.push(`/solutions`)}
                  className="text-white border border-white rounded-full w-36 cursor-pointer px-4 py-2 hover:text-black hover:bg-white transition-all duration-300"
                >
                  {t("solutions.learnMore")}
                </button>
              </div>
            </div>

            <div className="flex-1 flex gap-4 px-4 h-[380px] min-w-0">
              {/* Solutions section - left (smaller when images hidden) */}
              <div
                className={`flex flex-col gap-2 border-r border-gray-200 pr-4 min-w-[220px] transition-all duration-300 ${
                  hoveredServiceSlug ? "flex-initial" : "flex-[2]"
                }`}
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-web-primary border-b-2 border-web-primary pt-4 pb-2 mb-3 w-fit">
                  {t("navigation.solutions")}
                </h3>
                {services.map((service) => (
                  <div
                    key={service._id}
                    onMouseEnter={() => {
                      if (hoverServiceTimeoutRef.current) {
                        clearTimeout(hoverServiceTimeoutRef.current);
                        hoverServiceTimeoutRef.current = null;
                      }
                      setHoveredServiceSlug(service.slug);
                      fetchServiceDetails(service.slug);
                    }}
                    onMouseLeave={() => {
                      hoverServiceTimeoutRef.current = setTimeout(() => {
                        setHoveredServiceSlug(null);
                        setHoveredServiceDetails(null);
                        setIsLoadingSubservices(false);
                        hoverServiceTimeoutRef.current = null;
                      }, 150);
                    }}
                  >
                    <Link
                      href={`/${locale}/solutions/${service.slug}`}
                      className={`flex items-center justify-between border-b border-gray-300 py-2 transition-all duration-300 cursor-pointer group ${
                        hoveredServiceSlug === service.slug
                          ? "text-web-primary"
                          : "hover:text-web-primary"
                      }`}
                    >
                      <p
                        className={`text-base font-medium transition-colors duration-200 min-w-0 flex-1 truncate ${
                          hoveredServiceSlug === service.slug
                            ? "text-web-primary"
                            : "text-gray-700 group-hover:text-web-primary"
                        }`}
                      >
                        {service.title[
                          locale as keyof typeof service.title
                        ] || service.title.en}
                      </p>
                      <div
                        className={`overflow-hidden rounded-md flex-shrink-0 transition-all duration-300 ease-out ${
                          hoveredServiceSlug ? "w-0 h-14 opacity-0" : "w-40 h-14 opacity-100"
                        }`}
                      >
                        <NextImage
                          src={
                            getImageUrl(service.image) || "/1.jpg"
                          }
                          alt={
                            service.title[
                              locale as keyof typeof service.title
                            ] || service.title.en
                          }
                          width={160}
                          height={50}
                          className="object-cover w-full h-full group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Academy or Subservices section - right */}
              {hoveredServiceSlug ? (
                <div
                  className="flex-1 flex flex-col min-w-[200px] h-full animate-slideInFromRight"
                  onMouseEnter={() => {
                    if (hoverServiceTimeoutRef.current) {
                      clearTimeout(hoverServiceTimeoutRef.current);
                      hoverServiceTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={() => {
                    hoverServiceTimeoutRef.current = setTimeout(() => {
                      setHoveredServiceSlug(null);
                      setHoveredServiceDetails(null);
                      setIsLoadingSubservices(false);
                      hoverServiceTimeoutRef.current = null;
                    }, 150);
                  }}
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider text-web-primary border-b-2 border-web-primary pt-4 pb-2 mb-3 w-fit">
                    {(() => {
                      const hoveredService = services.find(
                        (s) => s.slug === hoveredServiceSlug
                      );
                      return (
                        hoveredService?.title?.[
                          locale as keyof typeof hoveredService.title
                        ] ||
                        hoveredService?.title?.en ||
                        hoveredServiceDetails?.title?.[
                          locale as keyof typeof hoveredServiceDetails.title
                        ] ||
                        hoveredServiceDetails?.title?.en ||
                        t("solutions.subservices")
                      );
                    })()}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {isLoadingSubservices ? (
                      <p className="text-gray-500 text-sm py-2 animate-fadeInUp">
                        {t("solutions.loading")}
                      </p>
                    ) : hoveredServiceDetails?.subServices?.length ? (
                      hoveredServiceDetails.subServices.map((sub, index) => (
                        <Link
                          key={sub._id}
                          href={`/${locale}/solutions/${hoveredServiceDetails.slug}/${sub.slug}`}
                          className="border-b border-gray-300 py-2 text-base font-medium text-gray-700 hover:text-web-primary transition-all duration-300 cursor-pointer animate-fadeInStagger"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {sub.title[
                            locale as keyof typeof sub.title
                          ] || sub.title.en}
                        </Link>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm py-2">
                        {t("solutions.noSubservices")}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col min-w-[200px] h-full animate-fadeInUp">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-web-primary border-b-2 border-web-primary pt-4 pb-2 mb-3 w-fit">
                    {t("navigation.academy")}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {academyCategories && academyCategories.length > 0 ? (
                      academyCategories.map((category) => (
                        <Link
                          key={category._id}
                          href={`/${locale}/academy-categories/${category._id}`}
                          className="flex items-center justify-between border-b border-gray-300 py-2 hover:text-web-primary transition-all duration-300 cursor-pointer group"
                        >
                          <p className="text-base font-medium text-gray-700 group-hover:text-web-primary">
                            {category.title[
                              locale as keyof typeof category.title
                            ] || category.title.en}
                          </p>
                          {category.courses?.[0]?.image && (
                            <div className="w-40 h-14 overflow-hidden rounded-md flex-shrink-0">
                              <NextImage
                                src={
                                  getImageUrl(category.courses[0].image) ||
                                  "/1.jpg"
                                }
                                alt={
                                  category.title[
                                    locale as keyof typeof category.title
                                  ] || category.title.en
                                }
                                width={160}
                                height={50}
                                className="object-cover w-full h-full group-hover:scale-110 transition-all duration-300"
                              />
                            </div>
                          )}
                        </Link>
                      ))
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-gray-500 text-sm">
                          {t("academy.noCategoriesFound")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center py-3 md:py-0">
            <div
              className="px-4 cursor-pointer"
              onClick={() => router.push(`/`)}
            >
              <NextImage
                src="/logo.png"
                alt={t("altText.logo")}
                width={50}
                height={50}
              />
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {/* Industries - placeholder route (commented out for now) */}
              {/* <Link
                href={`/${locale}/industries`}
                className="py-7 relative group cursor-pointer"
              >
                <div
                  className={`group-hover:text-web-primary font-medium h-full ${
                    currentPage === "industries" ? "text-web-primary" : ""
                  }`}
                >
                  {t("navigation.industries")}
                </div>
                <div
                  className={`h-1 bg-web-primary absolute bottom-0 w-0 group-hover:w-full transition-all duration-300 ${
                    currentPage === "industries" ? "w-full" : ""
                  }`}
                ></div>
              </Link> */}
              <div
                className="relative group"
                onMouseEnter={() => {
                  if (solutionsCloseTimeoutRef.current) {
                    clearTimeout(solutionsCloseTimeoutRef.current);
                    solutionsCloseTimeoutRef.current = null;
                  }
                  setIsSolutionsHovered(true);
                }}
                onMouseLeave={() => {
                  solutionsCloseTimeoutRef.current = setTimeout(() => {
                    setIsSolutionsHovered(false);
                    solutionsCloseTimeoutRef.current = null;
                  }, 150);
                }}
              >
                <Link
                  href={`/${locale}/solutions`}
                  className="py-7 relative cursor-pointer block"
                >
                  <div
                    className={`group-hover:text-web-primary font-medium h-full flex items-center gap-2 ${
                      currentPage === "solutions" || isSolutionsHovered
                        ? "text-web-primary"
                        : ""
                    }`}
                  >
                    {t("navigation.solutions")}
                    {isSolutionsHovered ? (
                      <ChevronUp size={12} />
                    ) : (
                      <ChevronDown size={12} />
                    )}
                  </div>
                  <div
                    className={`h-1 bg-web-primary absolute bottom-0 w-0 group-hover:w-full transition-all duration-300 ${
                      currentPage === "solutions" || isSolutionsHovered
                        ? "w-full"
                        : ""
                    }`}
                  ></div>
                </Link>
              </div>
              <Link
                href={`/${locale}/success-stories`}
                className="py-7 relative group cursor-pointer"
              >
                <div
                  className={`group-hover:text-web-primary font-medium h-full ${
                    currentPage === "success-stories" ? "text-web-primary" : ""
                  }`}
                >
                  {t("navigation.successStories")}
                </div>
                <div
                  className={`h-1 bg-web-primary absolute bottom-0 w-0 group-hover:w-full transition-all duration-300 ${
                    currentPage === "success-stories" ? "w-full" : ""
                  }`}
                ></div>
              </Link>
              <Link
                href={`/${locale}/insights-and-publications`}
                className="py-7 relative group cursor-pointer"
              >
                <div
                  className={`group-hover:text-web-primary font-medium h-full ${
                    currentPage === "insights-and-publications"
                      ? "text-web-primary"
                      : ""
                  }`}
                >
                  {t("navigation.insights")}
                </div>
                <div
                  className={`h-1 bg-web-primary absolute bottom-0 w-0 group-hover:w-full transition-all duration-300 ${
                    currentPage === "insights-and-publications" ? "w-full" : ""
                  }`}
                ></div>
              </Link>
              <Link
                href={`/${locale}/careers`}
                className="py-7 relative group cursor-pointer"
              >
                <div
                  className={`group-hover:text-web-primary font-medium h-full ${
                    currentPage === "careers" ? "text-web-primary" : ""
                  }`}
                >
                  {t("navigation.careers")}
                </div>
                <div
                  className={`h-1 bg-web-primary absolute bottom-0 w-0 group-hover:w-full transition-all duration-300 ${
                    currentPage === "careers" ? "w-full" : ""
                  }`}
                ></div>
              </Link>
              <div
                className="relative group"
                onMouseEnter={() => setIsAboutHovered(true)}
                onMouseLeave={() => setIsAboutHovered(false)}
              >
                <Link
                  href={`/${locale}/about`}
                  className="py-7 relative cursor-pointer block"
                >
                  <div
                    className={`group-hover:text-web-primary font-medium h-full flex items-center gap-2 ${
                      currentPage === "about" ||
                      currentPage === "our-talents" ||
                      currentPage === "faq" ||
                      currentPage === "testimonials"
                        ? "text-web-primary"
                        : ""
                    }`}
                  >
                    {t("navigation.about")}
                    {isAboutHovered ? (
                      <ChevronUp size={12} />
                    ) : (
                      <ChevronDown size={12} />
                    )}
                  </div>
                  <div
                    className={`h-1 bg-web-primary absolute bottom-0 w-0 group-hover:w-full transition-all duration-300 ${
                      currentPage === "about" ||
                      currentPage === "our-talents" ||
                      currentPage === "faq" ||
                      currentPage === "testimonials"
                        ? "w-full"
                        : ""
                    }`}
                  ></div>
                </Link>

                {/* Submenu Dropdown */}
                <div
                  className={`absolute top-full left-0 bg-white shadow-lg min-w-[200px] transition-all duration-300 ${
                    isAboutHovered
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <Link
                    href={`/${locale}/about`}
                    className={`block px-4 py-3 text-sm hover:bg-web-primary hover:text-white transition-colors ${
                      currentPage === "about"
                        ? "bg-web-primary text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {t("navigation.about")}
                  </Link>
                  <Link
                    href={`/${locale}/our-talents`}
                    className={`block px-4 py-3 text-sm hover:bg-web-primary hover:text-white transition-colors ${
                      currentPage === "our-talents"
                        ? "bg-web-primary text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {t("navigation.ourTalents")}
                  </Link>
                  <Link
                    href={`/${locale}/faq`}
                    className={`block px-4 py-3 text-sm hover:bg-web-primary hover:text-white transition-colors ${
                      currentPage === "faq"
                        ? "bg-web-primary text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {t("navigation.faq")}
                  </Link>
                  <Link
                    href={`/${locale}/testimonials`}
                    className={`block px-4 py-3 text-sm hover:bg-web-primary hover:text-white transition-colors ${
                      currentPage === "testimonials"
                        ? "bg-web-primary text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {t("navigation.testimonials")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <button
                onClick={() => router.push(`/book-consultation`)}
                className="bg-web-primary text-white px-6 py-7 font-medium hover:bg-web-primary/80 transition-colors cursor-pointer"
              >
                {t("cta.button")}
              </button>
            </div>

            <button
              className="lg:hidden text-gray-700 px-4 cursor-pointer hover:text-web-primary transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 py-4 border-t border-gray-200 flex flex-col justify-between gap-8 h-[calc(100vh-80px)] overflow-y-auto">
              <div className="flex flex-col gap-2">
                <p className="text-web-primary font-bold border-b border-gray-300 pb-2 px-3">
                  {t("mobile.menu")}
                </p>
                <Link
                  href={`/${locale}/`}
                  className={`py-3 px-3 transition-colors font-medium flex items-center gap-2 ${
                    currentPage === ""
                      ? "text-white bg-web-primary"
                      : "text-gray-700 hover:bg-web-primary hover:text-white"
                  }`}
                >
                  <House />
                  <p>{t("mobile.home")}</p>
                </Link>
                {/* Industries - commented out for now */}
                {/* <Link
                  href={`/${locale}/industries`}
                  className={`py-3 px-3 transition-colors font-medium flex items-center gap-2 ${
                    currentPage === "industries"
                      ? "text-white bg-web-primary"
                      : "text-gray-700 hover:bg-web-primary hover:text-white"
                  }`}
                >
                  <span className="text-lg">🏭</span>
                  {t("navigation.industries")}
                </Link> */}
                <Link
                  href={`/${locale}/solutions`}
                  className={`py-3 px-3 transition-colors font-medium flex items-center gap-2 ${
                    currentPage === "solutions"
                      ? "text-white bg-web-primary"
                      : "text-gray-700 hover:bg-web-primary hover:text-white"
                  }`}
                >
                  <Handshake />
                  {t("mobile.solutions")}
                </Link>
                <Link
                  href={`/${locale}/success-stories`}
                  className={`py-3 px-3 transition-colors font-medium flex items-center gap-2 ${
                    currentPage === "success-stories"
                      ? "text-white bg-web-primary"
                      : "text-gray-700 hover:bg-web-primary hover:text-white"
                  }`}
                >
                  <Folder />
                  {t("mobile.successStories")}
                </Link>
                <Link
                  href={`/${locale}/insights-and-publications`}
                  className={`py-3 px-3 transition-colors font-medium flex items-center gap-2 ${
                    currentPage === "insights-and-publications"
                      ? "text-white bg-web-primary"
                      : "text-gray-700 hover:bg-web-primary hover:text-white"
                  }`}
                >
                  <Newspaper />
                  {t("mobile.insights")}
                </Link>
                <Link
                  href={`/${locale}/careers`}
                  className={`py-3 px-3 transition-colors font-medium flex items-center gap-2 ${
                    currentPage === "careers"
                      ? "text-white bg-web-primary"
                      : "text-gray-700 hover:bg-web-primary hover:text-white"
                  }`}
                >
                  <Briefcase />
                  {t("mobile.careers")}
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className={`py-3 px-3 transition-colors font-medium flex items-center gap-2 ${
                    currentPage === "about"
                      ? "text-white bg-web-primary"
                      : "text-gray-700 hover:bg-web-primary hover:text-white"
                  }`}
                >
                  <Users />
                  {t("mobile.about")}
                </Link>
              </div>
              <div className="flex flex-col gap-4 px-3">
                <p className="text-web-primary font-bold border-b border-gray-300 pb-2">
                  {t("mobile.contactInfo")}
                </p>
                <a
                  href="#"
                  className="py-3 px-3 text-gray-700 hover:text-web-primary transition-colors font-medium flex items-center gap-2"
                >
                  <Phone />
                  <p>+961 79322736</p>
                </a>
                <a
                  href="#"
                  className="py-3 px-3 text-gray-700 hover:text-web-primary transition-colors font-medium flex items-center gap-2"
                >
                  <Mail />
                  <p>strategizers@gmail.com</p>
                </a>
              </div>
              <div className="flex flex-col gap-4 px-3">
                <p className="text-web-primary font-bold border-b border-gray-300 pb-2">
                  {t("mobile.language")}
                </p>
                <div
                  className="bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-3 cursor-pointer hover:border-web-primary transition-colors"
                  onClick={toggleLanguage}
                >
                  {locale === "ar"
                    ? t("language.english")
                    : t("language.arabic")}
                </div>
              </div>
              <div className="flex flex-col gap-4 px-3">
                <p className="text-web-primary font-bold border-b border-gray-300 pb-2">
                  {t("mobile.consultation.title")}
                </p>
                <p>{t("mobile.consultation.description")}</p>
                <button
                  onClick={() => router.push(`/book-consultation`)}
                  className="bg-web-primary text-white px-6 py-2 rounded font-medium hover:bg-web-primary/80 transition-colors w-full"
                >
                  {t("mobile.consultation.button")}
                </button>
                <div className="flex items-center space-x-4 w-full justify-center mt-2">
                  <div className="flex items-center space-x-3">
                    {settings?.social?.facebook && (
                      <Link
                        href={
                          formatSocialUrl(
                            settings.social.facebook,
                            "facebook"
                          ) || "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-web-primary transition-colors duration-300"
                      >
                        <Facebook size={26} />
                      </Link>
                    )}
                    {settings?.social?.twitter && (
                      <Link
                        href={
                          formatSocialUrl(settings.social.twitter, "twitter") ||
                          "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-web-primary transition-colors duration-300"
                      >
                        <Twitter size={26} />
                      </Link>
                    )}
                    {settings?.social?.linkedin && (
                      <Link
                        href={
                          formatSocialUrl(
                            settings.social.linkedin,
                            "linkedin"
                          ) || "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-web-primary transition-colors duration-300"
                      >
                        <Linkedin size={26} />
                      </Link>
                    )}
                    {settings?.social?.instagram && (
                      <Link
                        href={
                          formatSocialUrl(
                            settings.social.instagram,
                            "instagram"
                          ) || "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-web-primary transition-colors duration-300"
                      >
                        <Instagram size={26} />
                      </Link>
                    )}
                    {settings?.social?.youtube && (
                      <Link
                        href={
                          formatSocialUrl(settings.social.youtube, "youtube") ||
                          "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-web-primary transition-colors duration-300"
                      >
                        <Youtube size={26} />
                      </Link>
                    )}
                    {settings?.social?.tiktok && (
                      <Link
                        href={
                          formatSocialUrl(settings.social.tiktok, "tiktok") ||
                          "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-web-primary transition-colors duration-300"
                      >
                        <TikTokIcon size={26} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
