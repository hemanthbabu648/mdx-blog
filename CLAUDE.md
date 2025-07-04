# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.3.4 MDX blog project using the App Router architecture with TypeScript, Tailwind CSS v4, and MDX support. The blog features both regular blog posts and a news section, with SEO optimization including sitemap and robots.txt generation.

## Common Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check without emitting files
```

## Architecture

### Core Stack
- **Next.js 15.3.4** with App Router (`/src/app`)
- **React 19.0.0**
- **TypeScript** with strict mode
- **Tailwind CSS v4** with PostCSS
- **MDX** via `@next/mdx`, `@mdx-js/loader`, and `@mdx-js/react`

### Key Dependencies
- `gray-matter` - Parse frontmatter from MDX files
- `date-fns` - Date formatting
- `remark` & `remark-html` - Markdown processing

### Project Structure
```
src/
├── app/                  # App Router pages and layouts
│   ├── about/           # About page
│   │   └── page.tsx
│   ├── blog/            # Blog section
│   │   ├── [slug]/      # Dynamic blog post pages
│   │   │   └── page.tsx
│   │   └── page.tsx     # Blog listing page
│   ├── contact/         # Contact page
│   │   └── page.tsx
│   ├── news/            # News section
│   │   ├── [slug]/      # Dynamic news article pages
│   │   │   └── page.tsx
│   │   └── page.tsx     # News listing page
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── robots.ts        # Robots.txt generation
│   └── sitemap.ts       # Sitemap generation
├── components/          # React components
│   ├── BlogCard.tsx     # Blog post card component
│   ├── BlogPageClient.tsx # Client-side blog page logic
│   ├── Footer.tsx       # Site footer
│   ├── Header.tsx       # Site header with navigation
│   ├── PopularPostsCarousel.tsx # Popular posts carousel
│   ├── ShareButton.tsx  # Social sharing buttons
│   └── StructuredData.tsx # SEO structured data
├── content/             # MDX content files
│   ├── news/           # News articles
│   │   ├── nextjs-15-release.mdx
│   │   ├── react-19-beta.mdx
│   │   └── typescript-5-4.mdx
│   └── posts/          # Blog posts
│       ├── building-scalable-apis.mdx
│       ├── getting-started-with-nextjs.mdx
│       ├── mastering-mdx-blogs.mdx
│       └── typescript-5-4.mdx
└── lib/                # Utility functions
    ├── mdx.ts          # MDX processing utilities
    └── news.ts         # News-specific utilities
```

### Configuration Files
- `next.config.ts` - Next.js config (currently empty, needs MDX setup)
- `tsconfig.json` - TypeScript config with `@/*` alias for `src/*`
- `tailwind.config.ts` - Tailwind v4 configuration
- `eslint.config.mjs` - ESLint v9 flat config

## MDX Blog Implementation Notes

### MDX Configuration
The `next.config.ts` is already configured with MDX support:
```typescript
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

### Current Blog Structure
- `/src/content/posts/` - MDX blog post files
- `/src/content/news/` - MDX news article files
- `/src/app/blog/page.tsx` - Blog listing page
- `/src/app/blog/[slug]/page.tsx` - Individual blog post pages
- `/src/app/news/page.tsx` - News listing page
- `/src/app/news/[slug]/page.tsx` - Individual news article pages

### Components
- `BlogCard` - Reusable card component for displaying blog posts
- `BlogPageClient` - Client-side functionality for blog pages
- `Footer` - Site footer with links and information
- `Header` - Navigation header with menu items
- `PopularPostsCarousel` - Carousel for featured/popular posts
- `ShareButton` - Social media sharing functionality
- `StructuredData` - SEO structured data implementation

### Working with MDX Files
- Use `gray-matter` to parse frontmatter
- Use `date-fns` for date formatting
- MDX files can import and use React components directly

## Development Guidelines

### Path Imports
Always use the `@/` alias for imports from the `src` directory:
```typescript
import { Component } from '@/components/Component'
```

### Styling
- Use Tailwind CSS v4 classes
- Global styles in `src/app/globals.css`
- Custom fonts: Geist Sans and Geist Mono are configured
- Components use Tailwind CSS classes for styling
- Responsive design is implemented throughout

### TypeScript
- Strict mode is enabled
- Always provide proper types
- Run type checking with `npx tsc --noEmit`

### Next.js App Router
- All pages go in `src/app/`
- Use `page.tsx` for route pages
- Use `layout.tsx` for layouts
- Server Components by default, use `'use client'` directive when needed
- Dynamic routes use `[slug]` folders for parameterized URLs
- SEO files (`robots.ts`, `sitemap.ts`) are in the app directory

### Content Management
- Blog posts and news articles use MDX format
- Frontmatter is parsed using `gray-matter`
- Content processing utilities are in `/src/lib/`
- Date formatting uses `date-fns`

### SEO Features
- Automatic sitemap generation via `src/app/sitemap.ts`
- Robots.txt configuration in `src/app/robots.ts`
- Structured data components for better search engine visibility
- Open Graph and Twitter Card meta tags support