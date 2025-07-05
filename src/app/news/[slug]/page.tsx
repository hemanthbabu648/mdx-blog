import { ShareButton } from "@/components/ShareButton";
import { getNewsBySlug, getAllNews } from "@/lib/news";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const news = getAllNews();
  return news.map((item) => ({
    slug: item.slug,
  }));
}

export default async function NewsItemPage({ params }: NewsPageProps) {
  const awaited = await params;
  const newsItem = getNewsBySlug(awaited.slug);

  return (
    <article className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto px-10">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-8 font-medium"
        >
          <IoIosArrowBack size={20} />
          Back to News
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            {newsItem.category && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                {newsItem.category}
              </span>
            )}
            <span className="text-gray-600">
              {new Date(newsItem.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">
              {newsItem.readTime || "2 min read"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {newsItem.title}
          </h1>
          <p className="text-xl text-gray-700">
            {newsItem.excerpt}
          </p>
        </header>

        <div className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-img:rounded-lg prose-a:text-blue-500 hover:prose-a:text-blue-600 overflow-x-auto break-words">
          <MDXRemote source={newsItem.content} />
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Link
              href="/news"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              <IoIosArrowBack size={20} className="inline-block mb-0.5" /> More News
            </Link>
            <div className="flex gap-4">
              <ShareButton title={newsItem.title} excerpt={newsItem.excerpt} />
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}