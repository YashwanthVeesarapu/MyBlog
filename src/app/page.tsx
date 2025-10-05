import "./page.scss";

import MainLayout from "./../layouts/MainLayout";

import Link from "next/link";
import { Blog } from "@/models/blog.model";
import { apiInstance } from "@/services";

const BLOG_CATEGORIES = [
  "",
  "Technology",
  "Health",
  "Travel",
  "Food",
  "Lifestyle",
  "Education",
  "Finance",
  "Entertainment",
  "Sports",
  "Science",
  "Software",
];

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
      <div className="home-container">
        <section className="hero-section">
          <h1 className="hero-title">Welcome to Our Blog</h1>
          <p className="hero-subtitle">
            Insights from exploring technology and beyond
          </p>
        </section>

        <div className="categories-container">
          {sortedCategories.map((category) => (
            <section
              key={category}
              className={`category-section ${
                category === "Software" ? "featured-category" : ""
              }`}
            >
              <div className="category-header">
                <h2 className="category-title">
                  {category}
                  {category === "Software" && (
                    <span className="featured-badge">Our Specialty</span>
                  )}
                </h2>
                <span className="blog-count">
                  {blogsByCategory[category].length}{" "}
                  {blogsByCategory[category].length === 1 ? "post" : "posts"}
                </span>
              </div>

              <div className="blogs-grid">
                {blogsByCategory[category].map((blog: Blog) => (
                  <Link
                    key={blog._id || blog.title}
                    href={`/blog/${blog.title.split(" ").join("-")}/`}
                    className="blog-card"
                  >
                    <h3 className="blog-title">{blog.title}</h3>
                    {blog.description && (
                      <p className="blog-description">{blog.description}</p>
                    )}
                    <span className="read-more">Read more →</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="center"></div>
      </div>
    </MainLayout>
  );
}

const getData = async () => {
  const data = await apiInstance.get("/blog/blogs").then((res) => res.data);

  return data;
};
