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
    "Page 7 - The Pillars of Our Vision, Digital Twin: Meadowlands, NJ, and KPI Summary focused on foundation strength.",
  pathname: "/now",
});

export default function TimelinePage() {
  const progressSection = (
    <div className="space-y-3 rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 shadow-[0_12px_24px_rgba(0,11,20,0.6)]">
      <h2 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
        KPI Summary
      </h2>
      <p className="text-sm text-[var(--nv-muted)]">
        In the first phase of Nexus Verium, KPIs focus on foundation strength
        rather than prototype results.
      </p>
      <ul className="prose-list text-sm text-[var(--nv-muted)]">
        <li>AI Twin accuracy: 50-70%.</li>
        <li>Data integration: 4 major agencies (NJDEP, MRRI, NOAA, USGS).</li>
        <li>Field data: 10-20 samples/month.</li>
        <li>Partnerships: 2-3 active collaborators.</li>
        <li>Awareness reach: 1,000-5,000 people.</li>
        <li>Prototype readiness: Validated digital models.</li>
        <li>Baseline mapping: Overpeck + Moonachie (Year 1).</li>
      </ul>
    </div>
  );

  return (
    <div className="space-y-10">
      <h1 className="sr-only">Timeline</h1>
      <SectionHeading
        eyebrow=""
        title="The Pillars of Our Vision"
        description="Graphic timeline introducing three long-term pillars."
      />

      <section className="nv-reveal nv-reveal--delay-1 grid gap-6 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)] lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-[var(--nv-muted)]">
            Prototype
          </p>
          <h2 className="text-xl font-semibold text-[var(--nv-ink)]">
            Digital Twin: Meadowlands, NJ
          </h2>
          <p className="text-sm text-[var(--nv-muted)]">
            Real-time digital Meadowlands that predicts threats and tests
            solutions, leading to fixing the environment cheaper, faster, and
            smarter. We plan to use this software to create a real-time digital
            model of the Meadowlands ecosystem, examine and monitor water, soil,
            wildlife, and air, predict future environmental problems, and
            digitally test solutions before physical investment.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70">
              <Image
                src={withBasePath("/now/Digital-Twin.jpg")}
                alt="Real-time digital model of the Meadowlands ecosystem"
                width={800}
                height={360}
                className="h-full w-full object-cover"
              />
              <figcaption className="px-3 py-2 text-xs text-[var(--nv-muted)]">
                Simulations will show: Cost, effectiveness, environmental
                impact, and long-term outcomes.
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70">
              <Image
                src={withBasePath("/now/blueprint-2.svg")}
                alt="Digital Twin - Meadowlands, NJ (Prototype)"
                width={600}
                height={360}
                className="h-full w-full object-cover"
              />
              <figcaption className="px-3 py-2 text-xs text-[var(--nv-muted)]">
                Digital Twin - Meadowlands, NJ (Prototype). 3D model of the
                Meadowlands area for initial planning.
              </figcaption>
            </figure>
          </div>
        </div>
        {progressSection}
      </section>

      <section className="nv-reveal nv-reveal--delay-2 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SectionHeading
            eyebrow="The Gap"
            title="Monitoring vs. Healing"
            description="Them: NJDEP, MRRI, Riverkeeper, and local communities. Us: Nexus Verium."
          />
          <Link
            href="/contact"
            className="rounded-full bg-[var(--nv-primary-strong)] px-4 py-2 text-sm font-semibold text-[var(--nv-bg)] shadow-[0_0_16px_rgba(0,210,255,0.3)] transition hover:-translate-y-0.5 hover:bg-[var(--nv-accent)]"
          >
            Let&apos;s Build Responsibly
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70">
            <Image
              src={withBasePath("")}
              alt="Current approaches in the Meadowlands"
              width={600}
              height={360}
              className="h-full w-full object-cover"
            />
            <figcaption className="px-3 py-2 text-xs text-[var(--nv-muted)]">
              Current Approaches: Water testing. Passive restoration of wetlands.
              Stormwater management.
            </figcaption>
          </figure>
          <div className="rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 text-sm text-[var(--nv-muted)]">
            <p className="font-semibold text-[var(--nv-primary-strong)]">
              Nexus Verium Approach
            </p>
            <ul className="prose-list mt-3">
              <li>Real data-driven solutions.</li>
              <li>Utilizing AI for environmental restoration.</li>
              <li>Innovation pipeline for Meadowlands-specific prototypes.</li>
              <li>Technology bridge between existing efforts and new innovations.</li>
            </ul>
            <p className="mt-3">
              Current organizations are using monitoring and detection AI in the
              Meadowlands. These systems are effective at gathering information,
              predicting issues, and tracking environmental changes. However, no
              AI system is designed to actively address pollution removal,
              treatment for contaminated sediment, stormwater contamination
              prevention, purification of the river, and restoration of the
              ecosystem. This is the gap Nexus Verium&apos;s research is preparing to
              fill.
            </p>
          </div>
        </div>
      </section>

      <section className="nv-reveal nv-reveal--delay-3 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
        <SectionHeading
          eyebrow="Integrated mission"
          title="Combining AI, Robotics, and Ecology Together"
          description="Mission: Restoring the environmental health of waterways using intelligent, automated, regenerative systems."
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
          eyebrow="Timeline"
          title="Graphic timeline introducing three long-term pillars"
          description="Pillar One: Environmental Restoration & Sustainability (Primary Focus). Pillar Two: Mental Health, Emotional Support, and Human-AI Harmony. Pillar Three: Integrated Intelligence (Long-Term Research Vision)."
        />
        <Timeline items={timeline} />
      </section>
    </div>
  );
}
