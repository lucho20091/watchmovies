"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MovieCard from "@/components/Movie-card";

export default function SeriesPage() {
  const [seriesGenres, setSeriesGenres] = useState("action"); // Default series genre
  const [seriesSortBy, setSeriesSortBy] = useState("popularity.desc");
  const [seriesGenresData, setSeriesGenresData] = useState(null);

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
  );
}