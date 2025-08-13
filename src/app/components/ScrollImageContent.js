

// const [slides, setSlides] = useState([]);
// const [index, setIndex] = useState(0);
// const [prevIndex, setPrevIndex] = useState(null);
// const [bgIndex, setBgIndex] = useState(0);
// const [direction, setDirection] = useState("down"); // 'down' or 'up'
// const isThrottled = useRef(false);
// const touchStartY = useRef(null);

// const pageApi = "https://boomimart.com/wp-json/wp/v2/pages/5";

// const fetchMediaUrl = async (id) => {
//   try {
//     const res = await fetch(`https://boomimart.com/wp-json/wp/v2/media/${id}`);
//     const data = await res.json();
//     return data?.source_url || "";
//   } catch (e) {
//     console.error("Failed to fetch media", id, e);
//     return "";
//   }
// };

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const res = await fetch(pageApi);
//       const pageData = await res.json();

//       const left = pageData?.acf?.service_left_repeater || [];
//       const right = pageData?.acf?.client_right_repeater || [];

//       const mergedSlides = await Promise.all(
//         left.map(async (l, i) => {
//           const r = right[i] || {};
//           const mainImgUrl = r.service_client_card_img
//             ? await fetchMediaUrl(r.service_client_card_img)
//             : "";

//           const transBgImgs = await Promise.all(
//             (r.service_trans_bg_img_repeater || []).map(async (bg) =>
//               await fetchMediaUrl(bg.service_trans_bg_img)
//             )
//           );

//           return {
//             leftBg: l.services_client_container_bg,
//             title: l.service_client_card_title,
//             desc: l.service_client_card_desc,
//             icon: l.service_client_card_btn_icon,
//             leftCircle: l.service_left_circle_bg_color,
//             rightMainImg: mainImgUrl,
//             rightCircle: r.service_right_circle_bg_color,
//             rightBgImgs: transBgImgs,
//             rightAlt: r.service_client_card_alt,
//           };
//         })
//       );

//       setSlides(mergedSlides);
//     } catch (err) {
//       console.error("Failed to fetch page data", err);
//     }
//   };

//   fetchData();
// }, []);

// Rotate background overlay images every 3s while slide is active
// useEffect(() => {
//   if (!slides[index]) return;
//   const imgs = slides[index].rightBgImgs || [];
//   if (imgs.length <= 1) return; // no rotation needed

//   const interval = setInterval(() => {
//     setBgIndex((prev) => (prev + 1) % imgs.length);
//   }, 3000);

//   return () => clearInterval(interval);
// }, [index, slides]);

// const clamp = (i) => Math.max(0, Math.min(i, slides.length - 1));

// const goTo = (newIndex) => {
//   newIndex = clamp(newIndex);
//   if (newIndex === index) return;
//   setDirection(newIndex > index ? "down" : "up");
//   setPrevIndex(index);
//   setIndex(newIndex);
//   setBgIndex(0); // reset overlay sequence
// };

// const onWheel = (e) => {
//   if (isThrottled.current) return;
//   isThrottled.current = true;
//   setTimeout(() => (isThrottled.current = false), 700);
//   if (e.deltaY > 0) goTo(index + 1);
//   else if (e.deltaY < 0) goTo(index - 1);
// };

// const onTouchStart = (e) => {
//   touchStartY.current = e.touches ? e.touches[0].clientY : e.clientY;
// };

// const onTouchEnd = (e) => {
//   if (touchStartY.current == null) return;
//   const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
//   const dy = touchStartY.current - endY;
//   if (Math.abs(dy) > 40) {
//     if (dy > 0) goTo(index + 1);
//     else goTo(index - 1);
//   }
//   touchStartY.current = null;
// };

// useEffect(() => {
//   window.addEventListener("wheel", onWheel, { passive: true });
//   window.addEventListener("touchstart", onTouchStart, { passive: true });
//   window.addEventListener("touchend", onTouchEnd, { passive: true });
//   return () => {
//     window.removeEventListener("wheel", onWheel);
//     window.removeEventListener("touchstart", onTouchStart);
//     window.removeEventListener("touchend", onTouchEnd);
//   };
// }, [index, slides]);

// // clear prevIndex after animation duration
// useEffect(() => {
//   if (prevIndex === null) return;
//   const t = setTimeout(() => setPrevIndex(null), 900);
//   return () => clearTimeout(t);
// }, [prevIndex]);

// if (slides.length === 0) return <div>Loading...</div>;

// const active = slides[index];
// const prev = prevIndex !== null ? slides[prevIndex] : null;

// return (
//   <section className="sic-container" aria-roledescription="scroll-image-content">
//     {/* LEFT */}
//     <div className="sic-split sic-left" style={{ backgroundColor: active.leftBg }}>
//       {/* previous content (animating out) */}
//       {prev && (
//         <div
//           className={`sic-content sic-content-prev sic-content-out-${direction}`}
//           key={`left-prev-${prevIndex}`}
//           aria-hidden
//         >
//           <h2 className="sic-title">{prev.title}</h2>
//           <p className="sic-subtitle">{prev.desc}</p>
//         </div>
//       )}

//       {/* active content (animating in) */}
//       <div className={`sic-content sic-content-active sic-content-in-${direction}`} key={`left-active-${index}`}>
//         <h2 className="sic-title">{active.title}</h2>
//         <p className="sic-subtitle">{active.desc}</p>
//       </div>

//       {/* pager */}
//       <div className="sic-controls">
//         {slides.map((_, i) => (
//           <button
//             key={i}
//             className={`sic-dot ${i === index ? "active" : ""}`}
//             onClick={() => goTo(i)}
//             aria-label={`Go to slide ${i + 1}`}
//           />
//         ))}
//       </div>
//     </div>

//     {/* RIGHT */}
//     <div className="sic-split sic-right" style={{ background: active.rightCircle }}>
//       <div className="sic-image-stage">
//         {/* rotating overlay/background (keyed by index+bgIndex so it remounts on slide change) */}
//         {active.rightBgImgs?.length > 0 && (
//           <div className="sic-bg-rotating" key={`bg-${index}-${bgIndex}`}>
//             <Image src={active.rightBgImgs[bgIndex]} alt="overlay" fill style={{ objectFit: "contain" }} />
//           </div>
//         )}

//         {/* previous main image (animating out) */}
//         {prev && (
//           <div className={`sic-image-wrap sic-image-prev sic-image-out-${direction}`} key={`img-prev-${prevIndex}`}>
//             <Image src={prev.rightMainImg} alt={prev.rightAlt || ""} fill style={{ objectFit: "cover" }} />
//           </div>
//         )}

//         {/* active main image (animating in) */}
//         <div className={`sic-image-wrap sic-image-active sic-image-in-${direction}`} key={`img-active-${index}`}>
//           <Image src={active.rightMainImg} alt={active.rightAlt || ""} fill style={{ objectFit: "cover" }} />
//         </div>
//       </div>
//     </div>
//   </section>
// );






// import Image from "next/image";

// export default function ScrollImageContent() {
//   return (
//     <section className="services_client" id="services_client">
//       <div className="common_container">
//         <div
//           className="service_left_circle"
//           style={{
//             background:
//               "linear-gradient(45deg, rgb(143, 188, 98), rgb(237, 255, 220))",
//           }}
//         ></div>

//         <div
//           className="services_client_container"
//           style={{ background: "rgb(245, 255, 236)" }}
//         >
//           <div className="service_left">
//             <div className="service_left_repeater">
//               <div
//                 className="service_left_card service_card"
//                 data-index="0"
//                 style={{
//                   opacity: 1,
//                   pointerEvents: "auto",
//                 }}
//               >
//                 <h3>Mobile App for customers</h3>
//                 <p>
//                   A user-friendly mobile application that provides customers
//                   with a seamless shopping experience. It includes features like
//                   product browsing, secure checkout, order tracking, and
//                   personalized recommendations.
//                 </p>
//                 <span
//                   className="services_client_container_bg"
//                   data-bg="#f5ffec"
//                 ></span>
//                 <span
//                   className="service_circle_color service_left_circle_bg"
//                   data-bg="linear-gradient(45deg, #8fbc62, #edffdc)"
//                 ></span>
//               </div>

//               <div
//                 className="service_left_card service_card"
//                 data-index="1"
//                 style={{
//                   opacity: 0,
//                   pointerEvents: "none",
//                 }}
//               >
//                 <h3>Needs to be Web App Admin</h3>
//                 <p>
//                   A powerful web-based admin panel that provides complete
//                   control over the e-commerce store. Manage products, orders,
//                   customer data, and reports efficiently with an intuitive and
//                   secure interface.
//                 </p>
//                 <span
//                   className="services_client_container_bg"
//                   data-bg="#f7eaff"
//                 ></span>
//                 <span
//                   className="service_circle_color service_left_circle_bg"
//                   data-bg="linear-gradient(45deg,  #7d62bc, #ffdcff)"
//                 ></span>
//               </div>

//               <div
//                 className="service_left_card service_card"
//                 data-index="2"
//                 style={{
//                   opacity: 0,
//                   pointerEvents: "none",
//                 }}
//               >
//                 <h3>Web application</h3>
//                 <p>
//                   A fully responsive e-commerce web platform that allows users
//                   to explore products, place orders, and manage their accounts
//                   effortlessly. It ensures a smooth and engaging shopping
//                   experience on all devices.
//                 </p>
//                 <span
//                   className="services_client_container_bg"
//                   data-bg="#f2f7ff"
//                 ></span>
//                 <span
//                   className="service_circle_color service_left_circle_bg"
//                   data-bg="linear-gradient(45deg, #95e3ff , #ffdce2 60%)"
//                 ></span>
//               </div>

//               <div
//                 className="service_left_card service_card"
//                 data-index="3"
//                 style={{ opacity: 0 }}
//               >
//                 <h3>Mobile App admin dashboard</h3>
//                 <p>
//                   A dedicated mobile app for administrators to manage orders,
//                   track inventory, process payments, and monitor customer
//                   activities in real-time, ensuring smooth business operations.
//                 </p>
//                 <span
//                   className="services_client_container_bg"
//                   data-bg="#f0f7ff"
//                 ></span>
//                 <span
//                   className="service_circle_color service_left_circle_bg"
//                   data-bg="linear-gradient(45deg, #95c6ff 25%, #fcb868)"
//                 ></span>
//               </div>
//             </div>
//           </div>

//           <div className="service_right">
//             <div className="service_right_repeater">
//               <div
//                 className="service_right_card service_card"
//                 data-index="0"
//                 style={{
//                   opacity: 1,
//                   pointerEvents: "auto",
//                   transform: "rotate(0deg)",
//                 }}
//               >
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/05/Petkadainew.webp"
//                   alt="Mobile App for customers"
//                   width={300}
//                   height={300}
//                 />
//                 <span
//                   className="service_circle_color service_right_circle_bg"
//                   data-bg="linear-gradient(45deg,#edffdc,  #8fbc62)"
//                 ></span>
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/1.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_0_0"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/3.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_0_1"
//                   width={100}
//                   height={100}
//                 />
//               </div>

//               <div
//                 className="service_right_card service_card"
//                 data-index="1"
//                 style={{
//                   opacity: 0,
//                   pointerEvents: "none",
//                   transform: "rotate(90deg)",
//                 }}
//               >
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/05/boomimart_mobilenew.webp"
//                   alt="Mobile App admin dashboard"
//                   width={300}
//                   height={300}
//                 />
//                 <span
//                   className="service_circle_color service_right_circle_bg"
//                   data-bg="linear-gradient(45deg, #ffdcff, #7d62bc)"
//                 ></span>
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/3.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_1_0"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/1.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_1_1"
//                   width={100}
//                   height={100}
//                 />
//               </div>

//               <div
//                 className="service_right_card service_card"
//                 data-index="2"
//                 style={{
//                   opacity: 0,
//                   pointerEvents: "none",
//                   transform: "rotate(180deg)",
//                 }}
//               >
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/05/offbeat-new.webp"
//                   alt="Web application"
//                   width={300}
//                   height={300}
//                 />
//                 <span
//                   className="service_circle_color service_right_circle_bg"
//                   data-bg="linear-gradient(45deg, #95e3ff , #ffdce2 60%)"
//                 ></span>
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/Discount.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_2_0"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/14.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_2_1"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/cart.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_2_2"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/Products.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_2_3"
//                   width={100}
//                   height={100}
//                 />
//               </div>

//               <div
//                 className="service_right_card service_card"
//                 data-index="3"
//                 style={{
//                   opacity: 0,
//                   pointerEvents: "none",
//                   transform: "rotate(270deg)",
//                 }}
//               >
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/05/27a83f0ea60-2-scaledwebp.webp"
//                   alt="Needs to be Web App Admin"
//                   width={300}
//                   height={300}
//                 />
//                 <span
//                   className="service_circle_color service_right_circle_bg"
//                   data-bg="linear-gradient(45deg, #fcb868, #95c6ff 75%)"
//                 ></span>
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/Order.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_3_0"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/CRM.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_3_1"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/POS.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_3_2"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/dashboard.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_3_3"
//                   width={100}
//                   height={100}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           className="service_right_circle"
//           style={{
//             background:
//               "linear-gradient(45deg, rgb(237, 255, 220), rgb(143, 188, 98))",
//           }}
//         ></div>
//       </div>
//     </section>
//   );
// }



// "use client";
// import { useEffect } from "react";
// import Image from "next/image";

// export default function ScrollImageContent() {
//   useEffect(() => {
//     const section = document.querySelector(".services_client");
//     if (!section) return;

//     const leftCards = document.querySelectorAll(".service_left_card");
//     const rightCards = document.querySelectorAll(".service_right_card");
//     const container = document.querySelector(".services_client_container");
//     const leftCircle = document.querySelector(".service_left_circle");
//     const rightCircle = document.querySelector(".service_right_circle");

//     let current = 0;
//     const total = leftCards.length;
//     let initialized = false;

//     function updateSlide(index) {
//       leftCards.forEach((card, i) => {
//         card.style.opacity = i === index ? "1" : "0";
//         card.style.pointerEvents = i === index ? "auto" : "none";
//       });

//       rightCards.forEach((card, i) => {
//         card.style.opacity = i === index ? "1" : "0";
//         card.style.pointerEvents = i === index ? "auto" : "none";
//         card.style.transform = `rotate(${(i - index) * 90}deg)`;
//       });

//       const bgColor = leftCards[index]
//         .querySelector(".services_client_container_bg")
//         ?.dataset.bg;
//       const leftColor = leftCards[index]
//         .querySelector(".service_left_circle_bg")
//         ?.dataset.bg;
//       const rightColor = rightCards[index]
//         .querySelector(".service_right_circle_bg")
//         ?.dataset.bg;

//       if (bgColor) container.style.background = bgColor;
//       if (leftColor) leftCircle.style.background = leftColor;
//       if (rightColor) rightCircle.style.background = rightColor;
//     }

//     function initSection() {
//       if (initialized) return;
//       initialized = true;
//       updateSlide(0);

//       const sectionTop = section.getBoundingClientRect().top + window.scrollY;
//       const sectionHeight = section.offsetHeight;

//       window.addEventListener(
//         "scroll",
//         throttle(() => {
//           const scrollY = window.scrollY;
//           const scrolled = scrollY - sectionTop;

//           if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
//             const progress = scrolled / sectionHeight;
//             const index = Math.min(Math.floor(progress * total), total - 1);
//             if (index !== current) {
//               current = index;
//               updateSlide(current);
//             }
//             section.classList.add("is-sticky");
//           } else {
//             section.classList.remove("is-sticky");
//           }
//         }, 100)
//       );
//     }

//     function throttle(func, limit) {
//       let lastFunc;
//       let lastRan;
//       return function () {
//         const context = this;
//         const args = arguments;
//         if (!lastRan) {
//           func.apply(context, args);
//           lastRan = Date.now();
//         } else {
//           clearTimeout(lastFunc);
//           lastFunc = setTimeout(function () {
//             if (Date.now() - lastRan >= limit) {
//               func.apply(context, args);
//               lastRan = Date.now();
//             }
//           }, limit - (Date.now() - lastRan));
//         }
//       };
//     }

//     const observer = new IntersectionObserver(
//       (entries, observer) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             initSection();
//             observer.disconnect();
//           }
//         });
//       },
//       { rootMargin: "200px" }
//     );

//     observer.observe(section);

//     // Cleanup when unmount
//     return () => {
//       observer.disconnect();
//       window.removeEventListener("scroll", throttle);
//     };
//   }, []);

//   return (
//  <section className="services_client" id="services_client">
//       <div className="common_container">
//        <div
//            className="service_left_circle"

//           style={{
//             background:
//               "linear-gradient(45deg, rgb(143, 188, 98), rgb(237, 255, 220))",
//           }}
//         ></div>

//         <div
//           className="services_client_container"
//           style={{ background: "rgb(245, 255, 236)" }}
//         >
//           <div className="service_left">
//             <div className="service_left_repeater">
//               <div
//                 className="service_left_card service_card"
//                 data-index="0"
//                 style={{
//                   opacity: 1,
//                   pointerEvents: "auto",
//                 }}
//               >
//                 <h3>Mobile App for customers</h3>
//                 <p>
//                   A user-friendly mobile application that provides customers
//                   with a seamless shopping experience. It includes features like
//                   product browsing, secure checkout, order tracking, and
//                   personalized recommendations.
//                 </p>
//                 <span
//                   className="services_client_container_bg"
//                   data-bg="#f5ffec"
//                 ></span>
//                 <span
//                   className="service_circle_color service_left_circle_bg"
//                   data-bg="linear-gradient(45deg, #8fbc62, #edffdc)"
//                 ></span>
//               </div>

//               <div
//                 className="service_left_card service_card"
//                 data-index="1"
//                 style={{
//                   opacity: 0,
//                   pointerEvents: "none",
//                 }}
//               >
//                 <h3>Needs to be Web App Admin</h3>
//                 <p>
//                   A powerful web-based admin panel that provides complete
//                   control over the e-commerce store. Manage products, orders,
//                   customer data, and reports efficiently with an intuitive and
//                   secure interface.
//                 </p>
//                 <span
//                   className="services_client_container_bg"
//                   data-bg="#f7eaff"
//                 ></span>
//                 <span
//                   className="service_circle_color service_left_circle_bg"
//                   data-bg="linear-gradient(45deg,  #7d62bc, #ffdcff)"
//                 ></span>
//               </div>

//               <div
//                 className="service_left_card service_card"
//                 data-index="2"
//                 style={{
//                   opacity: 0,
//                   pointerEvents: "none",
//                 }}
//               >
//                 <h3>Web application</h3>
//                 <p>
//                   A fully responsive e-commerce web platform that allows users
//                   to explore products, place orders, and manage their accounts
//                   effortlessly. It ensures a smooth and engaging shopping
//                   experience on all devices.
//                 </p>
//                 <span
//                   className="services_client_container_bg"
//                   data-bg="#f2f7ff"
//                 ></span>
//                 <span
//                   className="service_circle_color service_left_circle_bg"
//                   data-bg="linear-gradient(45deg, #95e3ff , #ffdce2 60%)"
//                 ></span>
//               </div>

//               <div
//                 className="service_left_card service_card"
//                 data-index="3"
//                 style={{ opacity: 0 }}
//               >
//                 <h3>Mobile App admin dashboard</h3>
//                 <p>
//                   A dedicated mobile app for administrators to manage orders,
//                   track inventory, process payments, and monitor customer
//                   activities in real-time, ensuring smooth business operations.
//                 </p>
//                 <span
//                   className="services_client_container_bg"
//                   data-bg="#f0f7ff"
//                 ></span>
//                 <span
//                   className="service_circle_color service_left_circle_bg"
//                   data-bg="linear-gradient(45deg, #95c6ff 25%, #fcb868)"
//                 ></span>
//               </div>
//             </div>
//           </div>

//           <div className="service_right">
//             <div className="service_right_repeater">
//               <div
//                 className="service_right_card service_card"
//                 data-index="0"
//                 style={{
//                   opacity: 1,
//                   pointerEvents: "auto",
//                   transform: "rotate(0deg)",
//                 }}
//               >
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/05/Petkadainew.webp"
//                   alt="Mobile App for customers"
//                   width={300}
//                   height={300}
//                 />
//                 <span
//                   className="service_circle_color service_right_circle_bg"
//                   data-bg="linear-gradient(45deg,#edffdc,  #8fbc62)"
//                 ></span>
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/1.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_0_0"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/3.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_0_1"
//                   width={100}
//                   height={100}
//                 />
//               </div>

//               <div
//                 className="service_right_card service_card"
//                 data-index="1"
//                 style={{
//                   opacity: 0,
//                   pointerEvents: "none",
//                   transform: "rotate(90deg)",
//                 }}
//               >
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/05/boomimart_mobilenew.webp"
//                   alt="Mobile App admin dashboard"
//                   width={300}
//                   height={300}
//                 />
//                 <span
//                   className="service_circle_color service_right_circle_bg"
//                   data-bg="linear-gradient(45deg, #ffdcff, #7d62bc)"
//                 ></span>
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/3.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_1_0"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/1.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_1_1"
//                   width={100}
//                   height={100}
//                 />
//               </div>

//               <div
//                 className="service_right_card service_card"
//                 data-index="2"
//                 style={{
//                   opacity: 0,
//                   pointerEvents: "none",
//                   transform: "rotate(180deg)",
//                 }}
//               >
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/05/offbeat-new.webp"
//                   alt="Web application"
//                   width={300}
//                   height={300}
//                 />
//                 <span
//                   className="service_circle_color service_right_circle_bg"
//                   data-bg="linear-gradient(45deg, #95e3ff , #ffdce2 60%)"
//                 ></span>
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/Discount.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_2_0"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/14.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_2_1"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/cart.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_2_2"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/Products.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_2_3"
//                   width={100}
//                   height={100}
//                 />
//               </div>

//               <div
//                 className="service_right_card service_card"
//                 data-index="3"
//                 style={{
//                   opacity: 0,
//                   pointerEvents: "none",
//                   transform: "rotate(270deg)",
//                 }}
//               >
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/05/27a83f0ea60-2-scaledwebp.webp"
//                   alt="Needs to be Web App Admin"
//                   width={300}
//                   height={300}
//                 />
//                 <span
//                   className="service_circle_color service_right_circle_bg"
//                   data-bg="linear-gradient(45deg, #fcb868, #95c6ff 75%)"
//                 ></span>
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/Order.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_3_0"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/CRM.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_3_1"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/POS.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_3_2"
//                   width={100}
//                   height={100}
//                 />
//                 <Image
//                   loading="lazy"
//                   src="https://boomimart.com/wp-content/uploads/2025/04/dashboard.png"
//                   alt="Transparent Logo Images"
//                   className="trans_png trans_png_3_3"
//                   width={100}
//                   height={100}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           className="service_right_circle"
//           style={{
//             background:
//               "linear-gradient(45deg, rgb(237, 255, 220), rgb(143, 188, 98))",
//           }}
//         ></div>
//       </div>
//     </section>
//   );
// }


"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ScrollImageContent() {
  const [slides, setSlides] = useState([]);
  const sectionRef = useRef(null);
  const throttledHandlerRef = useRef(null);



  const pageApi = "https://boomimart.com/wp-json/wp/v2/pages/5";
  const mediaBase = "https://boomimart.com/wp-json/wp/v2/media/";

  // helper to fetch media by ID -> returns source_url or empty string
  const fetchMediaUrl = async (id) => {
    try {
      const res = await fetch(`${mediaBase}${id}`);
      if (!res.ok) return "";
      const data = await res.json();
      return data?.source_url || "";
    } catch (e) {
      console.error("fetchMediaUrl error for id", id, e);
      return "";
    }
  };

  // fetch page data and resolve all media IDs to URLs, then merge left+right by index
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(pageApi);
        if (!res.ok) {
          console.error("Failed to fetch page:", res.status);
          return;
        }
        const pageData = await res.json();
        const left = pageData?.acf?.service_left_repeater || [];
        const right = pageData?.acf?.client_right_repeater || [];

        //  max length (in case they differ)
        const maxLen = Math.max(left.length, right.length);

        const merged = await Promise.all(
          Array.from({ length: maxLen }).map(async (_, i) => {
            const l = left[i] || {};
            const r = right[i] || {};

            // main image
            let rightMainImg = "";
            if (r.service_client_card_img) {
              rightMainImg = await fetchMediaUrl(r.service_client_card_img);
            }

            // background/trans pngs
            const transArr = r.service_trans_bg_img_repeater || [];
            const rightBgImgs = await Promise.all(
              transArr.map(async (t) => {
                return t?.service_trans_bg_img
                  ? await fetchMediaUrl(t.service_trans_bg_img)
                  : "";
              })
            );

            return {
              // left side
              leftBg: l.services_client_container_bg || "",
              title: l.service_client_card_title || "",
              desc: l.service_client_card_desc || "",
              icon: l.service_client_card_btn_icon || "",
              leftCircle: l.service_left_circle_bg_color || "",

              // right side
              rightMainImg,
              rightAlt: r.service_client_card_alt || "",
              rightCircle: r.service_right_circle_bg_color || "",
              rightBgImgs: rightBgImgs.filter(Boolean), // remove empty
            };
          })
        );

        if (!cancelled) setSlides(merged);
      } catch (err) {
        console.error("Failed to load slides", err);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Once slides render, attach the DOM-driven scroll behaviour (mirrors your original script)
  useEffect(() => {
    if (!slides.length) return;

    const section = sectionRef.current;
    if (!section) return;

    const container = section.querySelector(".services_client_container");
    const leftCircle = section.querySelector(".service_left_circle");
    const rightCircle = section.querySelector(".service_right_circle");

    let current = 0;
    const total = Math.max(
      section.querySelectorAll(".service_left_card").length,
      section.querySelectorAll(".service_right_card").length
    );
    let initialized = false;

    function updateSlide(index) {
      const leftCards = section.querySelectorAll(".service_left_card");
      const rightCards = section.querySelectorAll(".service_right_card");

      leftCards.forEach((card, i) => {
        card.style.opacity = i === index ? "1" : "0";
        card.style.pointerEvents = i === index ? "auto" : "none";
      });

      rightCards.forEach((card, i) => {
        card.style.opacity = i === index ? "1" : "0";
        card.style.pointerEvents = i === index ? "auto" : "none";
        card.style.transform = `rotate(${(i - index) * 90}deg)`;
      });

      // update backgrounds from data-bg attributes
      const bgColor =
        leftCards[index]?.querySelector(".services_client_container_bg")
          ?.dataset?.bg || "";
      const leftColor =
        leftCards[index]?.querySelector(".service_left_circle_bg")?.dataset
          ?.bg || "";
      const rightColor =
        rightCards[index]?.querySelector(".service_right_circle_bg")?.dataset
          ?.bg || "";

      if (bgColor && container) container.style.background = bgColor;
      if (leftColor && leftCircle) leftCircle.style.background = leftColor;
      if (rightColor && rightCircle) rightCircle.style.background = rightColor;
    }

    function initSection() {
      if (initialized) return;
      initialized = true;
      updateSlide(0);

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;

      // create throttled scroll handler and keep reference for cleanup
      const onScroll = throttle(() => {
        const scrollY = window.scrollY;
        const scrolled = scrollY - sectionTop;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          const progress = scrolled / sectionHeight;
          const index = Math.min(Math.floor(progress * total), total - 1);
          if (index !== current) {
            current = index;
            updateSlide(current);
          }
          section.classList.add("is-sticky");
        } else {
          section.classList.remove("is-sticky");
        }
      }, 100);

      throttledHandlerRef.current = onScroll;
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    function throttle(func, limit) {
      let lastFunc;
      let lastRan;
      return function () {
        const context = this;
        const args = arguments;
        if (!lastRan) {
          func.apply(context, args);
          lastRan = Date.now();
        } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(function () {
            if (Date.now() - lastRan >= limit) {
              func.apply(context, args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan));
        }
      };
    }

    const obs = new IntersectionObserver(
      (entries, ob) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initSection();
            ob.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    obs.observe(section);

    // CLEANUP
    return () => {
      obs.disconnect();
      if (throttledHandlerRef.current)
        window.removeEventListener("scroll", throttledHandlerRef.current);
    };
  }, [slides]);
  
  
  /// sticky  
 const isStickyRef = useRef(false);

  useEffect(() => {
    const section = document.getElementById("services_client");
    if (!section) return;

    const cards = section.querySelectorAll(".service_left_card");

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const atTop = rect.top <= 0;

      // Start sticky if at top and not already sticky
      if (atTop && !isStickyRef.current) {
        section.classList.remove("no-sticky");
        isStickyRef.current = true;
      }

      if (isStickyRef.current) {
        // Find the card most visible in viewport
        let visibleCard = null;
        let maxVisible = 0;
        cards.forEach((card) => {
          const cr = card.getBoundingClientRect();
          const visibleHeight = Math.min(window.innerHeight, cr.bottom) - Math.max(0, cr.top);
          if (visibleHeight > maxVisible) {
            maxVisible = visibleHeight;
            visibleCard = card;
          }
        });

        // If visible card is index 4 → make static
        if (visibleCard && visibleCard.dataset.index === "4") {
          section.classList.add("no-sticky");
          isStickyRef.current = false;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Render the exact markup you provided, but dynamically mapped from slides
  return (
    <section className="services_client" id="services_client" ref={sectionRef}>
      <div className="common_container">
        <div
          className="service_left_circle"
          style={{
            background:
              "linear-gradient(45deg, rgb(143, 188, 98), rgb(237, 255, 220))",
          }}
        ></div>

        <div
          className="services_client_container"
          style={{ background: "rgb(245, 255, 236)" }}
        >
          <div  className="service_left">
            <div className="service_left_repeater">
              {slides.map((s, i) => (
                <div
                  key={i}
                  className="service_left_card service_card "
                  data-index={i}
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    pointerEvents: i === 0 ? "auto" : "none",
                  }}
                >
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>

                  {/* keep data-bg attributes so updateSlide can read them */}
                  <span
                    className="services_client_container_bg"
                    data-bg={s.leftBg}
                  ></span>
                  <span
                    className="service_circle_color service_left_circle_bg"
                    data-bg={s.leftCircle}
                  ></span>
                </div>
              ))}
            </div>
          </div>

          <div className="service_right">
            <div className="service_right_repeater">
              {slides.map((s, i) => (
                <div
                  key={i}
                  className="service_right_card service_card"
                  data-index={i}
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    pointerEvents: i === 0 ? "auto" : "none",
                    transform: `rotate(${i * 90}deg)`,
                  }}
                >
                  {s.rightMainImg ? (
                    <Image
                      loading="lazy"
                      src={s.rightMainImg}
                      alt={s.rightAlt || ""}
                      width={300}
                      height={300}
                    />
                  ) : null}

                  <span
                    className="service_circle_color service_right_circle_bg"
                    data-bg={s.rightCircle}
                  ></span>

                  {/* render trans pngs with same classes used on original markup */}
                  {s.rightBgImgs?.map((url, bi) => (
                    <Image
                      key={bi}
                      loading="lazy"
                      src={url}
                      alt=""
                      className={`trans_png trans_png_${i}_${bi}`}
                      width={100}
                      height={100}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="service_right_circle"
          style={{
            background:
              "linear-gradient(45deg, rgb(237, 255, 220), rgb(143, 188, 98))",
          }}
        ></div>
      </div>
    </section>
  );
}
