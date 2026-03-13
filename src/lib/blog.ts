import { Blog } from "@/models/blog.model";

export const BLOG_SITE_URL = "https://blog.redsols.com";

export function getBlogSlug(blog: Partial<Blog> & { slug?: string }) {
  if (blog.slug?.trim()) {
    return blog.slug.trim().toLowerCase();
  }

  return (blog.title || "")
    .trim()
    .replace(/\n/g, " ")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

export function getBlogUrl(blog: Partial<Blog> & { slug?: string }) {
  return `${BLOG_SITE_URL}/blog/${getBlogSlug(blog)}`;
}
