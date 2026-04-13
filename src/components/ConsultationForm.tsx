"use client";

import {
  User,
  Building2,
  Globe,
  Briefcase,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Calendar,
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
  discussionPoints: string;
  expectedOutcomes: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
}

const ConsultationForm = () => {
  const locale = useLocale();
  const isRtl = locale === "ar";
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
    discussionPoints: "",
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
  const [currentStep, setCurrentStep] = useState(1);

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
      "discussionPoints",
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
        discussionPoints: formData.discussionPoints,
      };

      const response = await apiPost("/public/booking", submitData);

      if (response.error) {
        throw new Error(response.message || t("errors.bookingFailed"));
      }

      setSubmitStatus("success");
      setSubmitMessage(t("success.bookingSuccess"));

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
        discussionPoints: "",
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

  const steps = [
    { id: 1, label: t("steps.personal") || "Personal Info" },
    { id: 2, label: t("steps.company") || "Company" },
    { id: 3, label: t("steps.details") || "Details" },
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <section className="relative py-20 overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238a3594' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Side - Info Panel */}
          <div className="lg:col-span-2 lg:sticky lg:top-8">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-web-primary/10 rounded-full">
                  <Calendar className="w-4 h-4 text-web-primary" />
                  <span className="text-sm font-medium text-web-primary">
                    {t("badge") || "Free Consultation"}
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-web-gray leading-tight">
                  {t("title")}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("description")}
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {[
                  { icon: Sparkles, text: t("benefits.expert") || "Expert consultation" },
                  { icon: MessageSquare, text: t("benefits.personalized") || "Personalized approach" },
                  { icon: CheckCircle2, text: t("benefits.actionable") || "Actionable insights" },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-web-primary to-web-primary/80 flex items-center justify-center shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Contact Info Card */}
              <div className="p-6 bg-web-gray rounded-2xl text-white">
                <h3 className="text-lg font-semibold mb-4">
                  {t("needHelp") || "Need immediate help?"}
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:info@strategizers.com"
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>info@strategizers.com</span>
                  </a>
                  <a
                    href="tel:+96171234567"
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span dir="ltr">+961 71 234 567</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Step Indicator */}
              <div className="px-8 pt-8">
                <div className="flex items-center justify-between mb-8">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(step.id)}
                        className={`
                          relative flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300
                          ${currentStep >= step.id
                            ? "bg-web-primary text-white shadow-lg shadow-web-primary/30"
                            : "bg-gray-100 text-gray-400"
                          }
                        `}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          step.id
                        )}
                      </button>
                      {index < steps.length - 1 && (
                        <div className="flex-1 mx-3">
                          <div className={`h-1 rounded-full transition-all duration-300 ${
                            currentStep > step.id ? "bg-web-primary" : "bg-gray-200"
                          }`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {t("step") || "Step"} {currentStep} {t("of") || "of"} 3
                </p>
                <h3 className="text-xl font-bold text-web-gray">
                  {steps[currentStep - 1].label}
                </h3>
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">{t("success.title") || "Success!"}</p>
                      <p className="text-sm text-green-600">{submitMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-red-800">{t("errors.title") || "Error"}</p>
                      <p className="text-sm text-red-600">{submitMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8">
                {/* Step 1: Personal Information */}
                <div className={`space-y-6 ${currentStep === 1 ? "block" : "hidden"}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <User className="w-4 h-4 text-web-primary" />
                        {t("fields.firstName")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={t("placeholders.firstName")}
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-web-primary/20 focus:border-web-primary focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <User className="w-4 h-4 text-web-primary" />
                        {t("fields.lastName")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={t("placeholders.lastName")}
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-web-primary/20 focus:border-web-primary focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Mail className="w-4 h-4 text-web-primary" />
                      {t("fields.email")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder={t("placeholders.email")}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-web-primary/20 focus:border-web-primary focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Phone className="w-4 h-4 text-web-primary" />
                      {t("fields.phoneNumber")} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-3">
                      <select
                        value={formData.phoneCode}
                        onChange={(e) => handleInputChange("phoneCode", e.target.value)}
                        className="px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-web-primary/20 focus:border-web-primary focus:bg-white transition-all duration-300 min-w-[100px]"
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
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        required
                        className="flex-1 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-web-primary/20 focus:border-web-primary focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Company Information */}
                <div className={`space-y-6 ${currentStep === 2 ? "block" : "hidden"}`}>
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Building2 className="w-4 h-4 text-web-primary" />
                      {t("fields.companyName")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("placeholders.companyName")}
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-web-primary/20 focus:border-web-primary focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Company Website */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Globe className="w-4 h-4 text-web-primary" />
                      {t("fields.companyWebsite")}
                    </label>
                    <input
                      type="url"
                      placeholder={t("placeholders.companyWebsite")}
                      value={formData.companyWebsite}
                      onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-web-primary/20 focus:border-web-primary focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Position */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Briefcase className="w-4 h-4 text-web-primary" />
                      {t("fields.position")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("placeholders.position")}
                      value={formData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-web-primary/20 focus:border-web-primary focus:bg-white transition-all duration-300 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Decision Maker */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      {t("fields.isDecisionMaker")} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label
                        className={`
                          flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                          ${formData.isDecisionMaker
                            ? "border-web-primary bg-web-primary/5 text-web-primary"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="decisionMaker"
                          value="yes"
                          checked={formData.isDecisionMaker === true}
                          onChange={() => handleInputChange("isDecisionMaker", true)}
                          className="sr-only"
                        />
                        <CheckCircle2 className={`w-5 h-5 ${formData.isDecisionMaker ? "text-web-primary" : "text-gray-400"}`} />
                        <span className="font-medium">{t("options.yes")}</span>
                      </label>
                      <label
                        className={`
                          flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                          ${!formData.isDecisionMaker
                            ? "border-web-primary bg-web-primary/5 text-web-primary"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="decisionMaker"
                          value="no"
                          checked={formData.isDecisionMaker === false}
                          onChange={() => handleInputChange("isDecisionMaker", false)}
                          className="sr-only"
                        />
                        <span className="font-medium">{t("options.no")}</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Step 3: Discussion Points */}
                <div className={`space-y-6 ${currentStep === 3 ? "block" : "hidden"}`}>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <MessageSquare className="w-4 h-4 text-web-primary" />
                      {t("fields.discussionPoints")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={6}
                      placeholder={t("placeholders.discussionPoints")}
                      value={formData.discussionPoints}
                      onChange={(e) => handleInputChange("discussionPoints", e.target.value)}
                      required
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-web-primary/20 focus:border-web-primary focus:bg-white transition-all duration-300 placeholder:text-gray-400 resize-none"
                    />
                    <p className="text-xs text-gray-500">
                      {t("hints.discussionPoints") || "Share what you'd like to discuss so we can prepare for your consultation."}
                    </p>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`
                      px-6 py-3 rounded-xl font-medium transition-all duration-300
                      ${currentStep === 1
                        ? "invisible"
                        : "text-gray-600 hover:text-web-primary hover:bg-gray-50"
                      }
                    `}
                  >
                    {t("buttons.back") || "Back"}
                  </button>

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 px-8 py-3.5 bg-web-primary text-white rounded-xl font-medium hover:bg-web-primary/90 transition-all duration-300 shadow-lg shadow-web-primary/20"
                    >
                      {t("buttons.next") || "Next"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3.5 bg-web-primary text-white rounded-xl font-medium hover:bg-web-primary/90 transition-all duration-300 shadow-lg shadow-web-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t("buttons.booking")}
                        </>
                      ) : (
                        <>
                          {t("buttons.submit")}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 mt-6 pt-6 border-t border-gray-100">
                  <p>
                    {t("footer.agreement")}{" "}
                    <Link
                      href={`/${locale}/terms-and-conditions`}
                      className="text-web-primary hover:underline"
                    >
                      {t("footer.terms")}
                    </Link>{" "}
                    {t("footer.and")}{" "}
                    <Link
                      href={`/${locale}/privacy-policy`}
                      className="text-web-primary hover:underline"
                    >
                      {t("footer.privacy")}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
