import Link from "next/link";
export default async function Home(){
  async function getTrendingMovies() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIEDB_API_BEARER
      }
    }
    try{
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.results;
    } catch(error){
      console.error(error);
    }
  }
  const trendingMovies = await getTrendingMovies();
  const first10TrendingMovies = trendingMovies.slice(0,10)

  return (
    <div className="grow p-4 pb-8">
      <div className="container mx-auto">
                <div className="flex items-center justify-center gap-4">
                    <h2 className="text-red-500 text-4xl md:text-5xl font-bold">TOP 10</h2>
                    <div className="flex flex-col text-white text-xl tracking-[8px] uppercase">
                        <span >Content</span>
                        <span>Today</span>
                    </div>
                </div>
      <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {trendingMovies && first10TrendingMovies.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id} className="flex flex-col items-center relative group cursor-pointer">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="h-auto"/>
          <h2 className="text-xl font-bold  bg-neutral-950 w-full text-center p-2">{movie.title}</h2>
        </Link>
      ))}
      </div>
      </div>
    </div>
  )
}


