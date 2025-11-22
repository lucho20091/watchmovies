"use client";

import React from "react";

export default function CategorySelector({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="w-full overflow-x-auto whitespace-nowrap py-2 mb-4">
      <div className="flex justify-between space-x-4 px-4 md:px-0">
        {categories.map((category) => (
          <button
            key={category.value}
            className={`relative pb-2 cursor-pointer text-lg font-semibold transition-colors duration-200 ease-in-out flex-shrink-0
              ${
                activeCategory === category.value
                  ? "text-rich-mahogany-500"
                  : "text-rich-mahogany-100 hover:text-rich-mahogany-300"
              }`}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.name}
            {activeCategory === category.value && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rich-mahogany-500"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}