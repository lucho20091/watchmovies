import Link from "next/link";
import { FaStar } from "react-icons/fa";
export default function MovieCard({ movie, isSeries }) {
  console.log(movie);
  return (
    <Link
      href={
        movie.media_type === "tv" || isSeries
          ? `/tv/${movie.id}/1/1`
          : `/movie/${movie.id}`
      }
      className="flex flex-col items-center relative group cursor-pointer"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.name || movie.title}
        className="h-auto"
      />
      <div className="bg-neutral-950 w-full">
        <h2 className="text-xl font-bold  bg-neutral-950 w-full text-center p-2 truncate">
          {movie.name || movie.title}
        </h2>
        <div className="flex items-center justify-start gap-2 text-yellow-400 ml-2 mb-2">
          <FaStar />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
    </Link>
  );
}
