import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoHead } from "@/components/SeoHead";
import { SeoPageContent } from "@/components/SeoPageContent";
import { allProgrammatic, locations } from "@/lib/content";
import {
  buildJsonLdForSeoPage,
  buildMetadataForSeoPage,
} from "@/lib/metadata";

export async function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = locations.find((item) => item.slug === params.slug);
  if (!page) return {};
  return buildMetadataForSeoPage("locations", page);
}

function relatedLinks(slugs?: string[]) {
  if (!slugs) return [];
  return Object.entries(allProgrammatic).flatMap(([section, items]) =>
    items
      .filter((item) => slugs.includes(item.slug))
      .map((item) => ({ title: item.title, href: `/${section}/${item.slug}` })),
  );
}

export default function LocationPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = locations.find((item) => item.slug === params.slug);
  if (!page) return notFound();

  const jsonLd = buildJsonLdForSeoPage("locations", page);

  return (
    <>
      <SeoHead jsonLd={jsonLd} />
      <SeoPageContent
        section="Location"
        page={page}
        related={relatedLinks(page.related)}
      />
      {page.location ? (
        <div className="nv-reveal nv-reveal--delay-1 mt-4 rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 text-sm text-[var(--nv-muted)]">
          <p className="font-semibold text-[var(--nv-primary-strong)]">
            Serving {page.location.city}, {page.location.region} - {page.location.country}
          </p>
          <p>
            We do not replace existing expertise - we support and enhance it.
          </p>
        </div>
      ) : null}
    </>
  );
}
