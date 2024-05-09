import MainLayout from "@/layouts/MainLayout";
import { apiInstance } from "../../../utils/apiInstance";
import React from "react";
import { Metadata, ResolvingMetadata } from "next";

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
      url: "https://redsols.com/blog/" + params.title,
      siteName: "Blog by Redsols",
    },
  };
}

export default async function page({ params }: any) {
  let url = apiInstance.getUri() + `blogs/post/${params.title}`;
  let blog: any = await fetch(url, { next: { revalidate: REVALIDATE } });
  const data = await blog.json();

  return (
    <div className="blog" itemScope itemType="http://schema.org/BlogPosting">
      <meta
        itemProp="headline"
        content={data.title.charAt(0).toUpperCase() + data.title.substr(1)}
      />
      <div dangerouslySetInnerHTML={{ __html: data?.info || "" }} />

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
                  ? "https://yash.redsols.us/"
                  : "https://www.redsols.us/"
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
  );
}
