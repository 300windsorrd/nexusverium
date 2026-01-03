import { MetadataRoute } from "next";
import { allProgrammatic, siteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/team", "/contact", "/now"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const dynamicRoutes = Object.entries(allProgrammatic).flatMap(
    ([section, pages]) =>
      pages.map((page) => ({
        url: `${siteConfig.url}/${section}/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
  );

  return [...staticRoutes, ...dynamicRoutes];
}
