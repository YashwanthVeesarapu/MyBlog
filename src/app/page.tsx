import styles from "./page.module.scss";

import MainLayout from "./../layouts/MainLayout";

import Link from "next/link";
import { Blog } from "@/models/blog.model";
import { apiInstance } from "@/services";
import { Metadata } from "next";
import { getBlogSlug } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover insightful articles on software engineering, product thinking, and productivity. Redsols Blog offers valuable perspectives for developers, product leaders, and tech professionals.",
  alternates: {
    canonical: "https://blog.redsols.com",
  },
  openGraph: {
    title: "Blog by Redsols - Insights on Technology & Software",
    description:
      "Discover insightful articles on software engineering, product thinking, and productivity.",
    url: "https://blog.redsols.com",
    siteName: "Blog by Redsols",
    type: "website",
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
    title: "Blog by Redsols - Insights on Technology & Software",
    description:
      "Discover insightful articles on software engineering, product thinking, and productivity.",
    images: ["/android-chrome-512x512.png"],
  },
};

export default async function Home() {
  const data: Blog[] = await getData();

  // Group blogs by category
  const blogsByCategory = data.reduce(
    (acc: Record<string, Blog[]>, blog: Blog) => {
      const category = blog.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(blog);
      return acc;
    },
    {}
  );

  // Sort categories with Software first, then alphabetically
  const sortedCategories = Object.keys(blogsByCategory).sort((a, b) => {
    if (a === "Software") return -1;
    if (b === "Software") return 1;
    if (a === "Uncategorized") return 1;
    if (b === "Uncategorized") return -1;
    return a.localeCompare(b);
  });

  return (
    <MainLayout>
      <div className={styles.homeContainer}>
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Welcome to Our Blog</h1>
          <p className={styles.heroSubtitle}>
            Insights from exploring technology and beyond
          </p>
        </section>

        <div className={styles.categoriesContainer}>
          {sortedCategories.map((category) => (
            <section
              key={category}
              className={`${styles.categorySection} ${category === "Software" ? styles.featuredCategory : ""
                }`}
            >
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>
                  {category}
                  {category === "Software" && (
                    <span className={styles.featuredBadge}>Our Specialty</span>
                  )}
                </h2>
                <span className={styles.blogCount}>
                  {blogsByCategory[category].length}{" "}
                  {blogsByCategory[category].length === 1 ? "post" : "posts"}
                </span>
              </div>

              <div className={styles.blogsGrid}>
                {blogsByCategory[category].map((blog: Blog) => (
                  <Link
                    key={blog._id || blog.title}
                    href={`/blog/${getBlogSlug(blog)}/`}
                    className={styles.blogCard}
                  >
                    <h3 className={styles.blogTitle}>{blog.title}</h3>
                    {blog.description && (
                      <p className={styles.blogDescription}>{blog.description}</p>
                    )}
                    <span className={styles.readMore}>Read more →</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className={styles.center}></div>
      </div>
    </MainLayout>
  );
}

const getData = async () => {
  try {
    const data = await apiInstance.get("/blog/blogs").then((res) => res.data);
    return data;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
};
