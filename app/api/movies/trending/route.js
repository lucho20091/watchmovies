import { NextResponse } from "next/server";

export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || "1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.MOVIEDB_API_BEARER,
    },
  };
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      options
    );
    if (!response.ok) {
      return NextResponse.json({ message: "network error" }, { status: 400 });
    }
    const data = await response.json();
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