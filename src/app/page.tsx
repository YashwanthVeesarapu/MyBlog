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
    "Discover thoughtful writing on tech, lifestyle, and India-focused consumer issues. Redsols Blog offers practical perspectives for readers who want clearer digital life guidance.",
  alternates: {
    canonical: "https://blog.redsols.com",
  },
  openGraph: {
    title: "Blog by Redsols - Tech, Lifestyle & India Issues",
    description:
      "Discover thoughtful writing on tech, lifestyle, and India-focused consumer issues.",
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
    title: "Blog by Redsols - Tech, Lifestyle & India Issues",
    description:
      "Discover thoughtful writing on tech, lifestyle, and India-focused consumer issues.",
    images: ["/android-chrome-512x512.png"],
  },
};

const getCategoryDescription = (category: string) => {
  if (category === "Tech") {
    return "Practical software, product, and engineering writing for people building digital systems.";
  }

  if (category === "Lifestyle") {
    return "Work, habits, and everyday systems that shape how people live and build.";
  }

  if (category === "Issues") {
    return "Consumer problems, policy gaps, and service failures that deserve attention.";
  }

  if (category === "India") {
    return "India-specific consumer and digital-life issues with clear, practical impact.";
  }

  if (category === "Uncategorized") {
    return "Additional notes, essays, and practical perspectives that do not fit a single editorial lane.";
  }

  return `Essays and practical guidance collected under ${category.toLowerCase()}.`;
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

export default async function Home() {
  const data: Blog[] = await getData();

  const isIndiaPost = (blog: Blog) =>
    blog.region?.toLowerCase() === "india" || blog.category?.toLowerCase() === "india";

  const indiaPosts = data.filter(isIndiaPost);

  const blogsByCategory = data.reduce(
    (acc: Record<string, Blog[]>, blog: Blog) => {
      if (isIndiaPost(blog)) {
        return acc;
      }

      const category = blog.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(blog);
      return acc;
    },
    {}
  );

  const sortedCategories = Object.keys(blogsByCategory).sort((a, b) => {
    if (a === "Software") return -1;
    if (b === "Software") return 1;
    if (a === "Uncategorized") return 1;
    if (b === "Uncategorized") return -1;
    return a.localeCompare(b);
  });

  const totalPosts = data.length;
  const indiaPostCount = indiaPosts.length;

  return (
    <MainLayout>
      <div className={styles.homeContainer}>
        <section className={styles.homeHero}>
          <div className={styles.homeHeroContent}>
            <span className={styles.eyebrow}>Redsols Blog</span>
            <h1>
              Thoughtful writing on software, product judgment, and modern
              digital work.
            </h1>
            <p className={styles.homeHeroLede}>
              Essays, guides, and practical notes for teams building reliable
              products and making better technical decisions.
            </p>

            <div className={styles.homeHeroStats} aria-label="Site overview">
              <div className={styles.homeStat}>
                <strong>{totalPosts}</strong>
                <span>published articles</span>
              </div>
              <div className={styles.homeStat}>
                <strong>{sortedCategories.length}</strong>
                <span>editorial categories</span>
              </div>
              <div className={styles.homeStat}>
                <strong>{indiaPostCount}</strong>
                <span>India-focused posts</span>
              </div>
            </div>
          </div>

          <aside className={styles.homeHeroPanel}>
            <span className={styles.homeHeroPanelLabel}>India focus</span>
            <h2>Consumer issues from India deserve a separate lane.</h2>
            <p>
              Posts about telecom, banking, UPI, identity, and other India-specific
              digital-life problems are collected in one place for easier reading.
            </p>
            <a href="/india" className={styles.homeHeroPanelLink}>
              Open the India hub
            </a>
          </aside>
        </section>

        {indiaPosts.length > 0 && (
          <section className={styles.indiaSection} aria-labelledby="india-focus-title">
            <div className={styles.indiaSectionHeader}>
              <div>
                <span className={styles.categoryKicker}>India Focus</span>
                <h2 id="india-focus-title" className={styles.indiaSectionTitle}>
                  Consumer problems that affect daily life in India.
                </h2>
                <p className={styles.categoryDescription}>
                  Telecom, banking, and identity issues that need plain-language
                  explanation and practical pressure for change.
                </p>
              </div>
              <Link href="/india" className={styles.homeHeroPanelLink}>
                Read all India posts
              </Link>
            </div>

            <div className={styles.indiaPostsGrid}>
              {indiaPosts.slice(0, 3).map((blog: Blog) => (
                <Link
                  key={blog._id || blog.title}
                  href={`/blog/${getBlogSlug(blog)}/`}
                  className={styles.indiaPostCard}
                  aria-label={`Read India article: ${blog.title}`}
                >
                  <div className={styles.blogCardMeta}>
                    <span>India</span>
                    <span>{formatDate(blog.last_updated || blog.created_at)}</span>
                  </div>

                  <h3 className={styles.blogTitle}>{blog.title}</h3>
                  <p className={styles.blogDescription}>{blog.description}</p>
                  <span className={styles.readMore}>Read article</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className={styles.categoriesContainer}>
          {sortedCategories.map((category) => (
            <section
              key={category}
              id={`category-${category.toLowerCase().replace(/\s+/g, "-")}`}
              className={`${styles.categorySection} ${category === "Software" ? styles.featuredCategory : ""}`}
            >
              <div className={styles.categoryHeader}>
                <div className={styles.categoryHeaderCopy}>
                  <span className={styles.categoryKicker}>
                    {category === "Tech" ? "Primary pillar" : "Category"}
                  </span>
                  <h2 className={styles.categoryTitle}>
                    {category}
                    {category === "Tech" && (
                      <span className={styles.featuredBadge}>Core Redsols focus</span>
                    )}
                  </h2>
                  <p className={styles.categoryDescription}>
                    {getCategoryDescription(category)}
                  </p>
                </div>

                <div className={styles.categoryHeaderMeta}>
                  <span className={styles.blogCount}>
                    {blogsByCategory[category].length} {" "}
                    {blogsByCategory[category].length === 1 ? "article" : "articles"}
                  </span>
                </div>
              </div>

              <div className={styles.blogsGrid}>
                {blogsByCategory[category].map((blog: Blog) => (
                  <Link
                    key={blog._id || blog.title}
                    href={`/blog/${getBlogSlug(blog)}/`}
                    className={styles.blogCard}
                    aria-label={`Read article: ${blog.title}`}
                  >
                    <div className={styles.blogCardMeta}>
                      <span>{category}</span>
                      <span>{formatDate(blog.last_updated || blog.created_at)}</span>
                    </div>

                    <h3 className={styles.blogTitle}>{blog.title}</h3>

                    <p className={styles.blogDescription}>
                      {blog.description ||
                        "Read the full article for a practical Redsols perspective on the topic."}
                    </p>

                    <span className={styles.readMore}>Read article</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
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
