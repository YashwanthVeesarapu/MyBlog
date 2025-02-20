import MainLayout from "@/layouts/MainLayout";

import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { apiInstance } from "@/services";

const REVALIDATE = 1;

export async function generateStaticParams() {
  let url = apiInstance.getUri() + "blogs";
  const blogs = await fetch(url, { next: { revalidate: REVALIDATE } });

  const data: any = await blogs.json();

  return data.map((blog: any) => ({
    title: blog.title.split(" ").join("-"),
    description: blog.description,
    info: blog.info,
  }));
}

type Props = {
  params: { title: string; description: string; info: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let title = params.title;

  console.log(apiInstance.getUri() + `blogs/post/${params.title}`);

  const blog: any = await fetch(
    apiInstance.getUri() + `blogs/post/${params.title}`,
    {
      next: { revalidate: REVALIDATE },
    }
  );
  const data: any = await blog.json();

  title = title
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  return {
    title: title,
    description: data.description,
    openGraph: {
      title: title,
      description: data.description,
      type: "website",
      url: "https://blog.redsols.com/blog/" + params.title,
      siteName: "Blog by Redsols",
    },
  };
}

export default async function page({ params }: any) {
  let url = apiInstance.getUri() + `blogs/post/${params.title}`;
  let blog: any = await fetch(url, { next: { revalidate: REVALIDATE } });
  const data = await blog.json();

  // Add JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title.charAt(0).toUpperCase() + data.title.substr(1),
    description: data.description,
    url: "https://redsols.com/blog/" + params.title,
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
      "@id": "https://redsols.com/blog/" + params.title,
    },
    publisher: {
      "@type": "Organization",
      name: "Redsols",
      url: "https://redsols.com",
    },
    dateModified: data.last_updated,
  };

  return (
    <div className="blog" itemScope itemType="http://schema.org/BlogPosting">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      ></script>
      <meta
        itemProp="headline"
        content={data.title.charAt(0).toUpperCase() + data.title.substr(1)}
      />
      <div dangerouslySetInnerHTML={{ __html: data?.info || "" }} />

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
