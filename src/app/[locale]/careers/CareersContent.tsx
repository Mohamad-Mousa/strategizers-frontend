"use client";

import { useState, useEffect, useCallback } from "react";
import JobCard from "@/components/JobCard";
import { apiGet } from "@/lib/api";
import { JobsData, Job } from "@/types/job";
import { Loader2, AlertCircle, RefreshCw, Search, Filter } from "lucide-react";
import Pagination from "@/components/Pagination";
import { useTranslations } from "next-intl";

const JOB_TYPES = ["full-time", "part-time", "freelance"] as const;
const LIMIT_OPTIONS = [10, 20, 30, 50];

export default function CareersContent() {
  const t = useTranslations("careers");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Filter state
  const [term, setTerm] = useState("");
  const [type, setType] = useState<string>("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [limit, setLimit] = useState(10);

  const buildQueryString = useCallback(
    (
      page: number,
      overrides?: {
        term?: string;
        type?: string;
        location?: string;
        sortBy?: string;
        sortDirection?: string;
        limit?: number;
      }
    ) => {
      const params = new URLSearchParams();
      const limitVal = overrides?.limit ?? limit;
      params.set("page", String(page));
      params.set("limit", String(limitVal));
      const tVal = overrides?.term ?? term;
      const typeVal = overrides?.type ?? type;
      const locVal = overrides?.location ?? location;
      const sortVal = overrides?.sortBy ?? sortBy;
      const dirVal = overrides?.sortDirection ?? sortDirection;
      if (tVal.trim()) params.set("term", tVal.trim());
      if (typeVal) params.set("type", typeVal);
      if (locVal.trim()) params.set("location", locVal.trim());
      if (sortVal) params.set("sortBy", sortVal);
      if (dirVal) params.set("sortDirection", dirVal);
      return params.toString();
    },
    [term, type, location, sortBy, sortDirection, limit]
  );

  const fetchJobs = useCallback(
    async (
      page: number = 1,
      overrides?: {
        term?: string;
        type?: string;
        location?: string;
        sortBy?: string;
        sortDirection?: string;
        limit?: number;
      }
    ) => {
      try {
        setLoading(true);
        setError(null);

        const limitVal = overrides?.limit ?? limit;
        const queryString = buildQueryString(page, { ...overrides, limit: limitVal });
        const response = await apiGet<JobsData>(
          `/public/job?${queryString}`
        );

        if (response.error) {
          throw new Error(response.message || t("errors.fetchFailed"));
        }

        setJobs(response.results.data);
        setTotalCount(response.results.totalCount);
        setTotalPages(Math.ceil(response.results.totalCount / limitVal));
        setCurrentPage(page);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err instanceof Error ? err.message : t("errors.fetchError"));
      } finally {
        setLoading(false);
      }
    },
    [buildQueryString, limit, t]
  );

  useEffect(() => {
    fetchJobs(1);
  }, [fetchJobs]);

  const handleApplyFilters = () => {
    fetchJobs(1);
  };

  const handleClearFilters = () => {
    setTerm("");
    setType("");
    setLocation("");
    setSortBy("createdAt");
    setSortDirection("desc");
    setLimit(10);
    fetchJobs(1, {
      term: "",
      type: "",
      location: "",
      sortBy: "createdAt",
      sortDirection: "desc",
      limit: 10,
    });
  };

  const handlePageChange = (page: number) => {
    fetchJobs(page);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    fetchJobs(1, { limit: newLimit });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 py-8">
        {/* Filters Sidebar - Left */}
        <aside className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-web-primary" />
              <h3 className="font-semibold text-gray-900 text-lg">
                {t("filters.title")}
              </h3>
            </div>

            <div className="space-y-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("filters.search")}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder={t("filters.searchPlaceholder")}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-web-primary focus:border-web-primary transition-colors"
                  />
                </div>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("filters.type")}
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-web-primary focus:border-web-primary transition-colors"
                >
                  <option value="">{t("filters.allTypes")}</option>
                  {JOB_TYPES.map((jobType) => (
                    <option key={jobType} value={jobType}>
                      {t(`filters.types.${jobType}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("filters.location")}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t("filters.locationPlaceholder")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-web-primary focus:border-web-primary transition-colors"
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("filters.sortBy")}
                </label>
                <select
                  value={`${sortBy}-${sortDirection}`}
                  onChange={(e) => {
                    const [s, d] = e.target.value.split("-") as [string, "asc" | "desc"];
                    setSortBy(s);
                    setSortDirection(d);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-web-primary focus:border-web-primary transition-colors"
                >
                  <option value="createdAt-desc">{t("filters.sortNewest")}</option>
                  <option value="createdAt-asc">{t("filters.sortOldest")}</option>
                  <option value="title-asc">{t("filters.sortTitleAsc")}</option>
                  <option value="title-desc">{t("filters.sortTitleDesc")}</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 bg-web-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-web-primary/90 transition-colors duration-300"
                >
                  {t("filters.apply")}
                </button>
                <button
                  onClick={handleClearFilters}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
                >
                  {t("filters.clear")}
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Job Listings - Right */}
        <div className="flex-1 min-w-0">
          <div className="bg-white">
            {loading && jobs.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-web-primary" />
                  <span className="text-gray-600">{t("loading")}</span>
                </div>
              </div>
            ) : error ? (
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
            ) : jobs.length > 0 ? (
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
                      location={job.location}
                    />
                  ))}
                </div>

                {/* Pagination - below jobs */}
                {totalCount > 0 && (
                  <div className="px-6 pt-4 pb-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm text-gray-600">
                        {t("pagination.showing", {
                          from: (currentPage - 1) * limit + 1,
                          to: Math.min(currentPage * limit, totalCount),
                          total: totalCount,
                        })}
                      </p>
                      <select
                        value={limit}
                        onChange={(e) =>
                          handleLimitChange(Number(e.target.value))
                        }
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-web-primary focus:border-web-primary"
                      >
                        {LIMIT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {t("pagination.perPage", { count: opt })}
                          </option>
                        ))}
                      </select>
                      {totalPages > 0 && (
                        <select
                          value={currentPage}
                          onChange={(e) =>
                            handlePageChange(Number(e.target.value))
                          }
                          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-web-primary focus:border-web-primary"
                        >
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((p) => (
                            <option key={p} value={p}>
                              {t("pagination.pageOption", {
                                page: p,
                                total: totalPages,
                              })}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    )}
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
      </div>
    </div>
  );
}
