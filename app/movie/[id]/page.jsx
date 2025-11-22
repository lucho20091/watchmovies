import Image from "next/image";
import Link from "next/link";

export default async function MoviePage({ params }) {
  const { id } = await params;

  async function fetchMovieUrl() {
    try {
      const response = await fetch(
        `https://vidsrc.me/embed/movie?tmdb=${id}&ds_lang=es&autoplay=1`
      );
      return response.url;
    } catch (error) {
      console.error("Error fetching movie URL:", error);
      return null;
    }
  }

  async function fetchMovieData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.MOVIEDB_API_BEARER,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      );
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return null;
    }
  }

  const movieUrl = await fetchMovieUrl();
  const movieData = await fetchMovieData();

  if (!movieData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-4">
        <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
        <p className="text-lg text-center mb-6">
          The movie you are looking for does not exist or an error occurred.
        </p>
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-lg transition-colors"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Desktop Background Image */}
      {movieData.backdrop_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
          alt={movieData.title || "Movie Backdrop"}
          fill
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover z-[-2] hidden md:block"
          priority
          quality={70} // Reduced image quality for performance
        />
      )}
      {/* Mobile Background Image */}
      {movieData.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
          alt={movieData.title || "Movie Poster"}
          fill
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover z-[-2] block md:hidden"
          priority
          quality={70} // Reduced image quality for performance
        />
      )}
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-4 md:pt-10 pb-20 text-white container mx-auto px-4">
        <h1 className="text-shadow text-4xl md:text-6xl font-bold mb-4 text-center">
          {movieData.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-white font-bold text-lg mb-4">
          {movieData.release_date && (
            <span>{movieData.release_date.substring(0, 4)}</span>
          )}
          {movieData.vote_average && (
            <span>⭐{movieData.vote_average.toFixed(1)}</span>
          )}
          {movieData.runtime && <span>{movieData.runtime} minutes</span>}
        </div>
        <div className="flex flex-wrap justify-center items-center mt-4 gap-2 mb-6">
          {movieData.genres?.map((item) => (
            <span
              key={item.id}
              className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium"
            >
              {item.name}
            </span>
          ))}
        </div>
        <p className="line-clamp-4 md:line-clamp-5 text-base md:text-lg text-center max-w-3xl mx-auto font-semibold mb-8">
          {movieData.overview}
        </p>

        {movieUrl ? (
          <div className="w-full max-w-screen-xl mx-auto">
            <iframe
              src={movieUrl}
              allow="fullscreen"
              allowFullScreen
              className="w-full aspect-video rounded-lg shadow-xl"
            ></iframe>
          </div>
        ) : (
          <p className="text-lg">Loading video player...</p>
        )}
      </div>
    </div>
  );
}