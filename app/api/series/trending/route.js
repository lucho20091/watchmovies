import { NextResponse } from "next/server"

export async function GET(request){
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIEDB_API_BEARER
      }
    }
    try{
        const response = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options);
        if (!response.ok) {
            NextResponse.json({message: 'network error'}, {status:400})
        }
        const data = await response.json();
        const first10Results = data.results.slice(0,8)
        return NextResponse.json(first10Results);
    } catch(e){
        console.log(e)
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
