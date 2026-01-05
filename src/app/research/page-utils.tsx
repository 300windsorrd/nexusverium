import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoHead } from "@/components/SeoHead";
import { SeoPageContent } from "@/components/SeoPageContent";
import { allProgrammatic, research } from "@/lib/content";
import {
  buildJsonLdForSeoPage,
  buildMetadataForSeoPage,
} from "@/lib/metadata";
import type { SeoPage } from "@/types";

const WORDS_PER_MINUTE = 200;
const DEFAULT_AUTHOR = "Nexus Verium Research Team";

function relatedLinks(slugs?: string[]) {
  if (!slugs) return [];
  return Object.entries(allProgrammatic).flatMap(([section, items]) =>
    items
      .filter((item) => slugs.includes(item.slug))
      .map((item) => ({ title: item.title, href: `/${section}/${item.slug}` })),
  );
}

function estimateReadingTime(page: SeoPage) {
  const text = [
    page.h1,
    page.intro,
    ...page.bullets,
    ...page.processSteps,
    ...page.faq.flatMap((item) => [item.question, item.answer]),
  ]
    .join(" ")
    .trim();

  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function buildResearchMetadata(slug: string): Metadata {
  const page = research.find((item) => item.slug === slug);
  if (!page) return {};
  return buildMetadataForSeoPage("research", page);
}

export function renderResearchPage(slug: string) {
  const page = research.find((item) => item.slug === slug);
  if (!page) return notFound();

  const jsonLd = buildJsonLdForSeoPage("research", page);
  const readingTimeMinutes = estimateReadingTime(page);
  const author = page.author || DEFAULT_AUTHOR;

  return (
    <>
      <SeoHead jsonLd={jsonLd} />
      <SeoPageContent
        section="Research"
        page={page}
        related={relatedLinks(page.related)}
        meta={{ author, readingTimeMinutes }}
      />
    </>
  );
}
