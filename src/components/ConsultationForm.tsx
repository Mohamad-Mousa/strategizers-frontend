"use client";

import {
  User,
  Building,
  Globe,
  Briefcase,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { apiPost } from "@/lib/api";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  companyWebsite: string;
  position: string;
  isDecisionMaker: boolean;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  expectedOutcomes: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
}

const ConsultationForm = () => {
  const locale = useLocale();
  const t = useTranslations("consultationForm");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "",
    position: "",
    isDecisionMaker: false,
    email: "",
    phoneCode: "961",
    phoneNumber: "",
    expectedOutcomes: "",
    preferredDate: "",
    preferredTime: "",
    consultationType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "companyName",
      "companyWebsite",
      "position",
      "email",
      "phoneNumber",
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

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const submitData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        companyWebsite: formData.companyWebsite,
        position: formData.position,
        isDecisionMaker: formData.isDecisionMaker,
        email: formData.email,
        businessPhone: {
          code: formData.phoneCode,
          number: formData.phoneNumber,
        },
      };

      console.log("Submitting consultation booking:", submitData);

      const response = await apiPost("/public/booking", submitData);

      if (response.error) {
        throw new Error(response.message || t("errors.bookingFailed"));
      }

      setSubmitStatus("success");
      setSubmitMessage(t("success.bookingSuccess"));

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        companyWebsite: "",
        position: "",
        isDecisionMaker: false,
        email: "",
        phoneCode: "961",
        phoneNumber: "",
        expectedOutcomes: "",
        preferredDate: "",
        preferredTime: "",
        consultationType: "",
      });
    } catch (error) {
      console.error("Error booking consultation:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error ? error.message : t("errors.bookingFailed")
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

        {/* Consultation Form */}
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

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-2" />
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

            {/* Company Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                {t("fields.companyWebsite")}
              </label>
              <input
                type="url"
                placeholder={t("placeholders.companyWebsite")}
                value={formData.companyWebsite}
                onChange={(e) =>
                  handleInputChange("companyWebsite", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
              />
            </div>
          </div>

          {/* Position and Decision Maker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                {t("fields.position")} *
              </label>
              <input
                type="text"
                placeholder={t("placeholders.position")}
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
              />
            </div>

            {/* Decision Maker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("fields.isDecisionMaker")} *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="decisionMaker"
                    value="yes"
                    checked={formData.isDecisionMaker === true}
                    onChange={(e) =>
                      handleInputChange(
                        "isDecisionMaker",
                        e.target.value === "yes"
                      )
                    }
                    className="mx-2 text-web-primary focus:ring-web-primary"
                  />
                  <span className="text-gray-700">{t("options.yes")}</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="decisionMaker"
                    value="no"
                    checked={formData.isDecisionMaker === false}
                    onChange={(e) =>
                      handleInputChange(
                        "isDecisionMaker",
                        e.target.value === "yes"
                      )
                    }
                    className="mx-2 text-web-primary focus:ring-web-primary"
                  />
                  <span className="text-gray-700">{t("options.no")}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Professional Email */}
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

            {/* Business Mobile Number */}
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
                  <option value="1">+1</option>
                  <option value="44">+44</option>
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
                  {t("buttons.booking")}
                </>
              ) : (
                <>{t("buttons.submit")}</>
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
              . {t("footer.confirmation")}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;
