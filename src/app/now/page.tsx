import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/Timeline";
import { buildMetadata } from "@/lib/metadata";
import { withBasePath } from "@/lib/paths";
import { projects, timeline } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Timeline | Nexus Verium",
  description:
    "See the latest Nexus Verium pilots: Gemini-generated blueprints, brackish water research, and USDA collaboration highlights.",
  pathname: "/now",
});

export default function TimelinePage() {
  const progressSection = (
    <div className="space-y-3 rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 shadow-[0_12px_24px_rgba(0,11,20,0.6)]">
      <h2 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
        Brackish water biomimicry progress
      </h2>
      <p className="text-sm text-[var(--nv-muted)]">
        We are evaluating a biomimicry-inspired reef system that increases
        dissolved oxygen in brackish canals. Early pilots show steady DO lifts
        of 0.3-0.5 mg/L over 14 days with passive flow and zero additional power
        draw. We are validating durability and ecological impact before scaling.
      </p>
      <ul className="prose-list text-sm text-[var(--nv-muted)]">
        <li>Field QA: duplicate sensors, manual sampling twice weekly.</li>
        <li>Safety: turbidity monitored to avoid habitat disruption.</li>
        <li>Next: extend trials through storm season and publish methods.</li>
      </ul>
    </div>
  );

  return (
    <div className="space-y-10">
      <h1 className="sr-only">Timeline</h1>
      <SectionHeading
        eyebrow="Timeline"
        title="Our timeline"
        description="Live pilots, research artifacts, and collaboration updates."
      />

      <section className="nv-reveal nv-reveal--delay-1 grid gap-6 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)] lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-[var(--nv-muted)]">
            Gemini generated
          </p>
          <h2 className="text-xl font-semibold text-[var(--nv-ink)]">
            Blueprint concepts for brackish remediation
          </h2>
          <p className="text-sm text-[var(--nv-muted)]">
            Gemini helps us iterate on reef geometries and aeration layouts
            quickly while keeping human reviewers in control. These concepts feed
            into real-world pilots after safety and feasibility checks.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70">
              <Image
                src={withBasePath("/now/blueprint-1.svg")}
                alt="Gemini-generated blueprint showing modular reef inserts"
                width={600}
                height={360}
                className="h-full w-full object-cover"
              />
              <figcaption className="px-3 py-2 text-xs text-[var(--nv-muted)]">
                Passive reef inserts with flow-guiding fins; module kit for
                canals and lagoons.
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70">
              <Image
                src={withBasePath("/now/blueprint-2.svg")}
                alt="Gemini-generated blueprint showing layered aeration plan"
                width={600}
                height={360}
                className="h-full w-full object-cover"
              />
              <figcaption className="px-3 py-2 text-xs text-[var(--nv-muted)]">
                Layered aeration and planting zones with instrumentation pads.
              </figcaption>
            </figure>
          </div>
        </div>
        {progressSection}
      </section>

      <section className="nv-reveal nv-reveal--delay-2 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SectionHeading
            eyebrow="Field"
            title="USDA research event"
            description="Sharing QA dashboards and responsible AI checks with USDA partners."
          />
          <Link
            href="/contact"
            className="rounded-full bg-[var(--nv-primary-strong)] px-4 py-2 text-sm font-semibold text-[var(--nv-bg)] shadow-[0_0_16px_rgba(0,210,255,0.3)] transition hover:-translate-y-0.5 hover:bg-[var(--nv-accent)]"
          >
            Partner with us
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70">
            <Image
              src={withBasePath("/now/usda-team.svg")}
              alt="Placeholder image of Nexus Verium team at USDA research event"
              width={600}
              height={360}
              className="h-full w-full object-cover"
            />
            <figcaption className="px-3 py-2 text-xs text-[var(--nv-muted)]">
              Team briefing with USDA partners on QA dashboards and telemetry
              plans.
            </figcaption>
          </figure>
          <div className="rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 text-sm text-[var(--nv-muted)]">
            <p>
              Focus areas: aligning data quality expectations, confirming
              calibration schedules, and documenting AI safeguards for field
              recommendations.
            </p>
            <ul className="prose-list mt-3">
              <li>Telemetry kits hardened for humidity and saline exposure.</li>
              <li>Responsible AI checklist used before each model release.</li>
              <li>Shared audit logs for transparent decision-making.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="nv-reveal nv-reveal--delay-3 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
        <SectionHeading
          eyebrow="In flight"
          title="Projects in motion"
          description="Live snapshots from our project roster."
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 shadow-[0_10px_22px_rgba(0,11,20,0.5)]"
            >
              <p className="text-xs uppercase tracking-wide text-[var(--nv-muted)]">
                {project.location}
              </p>
              <h3 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--nv-muted)]">{project.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Future plans"
          title="Timeline"
          description="Accessible parallax timeline; motion reduces automatically if your system requests it."
        />
        <Timeline items={timeline} />
      </section>
    </div>
  );
}
