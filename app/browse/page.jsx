"use client"
import { useState, useEffect} from "react"
import Link from "next/link";
export default function BrowsePage() {
    const [trending, setTrending] = useState('movies')
    const [rated, setRated] = useState('series')
    const [genres, setGenres] = useState('comedy')
    const [moviesGenresData, setMoviesGenresData] = useState(null)
    const [trendingData, setTrendingData] = useState(null)
    const [ratedData, setRatedData] = useState(null)

    // movie genres: action adventure animation comedy crime
    // documentary drama family fantasy history horror music 
    // mystery romance science fiction thriller war western
    useEffect(() => {
        async function fetchTrendingMovies(){
            try{
                setTrendingData(null);
                const url = `/api/${trending}/trending`
                const response = await fetch(url);
                const data = await response.json();
                setTrendingData(data);
            } catch(e){
                // console.log(e)
            }
        }
        fetchTrendingMovies()
    }, [trending])

    useEffect(() => {
        async function fetchRatedMovies(){
            try{
                setRatedData(null);
                const url = `/api/${rated}/rated`
                const response = await fetch(url);
                const data = await response.json();
                setRatedData(data);
            } catch(e){
                // console.log(e)
            }
        }
        fetchRatedMovies()
    }, [rated])

    useEffect(() => {
        async function fetchGenreMovies(){
            try{
                setMoviesGenresData(null);
                const url = `/api/movies/genres/${genres}`
                const response = await fetch(url);
                const data = await response.json();
                setMoviesGenresData(data);
            } catch(e){
                // console.log(e)
            }
        }
        fetchGenreMovies()
    }, [genres])

    function scrollToBottom(){
        window.scrollTo({
            top: document.documentElement.scrollHeight + 80,
            behavior: 'smooth'
        });
    }

    return (
            <div className="overflow-x-hidden">
                <div className="p-4 container mx-auto">
                <div className="text-white flex items-center justify-between">
                    <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2">
                        <span className="hidden md:inline-block">What's</span> trending {' '}
                        <span className="hidden md:inline-block"> today</span></h3>
                    <div>
                        <button 
                        className={`px-4 py-2 border-b-2 ${trending === 'movies' ? 'border-red-500' : 'border-white'} cursor-pointer`}
                        onClick={() => setTrending('movies')}
                        >Movies</button>
                        <button 
                        className={`px-4 py-2 border-b-2 ${trending === 'series' ? 'border-red-500' : 'border-white'} cursor-pointer`}
                        onClick={() => setTrending('series')}
                        >Series</button>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
                        {trendingData && trendingData.map((movie) => {
                            if (movie.poster_path){
                                return (
                                    <Link href={trending === 'movies' ? `/movie/${movie.id}` : `tv/${movie.id}/1/1`}  key={movie.id} className="flex flex-col items-center justify-between cursor-pointer relative">
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="h-auto"/>
                                        <h2 className="text-xs lg:text-2xl lg:mt-4 font-bold bg-neutral-950 text-center line-clamp-1">{movie.title || movie.name}</h2>
                                    {trending === 'series' && <span className="absolute top-1 right-1 bg-black px-2 py-1 text-xs font-bold">{movie.media_type}</span>}
                                </Link>
                                )
                            }
                        })}
                    </div>
                </div>
                </div>
                <div className="p-4 container mx-auto">
                <div className="text-white flex items-center justify-between">
                    <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2">Top Rated</h3>
                    <div>
                        <button 
                        className={`px-4 py-2 border-b-2 ${rated === 'movies' ? 'border-red-500' : 'border-white'} cursor-pointer`}
                        onClick={() => setRated('movies')}
                        >Movies</button>
                        <button 
                        className={`px-4 py-2 border-b-2 ${rated === 'series' ? 'border-red-500' : 'border-white'} cursor-pointer`}
                        onClick={() => setRated('series')}
                        >Series</button>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
                        {ratedData && ratedData.map((movie) => {
                            if (movie.poster_path){
                                return (
                                <Link href={rated === 'movies' ? `/movie/${movie.id}` : `tv/${movie.id}/1/1`}  key={movie.id} className="flex flex-col items-center relative cursor-pointer">
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="h-auto"/>
                                    <h2 className="text-xs lg:text-2xl lg:mt-4 font-bold bg-neutral-950 text-center line-clamp-1">{movie.title || movie.name}</h2>
                                    {rated === 'series' && <span className="absolute top-1 right-1 bg-black px-2 py-1 text-xs font-bold">tv</span>}
                                </Link>
                                )
                            }
                        })}
                    </div>
                </div>
                </div>
                <div className="p-4 container mx-auto mb-20">
                <div className="text-white flex items-center justify-between">
                    <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2">
                        <span className="hidden md:inline-block">Discover by </span> Genres</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3">
                        <button 
                        className={`px-4 py-2 border-b-2 ${genres === 'comedy' ? 'border-red-500' : 'border-white'} cursor-pointer`}
                        onClick={() => {
                            setGenres('comedy')
                            scrollToBottom()
                        }}>Comedy</button>
                        <button 
                        className={`px-4 py-2 border-b-2 ${genres === 'action' ? 'border-red-500' : 'border-white'} cursor-pointer`}
                        onClick={() => {
                            setGenres('action')
                            scrollToBottom()
                        }}>Action</button>
                        <button 
                        className={`px-4 py-2 border-b-2 ${genres === 'horror' ? 'border-red-500' : 'border-white'} cursor-pointer`}
                        onClick={() => {
                            setGenres('horror')
                            scrollToBottom()
                        }}>Horror</button>
                        <button 
                        className={`px-4 py-2 border-b-2 ${genres === 'romance' ? 'border-red-500' : 'border-white'} cursor-pointer`}
                        onClick={() => {
                            setGenres('romance')
                            scrollToBottom()
                        }}>Romance</button>
                        <button 
                        className={`px-4 py-2 border-b-2 ${genres === 'drama' ? 'border-red-500' : 'border-white'} cursor-pointer`}
                        onClick={() => {
                            setGenres('drama')
                            scrollToBottom()
                        }}>Drama</button>
                        <button 
                        className={`px-4 py-2 border-b-2 ${genres === 'scifi' ? 'border-red-500' : 'border-white'} cursor-pointer`}
                        onClick={() => {
                            setGenres('scifi')
                            scrollToBottom()
                        }}>Scifi</button>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
                        {moviesGenresData && moviesGenresData.map((movie) => {
                            if (movie.poster_path){
                                return (
                                <Link href={`/movie/${movie.id}`}  key={movie.id} className="flex flex-col items-center relative cursor-pointer">
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="h-auto"/>
                                    <h2 className="text-xs lg:text-2xl lg:mt-4 font-bold bg-neutral-950 text-center line-clamp-1">{movie.title || movie.name}</h2>
                                </Link>
                                )
                            }
                        })}
                    </div>
                </div>
                </div>
            </div>
    )
}

    // return (
    //     <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 text-white">
    //         <h1 className="text-4xl font-bold mb-4">Browse Movies</h1>
    //         <p className="text-lg">Explore a wide range of movies and shows.</p>
    //     </div>
    // );w-