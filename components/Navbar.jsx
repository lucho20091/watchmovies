"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Helper function to check if link is active
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Helper function to get link classes
  const getLinkClasses = (path) => {
    const baseClasses = `
    text-rich-mahogany-100
    h-full 
    flex items-center 
    transition-colors duration-200 ease-in-out
    ${path === "/" ? "hidden sm:flex" : ""}
  `;

    const activeClasses = `
    text-rich-mahogany-500 
    border-b-1
    border-rich-mahogany-500
    font-semibold 
    shadow-md
  `;

    const inactiveClasses = `
    hover:text-rich-mahogany-300 
  `;

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchInputVisible(false); // Close search input after submission
      setSearchQuery(""); // Clear query
    }
  };

  const toggleSearchInput = () => {
    setIsSearchInputVisible(!isSearchInputVisible);
    if (!isSearchInputVisible) {
      // If opening, focus the input after state updates
      setTimeout(() => searchInputRef.current?.focus(), 0);
    } else {
      setSearchQuery(""); // Clear query when closing
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        isSearchInputVisible
      ) {
        const searchButton = document.getElementById("search-toggle-button");

        if (searchButton && !searchButton.contains(event.target)) {
          setIsSearchInputVisible(false);
          setSearchQuery("");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchInputVisible]);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-rich-mahogany-900 px-4 shadow-lg border-b border-rich-mahogany-950 h-16">
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link
          href="/"
          className="flex gap-2 text-xl md:text-3xl font-bold text-rich-mahogany-500 hover:text-rich-mahogany-600 transition-colors py-4 "
        >
          <span>MoviesFree</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          {!isSearchInputVisible && (
            <>
              <Link href="/" className={getLinkClasses("/")}>
                Home
              </Link>
              <Link href="/movies" className={getLinkClasses("/movies")}>
                Movies
              </Link>
              <Link href="/series" className={getLinkClasses("/series")}>
                Series
              </Link>
            </>
          )}

          {isSearchInputVisible && (
            <div ref={searchContainerRef}>
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center w-full max-w-md gap-2 mr-0 ml-2"
              >
                <label htmlFor="navbar-search-input" className="sr-only">
                  Search for movies or shows
                </label>

                <input
                  ref={searchInputRef}
                  id="navbar-search-input"
                  type="text"
                  placeholder="Search..."
                  className="flex-1 w-full p-2 rounded-md bg-rich-mahogany-950 text-rich-mahogany-100
               border border-rich-mahogany-500 focus:outline-none text-rich-mahogany-200 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button
                  type="submit"
                  className="flex items-center justify-center h-10 min-w-[42px]
               bg-rich-mahogany-950 hover:bg-rich-mahogany-800 text-rich-mahogany-200
               rounded-md border border-rich-mahogany-500 transition-colors
               disabled:opacity-50 disabled:cursor-not-allowed
               disabled:hover:bg-rich-mahogany-800"
                  disabled={!searchQuery.trim()}
                  aria-label="Perform search"
                >
                  <FaSearch size={18} />
                </button>
              </form>
            </div>
          )}

          <button
            id="search-toggle-button"
            onClick={toggleSearchInput}
            className={`${
              isSearchInputVisible && "hidden"
            }py-1  rounded-md transition-colors duration-200 ease-in-out     text-rich-mahogany-100 cursor-pointer`}
            aria-label={isSearchInputVisible ? "Close search" : "Open search"}
          >
            {isSearchInputVisible ? (
              <></>
            ) : (
              <div className="flex justify-center items-center gap-2  h-full       text-rich-mahogany-100  hover:text-rich-mahogany-300 ">
                <span className="hidden md:inline">Search</span>
                <FaSearch size={18} className="md:text-xl" />
              </div>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
