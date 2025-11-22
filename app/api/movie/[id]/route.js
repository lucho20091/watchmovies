import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  const vidsrcUrl = `https://vidsrc.me/embed/movie?tmdb=${id}&ds_lang=es&autoplay=1`;
  const vidkingUrl = `https://www.vidking.net/embed/movie/${id}`;
  try {
    const response = await fetch(vidkingUrl);
    return NextResponse.json(vidkingUrl);
  } catch (error) {
    console.error(error); // Changed to console.error for actual errors
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
