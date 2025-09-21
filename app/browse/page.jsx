"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MovieCard from "@/components/Movie-card";
export default function BrowsePage() {
  const [trending, setTrending] = useState("movies");
  const [rated, setRated] = useState("series");
  const [genres, setGenres] = useState("comedy");
  const [moviesGenresData, setMoviesGenresData] = useState(null);
  const [trendingData, setTrendingData] = useState(null);
  const [ratedData, setRatedData] = useState(null);

  // movie genres: action adventure animation comedy crime
  // documentary drama family fantasy history horror music
  // mystery romance science fiction thriller war western
  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setTrendingData(null);
        const url = `/api/${trending}/trending`;
        const response = await fetch(url);
        const data = await response.json();
        setTrendingData(data);
      } catch (e) {}
    }
    fetchTrendingMovies();
  }, [trending]);

  useEffect(() => {
    async function fetchRatedMovies() {
      try {
        setRatedData(null);
        const url = `/api/${rated}/rated`;
        const response = await fetch(url);
        const data = await response.json();
        setRatedData(data);
      } catch (e) {}
    }
    fetchRatedMovies();
  }, [rated]);

  useEffect(() => {
    async function fetchGenreMovies() {
      try {
        setMoviesGenresData(null);
        const url = `/api/movies/genres/${genres}`;
        const response = await fetch(url);
        const data = await response.json();
        setMoviesGenresData(data);
      } catch (e) {}
    }
    fetchGenreMovies();
  }, [genres]);

  return (
    <div className="overflow-x-hidden">
      <div className="p-4 md:p-0 md:pt-4 container mx-auto">
        <div className="text-white flex items-center justify-between">
          <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2">
            <span className="hidden md:inline-block">What's</span> trending{" "}
            <span className="hidden md:inline-block"> today</span>
          </h3>
          <div>
            <button
              className={`px-4 py-2 border-b-2 ${
                trending === "movies" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => setTrending("movies")}
            >
              Movies
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                trending === "series" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => setTrending("series")}
            >
              Series
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-4">
            {trendingData &&
              trendingData.map((movie) => {
                console.log({ movie });
                if (movie.poster_path) {
                  return <MovieCard movie={movie} key={movie.id} />;
                }
              })}
          </div>
        </div>
      </div>
      <div className="p-4 md:p-0 md:pt-4 container mx-auto">
        <div className="text-white flex items-center justify-between">
          <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2">
            Top Rated
          </h3>
          <div>
            <button
              className={`px-4 py-2 border-b-2 ${
                rated === "movies" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => setRated("movies")}
            >
              Movies
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                rated === "series" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => setRated("series")}
            >
              Series
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-4">
            {ratedData &&
              ratedData.map((movie) => {
                console.log({ movie });
                if (movie.poster_path) {
                  return (
                    <MovieCard
                      movie={movie}
                      key={movie.id}
                      isSeries={rated === "series" ? true : false}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
      <div className="p-4 md:p-0 md:pt-4 container mx-auto">
        <div className="text-white flex items-center justify-between">
          <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2">
            <span className="hidden md:inline-block">Discover by </span> Genres
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3">
            <button
              className={`px-4 py-2 border-b-2 ${
                genres === "comedy" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => {
                setGenres("comedy");
              }}
            >
              Comedy
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                genres === "action" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => {
                setGenres("action");
              }}
            >
              Action
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                genres === "horror" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => {
                setGenres("horror");
              }}
            >
              Horror
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                genres === "romance" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => {
                setGenres("romance");
              }}
            >
              Romance
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                genres === "drama" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => {
                setGenres("drama");
              }}
            >
              Drama
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                genres === "scifi" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => {
                setGenres("scifi");
              }}
            >
              Scifi
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 xl:grid-cols-10">
            {moviesGenresData &&
              moviesGenresData.map((movie) => {
                if (movie.poster_path) {
                  return <MovieCard movie={movie} key={movie.id} />;
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
