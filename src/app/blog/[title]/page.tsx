import MainLayout from "@/layouts/MainLayout";
import { apiInstance } from "../../../utils/apiInstance";
import React from "react";
import { Metadata, ResolvingMetadata } from "next";

export async function generateStaticParams() {
  let url = apiInstance.getUri() + "blogs";
  const blogs = await fetch(url, { cache: "no-store" });

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
  title = title
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  return {
    title: title,
    description: params.description,
  };
}

export default async function page({ params }: any) {
  let url = apiInstance.getUri() + `blogs/${params.title}`;
  let blog: any = await fetch(url, { next: { revalidate: 1 } });
  const data = await blog.json();

  return (
    <div className="blog">
      <div dangerouslySetInnerHTML={{ __html: data?.info || "" }} />
    </div>
  );
}
