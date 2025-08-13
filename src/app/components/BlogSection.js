"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://boomimart.com/wp-json/wp/v2/posts?_embed&per_page=3");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section className="blog-section">
      <div className="blog-header">
        <h2>Get e-commerce tips, insights and news</h2>
        <Link href="#" className="view-all">View all resources</Link>
      </div>

      <div className="blog-cards">
        {posts.map((post) => {
          const featuredImg =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg";
          const categoryName =
            post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Uncategorized";

          return (
            <div className="blog-card" key={post.id}>
              <span className="category-badge">{categoryName}</span>
              <div className="image-wrapper">
             <Image
      src={
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
          ? post._embedded["wp:featuredmedia"][0].source_url
          : "/fallback-for-blog.webp" // ✅ Fallback image from public folder
      }
      alt={post.title.rendered || "Post Image"}
      width={400}
      height={250}
      className="blog-imag"
    />
              </div>
             <div className="blog-down-div">
                 <h3
                className="blog-title"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <Link href="#" className="read-more">Read more</Link>
             </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
