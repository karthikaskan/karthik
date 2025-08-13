// lib/apiBoomimart.js

const API_BASE = "https://boomimart.com/wp-json/wp/v2";

// ✅ Get all posts
export async function getBoomimartPosts() {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error("Failed to fetch Boomimart posts");
  return res.json();
}

// ✅ Get single post by ID
export async function getBoomimartPostById(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch Boomimart post with ID ${id}`);
  return res.json();
}

// ✅ If you need media also
export async function getBoomimartMedia() {
  const res = await fetch(`${API_BASE}/media`);
  if (!res.ok) throw new Error("Failed to fetch Boomimart media");
  return res.json();
}
