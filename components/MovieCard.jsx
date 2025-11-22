import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function MovieCard({ movie, isSeries }) {
  const title = movie.title || movie.name;
  const mediaType = movie.media_type || (isSeries ? "tv" : "movie");
  const displayDate = movie.release_date || movie.first_air_date;

  return (
    <Link
      href={mediaType === "tv" ? `/tv/${movie.id}/1/1` : `/movie/${movie.id}`}
      className="flex flex-col items-center relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 bg-neutral-950"
    >
      <div className="relative w-full aspect-[2/3]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={title || "Movie Poster"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-opacity duration-300 group-hover:opacity-20"
          priority={false} // Only set to true for above-the-fold images
          quality={70} // Reduced image quality for performance
        />

        {/* Original Language Badge */}
        {movie.original_language && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">
            {movie.original_language.toUpperCase()}
          </div>
        )}

        {/* Adult Content Badge */}
        {movie.adult && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-10">
            +18
          </div>
        )}

        {/* Hover Overlay for Release Date and Rating */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
          {displayDate && (
            <p className="text-white text-sm mb-2">
              Release: {displayDate}
            </p>
          )}
          <div className="flex items-center gap-1 text-yellow-400 text-lg">
            <FaStar />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="w-full p-3 text-white">
        <h2 className="text-lg font-bold text-center line-clamp-2 mb-1">
          {title}
        </h2>
      </div>
    </Link>
  );
}