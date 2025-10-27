"use client";
import { useLocale, useTranslations } from "next-intl";
import Header from "./Header";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  title: {
    en: string;
    ar: string;
  };
  description?: {
    en: string;
    ar: string;
  };
  image: string;
  _id: string;
}

const DynamicHero = ({
  banners,
  buttons,
}: {
  banners: Banner[];
  buttons?: boolean;
}) => {
  const t = useTranslations("testimonials.hero");
  const locale = useLocale();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  // Resume auto-play after manual navigation
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 3000); // Resume auto-play after 3 seconds of inactivity

      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying, currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Temporarily stop auto-play when user manually navigates
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false); // Temporarily stop auto-play when user manually navigates
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false); // Temporarily stop auto-play when user manually navigates
  };

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div className="w-full flex justify-center">
        <Header className="absolute z-50 w-full md:w-[80%]" />
      </div>

      {/* Main banner container */}
      <div className="relative h-[650px] overflow-hidden">
        {/* Banner slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{
            transform:
              locale === "ar"
                ? `translateX(${currentSlide * 100}%)`
                : `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {banners.map((banner) => (
            <div
              key={banner._id}
              className="w-full h-full flex-shrink-0 bg-web-gray flex flex-col items-center justify-center relative gap-4"
              style={{
                backgroundImage: `url(https://api-strat.othmanconstruction.com/${banner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "rgba(27, 48, 83, 0.4)",
                }}
              ></div>
              <h1 className="text-white text-4xl md:text-6xl font-bold relative z-10 text-center px-4">
                {banner.title[locale as keyof typeof banner.title] ||
                  banner.title.en}
              </h1>
              {banner.description && (
                <div
                  className="text-white text-lg font-medium relative z-10 text-center px-4 max-w-4xl"
                  dangerouslySetInnerHTML={{
                    __html:
                      banner.description[
                        locale as keyof typeof banner.description
                      ] || banner.description.en,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Dots indicator */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Action buttons */}
      {buttons && (
        <div className="flex gap-4 absolute bottom-25 left-1/2 -translate-x-1/2 z-20">
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

export default DynamicHero;
