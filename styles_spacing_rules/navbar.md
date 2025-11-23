# Navbar Spacing Rules

This document outlines the specific Tailwind CSS spacing classes used for each UI element within the `Navbar` component (`components/Navbar.jsx`).

-   **Main Navigation Container (`<nav>`):**
    -   `py-4`: Vertical padding
    -   `px-4`: Horizontal padding
    -   `2xl:px-6`: Horizontal padding at 2xl breakpoint
-   **Brand Name (`MoviesFree` Link):**
    -   `gap-2`: Gap between flex items (if multiple)
-   **Navigation Links & Search Container (`<div>`):**
    -   `space-x-1`: Horizontal space between direct children
    -   `md:space-x-4`: Horizontal space between direct children at md breakpoint
-   **Individual Navigation Link (e.g., Home, Movies, Series):**
    -   `px-1`: Horizontal padding
    -   `md:px-3`: Horizontal padding at md breakpoint
    -   `py-1`: Vertical padding
-   **Search Input Field (`<input>`):**
    -   `p-2`: All-around padding
    -   `h-10`: Fixed height
-   **Search Submit Button (`<button type="submit">`):**
    -   `h-10`: Fixed height
    -   `min-w-[42px]`: Minimum width
-   **Search Form (`<form>`):**
    -   `gap-2`: Gap between flex items
    -   `ml-2`: Left margin
    -   `mr-0`: Right margin
-   **Search Toggle Button (Icon) (`<button id="search-toggle-button">`):**
    -   `px-3`: Horizontal padding
    -   `py-1`: Vertical padding
    -   Inner div: `gap-2`
    -   Inner div: `md:px-3`