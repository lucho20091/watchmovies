"use client"; // Add this if you're using Next.js 13+ with app router

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";

export default function Navbar() {
  const pathname = usePathname();

  // Helper function to check if link is active
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Helper function to get link classes
  const getLinkClasses = (path) => {
    const baseClasses = "transition";
    const activeClasses = "text-red-500 font-semibold";
    const inactiveClasses = "hover:text-red-400";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="bg-gray-800 py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 text-xl md:text-2xl font-bold text-red-500"
        >
          <span>MoviesFree</span>
        </Link>

        <div className="flex space-x-2 md:space-x-6">
          <Link href="/" className={getLinkClasses("/")}>
            Home
          </Link>
          <Link href="/browse" className={getLinkClasses("/browse")}>
            Browse
          </Link>
          <Link href="/kdrama/1" className={getLinkClasses("/kdrama")}>
            Kdrama
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/search">
            <div
              className={`flex justify-center items-center gap-2 md:hidden transition ${
                isActive("/search") ? "text-red-500" : "hover:text-red-400"
              }`}
            >
              <span className="hidden">Search</span>
              <FaSearch size={18} />
            </div>

            <div
              className={`hidden md:flex justify-center items-center gap-2 transition ${
                isActive("/search") ? "text-red-500" : "hover:text-red-400"
              }`}
            >
              <span>Search</span>
              <FaSearch size={22} />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
