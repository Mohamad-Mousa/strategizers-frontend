"use client";

import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Target,
  FileText,
  Upload,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useState, useRef } from "react";
import { apiPost } from "@/lib/api";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface FormData {
  title: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  country: string;
  areaOfInterest: string;
  industry: string;
  companyName: string;
  yearlyRevenue: string;
  document: File | null;
  comment: string;
}

const RFPForm = () => {
  const locale = useLocale();
  const t = useTranslations("rfpForm");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phoneCode: "961",
    phoneNumber: "",
    country: "",
    areaOfInterest: "",
    industry: "",
    companyName: "",
    yearlyRevenue: "",
    document: null,
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      "title",
      "firstName",
      "lastName",
      "jobTitle",
      "email",
      "phoneNumber",
      "country",
      "areaOfInterest",
      "industry",
      "companyName",
      "yearlyRevenue",
      "comment",
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
      setSubmitMessage(t("errors.uploadDocument"));
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
      submitData.append("title", formData.title);
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("jobTitle", formData.jobTitle);
      submitData.append("email", formData.email);
      submitData.append("phone[code]", formData.phoneCode);
      submitData.append("phone[number]", formData.phoneNumber);
      submitData.append("country", formData.country);
      submitData.append("areaOfInterest", formData.areaOfInterest);
      submitData.append("industry", formData.industry);
      submitData.append("companyName", formData.companyName);
      submitData.append("yearlyRevenue", formData.yearlyRevenue);
      submitData.append("comment", formData.comment);

      if (formData.document) {
        submitData.append("document", formData.document);
      }

      const response = await apiPost("/public/proposal", submitData);

      if (response.error) {
        throw new Error(response.message || t("errors.submitFailed"));
      }

      setSubmitStatus("success");
      setSubmitMessage(t("success.rfpSubmitted"));

      // Reset form
      setFormData({
        title: "",
        firstName: "",
        lastName: "",
        jobTitle: "",
        email: "",
        phoneCode: "961",
        phoneNumber: "",
        country: "",
        areaOfInterest: "",
        industry: "",
        companyName: "",
        yearlyRevenue: "",
        document: null,
        comment: "",
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting RFP request:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error ? error.message : t("errors.submitFailed")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* RFP Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Information */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t("sections.projectInformation")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("fields.projectTitle")} *
                </label>
                <input
                  type="text"
                  placeholder={t("placeholders.projectTitle")}
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              {t("sections.personalInformation")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("fields.firstName")} *
                </label>
                <input
                  type="text"
                  placeholder={t("placeholders.firstName")}
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("fields.lastName")} *
                </label>
                <input
                  type="text"
                  placeholder={t("placeholders.lastName")}
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("fields.jobTitle")} *
                </label>
                <input
                  type="text"
                  placeholder={t("placeholders.jobTitle")}
                  value={formData.jobTitle}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                />
              </div>
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
          </div>

          {/* Contact Information */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              {t("sections.contactInformation")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <option value="1">+1</option>
                    <option value="44">+44</option>
                    <option value="33">+33</option>
                    <option value="49">+49</option>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  {t("fields.country")} *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                >
                  <option value="">{t("placeholders.selectCountry")}</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Oman">Oman</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Egypt">Egypt</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building className="w-5 h-5" />
              {t("sections.businessInformation")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("fields.companyName")} *
                </label>
                <input
                  type="text"
                  placeholder={t("placeholders.companyName")}
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  {t("fields.yearlyRevenue")} *
                </label>
                <select
                  value={formData.yearlyRevenue}
                  onChange={(e) =>
                    handleInputChange("yearlyRevenue", e.target.value)
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                >
                  <option value="">{t("placeholders.selectRevenue")}</option>
                  <option value="0-100k">$0 - $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="500k-1m">$500,000 - $1,000,000</option>
                  <option value="1m-5m">$1,000,000 - $5,000,000</option>
                  <option value="5m-10m">$5,000,000 - $10,000,000</option>
                  <option value="10m-50m">$10,000,000 - $50,000,000</option>
                  <option value="50m+">$50,000,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("fields.industry")} *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                >
                  <option value="">{t("placeholders.selectIndustry")}</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance & Banking</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail & E-commerce</option>
                  <option value="Education">Education</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Energy">Energy & Utilities</option>
                  <option value="Government">Government</option>
                  <option value="Non-profit">Non-profit</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Target className="w-4 h-4 inline mr-2" />
                  {t("fields.areaOfInterest")} *
                </label>
                <select
                  value={formData.areaOfInterest}
                  onChange={(e) =>
                    handleInputChange("areaOfInterest", e.target.value)
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                >
                  <option value="">
                    {t("placeholders.selectAreaOfInterest")}
                  </option>
                  <option value="Strategy Planning">Strategy Planning</option>
                  <option value="Financial Advisory">Financial Advisory</option>
                  <option value="HR & Talent Management">
                    HR & Talent Management
                  </option>
                  <option value="Business Process Optimization">
                    Business Process Optimization
                  </option>
                  <option value="Digital Transformation">
                    Digital Transformation
                  </option>
                  <option value="Change Management">Change Management</option>
                  <option value="Risk Management">Risk Management</option>
                  <option value="Market Research">Market Research</option>
                  <option value="Operations Consulting">
                    Operations Consulting
                  </option>
                  <option value="Technology Consulting">
                    Technology Consulting
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              {t("sections.supportingDocuments")}
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("fields.uploadDocuments")} *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-web-primary transition-colors duration-300">
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
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-web-primary hover:text-web-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-web-primary">
                        <span>{t("buttons.uploadFile")}</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.png,.jpeg,.gif,.webp"
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
          </div>

          {/* Additional Comments */}
          <div className="pb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t("sections.additionalInformation")}
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("fields.additionalComments")} *
              </label>
              <textarea
                rows={4}
                placeholder={t("placeholders.additionalComments")}
                value={formData.comment}
                onChange={(e) => handleInputChange("comment", e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300 resize-vertical"
              />
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
                <>{t("buttons.submitRFP")}</>
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
              . {t("footer.responseTime")}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RFPForm;
