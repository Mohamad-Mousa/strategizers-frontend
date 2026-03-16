"use client";

import { useLocale, useTranslations } from "next-intl";
import NextImage from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";
import { useWebsite } from "@/hooks/useWebsite";
import { Loader2, AlertCircle } from "lucide-react";

export default function AboutContent() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("about");

  const { website, loading, error, refetchWebsite } = useWebsite();

  // Loading state
  if (loading || !website?.aboutPage) {
    return (
      <section className="max-w-7xl mx-auto mt-20 px-6">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-web-primary" />
            <span className="text-gray-600">{t("loading")}</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="max-w-7xl mx-auto mt-20 px-6">
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4 text-red-600">
            <AlertCircle className="w-8 h-8" />
            <div className="text-center">
              <p className="text-lg font-medium">{t("errors.loadFailed")}</p>
              <p className="text-sm text-gray-600 mt-1">{error}</p>
            </div>
            <button
              onClick={refetchWebsite}
              className="px-6 py-2 bg-web-primary text-white rounded-lg hover:bg-web-primary/90 transition-colors duration-300"
            >
              {t("errors.tryAgain")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto mt-10">
        <NextImage
          src={
            getImageUrl(website?.aboutPage?.banner) || "/1.jpg"
          }
          alt={t("altText.aboutUs")}
          width={500}
          height={500}
        />
        <div className="flex flex-col gap-3">
          <h2
            className="text-2xl font-bold"
            dangerouslySetInnerHTML={{
              __html:
                website?.aboutPage?.shortDescription?.[
                  locale as keyof typeof website.aboutPage.shortDescription
                ] ||
                website?.aboutPage?.shortDescription?.en ||
                "",
            }}
          />
          <p
            className="text-gray-500"
            dangerouslySetInnerHTML={{
              __html:
                website?.aboutPage?.longDescription?.[
                  locale as keyof typeof website.aboutPage.longDescription
                ] ||
                website?.aboutPage?.longDescription?.en ||
                "",
            }}
          />
        </div>
      </div>

      {/* Mission, Vision, Values Section */}
      {website.aboutPage.mission ||
      website.aboutPage.vision ||
      website.aboutPage.values ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ">
          {website.aboutPage.mission && (
            <div className="flex flex-col gap-3 items-center justify-center border border-gray-200 rounded-md transition-all duration-300 cursor-pointer w-full hover:shadow-md hover:border-web-primary">
              <NextImage
                src={
                  getImageUrl(website?.aboutPage?.mission?.image) || "/1.jpg"
                }
                alt={
                  website?.aboutPage?.mission?.title?.[
                    locale as keyof typeof website.aboutPage.mission.title
                  ] || website?.aboutPage?.mission?.title?.en
                }
                width={500}
                height={500}
                className="w-full h-56 object-cover"
              />
              <div className="flex flex-col gap-3 px-6 py-3 items-center justify-center">
                <h2 className="text-xl font-medium">
                  {website?.aboutPage?.mission?.title?.[
                    locale as keyof typeof website.aboutPage.mission.title
                  ] || website?.aboutPage?.mission?.title?.en}
                </h2>
                <div
                  className="text-center"
                  dangerouslySetInnerHTML={{
                    __html:
                      website?.aboutPage?.mission?.description?.[
                        locale as keyof typeof website.aboutPage.mission.description
                      ] ||
                      website?.aboutPage?.mission?.description?.en ||
                      "",
                  }}
                />
              </div>
            </div>
          )}
          {website?.aboutPage?.vision && (
            <div className="flex flex-col gap-3 items-center justify-center border border-gray-200 rounded-md transition-all duration-300 cursor-pointer w-full hover:shadow-md hover:border-web-primary">
              <NextImage
                src={
                  getImageUrl(website?.aboutPage?.vision?.image) || "/1.jpg"
                }
                alt={
                  website?.aboutPage?.vision?.title?.[
                    locale as keyof typeof website.aboutPage.vision.title
                  ] || website?.aboutPage?.vision?.title?.en
                }
                width={500}
                height={500}
                className="w-full h-56 object-cover"
              />
              <div className="flex flex-col gap-3 px-6 py-3 items-center justify-center">
                <h2 className="text-xl font-medium">
                  {website?.aboutPage?.vision?.title?.[
                    locale as keyof typeof website.aboutPage.vision.title
                  ] || website?.aboutPage?.vision?.title?.en}
                </h2>
                <div
                  className="text-center"
                  dangerouslySetInnerHTML={{
                    __html:
                      website?.aboutPage?.vision?.description?.[
                        locale as keyof typeof website.aboutPage.vision.description
                      ] ||
                      website?.aboutPage?.vision?.description?.en ||
                      "",
                  }}
                />
              </div>
            </div>
          )}
          {website?.aboutPage?.values && (
            <div className="flex flex-col gap-3 items-center justify-center border border-gray-200 rounded-md transition-all duration-300 cursor-pointer w-full hover:shadow-md hover:border-web-primary">
              <NextImage
                src={
                  getImageUrl(website?.aboutPage?.values?.image) || "/1.jpg"
                }
                alt={
                  website?.aboutPage?.values?.title?.[
                    locale as keyof typeof website.aboutPage.values.title
                  ] || website?.aboutPage?.values?.title?.en
                }
                width={500}
                height={500}
                className="w-full h-56 object-cover"
              />
              <div className="flex flex-col gap-3 px-6 py-3 items-center justify-center">
                <h2 className="text-xl font-medium">
                  {website?.aboutPage?.values?.title?.[
                    locale as keyof typeof website.aboutPage.values.title
                  ] || website?.aboutPage?.values?.title?.en}
                </h2>
                <div
                  className="text-center"
                  dangerouslySetInnerHTML={{
                    __html:
                      website?.aboutPage?.values?.description?.[
                        locale as keyof typeof website.aboutPage.values.description
                      ] ||
                      website?.aboutPage?.values?.description?.en ||
                      "",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-12">
            <p className="text-gray-500">{t("empty.missionVisionValues")}</p>
          </div>
        </div>
      )}

      {/* Smart Approach Section */}
      <div className="flex flex-col items-center justify-center gap-4 bg-gray-50 py-10">
        <h1 className="text-2xl font-bold">{t("smartApproach.title")}</h1>
        {website.aboutPage.ourSmartApproach &&
        website.aboutPage.ourSmartApproach.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ">
            {website.aboutPage.ourSmartApproach.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-3 items-center justify-center border border-gray-200 rounded-md transition-all duration-300 cursor-pointer w-full hover:shadow-md hover:border-web-primary"
              >
                <NextImage
                  src={
                    getImageUrl(item.image) || "/1.jpg"
                  }
                  alt={
                    item.title[locale as keyof typeof item.title] ||
                    item.title.en
                  }
                  width={500}
                  height={500}
                  className="w-full h-56 object-cover"
                />
                <div className="flex flex-col gap-3 px-6 py-3 items-center justify-center">
                  <h2 className="text-xl font-medium">
                    {item.title[locale as keyof typeof item.title] ||
                      item.title.en}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.subTitle[locale as keyof typeof item.subTitle] ||
                      item.subTitle.en}
                  </p>
                  <div
                    className="text-center"
                    dangerouslySetInnerHTML={{
                      __html:
                        item.description[
                          locale as keyof typeof item.description
                        ] || item.description.en,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-12">
              <p className="text-gray-500">{t("empty.smartApproach")}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-web-primary flex flex-col items-center justify-center gap-4 py-10">
        <h1
          className="text-4xl font-bold text-white"
          dangerouslySetInnerHTML={{
            __html:
              website?.aboutPage?.oppertunitiesSection?.title?.[
                locale as keyof typeof website.aboutPage.oppertunitiesSection.title
              ] ||
              website?.aboutPage?.oppertunitiesSection?.title?.en ||
              "",
          }}
        />
        <p
          className="text-base text-white"
          dangerouslySetInnerHTML={{
            __html:
              website?.aboutPage?.oppertunitiesSection?.description?.[
                locale as keyof typeof website.aboutPage.oppertunitiesSection.description
              ] ||
              website?.aboutPage?.oppertunitiesSection?.description?.en ||
              "",
          }}
        />
        <button
          onClick={() => router.push(`/${locale}/solutions`)}
          className="text-white border-2 border-white px-6 py-2 rounded-full cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
        >
          {t("opportunities.button")}
        </button>
      </div>

      {/* Timeline Section */}
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">
          {website?.aboutPage?.historySection?.title?.[
            locale as keyof typeof website.aboutPage.historySection.title
          ] ||
            website?.aboutPage?.historySection?.title?.en ||
            t("journey.title")}
        </h1>
        {website.aboutPage.historySection?.timeline &&
        website.aboutPage.historySection.timeline.length > 0 ? (
          <div className="max-w-7xl mx-auto w-full px-4">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
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
              className="relative [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto"
            >
              {website?.aboutPage?.historySection?.timeline?.map((i) => (
                <SwiperSlide key={i._id} className="!h-auto">
                  <div className="flex flex-col gap-3 items-center justify-start border border-gray-200 rounded-md transition-all duration-300 cursor-pointer w-full hover:shadow-md hover:border-web-primary py-6 h-full">
                    <NextImage
                      src={
                        getImageUrl(i.image) || "/1.jpg"
                      }
                      alt={t("altText.timeline")}
                      width={500}
                      height={500}
                      className="rounded-full w-32 h-32 flex-shrink-0"
                    />
                    <div className="flex flex-col gap-3 px-6 py-3 items-center justify-start flex-1">
                      <h2 className="text-xl font-bold text-center">
                        {i.title[locale as keyof typeof i.title] || i.title.en}
                      </h2>
                      <small className="text-web-primary text-sm text-center">
                        {i.date
                          ? new Date(i.date).toLocaleDateString(locale, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : ""}
                      </small>
                      <p
                        className="text-center flex-1"
                        dangerouslySetInnerHTML={{
                          __html:
                            i.description[
                              locale as keyof typeof i.description
                            ] || i.description.en,
                        }}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Custom Navigation Buttons */}
              <div
                className={`swiper-button-prev !text-web-primary ${
                  locale === "ar" ? "!right-0" : "!left-0"
                }`}
              ></div>
              <div
                className={`swiper-button-next !text-web-primary ${
                  locale === "ar" ? "!left-0" : "!right-0"
                }`}
              ></div>

              {/* Custom Pagination */}
              <div className="swiper-pagination !relative !mt-8 [&_.swiper-pagination-bullet]:!bg-web-primary [&_.swiper-pagination-bullet-active]:!bg-web-primary [&_.swiper-pagination-bullet]:!mx-1 !cursor-pointer"></div>
            </Swiper>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-12">
              <p className="text-gray-500">{t("empty.timeline")}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-web-primary py-8 flex flex-col md:flex-row items-center justify-between px-4">
        <p className="text-lg text-white">{t("cta.description")}</p>
        <Link
          href={`/${locale}/contact`}
          className="text-white border border-white rounded-full px-8 py-3 font-medium hover:bg-white hover:text-web-primary transition-colors"
        >
          {t("cta.button")}
        </Link>
      </div>
    </section>
  );
}
