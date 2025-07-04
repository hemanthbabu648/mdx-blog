import { getAllPosts } from "@/lib/mdx";
import BlogPageClient from "@/components/BlogPageClient";

export default function BlogPage() {
  const posts = getAllPosts();
  
  return <BlogPageClient initialPosts={posts} />;
}