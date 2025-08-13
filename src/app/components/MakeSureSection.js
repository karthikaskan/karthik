"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MakeSureSection({ data }) {
  const [imageUrl, setImageUrl] = useState("");

  const secondItem = data.solution_scroller?.[1];
  const secondContent = secondItem?.solution_scroller_content;
  const secondContentHeader = secondItem?.solution_scroller_title;
  const secondImageId = secondItem?.empower_customers_images;

  // Fetch image from WP media API
  useEffect(() => {
    if (secondImageId) {
      fetch(`https://boomimart.com/wp-json/wp/v2/media/${secondImageId}`)
        .then((res) => res.json())
        .then((mediaData) => {
          setImageUrl(mediaData?.source_url || "");
        })
        .catch((err) => console.error("Image fetch error:", err));
    }
  }, [secondImageId]);

  // Last line
  const lastLine = secondContent
    ?.split("\n")
    .filter((line) => line.trim() !== "")
    .pop();

  // Middle lines (2nd to 4th)
  const lines = secondContent
    ?.split("\n")
    .filter((line) => line.trim() !== "");
  const secondLine = lines?.[1];
  const thirdLine = lines?.[2];
  const fourthLine = lines?.[3];

  return (
    <section className="body-wrapper body-wrapper2">
      <div className="content-layout">
        <div className="text-column">
          {/* Split content on new lines and render */}
          <h2 className="second-header">{secondContentHeader?.split("\n")[0]}</h2>
          <p>{secondContent?.split("\n")[0]}</p>
          <p className="second-3rd-line">{secondLine}</p>
          <p className="second-3rd-line">{thirdLine}</p>
          <p className="second-3rd-line">{fourthLine}</p>
          <p className="firstContentLastline">{lastLine}</p>
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
