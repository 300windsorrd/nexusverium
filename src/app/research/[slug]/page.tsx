import type { Metadata } from "next";
import { research } from "@/lib/content";
import { buildResearchMetadata, renderResearchPage } from "../page-utils";

export async function generateStaticParams() {
  return research.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  return buildResearchMetadata(params.slug);
}

export default function ResearchPage({
  params,
}: {
  params: { slug: string };
}) {
  return renderResearchPage(params.slug);
}
