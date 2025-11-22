# Movies Page Color Palette

This document outlines the specific Tailwind CSS color classes used for each UI element within the `MoviesPage` component (`app/movies/page.jsx`).

-   **Page Background**: Inherited from `RootLayout` (`bg-rich-mahogany-950`)
-   **Category Selector**:
    -   Active Category Text: `text-rich-mahogany-500`
    -   Inactive Category Text: `text-rich-mahogany-100`
    -   Inactive Category Hover Text: `hover:text-rich-mahogany-300`
    -   Active Category Underline: `bg-rich-mahogany-500`
-   **Movie Card**: (Refer to `styles_rules/moviecard.md` for detailed MovieCard colors, as it's a shared component)
-   **Loading Skeleton (Page and Card)**:
    -   Background for placeholders: `bg-gray-700`
    -   Background for card skeleton: `bg-neutral-950` (from `MovieCardSkeleton`)
-   **Pagination Buttons**:
    -   Active Page Button: `bg-rich-mahogany-500`, `text-rich-mahogany-100`
    -   Inactive Page Button: `bg-rich-mahogany-700`, `text-rich-mahogany-100`, `hover:bg-rich-mahogany-800`
    -   Disabled Buttons: `opacity-50`