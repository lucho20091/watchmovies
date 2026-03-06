export async function generateMetadata({ params }) {
  const { id } = params;
  // Construct base URL for server-side fetch to internal API routes
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3000}`; // Dynamically use the port Next.js is running on
  const fetchUrl = `${baseUrl}/api/tv-details/${id}`;
  console.log(`[TV Metadata] Fetching: ${fetchUrl}`);

  try {
    const response = await fetch(fetchUrl);

    if (!response.ok) {
      console.error(`[TV Metadata] Failed to fetch TV series ${id}. Status: ${response.status}`);
      return {
        title: "TV Series Details - MoviesFree",
      };
    }

    const tvData = await response.json();
    console.log(`[TV Metadata] Fetched data for TV series ${id}:`, tvData.name);

    return {
      title: `${tvData.name} - MoviesFree`,
      description: tvData.overview,
    };
  } catch (error) {
    console.error(`[TV Metadata] Error generating metadata for TV series ${id}:`, error);
    return {
      title: "TV Series Details - MoviesFree",
    };
  }
}

export default function TvLayout({ children }) {
  return <>{children}</>;
}