import React from 'react';
import MovieCardSkeleton from './MovieCardSkeleton';

export default function PageLoadingSkeleton() {
  return (
    <div className="p-4 md:p-0 md:pt-4 container mx-auto animate-pulse">
      <div className="text-white flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div className="h-10 bg-gray-700 rounded w-64 mb-4 md:mb-0"></div> {/* Adjusted height and width */}
      </div>
      <div className="w-full overflow-x-auto whitespace-nowrap py-2">
        <div className="flex flex-nowrap gap-4 px-4 md:px-0">
          {Array.from({ length: 7 }).map((_, i) => (
            // Adjusted height and width for category placeholders
            <div key={i} className="h-8 bg-gray-700 rounded-md w-28 flex-shrink-0"></div> 
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 18 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 mt-8 mb-20">
        <div className="h-10 bg-gray-700 rounded w-24"></div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-10 bg-gray-700 rounded w-10"></div>
        ))}
        <div className="h-10 bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  );
}