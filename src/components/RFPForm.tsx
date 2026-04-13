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
  ChevronRight,
  Briefcase,
  Globe,
  X,
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

const inputClass =
  "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-web-primary/30 focus:border-web-primary focus:bg-white transition-all duration-200 text-sm";

const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

const sectionTitleClass =
  "flex items-center gap-3 text-base font-semibold text-web-gray mb-5";

const RFPForm = () => {
  const locale = useLocale();
  const isRtl = locale === "ar";
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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, document: file }));
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      "title", "firstName", "lastName", "jobTitle", "email",
      "phoneNumber", "country", "areaOfInterest", "industry",
      "companyName", "yearlyRevenue", "comment",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setSubmitStatus("error");
        setSubmitMessage(t("errors.fillField", { field: t(`fields.${field}`) }));
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
      if (formData.document) submitData.append("document", formData.document);

      const response = await apiPost("/public/proposal", submitData);
      if (response.error) throw new Error(response.message || t("errors.submitFailed"));

      setSubmitStatus("success");
      setSubmitMessage(t("success.rfpSubmitted"));
      setFormData({
        title: "", firstName: "", lastName: "", jobTitle: "",
        email: "", phoneCode: "961", phoneNumber: "", country: "",
        areaOfInterest: "", industry: "", companyName: "",
        yearlyRevenue: "", document: null, comment: "",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(error instanceof Error ? error.message : t("errors.submitFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" dir={isRtl ? "rtl" : "ltr"}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Left Info Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Header card */}
          <div className="bg-web-gray rounded-2xl p-8 text-white sticky top-8">
            <div className="inline-flex items-center gap-2 bg-web-primary/20 border border-web-primary/30 rounded-full px-3 py-1 mb-5">
              <FileText className="w-3.5 h-3.5 text-web-primary" />
              <span className="text-xs font-medium text-web-primary">{t("badge")}</span>
            </div>
            <h2 className="text-2xl font-bold leading-snug mb-3">{t("infoTitle")}</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-8">{t("infoDescription")}</p>

            {/* What to include */}
            <div className="space-y-3 mb-8">
              {[
                { icon: User,        key: "benefits.personal"  },
                { icon: Building,    key: "benefits.company"   },
                { icon: Target,      key: "benefits.project"   },
                { icon: Upload,      key: "benefits.document"  },
              ].map(({ icon: Icon, key }) => (
                <div key={key} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-web-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-web-primary" />
                  </div>
                  <p className="text-white/80 text-sm">{t(key)}</p>
                </div>
              ))}
            </div>

            {/* Response time badge */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-xs text-white/50 uppercase tracking-wide mb-1">{t("responseLabel")}</p>
              <p className="text-white font-semibold">{t("responseTime")}</p>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Form header strip */}
            <div className="bg-gradient-to-r from-web-primary to-web-primary/80 px-8 py-6">
              <h3 className="text-white text-xl font-bold">{t("title")}</h3>
              <p className="text-white/80 text-sm mt-1">{t("description")}</p>
            </div>

            {/* Status messages */}
            {submitStatus === "success" && (
              <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-green-800 text-sm">{submitMessage}</p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{submitMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-8 space-y-8">

              {/* Section 1 — Project Information */}
              <div>
                <h4 className={sectionTitleClass}>
                  <span className="w-8 h-8 rounded-lg bg-web-primary/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-web-primary" />
                  </span>
                  {t("sections.projectInformation")}
                </h4>
                <div>
                  <label className={labelClass}>{t("fields.projectTitle")} <span className="text-web-primary">*</span></label>
                  <input
                    type="text"
                    placeholder={t("placeholders.projectTitle")}
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Section 2 — Personal Information */}
              <div>
                <h4 className={sectionTitleClass}>
                  <span className="w-8 h-8 rounded-lg bg-web-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-web-primary" />
                  </span>
                  {t("sections.personalInformation")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Title select */}
                  <div className="sm:col-span-2">
                    <label className={labelClass}>{t("fields.title")} <span className="text-web-primary">*</span></label>
                    <select
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                      className={inputClass}
                    >
                      <option value="">{t("placeholders.selectTitle")}</option>
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Dr">Dr.</option>
                      <option value="Prof">Prof.</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>{t("fields.firstName")} <span className="text-web-primary">*</span></label>
                    <input type="text" placeholder={t("placeholders.firstName")} value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t("fields.lastName")} <span className="text-web-primary">*</span></label>
                    <input type="text" placeholder={t("placeholders.lastName")} value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}><Briefcase className="w-3.5 h-3.5 inline mr-1.5 opacity-60" />{t("fields.jobTitle")} <span className="text-web-primary">*</span></label>
                    <input type="text" placeholder={t("placeholders.jobTitle")} value={formData.jobTitle} onChange={(e) => handleInputChange("jobTitle", e.target.value)} required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}><Mail className="w-3.5 h-3.5 inline mr-1.5 opacity-60" />{t("fields.email")} <span className="text-web-primary">*</span></label>
                    <input type="email" placeholder={t("placeholders.email")} value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Section 3 — Contact Information */}
              <div>
                <h4 className={sectionTitleClass}>
                  <span className="w-8 h-8 rounded-lg bg-web-primary/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-web-primary" />
                  </span>
                  {t("sections.contactInformation")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}><Phone className="w-3.5 h-3.5 inline mr-1.5 opacity-60" />{t("fields.phoneNumber")} <span className="text-web-primary">*</span></label>
                    <div className="flex gap-2">
                      <select
                        value={formData.phoneCode}
                        onChange={(e) => handleInputChange("phoneCode", e.target.value)}
                        className="px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-web-primary/30 focus:border-web-primary transition-all duration-200 w-24 shrink-0"
                      >
                        <option value="961">+961</option>
                        <option value="966">+966</option>
                        <option value="971">+971</option>
                        <option value="974">+974</option>
                        <option value="965">+965</option>
                        <option value="973">+973</option>
                        <option value="968">+968</option>
                        <option value="962">+962</option>
                        <option value="20">+20</option>
                        <option value="1">+1</option>
                        <option value="44">+44</option>
                        <option value="33">+33</option>
                        <option value="49">+49</option>
                      </select>
                      <input type="tel" placeholder={t("placeholders.phoneNumber")} value={formData.phoneNumber} onChange={(e) => handleInputChange("phoneNumber", e.target.value)} required className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}><MapPin className="w-3.5 h-3.5 inline mr-1.5 opacity-60" />{t("fields.country")} <span className="text-web-primary">*</span></label>
                    <select value={formData.country} onChange={(e) => handleInputChange("country", e.target.value)} required className={inputClass}>
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

              {/* Section 4 — Business Information */}
              <div>
                <h4 className={sectionTitleClass}>
                  <span className="w-8 h-8 rounded-lg bg-web-primary/10 flex items-center justify-center">
                    <Building className="w-4 h-4 text-web-primary" />
                  </span>
                  {t("sections.businessInformation")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}><Building className="w-3.5 h-3.5 inline mr-1.5 opacity-60" />{t("fields.companyName")} <span className="text-web-primary">*</span></label>
                    <input type="text" placeholder={t("placeholders.companyName")} value={formData.companyName} onChange={(e) => handleInputChange("companyName", e.target.value)} required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}><DollarSign className="w-3.5 h-3.5 inline mr-1.5 opacity-60" />{t("fields.yearlyRevenue")} <span className="text-web-primary">*</span></label>
                    <select value={formData.yearlyRevenue} onChange={(e) => handleInputChange("yearlyRevenue", e.target.value)} required className={inputClass}>
                      <option value="">{t("placeholders.selectRevenue")}</option>
                      <option value="0-100k">$0 – $100,000</option>
                      <option value="100k-500k">$100,000 – $500,000</option>
                      <option value="500k-1m">$500,000 – $1,000,000</option>
                      <option value="1m-5m">$1,000,000 – $5,000,000</option>
                      <option value="5m-10m">$5,000,000 – $10,000,000</option>
                      <option value="10m-50m">$10,000,000 – $50,000,000</option>
                      <option value="50m+">$50,000,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}><Globe className="w-3.5 h-3.5 inline mr-1.5 opacity-60" />{t("fields.industry")} <span className="text-web-primary">*</span></label>
                    <select value={formData.industry} onChange={(e) => handleInputChange("industry", e.target.value)} required className={inputClass}>
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
                    <label className={labelClass}><Target className="w-3.5 h-3.5 inline mr-1.5 opacity-60" />{t("fields.areaOfInterest")} <span className="text-web-primary">*</span></label>
                    <select value={formData.areaOfInterest} onChange={(e) => handleInputChange("areaOfInterest", e.target.value)} required className={inputClass}>
                      <option value="">{t("placeholders.selectAreaOfInterest")}</option>
                      <option value="Strategy Planning">Strategy Planning</option>
                      <option value="Financial Advisory">Financial Advisory</option>
                      <option value="HR & Talent Management">HR & Talent Management</option>
                      <option value="Business Process Optimization">Business Process Optimization</option>
                      <option value="Digital Transformation">Digital Transformation</option>
                      <option value="Change Management">Change Management</option>
                      <option value="Risk Management">Risk Management</option>
                      <option value="Market Research">Market Research</option>
                      <option value="Operations Consulting">Operations Consulting</option>
                      <option value="Technology Consulting">Technology Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 5 — Document Upload */}
              <div>
                <h4 className={sectionTitleClass}>
                  <span className="w-8 h-8 rounded-lg bg-web-primary/10 flex items-center justify-center">
                    <Upload className="w-4 h-4 text-web-primary" />
                  </span>
                  {t("sections.supportingDocuments")}
                </h4>
                <label className={labelClass}>{t("fields.uploadDocuments")} <span className="text-web-primary">*</span></label>
                {formData.document ? (
                  <div className="flex items-center justify-between px-5 py-4 bg-web-primary/5 border border-web-primary/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-web-primary/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-web-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-web-gray">{formData.document.name}</p>
                        <p className="text-xs text-gray-400">{(formData.document.size / 1024).toFixed(0)} KB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setFormData((prev) => ({ ...prev, document: null })); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                      className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors duration-200"
                    >
                      <X className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center px-6 py-10 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-web-primary/50 hover:bg-web-primary/[0.02] transition-all duration-200 group">
                    <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-web-primary/10 flex items-center justify-center mb-3 transition-colors duration-200">
                      <Upload className="w-5 h-5 text-gray-400 group-hover:text-web-primary transition-colors duration-200" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-web-primary transition-colors duration-200">{t("buttons.uploadFile")}</p>
                    <p className="text-xs text-gray-400 mt-1">{t("orDragAndDrop")}</p>
                    <p className="text-xs text-gray-400 mt-2 bg-gray-100 px-3 py-1 rounded-full">{t("fileFormats")}</p>
                    <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.jpg,.png,.jpeg,.gif,.webp" onChange={handleFileChange} className="sr-only" />
                  </label>
                )}
              </div>

              {/* Section 6 — Additional Comments */}
              <div>
                <h4 className={sectionTitleClass}>
                  <span className="w-8 h-8 rounded-lg bg-web-primary/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-web-primary" />
                  </span>
                  {t("sections.additionalInformation")}
                </h4>
                <div>
                  <label className={labelClass}>{t("fields.additionalComments")} <span className="text-web-primary">*</span></label>
                  <textarea
                    rows={5}
                    placeholder={t("placeholders.additionalComments")}
                    value={formData.comment}
                    onChange={(e) => handleInputChange("comment", e.target.value)}
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-web-primary text-white py-4 px-8 rounded-xl font-semibold hover:bg-web-primary/90 active:scale-[0.99] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-web-primary/40 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-web-primary/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("buttons.submitting")}
                    </>
                  ) : (
                    <>
                      {t("buttons.submitRFP")}
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  {t("footer.agreement")}{" "}
                  <Link href={`/${locale}/terms-and-conditions`} className="text-web-primary hover:underline">{t("footer.terms")}</Link>
                  {" "}{t("footer.and")}{" "}
                  <Link href={`/${locale}/privacy-policy`} className="text-web-primary hover:underline">{t("footer.privacy")}</Link>
                  {". "}{t("footer.responseTime")}
                </p>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RFPForm;
