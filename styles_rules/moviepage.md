# Movie Details Page Color Palette

This document outlines the specific Tailwind CSS color classes used for each UI element within the `MoviePage` component (`app/movie/[id]/page.jsx`).

-   **Page Background**: Inherited from `RootLayout` (`bg-rich-mahogany-950`)
-   **Loading/Error/Not Found Page Background**: `bg-rich-mahogany-950`
-   **Loading/Error/Not Found Text**: `text-rich-mahogany-100`
-   **Loading/Error/Not Found Button**: `bg-rich-mahogany-500`, `hover:bg-rich-mahogany-600`, `text-rich-mahogany-100`
-   **Overlay Gradient**: `bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/50`
-   **Title**: `text-shadow`, `text-rich-mahogany-100`
-   **Info Text (Year, Rating, Runtime)**: `text-rich-mahogany-100`
-   **Genre Badges**: `bg-rich-mahogany-500`, `text-rich-mahogany-100`
-   **Overview Text**: `text-rich-mahogany-100`
-   **Server Selection Buttons**:
    -   Active Button: `bg-rich-mahogany-500`, `text-rich-mahogany-100`
    -   Inactive Button: `bg-rich-mahogany-800`, `hover:bg-rich-mahogany-700`, `text-rich-mahogany-100`
-   **Video Player Iframe**: `w-full aspect-video rounded-lg shadow-xl` (styling is mostly structural/layout)