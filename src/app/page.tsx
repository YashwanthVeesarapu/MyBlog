import "./page.scss";

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

const getCategoryDescription = (category: string) => {
  if (category === "Software") {
    return "Deep dives on engineering choices, delivery quality, and the systems behind dependable software.";
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

  const sortedCategories = Object.keys(blogsByCategory).sort((a, b) => {
    if (a === "Software") return -1;
    if (b === "Software") return 1;
    if (a === "Uncategorized") return 1;
    if (b === "Uncategorized") return -1;
    return a.localeCompare(b);
  });

  const totalPosts = data.length;
  const featuredPosts = blogsByCategory.Software?.length ?? 0;

  return (
    <MainLayout>
      <div className="home-container">
        <section className="home-hero">
          <div className="home-hero__content">
            <span className="eyebrow">Redsols Blog</span>
            <h1>Thoughtful writing on software, product judgment, and modern digital work.</h1>
            <p className="home-hero__lede">
              Essays, guides, and practical notes for teams building reliable
              products and making better technical decisions.
            </p>

            <div className="home-hero__stats" aria-label="Site overview">
              <div className="home-stat">
                <strong>{totalPosts}</strong>
                <span>published articles</span>
              </div>
              <div className="home-stat">
                <strong>{sortedCategories.length}</strong>
                <span>editorial categories</span>
              </div>
              <div className="home-stat">
                <strong>{featuredPosts}</strong>
                <span>software-focused posts</span>
              </div>
            </div>
          </div>

          <aside className="home-hero__panel">
            <span className="home-hero__panel-label">Featured archive</span>
            <h2>Explore the software collection first.</h2>
            <p>
              It brings together the clearest engineering writing on the site,
              including implementation guides, systems thinking, and delivery
              quality.
            </p>
            <a href="#category-software" className="home-hero__panel-link">
              View software articles
            </a>
          </aside>
        </section>

        <div className="categories-container">
          {sortedCategories.map((category, categoryIndex) => (
            <section
              key={category}
              id={`category-${category.toLowerCase().replace(/\s+/g, "-")}`}
              className={`category-section ${
                category === "Software" ? "featured-category" : ""
              }`}
            >
              <div className="category-header">
                <div className="category-header__copy">
                  <span className="category-kicker">
                    {category === "Software" ? "Featured archive" : "Category"}
                  </span>
                  <h2 className="category-title">
                    {category}
                    {category === "Software" && (
                      <span className="featured-badge">Core Redsols focus</span>
                    )}
                  </h2>
                  <p className="category-description">
                    {getCategoryDescription(category)}
                  </p>
                </div>

                <div className="category-header__meta">
                  <span className="blog-count">
                    {blogsByCategory[category].length}{" "}
                    {blogsByCategory[category].length === 1 ? "article" : "articles"}
                  </span>
                  <span className="category-order">Section {categoryIndex + 1}</span>
                </div>
              </div>

              <div className="blogs-grid">
                {blogsByCategory[category].map((blog: Blog) => (
                  <Link
                    key={blog._id || blog.title}
                    href={`/blog/${getBlogSlug(blog)}/`}
                    className="blog-card"
                    aria-label={`Read article: ${blog.title}`}
                  >
                    <div className="blog-card__meta">
                      <span>{category}</span>
                      <span>{formatDate(blog.last_updated || blog.created_at)}</span>
                    </div>

                    <h3 className="blog-title">{blog.title}</h3>

                    <p className="blog-description">
                      {blog.description ||
                        "Read the full article for a practical Redsols perspective on the topic."}
                    </p>

                    <span className="read-more">Read article</span>
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
