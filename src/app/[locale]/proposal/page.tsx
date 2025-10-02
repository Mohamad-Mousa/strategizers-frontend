"use client";
import Hero from "@/components/layout/Hero";
import RFPForm from "@/components/RFPForm";
import { useTranslations } from "next-intl";

const ProposalPage = () => {
  const t = useTranslations("proposal");

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <Hero title={t("hero.title")} background="/services.webp" />
      <RFPForm />
    </div>
  );
};

export default ProposalPage;
