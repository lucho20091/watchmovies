"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MovieCard from "@/components/Movie-card";

export default function MoviesPage() {
  const [movieGenres, setMovieGenres] = useState("comedy");
  const [movieSortBy, setMovieSortBy] = useState("popularity.desc");
  const [moviesGenresData, setMoviesGenresData] = useState(null);

  // Fetch Movies by Genre
  useEffect(() => {
    async function fetchMovieGenreData() {
      try {
        setMoviesGenresData(null);
        const url = `/api/movies/genres/${movieGenres}?sort_by=${movieSortBy}`;
        const response = await fetch(url);
        const data = await response.json();
        setMoviesGenresData(data);
      } catch (e) {
        console.error("Error fetching movie genre data:", e);
      }
    }
    fetchMovieGenreData();
  }, [movieGenres, movieSortBy]);

  const movieGenreButtons = [
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

  const sortOptions = [
    { name: "Popularity", value: "popularity.desc" },
    { name: "Release Date", value: "release_date.desc" },
    { name: "Vote Average", value: "vote_average.desc" },
  ];

  return (
    <div className="p-4 md:p-0 md:pt-4 container mx-auto">
      <div className="text-white flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2 mb-4 md:mb-0">
          Discover Movies by Genres
        </h3>
        <div className="flex items-center gap-2">
          <label htmlFor="movie-sort-by" className="text-lg font-semibold">Sort By:</label>
          <select
            id="movie-sort-by"
            className="bg-neutral-800 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={movieSortBy}
            onChange={(e) => setMovieSortBy(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
        {movieGenreButtons.map((genreItem) => (
          <button
            key={genreItem.value}
            className={`px-4 py-2 border-b-2 ${
              movieGenres === genreItem.value ? "border-red-500" : "border-white"
            } cursor-pointer text-center`}
            onClick={() => {
              setMovieGenres(genreItem.value);
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
  );
}