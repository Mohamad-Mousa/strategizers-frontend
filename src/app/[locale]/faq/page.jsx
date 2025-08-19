"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";

const FAQPage = () => {
  const { t, locale } = useTranslation();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFaqs, setTotalFaqs] = useState(0);
  const [limit] = useState(10); // Number of FAQs per page
  const [activeAccordion, setActiveAccordion] = useState(null);

  const fetchFaqs = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/public/faq?page=${page}&limit=${limit}&sortBy=createdAt&sortDirection=desc&term=`
      );
      const data = await response.json();

      console.log("API Response:", data);

      if (data.code === 200) {
        setFaqs(data.results.data || []);
        setTotalFaqs(data.results.totalCount || 0);
        // Calculate total pages based on total count and limit
        const calculatedTotalPages = Math.ceil(
          (data.results.totalCount || 0) / limit
        );
        setTotalPages(calculatedTotalPages);
        console.log("Total pages:", calculatedTotalPages);
      } else {
        console.error("Failed to fetch FAQs:", data.message);
        setFaqs([]);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setActiveAccordion(null); // Reset active accordion when page changes
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAccordionToggle = (faqId) => {
    setActiveAccordion(activeAccordion === faqId ? null : faqId);
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
      <div className="accordion-box">
        {faqs.map((faq, index) => (
          <div key={faq._id || index} className="accordion accordion-block">
            <div
              className={`accord-btn ${
                activeAccordion === faq._id ? "active" : ""
              }`}
              onClick={() => handleAccordionToggle(faq._id)}
            >
              <h4>{faq.question?.[locale] || t("faq.defaultQuestion")}</h4>
            </div>
            <div
              className={`accord-content ${
                activeAccordion === faq._id ? "" : "collapsed"
              }`}
            >
              <p>{faq.answer?.[locale] || t("faq.defaultAnswer")}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Debug info - you can remove this later
  console.log("Current state:", {
    currentPage,
    totalPages,
    totalFaqs,
    faqsCount: faqs.length,
    shouldShowPagination: totalPages > 1,
  });

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
                  {t("faq.to")} {Math.min(currentPage * limit, totalFaqs)}{" "}
                  {t("faq.of")} {totalFaqs} {t("faq.faqs")}
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

      <style jsx>{`
        .loading-spinner {
          padding: 50px 0;
          color: #666;
        }

        .no-faqs {
          padding: 50px 0;
          color: #666;
        }

        .no-faqs i {
          margin-bottom: 20px;
          color: #ddd;
        }

        .faq-info {
          color: #666;
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
        .accordion-box {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .accordion {
          border-bottom: 1px solid #eee;
          transition: all 0.3s ease;
        }

        .accordion:last-child {
          border-bottom: none;
        }

        .accord-btn {
          padding: 20px 25px;
          cursor: pointer;
          background: #f8f9fa;
          transition: background 0.3s ease;
          position: relative;
        }

        .accord-btn:hover {
          background: #e9ecef;
        }

        .accord-btn.active {
          background: #007bff;
          color: #fff;
        }

        .accord-btn h4 {
          margin: 0;
          font-weight: 600;
          font-size: 16px;
          line-height: 1.4;
        }

        .accord-btn::after {
          content: "+";
          position: absolute;
          right: 25px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          font-weight: bold;
          transition: transform 0.3s ease;
        }

        .accord-btn.active::after {
          transform: translateY(-50%) rotate(45deg);
        }

        .accord-content {
          padding: 0 25px;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .accord-content.collapsed {
          padding: 0 25px;
        }

        .accord-content p {
          padding: 20px 0;
          margin: 0;
          color: #666;
          line-height: 1.6;
        }

        /* RTL support for accordion */
        [dir="rtl"] .accord-btn::after {
          right: auto;
          left: 25px;
        }

        @media (max-width: 767px) {
          .accord-btn {
            padding: 15px 20px;
          }

          .accord-btn h4 {
            font-size: 14px;
            padding-right: 30px;
          }

          .accord-btn::after {
            right: 20px;
            font-size: 18px;
          }

          .accord-content {
            padding: 0 20px;
          }

          .accord-content p {
            padding: 15px 0;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .accord-btn {
            padding: 12px 15px;
          }

          .accord-btn h4 {
            font-size: 13px;
            padding-right: 25px;
          }

          .accord-btn::after {
            right: 15px;
            font-size: 16px;
          }

          .accord-content {
            padding: 0 15px;
          }

          .accord-content p {
            padding: 12px 0;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default FAQPage;
