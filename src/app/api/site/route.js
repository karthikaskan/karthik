import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://boomimart.com/wp-json/wp/v2/pages/5");
    if (!res.ok) throw new Error("Failed to fetch external API");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

