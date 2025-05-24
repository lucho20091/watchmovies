"use client";
import Link from "next/link";
import { useState } from "react";
export default function SearchPage() {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setMovies([]);
            const response = await fetch(`/api/search/${search}`);
            const data = await response.json();
            setMovies(data);
        } catch (error){
        }
    }

    return (
        <div className="grow p-4">
            <div className="container mx-auto">
                <form onSubmit={handleSubmit} className="mb-4 flex items-center">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <input 
                        type="text" 
                        placeholder="Search for movies or shows..." 
                        className="p-2 border border-gray-300 rounded w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        className="bg-white text-black font-bold p-2 rounded ml-2"
                    >
                        Search
                    </button>
                </form>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {movies && movies.map((movie) => {
                        if (movie.poster_path){
                            return (
                            <Link href={movie.media_type === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`} key={movie.id} className="flex flex-col items-center relative group cursor-pointer">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="h-auto"/>
                                <h2 className="text-xl font-bold absolute bottom-0 bg-neutral-950 w-full text-center p-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">{movie.title || movie.name}</h2>
                                <span className="absolute top-4 right-4 bg-black px-2 py-1 text-xs font-bold">{movie.media_type}</span>
                            </Link>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
}