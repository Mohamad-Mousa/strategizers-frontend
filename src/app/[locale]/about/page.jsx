"use client";
import Slider from "../../../components/Slider";
import ContentSlider from "../../../components/ContentSlider";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const AboutPage = () => {
  const { locale } = useParams();

  const [websiteData, setWebsiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:4000/api/v1/public/website"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setWebsiteData(data.results);
        setError(null);
      } catch (err) {
        console.error("Error fetching website data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsiteData();
  }, []);
  // Show loading state
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "18px",
          color: "red",
        }}
      >
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <section
        className="breadcrumb-area"
        style={{ backgroundImage: "url(/images/resources/breadcrumb-bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumbs">
                <h1>About Us</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-area sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="img-holder">
                <img src={websiteData?.aboutPage?.banner} alt="Awesome Image" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="text-holder">
                <div className="bottom-text">
                  <span>
                    {locale === "en"
                      ? websiteData?.aboutPage?.shortDescription?.en
                      : websiteData?.aboutPage?.shortDescription?.ar}
                  </span>
                  <p>
                    {locale === "en"
                      ? websiteData?.aboutPage?.longDescription?.en
                      : websiteData?.aboutPage?.longDescription?.ar}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row bottom-content">
            <div className="col-md-4">
              <div
                className="single-item wow fadeInUp"
                data-wow-delay="0s"
                data-wow-duration="1s"
                data-wow-offset="0"
              >
                <div className="img-holder">
                  <img
                    src={websiteData?.aboutPage?.mission?.image}
                    alt="Mission"
                  />
                </div>
                <div className="text-holder">
                  <h3>
                    {locale === "en"
                      ? websiteData?.aboutPage?.mission?.title?.en
                      : websiteData?.aboutPage?.mission?.title?.ar}
                  </h3>
                  <p>
                    {locale === "en"
                      ? websiteData?.aboutPage?.mission?.description?.en
                      : websiteData?.aboutPage?.mission?.description?.ar}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="single-item wow fadeInUp"
                data-wow-delay="0s"
                data-wow-duration="1s"
                data-wow-offset="0"
              >
                <div className="img-holder">
                  <img
                    src={websiteData?.aboutPage?.vision?.image}
                    alt="Vision"
                  />
                </div>
                <div className="text-holder">
                  <h3>
                    {locale === "en"
                      ? websiteData?.aboutPage?.vision?.title?.en
                      : websiteData?.aboutPage?.vision?.title?.ar}
                  </h3>
                  <p>
                    {locale === "en"
                      ? websiteData?.aboutPage?.vision?.description?.en
                      : websiteData?.aboutPage?.vision?.description?.ar}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="single-item wow fadeInUp"
                data-wow-delay="0s"
                data-wow-duration="1s"
                data-wow-offset="0"
              >
                <div className="img-holder">
                  <img
                    src={websiteData?.aboutPage?.values?.image}
                    alt="Values"
                  />
                </div>
                <div className="text-holder">
                  <h3>
                    {locale === "en"
                      ? websiteData?.aboutPage?.values?.title?.en
                      : websiteData?.aboutPage?.values?.title?.ar}
                  </h3>
                  <p>
                    {locale === "en"
                      ? websiteData?.aboutPage?.values?.description?.en
                      : websiteData?.aboutPage?.values?.description?.ar}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="smart-approach-area">
        <div className="container">
          <div className="sec-title pdb-50 text-center">
            <h1>Our Smart Approach</h1>
            <span className="border-center"></span>
          </div>
          <div className="row">
            {websiteData?.aboutPage?.ourSmartApproach?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <div className="single-item">
                    <div className="inner-content">
                      <div className="iocn-holder">
                        <span className="flaticon-money"></span>
                      </div>
                      <span className="border"></span>
                      <div className="title-holder">
                        <h3>
                          {locale === "en" ? item.title?.en : item.title?.ar}
                        </h3>
                        <p>
                          {locale === "en"
                            ? item.subTitle?.en
                            : item.subTitle?.ar}
                        </p>
                      </div>
                    </div>
                    <div className="overlay-content">
                      <div className="box">
                        <div className="content">
                          <h3>
                            {locale === "en" ? item.title?.en : item.title?.ar}
                          </h3>
                          <b>
                            {locale === "en"
                              ? item.subTitle?.en
                              : item.subTitle?.ar}
                          </b>
                          <span className="border"></span>
                          <p>
                            {locale === "en"
                              ? item.description?.en
                              : item.description?.ar}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="opportunities-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div
                className="inner-content text-center wow zoomIn"
                data-wow-delay="0.5s"
                data-wow-duration="1s"
                data-wow-offset="0"
              >
                <h1>
                  {locale === "en"
                    ? websiteData?.aboutPage?.oppertunitiesSection?.title?.en
                    : websiteData?.aboutPage?.oppertunitiesSection?.title?.ar}
                </h1>
                <p>
                  {locale === "en"
                    ? websiteData?.aboutPage?.oppertunitiesSection?.description
                        ?.en
                    : websiteData?.aboutPage?.oppertunitiesSection?.description
                        ?.ar}
                </p>
                <Link href={`/${locale}/services`}>
                  {locale === "en" ? "View Services" : "عرض الخدمات"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="history-area sec-padding">
        <div className="container">
          <div className="sec-title pdb-50 text-center">
            <h1>
              {locale === "en"
                ? websiteData?.aboutPage?.historySection?.title?.en
                : websiteData?.aboutPage?.historySection?.title?.ar}
            </h1>
            <span className="border-center"></span>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <ContentSlider
                items={websiteData?.aboutPage?.historySection?.timeline?.map(
                  (item) => ({
                    image: item.image,
                    title: locale === "en" ? item.title?.en : item.title?.ar,
                    date: new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }),
                    description:
                      locale === "en"
                        ? item.description?.en
                        : item.description?.ar,
                  })
                )}
                className="history-carousel"
                slidesPerView={3}
                spaceBetween={30}
                autoplay={true}
                loop={true}
                navigation={true}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="achivements-area sec-padding">
        <div className="container">
          <div className="sec-title pdb-50">
            <h1>{locale === "en" ? "Our Achievements" : "الإنجازات"}</h1>
            <span className="border"></span>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Slider
                images={[
                  {
                    src: "/images/about/achivements-1.jpg",
                    alt: "Achievement 1",
                  },
                  {
                    src: "/images/about/achivements-2.jpg",
                    alt: "Achievement 2",
                  },
                  {
                    src: "/images/about/achivements-3.jpg",
                    alt: "Achievement 3",
                  },
                  {
                    src: "/images/about/achivements-4.jpg",
                    alt: "Achievement 4",
                  },
                  {
                    src: "/images/about/achivements-1.jpg",
                    alt: "Achievement 5",
                  },
                  {
                    src: "/images/about/achivements-2.jpg",
                    alt: "Achievement 6",
                  },
                  {
                    src: "/images/about/achivements-3.jpg",
                    alt: "Achievement 7",
                  },
                  {
                    src: "/images/about/achivements-4.jpg",
                    alt: "Achievement 8",
                  },
                ]}
                className="achivement-carousel"
                slidesPerView={4}
                spaceBetween={30}
                autoplay={true}
                loop={true}
                navigation={true}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="footer-top-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title pull-left">
                <h3>
                  {locale === "en"
                    ? "Over 20 years of experience we'll ensure you get the best guidance."
                    : "20 عاما من الخبرة نضمن لك الحصول على أفضل الموجهات."}
                </h3>
              </div>
              <div className="button pull-right">
                <a className="thm-btn bgclr-1" href="#">
                  {locale === "en" ? "Request Quote" : "طلب عرض"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
