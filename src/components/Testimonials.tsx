"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useWebsite } from "@/hooks/useWebsite";
import { useLocale, useTranslations } from "next-intl";
import { AlertCircle, RefreshCw } from "lucide-react";

const Testimonials = () => {
  const { website, loading, error, refetchWebsite } = useWebsite();
  const locale = useLocale();
  const t = useTranslations("testimonialsComponent");
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  // Loading state with skeleton
  if (loading || !website?.homePage?.testimonials) {
    return (
      <div className="relative w-full bg-[#8a3594] py-16 px-4 md:px-8 lg:px-16">
        <div className="w-full">
          {/* Testimonial content skeleton */}
          <div className="text-center text-white">
            {/* Quote skeleton */}
            <div className="space-y-3 mb-6">
              <div className="h-6 bg-white/20 rounded animate-pulse max-w-4xl mx-auto"></div>
              <div className="h-6 bg-white/20 rounded animate-pulse max-w-3xl mx-auto"></div>
              <div className="h-6 bg-white/20 rounded animate-pulse max-w-2xl mx-auto"></div>
            </div>

            {/* Divider skeleton */}
            <div className="w-16 h-px bg-white/30 mx-auto mb-6"></div>

            {/* Author info skeleton */}
            <div className="space-y-2">
              <div className="h-5 bg-white/20 rounded animate-pulse w-48 mx-auto"></div>
              <div className="h-4 bg-white/20 rounded animate-pulse w-32 mx-auto"></div>
            </div>
          </div>

          {/* Pagination dots skeleton */}
          <div className="flex justify-center items-center mt-8 space-x-3">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full bg-white/30 animate-pulse"
              />
            ))}
          </div>

          {/* Navigation buttons skeleton */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative w-full bg-[#8a3594] py-16 px-4 md:px-8 lg:px-16">
        <div className="w-full">
          <div className="flex items-center justify-center py-20">
            <div className="text-center text-white">
              <AlertCircle className="w-12 h-12 text-white mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-semibold mb-2">
                {t("errors.loadFailed")}
              </h3>
              <p className="text-white/80 mb-4">
                {t("errors.loadDescription")}
              </p>
              <button
                onClick={refetchWebsite}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                {t("errors.retry")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-[#8a3594] py-16 px-4 md:px-8 lg:px-16">
      <div className="w-full">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          className="testimonials-swiper"
        >
          {website?.homePage?.testimonials?.map((testimonial) => (
            <SwiperSlide key={testimonial._id}>
              <div className="text-center text-white">
                <blockquote
                  className="text-xl md:text-2xl font-medium mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html:
                      testimonial.description[
                        locale as keyof typeof testimonial.description
                      ] ||
                      testimonial.description.en ||
                      t("defaults.description"),
                  }}
                />

                <div className="w-16 h-px bg-white mx-auto mb-6"></div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">
                    {testimonial.name[locale as keyof typeof testimonial.name]}
                  </h4>
                  <p className="text-sm opacity-90">
                    {
                      testimonial.position[
                        locale as keyof typeof testimonial.position
                      ]
                    }
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Manual Pagination Dots */}
        <div className="flex justify-center items-center mt-8 space-x-3">
          {website?.homePage?.testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full border-2 border-white cursor-pointer transition-all duration-300 hover:bg-white/50 ${
                index === activeIndex ? "bg-white" : "bg-transparent"
              }`}
            />
          ))}
        </div>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#6b2a73] hover:bg-[#5a2460] rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button className="swiper-button-next-custom absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#6b2a73] hover:bg-[#5a2460] rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-button-disabled {
          opacity: 0.5 !important;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
