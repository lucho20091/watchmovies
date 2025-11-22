import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { genre } = await params;
  const sortBy = request.nextUrl.searchParams.get("sort_by") || "popularity.desc"; // Default sort by popularity
  const page = request.nextUrl.searchParams.get("page") || "1"; // Get page from query params, default to 1

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.MOVIEDB_API_BEARER,
    },
  };
  const genresId = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    drama: 18,
    fantasy: 14,
    horror: 27,
    mystery: 9648,
    romance: 10749,
    scifi: 878,
    thriller: 53,
  };
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}&with_genres=${genresId[genre]}`,
      options
    );
    if (!response.ok) {
      return NextResponse.json({ message: "network error" }, { status: 400 });
    }
    const data = await response.json();
    // No slicing here, let TMDB handle the page size (usually 20 results per page)
    return NextResponse.json({
      results: data.results,
      total_pages: data.total_pages,
      total_results: data.total_results,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}