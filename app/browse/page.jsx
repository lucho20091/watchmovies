"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MovieCard from "@/components/Movie-card";
export default function BrowsePage() {
  const [trending, setTrending] = useState("movies");
  const [rated, setRated] = useState("series");
  const [genres, setGenres] = useState("comedy");
  const [sortBy, setSortBy] = useState("popularity.desc"); // New state for sorting
  const [moviesGenresData, setMoviesGenresData] = useState(null);
  const [trendingData, setTrendingData] = useState(null);
  const [ratedData, setRatedData] = useState(null);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setTrendingData(null);
        const url = `/api/${trending}/trending`;
        const response = await fetch(url);
        const data = await response.json();
        setTrendingData(data);
      } catch (e) {
        console.error("Error fetching trending data:", e);
      }
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
      } catch (e) {
        console.error("Error fetching rated data:", e);
      }
    }
    fetchRatedMovies();
  }, [rated]);

  useEffect(() => {
    async function fetchGenreMovies() {
      try {
        setMoviesGenresData(null);
        // Pass sortBy parameter to the API call
        const url = `/api/movies/genres/${genres}?sort_by=${sortBy}`;
        const response = await fetch(url);
        const data = await response.json();
        setMoviesGenresData(data);
      } catch (e) {
        console.error("Error fetching genre movies:", e);
      }
    }
    fetchGenreMovies();
  }, [genres, sortBy]); // Add sortBy to dependency array

  const genreButtons = [
    { name: "Comedy", value: "comedy" },
    { name: "Action", value: "action" },
    { name: "Horror", value: "horror" },
    { name: "Romance", value: "romance" },
    { name: "Drama", value: "drama" },
    { name: "Sci-Fi", value: "scifi" },
    { name: "Adventure", value: "adventure" },
    { name: "Animation", value: "animation" },
    { name: "Crime", value: "crime" },
    { name: "Fantasy", value: "fantasy" },
    { name: "Mystery", value: "mystery" },
    { name: "Thriller", value: "thriller" },
  ];

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {trendingData &&
              trendingData.map((movie) => {
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {ratedData &&
              ratedData.map((movie) => {
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
        <div className="text-white flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2 mb-4 md:mb-0">
            <span className="hidden md:inline-block">Discover by </span> Genres
          </h3>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-lg font-semibold">Sort By:</label>
            <select
              id="sort-by"
              className="bg-neutral-800 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity.desc">Popularity</option>
              <option value="release_date.desc">Release Date</option>
              <option value="vote_average.desc">Vote Average</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
          {genreButtons.map((genreItem) => (
            <button
              key={genreItem.value}
              className={`px-4 py-2 border-b-2 ${
                genres === genreItem.value ? "border-red-500" : "border-white"
              } cursor-pointer text-center`}
              onClick={() => {
                setGenres(genreItem.value);
              }}
            >
              {genreItem.name}
            </button>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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