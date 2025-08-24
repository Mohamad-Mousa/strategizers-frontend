"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const ContentSlider = ({
  items = [],
  className = "",
  slidesPerView = 3,
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
  onClick = () => {},
}) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Custom styles for navigation buttons
    const style = document.createElement("style");
    style.textContent = `
             .content-swiper {
         height: auto;
       }
       
       .content-swiper .swiper-wrapper {
         align-items: stretch;
         display: flex;
       }
       
       .content-swiper .swiper-slide {
         height: auto;
         display: flex;
         align-items: stretch;
       }
       
       .content-swiper .swiper-button-next,
      .content-swiper .swiper-button-prev {
        color: #333;
        background: rgba(255, 255, 255, 0.9);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: all 0.3s ease;
      }
      
      .content-swiper .swiper-button-next:hover,
      .content-swiper .swiper-button-prev:hover {
        background: #fff;
        color: #000;
        transform: scale(1.1);
      }
      
      .content-swiper .swiper-button-next::after,
      .content-swiper .swiper-button-prev::after {
        font-size: 18px;
        font-weight: bold;
      }
      
      .content-swiper .swiper-pagination-bullet {
        background: #333;
        opacity: 0.5;
      }
      
      .content-swiper .swiper-pagination-bullet-active {
        opacity: 1;
        background: #007bff;
      }
      
             .content-swiper .swiper-slide {
         transition: transform 0.3s ease;
         height: auto;
         display: flex;
         align-items: stretch;
       }
      
      .content-swiper .swiper-slide:hover {
        transform: translateY(-5px);
      }
      
             .content-swiper .single-item {
         padding: 20px;
         text-align: center;
         background: #fff;
         border-radius: 8px;
         box-shadow: 0 4px 8px rgba(0,0,0,0.1);
         height: 100%;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         width: 100%;
         min-height: 0;
         flex: 1;
       }
      
      .content-swiper .img-holder {
        margin-bottom: 20px;
      }
      
      .content-swiper .img-holder img {
        border-radius: 8px;
      }
      
      .content-swiper .text-holder h3 {
        margin-bottom: 10px;
        color: #333;
        font-size: 18px;
        font-weight: bold;
      }
      
      .content-swiper .text-holder span {
        color: #007bff;
        font-weight: 500;
        display: block;
        margin-bottom: 10px;
      }
      
             .content-swiper .text-holder {
         flex: 1;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
       }
       
       .content-swiper .text-holder p {
         color: #666;
         line-height: 1.6;
         margin: 0;
         flex: 1;
       }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`content-swiper-container ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        autoplay={
          autoplay ? { delay: 4000, disableOnInteraction: false } : false
        }
        loop={loop}
        effect={effect}
        breakpoints={breakpoints}
        className="content-swiper"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className={`single-item text-center ${
                onClick ? "cursor-pointer" : ""
              }`}
              style={{
                cursor: onClick ? "pointer" : "default",
              }}
              onClick={() => {
                if (onClick) {
                  onClick(item);
                }
              }}
            >
              <div className="img-holder">
                <img
                  src={item.image}
                  alt={item.title || `Item ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="text-holder">
                <h3>{item.title}</h3>
                <span>{item.date}</span>
                <p>{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentSlider;
