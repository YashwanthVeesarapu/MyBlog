import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin/", "/api/", "/private/"], // Blocks sensitive areas
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
      {
        userAgent: "meta-externalagent",
        disallow: ["/"], // Blocks all access for "meta-externalagent"
      },
    ],
    sitemap: "https://blog.redsols.com/sitemap.xml",
  };
}
