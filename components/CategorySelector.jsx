"use client";

import React from 'react';

export default function CategorySelector({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="w-full overflow-x-auto whitespace-nowrap py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-neutral-900">
      <div className="flex justify-between space-x-4 px-4 md:px-0">
        {categories.map((category) => (
          <button
            key={category.value}
            className={`relative pb-2 text-lg font-semibold transition-colors duration-200 ease-in-out flex-shrink-0
              ${activeCategory === category.value ? 'text-red-500' : 'text-white hover:text-red-300'}`}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.name}
            {activeCategory === category.value && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}