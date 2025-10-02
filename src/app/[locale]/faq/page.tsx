"use client";

import Hero from "@/components/layout/Hero";
import Accordion from "@/components/Accordion";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import { apiGet } from "@/lib/api";
import { FAQsResponse, FAQ } from "@/types/faq";
import { Loader2, AlertCircle } from "lucide-react";
import { useWebsite } from "@/hooks/useWebsite";

const FAQPage = () => {
  const locale = useLocale();
  const t = useTranslations("faq");

  const { website } = useWebsite();

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = 6;

  const fetchFAQs = useCallback(
    async (page: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const response: FAQsResponse = await apiGet(
          `/public/faq?page=${page}&limit=${limit}`
        );

        if (!response.error) {
          setFaqs(response.results.data);
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
        console.error("Error fetching FAQs:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [limit, t]
  );

  useEffect(() => {
    fetchFAQs(currentPage);
  }, [currentPage, fetchFAQs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="-mb-10">
      <Hero
        title={t("hero.title")}
        background={
          `https://api-strat.othmanconstruction.com/${website?.faqPage?.banner}` ||
          "/services.webp"
        }
      />

      {/* FAQ Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t("section.title")}
            </h2>
            <p className="text-gray-600 text-lg">{t("section.description")}</p>
          </div>

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

          {/* FAQs Content */}
          {!isLoading && !error && faqs.length > 0 && (
            <>
              <Accordion faqs={faqs} />

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="mt-12"
                  showInfo={true}
                  totalItems={faqs.length}
                  itemsPerPage={limit}
                />
              )}
            </>
          )}

          {/* Empty State */}
          {!isLoading && !error && faqs.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-gray-600 text-lg">{t("empty.title")}</p>
                <p className="text-gray-400 text-sm mt-2">
                  {t("empty.description")}
                </p>
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {t("contact.title")}
            </h3>
            <p className="text-gray-600 mb-6">{t("contact.description")}</p>
            <Link
              href={`/${locale}/contact`}
              className="bg-web-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-web-primary/90 transition-colors cursor-pointer"
            >
              {t("contact.button")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
