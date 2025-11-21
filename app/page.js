import Link from "next/link";

import MovieCard from "@/components/Movie-card";

export default async function Home() {
  async function getTrendingMovies() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.MOVIEDB_API_BEARER,
      },
    };
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
    }
  }
  async function getTrendingSeries() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.MOVIEDB_API_BEARER,
      },
    };
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
    }
  }
  const trendingMovies = await getTrendingMovies();
  const trendingSeries = await getTrendingSeries();
  const first10TrendingSeries = trendingSeries.slice(0, 10);
  const first10TrendingMovies = trendingMovies.slice(0, 10);

  return (
    <div className=" mt-4 grow p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-red-500 text-4xl md:text-5xl font-bold">
            TOP 10
          </h2>
          <div className="flex flex-col text-white text-xl tracking-[8px] uppercase">
            <span>Content</span>
            <span>Today</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-8 flex items-center md:mt-8">
          <span className="bg-red-600 w-2 h-8 mr-3"></span>
          TOP 10 MOVIES
        </h2>
        <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-10 gap-4">
          {trendingMovies &&
            first10TrendingMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
        <h2 className="text-3xl font-bold mb-8 flex items-center mt-4 md:mt-8">
          <span className="bg-red-600 w-2 h-8 mr-3"></span>
          TOP 10 SERIES
        </h2>
        <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-10 gap-4">
          {trendingSeries &&
            first10TrendingSeries.map((serie) => (
              <MovieCard movie={serie} key={serie.id} />
            ))}
        </div>
      </div>
    </div>
  );
}
