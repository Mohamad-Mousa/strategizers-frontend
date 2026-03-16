"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useSettings } from "@/hooks/useSettings";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import TikTokIcon from "@/components/TikTokIcon";
import { useState, useEffect, useCallback } from "react";
import { apiPost, apiGet } from "@/lib/api";
import { getImageUrl } from "@/lib/image";
import { ServicesResponse, Service } from "@/types/service";
import { BlogsResponse, Blog } from "@/types/blog";
import {
  AcademyCategoryResponse,
  AcademyCategory,
} from "@/types/academy";
import { useLocale, useTranslations } from "next-intl";

interface NewsletterResponse {
  message: string;
  error: boolean;
  code: number;
}

const LinkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-link-icon lucide-link"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
};

const Footer = () => {
  const { settings } = useSettings();
  const locale = useLocale();
  const t = useTranslations("footer");

  // Services state
  const [services, setServices] = useState<Service[]>([]);

  // Academy categories state
  const [academyCategories, setAcademyCategories] = useState<
    AcademyCategory[]
  >([]);

  // Blogs state
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Newsletter subscription state
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  // Newsletter subscription handler
  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setSubscriptionStatus("error");
      setSubscriptionMessage(t("newsletter.errors.invalidEmail"));
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus("idle");

    try {
      const response: NewsletterResponse = await apiPost(
        "/public/newsletter/subscribe",
        {
          email: email.trim(),
        }
      );

      if (!response.error) {
        setSubscriptionStatus("success");
        setSubscriptionMessage(response.message || t("newsletter.success"));
        setEmail(""); // Clear the form
      } else {
        setSubscriptionStatus("error");
        setSubscriptionMessage(
          response.message || t("newsletter.errors.failed")
        );
      }
    } catch (error) {
      setSubscriptionStatus("error");
      setSubscriptionMessage(t("newsletter.errors.generic"));
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  // Fetch services function
  const fetchServices = useCallback(async () => {
    try {
      const response: ServicesResponse = await apiGet(
        `/public/service?page=1&limit=100`
      );

      if (!response.error) {
        setServices(response.results.data);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  }, []);

  // Fetch blogs function
  const fetchBlogs = useCallback(async () => {
    try {
      const response: BlogsResponse = await apiGet(
        `/public/blog?page=1&limit=2`
      );

      if (!response.error) {
        setBlogs(response.results.data);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
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

  // Fetch services, academy categories, and blogs on component mount
  useEffect(() => {
    fetchServices();
    fetchAcademyCategories();
    fetchBlogs();
  }, [fetchServices, fetchAcademyCategories, fetchBlogs]);

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

  // About us and related pages
  const aboutLinks = [
    { href: `/${locale}/about`, label: t("links.about") },
    { href: `/${locale}/our-talents`, label: t("links.ourTalents") },
    { href: `/${locale}/faq`, label: t("links.faq") },
    { href: `/${locale}/testimonials`, label: t("links.testimonials") },
  ];

  // Website pages for Useful Links (excluding About us related)
  const usefulLinks = [
    { href: `/${locale}`, label: t("links.home") },
    { href: `/${locale}/solutions`, label: t("links.solutions") },
    { href: `/${locale}/careers`, label: t("links.careers") },
    { href: `/${locale}/insights-and-publications`, label: t("links.insights") },
    { href: `/${locale}/success-stories`, label: t("links.successStories") },
    { href: `/${locale}/contact`, label: t("links.contact") },
    { href: `/${locale}/industries`, label: t("links.industries") },
    { href: `/${locale}/book-consultation`, label: t("links.bookConsultation") },
    { href: `/${locale}/privacy-policy`, label: t("links.privacyPolicy") },
    { href: `/${locale}/terms-and-conditions`, label: t("links.termsAndConditions") },
  ];

  return (
    <footer className="bg-web-gray text-white mt-10">
      <div className="py-28 px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-16">
      {/* Company Info */}
      <div className="flex flex-col gap-6 lg:col-span-2">
        <NextImage
          src="/logo.png"
          alt={t("altText.logo")}
          width={100}
          height={100}
        />
        <p className="text-[#848484] text-base leading-relaxed">{t("company.description")}</p>
      </div>

      {/* Useful Links - Website Pages */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-2xl text-white">{t("links.title")}</p>
          <div className="bg-web-primary w-[70px] h-[1px]"></div>
        </div>
        <ul className="flex flex-col gap-3">
          {usefulLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[#848484] hover:text-web-primary transition-all duration-300 cursor-pointer text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* About us */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-2xl text-white">{t("about.title")}</p>
          <div className="bg-web-primary w-[70px] h-[1px]"></div>
        </div>
        <ul className="flex flex-col gap-3">
          {aboutLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[#848484] hover:text-web-primary transition-all duration-300 cursor-pointer text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Solutions */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-2xl text-white">{t("solutions.title")}</p>
          <div className="bg-web-primary w-[70px] h-[1px]"></div>
        </div>
        <ul className="flex flex-col gap-3">
          {services.map((service) => (
            <li key={service._id}>
              <Link
                href={`/${locale}/solutions/${service.slug}`}
                className="text-[#848484] hover:text-web-primary transition-all duration-300 cursor-pointer text-sm"
              >
                {service.title[locale as keyof typeof service.title] ||
                  service.title.en}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Academy */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-2xl text-white">{t("academy.title")}</p>
          <div className="bg-web-primary w-[70px] h-[1px]"></div>
        </div>
        <ul className="flex flex-col gap-3">
          {academyCategories.map((category) => (
            <li key={category._id}>
              <Link
                href={`/${locale}/academy-categories/${category._id}`}
                className="text-[#848484] hover:text-web-primary transition-all duration-300 cursor-pointer text-sm"
              >
                {category.title[locale as keyof typeof category.title] ||
                  category.title.en}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Latest News */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-2xl text-white">{t("news.title")}</p>
          <div className="bg-web-primary w-[70px] h-[1px]"></div>
        </div>
        <div className="flex flex-col gap-4">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              href={`/${locale}/insights-and-publications/${blog.slug}`}
              className="border-b border-[#333] pb-3"
            >
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <NextImage
                    src={
                      getImageUrl(blog.image) || "/1.jpg"
                    }
                    alt={
                      blog.title[locale as keyof typeof blog.title] ||
                      blog.title.en
                    }
                    width={120}
                    height={120}
                    className="rounded-lg object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-web-primary/80 opacity-0 group-hover:opacity-100 group-hover:animate-[fade-in-up_0.3s_ease-out_both] rounded-lg" />
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="flex h-8 w-8 items-center justify-center">
                      <LinkIcon />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-1 group-hover:text-web-primary transition-colors duration-300 cursor-pointer">
                    {blog.title[locale as keyof typeof blog.title] ||
                      blog.title.en}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>

      {/* Newsletter & Social - below Solutions, Academy, Latest News */}
      <div className="px-12 pb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-t border-[#333] pt-12">
        <div className="flex flex-col gap-4 max-w-md">
          <div className="flex flex-col gap-2">
            <p className="text-2xl text-white">{t("newsletter.title")}</p>
            <div className="bg-web-primary w-[70px] h-[1px]"></div>
          </div>
          <p className="text-[#848484] text-base">
            {t("newsletter.description")}
          </p>
          <form onSubmit={handleNewsletterSubscription} className="space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-[#848484]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter.placeholder")}
                className="w-full pl-10 pr-12 py-3 bg-white border border-[#555] rounded-lg text-black placeholder-[#848484] focus:outline-none focus:border-web-primary transition-colors duration-300"
                disabled={isSubscribing}
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
              >
                {isSubscribing ? (
                  <Loader2 className="w-5 h-5 text-web-primary animate-spin" />
                ) : (
                  <svg
                    className="w-5 h-5 text-web-primary cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
            {subscriptionStatus === "success" && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>{subscriptionMessage}</span>
              </div>
            )}
            {subscriptionStatus === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{subscriptionMessage}</span>
              </div>
            )}
          </form>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-2xl text-white">{t("social.title")}</p>
            <div className="bg-web-primary w-[70px] h-[1px]"></div>
          </div>
          <div className="flex items-center gap-4">
            {settings?.social?.facebook && (
              <Link
                href={
                  formatSocialUrl(settings.social.facebook, "facebook") || "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#848484] hover:text-web-primary transition-colors duration-300 border rounded-full p-2"
              >
                <Facebook size={16} />
              </Link>
            )}
            {settings?.social?.twitter && (
              <Link
                href={formatSocialUrl(settings.social.twitter, "twitter") || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#848484] hover:text-web-primary transition-colors duration-300 border rounded-full p-2"
              >
                <Twitter size={16} />
              </Link>
            )}
            {settings?.social?.linkedin && (
              <Link
                href={
                  formatSocialUrl(settings.social.linkedin, "linkedin") || "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#848484] hover:text-web-primary transition-colors duration-300 border rounded-full p-2"
              >
                <Linkedin size={16} />
              </Link>
            )}
            {settings?.social?.instagram && (
              <Link
                href={
                  formatSocialUrl(settings.social.instagram, "instagram") || "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#848484] hover:text-web-primary transition-colors duration-300 border rounded-full p-2"
              >
                <Instagram size={16} />
              </Link>
            )}
            {settings?.social?.youtube && (
              <Link
                href={formatSocialUrl(settings.social.youtube, "youtube") || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#848484] hover:text-web-primary transition-colors duration-300 border rounded-full p-2"
              >
                <Youtube size={16} />
              </Link>
            )}
            {settings?.social?.tiktok && (
              <Link
                href={formatSocialUrl(settings.social.tiktok, "tiktok") || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#848484] hover:text-web-primary transition-colors duration-300 border rounded-full p-2"
              >
                <TikTokIcon size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-[#333] py-6 px-12">
        <p className="text-[#848484] text-sm text-center">
          {t("allRightsReserved", {
            year: new Date().getFullYear(),
          })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
