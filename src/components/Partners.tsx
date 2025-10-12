"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PartnerCard from "./PartnerCard";
import { useWebsite } from "@/hooks/useWebsite";
import { useLocale, useTranslations } from "next-intl";
import { AlertCircle, RefreshCw } from "lucide-react";

const Partners = () => {
  const { website, loading, error, refetchWebsite } = useWebsite();
  const locale = useLocale();
  const t = useTranslations("partnersComponent");

  // Loading state with skeleton
  if (loading || !website?.homePage?.partners) {
    return (
      <section className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-8 w-full">
        <div className="relative flex flex-col items-center justify-center">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-48 mb-2"></div>
          <hr className="w-1/3 border-gray-200 border-1 absolute bottom-0" />
        </div>
        <div className="container w-full">
          {/* Partners carousel skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center"
              >
                {/* Partner logo skeleton */}
                <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("errors.loadFailed")}
            </h3>
            <p className="text-gray-600 mb-4">{t("errors.loadDescription")}</p>
            <button
              onClick={refetchWebsite}
              className="inline-flex items-center gap-2 px-4 py-2 bg-web-primary text-white rounded-lg hover:bg-web-primary/90 transition-colors duration-300"
            >
              <RefreshCw className="w-4 h-4" />
              {t("errors.retry")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-8 w-full">
      <div className="relative flex flex-col items-center justify-center">
        <h1 className="border-b border-gray-200 pb-2 text-3xl font-normal text-center max-w-5xl">
          {t("title")}
        </h1>
        <hr className="w-1/3 border-web-primary border-1 absolute bottom-0" />
      </div>
      <div className="container">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={false}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className="partners-swiper"
        >
          {website?.homePage?.partners?.map((partner, index) => (
            <SwiperSlide key={index}>
              <PartnerCard
                logo={
                  partner?.image
                    ? `https://api-strat.othmanconstruction.com/${partner.image}`
                    : "/1.jpg"
                }
                name={partner.title[locale as keyof typeof partner.title]}
                alt={partner.title[locale as keyof typeof partner.title]}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Partners;
