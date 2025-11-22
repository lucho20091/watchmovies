import React from 'react';

export default function MovieCardSkeleton() {
  return (
    <div className="w-full relative rounded-lg overflow-hidden shadow-lg bg-neutral-950 animate-pulse">
      {/* This single div represents the entire card's loading state, matching the aspect ratio of a movie poster */}
      <div className="w-full aspect-[2/3] bg-gray-800"></div>
    </div>
  );
}