import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Hemanth Babu | Stories & Insights",
    template: "%s | Hemanth Babu S | Stories & Insights",
  },
  description: "Discover insightful articles about web development, Next.js, React, and modern JavaScript technologies. Site built with Next.js and MDX.",
  keywords: ["blog", "web development", "Next.js", "React", "MDX", "JavaScript", "TypeScript", "programming", "tech blog"],
  authors: [{ name: "Hemanth Babu S" }],
  creator: "Hemanth Babu S",
  publisher: "Hemanth Babu S",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.blogs.hemanthbabu648.com"),
  openGraph: {
    title: "Hemanth Babu S | Stories & Insights",
    description: "Discover insightful articles about web development, Next.js, React, React Native, and modern JavaScript technologies.",
    url: "/",
    siteName: "Hemanth Babu S | Stories & Insights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Hemanth Babu S | Stories & Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemanth Babu S | Stories & Insights",
    description: "Discover insightful articles about web development, Next.js, React, React Native, and modern JavaScript technologies.",
    images: ["/logo.svg"],
    creator: "@hemanthbabu648",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo.svg" },
    ],
    apple: [
      { url: "/logo.svg" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/logo.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
