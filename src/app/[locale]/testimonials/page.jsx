"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import { useSelector, useDispatch } from "react-redux";
import { fetchTestimonials } from "../../../store/slices/testimonialsSlice";

const TestimonialsPage = () => {
  const { t, locale } = useTranslation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // Number of testimonials per page

  // Get testimonials data from Redux store
  const { testimonials, loading, error, pagination } = useSelector(
    (state) => state.testimonials
  );
  const { totalCount, totalPages } = pagination;

  const banner = useSelector(
    (state) => state?.website?.data?.testimonialsPage?.banner
  );

  useEffect(() => {
    dispatch(
      fetchTestimonials({
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
    console.error("Testimonials error:", error);
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

  const renderTestimonials = () => {
    if (loading) {
      return (
        <div className="col-md-12 text-center">
          <div className="loading-spinner">
            <i className="fa fa-spinner fa-spin fa-3x"></i>
            <p>{t("testimonials.loading")}</p>
          </div>
        </div>
      );
    }

    if (testimonials.length === 0) {
      return (
        <div className="col-md-12 text-center">
          <div className="no-testimonials">
            <i className="fa fa-comments fa-3x"></i>
            <h3>{t("testimonials.noTestimonialsFound")}</h3>
            <p>{t("testimonials.noTestimonialsDescription")}</p>
          </div>
        </div>
      );
    }

    return testimonials.map((testimonial, index) => (
      <div
        key={testimonial._id || index}
        className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
      >
        <div className="single-testimonial-item">
          <div className="text-holder">
            <p>
              {testimonial.description?.[locale] ||
                t("testimonials.defaultDescription")}
            </p>
          </div>
          <div className="client-info">
            <h3>
              {testimonial.name?.[locale] || t("testimonials.clientName")}
            </h3>
            <p>
              {testimonial.position?.[locale] ||
                t("testimonials.clientPosition")}
            </p>
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
    testimonialsCount: testimonials.length,
    shouldShowPagination: totalPages > 1,
  });

  return (
    <>
      <section
        className="breadcrumb-area"
        style={{
          backgroundImage: `url(${"http://localhost:4000" + banner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumbs">
                <h1>{t("testimonials.title")}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-section sec-padding">
        <div className="container">
          {/* Testimonials Info */}
          <div className="row">
            <div className="col-md-12">
              <div
                className="testimonials-info text-center"
                style={{ marginBottom: "30px" }}
              >
                <p>
                  {t("testimonials.showing")} {(currentPage - 1) * limit + 1}{" "}
                  {t("testimonials.to")}{" "}
                  {Math.min(currentPage * limit, totalCount)}{" "}
                  {t("testimonials.of")} {totalCount}{" "}
                  {t("testimonials.testimonials")}
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="row masonary-layout">{renderTestimonials()}</div>

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

      <div className="footer-top-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title pull-left">
                <h3>{t("testimonials.experienceTitle")}</h3>
              </div>
              <div className="button pull-right">
                <a className="thm-btn bgclr-1" href="#">
                  {t("testimonials.requestQuote")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialsPage;
