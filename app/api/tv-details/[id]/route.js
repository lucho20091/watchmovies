import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.MOVIEDB_API_BEARER,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
      options
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ message: "TV series not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Failed to fetch TV series data from TMDB" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in tv-details API route:", error);
    return NextResponse.json(
      { error: "Internal server error while fetching TV series details" },
      { status: 500 }
    );
  }
}