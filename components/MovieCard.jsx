import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function MovieCard({ movie, isSeries }) {
  const title = movie.title || movie.name;
  const mediaType = movie.media_type || (isSeries ? "tv" : "movie");
  const displayDate = movie.release_date || movie.first_air_date;
  const releaseYear = displayDate ? displayDate.substring(0, 4) : "";

  const hasPoster = movie.poster_path && typeof movie.poster_path === "string";
  const imageUrl = hasPoster
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <Link
      href={mediaType === "tv" ? `/tv/${movie.id}/1/1` : `/movie/${movie.id}`}
      className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl bg-neutral-950 h-full"
    >
      <div className="relative w-full aspect-[2/3]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title || "Movie Poster"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-opacity duration-300 group-hover:opacity-20"
            priority={false}
            quality={70}
          />
        ) : (
          <div className="w-full h-full bg-neutral-950 flex items-center justify-center text-center text-rich-mahogany-100 text-sm p-2">
            No Poster Available
          </div>
        )}

        {/* Gradient overlay for title readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-950 to-transparent z-10"></div>

        {/* Title always visible, positioned over the gradient */}
        <div className="absolute inset-x-0 bottom-0 p-3 z-20 text-rich-mahogany-100">
          <h2 className="text-lg font-bold line-clamp-2 text-center">
            {title}
          </h2>
        </div>

        {/* Original Language Badge */}
        {movie.original_language && (
          <div className="absolute top-2 right-2 bg-rich-mahogany-950 text-rich-mahogany-100 text-xs px-2 py-1 rounded-md z-30">
            {movie.original_language.toUpperCase()}
          </div>
        )}

        {/* Adult Content Badge */}
        {movie.adult && (
          <div className="absolute top-2 left-2 bg-rich-mahogany-950 text-rich-mahogany-100 text-xs px-2 py-1 rounded-full z-30">
            +18
          </div>
        )}

        {/* Hover Overlay for Title, Summary, Release Year, and Rating */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center z-40">
          <h3 className="text-xl font-bold text-rich-mahogany-100 mb-2">
            {title}
          </h3>
          {movie.overview && (
            <p className="text-rich-mahogany-100 text-sm line-clamp-3 mb-2">
              {movie.overview}
            </p>
          )}
          <div className="flex items-center gap-1 text-yellow-400 text-lg mb-2">
            <FaStar />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          {releaseYear && (
            <p className="text-rich-mahogany-100 text-sm">
              Year: {releaseYear}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
