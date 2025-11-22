# Movie Details Page Color Palette

This document outlines the specific Tailwind CSS color classes used for each UI element within the `MoviePage` component (`app/movie/[id]/page.jsx`).

-   **Page Background**: Inherited from `RootLayout` (`bg-rich-mahogany-950`)
-   **Loading/Error/Not Found Page Background**: `bg-rich-mahogany-950`
-   **Loading/Error/Not Found Text**: `text-rich-mahogany-100`
-   **Loading/Error/Not Found Button**: `bg-rich-mahogany-500`, `hover:bg-rich-mahogany-600`, `text-rich-mahogany-100`
-   **Overlay Gradient**: `bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/50`
-   **Title**: `text-shadow`, `text-white`
-   **Info Text (Year, Rating, Runtime)**: `text-white`
-   **Genre Badges**: `bg-red-600`, `text-white`
-   **Overview Text**: `text-white`
-   **Server Selection Buttons**:
    -   Active Button: `bg-red-600`, `text-white`
    -   Inactive Button: `bg-gray-700`, `hover:bg-gray-600`, `text-white`
-   **Video Player Iframe**: `w-full aspect-video rounded-lg shadow-xl` (styling is mostly structural/layout)