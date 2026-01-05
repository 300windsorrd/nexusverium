import type { Metadata } from "next";
import { buildResearchMetadata, renderResearchPage } from "../page-utils";

export const metadata: Metadata = buildResearchMetadata("advanced-sensor-networks");

export default function AdvancedSensorNetworksPage() {
  return renderResearchPage("advanced-sensor-networks");
}
