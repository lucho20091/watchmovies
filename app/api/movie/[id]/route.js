import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = await params;
    try{
        const response = await fetch(`https://vidsrc.xyz/embed/movie/${id}`);
        console.log(response.url);
        // const data = await response.json();
        return NextResponse.json(response.url);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
