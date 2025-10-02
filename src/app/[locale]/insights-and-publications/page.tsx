"use client";

import Hero from "@/components/layout/Hero";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import { useState, useEffect, useCallback } from "react";
import { apiGet } from "@/lib/api";
import { BlogsResponse, Blog } from "@/types/blog";
import { Loader2, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useWebsite } from "@/hooks/useWebsite";

const InsightsAndPublications = () => {
  const t = useTranslations("insightsAndPublications");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { website } = useWebsite();

  const limit = 6;

  const fetchBlogs = useCallback(
    async (page: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const response: BlogsResponse = await apiGet(
          `/public/blog?page=${page}&limit=${limit}`
        );

        if (!response.error) {
          setBlogs(response.results.data);
          // Calculate total pages based on totalCount and limit
          const calculatedTotalPages = Math.ceil(
            response.results.totalCount / limit
          );
          setTotalPages(calculatedTotalPages);
          setCurrentPage(page);
        } else {
          setError(response.message || t("errors.fetchFailed"));
        }
      } catch (err) {
        setError(t("errors.fetchError"));
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage, fetchBlogs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col">
      <Hero
        title={t("hero.title")}
        background={
          `https://api-strat.othmanconstruction.com/${website?.blogPage?.banner}` ||
          "/services.webp"
        }
      />
      <section className="max-w-7xl mx-auto mt-20 px-6">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-web-primary" />
              <span className="text-gray-600">{t("loading")}</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Blogs Grid */}
        {!isLoading && !error && blogs.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-12"
              showInfo={true}
              totalItems={blogs.length}
              itemsPerPage={limit}
            />
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && blogs.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-gray-600 text-lg">{t("empty.title")}</p>
              <p className="text-gray-400 text-sm mt-2">
                {t("empty.description")}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default InsightsAndPublications;
