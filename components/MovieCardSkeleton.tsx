import React from 'react';

export default function MovieCardSkeleton() {
  return (
    <div className="flex flex-col items-center relative group cursor-pointer rounded-lg overflow-hidden shadow-lg bg-neutral-950 animate-pulse">
      <div className="relative w-full aspect-[2/3] bg-gray-800">
        {/* Placeholder for image */}
      </div>
      <div className="w-full p-3 text-white">
        <div className="h-5 bg-gray-700 rounded w-3/4 mx-auto mb-1"></div> {/* Placeholder for title */}
        <div className="h-4 bg-gray-700 rounded w-1/3 mx-auto"></div> {/* Placeholder for rating */}
      </div>
    </div>
  );
}