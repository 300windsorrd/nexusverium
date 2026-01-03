import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoHead } from "@/components/SeoHead";
import { SeoPageContent } from "@/components/SeoPageContent";
import { allProgrammatic, research } from "@/lib/content";
import {
  buildJsonLdForSeoPage,
  buildMetadataForSeoPage,
} from "@/lib/metadata";

export async function generateStaticParams() {
  return research.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = research.find((item) => item.slug === params.slug);
  if (!page) return {};
  return buildMetadataForSeoPage("research", page);
}

function relatedLinks(slugs?: string[]) {
  if (!slugs) return [];
  return Object.entries(allProgrammatic).flatMap(([section, items]) =>
    items
      .filter((item) => slugs.includes(item.slug))
      .map((item) => ({ title: item.title, href: `/${section}/${item.slug}` })),
  );
}

export default function ResearchPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = research.find((item) => item.slug === params.slug);
  if (!page) return notFound();

  const jsonLd = buildJsonLdForSeoPage("research", page);

  return (
    <>
      <SeoHead jsonLd={jsonLd} />
      <SeoPageContent
        section="Research"
        page={page}
        related={relatedLinks(page.related)}
      />
    </>
  );
}
