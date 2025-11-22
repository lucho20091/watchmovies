# MoviesFree Style Guide

This document provides an overview of the key UI elements and the Tailwind CSS color palette used throughout the MoviesFree application.

## Tailwind Colors Used

The application primarily uses a dark theme with red accents for interactive elements and highlights.

-   **Primary Accent**: `red-600` (e.g., `bg-red-600`, `text-red-500` for active states)
-   **Text Colors**:
    -   `text-white` (main text, headings)
    -   `text-gray-300` (inactive navigation links)
    -   `text-gray-400` (footer text, placeholder text)
    -   `text-yellow-400` (star ratings)
-   **Background Colors**:
    -   `bg-neutral-900` (main background, Navbar)
    -   `bg-neutral-950` (MovieCard background, episode selector background)
    -   `bg-gray-700` (inactive buttons, skeleton loaders)
    -   `bg-gray-800` (search input, skeleton placeholders)
    -   `bg-black/70` (language badge)
    -   `bg-black/80` (MovieCard hover overlay)
-   **Border Colors**: `border-gray-700` (inputs, select elements)

## Key UI Elements and Their Styling

### 1. Navigation Bar (`Navbar.jsx`)

-   **Background**: `bg-neutral-900`
-   **Brand Name**: `text-primary-500` (which resolves to `red-500` from `globals.css` theme)
-   **Active Link**: `bg-red-600`, `text-white`, `font-semibold`, `shadow-md`
-   **Inactive Link**: `text-gray-300`, `hover:bg-gray-700`, `hover:text-white`
-   **Search Input**: `bg-neutral-800`, `text-white`, `border border-gray-700`
-   **Search Button**: `bg-neutral-800`, `hover:bg-neutral-600`, `text-gray-400`, `border border-gray-700`

### 2. Movie/Series Card (`MovieCard.jsx`)

-   **Background**: `bg-neutral-950`
-   **Title**: `text-lg font-bold text-white` (always visible)
-   **Hover Overlay**: `bg-black/80`, `opacity-0 group-hover:opacity-100`
-   **Hover Title**: `text-xl font-bold text-white`
-   **Overview**: `text-white text-sm`
-   **Rating**: `text-yellow-400` with `FaStar` icon
-   **Language Badge**: `bg-black/70`, `text-white`, `text-xs`
-   **Adult Badge**: `bg-red-600`, `text-white`, `text-xs`
-   **No Poster Available**: `bg-gray-800`, `text-gray-400`

### 3. Category Selector (`CategorySelector.jsx`)

-   **Active Category**: `text-red-500`, with a `bg-red-500` underline
-   **Inactive Category**: `text-white`, `hover:text-red-300`

### 4. Buttons (General)

-   **Primary Action (e.g., "Watch Now", "View More", Active Pagination)**: `bg-red-600`, `hover:bg-red-700`, `text-white`, `font-bold`, `rounded-lg`
-   **Secondary Action (e.g., Server Selection, Inactive Pagination)**: `bg-gray-700`, `hover:bg-gray-600`, `text-white`, `font-bold`, `rounded-lg`
-   **Disabled Buttons**: `opacity-50`, `cursor-not-allowed`

### 5. Loading Skeletons (`MovieCardSkeleton.jsx`, `PageLoadingSkeleton.jsx`)

-   **Background**: `bg-neutral-950` (for cards)
-   **Placeholder Elements**: `bg-gray-700`, `rounded`, `animate-pulse`

### 6. Hero Section (Homepage)

-   **Background Image**: Full-width `Image` component with `object-cover`
-   **Overlay**: `bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent`
-   **Title**: `text-4xl md:text-6xl font-bold text-shadow` (`text-shadow` defined in `globals.css`)
-   **Overview**: `text-lg md:text-xl`
-   **Rating/Year**: `text-lg md:text-xl font-semibold`

### 7. Video Player Pages (`app/movie/[id]/page.jsx`, `app/tv/[id]/[season]/[episode]/page.jsx`)

-   **Background Image**: Full-width `Image` component with `object-cover`
-   **Overlay**: `bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/50`
-   **Title**: `text-shadow text-4xl md:text-6xl font-bold`
-   **Genre Badges**: `bg-red-600`, `text-white`, `px-3 py-1 rounded-full text-sm font-medium`
-   **Server Selection Buttons**: Same as general buttons (primary/secondary)
-   **Season/Episode Selector**: `bg-neutral-800`, `px-2 py-1 rounded-md`, `border-gray-700 border-2`, `text-white`, `focus:ring-red-500`
-   **Episode Buttons**: Same as general buttons (primary/secondary)
-   **Iframe**: `w-full aspect-video rounded-lg shadow-xl`

### 8. Footer (`Footer.jsx`)

-   **Background**: `bg-gray-900`
-   **Brand Name**: `text-2xl font-bold text-red-500`
-   **Text**: `text-gray-400`
-   **Links**: `text-gray-400 hover:text-white`

---

This guide should help in maintaining a consistent look and feel across the application.