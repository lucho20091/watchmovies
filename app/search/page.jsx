"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import MovieCard from "@/components/MovieCard";
import { FaSearch } from "react-icons/fa"; // Import FaSearch icon

// Separate component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Get router for navigation
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // This is for displaying the current search term
  const [currentSearchInput, setCurrentSearchInput] = useState(""); // This is for the input field's value

  // Simple autocorrection logic
  const getCorrection = (query) => {
    const lowerQuery = query.toLowerCase();
    switch (lowerQuery) {
      case "vampirw":
        return "vampire";
      case "interview with the vampirw":
        return "interview with the vampire";
      default:
        return null; // No specific correction found
    }
  };

  const performSearch = async (query) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    try {
      setIsLoading(true);
      setMovies([]); // Clear previous results
      const response = await fetch(`/api/search/${encodeURIComponent(query)}`);
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
      setSearchQuery(queryParam); // Update display query
      setCurrentSearchInput(queryParam); // Update input field value
      performSearch(queryParam);
    } else {
      setSearchQuery("");
      setCurrentSearchInput("");
      setMovies([]);
    }
  }, [searchParams]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentSearchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(currentSearchInput.trim())}`);
    }
  };

  // Determine corrected text
  const correctedText =
    !isLoading && movies.length === 0 && searchQuery
      ? getCorrection(searchQuery)
      : null;

  return (
    <div className="grow p-4 lg:py-6">
      <div className="container mx-auto">
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center w-full max-w-md mx-auto gap-2 mb-8 mt-4"
        >
          <label htmlFor="search-page-input" className="sr-only">
            Search for movies or shows
          </label>
          <input
            id="search-page-input"
            type="text"
            placeholder="Search..."
            className="flex-1 w-full p-2 rounded-md bg-rich-mahogany-950 text-rich-mahogany-100
               border border-rich-mahogany-500 focus:outline-none text-rich-mahogany-200 h-10"
            value={currentSearchInput}
            onChange={(e) => setCurrentSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center h-10 min-w-[42px]
               bg-rich-mahogany-950 hover:bg-rich-mahogany-800 text-rich-mahogany-200
               rounded-md border border-rich-mahogany-500 transition-colors
               disabled:opacity-50 disabled:cursor-not-allowed
               disabled:hover:bg-rich-mahogany-800"
            disabled={!currentSearchInput.trim()}
            aria-label="Perform search"
          >
            <FaSearch size={18} />
          </button>
        </form>

        <h1 className="text-xl font-bold text-rich-mahogany-100 mb-4 lg:mb-6 text-center">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "Search Movies & TV Shows"}
        </h1>

        {isLoading && (
          <p className="text-center text-lg text-rich-mahogany-200 mt-8">
            Loading search results...
          </p>
        )}

        {!isLoading && movies.length === 0 && searchQuery && (
          <p className="text-center text-lg text-rich-mahogany-200 mt-8">
            No results found for "{searchQuery}". Try a different search term.
            {correctedText && (
              <span className="block mt-4">
                Did you mean{" "}
                <Link
                  href={`/search?q=${encodeURIComponent(correctedText)}`}
                  className="text-rich-mahogany-500 hover:underline"
                >
                  "{correctedText}"
                </Link>
                ?
              </span>
            )}
          </p>
        )}

        {!isLoading && movies.length === 0 && !searchQuery && (
          <p className="text-center text-lg text-rich-mahogany-200 mt-8">
            Start by searching for a movie or TV show using the search bar
            above.
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
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

// Main component that wraps SearchContent in Suspense
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="grow p-4">
          <div className="container mx-auto">
            <div className="h-10 bg-gray-700 rounded w-64 mb-6 mx-auto animate-pulse"></div>
            <p className="text-center text-lg text-rich-mahogany-200 mt-8">
              Loading search page...
            </p>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}