import type { Metadata } from "next";
import { research } from "@/lib/content";
import { buildResearchMetadata, renderResearchPage } from "../page-utils";

export async function generateStaticParams() {
  return research.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildResearchMetadata(slug);
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return renderResearchPage(slug);
}
