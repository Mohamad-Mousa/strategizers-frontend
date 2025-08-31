"use client";

import Link from "next/link";
import { fetchServices } from "../store/slices/servicesSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../store/slices/blogsSlice";

const Footer = () => {
  const { locale } = useParams();
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
  const { blogs } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(
      fetchServices({
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortDirection: "desc",
        term: "",
      })
    );

    dispatch(
      fetchBlogs({
        page: 1,
        limit: 2,
        sortBy: "createdAt",
        sortDirection: "desc",
        term: "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    console.log({ blogs });
  }, [blogs]);

  return (
    <>
      <footer className="footer-area">
        <div className="container">
          <div className="footer-flex-container">
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div
                className="single-footer-widget pd-bottom50 wow fadeInUp"
                data-wow-delay="0.5s"
                data-wow-duration="1s"
                data-wow-offset="0"
              >
                <div className="footer-logo">
                  <a href="index.html">
                    <img
                      src="/images/resources/logo2.png"
                      alt="Awesome Footer Logo"
                    />
                  </a>
                </div>
                <div className="widget-content">
                  <p>
                    {locale === "en"
                      ? "Since our founding, Strategizers has supported businesses across industries by providing expertise in strategy, finance, and organizational development. Our goal is to drive innovation, growth, and sustainable success. We work closely with our clients to understand their unique challenges and design tailored solutions that deliver measurable impact"
                      : "منذ تأسيس ستراتيجايزرز ونحن ندعم الشركات عبر مختلف القطاعات من خلال خبراتنا في الاستراتيجية، والمالية، وتطوير المنظمات. هدفنا هو قيادة الابتكار، وتحقيق النمو، وضمان النجاح المستدام. نعمل بشكل وثيق مع عملائنا لفهم تحدياتهم الفريدة وتصميم حلول مخصصة تحقق نتائج ملموسة. يجمع فريقنا بين المعرفة العميقة بالقطاعات المختلفة والرؤية المستقبلية لاستباق التغيرات واغتنام الفرص. من الشركات الناشئة إلى المؤسسات الراسخة، نساعد المنظمات على بناء المرونة والتكيف مع البيئات المتغيرة"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div
                className="single-footer-widget margin-lft pd-bottom50 wow fadeInUp"
                data-wow-delay="1s"
                data-wow-duration="1s"
                data-wow-offset="0"
              >
                <div className="title">
                  <h3>{locale === "en" ? "Our Services" : "خدماتنا"}</h3>
                  <span className="border"></span>
                </div>
                <ul className="usefull-links">
                  {services?.map((item, index) => (
                    <li key={index}>
                      <Link href={`/${locale}/services/${item.slug}`}>
                        {locale === "en" ? item?.title?.en : item?.title?.ar}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div
                className="single-footer-widget wow fadeInUp"
                data-wow-delay="1.5s"
                data-wow-duration="1s"
                data-wow-offset="0"
              >
                <div className="title">
                  <h3>{locale === "en" ? "Latest Blogs" : "أحدث المدونات"}</h3>
                  <span className="border"></span>
                </div>
                <ul className="latest-post">
                  {blogs?.map((item, index) => (
                    <li key={`blogs-${index}`} className="single-post">
                      <div className="img-holder">
                        <img
                          src={
                            `http://localhost:4000/${item?.image}` ||
                            "/images/services/sustainability.jpg"
                          }
                          alt="Awesome Image"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div className="overlay-style-one">
                          <div className="box">
                            <div className="content">
                              <Link href={`/${locale}/blogs/${item.slug}`}>
                                <i
                                  className="fa fa-link"
                                  aria-hidden="true"
                                ></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-holder">
                        <Link
                          className="post-title"
                          href={`/${locale}/blogs/${item.slug}`}
                        >
                          {locale === "en" ? item?.title?.en : item?.title?.ar}
                        </Link>
                        <div className="post-info">
                          <span>{item?.author}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="latest-more-news">
                  <Link href={`/${locale}/blogs`}>
                    {locale === "en" ? "all" : "الجميع"}
                    <i
                      className={
                        locale === "en"
                          ? "fa fa-caret-right"
                          : "fa fa-caret-left"
                      }
                      aria-hidden="true"
                    ></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div
                className="single-footer-widget martop50 wow fadeInUp"
                data-wow-delay="2s"
                data-wow-duration="1s"
                data-wow-offset="0"
              >
                <div className="title">
                  <h3>{locale === "en" ? "Newsletter" : "النشرة الإخبارية"}</h3>
                  <span className="border"></span>
                </div>
                <div className="newsletter-box">
                  <p>
                    {locale === "en"
                      ? "Sign up today for hints, tips and the latest product news"
                      : "سجل اليوم للحصول على تلميحات ونصائح وأحدث أخبار المنتجات"}
                  </p>
                  <form className="newsletter-form" action="#">
                    <input
                      placeholder={
                        locale === "en" ? "Email Address" : "البريد الإلكتروني"
                      }
                      type="text"
                    />
                    <button type="submit">
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                    <div className="envelope">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </div>
                  </form>
                </div>
              </div>

              <div
                className="single-footer-widget wow fadeInUp"
                data-wow-delay="2.5s"
                data-wow-duration="1s"
                data-wow-offset="0"
              >
                <div className="title">
                  <h3>{locale === "en" ? "Follw Us On" : "تابعنا على"}</h3>
                  <span className="border"></span>
                </div>
                <ul className="footer-social-links">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-skype"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <section className="footer-bottom-area">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="copyright-text">
                <p>
                  {locale === "en" ? (
                    <>
                      Copyrights © 2025 All Rights Reserved, Powered by{" "}
                      <a href="#">Strategizers.</a>
                    </>
                  ) : (
                    <>
                      جميع الحقوق محفوظة © 2025، مدعوم من{" "}
                      <a href="#">ستراتيجايزرز.</a>
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <ul className="footer-menu">
                <li>
                  <Link href={`/${locale}/terms`}>
                    {locale === "en"
                      ? "Terms And Conditions"
                      : "الشروط والأحكام"}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/privacy`}>
                    {locale === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
