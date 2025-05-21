export default async function TvPage({ params }) {  
    const { id } = await params;
    async function fetchTvUrl(){
        try{
            const response = await fetch(`https://vidsrc.xyz/embed/tv?tmdb=${id}`);
            return response.url;
        } catch (error){
            return null;
        }
    }
    async function fetchTvData(){
        const options = {
            method: 'Get',
            headers: {
                accept: 'application/json',
                Authorization: process.env.MOVIEDB_API_BEARER
            }
        }
        try{
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
            if (!response.ok){
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error){
            return null;
        }
    }
    const tvUrl = await fetchTvUrl();
    const tvData = await fetchTvData();
    return (
         <div className="grow p-4">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">{tvData.name}</h1>
                <p className="mb-4">Overview: {tvData.overview}</p>
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
            </div>
        </div>
    );
}