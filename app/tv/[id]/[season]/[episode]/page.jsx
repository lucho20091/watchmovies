"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function TvPageSeasonEpisode() {
  const { id, season, episode } = useParams();
  const [tvData, setTvData] = useState(null);
  const [tvUrl, setTvUrl] = useState(null);
  const [tvPoster, setTvPoster] = useState(null);
  const [seasonRef, setSeasonRef] = useState(parseInt(season)); // Ensure seasonRef is a number

  useEffect(() => {
    if (!id) return;

    async function fetchTvUrl() {
      try {
        const response = await fetch(
          `/api/tv/${id}?season=${season || 1}&episode=${episode || 1}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTvUrl(data.url);
        setTvData(data.data);
        if (data.data.poster_path) {
          setTvPoster({
            mobile: `https://image.tmdb.org/t/p/original${data.data.poster_path}`,
            desktop: `https://image.tmdb.org/t/p/original${data.data.backdrop_path}`,
          });
        }
      } catch (error) {
        console.error("Error fetching TV URL:", error);
      }
    }

    fetchTvUrl();
  }, [id, episode, season]);

  useEffect(() => {
    setSeasonRef(parseInt(season));
  }, [season]);

  return (
    tvData && (
      <div className="relative min-h-screen flex flex-col">
        {tvPoster && tvPoster.mobile && (
          <Image
            src={tvPoster.mobile}
            alt={tvData?.name || "TV Series Poster"}
            fill
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover z-[-2] block md:hidden"
            priority
            quality={70} // Reduced image quality for performance
          />
        )}
        {tvPoster && tvPoster.desktop && (
          <Image
            src={tvPoster.desktop}
            alt={tvData?.name || "TV Series Backdrop"}
            fill
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover z-[-2] hidden md:block"
            priority
            quality={70} // Reduced image quality for performance
          />
        )}
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center pt-4 md:pt-10 pb-20 text-white container mx-auto px-4">
          <h1 className="text-shadow text-4xl md:text-6xl font-bold mb-4 text-center">
            {tvData?.name}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-white font-bold text-lg mb-4">
            <span>{tvData?.first_air_date?.substring(0, 4)}</span>
            <span>⭐{tvData?.vote_average.toFixed(1)}</span>
            <span>{tvData?.status}</span>
          </div>
          <div className="flex flex-wrap justify-center items-center mt-4 gap-2 mb-6">
            {tvData.genres.map((item) => (
              <span
                key={item?.id}
                className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {item?.name}
              </span>
            ))}
          </div>
          <p className="line-clamp-4 md:line-clamp-5 text-base md:text-lg text-center max-w-3xl mx-auto font-semibold mb-8">
            {tvData?.overview}
          </p>

          <div className="grid place-items-center mb-4">
            <select
              name="season"
              id="season"
              className="w-36 mx-auto bg-neutral-800 px-2 py-1 rounded-md font-bold text-xl border-gray-700 border-2 text-center text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setSeasonRef(parseInt(e.target.value))}
              value={seasonRef}
            >
              {tvData.seasons.map((item) => {
                if (item.season_number === 0) return null; // Skip season 0 if it exists
                return (
                  <option key={item.id} value={item.season_number}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="md:border-2 md:border-gray-700 w-full max-w-screen-xl mx-auto md:mb-4 mt-4 rounded-lg overflow-hidden">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-4 p-4 bg-neutral-950 max-h-64 overflow-y-auto">
              {tvData.seasons[
                tvData.seasons[0].season_number === 0
                  ? seasonRef
                  : seasonRef - 1
              ]?.episode_count &&
                Array.from({
                  length:
                    tvData.seasons[
                      tvData.seasons[0].season_number === 0
                        ? seasonRef
                        : seasonRef - 1
                    ].episode_count,
                }).map((_, index) => {
                  const episodeNumber = index + 1;
                  return (
                    <Link
                      key={index}
                      href={`/tv/${id}/${seasonRef}/${episodeNumber}`}
                    >
                      <button
                        className={`px-4 py-2 rounded-md font-bold transition-colors duration-200 w-full cursor-pointer
                          ${
                            parseInt(episode) === episodeNumber &&
                            parseInt(season) === seasonRef
                              ? "bg-red-600 text-white"
                              : "bg-gray-700 text-white hover:bg-gray-600"
                          }`}
                      >
                        E{episodeNumber}
                      </button>
                    </Link>
                  );
                })}
            </div>
          </div>
          {tvUrl ? (
            <div className="w-full max-w-screen-xl mx-auto mt-8">
              <iframe
                src={tvUrl}
                allow="fullscreen"
                allowFullScreen
                className="w-full aspect-video rounded-lg shadow-xl"
              ></iframe>
            </div>
          ) : (
            <p className="text-lg text-center mt-8">Loading video player...</p>
          )}
        </div>
      </div>
    )
  );
}