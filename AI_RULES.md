# AI Rules for MoviesFree Application

This document outlines the technical stack and specific guidelines for developing features within the MoviesFree application.

## Tech Stack Description

*   **Framework**: Next.js is used as the full-stack React framework for building the application, leveraging its App Router for routing and server-side capabilities.
*   **Language**: The project currently uses JavaScript (`.js`/`.jsx`) but new components and features should be developed using TypeScript (`.ts`/`.tsx`) for improved type safety and maintainability.
*   **Styling**: Tailwind CSS is the exclusive utility-first CSS framework for all styling, ensuring a consistent and responsive design.
*   **UI Components**: Shadcn UI components are available and should be utilized for pre-built UI elements.
*   **Icons**: The `react-icons` library is used for incorporating scalable vector icons throughout the application.
*   **Routing**: Next.js App Router handles all client-side and server-side navigation.
*   **State Management**: React's built-in hooks (`useState`, `useEffect`, `useRef`, `useContext`) are preferred for managing component and local state.
*   **API Calls**: Native `fetch` API is used for all data fetching operations, both on the client and server.
*   **Environment Variables**: `dotenv` is used for managing environment variables, accessed via `process.env`.
*   **Fonts**: Next.js `next/font` is used for optimized font loading, specifically with Geist and Geist_Mono.

## Library Usage Rules

*   **Next.js**:
    *   All pages and API routes must reside within the `app/` directory.
    *   Use Next.js's built-in image optimization (`next/image`) when dealing with images for performance.
    *   Utilize `next/link` for all internal navigation.
*   **TypeScript**:
    *   All new components, hooks, and utility files should be written in TypeScript (`.tsx` or `.ts`).
    *   Existing JavaScript files (`.jsx` or `.js`) can remain as is, but consider converting them to TypeScript if significant changes are required.
*   **Tailwind CSS**:
    *   Apply styling exclusively through Tailwind CSS classes. Avoid inline styles or custom CSS files unless absolutely necessary for specific, complex scenarios not covered by Tailwind.
    *   Ensure all designs are responsive across different screen sizes.
*   **Shadcn UI**:
    *   Prioritize using components from the Shadcn UI library for common UI patterns (e.g., buttons, cards, forms).
    *   Do NOT modify Shadcn UI component files directly. If a component needs customization beyond its props, create a new component that wraps or extends the Shadcn UI component, or build a custom component from scratch using Tailwind CSS.
*   **React Icons**:
    *   Use icons from `react-icons` for all icon needs. Import specific icons as needed (e.g., `FaHome` from `react-icons/fa`).
*   **File Structure**:
    *   Components should be placed in the `components/` directory.
    *   Pages should be placed in the `app/` directory (e.g., `app/page.tsx`, `app/browse/page.tsx`).
    *   Utility functions should be placed in a `utils/` directory if they become necessary.
*   **General Development**:
    *   Keep components small, focused, and reusable.
    *   Implement features completely; avoid partial implementations or `TODO` comments for missing functionality.
    *   Do not overengineer solutions; aim for simplicity and elegance.
    *   Use toast notifications (e.g., `react-toastify` which is already installed) to inform users about important events.
    *   Avoid `try/catch` blocks for error handling unless specifically requested, to allow errors to bubble up for easier debugging.