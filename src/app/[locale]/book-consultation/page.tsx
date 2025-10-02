"use client";
import Hero from "@/components/layout/Hero";
import ConsultationForm from "@/components/ConsultationForm";
import { useTranslations } from "next-intl";

const BookConsultation = () => {
  const t = useTranslations("bookConsultation");

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <Hero title={t("hero.title")} background="/services.webp" />
      <ConsultationForm />
    </div>
  );
};

export default BookConsultation;
