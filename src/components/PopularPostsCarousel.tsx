"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PostData } from "@/lib/mdx";
import Image from "next/image";

interface PopularPostsCarouselProps {
  posts: PostData[];
}

export default function PopularPostsCarousel({ posts }: PopularPostsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerSlide = isMobile ? 1 : 2;

  // Filter posts by category
  const filteredPosts = selectedCategory === "All Categories"
    ? posts
    : posts.filter(post =>
      post.tags?.some(tag =>
        tag.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    );

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerSlide >= filteredPosts.length ? 0 : prevIndex + itemsPerSlide
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerSlide < 0 ? Math.max(0, filteredPosts.length - itemsPerSlide) : prevIndex - itemsPerSlide
    );
  };

  const visiblePosts = filteredPosts.slice(currentIndex, currentIndex + itemsPerSlide);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || filteredPosts.length <= itemsPerSlide) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + itemsPerSlide >= filteredPosts.length ? 0 : prevIndex + itemsPerSlide
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, filteredPosts.length, itemsPerSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Posts</h2>
          <div className="flex items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
            >
              <option>All Categories</option>
              <option>Next.js</option>
              <option>React</option>
              <option>MDX</option>
              <option>Node.js</option>
              <option>API</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Previous posts"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Next posts"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No posts found in the &quot;{selectedCategory}&quot; category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ease-in-out">
              {visiblePosts.map((post) => (
                <div key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex">
                    <div className="w-1/3">
                      <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 relative">
                        {post.coverImage && (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            fill
                          />
                        )}
                      </div>
                    </div>
                    <div className="w-2/3 p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {post.readTime || "5 min read"}
                        </span>
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filteredPosts.length > 0 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(filteredPosts.length / itemsPerSlide) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerSlide)}
                className={`w-2 h-2 rounded-full transition-colors ${Math.floor(currentIndex / itemsPerSlide) === index
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}