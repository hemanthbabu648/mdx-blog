import { withCors } from "@/lib/cors";
import { getAllNews } from "@/lib/news";
import { NextResponse } from "next/server";

const handler = async () => {
  try {
    const news = getAllNews();

    const latestNews = news
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map(({ slug, title, excerpt, date, readTime }) => ({
        slug,
        title,
        excerpt,
        date,
        readTime,
        url: `https://blogs.hemanthbabu648.com/news/${slug}`,
      }));
    return NextResponse.json({
      data: {
        news: latestNews,
        total: news.length,
        count: latestNews.length,
      },
      message: "News fetched successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error,
      message: "Failed to fetch news",
      status: 500,
    });
  }
};

export const GET = withCors(handler);
