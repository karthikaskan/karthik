// import Image from "next/image";
// import Link from "next/link";

// export default function Testimonial({ data }) {

//   /// color change
//

//   return (
//     <><div className="testi-header"><h3 className="slide-main-head">See how businesses like yours have
// found success</h3></div>
//     <section className="testimonial-section">
//       <div className="testimonial-container">
//         <div className="testimonial-left">

//           <p className="slide-main-content">

//           </p>
//           <p className="slider-founder">

//           </p>

//           {/* Stats for the current slide */}

//             <Link  href="/"className="slider-link" >

//   </Link>
//         </div>

//         <div className="testimonial-right">

//         </div>
//       </div>

// <div className="two-btn">
//   <button
//     onClick={handlePrev}
//     disabled={currentIndex === 0}
//     className={`splider-left ${currentIndex > 0 ? "active" : ""}`}
//   >
//     ←
//   </button>
//   <button
//     onClick={handleNext}
//     disabled={currentIndex === slides.length - 1}
//     className={`splider-right ${currentIndex < slides.length - 1 ? "active" : ""}`}
//   >
//     →
//   </button>
// </div>

//     </section>
//     </>
//   );
// }

// this is swiper

// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// export default function Testimonial({ data }) {
//   const slidesData = data.businesses_slider || [];
//   const [imageUrls, setImageUrls] = useState({});

//   useEffect(() => {
//     async function fetchImages() {
//       const urls = {};
//       for (let slide of slidesData) {
//         if (slide.businesses_image) {
//           const res = await fetch(`https://boomimart.com/wp-json/wp/v2/media/${slide.businesses_image}`);
//           const img = await res.json();
//           urls[slide.businesses_image] = img.source_url;
//         }
//         if (slide.business_slider_image) {
//           const res2 = await fetch(`https://boomimart.com/wp-json/wp/v2/media/${slide.business_slider_image}`);
//           const img2 = await res2.json();
//           urls[slide.business_slider_image] = img2.source_url;
//         }
//       }
//       setImageUrls(urls);
//     }
//     if (slidesData.length) fetchImages();
//   }, [slidesData]);

//   if (!slidesData.length) return <p>No testimonials found</p>;

//   return (
//       <>
//            <div className="testi-header">
//      <h3 className="slide-main-head">
//           See how businesses like yours have found success
//         </h3>
//       </div>

//     <section className="testimonial-section">

//       <Swiper
//         modules={[Navigation]}
//         navigation
//         spaceBetween={50}
//         slidesPerView={1} // ✅ Only one slide at a time
//         className="testimonial-container"
//       >
//         {slidesData.map((slide, idx) => (
//           <SwiperSlide key={idx}>
//             <div className="testimonial-container">
//               <div className="testimonial-left">
//                 <Image
//                   src={imageUrls[slide.businesses_image] || "/placeholder.png"}
//                   alt="Business Logo"
//                   className="slider-logo"
//                   width={120}
//                   height={50}
//                 />
//                 <p className="slide-main-content">{slide.bussinesses_content}</p>
//                 <p className="slider-founder">{slide.bussinesses_content_company}</p>
//                 <div className="stats-section">
//                   {(slide.see_how_businesses_slider || []).map((item, i) => (
//                     <div className="stat-box" key={i}>
//                       <h2>{item.see_how_businesses_percentage}</h2>
//                       <p>{item.see_how_businesses_percentage_content}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <Link href="/" className="slider-link">
//                   {slide.read_case}
//                 </Link>
//               </div>

//               <div className="testimonial-right">
//                 <Image
//                   src={imageUrls[slide.business_slider_image] || "/placeholder.png"}
//                   alt="Business Slide"
//                   className="right-slide-image"
//                   width={400}
//                   height={400}
//                 />
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//     </>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import Image from "next/image";
// import Link from "next/link";

// export default function Testimonial({ data }) {
//   const slides = data.businesses_slider || [];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [imageUrls, setImageUrls] = useState({});

//   useEffect(() => {
//     async function fetchImages() {
//       const urls = {};
//       for (let slide of slides) {
//         if (slide.businesses_image) {
//           const res = await fetch(
//             `https://boomimart.com/wp-json/wp/v2/media/${slide.businesses_image}`
//           );
//           const imgData = await res.json();
//           urls[slide.businesses_image] = imgData.source_url;
//         }
//         if (slide.business_slider_image) {
//           const res2 = await fetch(
//             `https://boomimart.com/wp-json/wp/v2/media/${slide.business_slider_image}`
//           );
//           const imgData2 = await res2.json();
//           urls[slide.business_slider_image] = imgData2.source_url;
//         }
//       }
//       setImageUrls(urls);
//     }
//     if (slides.length > 0) {
//       fetchImages();
//     }
//   }, [slides]);

//   if (slides.length === 0) return <p>No testimonials found</p>;

//   const currentSlide = slides[currentIndex];
//   const stats = currentSlide?.see_how_businesses_slider || [];

//   return (
//     <div className="testimony-section">
//       <div className="background-three"></div>

//       {/* Left Side Content */}

//       <Swiper
//         modules={[Navigation, Pagination]}
//         navigation
//         pagination={{ clickable: true }}
//         spaceBetween={20}
//         slidesPerView={1}
//         loop={true}
//       >
//         <SwiperSlide>
//           <div className="flex-slide">
  
//             <div className="see-how-businesses-silder-content">
//               <Image
//                 src={
//                   imageUrls[currentSlide.businesses_image] || "/placeholder.png"
//                 }
//                 alt="Business Logo"
//                 width={120}
//                 height={50}
//                 className="slider-logo"
//               />
//               <p className="quote-content-wysiwyg">
//               {currentSlide.bussinesses_content}
//               </p>
//               <strong className="quote-content-customer-name">
//                {currentSlide.bussinesses_content_company}
//               </strong>
          
//               <div className="see-how-businesses-silder-sub-parent">
//                    <div className="stats-section">
//                 {stats.map((item, index) => (
//                   <div className="stat-box" key={index}>
//                     <h2>{item.see_how_businesses_percentage}</h2>
//                     <p>{item.see_how_businesses_percentage_content}</p>
//                   </div>
//                 ))}
//               </div>
//               </div>
//               <Link
//                 href="https://www.ulamart.com"
//                 className="quote-content-link"
//               >
//                 {currentSlide.read_case}
//               </Link>
//             </div>

//             {/* Right Side Overlapping Image */}


//             <div className="see-how-businesses-silder-image">
//               <Image
//                 src={
//                   imageUrls[currentSlide.business_slider_image] ||
//                   "/placeholder.png"
//                 }
//                 alt="Business Slide"
//                 fill
//                 className="right-slide-image"
//                 style={{ objectFit: "cover" }}
//               />
// </div>
//           </div>
//           {/*  */}
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";

export default function Testimonial({ data }) {
  const slides = data.businesses_slider || [];
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    async function fetchImages() {
      const urls = {};
      for (let slide of slides) {
        if (slide.businesses_image) {
          const res = await fetch(
            `https://boomimart.com/wp-json/wp/v2/media/${slide.businesses_image}`
          );
          const imgData = await res.json();
          urls[slide.businesses_image] = imgData.source_url;
        }
        if (slide.business_slider_image) {
          const res2 = await fetch(
            `https://boomimart.com/wp-json/wp/v2/media/${slide.business_slider_image}`
          );
          const imgData2 = await res2.json();
          urls[slide.business_slider_image] = imgData2.source_url;
        }
      }
      setImageUrls(urls);
    }
    if (slides.length > 0) {
      fetchImages();
    }
  }, [slides]);

  if (slides.length === 0) return <p>No testimonials found</p>;

  return (
    <div className="testimony-section">
      <div className="background-three"></div>

<Swiper
  modules={[Navigation, Pagination]}
  navigation
  spaceBetween={20}
  slidesPerView={1}
  loop={false} // important: with loop=true, both buttons are always clickable
  onSlideChange={(swiper) => {
    const prevBtn = document.querySelector(".swiper-button-prev");
    const nextBtn = document.querySelector(".swiper-button-next");

    if (!prevBtn || !nextBtn) return;

    // Always reset both
    prevBtn.classList.remove("nav-active");
    nextBtn.classList.remove("nav-active");

    // If we're not on the first slide, show prev button fully
    if (!swiper.isBeginning) {
      prevBtn.classList.add("nav-active");
    }

    // If we're not on the last slide, show next button fully
    if (!swiper.isEnd) {
      nextBtn.classList.add("nav-active");
    }
  }}
>

        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex-slide">
              {/* Left Content */}
              <div className="see-how-businesses-silder-content">
                <Image
                  src={imageUrls[slide.businesses_image] || "/placeholder.png"}
                  alt="Business Logo"
                  width={120}
                  height={50}
                  className="slider-logo"
                />
                <p className="quote-content-wysiwyg">
                  {slide.bussinesses_content}
                </p>
                <strong className="quote-content-customer-name">
                  {slide.bussinesses_content_company}
                </strong>

                {/* Stats */}
                <div className="see-how-businesses-silder-sub-parent">
                  <div className="stats-section">
                    {slide.see_how_businesses_slider.map((item, index) => (
                      <div className="stat-box" key={index}>
                        <h2>{item.see_how_businesses_percentage}</h2>
                        <p>{item.see_how_businesses_percentage_content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Read Case Link */}
                <Link
                  href={slide.read_case_link?.url || "#"}
                  target={slide.read_case_link?.target || "_blank"}
                  className="quote-content-link"
                >
                  {slide.read_case}
                </Link>
              </div>

              {/* Right Image */}
              <div className="see-how-businesses-silder-image">
                <Image
                  src={
                    imageUrls[slide.business_slider_image] ||
                    "/placeholder.png"
                  }
                  alt="Business Slide"
                  fill
                  className="right-slide-image"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
