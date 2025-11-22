import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function MovieCard({ movie, isSeries }) {
  const title = movie.title || movie.name;
  const mediaType = movie.media_type || (isSeries ? "tv" : "movie");

  return (
    <Link
      href={
        mediaType === "tv"
          ? `/tv/${movie.id}/1/1`
          : `/movie/${movie.id}`
      }
      className="flex flex-col items-center relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 bg-neutral-950"
    >
      <div className="relative w-full aspect-[2/3]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={title || "Movie Poster"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-opacity duration-300 group-hover:opacity-80"
          priority={false} // Only set to true for above-the-fold images
          quality={70} // Reduced image quality for performance
        />
      </div>
      <div className="w-full p-3 text-white">
        <h2 className="text-lg font-bold text-center truncate mb-1">
          {title}
        </h2>
        <div className="flex items-center justify-center gap-2 text-yellow-400">
          <FaStar />
          <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}