"use client";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchServiceBySlug,
  fetchServices,
} from "../../../../store/slices/servicesSlice";
import Link from "next/link";

const SingleServicePage = () => {
  const dispatch = useDispatch();
  const contactTeam = useSelector((state) => state.settings.contactTeam);
  const { currentService, singleLoading, singleError, services } = useSelector(
    (state) => state.services
  );
  console.log(services);

  const { locale, slug } = useParams();

  // Extract the service slug from the URL
  const serviceSlug = Array.isArray(slug) ? slug.join("/") : slug;

  useEffect(() => {
    if (serviceSlug) {
      dispatch(fetchServiceBySlug(serviceSlug));
      dispatch(
        fetchServices({
          page: 1,
          limit: 100,
          sortBy: "createdAt",
          sortDirection: "desc",
          term: "",
        })
      );
    }
  }, [dispatch, serviceSlug]);

  // Console.log the service data
  useEffect(() => {
    if (currentService) {
      console.log("Single Service Data:", currentService);
    }
  }, [currentService]);

  // Console.log loading and error states
  useEffect(() => {
    console.log("Service Loading:", singleLoading);
    console.log("Service Error:", singleError);
  }, [singleLoading, singleError]);

  console.log(services);

  return (
    <div>
      <section
        className="breadcrumb-area"
        style={{
          backgroundImage: `url(http://localhost:4000/${currentService?.banner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumbs">
                <h1>{currentService?.title?.[locale]}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="single-service-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-7 col-sm-12 col-xs-12 pull-right">
              <div className="content-box">
                <div className="row top-content">
                  <div className="col-md-12">
                    <div className="single-item">
                      <div className="img-holder">
                        <img
                          src={
                            `http://localhost:4000/${currentService?.image}` ||
                            "/images/services/sustainability.jpg"
                          }
                          alt="Awesome Image"
                        />
                      </div>
                      <div className="text-holder">
                        <p
                          className="mar-btm15"
                          dangerouslySetInnerHTML={{
                            __html: currentService?.shortDescription?.[locale],
                          }}
                        />
                        <p
                          dangerouslySetInnerHTML={{
                            __html: currentService?.longDescription?.[locale],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="specific-services">
                  <div className="sec-title pdb-50">
                    <h1>Specific Services</h1>
                    <span className="border"></span>
                  </div>
                  <div className="row">
                    {currentService?.subServices?.map((item, index) => (
                      <div key={index} className="col-lg-4 col-md-12">
                        <div className="single-item">
                          <div className="icon-holder">
                            <span className={item?.icon}></span>
                          </div>
                          <div className="text-holder">
                            <h3>{item?.title?.[locale]}</h3>
                            <p
                              style={{
                                height: "100px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                              }}
                              dangerouslySetInnerHTML={{
                                __html: item?.description?.[locale],
                              }}
                            />
                            <a href="#">Know More</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="benefits-service-content">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="sec-title pdb-50">
                        <h1>Key Benefits of the Service</h1>
                        <span className="border"></span>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-12">
                          <div className="text-holder">
                            <p>
                              {currentService?.benefits?.description?.[locale]}
                            </p>
                            <ul>
                              {currentService?.benefits?.features?.map(
                                (item, index) => (
                                  <li key={index}>
                                    <i
                                      className="fa fa-angle-right"
                                      aria-hidden="true"
                                    ></i>
                                    {item}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                        {currentService?.benefits?.video && (
                          <div className="col-lg-12 col-md-12">
                            <div className="video-holder">
                              <iframe
                                width="100%"
                                height="400"
                                src={currentService?.benefits?.video}
                                title="Management Consulting Vs Strategy Consulting (Differences Explained)"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="consultation-form">
                  <div className="sec-title pdb-50">
                    <h1>Request Free Consultation</h1>
                    <span className="border"></span>
                  </div>
                  <form id="consultation-form" action="#" method="post">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="form_name"
                          placeholder="Your Name*"
                          required
                        />
                        <input
                          type="email"
                          name="form_email"
                          placeholder="Your Mail*"
                          required
                        />
                        <select className="selectmenu">
                          <option>Select Service</option>
                          <option>Business Growth</option>
                          <option>Sustainability</option>
                          <option>Performance</option>
                          <option>Advanced Analytics</option>
                          <option>Organization</option>
                          <option>Customer Insights</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <textarea
                          name="form_message"
                          placeholder="Your Message.."
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button className="thm-btn bgclr-1" type="submit">
                          Submit Now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 col-sm-7 col-xs-12 pull-left">
              <div className="left-sidebar">
                <div className="single-sidebar">
                  <ul className="page-link">
                    {services?.map((item, index) => (
                      <li key={index}>
                        <a
                          href={`/${locale}/services/${item?.slug}`}
                          className={
                            currentService?.slug === item?.slug ? "active" : ""
                          }
                        >
                          {item?.title?.[locale]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="single-sidebar">
                  <h3>Our Brochures</h3>
                  <ul className="brochures-dwn-link">
                    {currentService?.brochure?.pdf && (
                      <li>
                        <Link
                          href={`http://localhost:4000/${currentService?.brochure?.pdf}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="icon-holder">
                            <i
                              className="fa fa-file-pdf-o"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <div className="title-holder">
                            <h5>Download PDF</h5>
                          </div>
                        </Link>
                      </li>
                    )}
                    {currentService?.brochure?.document && (
                      <li>
                        <Link
                          href={`http://localhost:4000/${currentService?.brochure?.document}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="icon-holder">
                            <i
                              className="fa fa-file-word-o"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <div className="title-holder">
                            <h5>Download DOC</h5>
                          </div>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="single-sidebar">
                  <div className="contact-author-info">
                    <ul>
                      {contactTeam &&
                        contactTeam.map((item, index) => (
                          <li key={index}>
                            <div className="title">
                              <h3>{item?.position?.[locale]}</h3>
                            </div>
                            <div className="img-holder">
                              <img
                                src={
                                  `http://localhost:4000/${item?.image}` ||
                                  "/images/blog/blog-single.jpg"
                                }
                                alt=""
                              />
                            </div>
                            <div className="text-holder">
                              <h5>{item?.name?.[locale]}</h5>
                              <p>
                                <span className="flaticon-telephone"></span>
                                {item.phone.code} {item.phone.number}
                              </p>
                              <p>
                                <span className="flaticon-back"></span>
                                {item.email}
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleServicePage;
