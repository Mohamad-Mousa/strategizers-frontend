"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useParams } from "next/navigation";

const TestimonialsSlider = ({ items }) => {
  const { locale } = useParams();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % items.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [items.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!items || items.length === 0) {
    return (
      <section className="testimonial-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="testimonial-carousel">
                <div className="single-item">
                  <div className="text-box">
                    <p>No testimonials available at the moment.</p>
                    <span className="border"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonial-area">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="testimonial-carousel">
              <div className="single-item">
                <div className="text-box">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: items[currentSlide]?.description?.[locale],
                    }}
                  />
                  <span className="border"></span>
                </div>
                <div className="client-info">
                  <h3>
                    {items[currentSlide]?.name?.[locale] ||
                      items[currentSlide]?.name?.en}
                  </h3>
                  <span>
                    {items[currentSlide]?.position?.[locale] ||
                      items[currentSlide]?.position?.en}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div
              className="testimonial-dots"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "1px solid white",
                    backgroundColor:
                      index === currentSlide ? "white" : "transparent",
                    margin: "0 5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            {items.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  style={{
                    position: "absolute",
                    left: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={nextSlide}
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
