interface StructuredDataProps {
  title: string;
  description: string;
  author?: string;
  datePublished: string;
  url: string;
  image?: string;
}

export function StructuredData({
  title,
  description,
  author,
  datePublished,
  url,
  image,
}: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: author || "MDX Blog Team",
    },
    datePublished: datePublished,
    dateModified: datePublished,
    url: url,
    publisher: {
      "@type": "Organization",
      name: "MDX Blog",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}