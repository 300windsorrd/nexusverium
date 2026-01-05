import type { Metadata } from "next";
import { buildResearchMetadata, renderResearchPage } from "../page-utils";

export const metadata: Metadata = buildResearchMetadata("floating-wetland-expansion");

export default function FloatingWetlandExpansionPage() {
  return renderResearchPage("floating-wetland-expansion");
}
