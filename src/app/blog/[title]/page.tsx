import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { apiInstance } from "@/services";
import DOMPurify from "isomorphic-dompurify";
import { BLOG_SITE_URL, getBlogSlug, getBlogUrl } from "@/lib/blog";
import { Blog } from "@/models/blog.model";

import "./page.scss";

const REVALIDATE = 60; // adjust if needed

export async function generateStaticParams() {
  try {
    const url = apiInstance.getUri() + "/blog/blogs";
    const blogs = await fetch(url, { next: { revalidate: REVALIDATE } });

    if (!blogs.ok) {
      return [];
    }

    const data: Blog[] = await blogs.json();

    return data.map((blog) => ({
      title: getBlogSlug(blog),
    }));
  } catch (error) {
    console.error("Failed to generate static blog params:", error);
    return [];
  }
}

type Props = {
  params: { title: string };
};

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const response = await fetch(apiInstance.getUri() + `/blog/blogs/post/${slug}`, {
      next: { revalidate: REVALIDATE },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to fetch blog post for slug "${slug}":`, error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title: slug } = params;
  const data = await getBlogBySlug(slug);

  if (!data) {
    return {
      title: "Blog Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = getBlogUrl(data);

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      url: canonicalUrl,
      siteName: "Blog by Redsols",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
  };
}

export default async function page({ params }: Props) {
  const data = await getBlogBySlug(params.title);

  if (!data) {
    notFound();
  }

  // Add JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    url: `${BLOG_SITE_URL}/blog/${params.title}`,
    datePublished: data.created_at,
    dateModified: data.last_updated,
    author: {
      "@type": "Person",
      name: data.author,
      url:
        data.author == "Yashwanth Veesarapu"
          ? "https://yash.redsols.com/"
          : "https://www.redsols.com/",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BLOG_SITE_URL}/blog/${params.title}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Redsols",
      url: "https://redsols.com",
      logo: {
        "@type": "ImageObject",
        url: "https://blog.redsols.com/android-chrome-512x512.png",
      },
    },
    image: "https://blog.redsols.com/android-chrome-512x512.png",
  };

  // Breadcrumb structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BLOG_SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: BLOG_SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: `${BLOG_SITE_URL}/blog/${params.title}`,
      },
    ],
  };

  return (
    <div className="blog" itemScope itemType="http://schema.org/BlogPosting">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      ></script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      ></script>
      <meta
        itemProp="headline"
        content={data.title}
      />
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.info || "") }} />

      <div className="bottom">
        {data?.last_updated && (
          <div className="last_updated">
            Last updated: {new Date(data.last_updated).toDateString()}
          </div>
        )}

        <div className="author">
          by{" "}
          {data?.author ? (
            <span
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <a
                itemProp="url"
                href={
                  data.author.toLowerCase() == "yashwanth veesarapu"
                    ? "https://yash.redsols.com/"
                    : "https://www.redsols.com/"
                }
              >
                <span itemProp="name">{data.author}</span>
              </a>
            </span>
          ) : (
            "Unknown"
          )}
        </div>
      </div>
    </div>
  );
}
