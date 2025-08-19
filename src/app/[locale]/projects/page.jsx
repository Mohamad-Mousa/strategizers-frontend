"use client";
import { useEffect, useState } from "react";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [limit] = useState(9); // Number of projects per page

  const fetchProjects = async (page = 0) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/public/project?page=${page}&limit=${limit}&sortBy=createdAt&sortDirection=desc&term=&service=&tags=`
      );
      const data = await response.json();

      if (data.code === 200) {
        setProjects(data.results.data || []);
        setTotalPages(data.results.limit / 9 || 1);
        setTotalProjects(data.results.totalCount || 0);
      } else {
        console.error("Failed to fetch projects:", data.message);
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

  const renderProjects = () => {
    if (loading) {
      return (
        <div className="col-md-12 text-center">
          <div className="loading-spinner">
            <i className="fa fa-spinner fa-spin fa-3x"></i>
            <p>Loading projects...</p>
          </div>
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="col-md-12 text-center">
          <div className="no-projects">
            <i className="fa fa-folder-open fa-3x"></i>
            <h3>No projects found</h3>
            <p>There are no projects available at the moment.</p>
          </div>
        </div>
      );
    }

    return projects.map((project, index) => (
      <div
        key={project._id || index}
        className="single-project-item col-md-4 col-sm-4 col-xs-12"
      >
        <div className="img-holder">
          <img
            src={project.image || `/images/projects/${(index % 9) + 1}.jpg`}
            alt={project.title?.en || "Project"}
          />
          <div className="overlay-style-one">
            <div className="box">
              <div className="content">
                <a href={`/projects/${project.slug}`}>
                  <h3>{project.title?.en || "Project Title"}</h3>
                </a>
                <span>{project.customer || "Client"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

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
                <h1>Our Projects</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="breadcrumb-bottom-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="left pull-left">
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </li>
                  <li className="active">Our Projects</li>
                </ul>
              </div>
              <div className="right pull-right">
                <a href="#">
                  <span>
                    <i className="fa fa-share-alt" aria-hidden="true"></i>Share
                  </span>
                </a>
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
                  Showing {(currentPage - 1) * limit + 1} to{" "}
                  {Math.min(currentPage * limit, totalProjects)} of{" "}
                  {totalProjects} projects
                </p>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="row">{renderProjects()}</div>

          {/* Pagination */}
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
                      <i className="fa fa-caret-left" aria-hidden="true"></i>
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
                      <i className="fa fa-caret-right" aria-hidden="true"></i>
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
      `}</style>
    </>
  );
};

export default ProjectsPage;
