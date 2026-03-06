export async function generateMetadata({ params }) {
  const { id } = params;
  // Construct base URL for server-side fetch to internal API routes
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

  try {
    const response = await fetch(`${baseUrl}/api/movie-details/${id}`);

    if (!response.ok) {
      // If the movie details API returns a non-OK status, return a generic title.
      // The page component will handle displaying "not found" or error messages.
      return {
        title: "Movie Details - MoviesFree",
      };
    }

    const movieData = await response.json();

    return {
      title: `${movieData.title} - MoviesFree`,
      description: movieData.overview,
    };
  } catch (error) {
    console.error(`Error generating metadata for movie ${id}:`, error);
    return {
      title: "Movie Details - MoviesFree",
    };
  }
}

export default function MovieLayout({ children }) {
  return <>{children}</>;
}