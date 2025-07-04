"use client";

import { IoShareSocialOutline } from "react-icons/io5";

interface ShareButtonProps {
  title: string;
  excerpt: string;
}

export function ShareButton({ title, excerpt }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url: window.location.href,
      }).catch(() => {
        // User cancelled share
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
      aria-label="Share this post"
    >
      <IoShareSocialOutline size={26} />
    </button>
  );
}