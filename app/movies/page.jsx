"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import CategorySelector from "@/components/CategorySelector";

// Client component that uses useSearchParams
function MoviesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState("popular"); // Default to "Most popular"
  const [moviesData, setMoviesData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

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
        setIsLoading(true); // Set loading to true before fetching
        setMoviesData(null);
        let url = "";

        if (selectedCategory === "popular") {
          url = `/api/movies/trending?page=${currentPage}`;
        } else if (selectedCategory === "rated") {
          url = `/api/movies/rated?page=${currentPage}`;
        } else if (selectedCategory === "recent") {
          url = `/api/movies/recent?page=${currentPage}`;
        } else {
          // It's a genre
          url = `/api/movies/genres/${selectedCategory}?page=${currentPage}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        setMoviesData(data.results.slice(0, 18)); // Limit to 18 results for display
        setTotalPages(data.total_pages);
      } catch (e) {
        console.error("Error fetching movie data:", e);
        setMoviesData([]); // Set to empty array on error
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    }
    fetchMovies();
  }, [selectedCategory, currentPage]);

  const movieCategories = [
    { name: "Most popular", value: "popular" },
    { name: "Most rating", value: "rated" },
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
    const maxButtons = 3; // Max number of page buttons to show
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
          className={`px-4 py-2 rounded-md font-bold cursor-pointer border border-rich-mahogany-500 backdrop-blur-xs shadow-xl shadow-rich-mahogany-900/50 hover:shadow-rich-mahogany-900/90 ${
            currentPage === i
              ? "bg-rich-mahogany-500 "
              : "hover:bg-rich-mahogany-500/30"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="p-4 lg:pt-6 container mx-auto">
      <CategorySelector
        categories={movieCategories}
        activeCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {isLoading ? (
        <p className="text-center text-lg text-rich-mahogany-200 mt-8">
          Loading movies...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {moviesData &&
              moviesData.map((movie) => {
                if (movie.poster_path) {
                  return <MovieCard movie={movie} key={movie.id} />;
                }
              })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16 mb-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="px-4 py-2 rounded-md text-rich-mahogany-100 font-bold disabled:opacity-50 cursor-pointer border border-rich-mahogany-500 backdrop-blur-xs shadow-xl shadow-rich-mahogany-900/50 hover:shadow-rich-mahogany-900/90 hover:bg-rich-mahogany-500/30 disabled:cursor-not-allowed disabled:hover:bg-inherit"
              >
                Previous
              </button>
              {renderPaginationButtons()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="px-4 py-2 rounded-md text-rich-mahogany-100 font-bold disabled:opacity-50 cursor-pointer border border-rich-mahogany-500 backdrop-blur-xs shadow-xl shadow-rich-mahogany-900/50 hover:shadow-rich-mahogany-900/90 hover:bg-rich-mahogany-500/30 disabled:cursor-not-allowed disabled:hover:bg-inherit"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Main MoviesPage component that wraps MoviesContent in Suspense
export default function MoviesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-4 md:p-0 md:pt-4 container mx-auto animate-pulse">
          <div className="text-rich-mahogany-100 flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div className="h-10 bg-gray-700 rounded w-64 mb-4 md:mb-0"></div>
          </div>
          <div className="w-full overflow-x-auto whitespace-nowrap py-2">
            <div className="flex flex-nowrap gap-4 px-4 md:px-0">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 bg-gray-700 rounded-md w-28 flex-shrink-0"
                ></div>
              ))}
            </div>
          </div>
          <p className="text-center text-lg text-rich-mahogany-200 mt-8">
            Loading movies page...
          </p>
        </div>
      }
    >
      <MoviesContent />
    </Suspense>
  );
}
