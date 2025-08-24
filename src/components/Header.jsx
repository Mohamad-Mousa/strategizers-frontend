"use client";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslation } from "../hooks/useTranslation";

const Header = () => {
  const { locale } = useParams();
  const pathname = usePathname();
  const pageName = pathname.split("/")[2];
  const router = useRouter();
  const { t } = useTranslation();

  const settings = useSelector((state) => state.settings.settings);

  const handleLanguageChange = (newLocale) => {
    // Get the current path without the locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    // Navigate to the new locale with the same path
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <>
      {/* <div className="preloader"></div> */}
      <section className="top-bar-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12">
              <div className="top-left">
                <ul className="top-contact-info">
                  {settings?.contact?.phone?.code &&
                    settings?.contact?.phone?.number && (
                      <li>
                        <span className="flaticon-technology"></span>
                        {t("header.phone")}: +{settings.contact.phone.code}{" "}
                        {settings.contact.phone.number}
                      </li>
                    )}
                  {settings?.contact?.email && (
                    <li>
                      <span className="flaticon-contact"></span>
                      {settings.contact.email}
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12">
              <div className="top-right clearfix">
                <h5>{t("header.stayConnected")}:</h5>
                <ul className="social-links">
                  {settings?.social?.facebook && (
                    <li>
                      <Link
                        href={settings.social.facebook}
                        target="_blank"
                        aria-label={t("header.facebook")}
                      >
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                  )}
                  {settings?.social?.twitter && (
                    <li>
                      <Link
                        href={settings.social.twitter}
                        target="_blank"
                        aria-label={t("header.twitter")}
                      >
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li>
                  )}
                  {settings?.social?.linkedin && (
                    <li>
                      <Link
                        href={settings.social.linkedin}
                        target="_blank"
                        aria-label={t("header.linkedin")}
                      >
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                  )}
                  {settings?.social?.instagram && (
                    <li>
                      <Link
                        href={settings.social.instagram}
                        target="_blank"
                        aria-label={t("header.instagram")}
                      >
                        <i className="fa fa-instagram"></i>
                      </Link>
                    </li>
                  )}
                  {settings?.social?.youtube && (
                    <li>
                      <Link
                        href={settings.social.youtube}
                        target="_blank"
                        aria-label={t("header.youtube")}
                      >
                        <i className="fa fa-youtube"></i>
                      </Link>
                    </li>
                  )}
                  {settings?.social?.tiktok && (
                    <li>
                      <Link
                        href={settings.social.tiktok}
                        target="_blank"
                        aria-label={t("header.tiktok")}
                      >
                        <i className="fa fa-music"></i>
                      </Link>
                    </li>
                  )}
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLanguageChange(locale === "en" ? "ar" : "en");
                      }}
                    >
                      {locale === "en"
                        ? t("header.arabic")
                        : t("header.english")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mainmenu-area stricky">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="mainmenu-bg clearfix">
                <div className="logo pull-left">
                  <a href="index.html">
                    <img
                      src="/images/resources/logo2.png"
                      alt={t("header.logoAlt")}
                      style={{
                        objectFit: "contain",
                        width: "244px",
                        height: "45px",
                      }}
                    />
                  </a>
                </div>
                <nav className="main-menu pull-left">
                  <div className="navbar-header">
                    <button
                      type="button"
                      className="navbar-toggle"
                      data-toggle="collapse"
                      data-target=".navbar-collapse"
                      aria-label={t("header.toggleNavigation")}
                    >
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div className="navbar-collapse collapse clearfix">
                    <ul className="navigation clearfix">
                      <li className={pageName === undefined ? "current" : ""}>
                        <Link href={`/${locale}`}>{t("header.home")}</Link>
                      </li>
                      <li
                        className={
                          pageName === "about" ||
                          pageName === "our-team" ||
                          pageName === "faq" ||
                          pageName === "testimonials"
                            ? "current"
                            : "dropdown"
                        }
                      >
                        <Link href={`/${locale}/about`}>
                          {t("header.aboutUs")}
                        </Link>
                        <ul>
                          <li>
                            <Link href={`/${locale}/about`}>
                              {t("header.about")}
                            </Link>
                          </li>
                          <li>
                            <Link href={`/${locale}/our-team`}>
                              {t("header.meetOurTeam")}
                            </Link>
                          </li>
                          <li>
                            <Link href={`/${locale}/faq`}>
                              {t("header.faqs")}
                            </Link>
                          </li>
                          <li>
                            <Link href={`/${locale}/testimonials`}>
                              {t("header.testimonials")}
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className={pageName === "services" ? "current" : ""}>
                        <Link href={`/${locale}/services`}>
                          {t("header.services")}
                        </Link>
                      </li>
                      <li className={pageName === "blogs" ? "current" : ""}>
                        <Link href={`/${locale}/blogs`}>
                          {t("header.blog")}
                        </Link>
                      </li>
                      <li className={pageName === "projects" ? "current" : ""}>
                        <Link href={`/${locale}/projects`}>
                          {t("header.projects")}
                        </Link>
                      </li>
                      <li className={pageName === "contact" ? "current" : ""}>
                        <Link href={`/${locale}/contact`}>
                          {t("header.contactUs")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="mainmenu-right-box pull-right clearfix">
                  <div className="quote-button">
                    <a href="#">{t("header.bookASession")}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
