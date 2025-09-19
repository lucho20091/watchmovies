import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { genre } = await params;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.MOVIEDB_API_BEARER,
    },
  };
  const genresId = {
    action: 28,
    comedy: 35,
    horror: 27,
    romance: 10749,
    drama: 18,
    scifi: 878,
  };
  try {
    console.log("ran");
    console.log(genre);
    // const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}`, options);
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genresId[genre]}`,
      options
    );
    if (!response.ok) {
      NextResponse.json({ message: "network error" }, { status: 400 });
    }
    const data = await response.json();
    const first10Results = data.results.slice(0, 20);
    return NextResponse.json(first10Results);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
