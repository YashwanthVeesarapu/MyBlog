import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for all crawlers
      {
        userAgent: "*",
        disallow: ["/admin/", "/api/", "/private/"],
      },

      // Known aggressive or spammy bots
      { userAgent: "BadBot", disallow: ["/"] },
      { userAgent: "AhrefsBot", disallow: ["/"] },
      { userAgent: "SemrushBot", disallow: ["/"] },
      { userAgent: "meta-externalagent", disallow: ["/"] },
      { userAgent: "meta-webindexer", disallow: ["/"] },
      { userAgent: "MJ12bot", disallow: ["/"] },
      { userAgent: "PetalBot", disallow: ["/"] },
      { userAgent: "DataForSeoBot", disallow: ["/"] },
      { userAgent: "CCBot", disallow: ["/"] },
      { userAgent: "GPTBot", disallow: ["/"] },
      { userAgent: "ChatGPT-User", disallow: ["/"] },
      { userAgent: "Scrapy", disallow: ["/"] },
      { userAgent: "Python-requests", disallow: ["/"] },
      { userAgent: "curl", disallow: ["/"] },
      { userAgent: "wget", disallow: ["/"] },
    ],

    sitemap: "https://blog.redsols.com/sitemap.xml",
  };
}
