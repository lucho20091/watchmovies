import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  console.log("ran backend");
  const { id } = await params;
  const season = request.nextUrl.searchParams.get("season");
  const episode = request.nextUrl.searchParams.get("episode");
  const options = {
    method: "Get",
    headers: {
      accept: "application/json",
      Authorization: process.env.MOVIEDB_API_BEARER,
    },
  };
  try {
    const response = await fetch(
      `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}&ds_lang=es&autoplay=1`
    );
    const responseData = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
      options
    );
    const data = await responseData.json();
    return NextResponse.json({ url: response.url, data });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
