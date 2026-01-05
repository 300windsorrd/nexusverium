import type { Metadata } from "next";
import type { SeoPage } from "@/types";
import { siteConfig } from "./content";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  logo: `${siteConfig.url}/Logo.png`,
};

const withTrailingSlash = (path: string) =>
  path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
const joinUrl = (path: string) => `${siteConfig.url}${withTrailingSlash(path)}`;

export function buildMetadata({
  title,
  description,
  pathname,
  keywords,
}: {
  title: string;
  description: string;
  pathname: string;
  keywords?: string[];
}): Metadata {
  const canonical = joinUrl(pathname);
  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical,
    },
    keywords,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildJsonLdForSeoPage(
  section: string,
  page: SeoPage,
): Record<string, unknown>[] {
  const url = joinUrl(`/${section}/${page.slug}`);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: joinUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: section.charAt(0).toUpperCase() + section.slice(1),
        item: joinUrl(`/${section}`),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: url,
      },
    ],
  };

  const faqLd =
    page.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  const detail = {
    "@context": "https://schema.org",
    "@type": page.schemaType || "Service",
    name: page.title,
    description: page.metaDescription || page.intro,
    areaServed: page.location?.region || page.location?.city,
    url,
  };

  return [organizationLd, breadcrumb, detail, faqLd].filter(Boolean) as Record<
    string,
    unknown
  >[];
}

export function buildMetadataForSeoPage(
  section: string,
  page: SeoPage,
): Metadata {
  const keywords = [...page.primaryKeywords, ...page.secondaryKeywords];
  return buildMetadata({
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.intro,
    pathname: `/${section}/${page.slug}`,
    keywords,
  });
}
