"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function StartSection({ data }) {
  const [imageUrl, setImageUrl] = useState("");

  const thirdItem = data.solution_scroller?.[2];
  const third = thirdItem?.solution_scroller_content;
  const thirdContentHeader = thirdItem?.solution_scroller_title;
  const thirdImageId = thirdItem?.empower_customers_images;

  // Fetch image from WP media API
  useEffect(() => {
    if (thirdImageId) {
      fetch(`https://boomimart.com/wp-json/wp/v2/media/${thirdImageId}`)
        .then((res) => res.json())
        .then((mediaData) => {
          setImageUrl(mediaData?.source_url || "");
        })
        .catch((err) => console.error("Image fetch error:", err));
    }
  }, [thirdImageId]);

  return (
    <section className="body-wrapper third-wrapper">
      <div className="content-layout">
        <div className="text-column">
          <h2 className="third-header">{thirdContentHeader?.split("\n")[0]}</h2>
          <p>{third?.split("\n")[0]}</p>
        </div>

        <div className="image-column">
          {imageUrl && (
            <Image
              className="emp-image"
              src={imageUrl}
              alt="Empower Visual"
              width={400}
              height={300}
            />
          )}
        </div>
      </div>
    </section>
  );
}
