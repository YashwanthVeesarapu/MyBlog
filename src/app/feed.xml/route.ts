import { apiInstance } from "@/services";
import { BLOG_SITE_URL, getBlogSlug } from "@/lib/blog";
import { NextResponse } from "next/server";

const SITE_TITLE = "Blog by Redsols";
const SITE_DESCRIPTION =
  "Explore the vibrant world of Redsols Blog, where insightful articles and engaging content come together to enlighten and entertain.";

export async function GET() {
  try {
    const response = await apiInstance.get("/blog/blogs");
    const blogs = response.data;

    const items = Array.isArray(blogs) ? blogs : blogs?.data || [];

    const rssItems = items
      .map((blog: any) => {
        const slug = getBlogSlug(blog);
        const pubDate = blog.created_at
          ? new Date(blog.created_at).toUTCString()
          : new Date().toUTCString();

        return `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${BLOG_SITE_URL}/blog/${slug}/</link>
      <guid isPermaLink="true">${BLOG_SITE_URL}/blog/${slug}/</guid>
      <description><![CDATA[${blog.description || ""}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${blog.author || "Redsols"}</author>
    </item>`;
      })
      .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${BLOG_SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BLOG_SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <copyright>Copyright ${new Date().getFullYear()} Redsols</copyright>
    <managingEditor>blog@redsols.com (Redsols)</managingEditor>
    <webMaster>blog@redsols.com (Redsols)</webMaster>
    ${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
