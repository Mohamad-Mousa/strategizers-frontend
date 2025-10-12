"use client";

import {
  Upload,
  User,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useState, useRef } from "react";
import { apiPost } from "@/lib/api";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useAppliedJobs } from "@/hooks/useAppliedJobs";

interface JobApplicationFormProps {
  jobId: string;
  jobTitle?: string;
  jobSlug?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  message: string;
  document: File | null;
}

const JobApplicationForm = ({
  jobId,
  jobTitle,
  jobSlug,
}: JobApplicationFormProps) => {
  const locale = useLocale();
  const t = useTranslations("jobApplicationForm");
  const { isJobApplied, addJob } = useAppliedJobs();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "961",
    phoneNumber: "",
    gender: "",
    dob: "",
    message: "",
    document: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if job is already applied
  const alreadyApplied = isJobApplied(jobId);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      document: file,
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "gender",
      "dob",
      "message",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setSubmitStatus("error");
        setSubmitMessage(
          t("errors.fillField", { field: t(`fields.${field}`) })
        );
        return false;
      }
    }

    if (!formData.document) {
      setSubmitStatus("error");
      setSubmitMessage(t("errors.uploadResume"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("job", jobId);
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("email", formData.email);
      submitData.append("phone[code]", formData.phoneCode);
      submitData.append("phone[number]", formData.phoneNumber);
      submitData.append("gender", formData.gender);
      submitData.append("dob", formData.dob);
      submitData.append("message", formData.message);

      if (formData.document) {
        submitData.append("document", formData.document);
      }

      const response = await apiPost("/public/job/apply", submitData);

      if (response.error) {
        throw new Error(response.message || t("errors.submitFailed"));
      }

      setSubmitStatus("success");
      setSubmitMessage(t("success.applicationSubmitted"));

      addJob({
        jobId,
        jobTitle,
        jobSlug,
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneCode: "961",
        phoneNumber: "",
        gender: "",
        dob: "",
        message: "",
        document: null,
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error ? error.message : t("errors.submitFailed")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // If already applied, show different UI
  if (alreadyApplied) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t("alreadyApplied.title")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("alreadyApplied.description")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Form Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t("title")}
          </h2>
          <p className="text-gray-600">{t("description")}</p>
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-800">{submitMessage}</p>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-800">{submitMessage}</p>
            </div>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                {t("fields.firstName")} *
              </label>
              <input
                type="text"
                placeholder={t("placeholders.firstName")}
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                {t("fields.lastName")} *
              </label>
              <input
                type="text"
                placeholder={t("placeholders.lastName")}
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                {t("fields.email")} *
              </label>
              <input
                type="email"
                placeholder={t("placeholders.email")}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                {t("fields.phoneNumber")} *
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.phoneCode}
                  onChange={(e) =>
                    handleInputChange("phoneCode", e.target.value)
                  }
                  className="px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                >
                  <option value="961">+961</option>
                  <option value="966">+966</option>
                  <option value="971">+971</option>
                  <option value="974">+974</option>
                </select>
                <input
                  type="tel"
                  placeholder={t("placeholders.phoneNumber")}
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("fields.gender")}
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
              >
                <option value="">{t("placeholders.selectGender")}</option>
                <option value="male">{t("options.male")}</option>
                <option value="female">{t("options.female")}</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                {t("fields.dateOfBirth")}
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange("dob", e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              {t("fields.coverLetter")}
            </label>
            <textarea
              rows={4}
              placeholder={t("placeholders.coverLetter")}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300 resize-vertical"
            />
          </div>

          {/* Document Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-2" />
              {t("fields.resume")} *
            </label>
            <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-web-primary transition-colors duration-300">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                {formData.document ? (
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-web-primary">
                      {formData.document.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, document: null }));
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      className="text-red-600 hover:text-red-800 text-xs mt-1"
                    >
                      {t("buttons.removeFile")}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-web-primary hover:text-web-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-web-primary">
                      <span>{t("buttons.uploadFile")}</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">{t("orDragAndDrop")}</p>
                  </div>
                )}
                <p className="text-xs text-gray-500">{t("fileFormats")}</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-web-primary text-white py-3 px-6 rounded-md font-medium hover:bg-web-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-web-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("buttons.submitting")}
                </>
              ) : (
                <>{t("buttons.submitApplication")}</>
              )}
            </button>
          </div>

          {/* Form Footer */}
          <div className="text-center text-sm text-gray-500 pt-4">
            <p>
              {t("footer.agreement")}{" "}
              <Link
                href={`/${locale}/terms-and-conditions`}
                className="text-web-primary hover:text-web-primary/80 transition-colors duration-300"
              >
                {t("footer.terms")}
              </Link>{" "}
              {t("footer.and")}{" "}
              <Link
                href={`/${locale}/privacy-policy`}
                className="text-web-primary hover:text-web-primary/80 transition-colors duration-300"
              >
                {t("footer.privacy")}
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
