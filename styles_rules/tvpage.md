# TV Series Episode Page Color Palette

This document outlines the specific Tailwind CSS color classes used for each UI element within the `TvPageSeasonEpisode` component (`app/tv/[id]/[season]/[episode]/page.jsx`).

-   **Page Background**: Inherited from `RootLayout` (`bg-rich-mahogany-950`)
-   **Loading/Error/Not Found Page Background**: `bg-neutral-900`
-   **Loading/Error/Not Found Text**: `text-white`
-   **Loading/Error/Not Found Button**: `bg-red-600`, `hover:bg-red-700`, `text-white`
-   **Overlay Gradient**: `bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/50`
-   **Title**: `text-shadow`, `text-white`
-   **Info Text (Year, Rating, Status)**: `text-white`
-   **Genre Badges**: `bg-red-600`, `text-white`
-   **Overview Text**: `text-white`
-   **Server Selection Buttons**:
    -   Active Button: `bg-red-600`, `text-white`
    -   Inactive Button: `bg-gray-700`, `hover:bg-gray-600`, `text-white`
-   **Season Selector**: `bg-neutral-800`, `text-white`, `border-gray-700`, `focus:ring-red-500`
-   **Episode Buttons**:
    -   Active Button: `bg-red-600`, `text-white`
    -   Inactive Button: `bg-gray-700`, `text-white`, `hover:bg-gray-600`
-   **Episode Grid Background**: `bg-neutral-950`
-   **Episode Grid Border**: `md:border-2 md:border-gray-700`