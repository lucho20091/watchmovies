"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import CategorySelector from "@/components/CategorySelector";

export default function MoviesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState("popular"); // Default to "Most popular"
  const [moviesData, setMoviesData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Update currentPage and selectedCategory from URL search params
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const categoryParam = searchParams.get("category");
    setCurrentPage(parseInt(pageParam) || 1);
    setSelectedCategory(categoryParam || "popular");
  }, [searchParams]);

  // Fetch Movies based on selected category and page
  useEffect(() => {
    async function fetchMovies() {
      try {
        setMoviesData(null);
        let url = "";
        let isGenreSearch = false;

        if (selectedCategory === "popular") {
          url = `/api/movies/trending?page=${currentPage}`;
        } else if (selectedCategory === "rated") {
          url = `/api/movies/rated?page=${currentPage}`;
        } else if (selectedCategory === "recent") {
          url = `/api/movies/recent?page=${currentPage}`;
        } else {
          // It's a genre
          url = `/api/movies/genres/${selectedCategory}?page=${currentPage}`;
          isGenreSearch = true;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (isGenreSearch || selectedCategory === "recent") {
          setMoviesData(data.results.slice(0, 18)); // Limit to 18 results
          setTotalPages(data.total_pages);
        } else {
          // For trending/rated, the API routes already return a full page (20 results)
          // We still slice to 18 for consistency in display
          setMoviesData(data.slice(0, 18));
          // For trending/rated, we assume 20 items per page for total_pages calculation
          // This is a simplification, ideally the API would return total_pages
          // For now, we'll just use a placeholder or calculate based on total_results if available
          // Since the API routes for trending/rated don't return total_pages, we'll estimate or keep it simple.
          // For now, let's assume a fixed number of pages or just disable pagination for these specific types if total_pages isn't available.
          // Given the current API structure, it's better to fetch all results for trending/rated and not paginate them.
          // Let's adjust the API calls for popular/rated to also return total_pages.
          // For now, I'll set totalPages to 1 for popular/rated to avoid pagination issues.
          setTotalPages(1); // Temporarily disable pagination for popular/rated until API is updated
        }
      } catch (e) {
        console.error("Error fetching movie data:", e);
      }
    }
    fetchMovies();
  }, [selectedCategory, currentPage]);

  const movieCategories = [
    { name: "Most popular", value: "popular" },
    { name: "Most rating", value: "rated" },
    { name: "Most recent", value: "recent" },
    { name: "Action", value: "action" },
    { name: "Adventure", value: "adventure" },
    { name: "Animation", value: "animation" },
    { name: "Comedy", value: "comedy" },
    { name: "Crime", value: "crime" },
    { name: "Drama", value: "drama" },
    { name: "Fantasy", value: "fantasy" },
    { name: "Horror", value: "horror" },
    { name: "Mystery", value: "mystery" },
    { name: "Romance", value: "romance" },
    { name: "Sci-Fi", value: "scifi" },
    { name: "Thriller", value: "thriller" },
  ];

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1); // Reset to first page when category changes
    router.push(`/movies?category=${newCategory}&page=1`);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      router.push(`/movies?category=${selectedCategory}&page=${newPage}`);
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
          Movies
        </h3>
      </div>
      <CategorySelector
        categories={movieCategories}
        activeCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className="flex justify-center mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {moviesData &&
            moviesData.map((movie) => {
              if (movie.poster_path) {
                return <MovieCard movie={movie} key={movie.id} />;
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