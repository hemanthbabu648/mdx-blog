import { getAllNews } from "@/lib/news";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function NewsPage() {
  const allNews = getAllNews();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tech News & Updates
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news and announcements from the tech world.
          </p>
        </div>

        {allNews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No news available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNews.map((news) => (
              <article key={news.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {news.category && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {news.category}
                      </span>
                    )}
                    <span className="text-sm text-gray-600">
                      {new Date(news.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {news.title}
                  </h2>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {news.readTime || "2 min read"}
                    </span>
                    <Link
                      href={`/news/${news.slug}`}
                      className="text-blue-500 hover:text-blue-600 font-medium inline-flex items-center gap-1"
                    >
                      Read More
                      <FaArrowRight className="mt-0.5" size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}