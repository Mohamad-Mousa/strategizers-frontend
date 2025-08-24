"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../../store/slices/servicesSlice";
import Link from "next/link";

const ServicesPage = () => {
  const { t, locale } = useTranslation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // Number of services per page

  // Get services data from Redux store
  const { services, loading, error, pagination } = useSelector(
    (state) => state.services
  );
  const { totalCount, totalPages } = pagination;

  const banner = useSelector(
    (state) => state?.website?.data?.servicePage?.banner
  );

  useEffect(() => {
    dispatch(
      fetchServices({
        page: currentPage,
        limit,
        sortBy: "createdAt",
        sortDirection: "desc",
        term: "",
      })
    );
  }, [dispatch, currentPage, limit]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle error display
  if (error) {
    console.error("Services error:", error);
  }

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={i === currentPage ? "active" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }

    return pages;
  };

  const renderServices = () => {
    if (loading) {
      return (
        <div className="col-md-12 text-center">
          <div className="loading-spinner">
            <i className="fa fa-spinner fa-spin fa-3x"></i>
            <p>{t("services.loading")}</p>
          </div>
        </div>
      );
    }

    if (services.length === 0) {
      return (
        <div className="col-md-12 text-center">
          <div className="no-services">
            <i className="fa fa-cogs fa-3x"></i>
            <h3>{t("services.noServicesFound")}</h3>
            <p>{t("services.noServicesDescription")}</p>
          </div>
        </div>
      );
    }

    return services.map((service, index) => (
      <div
        key={service._id || index}
        className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
      >
        <div
          className="single-service-item text-center wow fadeInUp"
          data-wow-delay="0s"
          data-wow-duration="1s"
          data-wow-offset="0"
        >
          <div className="img-holder">
            <img
              src={
                "http://localhost:4000/" + service.icon ||
                `/images/services/${(index % 6) + 1}.jpg`
              }
              alt={service.title?.[locale] || t("services.serviceTitle")}
              className="img-responsive"
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div className="overlay-style-one">
              <div className="box">
                <div className="content">
                  <Link href={`/${locale}/services/${service.slug}`}>
                    <i className="fa fa-link" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-holder">
            <div className="text">
              <Link href={`/${locale}/services/${service.slug}`}>
                <h3 className="title">
                  {service.title?.[locale] || t("services.serviceTitle")}
                </h3>
              </Link>
              <p>
                {service.shortDescription?.[locale] ||
                  service.description?.[locale] ||
                  t("services.defaultDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  // Debug info - you can remove this later
  console.log("Current state:", {
    currentPage,
    totalPages,
    totalCount,
    servicesCount: services.length,
    shouldShowPagination: totalPages > 1,
  });

  return (
    <>
      <section
        className="breadcrumb-area"
        style={{
          backgroundImage: `url(${"http://localhost:4000/" + banner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumbs">
                <h1>{t("services.title")}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-page-area sec-padding">
        <div className="container">
          {/* Services Info */}
          <div className="row">
            <div className="col-md-12">
              <div
                className="services-info text-center"
                style={{ marginBottom: "30px" }}
              >
                <p>
                  {t("services.showing")} {(currentPage - 1) * limit + 1}{" "}
                  {t("services.to")} {Math.min(currentPage * limit, totalCount)}{" "}
                  {t("services.of")} {totalCount} {t("services.services")}
                </p>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="row">{renderServices()}</div>

          {/* Pagination - Always show if there are more than 1 page */}
          {totalPages > 1 && (
            <div className="row">
              <div className="col-md-12">
                <ul className="post-pagination text-center">
                  {/* Previous Button */}
                  <li className={currentPage === 1 ? "disabled" : ""}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      style={{
                        pointerEvents: currentPage === 1 ? "none" : "auto",
                      }}
                    >
                      <i
                        className={`fa fa-caret-${
                          locale === "ar" ? "right" : "left"
                        }`}
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>

                  {/* Page Numbers */}
                  {renderPaginationNumbers()}

                  {/* Next Button */}
                  <li className={currentPage === totalPages ? "disabled" : ""}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          handlePageChange(currentPage + 1);
                      }}
                      style={{
                        pointerEvents:
                          currentPage === totalPages ? "none" : "auto",
                      }}
                    >
                      <i
                        className={`fa fa-caret-${
                          locale === "ar" ? "left" : "right"
                        }`}
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
