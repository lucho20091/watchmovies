"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import Link from "next/link";

export default function TvPageSeasonEpisode() {
  const { id, season, episode } = useParams();
  const [tvData, setTvData] = useState(null);
  const [tvUrl, setTvUrl] = useState(null);
  const [tvPoster, setTvPoster] = useState(null);
  const [seasonRef, setSeasonRef] = useState(season);

  console.log(tvData);

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
        // setTvUrl(data.url);
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
  }, [id, episode]);

  return (
    tvData && (
      <div className="relative">
        {tvPoster && (
          <img
            src={tvPoster.mobile}
            className="absolute top-0 bottom-0 left-0 right-0 block md:hidden z-[-2] h-full object-cover"
          />
        )}
        {tvPoster && (
          <img
            src={tvPoster.desktop}
            className="absolute top-0 bottom-0 left-0 right-0 hidden md:block custom-shadow object-cover z-[-2] object-cover h-full"
          />
        )}
        <div className="absolute w-full h-[100%] left-0 bottom-0 right-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent md:via-black/80 md:to-black/40 rounded-b-lg z-[-1]"></div>
        <div className="z-[2] pt-4 md:pt-10 pb-20">
          <h1 className="text-shadow text-4xl md:text-6xl font-bold mb-4 text-center">
            {tvData?.name}
          </h1>
          <div className="flex gap-4 text-white w-fit mx-auto font-bold text-lg">
            <span>{tvData?.first_air_date}</span>
            <span>⭐{tvData?.vote_average.toFixed(1)}</span>
            <span>{tvData?.status}</span>
          </div>
          <div className="flex justify-center items-center mt-4 gap-4">
            {tvData.genres.map((item) => (
              <span
                key={item?.id}
                className="bg-red-800 text-orange-200 font-bold px-2 py-1 rounded-sm custom-shadow cursor-pointer"
              >
                {item?.name}
              </span>
            ))}
          </div>
          <div className="text-white p-4">
            <span className="line-clamp-3 text-base/5 text-center w-[90%] mx-auto font-semibold">
              {tvData?.overview}
            </span>
          </div>
          <div className="grid place-items-center">
            <select
              name="season"
              id="season"
              className="w-36 mx-auto bg-neutral-950 px-2 py-1 rounded-sm font-bold text-xl border-white border-2 text-center"
              onChange={(e) => setSeasonRef(e.target.value)}
              value={seasonRef}
            >
              {tvData.seasons.map((item) => {
                if (item.season_number == 0) return;
                return (
                  <option key={item.id} value={item.season_number}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="md:border-2 md:border-gray-700 w-[90%] md:p-0 max-w-screen-xl mx-auto md:mb-4 mt-4">
            <div className="grid h-64 md:h-96 overflow-y-auto p-4 gap-y-4 bg-neutral-950">
              {Array.from({
                length:
                  tvData.seasons[
                    tvData.seasons[0].season_number == 0
                      ? seasonRef
                      : seasonRef - 1
                  ].episode_count,
              }).map((_, index) => (
                <Link key={index} href={`/tv/${id}/${seasonRef}/${index + 1}`}>
                  <div className="flex relative border-b-2 border-gray-400 pb-4 cursor-pointer gap-x-4">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        tvData.seasons[
                          seasonRef == 0 ? seasonRef : seasonRef - 1
                        ].poster_path
                      }
                      className="w-12"
                    />
                    <span className="absolute bottom-4 left-0 bg-red-500 px-2 py-1 font-bold ">
                      {index + 1}
                    </span>
                    <p className="line-clamp-3 text-white">
                      {tvData?.seasons[
                        tvData.seasons[0].season_number == 0
                          ? seasonRef
                          : seasonRef - 1
                      ]?.overview ||
                        `${tvData.name} S${seasonRef}E${index + 1}`}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {tvUrl ? (
            <div>
              <iframe
                src={tvUrl}
                allow="fullscreen"
                allowFullScreen
                className="w-[90%] mt-4 max-w-screen-xl mx-auto aspect-video"
              ></iframe>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    )
  );
}
