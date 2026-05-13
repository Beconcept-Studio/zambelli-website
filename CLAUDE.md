# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Zambelli Portfolio Website** is a luxury portfolio/studio website for Alessandro Zambelli, built with Nuxt 4 and featuring sophisticated scroll-based and interactive animations powered by GSAP. The site integrates with a Strapi CMS backend for blog content and features a highly polished visual experience with custom animations and state management.

**Tech Stack:**
- **Framework:** Nuxt 4 (Vue 3)
- **Styling:** Tailwind CSS + SCSS
- **Animations:** GSAP (ScrollTrigger, SplitText, Observer plugins)
- **Scroll Control:** Locomotive Scroll
- **CMS:** Strapi (articles/blog posts)
- **Build Tool:** Vite
- **Language:** TypeScript

## Key Commands

### Development
- `npm run dev` — Start development server on http://localhost:3000
- `npm run build` — Build for production (SSR + pre-rendering)
- `npm run generate` — Generate static site with SSG (prerender routes)
- `npm run preview` — Preview production build locally

### Project Setup
- `npm install` — Install dependencies
- `npm run postinstall` — Auto-runs after install to prepare Nuxt

## Architecture & Code Organization

### Directory Structure

```
app/
├── pages/                    # Nuxt page routes (file-based routing)
│   ├── index.vue            # Home page — gallery with scroll animations
│   ├── blog.vue             # Blog index with PostListFull component
│   ├── contacts.vue         # Contact form page
│   ├── studio.vue           # Studio info page
│   ├── news.vue             # News stub page
│   ├── works/
│   │   ├── index.vue        # Works archive/gallery
│   │   └── [slug].vue       # Single work/project page
│   └── articles/
│       └── [slug].vue       # Single blog article page (from Strapi)
├── components/              # Reusable Vue components
│   ├── AppHeader.vue        # Header with navigation
│   ├── AppNav.vue           # Dynamic navigation with animated selector
│   ├── AppLogo.vue          # Logo component
│   ├── AppLoaderHome.vue    # Intro animation for home page
│   ├── AppLoaderDefault.vue # Intro animation for other pages
│   ├── PostList.vue         # Blog post card grid
│   ├── PostListFull.vue     # Full blog post list with Strapi fetch
│   └── AppFooter.vue        # Footer
├── composables/             # Reusable Vue 3 composition functions
│   ├── useAppState.ts       # Global app state (isFirstLoad flag)
│   ├── useIntroOverlay.ts   # Singleton ref for intro animation overlay
│   ├── useIntroAnimation.ts # Intro animation logic (blur+mask reveal)
│   ├── useHomeAnimation.ts  # Gallery scroll animation (image tiles)
│   ├── useWorksAnimation.ts # Drag/scroll animation for works page
│   ├── useGsapCommon.ts     # Common fade-in animation with ScrollTrigger
│   ├── useWorkTransitionState.ts  # Work transition state
│   └── slugify.ts           # Slug generation utility
├── layouts/
│   └── default.vue          # Main layout (AppLogo, AppHeader, NuxtPage)
├── plugins/
│   └── gsap.client.ts       # GSAP plugin registration (client-side only)
├── assets/
│   ├── scss/
│   │   └── main.scss        # Global SCSS with spacing utilities, typography
│   └── svg/                 # SVG components (home-icon.svg, etc.)
├── app.vue                  # Root component with conditional loaders
└── error.vue                # Error page fallback
```

## Core Patterns

### 1. Page Loaders & Intro Animations

- **Pattern:** First-load detection using `useAppState()` global state
- **Flow:** App.vue checks `isFirstLoad` and conditionally renders `AppLoaderHome` or `AppLoaderDefault`
- **Mechanics:**
  - Intro overlay is created as a component (AppLoaderHome/Default)
  - `useIntroOverlay()` provides a singleton ref (`overlayRef`) shared across the app
  - `useIntroAnimation()` composes animations (blur reveal, mask clip-path, fade out)
  - After animation completes, `markLoaded()` is called, footer/header fade in
- **Key Files:** app.vue, composables/useIntroAnimation.ts, composables/useAppState.ts, components/AppLoaderHome.vue

### 2. Scroll-Based Animations

- **Gallery Animation (Home):** `useHomeAnimation()`
  - Listens to wheel/touch events, accumulates delta
  - Triggers image clone insertion at threshold (default 400px scroll)
  - Random size and position, GSAP timeline for scale/ease
  - Max 12 images in DOM at once, old ones fade out

- **Common Fade Animation:** `useGsapCommon()`
  - Applies `.gsap-fade` class to elements
  - ScrollTrigger fires when element enters 75% of viewport
  - Fade + blur + Y-translation on demand

- **Works Page Drag:** `useWorksAnimation()`
  - Uses GSAP Observer for wheel/touch/pointer events
  - Tracks drag distance (6px threshold to distinguish click vs drag)
  - Wraps content position with gsap.utils.wrap() for infinite loop
  - Exposes `isDragging` flag to prevent clicks during drag

### 3. Data Fetching from Strapi

- **Pattern:** Server-side `useFetch()` with Strapi filters and populate
- **API Config:**
  - Base URL: `process.env.STRAPI_URL` (default: http://localhost:1338/api)
  - Auth: Bearer token header from `process.env.STRAPI_TOKEN`
  - Environment: `.env` file (Strapi token and URL)

- **Example:** PostListFull.vue fetches articles with `publishedAt` filter, sorts by date descending, populates all relations/media
- **Strapi Versions:** Code handles both v4 (`.attributes` nesting) and v5 (flat) via: `const item = raw.attributes ?? raw`

### 4. Navigation with Dynamic Selector

- **Component:** AppNav.vue
- **Pattern:** Two overlays (hover + active) that animate to match link width/position
- **Logic:**
  - `getActiveLink()` matches route exactly, then partial (for nested routes)
  - `moveSelectorHover()` / `moveSelectorActive()` calculate element rects and update inline styles
  - Watch on `route.path` updates active selector via requestAnimationFrame
  - SVG home icon for root link, text labels for others

### 5. Global Styles & Spacing System

- **Tailwind + SCSS:** main.scss extends Tailwind with utility classes
- **Container Utilities:**
  - `.div--container` — full-width with max-width 1800px, responsive padding
  - `.div--container-small` — max 1080px
  - `.div--container-proj` — max 1180px for projects

- **Spacing Classes:**
  - `.space-top`, `.space-bottom` — 110px (xl), 12px (md) vertical spacing
  - `.verticalspace`, `.verticalspace-small` — section spacing (applied to siblings)
  - `.space-top-double`, `.space-bottom-double` — 180px/80px

- **Typography Scale:** `.h1` to `.h6` with Helvetica Now font, responsive sizes
- **Custom Color:** `.text-glassgray` (#A5A5A5)

## Configuration Files

### nuxt.config.ts
- **SSR:** Enabled (ssr: true)
- **Prerendering:** Configured via `nitro.prerender`
  - Static routes: `['/', '/blog', '/single-post']`
  - Dynamic routes fetched from Strapi via `fetchStrapiRoutes()` hook
  - Articles slug pattern: `/articles/{slug}`

- **Modules:**
  - `@nuxtjs/tailwindcss` — Tailwind integration
  - `@nuxtjs/google-fonts` — Google Fonts (Roboto)
  - `nuxt-locomotive-scroll` — Smooth scroll library
  - `nuxt-swiper` — Carousel component

- **Vite Optimizations:**
  - GSAP plugins pre-bundled (ScrollTrigger, SplitText, etc.)
  - SVG loader for inline SVG imports
  - SCSS preprocessor

### tailwind.config.js
- **Content paths:** `./app/**/*.{vue,js,ts}`
- **Custom Fonts:** Roboto (Google), Helvetica Now (custom font files)
- **Custom Colors:** `glassgray: '#A5A5A5'`

### tsconfig.json
- **References:** Multi-project setup with `.nuxt/tsconfig.*` files (auto-generated)

## Environment Variables

**.env file:**
- `STRAPI_URL` — Strapi backend URL (used in nuxt.config.ts and public config)
- `STRAPI_TOKEN` — Bearer token for authenticated Strapi requests (server-side only)

## Page & Component Notes

### Home Page (pages/index.vue)
- Uses `useGalleryAnimation()` with root selector `.zambelli-gallery-home`
- Displays static intro text ("Dove la materia incontra l'anima") and hidden images
- Images animated in/out dynamically on scroll via composable

### Blog (pages/blog.vue & components/PostListFull.vue)
- PostListFull.vue fetches articles from Strapi with live published filter
- Handles image cover URLs for both Strapi v4 (nested `.data.attributes`) and v5 (flat)
- Grid layout: 4 cols on lg, 12 on mobile

### Works (pages/works/index.vue)
- Uses `useWorksAnimation()` for drag/scroll interaction
- Contains `.container > .content` structure for scrollable gallery
- Observer-based drag detection (6px threshold)

### Single Article (pages/articles/[slug].vue)
- Dynamic route with slug parameter
- Fetches article from Strapi with filters and populate
- Displays title and multi-section layout

## Common Workflows

### Adding a New Page with Custom Animation
1. Create `.vue` file in `pages/` (auto-routed)
2. Create a composable in `composables/use*Animation.ts` with `useGsapCommon()` or custom GSAP timeline
3. Import composable in page's `<script setup>`
4. Use `onMounted()`/`onUnmounted()` for setup/cleanup
5. Add SCSS utilities to `assets/scss/main.scss` if needed

### Fetching Data from Strapi
1. Use `useFetch()` in `<script setup>` (server-side fetch via Nuxt)
2. Build query with filters, populate, sort params
3. Handle both Strapi v4 and v5 nesting: `const item = raw.attributes ?? raw`
4. Pass `key` option for unique caching

### Updating Global State
- Use `useAppState()` composable for app-wide flags (e.g., `isFirstLoad`)
- Returns reactive refs and computed properties
- Singleton pattern (not inject-based)

## Performance Considerations

- **Prerendering:** Blog and works pages are statically prerendered at build time
- **GSAP Cleanup:** Always call `gsap.killTweensOf()` or `ScrollTrigger.getAll().forEach(st => st.kill())` in `onUnmounted()`
- **Image Optimization:** Gallery images preloaded in `useHomeAnimation()` before animation
- **Animations:** Request-framed updates to avoid layout thrashing
- **Font Loading:** HelveticaNow via `@font-face` with `.woff2` first (modern browsers)

## Debugging Tips

- **Intro Animation Not Playing:** Check `useAppState()` → `isFirstLoad` flag and that overlay ref is set
- **Strapi Fetch Failing:** Verify `STRAPI_URL` and `STRAPI_TOKEN` in `.env`; check Strapi v4 vs v5 nesting in fallback logic
- **GSAP Animations Jumpy:** Ensure `onUnmounted()` cleanup runs; check for conflicting animations or missing `ease` configs
- **Route Selector Not Updating:** Verify route watcher fires and `getActiveLink()` finds the correct element via `[data-to]` attributes
