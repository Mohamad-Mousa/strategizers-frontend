"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectBySlug } from "../../../../store/slices/projectsSlice";
import { useTranslation } from "../../../../hooks/useTranslation";

const SingleProjectPage = () => {
  const params = useParams();
  const { slug, locale } = params;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // Handle catch-all route - slug is an array, join it into a string
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;

  // Get project data from Redux store
  const { currentProject, singleLoading, singleError } = useSelector(
    (state) => state.projects
  );

  const banner = useSelector(
    (state) => state?.website?.data?.projectsPage?.banner
  );

  useEffect(() => {
    if (slugString) {
      console.log("Fetching project with slug:", slugString);
      dispatch(fetchProjectBySlug(slugString));
    } else {
      console.error("No slug provided");
    }
  }, [dispatch, slugString]);

  // Handle error display
  if (singleError) {
    console.error("Project error:", singleError);
  }

  if (singleLoading) {
    return (
      <div
        className="container text-center"
        style={{ padding: "50px 0", color: "#8a3594" }}
      >
        <div className="loading-spinner">
          <i className="fa fa-spinner fa-spin fa-3x"></i>
          <p>{t("project.loading")}</p>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="container text-center" style={{ padding: "50px 0" }}>
        <div className="no-project">
          <i className="fa fa-exclamation-triangle fa-3x"></i>
          <h3>{t("project.notFound")}</h3>
          <p>{t("project.notFoundDescription")}</p>
          <a href={`/${locale}/projects`} className="thm-btn bgclr-1">
            {t("project.backToProjects")}
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
        style={{
          backgroundImage: `url(${
            `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL_IMAGE}${currentProject.image}`
          })`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="breadcrumbs">
                <h1>
                  {currentProject.title?.[locale] ||
                    t("project.projectDetails")}
                </h1>
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
                          `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL_IMAGE}${currentProject.image}` ||
                          "/images/projects/single-project.jpg"
                        }
                        alt={
                          currentProject.title?.[locale] ||
                          t("project.projectImage")
                        }
                        className="img-responsive"
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="project-info">
                      <ul>
                        <li>
                          <b>{t("project.customer")}</b>:
                          <span>
                            {currentProject.customer ||
                              t("project.notAvailable")}
                          </span>
                        </li>
                        {currentProject.link && (
                          <li>
                            <b>{t("project.liveDemo")}</b>:
                            <span>
                              <a
                                href={currentProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#8a3594",
                                  textDecoration: "none",
                                }}
                              >
                                {currentProject.link}
                              </a>
                            </span>
                          </li>
                        )}
                        {currentProject.service && (
                          <li>
                            <b>{t("project.category")}</b>:
                            <span>
                              {currentProject.service.title?.[locale] ||
                                t("project.notAvailable")}
                            </span>
                          </li>
                        )}
                        <li>
                          <b>{t("project.date")}</b>:
                          <span>{formatDate(currentProject.date)}</span>
                        </li>
                        {currentProject.tags &&
                          currentProject.tags.length > 0 && (
                            <li>
                              <b>{t("project.tags")}</b>:
                              {currentProject.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                              ))}
                            </li>
                          )}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="legal-work-content">
                      <h3>
                        {currentProject.title?.[locale] ||
                          t("project.projectTitle")}
                      </h3>
                      {currentProject.service && (
                        <span>
                          {currentProject.service.title?.[locale] ||
                            t("project.notAvailable")}
                        </span>
                      )}
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            currentProject.shortDescription?.[locale] ||
                            t("project.noDescriptionAvailable"),
                        }}
                      />
                      {currentProject.link && (
                        <a
                          className="thm-btn bgclr-1"
                          href={currentProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("project.launchProject")}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="project-analysis">
                      <div className="sec-title pdb-50">
                        <h1>{t("project.projectAnalysis")}</h1>
                        <span className="border"></span>
                      </div>
                      <div className="text-holder">
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              currentProject.projectAnalysis?.description?.[
                                locale
                              ] || t("project.noProjectAnalysisAvailable"),
                          }}
                        />
                      </div>
                      <div className="chart-box">
                        <img
                          src={
                            `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL_IMAGE}${currentProject.projectAnalysis.image}` ||
                            "/images/projects/analysis-chart.jpg"
                          }
                          alt="Project Analysis"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="project-solution">
                      <div className="sec-title pdb-50">
                        <h1>{t("project.projectSolutions")}</h1>
                        <span className="border"></span>
                      </div>
                      <div className="text-holder">
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              currentProject.projectSolutions?.description?.[
                                locale
                              ] || t("project.noProjectSolutionsAvailable"),
                          }}
                        />
                      </div>
                      <div className="chart-box">
                        <img
                          src={
                            `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL_IMAGE}${currentProject.projectSolutions.image}` ||
                            "/images/projects/analysis-chart.jpg"
                          }
                          alt="Project Solutions"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="project-results">
                      <div className="sec-title pdb-50">
                        <h1>{t("project.projectResults")}</h1>
                        <span className="border"></span>
                      </div>
                      <div className="text-holder">
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              currentProject.projectResults?.description?.[
                                locale
                              ] || t("project.noProjectResultsAvailable"),
                          }}
                        />
                      </div>
                      <div className="chart-box">
                        <img
                          src={
                            `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL_IMAGE}${currentProject.projectResults.image}` ||
                            "/images/projects/results-chart.jpg"
                          }
                          alt="Project Results"
                        />
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
