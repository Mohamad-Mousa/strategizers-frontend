"use client";

import { Loader2, AlertCircle, Mail, Phone, Linkedin } from "lucide-react";
import NextImage from "next/image";
import { useState, useEffect, useCallback } from "react";
import { apiGet } from "@/lib/api";
import { SingleBlogResponse, Blog } from "@/types/blog";
import { getImageUrl } from "@/lib/image";
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
          getImageUrl(blog.image) || "/1.jpg"
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
        <p>
          {blog.tags
            .map((tag) => tag[locale as keyof typeof tag] || tag.en)
            .join(", ")}
        </p>
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
          <p className="text-web-primary">
            {blog.tags
              .map((tag) => tag[locale as keyof typeof tag] || tag.en)
              .join(", ")}
          </p>
        </div>
      </div>

      {/* Contacts Section */}
      {blog.contacts && blog.contacts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t("contacts.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blog.contacts.map((contact) => (
              <div
                key={contact._id}
                className="flex flex-col gap-3 p-6 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <NextImage
                    src={getImageUrl(contact.image) || "/1.jpg"}
                    alt={
                      contact.name[locale as keyof typeof contact.name] ||
                      contact.name.en
                    }
                    width={80}
                    height={80}
                    className="rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-bold text-lg text-gray-900">
                      {contact.name[locale as keyof typeof contact.name] ||
                        contact.name.en}
                    </p>
                    <p className="text-web-primary font-medium text-sm">
                      {contact.position[locale as keyof typeof contact.position] ||
                        contact.position.en}
                    </p>
                  </div>
                </div>
                {contact.description && (
                  <p
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html:
                        contact.description[
                          locale as keyof typeof contact.description
                        ] || contact.description.en,
                    }}
                  />
                )}
                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href={`tel:+${contact.phone.code}${contact.phone.number}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-web-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+{contact.phone.code} {contact.phone.number}</span>
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-web-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm truncate">{contact.email}</span>
                  </a>
                  {contact.social?.linkedin && (
                    <a
                      href={contact.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 hover:text-web-primary transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-sm">{t("contacts.linkedin")}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
