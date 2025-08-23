"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogBySlug } from "../../../../store/slices/blogsSlice";
import { useTranslation } from "../../../../hooks/useTranslation";

const SingleBlogPage = () => {
  const params = useParams();
  const { slug, locale } = params;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // Handle catch-all route - slug is an array, join it into a string
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;

  // Get blog data from Redux store
  const { currentBlog, singleLoading, singleError } = useSelector(
    (state) => state.blogs
  );

  const banner = useSelector(
    (state) => state?.website?.data?.blogsPage?.banner
  );

  console.log("SingleBlogPage rendered with params:", {
    slug,
    locale,
    slugString,
  });

  useEffect(() => {
    if (slugString) {
      console.log("Fetching blog with slug:", slugString);
      dispatch(fetchBlogBySlug(slugString));
    } else {
      console.error("No slug provided");
    }
  }, [dispatch, slugString]);

  // Handle error display
  if (singleError) {
    console.error("Blog error:", singleError);
  }

  if (singleLoading) {
    return (
      <div className="container text-center" style={{ padding: "50px 0" }}>
        <div className="loading-spinner">
          <i className="fa fa-spinner fa-spin fa-3x"></i>
          <p>{t("blog.loading")}</p>
        </div>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="container text-center" style={{ padding: "50px 0" }}>
        <div className="no-blog">
          <i className="fa fa-exclamation-triangle fa-3x"></i>
          <h3>{t("blog.notFound")}</h3>
          <p>{t("blog.notFoundDescription")}</p>
          <a href={`/${locale}/blogs`} className="thm-btn bgclr-1">
            {t("blog.backToBlogs")}
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

  // Format tags
  const formatTags = (tags) => {
    if (!tags || !Array.isArray(tags)) return [];
    return tags
      .flatMap((tag) => tag.split(",").map((t) => t.trim()))
      .filter((t) => t);
  };

  const tags = formatTags(currentBlog.tags);

  return (
    <div>
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
                <h1>{currentBlog.title?.[locale] || t("blog.blogPost")}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="blog-area" className="blog-large-area blog-single-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="blog-post">
                <div className="single-blog-item">
                  <div className="img-holder">
                    <img
                      src={
                        `http://localhost:4000${currentBlog.image}` ||
                        "/images/blog/blog-single.jpg"
                      }
                      alt={currentBlog.title?.[locale] || t("blog.blogImage")}
                      className="img-responsive"
                    />
                    <div className="post-date">
                      <h5>{formatDate(currentBlog.createdAt).split(" ")[1]}</h5>
                    </div>
                  </div>
                  <div className="text-holder">
                    <span>
                      {currentBlog.subTitle?.[locale] || t("blog.blog")}
                    </span>
                    <h3 className="blog-title">
                      {currentBlog.title?.[locale] || t("blog.blogTitle")}
                    </h3>
                    <ul className="meta-info">
                      <li>
                        <a href="#">
                          {t("blog.by")}{" "}
                          {currentBlog.author || t("blog.unknownAuthor")}
                        </a>
                      </li>
                      <li>
                        <a href="#">{formatDate(currentBlog.createdAt)}</a>
                      </li>
                      {tags.length > 0 && (
                        <li>
                          <a href="#">{tags.join(", ")}</a>
                        </li>
                      )}
                    </ul>
                    <div className="text">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            currentBlog.description?.[locale] ||
                            t("blog.noContentAvailable"),
                        }}
                      />
                    </div>
                  </div>
                </div>

                {tags.length > 0 && (
                  <div className="tag-social-share-box">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="tag pull-left">
                          <p>
                            <span>{t("blog.tags")}:</span> {tags.join(", ")}
                          </p>
                        </div>
                        <div className="social-share pull-right">
                          <h5>
                            {t("blog.share")}
                            <i
                              className="fa fa-share-alt"
                              aria-hidden="true"
                            ></i>
                          </h5>
                          <ul className="social-share-links">
                            <li>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.open(
                                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                      window.location.href
                                    )}`,
                                    "_blank"
                                  );
                                }}
                              >
                                <i
                                  className="fa fa-facebook"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.open(
                                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                      window.location.href
                                    )}&text=${encodeURIComponent(
                                      currentBlog.title?.[locale] || ""
                                    )}`,
                                    "_blank"
                                  );
                                }}
                              >
                                <i
                                  className="fa fa-twitter"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.open(
                                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                      window.location.href
                                    )}`,
                                    "_blank"
                                  );
                                }}
                              >
                                <i
                                  className="fa fa-linkedin"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleBlogPage;
