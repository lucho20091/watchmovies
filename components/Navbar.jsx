"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import SearchOverlay from "./SearchOverlay"; // Import the new SearchOverlay component

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  // Helper function to check if link is active
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Helper function to get link classes
  const getLinkClasses = (path) => {
    const baseClasses =
      "px-3 py-1 rounded-md transition-colors duration-200 ease-in-out";
    const activeClasses = "bg-red-600 text-white font-semibold shadow-md";
    const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 py-4 px-6 shadow-lg border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex gap-2 text-2xl md:text-3xl font-bold text-red-500 hover:text-red-400 transition-colors"
          >
            <span>MoviesFree</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/" className={getLinkClasses("/")}>
              Home
            </Link>
            <Link href="/movies" className={getLinkClasses("/movies")}>
              Movies
            </Link>
            <Link href="/series" className={getLinkClasses("/series")}>
              Series
            </Link>
            <button
              onClick={() => setIsSearchOverlayOpen(true)}
              className="px-3 py-1 rounded-md transition-colors duration-200 ease-in-out text-gray-300 hover:bg-gray-700 hover:text-white"
              aria-label="Open search"
            >
              <div className="flex justify-center items-center gap-2">
                <span className="hidden md:inline">Search</span>
                <FaSearch size={18} className="md:text-xl" />
              </div>
            </button>
          </div>
        </div>
      </nav>
      <SearchOverlay
        isOpen={isSearchOverlayOpen}
        onClose={() => setIsSearchOverlayOpen(false)}
      />
    </>
  );
}