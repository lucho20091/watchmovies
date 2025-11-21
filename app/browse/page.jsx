"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import MovieCard from "@/components/Movie-card";

export default function BrowsePage() {
  const [trendingType, setTrendingType] = useState("movies");
  const [ratedType, setRatedType] = useState("series");

  const [trendingData, setTrendingData] = useState(null);
  const [ratedData, setRatedData] = useState(null);

  // Fetch Trending Movies/Series
  useEffect(() => {
    async function fetchTrendingData() {
      try {
        setTrendingData(null);
        const url = `/api/${trendingType}/trending`;
        const response = await fetch(url);
        const data = await response.json();
        setTrendingData(data);
      } catch (e) {
        console.error("Error fetching trending data:", e);
      }
    }
    fetchTrendingData();
  }, [trendingType]);

  // Fetch Top Rated Movies/Series
  useEffect(() => {
    async function fetchRatedData() {
      try {
        setRatedData(null);
        const url = `/api/${ratedType}/rated`;
        const response = await fetch(url);
        const data = await response.json();
        setRatedData(data);
      } catch (e) {
        console.error("Error fetching rated data:", e);
      }
    }
    fetchRatedData();
  }, [ratedType]);

  return (
    <div className="overflow-x-hidden">
      {/* Trending Section */}
      <div className="p-4 md:p-0 md:pt-4 container mx-auto">
        <div className="text-white flex items-center justify-between">
          <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2">
            <span className="hidden md:inline-block">What's</span> trending{" "}
            <span className="hidden md:inline-block"> today</span>
          </h3>
          <div>
            <button
              className={`px-4 py-2 border-b-2 ${
                trendingType === "movies" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => setTrendingType("movies")}
            >
              Movies
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                trendingType === "series" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => setTrendingType("series")}
            >
              Series
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {trendingData &&
              trendingData.map((item) => {
                if (item.poster_path) {
                  return (
                    <MovieCard
                      movie={item}
                      key={item.id}
                      isSeries={trendingType === "series"}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>

      {/* Top Rated Section */}
      <div className="p-4 md:p-0 md:pt-4 container mx-auto">
        <div className="text-white flex items-center justify-between">
          <h3 className="text-2xl font-bold border-l-8 border-red-500 pl-2">
            Top Rated
          </h3>
          <div>
            <button
              className={`px-4 py-2 border-b-2 ${
                ratedType === "movies" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => setRatedType("movies")}
            >
              Movies
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                ratedType === "series" ? "border-red-500" : "border-white"
              } cursor-pointer`}
              onClick={() => setRatedType("series")}
            >
              Series
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {ratedData &&
              ratedData.map((item) => {
                if (item.poster_path) {
                  return (
                    <MovieCard
                      movie={item}
                      key={item.id}
                      isSeries={ratedType === "series"}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}