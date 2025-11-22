# Movies Page Color Palette

This document outlines the specific Tailwind CSS color classes used for each UI element within the `MoviesPage` component (`app/movies/page.jsx`).

-   **Page Background**: Inherited from `RootLayout` (`bg-rich-mahogany-950`)
-   **Category Selector**: (Refer to `STYLE_GUIDE.md` for detailed CategorySelector colors, as it's a shared component)
    -   Active Category Button: `bg-red-600`, `text-white`
    -   Inactive Category Button: `bg-gray-700`, `text-white`, `hover:bg-gray-600`
-   **Movie Card**: (Refer to `styles_rules/moviecard.md` for detailed MovieCard colors, as it's a shared component)
-   **Loading Skeleton (Page and Card)**:
    -   Background for placeholders: `bg-gray-700`
    -   Background for card skeleton: `bg-neutral-950` (from `MovieCardSkeleton`)
-   **Pagination Buttons**:
    -   Active Page Button: `bg-red-600`, `text-white`
    -   Inactive Page Button: `bg-gray-700`, `text-white`, `hover:bg-gray-600`
    -   Disabled Buttons: `opacity-50`