"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Hero from "@/components/layout/Hero";
import JobApplicationForm from "@/components/JobApplicationForm";
import JobDetails from "@/components/JobDetails";
import { apiGet } from "@/lib/api";
import { Job } from "@/types/job";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const ApplyPage = () => {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("jobApplication");
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJob = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);

      const response = await apiGet<Job>(`/public/job/${slug}`);

      if (response.error) {
        throw new Error(response.message || t("errors.fetchFailed"));
      }

      setJob(response.results);
    } catch (err) {
      console.error("Error fetching job:", err);
      setError(err instanceof Error ? err.message : t("errors.fetchError"));
    } finally {
      setLoading(false);
    }
  }, [slug, t]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  const getLocalizedContent = (content: string | { [key: string]: string }) => {
    if (typeof content === "string") return content;
    return content[locale] || content.en || Object.values(content)[0];
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col gap-10 items-center justify-center">
        <Hero title={t("loading")} background="/services.webp" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-web-primary" />
              <span className="text-gray-600">{t("loadingDetails")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col gap-10 items-center justify-center">
        <Hero title={t("errors.notFound")} background="/services.webp" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("errors.loadFailed")}
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchJob}
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

  // No job found
  if (!job) {
    return (
      <div className="flex flex-col gap-10 items-center justify-center">
        <Hero title={t("errors.notFound")} background="/services.webp" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                {t("notFound.description")}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {t("notFound.suggestion")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <Hero
        title={getLocalizedContent(job.title)}
        subtitle={`${getLocalizedContent(job.type)} - ${t("posted")} ${new Date(
          job.createdAt
        ).toLocaleDateString()}`}
        background="/services.webp"
      />

      {/* Job Details and Application Form */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Details - Left Column */}
          <div className="order-1 lg:order-1">
            <JobDetails job={job} />
          </div>

          {/* Application Form - Right Column */}
          <div className="order-2 lg:order-2">
            <div className="sticky top-8">
              <JobApplicationForm
                jobId={job._id}
                jobTitle={job.title}
                jobSlug={job.slug}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
