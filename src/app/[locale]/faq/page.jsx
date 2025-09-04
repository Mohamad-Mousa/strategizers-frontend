"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import { useSelector, useDispatch } from "react-redux";
import { fetchFaqs } from "../../../store/slices/faqSlice";

const FAQPage = () => {
  const { t, locale } = useTranslation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // Number of FAQs per page
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Get FAQs data from Redux store
  const { faqs, loading, error, pagination } = useSelector(
    (state) => state.faq
  );
  const { totalCount, totalPages } = pagination;

  const banner = useSelector((state) => state?.website?.data?.faqPage?.banner);

  useEffect(() => {
    dispatch(
      fetchFaqs({
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
      setActiveAccordion(null); // Reset active accordion when page changes
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle error display
  if (error) {
    console.error("FAQ error:", error);
  }

  const handleAccordionToggle = (faqId) => {
    // If clicking the same accordion, close it. Otherwise, open the clicked one
    const newActiveAccordion = activeAccordion === faqId ? null : faqId;
    console.log("Accordion toggle:", {
      faqId,
      currentActive: activeAccordion,
      newActive: newActiveAccordion,
    });
    setActiveAccordion(newActiveAccordion);
  };

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

  const renderFaqs = () => {
    if (loading) {
      return (
        <div className="col-md-12 text-center">
          <div className="loading-spinner">
            <i className="fa fa-spinner fa-spin fa-3x"></i>
            <p>{t("faq.loading")}</p>
          </div>
        </div>
      );
    }

    if (faqs.length === 0) {
      return (
        <div className="col-md-12 text-center">
          <div className="no-faqs">
            <i className="fa fa-question-circle fa-3x"></i>
            <h3>{t("faq.noFaqsFound")}</h3>
            <p>{t("faq.noFaqsDescription")}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="faq-accordion">
        {faqs.map((faq, index) => {
          const isActive = activeAccordion === faq._id;
          return (
            <div key={faq._id || index} className="faq-item">
              <button
                className={`faq-question ${isActive ? "active" : ""}`}
                onClick={() => handleAccordionToggle(faq._id)}
                aria-expanded={isActive}
                aria-controls={`faq-answer-${faq._id}`}
              >
                <span className="faq-text">
                  {faq.question?.[locale] || t("faq.defaultQuestion")}
                </span>
                <span className="faq-icon">{isActive ? "−" : "+"}</span>
              </button>
              <div
                id={`faq-answer-${faq._id}`}
                className={`faq-answer ${isActive ? "active" : ""}`}
                aria-hidden={!isActive}
              >
                <div className="faq-answer-content">
                  {faq.answer?.[locale] || t("faq.defaultAnswer")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Debug info - you can remove this later
  console.log("Current state:", {
    currentPage,
    totalPages,
    totalCount,
    faqsCount: faqs.length,
    shouldShowPagination: totalPages > 1,
  });

  return (
    <>
      <section
        className="breadcrumb-area"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_API_BASEURL_IMAGE}${banner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumbs">
                <h1>{t("faq.title")}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-page-area sec-padding">
        <div className="container">
          {/* FAQ Info */}
          <div className="row">
            <div className="col-md-12">
              <div
                className="faq-info text-center"
                style={{ marginBottom: "30px" }}
              >
                <p>
                  {t("faq.showing")} {(currentPage - 1) * limit + 1}{" "}
                  {t("faq.to")} {Math.min(currentPage * limit, totalCount)}{" "}
                  {t("faq.of")} {totalCount} {t("faq.faqs")}
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="row">
            <div className="col-md-12">{renderFaqs()}</div>
          </div>

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

      <style>{`
        .loading-spinner {
          padding: 50px 0;
          color: #8a3594;
        }

        .no-faqs {
          padding: 50px 0;
          color: #8a3594;
        }

        .no-faqs i {
          margin-bottom: 20px;
          color: #ddd;
        }

        .faq-info {
          color: #8a3594;
          font-size: 14px;
        }

        .post-pagination li.disabled a {
          color: #ccc;
          cursor: not-allowed;
        }

        .post-pagination li.disabled a:hover {
          background: none;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .accordion-box {
            margin-bottom: 30px;
          }
        }

        @media (max-width: 991px) {
          .accordion-box {
            margin-bottom: 25px;
          }

          .breadcrumb-bottom-area .left,
          .breadcrumb-bottom-area .right {
            float: none !important;
            text-align: center;
            margin-bottom: 10px;
          }
        }

        @media (max-width: 767px) {
          .accordion-box {
            margin-bottom: 20px;
          }

          .breadcrumbs h1 {
            font-size: 28px;
          }

          .faq-info p {
            font-size: 12px;
          }

          .post-pagination li {
            margin: 0 2px;
          }

          .post-pagination li a {
            padding: 8px 12px;
            font-size: 14px;
          }

          .accord-btn h4 {
            font-size: 16px;
            line-height: 1.4;
          }

          .accord-content p {
            font-size: 14px;
            line-height: 1.6;
          }
        }

        @media (max-width: 480px) {
          .accordion-box {
            margin-bottom: 15px;
          }

          .breadcrumbs h1 {
            font-size: 24px;
          }

          .post-pagination li a {
            padding: 6px 10px;
            font-size: 12px;
          }

          .accord-btn h4 {
            font-size: 14px;
          }

          .accord-content p {
            font-size: 13px;
          }
        }

        /* RTL Support for Arabic */
        [dir="rtl"] .breadcrumb-bottom-area .left {
          float: right !important;
        }

        [dir="rtl"] .breadcrumb-bottom-area .right {
          float: left !important;
        }

        [dir="rtl"] .breadcrumb-bottom-area ul li {
          float: right;
        }

        [dir="rtl"] .breadcrumb-bottom-area ul li i {
          transform: rotate(180deg);
        }

        [dir="rtl"] .post-pagination li {
          float: right;
        }

        /* Loading animation */
        .loading-spinner i {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* RTL specific animations */
        [dir="rtl"] .loading-spinner i {
          animation: spin-rtl 1s linear infinite;
        }

        @keyframes spin-rtl {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }

        /* FAQ specific responsive styles */
        .faq-accordion {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .faq-item {
          border-bottom: 1px solid #eee;
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-question {
          width: 100%;
          padding: 20px 25px;
          background: #f8f9fa;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.3s ease;
          font-size: 16px;
          font-weight: 600;
          color: #333;
          outline: none;
        }

        .faq-question:hover {
          background: #e9ecef;
        }

        .faq-question.active {
          background: #8a3594;
          color: #fff;
        }

        .faq-text {
          flex: 1;
          margin-right: 15px;
        }

        .faq-icon {
          font-size: 20px;
          font-weight: bold;
          transition: transform 0.3s ease;
        }

        .faq-question.active .faq-icon {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: #fff;
        }

        .faq-answer.active {
          max-height: 500px;
        }

        .faq-answer-content {
          padding: 20px 25px;
          color: #8a3594;
          line-height: 1.6;
        }

        /* RTL support for FAQ */
        [dir="rtl"] .faq-question {
          text-align: right;
        }

        [dir="rtl"] .faq-text {
          margin-right: 0;
          margin-left: 15px;
        }

        @media (max-width: 767px) {
          .faq-question {
            padding: 15px 20px;
            font-size: 14px;
          }

          .faq-answer-content {
            padding: 15px 20px;
            font-size: 13px;
          }

          .faq-icon {
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .faq-question {
            padding: 12px 15px;
            font-size: 13px;
          }

          .faq-answer-content {
            padding: 12px 15px;
            font-size: 12px;
          }

          .faq-icon {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default FAQPage;
