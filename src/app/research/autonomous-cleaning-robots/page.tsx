import type { Metadata } from "next";
import { buildResearchMetadata, renderResearchPage } from "../page-utils";

export const metadata: Metadata = buildResearchMetadata("autonomous-cleaning-robots");

export default function AutonomousCleaningRobotsPage() {
  return renderResearchPage("autonomous-cleaning-robots");
}
