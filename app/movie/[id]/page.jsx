"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function MoviePage() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [currentEmbedUrl, setCurrentEmbedUrl] = useState(""); // URL for the iframe
  const [selectedServer, setSelectedServer] = useState(null); // Stores the currently selected server object
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define your video sources dynamically using the 'id'
  const videoServers = [
    {
      name: "Vidsrc",
      url: `https://vidsrc.me/embed/movie?tmdb=${id}&ds_lang=es&autoplay=1`,
      isEmbeddable: true,
    },
    {
      name: "Vidking",
      url: `https://www.vidking.net/embed/movie/${id}`, // This URL is likely not directly embeddable
      isEmbeddable: false,
    },
    {
      name: "111Movies",
      url: `https://111movies.com/movie/${id}`, // This URL is likely not directly embeddable
      isEmbeddable: false,
    },
  ];

  useEffect(() => {
    if (!id) return;

    async function fetchMovieAndSetInitialVideo() {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch movie details from your new API route
        const response = await fetch(`/api/movie-details/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setMovieData(null); // Explicitly set to null if not found
          }
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovieData(data);

        // Set the initial video URL to the first embeddable server in the list
        const firstEmbeddableServer = videoServers.find(s => s.isEmbeddable);
        if (firstEmbeddableServer) {
          setCurrentEmbedUrl(firstEmbeddableServer.url);
          setSelectedServer(firstEmbeddableServer);
        } else if (videoServers.length > 0) {
          // If no embeddable server, select the first one and show external link message
          setSelectedServer(videoServers[0]);
          setCurrentEmbedUrl(null); // No embed URL
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load movie details or video player.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieAndSetInitialVideo();
  }, [id]); // Re-run effect if 'id' changes

  const handleServerSelection = (server) => {
    setSelectedServer(server);
    if (server.isEmbeddable) {
      setCurrentEmbedUrl(server.url);
    } else {
      setCurrentEmbedUrl(null); // Clear embed URL if not embeddable
    }
  };

  // Conditional rendering for loading, error, or movie not found
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-4">
        <p className="text-xl">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-4">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg text-center mb-6">{error}</p>
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-lg transition-colors"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-4">
        <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
        <p className="text-lg text-center mb-6">
          The movie you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-lg transition-colors"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  // Main content rendering
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Images (using movieData from state) */}
      {movieData.backdrop_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
          alt={movieData.title || "Movie Backdrop"}
          fill
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover z-[-2] hidden md:block"
          priority
          quality={70}
        />
      )}
      {movieData.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
          alt={movieData.title || "Movie Poster"}
          fill
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover z-[-2] block md:hidden"
          priority
          quality={70}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center pt-4 md:pt-10 pb-20 text-white container mx-auto px-4">
        <h1 className="text-shadow text-4xl md:text-6xl font-bold mb-4 text-center">
          {movieData.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-white font-bold text-lg mb-4">
          {movieData.release_date && (
            <span>{movieData.release_date.substring(0, 4)}</span>
          )}
          {movieData.vote_average && (
            <span>⭐{movieData.vote_average.toFixed(1)}</span>
          )}
          {movieData.runtime && <span>{movieData.runtime} minutes</span>}
        </div>
        <div className="flex flex-wrap justify-center items-center mt-4 gap-2 mb-6">
          {movieData.genres?.map((item) => (
            <span
              key={item.id}
              className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium"
            >
              {item.name}
            </span>
          ))}
        </div>
        <p className="line-clamp-4 md:line-clamp-5 text-base md:text-lg text-center max-w-3xl mx-auto font-semibold mb-8">
          {movieData.overview}
        </p>

        {/* Server Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {videoServers.map((server, index) => (
            <button
              key={index}
              onClick={() => handleServerSelection(server)}
              className={`px-6 py-3 rounded-lg font-bold transition-colors cursor-pointer ${
                selectedServer?.name === server.name
                  ? "bg-red-600"
                  : "bg-gray-700 hover:bg-gray-600"
              } text-white`}
            >
              {server.name}
            </button>
          ))}
        </div>

        {/* Video Player Iframe or External Link Message */}
        <div className="w-full max-w-screen-xl mx-auto">
          {currentEmbedUrl ? (
            <iframe
              src={currentEmbedUrl}
              allow="fullscreen"
              allowFullScreen
              frameBorder="0"
              className="w-full aspect-video rounded-lg shadow-xl"
            ></iframe>
          ) : selectedServer && !selectedServer.isEmbeddable ? (
            <div className="bg-neutral-800 p-6 rounded-lg text-center shadow-xl">
              <p className="text-lg mb-4">
                The selected server ({selectedServer.name}) cannot be embedded
                directly.
              </p>
              <a
                href={selectedServer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-lg transition-colors"
              >
                Open {selectedServer.name} in a new tab
              </a>
            </div>
          ) : (
            <p className="text-lg text-center mt-8">
              Select a server to start watching.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}