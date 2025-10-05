import { apiInstance } from "@/services";
import { redirect } from "next/navigation";

const REVALIDATE = 60; // adjust if needed

export async function generateStaticParams() {
  let url = apiInstance.getUri() + "/blog/blogs";
  const blogs = await fetch(url, { next: { revalidate: REVALIDATE } });

  const data: any = await blogs.json();

  return data.map((blog: any) => ({
    title: blog.title.split(" ").join("-"),
    description: blog.description,
    info: blog.info,
  }));
}

export default async function page({ params }: any) {
  const { title: slug } = params;

  redirect(`/admin?edit=${slug}`);
}
