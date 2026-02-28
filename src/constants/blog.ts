export const BLOG_CATEGORIES = [
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
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
