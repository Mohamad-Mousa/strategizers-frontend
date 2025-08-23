"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleBlogPage = () => {
  const params = useParams();
  const { slug, locale } = params;
  // Handle catch-all route - slug is an array, join it into a string
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("SingleBlogPage rendered with params:", {
    slug,
    locale,
    slugString,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      console.log("Fetching blog with slug:", slugString);
      console.log("Full params:", params);

      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/public/blog/${slugString}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.code === 200) {
          setBlog(data.results.blog);
        } else {
          console.error("Failed to fetch blog:", data.message);
          setBlog(null);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (slugString) {
      fetchBlog();
    } else {
      console.error("No slug provided");
      setLoading(false);
    }
  }, [slugString, params]);

  if (loading) {
    return (
      <div className="container text-center" style={{ padding: "50px 0" }}>
        <div className="loading-spinner">
          <i className="fa fa-spinner fa-spin fa-3x"></i>
          <p>Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container text-center" style={{ padding: "50px 0" }}>
        <div className="no-blog">
          <i className="fa fa-exclamation-triangle fa-3x"></i>
          <h3>Blog not found</h3>
          <p>
            The blog you're looking for doesn't exist or may have been removed.
          </p>
          <a href={`/${locale}/blogs`} className="thm-btn bgclr-1">
            Back to Blogs
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

  const tags = formatTags(blog.tags);

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
                <h1>{blog.title?.[locale] || "Blog Post"}</h1>
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
                      src={blog.image || "/images/blog/blog-single.jpg"}
                      alt={blog.title?.[locale] || "Blog Image"}
                      className="img-responsive"
                    />
                    <div className="post-date">
                      <h5>{formatDate(blog.createdAt).split(" ")[1]}</h5>
                    </div>
                  </div>
                  <div className="text-holder">
                    <span>{blog.subTitle?.[locale] || "Blog"}</span>
                    <h3 className="blog-title">
                      {blog.title?.[locale] || "Blog Title"}
                    </h3>
                    <ul className="meta-info">
                      <li>
                        <a href="#">by {blog.author || "Unknown Author"}</a>
                      </li>
                      <li>
                        <a href="#">{formatDate(blog.createdAt)}</a>
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
                            blog.description?.[locale] ||
                            "No content available.",
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
                            <span>Tags:</span> {tags.join(", ")}
                          </p>
                        </div>
                        <div className="social-share pull-right">
                          <h5>
                            Share
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
                                      blog.title?.[locale] || ""
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
