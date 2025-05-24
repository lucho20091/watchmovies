"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"

export default function TvPage() {  
    const [tvData, setTvData] = useState(null);
    const [tvUrl, setTvUrl] = useState(null);
    const [season, setSeason] = useState(null)
    const [episode, setEpisode] = useState(null)
    const [openSeason, setOpenSeason] = useState(null)
    const { id } = useParams()

    console.log(id)


    useEffect(() => {
        if (!id) return; // Don't fetch until we have the id

        async function fetchTvUrl() {
            try {
                console.log("ran 2");
                const response = await fetch(`/api/tv/${id}?season=${season || 1}&episode=${episode || 1}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                console.log(response);
                console.log("ran 3");
                
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                
                const data = await response.json();
                console.log(data)
                setTvUrl(data.url);
                setTvData(data.data)
            } catch (error) {
                console.error("Error fetching TV URL:", error);
            }
        }
        
        fetchTvUrl();
    }, [id, episode]);

    console.log(tvData)
    const seasonsFormat = tvData?.seasons.filter((season) => {
        if (season.name.includes("Season")){
            return season
        }
    })

    function handleEpisodeClick(season, episode){
        setSeason(season)
        setEpisode(episode)
    }

    console.log(seasonsFormat)
    console.log(openSeason)


    return (
        <div className="grow p-4">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">{tvData?.name || "Loading..."}</h1>
                <p className="mb-4">Overview: {tvData?.overview || "Loading..."}</p>
                {tvUrl ? (
                    <iframe 
                        src={tvUrl} 
                        allow="fullscreen" 
                        allowFullScreen
                        className="w-[90%] max-w-screen-xl mx-auto aspect-video"
                    ></iframe>
                ) : (
                    <p>Loading...</p>
                )}
                              {tvData && (
                    seasonsFormat.map((item) => {
                        return (
                            <div key={item.id} className="mt-4">
                                <button 
                                    onClick={() => setOpenSeason(item.season_number)}
                                    className={`px-2 py-1 cursor-pointer ${season === item.season_number ? 'bg-white text-black my-2' : 'bg-slate-950 text-white'}`}
                                >{item.name}</button>
                                {openSeason === item.season_number && (
                                <div className="mt-2 grid grid-cols-10 md:grid-cols-20 gap-2">
                                    {Array.from({ length: item.episode_count }, (_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => handleEpisodeClick(item.season_number, index + 1)}
                                            className={`px-3 py-1 rounded text-sm flex justify-center items-center cursor-pointer transition-colors ${
                                                season === item.season_number && episode === index + 1
                                                    ? 'bg-white text-black font-bold'
                                                    : 'bg-slate-950 text-white hover:bg-slate-800'
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
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