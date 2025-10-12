"use client";

import { Loader2, AlertCircle } from "lucide-react";
import NextImage from "next/image";
import { useState, useEffect, useCallback } from "react";
import { apiGet } from "@/lib/api";
import { SingleBlogResponse, Blog } from "@/types/blog";
import { useLocale, useTranslations } from "next-intl";

interface BlogContentProps {
  slug: string;
}

export default function BlogContent({ slug }: BlogContentProps) {
  const locale = useLocale();
  const t = useTranslations("singleBlog");

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlog = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response: SingleBlogResponse = await apiGet(`/public/blog/${slug}`);

      if (!response.error) {
        setBlog(response.results.blog);
      } else {
        setError(response.message || t("errors.fetchFailed"));
      }
    } catch (err) {
      setError(t("errors.fetchError"));
      console.error("Error fetching blog:", err);
    } finally {
      setIsLoading(false);
    }
  }, [slug, t]);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug, fetchBlog]);

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

  // Blog not found
  if (!blog) {
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

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Sep 21, 2025";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="max-w-7xl mx-auto mt-20 px-6 flex flex-col gap-3">
      <NextImage
        src={
          blog.image
            ? `https://api-strat.othmanconstruction.com/${blog.image}`
            : "/1.jpg"
        }
        alt={blog.title[locale as keyof typeof blog.title] || blog.title.en}
        width={1920}
        height={1080}
        className="w-full rounded-lg"
      />
      <p className="text-web-primary font-bold text-2xl">
        {blog.subTitle[locale as keyof typeof blog.subTitle] ||
          blog.subTitle.en}
      </p>
      <p className="text-xl font-bold">
        {blog.title[locale as keyof typeof blog.title] || blog.title.en}
      </p>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <p className="border-r border-gray-300 pr-2">
          {t("by")} {blog.author}
        </p>
        <p className="border-r border-gray-300 pr-2">
          {formatDate(blog.updatedAt)}
        </p>
        <p>{blog.tags.join(", ")}</p>
      </div>
      <div
        className="text-gray-500 prose max-w-none"
        dangerouslySetInnerHTML={{
          __html:
            blog.description[locale as keyof typeof blog.description] ||
            blog.description.en,
        }}
      />
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <p className="font-bold">{t("tags")}:</p>
          <p className="text-web-primary">{blog.tags.join(", ")}</p>
        </div>
      </div>
    </section>
  );
}
