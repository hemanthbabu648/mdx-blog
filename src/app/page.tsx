import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { getLatestNews } from "@/lib/news";
import PopularPostsCarousel from "@/components/PopularPostsCarousel";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  const posts = getAllPosts();
  const popularPosts = posts.slice(0, 6); // Get 6 posts for carousel
  const recommendedPosts = posts.slice(0, 4); // First 4 posts for recommendations
  const latestNews = getLatestNews(2); // Get 2 latest news items

  return (
    <>
      {/* Featured Post Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Discover the latest insights on web development, programming best practices, and technology trends.
                Our writers share their expertise to help you stay ahead in the ever-evolving tech landscape.
              </p>
              <Link
                href="/blogs"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Explore All Posts
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 lg:col-span-1">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg overflow-hidden relative">
                  <Image
                    src="/blogs-hero.jpg"
                    alt='blogs'
                    className="w-full h-full object-cover"
                    fill
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1 space-y-4">
                <div className="aspect-[3/4] lg:aspect-[4/5] bg-gradient-to-br from-cyan-400 to-teal-500 rounded-lg overflow-hidden relative">
                  <Image
                    src="/blogs-hero-1.png"
                    alt='blogs'
                    className="w-full h-full object-fill"
                    fill
                    loading="lazy"
                  />
                </div>
                <div className="hidden lg:block aspect-[4/3] bg-gradient-to-br from-orange-400 to-red-500 rounded-lg overflow-hidden relative">
                  <Image
                    src="/blogs-hero-2.jpg"
                    alt='blogs'
                    className="w-full h-full object-fill"
                    fill
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Posts Carousel */}
      <PopularPostsCarousel posts={popularPosts} />

      {/* Recommended Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recommended for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedPosts.map((post) => (
              <div key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 relative">
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-fit"
                      fill
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.author || "Anonymous"}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
                  >
                    Read Article
                    <FaArrowRight className="ml-2 mt-0.5" size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech News Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Tech News & Updates</h2>
            <Link href="/news" className="text-blue-500 hover:text-blue-600 font-medium">
              View All News →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestNews.map((news, index) => (
              <article key={news.slug} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-3">
                  {news.category && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {news.category}
                    </span>
                  )}
                  <span className="text-sm text-gray-600">
                    {new Date(news.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {news.title}
                </h3>
                <div className={`w-full h-1 mb-4 bg-gradient-to-r ${index === 0 ? 'from-blue-400 to-purple-400' : 'from-green-400 to-blue-400'
                  }`}></div>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {news.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {news.readTime || "2 min read"}
                  </span>
                  <Link href={`/news/${news.slug}`} className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}