import Link from "next/link";
import { Metadata } from "next";

import { apiInstance } from "@/services";
import { Blog } from "@/models/blog.model";
import { BLOG_SITE_URL, getBlogSlug } from "@/lib/blog";
import MainLayout from "@/layouts/MainLayout";

import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "India Focus",
  description:
    "India-focused consumer issues, especially around telecom, banking, UPI, identity, and digital access.",
  alternates: {
    canonical: `${BLOG_SITE_URL}/india`,
  },
  openGraph: {
    title: "India Focus | Blog by Redsols",
    description:
      "India-focused consumer issues, especially around telecom, banking, UPI, identity, and digital access.",
    url: `${BLOG_SITE_URL}/india`,
    siteName: "Blog by Redsols",
    type: "website",
  },
};

const formatDate = (date?: string) => {
  if (!date) {
    return "Editorial";
  }

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const isIndiaPost = (blog: Blog) =>
  blog.region?.toLowerCase() === "india" || blog.category?.toLowerCase() === "india";

async function getData(): Promise<Blog[]> {
  try {
    const data = await apiInstance.get("/blog/blogs").then((res) => res.data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch India posts:", error);
    return [];
  }
}

export default async function IndiaPage() {
  const posts = (await getData())
    .filter(isIndiaPost)
    .sort((a, b) => {
      const left = new Date(b.last_updated || b.created_at || 0).getTime();
      const right = new Date(a.last_updated || a.created_at || 0).getTime();
      return left - right;
    });

  return (
    <MainLayout>
      <div className={styles.page}>
        <section className={styles.hero}>
          <span className={styles.kicker}>India Focus</span>
          <h1 className={styles.title}>
            Consumer issues that shape digital life in India.
          </h1>
          <p className={styles.lede}>
            This lane is for posts about telecom retention, banking access, UPI,
            identity, and other systems where a small product decision can become a
            real consumer problem.
          </p>

          <div className={styles.stats} aria-label="India focus overview">
            <div className={styles.stat}>
              <strong>{posts.length}</strong>
              <span>India-focused posts</span>
            </div>
            <div className={styles.stat}>
              <strong>Consumer first</strong>
              <span>Plain language, practical impact</span>
            </div>
            <div className={styles.stat}>
              <strong>Policy aware</strong>
              <span>Rules, responsibility, and action</span>
            </div>
          </div>
        </section>

        {posts.length > 0 ? (
          <section className={styles.grid} aria-label="India articles">
            {posts.map((post) => (
              <Link
                key={post._id || post.title}
                href={`/blog/${getBlogSlug(post)}/`}
                className={styles.card}
                aria-label={`Read article: ${post.title}`}
              >
                <div className={styles.meta}>
                  <span>{post.category || "India"}</span>
                  <span>{formatDate(post.last_updated || post.created_at)}</span>
                </div>

                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardDescription}>{post.description}</p>
                <span className={styles.cardCta}>Read article</span>
              </Link>
            ))}
          </section>
        ) : (
          <div className={styles.note}>
            No India posts yet. Add one through the admin panel and mark it as India.
          </div>
        )}
      </div>
    </MainLayout>
  );
}
