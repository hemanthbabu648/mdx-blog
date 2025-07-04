"use client";

import BlogCard from "@/components/BlogCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostData } from "@/lib/mdx";

interface BlogPageClientProps {
  initialPosts: PostData[];
}

export default function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  useEffect(() => {
    if (searchQuery) {
      const filtered = initialPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(initialPosts);
    }
  }, [searchQuery, initialPosts]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blogs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our latest articles, tutorials, and insights about web development,
            programming, and technology.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <span className="px-4 py-2 bg-gray-100 text-purple-700 rounded-full text-sm font-medium hover:bg-gray-200">
            All Posts
          </span>
          <button className="px-4 py-2 bg-gray-100 text-purple-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            Next.js
          </button>
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            React
          </button>
          <button className="px-4 py-2 bg-gray-100 text-purple-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            MDX
          </button>
          <button className="px-4 py-2 bg-gray-100 text-purple-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            API
          </button>
        </div>

        {searchQuery && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Showing results for: <span className="font-semibold">&quot;{searchQuery}&quot;</span>
            </p>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              {searchQuery ? `No posts found for "${searchQuery}"` : "No posts found."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                date={post.date}
                readTime={post.readTime}
                author={post.author}
                coverImage={post.coverImage}
                tags={post.tags}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}