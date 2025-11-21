import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//     const { name } = await params;
//     try{
//         const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMBD_API_KEY}&s=${name}`);  
//         const data = await response.json();
//         return NextResponse.json(data);
//     } catch (error) {
//         return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
//     }
// }

export async function GET(request, { params }) {
    const { name } = await params;
    const options = {
        method: 'Get',
        headers: {
            accept: 'application/json',
            Authorization: process.env.MOVIEDB_API_BEARER
        }
    }
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${name}&language=en-US&page=1`, options)
        // console.log(response); // Removed console.log
        if (!response.ok) {
            return NextResponse.json({ error: "Network response was not ok" }, { status: 500 });
        }
        const data = await response.json();
        return NextResponse.json(data.results);
    } catch (error) {
        console.error(error); // Changed to console.error for actual errors
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}