import Link from "next/link";
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

  console.log(first10TrendingSeries);
  return (
    <div className="grow p-4 pb-8">
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
        <h2 class="text-3xl font-bold mb-8 flex items-center">
          <span class="bg-red-600 w-2 h-8 mr-3"></span>
          TOP 10 MOVIES
        </h2>
        <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {trendingMovies &&
            first10TrendingMovies.map((movie) => (
              <Link
                href={`/movie/${movie.id}`}
                key={movie.id}
                className="flex flex-col items-center relative group cursor-pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="h-auto"
                />
                <h2 className="text-xl font-bold  bg-neutral-950 w-full text-center p-2">
                  {movie.title}
                </h2>
              </Link>
            ))}
        </div>
        <h2 class="text-3xl font-bold mb-8 flex items-center mt-4 md:mt-8">
          <span class="bg-red-600 w-2 h-8 mr-3"></span>
          TOP 10 SERIES
        </h2>
        <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {trendingSeries &&
            first10TrendingSeries.map((serie) => (
              <Link
                href={`/tv/${serie.id}/1/1`}
                key={serie.id}
                className="flex flex-col items-center relative group cursor-pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                  alt={serie.name}
                  className="h-auto"
                />
                <h2 className="text-xl font-bold  bg-neutral-950 w-full text-center p-2">
                  {serie.name}
                </h2>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
