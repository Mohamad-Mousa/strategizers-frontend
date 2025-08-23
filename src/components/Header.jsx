"use client";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Header = () => {
  const { locale } = useParams();
  const pathname = usePathname();
  const pageName = pathname.split("/")[2];
  const router = useRouter();

  const settings = useSelector((state) => state.settings.settings);

  // Translation function
  const t = (key) => {
    const translations = {
      en: {
        phone: "Phone",
        email: "Mailus@Strategizers.com",
        stayConnected: "Stay Connected",
        facebook: "Facebook",
        twitter: "Twitter",
        googlePlus: "Google Plus",
        linkedin: "LinkedIn",
        english: "English",
        french: "French",
        german: "German",
        italian: "Italian",
        spanish: "Spanish",
        logoAlt: "Awesome Logo",
        toggleNavigation: "Toggle Navigation",
        home: "Home",
        aboutUs: "ABOUT US",
        about: "About",
        meetOurTeam: "Meet Our Team",
        faqs: "FAQ's",
        testimonials: "Testimonials",
        services: "Services",
        blog: "Blog",
        projects: "Projects",
        contactUs: "Contact Us",
        bookASession: "Book A Session",
      },
      ar: {
        phone: "الهاتف",
        email: "Mailus@Strategizers.com",
        stayConnected: "ابق على تواصل",
        facebook: "فيسبوك",
        twitter: "تويتر",
        googlePlus: "جوجل بلس",
        linkedin: "لينكد إن",
        english: "الإنجليزية",
        french: "الفرنسية",
        german: "الألمانية",
        italian: "الإيطالية",
        spanish: "الإسبانية",
        logoAlt: "شعار رائع",
        toggleNavigation: "تبديل التنقل",
        home: "الرئيسية",
        aboutUs: "من نحن",
        about: "حول",
        meetOurTeam: "تعرف على فريقنا",
        faqs: "الأسئلة الشائعة",
        testimonials: "آراء العملاء",
        services: "الخدمات",
        blog: "المدونة",
        projects: "المشاريع",
        contactUs: "اتصل بنا",
        bookASession: "احجز جلسة",
      },
    };

    return translations[locale]?.[key] || translations.en[key] || key;
  };

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
                        {t("phone")}: +{settings.contact.phone.code}{" "}
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
                <h5>{t("stayConnected")}:</h5>
                <ul className="social-links">
                  {settings?.social?.facebook && (
                    <li>
                      <Link
                        href={settings.social.facebook}
                        target="_blank"
                        aria-label={t("facebook")}
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
                        aria-label={t("twitter")}
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
                        aria-label={t("linkedin")}
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
                        aria-label={t("instagram")}
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
                        aria-label={t("youtube")}
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
                        aria-label={t("tiktok")}
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
                      {locale === "en" ? t("arabic") : t("english")}
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
                      alt={t("logoAlt")}
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
                      aria-label={t("toggleNavigation")}
                    >
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div className="navbar-collapse collapse clearfix">
                    <ul className="navigation clearfix">
                      <li className={pageName === undefined ? "current" : ""}>
                        <Link href={`/${locale}`}>{t("home")}</Link>
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
                        <Link href={`/${locale}/about`}>{t("aboutUs")}</Link>
                        <ul>
                          <li>
                            <Link href={`/${locale}/about`}>{t("about")}</Link>
                          </li>
                          <li>
                            <Link href={`/${locale}/our-team`}>
                              {t("meetOurTeam")}
                            </Link>
                          </li>
                          <li>
                            <Link href={`/${locale}/faq`}>{t("faqs")}</Link>
                          </li>
                          <li>
                            <Link href={`/${locale}/testimonials`}>
                              {t("testimonials")}
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className={pageName === "services" ? "current" : ""}>
                        <Link href={`/${locale}/services`}>
                          {t("services")}
                        </Link>
                      </li>
                      <li className={pageName === "blogs" ? "current" : ""}>
                        <Link href={`/${locale}/blogs`}>{t("blog")}</Link>
                      </li>
                      <li className={pageName === "projects" ? "current" : ""}>
                        <Link href={`/${locale}/projects`}>
                          {t("projects")}
                        </Link>
                      </li>
                      <li className={pageName === "contact" ? "current" : ""}>
                        <Link href={`/${locale}/contact`}>
                          {t("contactUs")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="mainmenu-right-box pull-right clearfix">
                  <div className="quote-button">
                    <a href="#">{t("bookASession")}</a>
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
