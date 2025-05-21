export default async function MoviePage({ params }) {  
    const { id } = await params;
    async function fetchMovieUrl(){
        try{
            const response = await fetch(`https://vidsrc.xyz/embed/movie?tmdb=${id}`);
            console.log(response);
            return response.url;
        } catch (error){
            console.log(error);
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
            // console.log(response);
            if (!response.ok){
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error){
            console.log(error);
            return null;
        }
    }

    const movieUrl = await fetchMovieUrl();
    const movieData = await fetchMovieData();
    console.log(movieData);
    // console.log(movieUrl);
    // console.log(id);
    return (
        <div className="grow p-4">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">{movieData.title}</h1>
                <p className="mb-4">Overview: {movieData.overview}</p>
                {movieUrl ? (
                    <iframe 
                        src={movieUrl} 
                        allow="fullscreen" 
                        allowFullScreen
                        className="w-[90%] max-w-screen-xl mx-auto aspect-video"
        
                    ></iframe>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}