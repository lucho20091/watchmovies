export async function generateMetadata({ params }) {
  const { id } = params;
  // Construct base URL for server-side fetch to internal API routes
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

  try {
    const response = await fetch(`${baseUrl}/api/tv-details/${id}`);

    if (!response.ok) {
      // If the TV series details API returns a non-OK status, return a generic title.
      // The page component will handle displaying "not found" or error messages.
      return {
        title: "TV Series Details - MoviesFree",
      };
    }

    const tvData = await response.json();

    return {
      title: `${tvData.name} - MoviesFree`,
      description: tvData.overview,
    };
  } catch (error) {
    console.error(`Error generating metadata for TV series ${id}:`, error);
    return {
      title: "TV Series Details - MoviesFree",
    };
  }
}

export default function TvLayout({ children }) {
  return <>{children}</>;
}