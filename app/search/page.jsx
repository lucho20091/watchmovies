"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import MovieCard from "@/components/Movie-card";

// Separate component that uses useSearchParams
function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    try {
      setIsLoading(true);
      setMovies([]);
      const response = await fetch(
        `/api/search/${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    // Update URL with query parameter
    router.push(`/search?q=${encodeURIComponent(search)}`, { scroll: false });

    // Perform search
    await performSearch(search);
  };

  // Check for query parameters on component mount and when URL changes
  useEffect(() => {
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setSearch(queryParam);
      performSearch(queryParam);
    }
  }, [searchParams]);

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className={`${!search && "md:grid md:place-items-center"} grow p-4`}>
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="mb-4 flex items-center max-w-md mx-auto"
        >
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for movies or shows..."
            className="p-2 border border-gray-300 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-white text-black font-bold p-2 rounded ml-2 disabled:opacity-50"
            disabled={isLoading || !search.trim()}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {isLoading && (
          <div className="text-center mb-4">
            <p>Searching...</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
          {movies &&
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

// Loading fallback component
function SearchLoading() {
  return (
    <div className="md:grid md:place-items-center grow p-4">
      <div className="container mx-auto">
        <div className="mb-4 flex items-center max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for movies or shows..."
            className="p-2 border border-gray-300 rounded w-full"
            disabled
          />
          <button
            type="button"
            className="bg-white text-black font-bold p-2 rounded ml-2 opacity-50"
            disabled
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

// Main component that wraps SearchContent in Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}
