import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { getAllNews } from "@/lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.blogs.hemanthbabu648.com";
  const baseUrl1 = "https://www.hemanthbabu648.com";

  // Get all blog posts
  const posts = getAllPosts();

  // Get all mews posts
  const news = getAllNews();

  // Create sitemap entries for blog posts
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Create sitemap entries for news posts
  const allNews = news.map((news) => ({
    url: `${baseUrl}/news/${news.slug}`,
    lastModified: news.date ? new Date(news.date) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Static pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl1}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl1}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  return [...routes, ...blogPosts, ...allNews];
}
