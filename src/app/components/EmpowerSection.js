"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import MakeSureSection from "./MakeSureSection";
import StartSection from "./StartSection";


export default function EmpowerSection({ data }) {
  const [imageUrl, setImageUrl] = useState("");

  const firstContent = data.solution_scroller[0]?.solution_scroller_content;
  const firstContentHeader = data.solution_scroller[0]?.solution_scroller_title;
  const firstImageId = data.solution_scroller[0]?.empower_customers_images;

  useEffect(() => {
    if (firstImageId) {
      fetch(`https://boomimart.com/wp-json/wp/v2/media/${firstImageId}`)
        .then(res => res.json())
        .then(mediaData => {
          setImageUrl(mediaData?.source_url || "");
        })
        .catch(err => console.error("Image fetch error:", err));
    }
  }, [firstImageId]);

  const lastLine = firstContent
    ?.split("\n")
    .filter(line => line.trim() !== "")
    .pop();

  return (
    <> 
    <section className="body-wrapper">
      <div className="content-layout">
        <div className="text-column">
          <h2>{firstContentHeader}</h2>
          <p>{firstContent?.split("\n")[0]}</p>
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
  
  </>
  );
}
