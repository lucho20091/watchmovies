"use client";

import Link from "next/link";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// A 1x1 transparent GIF for blurDataURL placeholder
const transparentGif =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Fetch trending movies
        const moviesResponse = await fetch("/api/movies/trending?page=1");
        const moviesData = await moviesResponse.json();
        setTrendingMovies(moviesData.results);
        setHeroMovies(moviesData.results.slice(0, 5)); // Take first 5 for hero section

        // Fetch trending series
        const seriesResponse = await fetch("/api/series/trending?page=1");
        const seriesData = await seriesResponse.json();
        setTrendingSeries(seriesData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handlePrevHero = () => {
    setCurrentHeroIndex((prevIndex) =>
      prevIndex === 0 ? heroMovies.length - 1 : prevIndex - 1
    );
  };

  const handleNextHero = () => {
    setCurrentHeroIndex((prevIndex) =>
      prevIndex === heroMovies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentHeroMovie = heroMovies[currentHeroIndex];
  const first10TrendingMovies = trendingMovies.slice(0, 10);
  const first10TrendingSeries = trendingSeries.slice(0, 10);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-rich-mahogany-950 text-rich-mahogany-100 p-4">
        <p className="text-xl">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="grow">
      {currentHeroMovie && (
        <div className="relative h-[calc(100svh-63px)] overflow-hidden group">
          {currentHeroMovie.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${currentHeroMovie.backdrop_path}`}
              alt={currentHeroMovie.title || "Movie Backdrop"}
              fill
              sizes="100vw"
              className="absolute inset-0 w-full h-full object-cover z-[-2] hidden md:block"
              priority
              quality={70}
              placeholder="blur"
              blurDataURL={transparentGif}
            />
          )}
          {currentHeroMovie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${currentHeroMovie.poster_path}`}
              alt={currentHeroMovie.title || "Movie Poster"}
              fill
              sizes="100vw"
              className="absolute inset-0 w-full h-full object-cover z-[-2] block md:hidden"
              priority
              quality={70}
              placeholder="blur"
              blurDataURL={transparentGif}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/60"></div>

          <div className="relative z-10 flex flex-col justify-end h-full px-4 sm:px-0 py-8 md:py-12 text-rich-mahogany-100 container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-shadow mb-4">
              {currentHeroMovie.title}
            </h1>
            <p className="text-lg md:text-xl mb-4 max-w-2xl line-clamp-3 text-shadow">
              {currentHeroMovie.overview}
            </p>
            <div className="flex items-center gap-4 mb-6 text-shadow">
              <span className="text-lg md:text-xl font-semibold">
                ⭐ {currentHeroMovie.vote_average.toFixed(1)}
              </span>
              <span className="text-lg md:text-xl font-semibold">
                {currentHeroMovie.release_date?.substring(0, 4)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <Link href={`/movie/${currentHeroMovie.id}`}>
                <button className="border border-rich-mahogany-500 hover:bg-rich-mahogany-500/60 text-rich-mahogany-100 font-bold py-3 px-6 rounded-lg text-lg transition-colors cursor-pointer">
                  Watch Now
                </button>
              </Link>
              {heroMovies.length > 1 && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevHero}
                    className="text-rich-mahogany-100 border border-rich-mahogany-500 hover:bg-rich-mahogany-500/60 font-bold py-3 px-4 rounded-lg text-lg transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Previous hero movie"
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextHero}
                    className="text-rich-mahogany-100 border border-rich-mahogany-500 hover:bg-rich-mahogany-500/60 font-bold py-3 px-4 rounded-lg text-lg transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Next hero movie"
                  >
                    <FaChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 md:px-0">
        <div className="flex items-center justify-between mb-8 md:mt-8">
          <h2 className="text-lg  font-bold flex items-center text-rich-mahogany-100">
            <span className="bg-rich-mahogany-500 w-[2px] h-6 mr-3"></span>
            TOP 10 MOVIES
          </h2>
          <Link
            href="/movies"
            className="text-rich-mahogany-500 border-b-1 border-rich-mahogany-500 text-lg hover:text-rich-mahogany-500 hover:border-rich-mahogany-500"
          >
            View More
          </Link>
        </div>
        <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {first10TrendingMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
        <div className="flex items-center justify-between mb-8 mt-4 md:mt-8">
          <h2 className="text-lg font-bold flex items-center text-rich-mahogany-100">
            <span className="bg-rich-mahogany-500 w-[2px] h-6 mr-3"></span>
            TOP 10 SERIES
          </h2>
          <Link
            href="/series"
            className="text-rich-mahogany-500 border-b-1 border-rich-mahogany-500 text-lg hover:text-rich-mahogany-500 hover:border-rich-mahogany-500"
          >
            View More
          </Link>
        </div>
        <div className="mt-4 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:mb-8">
          {first10TrendingSeries.map((serie) => (
            <MovieCard movie={serie} key={serie.id} isSeries={true} />
          ))}
        </div>
      </div>
    </div>
  );
}