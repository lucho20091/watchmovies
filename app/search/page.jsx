"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton"; // Import skeleton for individual cards

// Separate component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const performSearch = async (query) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    try {
      setIsLoading(true);
      setMovies([]); // Clear previous results
      const response = await fetch(
        `/api/search/${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Search error:", error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Check for query parameters on component mount and when URL changes
  useEffect(() => {
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setSearchQuery(queryParam);
      performSearch(queryParam);
    } else {
      setSearchQuery("");
      setMovies([]);
    }
  }, [searchParams]);

  return (
    <div className="grow p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Search Results for "{searchQuery}"
        </h1>

        {isLoading && (
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 18 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))}
            </div>
          </div>
        )}

        {!isLoading && movies.length === 0 && searchQuery && (
          <p className="text-center text-lg text-gray-400 mt-8">
            No results found for "{searchQuery}". Try a different search term.
          </p>
        )}

        {!isLoading && movies.length === 0 && !searchQuery && (
          <p className="text-center text-lg text-gray-400 mt-8">
            Start by searching for a movie or TV show using the search icon in the navigation bar.
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
          {!isLoading &&
            movies.map((movie) => {
              if (movie.poster_path) {
                return <MovieCard movie={movie} key={movie.id} />;
              }
            })}
        </div>
      </div>
    </div>
  );
}

// Loading fallback component for the initial load of the search page
function SearchPageLoading() {
  return (
    <div className="grow p-4">
      <div className="container mx-auto">
        <div className="h-10 bg-gray-700 rounded w-64 mb-6 mx-auto animate-pulse"></div> {/* Placeholder for title */}
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 18 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component that wraps SearchContent in Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchContent />
    </Suspense>
  );
}