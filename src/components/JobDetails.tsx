import { Calendar, Clock, FileText, CheckCircle, Users } from "lucide-react";
import NextImage from "next/image";
import { Job } from "@/types/job";
import { useTranslations } from "next-intl";

interface JobDetailsProps {
  job: Job;
}

const JobDetails = ({ job }: JobDetailsProps) => {
  const t = useTranslations("jobDetails");
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-green-100 text-green-800";
      case "part-time":
        return "bg-blue-100 text-blue-800";
      case "freelance":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Job Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {job.title}
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              {job.type === "full-time"
                ? t("fullTime")
                : job.type === "part-time"
                ? t("partTime")
                : t("freelance")}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(
              job.type
            )}`}
          >
            {job.type === "full-time"
              ? t("fullTime")
              : job.type === "part-time"
              ? t("partTime")
              : t("freelance")}
          </span>
        </div>

        {/* Job Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {t("postedOn")} {formatDate(job.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{t("active")}</span>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          {t("jobDescription")}
        </h2>
        <div className="prose prose-gray max-w-none">
          <p
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </div>
      </div>

      {/* Responsibilities */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {t("keyResponsibilities")}
        </h2>
        <ul className="space-y-3">
          {job.responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-web-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          {t("requirements")}
        </h2>
        <ul className="space-y-3">
          {job.requirements.map((requirement, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-web-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{requirement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Job Image */}
      {job.image && (
        <div className="mt-8">
          <NextImage
            src={`https://api-strat.othmanconstruction.com/${job.image}`}
            alt={job.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Application CTA */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("readyToApply")}
        </h3>
        <p className="text-gray-600 mb-4">{t("applyDescription")}</p>
      </div>
    </div>
  );
};

export default JobDetails;
