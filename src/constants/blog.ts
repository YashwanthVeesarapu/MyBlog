export const BLOG_CATEGORIES = [
  "",
  "Tech",
  "Lifestyle",
  "Issues",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_REGIONS = ["", "India", "Global"] as const;

export type BlogRegion = (typeof BLOG_REGIONS)[number];
