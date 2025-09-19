import Link from "next/link";
import MovieCard from "@/components/Movie-card";
export default async function kdrama({ params }) {
  const { page } = await params;
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
        `https://api.themoviedb.org/3/discover/tv?page=${page}&sort_by=vote_count.desc&with_origin_country=KR`,
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
  const trendingSeries = await getTrendingSeries();
  console.log(trendingSeries);
  return (
    <div className="p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-red-500 text-4xl md:text-5xl font-bold">
            TOP 100
          </h2>
          <div className="flex flex-col text-white text-xl tracking-[8px] uppercase">
            <span>Korean</span>
            <span>Series</span>
          </div>
        </div>
        <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-10 gap-4">
          {trendingSeries &&
            trendingSeries.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-12 md:mt-12">
          {Array.from({ length: 5 }).map((_, index) => (
            <Link
              className={`${
                page == index + 1
                  ? "bg-red-500 text-white"
                  : "bg-white text-black"
              }  px-4 py-2 font-bold text-2xl`}
              key={index}
              href={`/kdrama/${index + 1}`}
            >
              {index + 1}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
