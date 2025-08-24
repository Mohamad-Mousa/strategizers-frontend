"use client";
import { useTranslation } from "../../hooks/useTranslation";
import { useLanguage } from "../../components/LanguageProvider";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useRouter } from "next/navigation";
import { use } from "react";
import Slider from "../../components/Slider";
import TestimonialsSlider from "../../components/TestimonialsSlider";

export default function LocalePage({ params }) {
  const { locale } = use(params);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const router = useRouter();

  const handleLanguageChange = (newLocale) => {
    // Navigate to the new locale
    router.push(`/${newLocale}`);
  };

  return (
    <div>
      <section className="rev_slider_wrapper">
        <div id="slider1" className="rev_slider" data-version="5.0">
          <ul>
            <li data-transition="rs-20">
              <img
                src="images/slides/1.jpg"
                alt=""
                width="1920"
                height="800"
                data-bgposition="top center"
                data-bgfit="cover"
                data-bgrepeat="no-repeat"
                data-bgparallax="1"
              />

              <div
                className="tp-caption tp-resizeme"
                data-x="left"
                data-hoffset="0"
                data-y="top"
                data-voffset="310"
                data-transform_idle="o:1;"
                data-transform_in="x:[-175%];y:0px;z:0;rX:0;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0.01;s:3000;e:Power3.easeOut;"
                data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                data-mask_in="x:[100%];y:0;s:inherit;e:inherit;"
                data-splitin="none"
                data-splitout="none"
                data-responsive_offset="on"
                data-start="700"
              >
                <div className="slide-content-box mar-lft">
                  <h1>
                    Looking for first class
                    <br />
                    business plan?
                  </h1>
                  <p>
                    With over 10 years of experience helping businesses to find
                    <br />
                    comprehensive solutions.
                  </p>
                </div>
              </div>
              <div
                className="tp-caption tp-resizeme"
                data-x="left"
                data-hoffset="0"
                data-y="top"
                data-voffset="558"
                data-transform_idle="o:1;"
                data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;"
                data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                data-splitin="none"
                data-splitout="none"
                data-responsive_offset="on"
                data-start="2300"
              >
                <div className="slide-content-box mar-lft">
                  <div className="button">
                    <a className="" href="#">
                      Our Company
                    </a>
                    <a className="btn-style-two" href="#">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li data-transition="fade">
              <img
                src="images/slides/2.jpg"
                alt=""
                width="1920"
                height="800"
                data-bgposition="top center"
                data-bgfit="cover"
                data-bgrepeat="no-repeat"
                data-bgparallax="1"
              />

              <div
                className="tp-caption tp-resizeme slogan"
                data-x="center"
                data-hoffset="0"
                data-y="center"
                data-voffset="-65"
                data-transform_idle="o:1;"
                data-transform_in="x:[-175%];y:0px;z:0;rX:0;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0.01;s:3000;e:Power3.easeOut;"
                data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                data-mask_in="x:[100%];y:0;s:inherit;e:inherit;"
                data-splitin="none"
                data-splitout="none"
                data-start="500"
              >
                <div className="slide-content-box middle-slide">
                  <h1>Plan for tomorrow & live for today</h1>
                </div>
              </div>
              <div
                className="tp-caption tp-resizeme"
                data-x="center"
                data-hoffset="0"
                data-y="center"
                data-voffset="13"
                data-transform_idle="o:1;"
                data-transform_in="x:[175%];y:0px;z:0;rX:0;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0.01;s:3000;e:Power3.easeOut;"
                data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                data-mask_in="x:[-100%];y:0;s:inherit;e:inherit;"
                data-splitin="none"
                data-splitout="none"
                data-responsive_offset="on"
                data-start="1500"
              >
                <div className="slide-content-box middle-slide">
                  <p>
                    With over 10 years of experience helping businesses to find
                    <br />
                    comprehensive solutions.
                  </p>
                </div>
              </div>
              <div
                className="tp-caption tp-resizeme"
                data-x="center"
                data-hoffset="0"
                data-y="center"
                data-voffset="100"
                data-transform_idle="o:1;"
                data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;"
                data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                data-splitin="none"
                data-splitout="none"
                data-responsive_offset="on"
                data-start="2300"
              >
                <div className="slide-content-box middle-slide">
                  <div className="button">
                    <a className="#" href="#">
                      Our Company
                    </a>
                    <a className="btn-style-two" href="#">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li data-transition="fade">
              <img
                src="images/slides/3.jpg"
                alt=""
                width="1920"
                height="800"
                data-bgposition="top center"
                data-bgfit="cover"
                data-bgrepeat="no-repeat"
                data-bgparallax="1"
              />

              <div
                className="tp-caption tp-resizeme"
                data-x="right"
                data-hoffset="0"
                data-y="top"
                data-voffset="310"
                data-transform_idle="o:1;"
                data-transform_in="x:[-175%];y:0px;z:0;rX:0;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0.01;s:3000;e:Power3.easeOut;"
                data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                data-mask_in="x:[100%];y:0;s:inherit;e:inherit;"
                data-splitin="none"
                data-splitout="none"
                data-responsive_offset="on"
                data-start="700"
              >
                <div className="slide-content-box">
                  <h1>
                    Choose right solution
                    <br />
                    for your business
                  </h1>
                  <p>
                    With over 10 years of experience helping businesses to find
                    <br />
                    comprehensive solutions.
                  </p>
                </div>
              </div>

              <div
                className="tp-caption tp-resizeme"
                data-x="center"
                data-hoffset="135"
                data-y="top"
                data-voffset="558"
                data-transform_idle="o:1;"
                data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;"
                data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                data-splitin="none"
                data-splitout="none"
                data-responsive_offset="on"
                data-start="2300"
              >
                <div className="slide-content-box mar-lft">
                  <div className="button">
                    <a className="" href="#">
                      Our Company
                    </a>
                    <a className="btn-style-two" href="#">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section className="welcome-area sec-padding">
        <div className="container">
          <div className="sec-title text-center">
            <h1>Welcome to the Strategizers</h1>
            <span className="border-center"></span>
            <p>
              We are experts in this industry with over 100 years experience.
              What that means is you are going to get right solution. please
              find our services.
            </p>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="single-service-item text-center">
                <div className="img-holder">
                  <img src="images/services/1.jpg" alt="Awesome Image" />
                  <div className="overlay-style-one">
                    <div className="box">
                      <div className="content">
                        <a href="#">
                          <i className="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-holder">
                  <div className="text">
                    <a href="#">
                      <h3 className="title">About Business</h3>
                    </a>
                    <p>
                      We have built enviable reputation in all the consumer
                      goods, heavy industry, hightech & manufacturing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="single-service-item text-center">
                <div className="img-holder">
                  <img src="images/services/2.jpg" alt="Awesome Image" />
                  <div className="overlay-style-one">
                    <div className="box">
                      <div className="content">
                        <a href="#">
                          <i className="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-holder">
                  <div className="text">
                    <a href="#">
                      <h3 className="title">Advanced Analytics</h3>
                    </a>
                    <p>
                      Business analytics (BA) is the practice ofiterative,
                      methodical exploration of our organization's data
                      emphasis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="single-service-item text-center">
                <div className="img-holder">
                  <img src="images/services/3.jpg" alt="Awesome Image" />
                  <div className="overlay-style-one">
                    <div className="box">
                      <div className="content">
                        <a href="#">
                          <i className="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-holder">
                  <div className="text">
                    <a href="#">
                      <h3 className="title">Customer Insignts</h3>
                    </a>
                    <p>
                      Customer Insight Analytics solutions delivertargeted and
                      actionable customer analysis thathelp financial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="service-area">
        <div className="container">
          <div className="sec-title pdb-50">
            <h1>Our Services</h1>
            <span className="border"></span>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="servicecarousel">
                <div className="single-item text-center">
                  <div className="item">
                    <div className="icon-holder">
                      <span className="flaticon-stats"></span>
                      <h3>Business Growth</h3>
                    </div>
                    <div className="text-holder">
                      <p>
                        The process of improving some of our an enterprise's
                        success. Business growth can be a achieved.
                      </p>
                      <a className="thm-btn bgclr-1" href="#">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>

                <div className="single-item text-center">
                  <div className="item">
                    <div className="icon-holder">
                      <span className="flaticon-light-bulb"></span>
                      <h3>Sustainability</h3>
                    </div>
                    <div className="text-holder">
                      <p>
                        When it comes to sustainability & corporate
                        responsibility, we believe thenormal rules of business.
                      </p>
                      <a className="thm-btn bgclr-1" href="#">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>

                <div className="single-item text-center">
                  <div className="item">
                    <div className="icon-holder">
                      <span className="flaticon-business"></span>
                      <h3>Performance</h3>
                    </div>
                    <div className="text-holder">
                      <p>
                        In a contract, performance deemed to be the fulfillment
                        of an obligation in a manner that releases.
                      </p>
                      <a className="thm-btn bgclr-1" href="#">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>

                <div className="single-item text-center">
                  <div className="item">
                    <div className="icon-holder">
                      <span className="flaticon-computer"></span>
                      <h3>Organization</h3>
                    </div>
                    <div className="text-holder">
                      <p>
                        We help business improve financial performaance by
                        ensuring the entire organization system is aligned.
                      </p>
                      <a className="thm-btn bgclr-1" href="#">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-area sec-padding">
        <div className="container">
          <div className="sec-title pdb-50 text-center">
            <h1>About Our Company</h1>
            <span className="border-center"></span>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="img-holder">
                <img src="images/about/about-company.jpg" alt="Awesome Image" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="text-holder">
                <div className="top-text">
                  <h3>
                    We are always looking for specific approach to each cases &
                    Provide full solutions.
                  </h3>
                  <p>
                    We have built an enviable reputation in the consumer goods,
                    heavy industry, high-tech, manufacturing, medical,
                    recreational vehicle, and transportation sectors.
                    multidisciplinary team of engineering experts, who loves or
                    pursues or desires to obtain pain of itself, because it is
                    pain occasionally.
                  </p>
                </div>
                <div className="bottom-text">
                  <span>Reliable & Trustworthy</span>
                  <p>
                    Who loves or pursues or desires to obtain pain of itself,
                    because it is pain, but because occasionally circumstances
                    occur in which toil and pain desires to obtain pain of
                    itself, because it is pain, but because occur in which toil
                    and pain.
                  </p>
                </div>
                <div className="bottom">
                  <a className="readmore thm-btn bgclr-1" href="#">
                    Read More
                  </a>
                  <div className="signature">
                    <img src="images/about/signature.png" alt="Signature" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="promotion-box">
            <div className="row">
              <div className="col-md-4">
                <div className="singel-box hvr-float">
                  <div className="top">
                    <div className="icon-holder">
                      <span className="flaticon-innovation"></span>
                    </div>
                    <div className="title-holder">
                      <h3>Innovative Works</h3>
                    </div>
                  </div>
                  <div className="text-holder">
                    <p>
                      How all this mistaken idea of denouncing pleasures and
                      praising pain was born and we will give you a complete
                      account of the system.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="singel-box hvr-float">
                  <div className="top">
                    <div className="icon-holder">
                      <span className="flaticon-shapes"></span>
                    </div>
                    <div className="title-holder">
                      <h3>Certified Company</h3>
                    </div>
                  </div>
                  <div className="text-holder">
                    <p>
                      Ever undertakes laborious physical exercise, except to
                      obtain some advantage from it. To find fault with a
                      consequences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="singel-box hvr-float">
                  <div className="top">
                    <div className="icon-holder">
                      <span className="flaticon-suitcase"></span>
                    </div>
                    <div className="title-holder">
                      <h3>Very Experinced</h3>
                    </div>
                  </div>
                  <div className="text-holder">
                    <p>
                      Again is there anyone who loves or pursues desires to
                      obtain pain of itself, because it pain, but because
                      circumstances great pleasure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialsSlider />
      <section className="consultations-area sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="contact-info">
                <div className="sec-title">
                  <h2>Contact Details</h2>
                  <span className="border"></span>
                </div>
                <div className="text">
                  <p>
                    Please find below contact details <br />
                    and contact us today!
                  </p>
                </div>
                <ul>
                  <li>
                    <span className="fa fa-phone"></span>Phone: +321 456 78 901
                  </li>
                  <li>
                    <span className="fa fa-envelope"></span>
                    Mailus@Strategizers.com
                  </li>
                  <li>
                    <span className="fa fa-clock-o"></span>Apple Street, New
                    York, USA
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8 col-sm-12 col-xs-12">
              <div className="request-form">
                <div className="sec-title pdb-50">
                  <h1>Request For Call Back</h1>
                  <span className="border"></span>
                </div>
                <form
                  id="request-form"
                  name="request-form"
                  action="inc/sendmail.php"
                  method="post"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="form_name"
                        value=""
                        placeholder="Name *"
                        required=""
                      />
                      <input
                        type="text"
                        name="form_phone"
                        value=""
                        placeholder="Ph Num"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="form_email"
                        value=""
                        placeholder="Email *"
                        required=""
                      />
                      <select className="selectmenu">
                        <option selected="selected">Enquiry About</option>
                        <option>Business Growth</option>
                        <option>Sustainability</option>
                        <option>Performance</option>
                        <option>Advanced Analytics</option>
                        <option>Organization</option>
                        <option>Customer Insights</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button className="thm-btn bgclr-1" type="submit">
                        Submit Now
                      </button>
                      <div className="text">
                        <p>
                          <i className="fa fa-clock-o" aria-hidden="true"></i>We
                          are Opened: Monday to Saturday: 9.00am to 16.pm.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="latest-blog-area sec-padding">
        <div className="container">
          <div className="sec-title pdb-50 text-center">
            <h1>Latest From Blog</h1>
            <span className="border-center"></span>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="single-blog-item">
                <div className="img-holder">
                  <img
                    src="images/blog/latest-blog-1.jpg"
                    alt="Awesome Image"
                  />
                  <div className="overlay-style-one">
                    <div className="box">
                      <div className="content">
                        <a href="blog-single.html">
                          <i className="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="post-date">
                    <h5>14 Aprl</h5>
                  </div>
                </div>
                <div className="text-holder">
                  <ul className="meta-info">
                    <li>
                      <a href="#">by fletcher</a>
                    </li>
                    <li>
                      <a href="#">Marketing</a>
                    </li>
                  </ul>
                  <a href="blog-single.html">
                    <h3 className="blog-title">
                      Retail banks wake up to digital
                    </h3>
                  </a>
                  <div className="text">
                    <p>
                      know how to pursue pleasure rationally seds encounter
                      consequences.
                    </p>
                  </div>
                  <div className="bottom">
                    <div className="left pull-left">
                      <a href="#">Read More</a>
                    </div>
                    <div className="right pull-right">
                      <h5>
                        <span className="flaticon-interface"></span>15
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="single-blog-item">
                <div className="img-holder">
                  <img
                    src="images/blog/latest-blog-2.jpg"
                    alt="Awesome Image"
                  />
                  <div className="overlay-style-one">
                    <div className="box">
                      <div className="content">
                        <a href="blog-single.html">
                          <i className="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="post-date">
                    <h5>24 Mar</h5>
                  </div>
                </div>
                <div className="text-holder">
                  <ul className="meta-info">
                    <li>
                      <a href="#">by georgly</a>
                    </li>
                    <li>
                      <a href="#">Financial</a>
                    </li>
                  </ul>
                  <a href="blog-single.html">
                    <h3 className="blog-title">Create great WordPress theme</h3>
                  </a>
                  <div className="text">
                    <p>
                      Desires to obtain pain ut of itself, because it is pain
                      because occasionally.
                    </p>
                  </div>
                  <div className="bottom">
                    <div className="left pull-left">
                      <a href="#">Read More</a>
                    </div>
                    <div className="right pull-right">
                      <h5>
                        <span className="flaticon-interface"></span>08
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="single-blog-item">
                <div className="img-holder">
                  <img
                    src="images/blog/latest-blog-3.jpg"
                    alt="Awesome Image"
                  />
                  <div className="overlay-style-one">
                    <div className="box">
                      <div className="content">
                        <a href="blog-single.html">
                          <i className="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="post-date">
                    <h5>05 Jan</h5>
                  </div>
                </div>
                <div className="text-holder">
                  <ul className="meta-info">
                    <li>
                      <a href="#">by fernancy</a>
                    </li>
                    <li>
                      <a href="#">Consulting</a>
                    </li>
                  </ul>
                  <a href="blog-single.html">
                    <h3 className="blog-title">
                      How to improve employees skills
                    </h3>
                  </a>
                  <div className="text">
                    <p>
                      Great pleasure to take a trivial example, which of us
                      undertakes laborious.
                    </p>
                  </div>
                  <div className="bottom">
                    <div className="left pull-left">
                      <a href="#">Read More</a>
                    </div>
                    <div className="right pull-right">
                      <h5>
                        <span className="flaticon-interface"></span>12
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="project-faq-area sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div className="sec-title pdb-50">
                <h1>Latest Projects</h1>
                <span className="border"></span>
              </div>
              <div className="latest-project">
                <div className="single-project-item">
                  <div className="img-holder">
                    <img
                      src="images/projects/latest-project-1.jpg"
                      alt="Awesome Image"
                    />
                    <div className="overlay-style-one">
                      <div className="box">
                        <div className="content">
                          <a href="projects-single.html">
                            <i className="fa fa-link" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single-project-item">
                  <div className="img-holder">
                    <img
                      src="images/projects/latest-project-2.jpg"
                      alt="Awesome Image"
                    />
                    <div className="overlay-style-one">
                      <div className="box">
                        <div className="content">
                          <a href="projects-single.html">
                            <i className="fa fa-link" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single-project-item">
                  <div className="img-holder">
                    <img
                      src="images/projects/latest-project-3.jpg"
                      alt="Awesome Image"
                    />
                    <div className="overlay-style-one">
                      <div className="box">
                        <div className="content">
                          <a href="projects-single.html">
                            <i className="fa fa-link" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single-project-item">
                  <div className="img-holder">
                    <img
                      src="images/projects/latest-project-4.jpg"
                      alt="Awesome Image"
                    />
                    <div className="overlay-style-one">
                      <div className="box">
                        <div className="content">
                          <a href="projects-single.html">
                            <i className="fa fa-link" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single-project-item">
                  <div className="img-holder">
                    <img
                      src="images/projects/latest-project-5.jpg"
                      alt="Awesome Image"
                    />
                    <div className="overlay-style-one">
                      <div className="box">
                        <div className="content">
                          <a href="projects-single.html">
                            <i className="fa fa-link" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single-project-item">
                  <div className="img-holder">
                    <img
                      src="images/projects/latest-project-6.jpg"
                      alt="Awesome Image"
                    />
                    <div className="overlay-style-one">
                      <div className="box">
                        <div className="content">
                          <a href="projects-single.html">
                            <i className="fa fa-link" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div className="faq-content">
                <div className="sec-title pdb-50">
                  <h1>Frequently Asked Questions</h1>
                  <span className="border"></span>
                  <p>
                    These are just some of the most common questions we get
                    asked. For anything else, please contact us – we would be
                    delighted to help.
                  </p>
                </div>
                <div className="accordion-box">
                  <div className="accordion accordion-block">
                    <div className="accord-btn">
                      <h4>What is the procedure to join with your company?</h4>
                    </div>
                    <div className="accord-content">
                      <p>
                        The master-builder of human happiness one rejects,
                        dislikes sed avoid packages and web page editors now use
                        uncover.
                      </p>
                    </div>
                  </div>
                  <div className="accordion accordion-block">
                    <div className="accord-btn active">
                      <h4>Do you give any offer for premium customer?</h4>
                    </div>
                    <div className="accord-content collapsed">
                      <p>
                        The master-builder of human happiness one rejects,
                        dislikes sed avoid packages and web page editors now use
                        uncover.
                      </p>
                    </div>
                  </div>
                  <div className="accordion accordion-block last">
                    <div className="accord-btn last">
                      <h4>What makes you special from others?</h4>
                    </div>
                    <div className="accord-content">
                      <p>
                        The master-builder of human happiness one rejects,
                        dislikes sed avoid packages and web page editors now use
                        uncover.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="achivements-area sec-padding">
        <div className="container">
          <div className="sec-title pdb-50">
            <h1>{t("about.achievements")}</h1>
            <span className="border"></span>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Slider
                images={[
                  {
                    src: "/images/brand/1.png",
                    alt: "Achievement 1",
                  },
                  {
                    src: "/images/brand/2.png",
                    alt: "Achievement 2",
                  },
                  {
                    src: "/images/brand/3.png",
                    alt: "Achievement 3",
                  },
                  {
                    src: "/images/brand/4.png",
                    alt: "Achievement 4",
                  },
                  {
                    src: "/images/brand/5.png",
                    alt: "Achievement 5",
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
    </div>
  );
}
