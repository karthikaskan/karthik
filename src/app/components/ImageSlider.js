 "use client"
 import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Imageslider({ data }) {
  const logos = data?.companies_logo || [];
  const [images, setImages] = useState({});

  useEffect(() => {
    async function fetchImages() {
      const imageMap = {};
      for (let logo of logos) {
        try {
          const res = await fetch(`https://boomimart.com/wp-json/wp/v2/media/${logo.companies_images}`);
          const json = await res.json();
          imageMap[logo.companies_images] = json?.source_url || '';
        } catch (err) {
          console.error('Error fetching image', err);
        }
      }
      setImages(imageMap);
    }
    if (logos.length) fetchImages();
  }, [logos]);

  return (
    <section className='imageslider'>
      <div className='imageslider-container'>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          modules={[Autoplay]}
          breakpoints={{
            320: { spaceBetween: 60 }
          }}
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index}>
              <Link href={logo.companies_url} target="_blank" rel="noopener noreferrer">
        <div className='image-slider-div'>        {images[logo.companies_images] ? (
                  <Image
                    src={images[logo.companies_images]}
                    alt={`Company Logo ${index + 1}`}
                    width={50}
                    height={40}
                    className='brands'
                  />
                ) : (
                  <div/>
                )}</div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
