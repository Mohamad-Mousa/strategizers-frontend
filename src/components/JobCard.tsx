import { Calendar, CheckCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppliedJobs } from "@/hooks/useAppliedJobs";

interface JobCardProps {
  title: string;
  department: string;
  postedDate: string;
  slug: string;
  jobId?: string;
}

const JobCard = ({
  title,
  department,
  postedDate,
  slug,
  jobId,
}: JobCardProps) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("jobCard");
  const { isJobApplied } = useAppliedJobs();

  // Check if job is already applied
  const alreadyApplied = jobId ? isJobApplied(jobId) : false;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Job Title and Department */}
          <div className="mb-3">
            <Link
              href={`/${locale}/careers/apply/${slug}`}
              className="text-lg font-semibold text-web-primary hover:text-web-primary/80 transition-colors duration-300 cursor-pointer"
            >
              {title}
            </Link>
            <p className="text-gray-600 text-sm mt-1">
              {department === "full-time"
                ? t("fullTime")
                : department === "part-time"
                ? t("partTime")
                : t("freelance")}
            </p>
          </div>

          {/* Location and Date */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {t("postedOn")} {postedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 ml-4">
          {alreadyApplied ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{t("applied")}</span>
            </div>
          ) : (
            <button
              onClick={() => {
                router.push(`/${locale}/careers/apply/${slug}`);
              }}
              className="bg-web-primary text-white px-6 py-2 rounded-md font-medium hover:bg-web-primary/90 transition-colors duration-300 cursor-pointer"
            >
              {t("applyNow")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
