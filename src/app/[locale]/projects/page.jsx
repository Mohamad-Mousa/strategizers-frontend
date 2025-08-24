"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../../../store/slices/projectsSlice";

const ProjectsPage = () => {
  const { t, locale } = useTranslation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(9); // Number of projects per page

  // Get projects data from Redux store
  const { projects, loading, error, pagination } = useSelector(
    (state) => state.projects
  );
  const { totalCount, totalPages } = pagination;

  const banner = useSelector(
    (state) => state?.website?.data?.projectsPage?.banner
  );

  useEffect(() => {
    dispatch(
      fetchProjects({
        page: currentPage,
        limit,
        sortBy: "createdAt",
        sortDirection: "desc",
        term: "",
        service: "",
        tags: "",
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
    console.error("Projects error:", error);
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

  const renderProjects = () => {
    if (loading) {
      return (
        <div className="col-md-12 text-center">
          <div className="loading-spinner">
            <i className="fa fa-spinner fa-spin fa-3x"></i>
            <p>{t("projects.loading")}</p>
          </div>
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="col-md-12 text-center">
          <div className="no-projects">
            <i className="fa fa-folder-open fa-3x"></i>
            <h3>{t("projects.noProjectsFound")}</h3>
            <p>{t("projects.noProjectsDescription")}</p>
          </div>
        </div>
      );
    }

    return projects.map((project, index) => (
      <div
        key={project._id || index}
        className="single-project-item col-lg-4 col-md-6 col-sm-6 col-xs-12"
      >
        <div className="img-holder">
          <img
            src={
              "http://localhost:4000/" + project.image ||
              `/images/projects/${(index % 9) + 1}.jpg`
            }
            alt={project.title?.[locale] || t("projects.projectTitle")}
            className="img-responsive"
          />
          <div className="overlay-style-one">
            <div className="box">
              <div className="content">
                <a href={`/${locale}/projects/${project.slug}`}>
                  <h3>
                    {project.title?.[locale] || t("projects.projectTitle")}
                  </h3>
                </a>
                <span>{project.customer || t("projects.client")}</span>
              </div>
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
    projectsCount: projects.length,
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
                <h1>{t("projects.title")}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="project-area sec-padding">
        <div className="container">
          {/* Projects Info */}
          <div className="row">
            <div className="col-md-12">
              <div
                className="projects-info text-center"
                style={{ marginBottom: "30px" }}
              >
                <p>
                  {t("projects.showing")} {(currentPage - 1) * limit + 1}{" "}
                  {t("projects.to")} {Math.min(currentPage * limit, totalCount)}{" "}
                  {t("projects.of")} {totalCount} {t("projects.projects")}
                </p>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="row">{renderProjects()}</div>

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

        .no-projects {
          padding: 50px 0;
          color: #666;
        }

        .no-projects i {
          margin-bottom: 20px;
          color: #ddd;
        }

        .projects-info {
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
          .single-project-item {
            margin-bottom: 30px;
          }
        }

        @media (max-width: 991px) {
          .single-project-item {
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
          .single-project-item {
            margin-bottom: 20px;
          }

          .breadcrumbs h1 {
            font-size: 28px;
          }

          .projects-info p {
            font-size: 12px;
          }

          .post-pagination li {
            margin: 0 2px;
          }

          .post-pagination li a {
            padding: 8px 12px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .single-project-item {
            margin-bottom: 15px;
          }

          .breadcrumbs h1 {
            font-size: 24px;
          }

          .post-pagination li a {
            padding: 6px 10px;
            font-size: 12px;
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

        /* Image responsiveness */
        .img-holder img {
          width: 100%;
          height: auto;
          transition: transform 0.3s ease;
        }

        .img-holder:hover img {
          transform: scale(1.05);
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
      `}</style>
    </>
  );
};

export default ProjectsPage;
