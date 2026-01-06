import { MetadataRoute } from "next";
import { allProgrammatic, siteConfig } from "@/lib/content";

export const dynamic = "force-static";
export const revalidate = 0;

export default function sitemap(): MetadataRoute.Sitemap {
  const withTrailingSlash = (path: string) => (path === "/" ? "/" : `${path}/`);

  const staticRoutes = ["/", "/team", "/contact", "/now", "/research"].map((path) => ({
    url: `${siteConfig.url}${withTrailingSlash(path)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const dynamicRoutes = Object.entries(allProgrammatic).flatMap(
    ([section, pages]) =>
      pages.map((page) => ({
        url: `${siteConfig.url}${withTrailingSlash(`/${section}/${page.slug}`)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
  );

  return [...staticRoutes, ...dynamicRoutes];
}
