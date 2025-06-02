export default async function MoviePage({ params }) {  
    const { id } = await params;
    async function fetchMovieUrl(){
        try{
            const response = await fetch(`https://vidsrc.xyz/embed/movie?tmdb=${id}`);
            return response.url;
        } catch (error){
            return null;
        }
    }

    async function fetchMovieData(){
        const options = {
            method: 'Get',
            headers: {
                accept: 'application/json',
                Authorization: process.env.MOVIEDB_API_BEARER
            }
        }
        try{
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            if (!response.ok){
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error){
            return null;
        }
    }

    async function fetchMoviePosters(){
        const options = {
            method: 'Get',
            headers: {
                accept: 'application/json',
                Authorization: process.env.MOVIEDB_API_BEARER
            }
        }
        try{
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?include_image_language=en`, options)
            if (!response.ok){
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error){
            return null;
        }
    }

    const movieUrl = await fetchMovieUrl();
    const movieData = await fetchMovieData();
    const moviePosters = await fetchMoviePosters()

    const findPosterMobile = moviePosters.logos.find((item) => {
        if (item.height > 500){
            return item
        }
    })
    let posterMobSrc = null
    if (findPosterMobile){
        posterMobSrc = 'https://image.tmdb.org/t/p/original' + findPosterMobile.file_path
    }
    // movie poster https://image.tmdb.org/t/p/original/${backdrop_path}
    return (
        <div className="grow relative">
                {moviePosters && <img src={`https://image.tmdb.org/t/p/original${moviePosters?.backdrops[0]?.file_path}`} className="absolute top-0 bottom-0 left-0 right-0 hidden md:block"/>}
                {moviePosters && (
                    <div className="relative overflow-hidden h-full">
                        {posterMobSrc && <img src={posterMobSrc} className="absolute top-0 bottom-0 left-0 right-0 block md:hidden custom-mobile-img"/>}
                    </div>
                    )}
                <div className="absolute w-full h-[100%] left-0 bottom-0 right-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent rounded-b-lg"></div>
                <i className="fa-solid fa-arrow-left text-white text-3xl absolute top-4 left-4 cursor-pointer"></i>
                <div className="absolute top-[10%] left-0 right-0 pb-20">
                    <h1 className="text-6xl font-bold mb-4 text-center">
                        {movieData?.title}
                    </h1>
                    <div className="flex gap-4 text-white w-fit mx-auto font-bold text-lg">
                        <span>{movieData?.release_date}</span>
                        <span>⭐{movieData?.vote_average.toFixed(1)}</span>
                        <span>{movieData?.runtime} minutes</span>
                    </div>
                    <div className="flex justify-center items-center mt-4 gap-4">
                        {movieData.genres.map((item) => (
                            <span key={item?.id} className="bg-red-800 text-orange-200 font-bold  px-2 py-1 rounded-sm custom-shadow cursor-pointer">{item?.name}</span>
                        ))}
                    </div>
                    <div className="text-white p-4">
                        <span className="line-clamp-3 text-base/5 text-center w-[90%] mx-auto font-semibold">{movieData?.overview}</span>
                    </div>
                    {movieUrl ? (
                    <div>
                        <iframe 
                        src={movieUrl} 
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
