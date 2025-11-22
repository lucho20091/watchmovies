"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { seriesCategories } from "@/utils/categories"; // Import seriesCategories

export default function TvPageSeasonEpisode() {
  const { id, season, episode } = useParams();
  const router = useRouter();
  const [tvData, setTvData] = useState(null);
  const [tvPoster, setTvPoster] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);
  const [seasonRef, setSeasonRef] = useState(parseInt(season));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to map genre name to category value for TV series
  const getSeriesCategoryValue = (genreName) => {
    switch (genreName) {
      case "Action & Adventure":
        return "action";
      case "Sci-Fi & Fantasy":
        return "scifi";
      case "War & Politics":
        return "war";
      default:
        return genreName.toLowerCase();
    }
  };

  // Define video servers dynamically
  const videoServers = [
    {
      name: "Vidsrc",
      url: `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}&ds_lang=es&autoplay=1`,
    },
    {
      name: "Vidking",
      url: `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=9146ff&autoPlay=true&nextEpisode=true&episodeSelector=true`,
    },
    {
      name: "111Movies",
      url: `https://111movies.com/tv/${id}/${season}/${episode}`,
    },
  ];

  useEffect(() => {
    if (!id) return;

    async function fetchTvDetails() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/tv-details/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setTvData(null);
          }
          throw new Error("Failed to fetch TV series details");
        }
        const data = await response.json();
        setTvData(data);
        if (data.poster_path) {
          setTvPoster({
            mobile: `https://image.tmdb.org/t/p/original${data.poster_path}`,
            desktop: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
          });
        }
        if (videoServers.length > 0) {
          setSelectedServer(videoServers[0]);
        }
      } catch (err) {
        console.error("Error fetching TV details:", err);
        setError("Failed to load TV series details or video player.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTvDetails();
  }, [id]);

  useEffect(() => {
    setSeasonRef(parseInt(season));
    if (videoServers.length > 0) {
      setSelectedServer(videoServers[0]);
    }
  }, [season, episode]);

  const handleServerSelection = (server) => {
    setSelectedServer(server);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-rich-mahogany-950 text-rich-mahogany-100 p-4">
        <p className="text-xl">Loading TV series details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-rich-mahogany-950 text-rich-mahogany-100 p-4">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg text-center mb-6">{error}</p>
        <Link
          href="/"
          className="bg-rich-mahogany-500 hover:bg-rich-mahogany-600 text-rich-mahogany-100 font-bold py-2 px-4 rounded-lg text-lg transition-colors"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  if (!tvData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-rich-mahogany-950 text-rich-mahogany-100 p-4">
        <h1 className="text-4xl font-bold mb-4">TV Series Not Found</h1>
        <p className="text-lg text-center mb-6">
          The TV series you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="bg-rich-mahogany-500 hover:bg-rich-mahogany-600 text-rich-mahogany-100 font-bold py-2 px-4 rounded-lg text-lg transition-colors"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  // Get a list of valid category values for quick lookup
  const validSeriesCategoryValues = seriesCategories.map((cat) => cat.value);

  return (
    <div className="relative min-h-screen flex flex-col">
      {tvPoster && tvPoster.mobile && (
        <Image
          src={tvPoster.mobile}
          alt={tvData?.name || "TV Series Poster"}
          fill
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover z-[-2] block md:hidden"
          priority
          quality={70}
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
          quality={70}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center pt-4 md:pt-10 pb-20 text-rich-mahogany-100 container mx-auto px-4">
        <h1 className="text-shadow text-4xl md:text-6xl font-bold mb-4 text-center">
          {tvData?.name}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 font-bold text-lg mb-4">
          <span>{tvData?.first_air_date?.substring(0, 4)}</span>
          <span>⭐{tvData?.vote_average.toFixed(1)}</span>
          <span>{tvData?.status}</span>
        </div>
        <div className="flex flex-wrap justify-center items-center mt-4 gap-2 mb-6">
          {tvData.genres.map((item) => {
            const categoryValue = getSeriesCategoryValue(item.name);
            const isClickable =
              validSeriesCategoryValues.includes(categoryValue);

            const genreClasses =
              "bg-rich-mahogany-500 text-rich-mahogany-100 px-3 py-1 rounded-sm text-sm font-medium";
            const hoverClasses =
              "hover:bg-rich-mahogany-600 transition-colors cursor-pointer";

            return isClickable ? (
              <Link
                key={item?.id}
                href={`/series?category=${categoryValue}&page=1`}
                className={`${genreClasses} ${hoverClasses}`}
              >
                {item?.name}
              </Link>
            ) : (
              <span key={item?.id} className={genreClasses}>
                {item?.name}
              </span>
            );
          })}
        </div>
        <p className="line-clamp-4 md:line-clamp-5 text-base md:text-lg text-center max-w-3xl mx-auto font-semibold mb-8">
          {tvData?.overview}
        </p>

        {/* Server Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {videoServers.map((server, index) => (
            <button
              key={index}
              onClick={() => handleServerSelection(server)}
              className={`px-6 py-3 rounded-lg font-bold transition-colors cursor-pointer ${
                selectedServer?.name === server.name
                  ? "bg-rich-mahogany-500"
                  : "bg-rich-mahogany-800 hover:bg-rich-mahogany-700"
              } text-rich-mahogany-100`}
            >
              {server.name}
            </button>
          ))}
        </div>

        <div className="grid place-items-center mb-4">
          <select
            name="season"
            id="season"
            className="w-36 mx-auto bg-rich-mahogany-800 px-2 py-1 rounded-md font-bold text-xl border-rich-mahogany-700 border-2 text-center text-rich-mahogany-100 focus:outline-none focus:ring-2 focus:ring-rich-mahogany-500"
            onChange={(e) => {
              const newSeason = parseInt(e.target.value);
              setSeasonRef(newSeason);
              router.push(`/tv/${id}/${newSeason}/${episode || 1}`);
            }}
            value={seasonRef}
          >
            {tvData.seasons.map((item) => {
              if (item.season_number === 0) return null;
              return (
                <option key={item.id} value={item.season_number}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="md:border-2 md:border-rich-mahogany-700 w-full max-w-screen-xl mx-auto md:mb-4 mt-4 rounded-lg overflow-hidden">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-4 p-4 bg-rich-mahogany-950 max-h-64 overflow-y-auto">
            {tvData.seasons[
              tvData.seasons[0].season_number === 0 ? seasonRef : seasonRef - 1
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
                              ? "bg-rich-mahogany-500 text-rich-mahogany-100"
                              : "bg-rich-mahogany-800 text-rich-mahogany-100 hover:bg-rich-mahogany-700"
                          }`}
                    >
                      E{episodeNumber}
                    </button>
                  </Link>
                );
              })}
          </div>
        </div>
        {selectedServer ? (
          <div className="w-full max-w-screen-xl mx-auto mt-8">
            <iframe
              src={selectedServer.url}
              allowFullScreen
              frameBorder="0"
              className="w-full aspect-video rounded-lg shadow-xl"
            ></iframe>
          </div>
        ) : (
          <p className="text-lg text-center mt-8">
            Select a server to load the video player...
          </p>
        )}
      </div>
    </div>
  );
}
