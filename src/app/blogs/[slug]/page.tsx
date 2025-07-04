import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ShareButton } from "@/components/ShareButton";
import { StructuredData } from "@/components/StructuredData";
import { Metadata } from "next";
import Image from "next/image";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const awaited = await params;
  const post = getPostBySlug(awaited.slug);
  const baseUrl = 'https://www.blogs.hemanthbabu648.com'

  return {
    title: post.title,
    description: post.excerpt,
    authors: post.author ? [{ name: post.author }] : undefined,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      url: `${baseUrl}/blog/${post.slug}`,
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    alternates: {
      canonical: `${baseUrl}/blogs/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const awaited = await params;
  const post = getPostBySlug(awaited.slug);
  const baseUrl = 'https://www.blogs.hemanthbabu648.com';

  return (
    <article className="min-h-screen py-12 px-4">
      <StructuredData
        title={post.title}
        description={post.excerpt}
        author={post.author}
        datePublished={post.date}
        url={`${baseUrl}/blogs/${post.slug}`}
        image={post.coverImage}
      />
      <div className="max-w-7xl mx-auto px-10">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8 font-medium transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <span>{format(new Date(post.date), "MMMM dd, yyyy")}</span>
            <span>•</span>
            <span>{post.readTime || "5 min read"}</span>
            <span>•</span>
            <span>By {post.author || "Anonymous"}</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.coverImage && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-xl relative">
            <Image
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto"
              fill
            />
          </div>
        )}

        <div className="prose prose-lg prose-indigo max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-code:bg-indigo-50 prose-code:text-indigo-600 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-img:rounded-xl prose-img:shadow-lg prose-a:text-indigo-600 hover:prose-a:text-indigo-700">
          <MDXRemote source={post.content} />
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {post.author || "Anonymous"}
              </h3>
              <p className="text-gray-600">Author</p>
            </div>
            <ShareButton title={post.title} excerpt={post.excerpt} />
          </div>
        </footer>
      </div>
    </article>
  );
}