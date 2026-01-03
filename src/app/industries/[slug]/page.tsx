import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoHead } from "@/components/SeoHead";
import { SeoPageContent } from "@/components/SeoPageContent";
import { allProgrammatic, industries } from "@/lib/content";
import {
  buildJsonLdForSeoPage,
  buildMetadataForSeoPage,
} from "@/lib/metadata";

export async function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = industries.find((item) => item.slug === params.slug);
  if (!page) return {};
  return buildMetadataForSeoPage("industries", page);
}

function relatedLinks(slugs?: string[]) {
  if (!slugs) return [];
  return Object.entries(allProgrammatic).flatMap(([section, items]) =>
    items
      .filter((item) => slugs.includes(item.slug))
      .map((item) => ({ title: item.title, href: `/${section}/${item.slug}` })),
  );
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const page = industries.find((item) => item.slug === params.slug);
  if (!page) return notFound();

  const jsonLd = buildJsonLdForSeoPage("industries", page);

  return (
    <>
      <SeoHead jsonLd={jsonLd} />
      <SeoPageContent
        section="Industry"
        page={page}
        related={relatedLinks(page.related)}
      />
    </>
  );
}
