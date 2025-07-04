# MDX Blog

A modern, performant blog built with Next.js 15, MDX, and Tailwind CSS v4.

## Features

- **MDX Support**: Write blog posts and news articles in MDX format with React component support
- **App Router**: Built on Next.js 15 App Router for optimal performance
- **TypeScript**: Full TypeScript support for type safety
- **Tailwind CSS v4**: Modern styling with the latest Tailwind CSS
- **SEO Optimized**: Includes sitemap, robots.txt, and structured data
- **Responsive Design**: Mobile-first responsive design
- **Dark Mode Ready**: Prepared for dark mode implementation

## Tech Stack

- **Framework**: Next.js 15.3.4
- **React**: 19.0.0
- **TypeScript**: 5.7.3
- **Styling**: Tailwind CSS v4
- **MDX**: @next/mdx, @mdx-js/loader, @mdx-js/react
- **Content Processing**: gray-matter, remark, remark-html
- **Date Formatting**: date-fns

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── about/           # About page
│   ├── blog/            # Blog listing and individual posts
│   │   └── [slug]/      # Dynamic blog post pages
│   ├── contact/         # Contact page
│   ├── news/            # News section
│   │   └── [slug]/      # Dynamic news article pages
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
├── content/             # MDX content
│   ├── news/           # News articles in MDX
│   └── posts/          # Blog posts in MDX
└── lib/                # Utility functions
    ├── mdx.ts          # MDX processing utilities
    └── news.ts         # News-specific utilities
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mdx-blog
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check without emitting files
```

## Writing Content

### Blog Posts

Create new blog posts in `src/content/posts/` as MDX files:

```mdx
---
title: "Your Post Title"
date: "2024-01-01"
excerpt: "A brief description of your post"
author: "Your Name"
tags: ["tag1", "tag2"]
---

Your content here...
```

### News Articles

Create news articles in `src/content/news/` following the same format.

## Customization

### Styling

- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Custom fonts: Geist Sans and Geist Mono are pre-configured

### Components

All components are in `src/components/` and can be customized to match your brand.

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<repository-url>)

Or deploy to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
