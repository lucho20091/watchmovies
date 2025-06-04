"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

export default function TvPage() {  
    const [tvData, setTvData] = useState(null);
    const [tvUrl, setTvUrl] = useState(null);
    const [tvPoster, setTvPoster] = useState(null)
    const [season, setSeason] = useState(0)
    const [episode, setEpisode] = useState(1)
    const [openSeason, setOpenSeason] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        if (!id) return; // Don't fetch until we have the id

        async function fetchTvUrl() {
            try {
                const response = await fetch(`/api/tv/${id}?season=${season || 1}&episode=${episode || 1}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                
                const data = await response.json();
                setTvUrl(data.url);
                setTvData(data.data)
                setSeason(data.data.seasons[0].season_number)
                if (data.data.poster_path){
                    setTvPoster(`https://image.tmdb.org/t/p/original${data.data.poster_path}`)
                }
            } catch (error) {
                console.error("Error fetching TV URL:", error);
            }
        }
        
        fetchTvUrl();
    }, [id, episode]);

    console.log("tvdata", tvData)
    // console.log("season", season)
    console.log(`S${season}E${episode}`)
    return tvData && (
        <div className="grow relative">
            {tvPoster && <img src={tvPoster} className="absolute top-0 bottom-0 left-0 right-0"/>}
            <div className="absolute w-full h-[100%] left-0 bottom-0 right-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent rounded-b-lg"></div>
            <div className="absolute top-[10%] left-0 right-0 pb-20">
                <h1 className="text-6xl font-bold mb-4 text-center">{tvData?.name}</h1>
                <div className="flex gap-4 text-white w-fit mx-auto font-bold text-lg">
                    <span>{tvData?.first_air_date}</span>
                    <span>⭐{tvData?.vote_average.toFixed(1)}</span>
                    <span>{tvData?.status}</span>
                </div>
                <div className="flex justify-center items-center mt-4 gap-4">
                    {tvData.genres.map(item => (
                        <span key={item?.id} className="bg-red-800 text-orange-200 font-bold px-2 py-1 rounded-sm custom-shadow cursor-pointer">
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
                    <select name="season" id="season" className="bg-neutral-950 px-2 py-1 rounded-sm" onChange={(e) => setSeason(e.target.value)} value={season}>
                        {tvData.seasons.map(item => (
                            <option key={item.id} value={item.season_number}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="p-4 md:p-0 max-w-screen-xl mx-auto md:mb-12">
                <div className="grid h-64 overflow-y-auto p-4 gap-y-4 bg-neutral-950 mt-4">
                     {Array.from({ length: tvData.seasons[season === 1 ? season - 1 : season].episode_count }).map((_, index) => (
                        <button key={index} onClick={() => setEpisode(index + 1)}>
                            <div className="flex relative border-b-2 border-gray-400 pb-4 cursor-pointer gap-x-4">
                                <img src={'https://image.tmdb.org/t/p/original' + tvData.seasons[season === 1 ? season - 1 : season].poster_path} 
                                className="w-12"/>
                                <span className="absolute bottom-4 left-0 bg-red-500 px-2 py-1 font-bold ">{index + 1}</span>
                                <p className="line-clamp-3 text-white">{tvData.seasons[season === 1 ? season - 1 : season].overview || `${tvData.name} S${season}E${index+1}`}</p>
                            </div>
                        </button>
                     ))}
                </div>
                </div>
                {tvUrl ? (
                    <div>
                        <iframe 
                        src={tvUrl} 
                        allow="fullscreen" 
                        allowFullScreen
                        className="w-[90%] max-w-screen-xl mx-auto aspect-video"
                        ></iframe>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )


}
    // async function fetchTvData(){
    //     const options = {
    //         method: 'Get',
    //         headers: {
    //             accept: 'application/json',
    //             Authorization: process.env.MOVIEDB_API_BEARER
    //         }
    //     }
    //     try{
    //         const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
    //         if (!response.ok){
    //             throw new Error("Network response was not ok");
    //         }
    //         const data = await response.json();
    //         return data;
    //     } catch (error){
    //         return null;
    //     }
    // }
    
    // const tvData = await fetchTvData();

    //     return (
    //     <div className="grow p-4">
    //         <div className="container mx-auto">
    //             <h1 className="text-2xl font-bold mb-4">{tvData?.name || "Loading..."}</h1>
    //             <p className="mb-4">Overview: {tvData?.overview || "Loading..."}</p>
    //             {tvUrl ? (
    //                 <iframe 
    //                     src={tvUrl} 
    //                     allow="fullscreen" 
    //                     allowFullScreen
    //                     className="w-[90%] max-w-screen-xl mx-auto aspect-video"
    //                 ></iframe>
    //             ) : (
    //                 <p>Loading...</p>
    //             )}
    //                           {tvData && (
    //                 seasonsFormat.map((item) => {
    //                     return (
    //                         <div key={item.id} className="mt-4">
    //                             <button 
    //                                 onClick={() => setOpenSeason(item.season_number)}
    //                                 className={`px-2 py-1 cursor-pointer ${season === item.season_number ? 'bg-white text-black my-2' : 'bg-slate-950 text-white'}`}
    //                             >{item.name}</button>
    //                             {openSeason === item.season_number && (
    //                             <div className="mt-2 grid grid-cols-10 md:grid-cols-20 gap-2">
    //                                 {Array.from({ length: item.episode_count }, (_, index) => (
    //                                     <button
    //                                         key={index + 1}
    //                                         onClick={() => handleEpisodeClick(item.season_number, index + 1)}
    //                                         className={`px-3 py-1 rounded text-sm flex justify-center items-center cursor-pointer transition-colors ${
    //                                             season === item.season_number && episode === index + 1
    //                                                 ? 'bg-white text-black font-bold'
    //                                                 : 'bg-slate-950 text-white hover:bg-slate-800'
    //                                         }`}
    //                                     >
    //                                         {index + 1}
    //                                     </button>
    //                                 ))}
    //                             </div>
    //                         )}
    //                         </div>
    //                     )
    //                 })
    //             )}
    //         </div>
    //     </div>
    // );

    //     const seasonsFormat = tvData?.seasons.filter((season) => {
    //     if (season.name.includes("Season")){
    //         return season
    //     }
    // })

    // function handleEpisodeClick(season, episode){
    //     setSeason(season)
    //     setEpisode(episode)
    // }