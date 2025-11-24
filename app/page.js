import Link from "next/link";
import Image from "next/image"; // Import the Image component
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
    <div className="grow">
      {heroMovie && (
        <div className="relative h-[calc(100svh-63px)] overflow-hidden group ">
          <Image // Using next/image component
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            fill // Fills the parent container
            sizes="100vw" // Image will be 100% of viewport width
            className="absolute inset-0 w-full h-full object-cover"
            priority // Loads this image with high priority
            quality={70} // Reduced image quality for performance
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/60"></div>
          {/* Removed the gradient overlay div */}
          <div className="relative z-10 flex flex-col justify-end h-full px-4 sm:px-0 py-8 md:py-12 text-rich-mahogany-100 container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-shadow-lg/90 mb-4">
              {heroMovie.title}
            </h1>
            <p className="text-lg md:text-xl mb-4 max-w-2xl line-clamp-3 text-shadow-lg/90">
              {heroMovie.overview}
            </p>
            <div className="flex items-center gap-4 mb-4 text-shadow-lg/90">
              <span className="text-lg md:text-xl font-semibold">
                ⭐ {heroMovie.vote_average.toFixed(1)}
              </span>
              <span className="text-lg md:text-xl font-semibold">
                {heroMovie.release_date?.substring(0, 4)}
              </span>
            </div>
            <Link href={`/movie/${heroMovie.id}`} className="ml-auto sm:ml-0">
              <button className="bg-rich-mahogany-500 hover:bg-rich-mahogany-600 text-rich-mahogany-100 font-bold py-3 px-6 rounded-lg text-lg transition-colors cursor-pointer">
                Watch Now
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 md:px-0">
        <div className="flex items-center justify-between mb-8 md:mt-8">
          <h2 className="text-lg  font-bold flex items-center text-rich-mahogany-100">
            <span className="bg-rich-mahogany-500 w-2 h-8 mr-3"></span>
            TOP 10 MOVIES
          </h2>
          <Link
            href="/movies"
            className="text-rich-mahogany-400 border-b-2 border-rich-mahogany-400 text-lg font-bold"
          >
            View More
          </Link>
        </div>
        <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {trendingMovies &&
            first10TrendingMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
        <div className="flex items-center justify-between mb-8 mt-4 md:mt-8">
          <h2 className="text-lg font-bold flex items-center text-rich-mahogany-100">
            <span className="bg-rich-mahogany-500 w-2 h-8 mr-3"></span>
            TOP 10 SERIES
          </h2>
          <Link
            href="/series"
            className="text-rich-mahogany-400 border-b-2 border-rich-mahogany-400 text-lg font-bold"
          >
            View More
          </Link>
        </div>
        <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:mb-8">
          {trendingSeries &&
            first10TrendingSeries.map((serie) => (
              <MovieCard movie={serie} key={serie.id} isSeries={true} />
            ))}
        </div>
      </div>
    </div>
  );
}
