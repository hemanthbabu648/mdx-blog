import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readTime?: string;
  author?: string;
  coverImage?: string;
  tags?: string[];
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  date,
  readTime = "5 min read",
  author = "Anonymous",
  coverImage,
  tags = [],
}: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {coverImage ? (
        <div className="h-48 overflow-hidden relative">
          <Image
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
            fill
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-500" />
      )}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span>{format(new Date(date), "MMM dd, yyyy")}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-700 mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between">
          <Link
            href={`/blogs/${slug}`}
            className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-1"
          >
            Read More
            <FaArrowRight className="ml-1 mt-0.5" size={12} />
          </Link>
          <span className="text-sm text-gray-500">{author}</span>
        </div>
      </div>
    </article>
  );
}