"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const Header = () => {
  const { locale } = useParams();

  return (
    <>
      {/* <div className="preloader"></div> */}
      <section className="top-bar-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12">
              <div className="top-left">
                <ul className="top-contact-info">
                  <li>
                    <span className="flaticon-technology"></span>Phone: (123)
                    0200 12345
                  </li>
                  <li>
                    <span className="flaticon-contact"></span>
                    Mailus@Strategizers.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12">
              <div className="top-right clearfix">
                <h5>Stay Connected:</h5>
                <ul className="social-links">
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
                </ul>
                <div className="language-switcher">
                  <div id="polyglotLanguageSwitcher">
                    <form action="#">
                      <select id="polyglot-language-options">
                        <option id="en" value="en">
                          English
                        </option>
                        <option id="fr" value="fr">
                          French
                        </option>
                        <option id="de" value="de">
                          German
                        </option>
                        <option id="it" value="it">
                          Italian
                        </option>
                        <option id="es" value="es">
                          Spanish
                        </option>
                      </select>
                    </form>
                  </div>
                </div>
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
                      alt="Awesome Logo"
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
                    >
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div className="navbar-collapse collapse clearfix">
                    <ul className="navigation clearfix">
                      <li>
                        <Link href={`/${locale}`}>Home</Link>
                      </li>
                      <li className="dropdown">
                        <Link href={`/${locale}/about`}>ABOUT US</Link>
                        <ul>
                          <li>
                            <Link href={`/${locale}/about`}>About</Link>
                          </li>
                          <li>
                            <Link href={`/${locale}/our-team`}>
                              Meet Our Team
                            </Link>
                          </li>
                          <li>
                            <Link href={`/${locale}/faq`}>FAQ's</Link>
                          </li>
                          <li>
                            <Link href={`/${locale}/testimonials`}>
                              Testimonials
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href={`/${locale}/services`}>Services</Link>
                      </li>
                      <li>
                        <Link href={`/${locale}/blogs`}>Blog</Link>
                      </li>
                      <li>
                        <Link href={`/${locale}/projects`}>Projects</Link>
                      </li>
                      <li className="current">
                        <Link href={`/${locale}/contact`}>Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="mainmenu-right-box pull-right clearfix">
                  <div className="quote-button">
                    <a href="#">Book A Session</a>
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
