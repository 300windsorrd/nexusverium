import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";

export const dynamic = "force-static";
export const revalidate = 0;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
