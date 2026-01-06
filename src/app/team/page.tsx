import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { SeoHead } from "@/components/SeoHead";
import { buildMetadata } from "@/lib/metadata";
import { withBasePath } from "@/lib/paths";
import { siteConfig, team } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Team | Nexus Verium",
  description:
    "Founding research team: Jonathan Eleonidas Arroyo Yunda (Founder & Systems Architect), Jensy Jimenez (Lead Environmental AI Systems Engineer), John Villa, Dewansh Gupta, and Fasih Ur Rehman Abbasi.",
  pathname: "/team",
});

const teamJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nexus Verium Team",
    itemListElement: team.map((member, index) => ({
      "@type": "Person",
      position: index + 1,
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      worksFor: siteConfig.name,
      image: `${siteConfig.url}${member.image}`,
    })),
  },
];

export default function TeamPage() {
  return (
    <>
      <SeoHead jsonLd={teamJsonLd} />
      <h1 className="sr-only">Team | Nexus Verium</h1>
      <SectionHeading
        eyebrow="Founding Research Team"
        title="Nexus Verium Team"
        description="Founder: Jonathan Eleonidas Arroyo Yunda. AI Systems Engineer: Jensy Jimenez. Founding Research Team: John Villa - Lead Communications Strategist & Systems Analyst; Dewansh Gupta - AI Systems Engineer & Robotics Research; Jensy Jimenez - Lead Environmental AI Systems Engineer; Fasih Ur Rehman Abbasi - Chief Research Coordinator & Operations Lead; Jonathan Eleonidas Arroyo - Founder & Systems Architect."
      />
      <div className="nv-reveal nv-reveal--delay-1 mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <article
            key={member.name}
            className="flex flex-col gap-3 rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 shadow-[0_12px_24px_rgba(0,11,20,0.6)]"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-[14px] bg-[var(--nv-bg)]">
              <Image
                src={withBasePath(member.image)}
                alt={`${member.name} portrait`}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-[var(--nv-ink)]">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-[var(--nv-primary-strong)]">
                {member.role}
              </p>
              <p className="text-xs uppercase tracking-wide text-[var(--nv-muted)]">
                {member.focus}
              </p>
            </div>
            <p className="text-sm text-[var(--nv-muted)]">{member.bio}</p>
            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                className="text-sm font-semibold text-[var(--nv-primary-strong)] hover:text-[var(--nv-accent)]"
              >
                Email {member.name.split(" ")[0]}
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </>
  );
}
