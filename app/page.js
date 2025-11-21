import Link from "next/link";
import MovieCard from "@/components/MovieCard";

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
      return [];
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
      return [];
    }
  }
  const trendingMovies = await getTrendingMovies();
  const trendingSeries = await getTrendingSeries();
  const first10TrendingSeries = trendingSeries.slice(0, 10);
  const first10TrendingMovies = trendingMovies.slice(0, 10);

  const heroMovie = trendingMovies[0];

  return (
    <div className="mt-4 grow">
      {heroMovie && (
        <div className="relative h-[500px] md:h-[700px] overflow-hidden mb-12">
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent"></div>
          <div className="relative z-10 flex flex-col justify-end h-full p-4 md:p-8 text-white max-w-screen-xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-shadow mb-4">
              {heroMovie.title}
            </h1>
            <p className="text-lg md:text-xl mb-4 max-w-2xl line-clamp-3">
              {heroMovie.overview}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-lg md:text-xl font-semibold">
                ⭐ {heroMovie.vote_average.toFixed(1)}
              </span>
              <span className="text-lg md:text-xl font-semibold">
                {heroMovie.release_date?.substring(0, 4)}
              </span>
            </div>
            <Link href={`/movie/${heroMovie.id}`}>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors">
                Watch Now
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-8 md:mt-8">
          <h2 className="text-3xl font-bold flex items-center">
            <span className="bg-red-600 w-2 h-8 mr-3"></span>
            TOP 10 MOVIES
          </h2>
          <Link href="/movies">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-base transition-colors">
              View More
            </button>
          </Link>
        </div>
        <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {trendingMovies &&
            first10TrendingMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
        <div className="flex items-center justify-between mb-8 mt-4 md:mt-8">
          <h2 className="text-3xl font-bold flex items-center">
            <span className="bg-red-600 w-2 h-8 mr-3"></span>
            TOP 10 SERIES
          </h2>
          <Link href="/series">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-base transition-colors">
              View More
            </button>
          </Link>
        </div>
        <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {trendingSeries &&
            first10TrendingSeries.map((serie) => (
              <MovieCard movie={serie} key={serie.id} isSeries={true} />
            ))}
        </div>
      </div>
    </div>
  );
}