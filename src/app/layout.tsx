import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { BLOG_SITE_URL } from "@/lib/blog";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Blog by Redsols",
    template: "%s | Blog by Redsols",
  },
  description:
    "Explore the vibrant world of Redsols Blog, where insightful articles and engaging content come together to enlighten and entertain. From the latest trends to in-depth analyses, our blog covers a diverse range of topics, offering valuable insights and expert perspectives. Join us on a journey of discovery as we share knowledge, inspiration, and captivating stories. Redsols Blog – Your go-to destination for enriching content that goes beyond the ordinary.",
  keywords: [
    "Redsols",
    "blog",
    "software engineering",
    "product thinking",
    "technology",
    "productivity",
    "development",
    "programming",
  ],
  authors: [{ name: "Redsols", url: "https://redsols.com" }],
  creator: "Redsols",
  publisher: "Redsols",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(BLOG_SITE_URL),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: BLOG_SITE_URL,
    types: {
      "application/rss+xml": `${BLOG_SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    title: "Blog by Redsols",
    description: "Explore the vibrant world of Redsols Blog.",
    url: BLOG_SITE_URL,
    siteName: "Blog by Redsols",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Blog by Redsols",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog by Redsols",
    description: "Explore the vibrant world of Redsols Blog.",
    site: "@redsols",
    creator: "@redsols",
    images: ["/android-chrome-512x512.png"],
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
  verification: {
    other: {
      "impact-site-verification": "c05f4ee4-3f67-48bb-b824-df87f4073e24",
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#990000",
};

// Organization JSON-LD schema
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Redsols",
  url: "https://redsols.com",
  logo: "https://blog.redsols.com/android-chrome-512x512.png",
  sameAs: [
    "https://twitter.com/redsols",
    "https://www.linkedin.com/company/redsols",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "blog@redsols.com",
    contactType: "customer service",
  },
};

// Website JSON-LD schema
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Blog by Redsols",
  url: BLOG_SITE_URL,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
      {/* <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3789101350622146"
        crossOrigin="anonymous"
      ></script> */}
      <GoogleAnalytics gaId="G-KZ56NVRBEB" />
    </html>
  );
}
