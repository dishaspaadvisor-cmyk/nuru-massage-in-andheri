import type { MetadataRoute } from "next";
import { site, siteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/gallery",
    "/offers",
    "/contact",
    "/blogs",
    "/privacy-policy",
    "/terms-and-conditions",
    "/llms.txt"
  ];

  const pageUrls = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/llms.txt"
      ? ("monthly" as MetadataRoute.Sitemap[number]["changeFrequency"])
      : ("weekly" as MetadataRoute.Sitemap[number]["changeFrequency"]),
    priority: route === "" ? 1 : route === "/llms.txt" ? 0.3 : 0.8
  }));

  const serviceUrls = site.services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75
  }));

  const blogUrls = site.blogs.map((blog) => ({
    url: `${siteUrl}/blogs/${blog.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...pageUrls, ...serviceUrls, ...blogUrls];
}
