export async function generateMetadata({ params }) {
  const { id } = params;
  // Construct base URL for server-side fetch to internal API routes
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const fetchUrl = `${baseUrl}/api/movie-details/${id}`;
  console.log(`[Movie Metadata] Fetching: ${fetchUrl}`);

  try {
    const response = await fetch(fetchUrl);

    if (!response.ok) {
      console.error(`[Movie Metadata] Failed to fetch movie ${id}. Status: ${response.status}`);
      return {
        title: "Movie Details - MoviesFree",
      };
    }

    const movieData = await response.json();
    console.log(`[Movie Metadata] Fetched data for movie ${id}:`, movieData.title);

    return {
      title: `${movieData.title} - MoviesFree`,
      description: movieData.overview,
    };
  } catch (error) {
    console.error(`[Movie Metadata] Error generating metadata for movie ${id}:`, error);
    return {
      title: "Movie Details - MoviesFree",
    };
  }
}

export default function MovieLayout({ children }) {
  return <>{children}</>;
}