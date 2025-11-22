"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import CategorySelector from "@/components/CategorySelector";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import PageLoadingSkeleton from "@/components/PageLoadingSkeleton"; // Import the page loading skeleton

// Client component that uses useSearchParams
function SeriesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState("popular"); // Default to "Most popular"
  const [seriesData, setSeriesData] = useState(null);
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

  // Fetch Series based on selected category and page
  useEffect(() => {
    async function fetchSeries() {
      try {
        setIsLoading(true); // Set loading to true before fetching
        setSeriesData(null);
        let url = "";

        if (selectedCategory === "popular") {
          url = `/api/series/trending?page=${currentPage}`;
        } else if (selectedCategory === "rated") {
          url = `/api/series/rated?page=${currentPage}`;
        } else if (selectedCategory === "recent") {
          url = `/api/series/recent?page=${currentPage}`;
        } else {
          // It's a genre
          url = `/api/series/genres/${selectedCategory}?page=${currentPage}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        setSeriesData(data.results.slice(0, 18)); // Limit to 18 results for display
        setTotalPages(data.total_pages);
      } catch (e) {
        console.error("Error fetching series data:", e);
        setSeriesData([]); // Set to empty array on error
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    }
    fetchSeries();
  }, [selectedCategory, currentPage]);

  const seriesCategories = [
    { name: "Most popular", value: "popular" },
    { name: "Most rating", value: "rated" },
    { name: "Action & Adventure", value: "action" },
    { name: "Animation", value: "animation" },
    { name: "Comedy", value: "comedy" },
    { name: "Crime", value: "crime" },
    { name: "Drama", value: "drama" },
    { name: "Family", value: "family" },
    { name: "Kids", value: "kids" },
    { name: "Mystery", value: "mystery" },
    { name: "Reality", value: "reality" },
    { name: "Sci-Fi & Fantasy", value: "scifi" },
    { name: "Talk", value: "talk" },
    { name: "War & Politics", value: "war" },
    { name: "Western", value: "western" },
  ];

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1); // Reset to first page when category changes
    router.push(`/series?category=${newCategory}&page=1`);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      router.push(`/series?category=${selectedCategory}&page=${newPage}`);
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
          className={`px-4 py-2 rounded-md font-bold cursor-pointer ${
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
    <div className="p-4 lg:pt-6 container mx-auto">
      <CategorySelector
        categories={seriesCategories}
        activeCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {isLoading ? (
        <div className="animate-pulse">
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 18 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 mt-12 ">
            <div className="h-10 bg-gray-700 rounded w-24"></div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-700 rounded w-10"></div>
            ))}
            <div className="h-10 bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {seriesData &&
              seriesData.map((series) => {
                if (series.poster_path) {
                  return (
                    <MovieCard movie={series} key={series.id} isSeries={true} />
                  );
                }
              })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16 ">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="px-4 py-2 rounded-md bg-gray-700 text-white font-bold hover:bg-gray-600 disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>
              {renderPaginationButtons()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="px-4 py-2 rounded-md bg-gray-700 text-white font-bold hover:bg-gray-600 disabled:opacity-50 cursor-pointer"
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

// Main SeriesPage component that wraps SeriesContent in Suspense
export default function SeriesPage() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <SeriesContent />
    </Suspense>
  );
}
