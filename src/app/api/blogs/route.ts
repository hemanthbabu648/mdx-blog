import { getAllPosts } from "@/lib/mdx";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = getAllPosts();

    const latestPosts = posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map(
        ({
          slug,
          title,
          excerpt,
          date,
          tags,
          author,
          coverImage,
          readTime,
        }) => ({
          slug,
          title,
          excerpt,
          date,
          tags,
          author,
          coverImage,
          readTime,
          url: `https://blogs.hemanthbabu648.com/blogs/${slug}`,
        })
      );
    return NextResponse.json({
      data: {
        posts: latestPosts,
        total: posts.length,
        count: latestPosts.length,
      },
      message: "Blog posts fetched successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error,
      message: "Failed to fetch blog posts",
      status: 500,
    });
  }
}
