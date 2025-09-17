import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin/", "/api/", "/private/"], // Added "/private/" to block sensitive areas
      },
      {
        userAgent: "BadBot",
        disallow: ["/"], // Blocks all access for "BadBot"
      },
      {
        userAgent: "AhrefsBot",
        disallow: ["/"], // Blocks all access for "AhrefsBot"
      },
      {
        userAgent: "SemrushBot",
        disallow: ["/"], // Blocks all access for "SemrushBot"
      },
    ],
    sitemap: "https://blog.redsols.com/sitemap.xml",
  };
}
