"use client";

import Contact from "@/components/Contact";
import Hero from "@/components/layout/Hero";
import {
  MapPinned,
  Send,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { apiPost, ApiResponse } from "@/lib/api";
import { useSettings } from "@/hooks/useSettings";
import { useTranslations } from "next-intl";
import { useWebsite } from "@/hooks/useWebsite";

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  phone: {
    code: string;
    number: string;
  };
}

const ContactPage = () => {
  const { settings } = useSettings();
  const t = useTranslations("contact");

  const { website } = useWebsite();

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    phone: {
      code: "961",
      number: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "phoneCode") {
      setFormData((prev) => ({
        ...prev,
        phone: { ...prev.phone, code: value },
      }));
    } else if (name === "phoneNumber") {
      setFormData((prev) => ({
        ...prev,
        phone: { ...prev.phone, number: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response: ApiResponse = await apiPost("/public/contact", formData);
      console.log({ response });
      if (!response.error) {
        setSubmitStatus({
          type: "success",
          message: t("form.successMessage"),
        });

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
          phone: {
            code: "961",
            number: "",
          },
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: response.message || t("form.errorMessage"),
        });
      }
    } catch (error: unknown) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : t("form.genericError"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col">
      <Hero
        title={t("hero.title")}
        background={
          `https://api-strat.othmanconstruction.com/${website?.contactPage?.banner}` ||
          "/services.webp"
        }
      />
      <section className="max-w-7xl mx-auto mt-20 px-6 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-6 max-w-3xl">
          <div className="relative flex flex-col items-center justify-center">
            <h1 className="border-b border-gray-200 pb-2 text-3xl font-bold">
              {t("section.title")}
            </h1>
            <hr className="w-1/3 border-web-primary border-2 absolute bottom-0" />
          </div>
          <p className="text-gray-500 text-lg text-center">
            {t("section.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Phone Card */}
          {settings?.contact?.phone && (
            <div className="flex flex-col items-center justify-center gap-3 border border-gray-200 rounded-md px-16 py-8 hover:scale-110 transition-all duration-300 cursor-pointer w-full hover:shadow-md">
              <Phone className="w-14 h-14 text-web-primary" />
              <hr className="w-1/3 border-gray-200" />
              <p className="font-medium text-lg">{t("cards.phone.title")}</p>
              <small className="text-gray-500 text-sm">
                +{settings.contact.phone.code} {settings.contact.phone.number}
              </small>
            </div>
          )}

          {/* Email Card */}
          {settings?.contact?.email && (
            <div className="flex flex-col items-center justify-center gap-3 border border-gray-200 rounded-md px-16 py-8 hover:scale-110 transition-all duration-300 cursor-pointer w-full hover:shadow-md">
              <Mail className="w-14 h-14 text-web-primary" />
              <hr className="w-1/3 border-gray-200" />
              <p className="font-medium text-lg">{t("cards.email.title")}</p>
              <small className="text-gray-500 text-sm">
                {settings.contact.email}
              </small>
            </div>
          )}

          {/* Address Card */}
          {settings?.contact?.address && (
            <div className="flex flex-col items-center justify-center gap-3 border border-gray-200 rounded-md px-16 py-8 hover:scale-110 transition-all duration-300 cursor-pointer w-full hover:shadow-md">
              <MapPinned className="w-14 h-14 text-web-primary" />
              <hr className="w-1/3 border-gray-200" />
              <p className="font-medium text-lg">{t("cards.address.title")}</p>
              <small className="text-gray-500 text-sm">
                {settings.contact.address}
              </small>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="col-span-2 md:col-span-2 flex flex-col gap-4">
            <div className="relative">
              <h1 className="border-b border-gray-200 pb-2 text-2xl font-bold">
                {t("form.title")}
              </h1>
              <hr className="w-1/6 border-web-primary border-2 absolute bottom-0" />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Status Messages */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-md flex items-center gap-2 ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span className="text-sm">{submitStatus.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-gray-500 text-sm">
                    {t("form.fields.fullName.label")} *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                    placeholder={t("form.fields.fullName.placeholder")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-gray-500 text-sm">
                    {t("form.fields.email.label")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                    placeholder={t("form.fields.email.placeholder")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phoneCode" className="text-gray-500 text-sm">
                    {t("form.fields.phoneCode.label")} *
                  </label>
                  <select
                    id="phoneCode"
                    name="phoneCode"
                    value={formData.phone.code}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                  >
                    <option value="961">+961 (Lebanon)</option>
                    <option value="966">+966 (Saudi Arabia)</option>
                    <option value="971">+971 (UAE)</option>
                    <option value="974">+974 (Qatar)</option>
                    <option value="965">+965 (Kuwait)</option>
                    <option value="973">+973 (Bahrain)</option>
                    <option value="968">+968 (Oman)</option>
                    <option value="962">+962 (Jordan)</option>
                    <option value="20">+20 (Egypt)</option>
                    <option value="1">+1 (USA/Canada)</option>
                    <option value="44">+44 (UK)</option>
                    <option value="33">+33 (France)</option>
                    <option value="49">+49 (Germany)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phoneNumber"
                    className="text-gray-500 text-sm"
                  >
                    {t("form.fields.phoneNumber.label")} *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phone.number}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                    placeholder={t("form.fields.phoneNumber.placeholder")}
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="subject" className="text-gray-500 text-sm">
                    {t("form.fields.subject.label")} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300"
                    placeholder={t("form.fields.subject.placeholder")}
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="message" className="text-gray-500 text-sm">
                    {t("form.fields.message.label")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={7}
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-web-primary focus:border-transparent transition-colors duration-300 resize-vertical"
                    placeholder={t("form.fields.message.placeholder")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-web-primary px-6 py-3 rounded-full font-medium hover:bg-web-primary hover:text-white transition-colors w-full border border-web-primary md:col-span-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-web-primary border-t-transparent rounded-full animate-spin"></div>
                      {t("form.submitButton.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t("form.submitButton.text")}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <div className="relative">
              <h1 className="border-b border-gray-200 pb-2 text-2xl font-bold">
                {t("contactInfo.title")}
              </h1>
              <hr className="w-1/6 border-web-primary border-2 absolute bottom-0" />
            </div>
            <Contact />
          </div>
        </div>
        <div className="w-full">
          {settings?.contact?.map && (
            <div className="w-full">
              <div
                dangerouslySetInnerHTML={{
                  __html: settings.contact.map.replace(
                    /width="[^"]*"/g,
                    'width="100%"'
                  ),
                }}
                className="w-full"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
