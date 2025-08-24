"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Slider = ({
  images = [],
  className = "",
  slidesPerView = 4,
  spaceBetween = 30,
  autoplay = true,
  loop = true,
  navigation = true,
  pagination = false,
  effect = "slide",
  breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
}) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Custom styles for navigation buttons
    const style = document.createElement("style");
    style.textContent = `
      .swiper-button-next,
      .swiper-button-prev {
        color: #333;
        background: rgba(255, 255, 255, 0.9);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: all 0.3s ease;
      }
      
      .swiper-button-next:hover,
      .swiper-button-prev:hover {
        background: #fff;
        color: #000;
        transform: scale(1.1);
      }
      
      .swiper-button-next::after,
      .swiper-button-prev::after {
        font-size: 18px;
        font-weight: bold;
      }
      
      .swiper-pagination-bullet {
        background: #333;
        opacity: 0.5;
      }
      
      .swiper-pagination-bullet-active {
        opacity: 1;
        background: #007bff;
      }
      
      .swiper-slide {
        transition: transform 0.3s ease;
      }
      
      .swiper-slide:hover {
        transform: scale(1.05);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`custom-swiper-container ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        autoplay={
          autoplay ? { delay: 3000, disableOnInteraction: false } : false
        }
        loop={loop}
        effect={effect}
        breakpoints={breakpoints}
        className="achievements-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="single-item">
              <img
                src={image.src}
                alt={image.alt || `Achievement ${index + 1}`}
                style={{
                  width: "100%",
                  height: "130px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
