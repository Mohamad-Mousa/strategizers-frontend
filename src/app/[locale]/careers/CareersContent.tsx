"use client";

import { useState, useEffect, useCallback } from "react";
import JobCard from "@/components/JobCard";
import { apiGet } from "@/lib/api";
import { JobsData, Job } from "@/types/job";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import Pagination from "@/components/Pagination";
import { useTranslations } from "next-intl";

export default function CareersContent() {
  const t = useTranslations("careers");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 6;

  const fetchJobs = useCallback(
    async (page: number = 1) => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiGet<JobsData>(
          `/public/job?page=${page}&limit=${limit}`
        );

        if (response.error) {
          throw new Error(response.message || t("errors.fetchFailed"));
        }

        setJobs(response.results.data);
        setTotalPages(Math.ceil(response.results.totalCount / limit));
        setCurrentPage(page);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err instanceof Error ? err.message : t("errors.fetchError"));
      } finally {
        setLoading(false);
      }
    },
    [limit, t]
  );

  useEffect(() => {
    fetchJobs(1);
  }, [fetchJobs]);

  const handlePageChange = (page: number) => {
    fetchJobs(page);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Loading state
  if (loading && jobs.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-web-primary" />
              <span className="text-gray-600">{t("loading")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("errors.loadFailed")}
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => fetchJobs(currentPage)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-web-primary text-white rounded-lg hover:bg-web-primary/90 transition-colors duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                {t("errors.retry")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Job Listings */}
      <div className="bg-white">
        {jobs.length > 0 ? (
          <>
            <div className="space-y-4 p-6">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  slug={job.slug}
                  title={job.title}
                  department={job.type}
                  postedDate={formatDate(job.createdAt)}
                  jobId={job._id}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 pb-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t("empty.title")}</p>
            <p className="text-gray-400 text-sm mt-2">
              {t("empty.description")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
