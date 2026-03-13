import { MetadataRoute } from "next";
import { BLOG_SITE_URL, getBlogSlug } from "@/lib/blog";

const SERVER_URL = "https://api.redsols.com/blog/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const call = await fetch(SERVER_URL, { next: { revalidate: 3600 } });
  const blogs = await call.json();

  const rawItems = Array.isArray(blogs) ? blogs : blogs?.data || [];
  const items = rawItems.filter((post: any) => !post.deleted && post.title);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const blogsSitemap = items.map((post: any) => {
    const slug = getBlogSlug(post);

    return {
      url: `${BLOG_SITE_URL}/blog/${slug}`,
      lastModified: post.last_updated
        ? new Date(post.last_updated).toISOString().split("T")[0]
        : formattedDate,
      priority: 0.8,
      changeFrequency: "weekly",
    };
  });

  return [
    {
      url: BLOG_SITE_URL,
      lastModified: formattedDate,
      changeFrequency: "daily",
      priority: 1,
    },
    ...blogsSitemap,
  ];
}
