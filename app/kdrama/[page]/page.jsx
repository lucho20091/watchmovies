import Link from "next/link"
export default async function kdrama({params}){
    const { page } = await params
    async function getTrendingSeries() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIEDB_API_BEARER
      }
    }
    try{
      const response = await fetch(`https://api.themoviedb.org/3/discover/tv?page=${page}&sort_by=vote_count.desc&with_origin_country=KR`, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.results;
    } catch(error){
      console.error(error);
    }
  }
  const trendingSeries = await getTrendingSeries();
  console.log(trendingSeries)
    return (
    <div className="grow p-4 pb-12">
      <div className="container mx-auto">
      <div className="flex items-center justify-center gap-4">
          <h2 className="text-red-500 text-4xl md:text-5xl font-bold">TOP 100</h2>
          <div className="flex flex-col text-white text-xl tracking-[8px] uppercase">
              <span >Korean</span>
              <span>Series</span>
          </div>
      </div>
      <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {trendingSeries && trendingSeries.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id} className="flex flex-col items-center relative group cursor-pointer">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.name} className="h-auto"/>
          <h2 className="text-xl font-bold bg-neutral-950 w-full text-center p-2 ">{movie.name}</h2>
        </Link>
      ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-12 md:mt-12">
        {Array.from({ length: 5 }).map((_, index) => (
          <Link className={`${page == index + 1 ? 'bg-red-500 text-white' : 'bg-white text-black'}  px-4 py-2 font-bold text-2xl`} key={index} href={`/kdrama/${index + 1}`}>
            {index + 1}
          </Link>
        ))}
      </div>
      </div>
    </div>
    )
}