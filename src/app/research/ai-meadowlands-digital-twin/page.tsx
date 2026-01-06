import type { Metadata } from "next";
import { buildResearchMetadata, renderResearchPage } from "../page-utils";

export const metadata: Metadata = buildResearchMetadata("ai-meadowlands-digital-twin");

export default function AiMeadowlandsDigitalTwinPage() {
  return renderResearchPage("ai-meadowlands-digital-twin");
}
