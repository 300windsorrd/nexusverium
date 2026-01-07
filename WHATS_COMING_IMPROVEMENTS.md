# What's Coming Feature - Improvement Plan

This document outlines suggested improvements for the "What's Coming" (Roadmap) feature in the Nexus Verium web application.

## 1. Data Management & Backend
*   **CMS Integration**: Move the `comingItems` array from `src/app/page.tsx` to a Headless CMS (e.g., Sanity, Contentful, or Strapi). This allows non-technical team members to update the roadmap without code changes.
*   **Database**: Alternatively, store items in a database (PostgreSQL/Supabase) if user interaction (voting/comments) is planned.

## 2. Functional Enhancements
*   **Status Indicators**: Add explicit status tags to each item (e.g., "Concept", "In Development", "Prototype", "Testing").
*   **Categories & Filtering**: Categorize items (e.g., "AI", "Robotics", "Ecology") and add a filter bar to allow users to find relevant roadmap items easily.
*   **Progress Tracking**: Show a progress bar or percentage completion for active projects to build anticipation.
*   **Notify Me**: Add a "Subscribe for Updates" button on specific items so users receive an email when that feature is released.
*   **Voting System**: (Optional) Allow the community to upvote features they are most excited about to help prioritize development.

## 3. UI/UX Improvements
*   **Dedicated Roadmap Page**: While the current grid on the homepage is good for a summary, a dedicated `/roadmap` or `/whats-coming` page can provide a more detailed view, possibly using a Timeline layout (Gantt chart style or vertical timeline).
*   **Enhanced Cards**:
    *   Add thumbnail images for each "What's Coming" item.
    *   Use tooltips or expanders to show more details without leaving the page.
*   **Animations**: improving entrance animations or hover states to make the grid feel more alive.

## 4. SEO & Accessibility
*   **Schema Markup**: Implement `ItemList` schema to help search engines understand this is a list of upcoming products/features.
*   **Accessible Navigation**: Ensure full keyboard navigation support for the grid and filters.

## 5. Content Strategy
*   **Deep Links**: Ensure the `/research/[slug]` pages referenced in the links are fully populated with rich content, technical specifications, and dev logs.
*   **Dev Logs**: Associate blog posts or dev logs with each roadmap item to tell the story of its development.
