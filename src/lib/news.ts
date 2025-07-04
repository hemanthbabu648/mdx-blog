import fs from "fs";
import path from "path";
import matter from "gray-matter";

const newsDirectory = path.join(process.cwd(), "src/content/news");

export interface NewsData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category?: string;
  readTime?: string;
}

export function getNewsSlugs() {
  return fs.readdirSync(newsDirectory);
}

export function getNewsBySlug(slug: string): NewsData {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(newsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    content,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    category: data.category,
    readTime: data.readTime,
  };
}

export function getAllNews(): NewsData[] {
  const slugs = getNewsSlugs();
  const news = slugs
    .map((slug) => getNewsBySlug(slug))
    .sort((news1, news2) => (news1.date > news2.date ? -1 : 1));
  return news;
}

export function getLatestNews(count: number = 2): NewsData[] {
  return getAllNews().slice(0, count);
}