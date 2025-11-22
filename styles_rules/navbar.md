# Navbar Styling Rules

This document outlines the specific Tailwind CSS classes and elements used in the `Navbar` component (`components/Navbar.jsx`).

## Tailwind Colors Used in Navbar

The Navbar primarily uses a dark background with red accents and various shades of gray for text and interactive elements.

-   **Background**: `bg-rich-mahogany-900`
-   **Brand Name (`MoviesFree`)**: `text-rich-mahogany-500` (hover: `text-rich-mahogany-600`)
-   **Active Navigation Link**: `bg-rich-mahogany-500`, `text-rich-mahogany-100`
-   **Inactive Navigation Link**: `text-gray-300` (hover: `bg-rich-mahogany-800`, `hover:text-rich-mahogany-100`)
-   **Search Input Background**: `bg-rich-mahogany-950`
-   **Search Input Text**: `text-rich-mahogany-100`
-   **Search Input Border**: `border-gray-700`
-   **Search Button Background**: `bg-rich-mahogany-950` (hover: `bg-rich-mahogany-800`)
-   **Search Button Icon/Text**: `text-gray-400`
-   **Border Bottom**: `border-gray-800`

## Key UI Elements and Their Styling in Navbar

### 1. Main Navigation Container

-   **Overall Styling**: `sticky top-0 left-0 right-0 z-50 bg-rich-mahogany-900 py-4 px-6 shadow-lg border-b border-gray-800`
-   **Inner Container**: `container mx-auto flex justify-between items-center`

### 2. Brand Name (`MoviesFree`)

-   **Element**: `Link` component
-   **Styling**: `flex gap-2 text-xl md:text-3xl font-bold text-rich-mahogany-500 hover:text-rich-mahogany-600 transition-colors`

### 3. Navigation Links (`Home`, `Movies`, `Series`)

-   **Element**: `Link` component
-   **Base Classes**: `px-1 md:px-3 py-1 rounded-md transition-colors duration-200 ease-in-out`
-   **Active State**: `bg-rich-mahogany-500 text-rich-mahogany-100 font-semibold shadow-md`
-   **Inactive State**: `text-gray-300 hover:bg-rich-mahogany-800 hover:text-rich-mahogany-100`
-   **Home Link Specific**: `hidden sm:inline` (hidden on small screens)

### 4. Search Input and Button

-   **Search Input Container (Form)**: `flex items-center w-full max-w-md gap-2 mr-0 ml-2`
-   **Search Input Field**:
    -   **Element**: `input`
    -   **Styling**: `flex-1 w-full p-2 rounded-md bg-rich-mahogany-950 text-rich-mahogany-100 border border-gray-700 focus:outline-none h-10`
-   **Search Submit Button**:
    -   **Element**: `button`
    -   **Styling**: `flex items-center justify-center h-10 min-w-[42px] bg-rich-mahogany-950 hover:bg-rich-mahogany-800 text-gray-400 rounded-md border border-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rich-mahogany-800`
    -   **Icon**: `FaSearch`

### 5. Search Toggle Button (Icon)

-   **Element**: `button`
-   **Styling**: `px-3 py-1 rounded-md transition-colors duration-200 ease-in-out text-gray-300 hover:bg-rich-mahogany-800 hover:text-rich-mahogany-100 cursor-pointer`
-   **Icon**: `FaSearch` (with `md:text-xl` for larger screens)
-   **Text**: `hidden md:inline` (for "Search" text next to icon on medium screens and up)