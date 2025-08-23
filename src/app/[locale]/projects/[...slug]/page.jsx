"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleProjectPage = () => {
  const params = useParams();
  const { slug, locale } = params;
  // Handle catch-all route - slug is an array, join it into a string
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("SingleProjectPage rendered with params:", {
    slug,
    locale,
    slugString,
  });

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      console.log("Fetching project with slug:", slugString);
      console.log("Full params:", params);

      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/public/project/${slugString}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.code === 200) {
          setProject(data.results.project);
        } else {
          console.error("Failed to fetch project:", data.message);
          setProject(null);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    if (slugString) {
      fetchProject();
    } else {
      console.error("No slug provided");
      setLoading(false);
    }
  }, [slugString, params]);

  if (loading) {
    return (
      <div
        className="container text-center"
        style={{ padding: "50px 0", color: "#8a3594" }}
      >
        <div className="loading-spinner">
          <i className="fa fa-spinner fa-spin fa-3x"></i>
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container text-center" style={{ padding: "50px 0" }}>
        <div className="no-project">
          <i className="fa fa-exclamation-triangle fa-3x"></i>
          <h3>Project not found</h3>
          <p>
            The project you're looking for doesn't exist or may have been
            removed.
          </p>
          <a href={`/${locale}/projects`} className="thm-btn bgclr-1">
            Back to Projects
          </a>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div>
      <section
        className="breadcrumb-area"
        style={{ backgroundImage: "url(/images/resources/breadcrumb-bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumbs">
                <h1>{project.title?.[locale] || "Project Details"}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="project-single-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="single-project-content">
                <div className="row">
                  <div className="col-md-12">
                    <div className="single-project-img-box">
                      <img
                        src={
                          project.image || "/images/projects/single-project.jpg"
                        }
                        alt={project.title?.[locale] || "Project Image"}
                        className="img-responsive"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="project-info">
                      <ul>
                        <li>
                          <b>Customer</b>:
                          <span>{project.customer || "N/A"}</span>
                        </li>
                        {project.link && (
                          <li>
                            <b>Live demo</b>:
                            <span>
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#8a3594",
                                  textDecoration: "none",
                                }}
                              >
                                {project.link}
                              </a>
                            </span>
                          </li>
                        )}
                        {project.service && (
                          <li>
                            <b>Category</b>:<span>{project.service}</span>
                          </li>
                        )}
                        <li>
                          <b>Date</b>:<span>{formatDate(project.date)}</span>
                        </li>
                        {project.tags && project.tags.length > 0 && (
                          <li>
                            <b>Tags</b>:<span>{project.tags.join(", ")}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="legal-work-content">
                      <h3>{project.title?.[locale] || "Project Title"}</h3>
                      {project.service && <span>{project.service}</span>}
                      <p>
                        {project.shortDescription?.[locale] ||
                          "No description available."}
                      </p>
                      {project.link && (
                        <a
                          className="thm-btn bgclr-1"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Launch Project
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="project-analysis">
                      <div className="sec-title pdb-50">
                        <h1>Project Analysis</h1>
                        <span className="border"></span>
                      </div>
                      <div className="text-holder">
                        <p>
                          {project.projectAnalysis?.[locale] ||
                            "No project analysis available."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="project-solution">
                      <div className="sec-title pdb-50">
                        <h1>Project Solutions</h1>
                        <span className="border"></span>
                      </div>
                      <div className="text-holder">
                        <p>
                          {project.projectSolutions?.[locale] ||
                            "No project solutions available."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="project-results">
                      <div className="sec-title pdb-50">
                        <h1>Project Results</h1>
                        <span className="border"></span>
                      </div>
                      <div className="text-holder">
                        <p>
                          {project.projectResults?.[locale] ||
                            "No project results available."}
                        </p>
                      </div>
                    </div>
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

export default SingleProjectPage;
