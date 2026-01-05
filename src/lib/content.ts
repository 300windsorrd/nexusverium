import servicesData from "../../content/services.json";
import industriesData from "../../content/industries.json";
import locationsData from "../../content/locations.json";
import researchData from "../../content/research.json";
import teamData from "../../content/team.json";
import projectsData from "../../content/projects.json";
import timelineData from "../../content/timeline.json";
import type {
  Project,
  SearchItem,
  SeoPage,
  TeamMember,
  TimelineItem,
} from "@/types";

const rawSiteUrl =
  process.env.SITE_URL || "https://www.nexusverium.com";
const siteUrl = rawSiteUrl.replace(/\/+$/, "");

export const siteConfig = {
  name: "Nexus Verium",
  url: siteUrl,
  description:
    "Nexus Verium is a research-driven AI and environmental technology company focused on integrating artificial intelligence into real-world systems that improve environmental sustainability, human well-being, and how people interact with the technology helping the environment.",
};

export const services = servicesData as SeoPage[];
export const industries = industriesData as SeoPage[];
export const locations = locationsData as SeoPage[];
export const research = researchData as SeoPage[];
export const team = teamData as TeamMember[];
export const projects = projectsData as Project[];
export const timeline = timelineData as TimelineItem[];

export const allProgrammatic: Record<string, SeoPage[]> = {
  services,
  industries,
  locations,
  research,
};

export function getSeoPageBySlug(slug: string): {
  page: SeoPage | undefined;
  section: keyof typeof allProgrammatic | undefined;
} {
  const section = Object.entries(allProgrammatic).find(([, items]) =>
    items.some((item) => item.slug === slug),
  );
  if (!section) {
    return { page: undefined, section: undefined };
  }
  const [key, items] = section as [
    keyof typeof allProgrammatic,
    SeoPage[],
  ];
  return { page: items.find((item) => item.slug === slug), section: key };
}

export function buildSearchIndex(): SearchItem[] {
  const programmatic = Object.entries(allProgrammatic).flatMap(
    ([section, items]) =>
      items.map((item) => ({
        title: item.title,
        href: `/${section}/${item.slug}`,
        type: section,
        description: item.metaDescription || item.intro,
      })),
  );

  const teamItems = team.map((member) => ({
    title: member.name,
    href: "/team",
    type: "team",
    description: `${member.role} - ${member.focus}`,
  }));

  const projectItems = projects.map((project) => ({
    title: project.title,
    href: "/now",
    type: "project",
    description: `${project.location} - ${project.summary}`,
  }));

  return [...programmatic, ...teamItems, ...projectItems];
}
