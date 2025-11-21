"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";

export default function SeriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [seriesGenres, setSeriesGenres] = useState("action"); // Default series genre
  const [seriesSortBy, setSeriesSortBy] = useState("popularity.desc");
  const [seriesGenresData, setSeriesGenresData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Update currentPage from URL search params
  useEffect(() => {
    const pageParam = searchParams.get("page");
    setCurrentPage(parseInt(pageParam) || 1);
  }, [searchParams]);

  // Fetch Series by Genre
  useEffect(() => {
    async function fetchSeriesGenreData() {
      try {
        setSeriesGenresData(null);
        const url = `/api/series/genres/${seriesGenres}?sort_by=${seriesSortBy}&page=${currentPage}`;
        const response = await fetch(url);
        const data = await response.json();
        setSeriesGenresData(data.results.slice(0, 18)); // Limit to 18 results
        setTotalPages(data.total_pages);
      } catch (e) {
        console.error("Error fetching series genre data:", e);
      }
    }
    fetchSeriesGenreData();
  }, [seriesGenres, seriesSortBy, currentPage]);

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

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      router.push(`/series?page=${newPage}`);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Max number of page buttons to show
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-md font-bold ${
            currentPage === i
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

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
              setCurrentPage(1); // Reset to first page when genre changes
              router.push(`/series?page=1`);
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 mb-20">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-gray-700 text-white font-bold hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          {renderPaginationButtons()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-gray-700 text-white font-bold hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}