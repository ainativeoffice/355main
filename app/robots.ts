import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://355main.com/sitemap.xml",
    host: "https://355main.com",
  };
}
