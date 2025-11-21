import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const response = await fetch(
      `https://vidsrc.me/embed/movie?tmdb=${id}&ds_lang=es&autoplay=1`
    );
    // console.log(response.url); // Removed console.log
    // const data = await response.json();
    return NextResponse.json(response.url);
  } catch (error) {
    console.error(error); // Changed to console.error for actual errors
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}