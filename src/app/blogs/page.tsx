import { Suspense } from "react";
import { getAllPosts } from "@/lib/mdx";
import BlogPageClient from "@/components/BlogPageClient";

export default function BlogPage() {
  const posts = getAllPosts();

  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
    <BlogPageClient initialPosts={posts} />
  </Suspense>;
}