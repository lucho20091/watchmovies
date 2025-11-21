"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MovieCard from "@/components/Movie-card";

export default function BrowsePage() {
  const [trendingType, setTrendingType] = useState("movies");
  const [ratedType, setRatedType] = useState("series");

  // States for Movie Genres
  const [movieGenres, setMovieGenres] = useState("comedy");
  const [movieSortBy, setMovieSortBy] = useState("popularity.desc");
  const [moviesGenresData, setMoviesGenresData] = useState(null);

  // States for Series Genres
  const [seriesGenres, setSeriesGenres] = useState("action"); // Default series genre
  const [seriesSortBy, setSeriesSortBy] = useState("popularity.desc");
  const [seriesGenresData, setSeriesGenresData] = useState(null);

  const [trendingData, setTrendingData] = useState(null);
  const [ratedData, setRatedData] = useState(null);

  // Fetch Trending Movies/Series
  useEffect(() => {
    async function fetchTrendingData() {
      try {
        setTrendingData(null);
        const url = `/api/${trendingType}/trending`;
        const response = await fetch(url);
        const data = await response.json();
        setTrendingData(data);
      } catch (e) {
        console.error("Error fetching trending data:", e);
      }
    }
    fetchTrendingData();
  }, [trendingType]);

  // Fetch Top Rated Movies/Series
  useEffect(() => {
    async function fetchRatedData() {
      try {
        setRatedData(null);
        const url = `/api/${ratedType}/rated`;
        const response = await fetch(url);
        const data = await response.json();
        setRatedData(data);
      } catch (e) {
        console.error("Error fetching rated data:", e);
      }
    }
    fetchRatedData();
  }, [ratedType]);

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

  // Fetch Series by Genre
  useEffect(() => {
    async function fetchSeriesGenreData() {
      try {
        setSeriesGenresData(null);
        const url = `/api/series/genres/${seriesGenres}?sort_by=${seriesSortBy}`;
        const response = await fetch(url);
        const data = await response.json();
        setSeriesGenresData(data);
      } catch (e) {
        console.error("Error fetching series genre data:", e);
      }
    }
    fetchSeriesGenreData();
  }, [seriesGenres, seriesSortBy]);

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

  const seriesGenreButtons = [
    { name: "Action & Adventure", value: "action" },
    { name: "Animation", value: "animation" },
    { name: "Comedy", value: "comedy" },
    { name: "Crime", value: "crime" },
    { name: "Drama", value: "drama" },
    { name: "Family", value: "family" },
    { name: "Kids", value: "kids" },
    { name: "Mystery", value: "mystery" },
    { name: "News", value: "news" },
    { name: "Reality", value: "reality" },
    { name: "Sci-Fi & Fantasy", value: "scifi" },
    { name: "Soap", value: "soap" },
    { name: "Talk", value: "talk" },
    { name: "War & Politics", value: "war" },
    { name: "Western", value: "western" },
  ];

  const sortOptions = [
    { name: "Popularity", value: "popularity.desc" },
    { name: "Release Date", value: "release_date.desc" },
    { name: "Vote Average", value: "vote_average.desc" },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Trending Section */}
      <div className="p-4 md:p-0 md:pt-4 container mx-auto">
        <div className="text-white flex items-center justify-between">
          <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2">
            <span className="hidden md:inline-block">What's</span> trending{" "}
            <span className="hidden md:inline-block"> today</span>
          </h3>
          <div>
            <button
              className={`px-4 py-2 border-b-2 ${
                trendingType === "movies" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => setTrendingType("movies")}
            >
              Movies
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                trendingType === "series" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => setTrendingType("series")}
            >
              Series
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {trendingData &&
              trendingData.map((item) => {
                if (item.poster_path) {
                  return (
                    <MovieCard
                      movie={item}
                      key={item.id}
                      isSeries={trendingType === "series"}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>

      {/* Top Rated Section */}
      <div className="p-4 md:p-0 md:pt-4 container mx-auto">
        <div className="text-white flex items-center justify-between">
          <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2">
            Top Rated
          </h3>
          <div>
            <button
              className={`px-4 py-2 border-b-2 ${
                ratedType === "movies" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => setRatedType("movies")}
            >
              Movies
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                ratedType === "series" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => setRatedType("series")}
            >
              Series
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {ratedData &&
              ratedData.map((item) => {
                if (item.poster_path) {
                  return (
                    <MovieCard
                      movie={item}
                      key={item.id}
                      isSeries={ratedType === "series"}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>

      {/* Discover Movies by Genres Section */}
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

      {/* Discover Series by Genres Section */}
      <div className="p-4 md:p-0 md:pt-4 container mx-auto">
        <div className="text-white flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2 mb-4 md:mb-0">
            Discover Series by Genres
          </h3>
          <div className="flex items-center gap-2">
            <label htmlFor="series-sort-by" className="text-lg font-semibold">Sort By:</label>
            <select
              id="series-sort-by"
              className="bg-neutral-800 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={seriesSortBy}
              onChange={(e) => setSeriesSortBy(e.target.value)}
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
          {seriesGenreButtons.map((genreItem) => (
            <button
              key={genreItem.value}
              className={`px-4 py-2 border-b-2 ${
                seriesGenres === genreItem.value ? "border-red-500" : "border-white"
              } cursor-pointer text-center`}
              onClick={() => {
                setSeriesGenres(genreItem.value);
              }}
            >
              {genreItem.name}
            </button>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {seriesGenresData &&
              seriesGenresData.map((series) => {
                if (series.poster_path) {
                  return <MovieCard movie={series} key={series.id} isSeries={true} />;
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}