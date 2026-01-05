import type { Metadata } from "next";
import { buildResearchMetadata, renderResearchPage } from "../page-utils";

export const metadata: Metadata = buildResearchMetadata("environmental-monitoring-drones");

export default function EnvironmentalMonitoringDronesPage() {
  return renderResearchPage("environmental-monitoring-drones");
}
