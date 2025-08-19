"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";

const OurTeamPage = () => {
  const { t, locale } = useTranslation();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTeam, setTotalTeam] = useState(0);
  const [limit] = useState(10); // Number of team members per page

  const fetchTeam = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/public/team?page=${page}&limit=${limit}&sortBy=createdAt&sortDirection=desc&term=`
      );
      const data = await response.json();

      console.log("API Response:", data);

      if (data.code === 200) {
        setTeam(data.results.data || []);
        setTotalTeam(data.results.totalCount || 0);
        // Calculate total pages based on total count and limit
        const calculatedTotalPages = Math.ceil(
          (data.results.totalCount || 0) / limit
        );
        setTotalPages(calculatedTotalPages);
        console.log("Total pages:", calculatedTotalPages);
      } else {
        console.error("Failed to fetch team:", data.message);
        setTeam([]);
      }
    } catch (error) {
      console.error("Error fetching team:", error);
      setTeam([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam(currentPage);
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

  const formatPhoneNumber = (phone) => {
    if (!phone || !phone.code || !phone.number) return "";
    return `+${phone.code}-${phone.number}`;
  };

  const renderTeam = () => {
    if (loading) {
      return (
        <div className="col-md-12 text-center">
          <div className="loading-spinner">
            <i className="fa fa-spinner fa-spin fa-3x"></i>
            <p>{t("team.loading")}</p>
          </div>
        </div>
      );
    }

    if (team.length === 0) {
      return (
        <div className="col-md-12 text-center">
          <div className="no-team">
            <i className="fa fa-users fa-3x"></i>
            <h3>{t("team.noTeamFound")}</h3>
            <p>{t("team.noTeamDescription")}</p>
          </div>
        </div>
      );
    }

    return team.map((member, index) => (
      <div
        key={member._id || index}
        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
      >
        <div className="single-team-member hvr-underline-reveal">
          <div className="img-holder">
            <img
              src={member.image || `/images/team/${(index % 8) + 1}.jpg`}
              alt={member.name?.[locale] || t("team.memberName")}
              className="img-responsive"
            />
            <div className="overlay-style-one">
              <div className="box">
                <div className="content">
                  <ul>
                    {member.social?.facebook && (
                      <li>
                        <a
                          href={member.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                      </li>
                    )}
                    {member.social?.twitter && (
                      <li>
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                      </li>
                    )}
                    {member.social?.linkedin && (
                      <li>
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-linkedin" aria-hidden="true"></i>
                        </a>
                      </li>
                    )}
                    {member.social?.instagram && (
                      <li>
                        <a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="text-holder">
            <h3>{member.name?.[locale] || t("team.memberName")}</h3>
            <span>{member.position?.[locale] || t("team.memberPosition")}</span>
            <div className="text">
              <p>
                {member.description?.[locale] || t("team.defaultDescription")}
              </p>
            </div>
            <ul className="contact-info">
              {member.phone && (
                <li>
                  {t("team.phone")}: {formatPhoneNumber(member.phone)}
                </li>
              )}
              {member.email && (
                <li>
                  {t("team.email")}: <b>{member.email}</b>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    ));
  };

  // Debug info - you can remove this later
  console.log("Current state:", {
    currentPage,
    totalPages,
    totalTeam,
    teamCount: team.length,
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
                <h1>{t("team.title")}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-area sec-padding">
        <div className="container">
          {/* Team Info */}
          <div className="row">
            <div className="col-md-12">
              <div
                className="team-info text-center"
                style={{ marginBottom: "30px" }}
              >
                <p>
                  {t("team.showing")} {(currentPage - 1) * limit + 1}{" "}
                  {t("team.to")} {Math.min(currentPage * limit, totalTeam)}{" "}
                  {t("team.of")} {totalTeam} {t("team.members")}
                </p>
              </div>
            </div>
          </div>

          {/* Team Grid */}
          <div className="row">{renderTeam()}</div>

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
                <h3>{t("team.experienceTitle")}</h3>
              </div>
              <div className="button pull-right">
                <a className="thm-btn bgclr-1" href="#">
                  {t("team.requestQuote")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurTeamPage;
