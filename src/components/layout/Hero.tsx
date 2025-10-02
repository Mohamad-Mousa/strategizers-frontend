"use client";
import { useLocale, useTranslations } from "next-intl";
import Header from "./Header";
import { useRouter } from "next/navigation";

const Hero = ({
  title,
  subtitle,
  background,
  buttons,
}: {
  title: string;
  subtitle?: string;
  background: string;
  buttons?: boolean;
}) => {
  const t = useTranslations("testimonials.hero");
  const locale = useLocale();
  const router = useRouter();
  return (
    <div className="relative w-full">
      <div className="w-full flex justify-center">
        <Header className="absolute z-50 w-full md:w-[80%]" />
      </div>
      <div
        className="bg-web-gray h-[450px] flex flex-col items-center justify-center relative gap-4"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(27, 48, 83, 0.4)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 0",
          }}
        ></div>
        <h1 className="text-white text-6xl font-bold relative z-10">{title}</h1>
        {subtitle && (
          <p className="text-white text-lg font-medium relative z-10">
            {subtitle}
          </p>
        )}
      </div>
      {buttons && (
        <div className="flex gap-4 absolute bottom-25 left-1/2 -translate-x-1/2">
          <button
            onClick={() => router.push(`/${locale}/about`)}
            className="text-white bg-transparent border border-white hover:bg-white hover:text-black transition-all duration-300 rounded-md px-4 py-2 cursor-pointer"
          >
            {t("about")}
          </button>
          <button
            onClick={() => router.push(`/${locale}/contact`)}
            className="text-white bg-web-primary hover:bg-web-primary/80 transition-all duration-300 rounded-md px-4 py-2 cursor-pointer"
          >
            {t("contact")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Hero;
