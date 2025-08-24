"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../../store/slices/blogsSlice";

const BlogsPage = () => {
  const { t, locale } = useTranslation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // Number of blogs per page

  // Get blogs data from Redux store
  const { blogs, loading, error, pagination } = useSelector(
    (state) => state.blogs
  );
  const { totalCount, totalPages } = pagination;

  const banner = useSelector((state) => state?.website?.data?.blogPage?.banner);

  useEffect(() => {
    dispatch(
      fetchBlogs({
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
    console.error("Blogs error:", error);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(
      locale === "ar" ? "ar-SA" : "en-US",
      options
    );
  };

  const renderBlogs = () => {
    if (loading) {
      return (
        <div className="col-md-12 text-center">
          <div className="loading-spinner">
            <i className="fa fa-spinner fa-spin fa-3x"></i>
            <p>{t("blogs.loading")}</p>
          </div>
        </div>
      );
    }

    if (blogs.length === 0) {
      return (
        <div className="col-md-12 text-center">
          <div className="no-blogs">
            <i className="fa fa-newspaper-o fa-3x"></i>
            <h3>{t("blogs.noBlogsFound")}</h3>
            <p>{t("blogs.noBlogsDescription")}</p>
          </div>
        </div>
      );
    }

    return blogs.map((blog, index) => (
      <div key={blog._id || index} className="single-blog-item">
        <div className="img-holder">
          <img
            src={
              "http://localhost:4000/" + blog.image ||
              `/images/blog/blog-large-${(index % 4) + 1}.jpg`
            }
            alt={blog.title?.[locale] || t("blogs.blogTitle")}
            className="img-responsive"
          />
          <div className="overlay-style-one">
            <div className="box">
              <div className="content">
                <a href={`/${locale}/blogs/${blog.slug}`}>
                  <i className="fa fa-link" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="post-date">
            <h5>{formatDate(blog.createdAt || new Date()).split(" ")[1]}</h5>
          </div>
        </div>
        <div className="text-holder">
          <span>{blog.category?.[locale] || t("blogs.category")}</span>
          <a href={`/${locale}/blogs/${blog.slug}`}>
            <h3 className="blog-title">
              {blog.title?.[locale] || t("blogs.blogTitle")}
            </h3>
          </a>
          <ul className="meta-info">
            <li>
              <a href="#">
                {t("blogs.by")} {blog.author?.[locale] || t("blogs.author")}
              </a>
            </li>
            <li>
              <a href="#">{formatDate(blog.createdAt || new Date())}</a>
            </li>
            <li>
              <a href="#">
                {blog.commentsCount || 0} {t("blogs.comments")}
              </a>
            </li>
          </ul>
          <div className="text">
            <p>
              {blog.shortDescription?.[locale] ||
                blog.description?.[locale] ||
                t("blogs.defaultDescription")}
            </p>
          </div>
          <div className="read-more-button">
            <a href={`/${locale}/blogs/${blog.slug}`}>{t("blogs.readMore")}</a>
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
    blogsCount: blogs.length,
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
                <h1>{t("blogs.title")}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="blog-area" className="blog-large-area">
        <div className="container">
          {/* Blogs Info */}
          <div className="row">
            <div className="col-md-12">
              <div
                className="blogs-info text-center"
                style={{ marginBottom: "30px" }}
              >
                <p>
                  {t("blogs.showing")} {(currentPage - 1) * limit + 1}{" "}
                  {t("blogs.to")} {Math.min(currentPage * limit, totalCount)}{" "}
                  {t("blogs.of")} {totalCount} {t("blogs.blogs")}
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="blog-post">
                {renderBlogs()}

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
                              if (currentPage > 1)
                                handlePageChange(currentPage - 1);
                            }}
                            style={{
                              pointerEvents:
                                currentPage === 1 ? "none" : "auto",
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
                        <li
                          className={
                            currentPage === totalPages ? "disabled" : ""
                          }
                        >
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogsPage;
