import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoHead } from "@/components/SeoHead";
import { SeoPageContent } from "@/components/SeoPageContent";
import { allProgrammatic, services } from "@/lib/content";
import {
  buildJsonLdForSeoPage,
  buildMetadataForSeoPage,
} from "@/lib/metadata";

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = services.find((item) => item.slug === params.slug);
  if (!page) return {};
  return buildMetadataForSeoPage("services", page);
}

function relatedLinks(slugs?: string[]) {
  if (!slugs) return [];
  return Object.entries(allProgrammatic).flatMap(([section, items]) =>
    items
      .filter((item) => slugs.includes(item.slug))
      .map((item) => ({ title: item.title, href: `/${section}/${item.slug}` })),
  );
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const page = services.find((item) => item.slug === params.slug);
  if (!page) return notFound();

  const jsonLd = buildJsonLdForSeoPage("services", page);

  return (
    <>
      <SeoHead jsonLd={jsonLd} />
      <SeoPageContent
        section="Service"
        page={page}
        related={relatedLinks(page.related)}
      />
    </>
  );
}
