"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchOverlay({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the input when the overlay opens
      inputRef.current?.focus();
      // Disable scrolling on the body when overlay is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when overlay closes
      document.body.style.overflow = "unset";
      setSearchQuery(""); // Clear search query when closing
    }
    return () => {
      document.body.style.overflow = "unset"; // Ensure scrolling is re-enabled on unmount
    };
  }, [isOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose(); // Close the overlay after search
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-start justify-center p-4 md:p-8">
      <div className="relative w-full max-w-2xl bg-neutral-900 rounded-lg shadow-xl p-4 md:p-6 mt-16">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Close search"
        >
          <FaTimes size={24} />
        </button>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 mt-4">
          <label htmlFor="search-input" className="sr-only">
            Search for movies or shows
          </label>
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            placeholder="Search for movies or shows..."
            className="flex-grow p-3 rounded-md bg-neutral-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold p-3 rounded-md transition-colors disabled:opacity-50"
            disabled={!searchQuery.trim()}
            aria-label="Perform search"
          >
            <FaSearch size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}