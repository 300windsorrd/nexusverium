import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { SeoHead } from "@/components/SeoHead";
import { research, siteConfig } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import type { SeoPage } from "@/types";

const researchKeywords = Array.from(
  new Set(
    research.flatMap((item) => [
      ...item.primaryKeywords,
      ...item.secondaryKeywords,
    ]),
  ),
);

const researchTracks = [
  {
    title: "Philosophy and Direction",
    description:
      "Why we treat rivers like living veins and how we move from monitoring toward healing actions.",
    slugs: ["the-philosophy", "the-gap-monitoring-vs-healing"],
  },
  {
    title: "Systems That Heal",
    description:
      "Robotics, wetlands, and cleanup systems designed to do the physical restoration work.",
    slugs: [
      "full-spectrum-robotic-framework",
      "floating-wetland-expansion",
      "autonomous-cleaning-robots",
    ],
  },
  {
    title: "Data and Intelligence",
    description:
      "Sensor networks, drones, and digital twins that guide decisions and measure impact.",
    slugs: [
      "ai-meadowlands-digital-twin",
      "environmental-monitoring-drones",
      "advanced-sensor-networks",
    ],
  },
];

const researchPipeline = [
  {
    title: "Observe",
    detail:
      "Sensor grids, drones, and field sampling feed real-time understanding of waterways.",
  },
  {
    title: "Model",
    detail:
      "The AI Meadowlands Digital Twin tests scenarios before we ever touch the water.",
  },
  {
    title: "Prototype",
    detail:
      "Floating wetlands, robots, and autonomous systems are built in controlled pilots.",
  },
  {
    title: "Measure and Adapt",
    detail:
      "Data loops back into the twin and informs the next iteration of the restoration network.",
  },
];

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  logo: `${siteConfig.url}/Logo.png`,
};

const researchListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Nexus Verium Research Library",
  description:
    "Research behind the River Veins initiative: philosophy, sensing, robotics, and restoration systems.",
  itemListElement: research.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.metaDescription || item.intro,
    url: `${siteConfig.url}/research/${item.slug}`,
  })),
};

const researchJsonLd = [organizationLd, researchListLd];

export const metadata: Metadata = buildMetadata({
  title: "Research | Nexus Verium",
  description:
    "Explore the Nexus Verium research library behind River Veins: philosophy, digital twin, sensor networks, floating wetlands, and autonomous restoration systems.",
  pathname: "/research",
  keywords: researchKeywords,
});

const WORDS_PER_MINUTE = 200;
const researchLookup = new Map(research.map((item) => [item.slug, item]));

function estimateReadingTime(page: SeoPage) {
  const text = [
    page.h1,
    page.intro,
    ...page.bullets,
    ...page.processSteps,
    ...page.faq.flatMap((item) => [item.question, item.answer]),
  ]
    .join(" ")
    .trim();

  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function resolveTrack(slugs: string[]) {
  return slugs
    .map((slug) => researchLookup.get(slug))
    .filter(Boolean) as SeoPage[];
}

export default function ResearchIndexPage() {
  const tags = researchKeywords.slice(0, 14);

  return (
    <>
      <SeoHead jsonLd={researchJsonLd} />
      <div className="space-y-10">
        <h1 className="sr-only">Nexus Verium Research Library</h1>

        <section className="nv-reveal nv-reveal--delay-1 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <SectionHeading
                eyebrow="River Veins Research"
                title="Research that connects sensing, modeling, and hands-on restoration"
                description="Every programmatic research page is indexed here. Explore the thinking, prototypes, and data models guiding Nexus Verium's work across waterways, robotics, and ecology."
              />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--nv-border)]/50 bg-[var(--nv-bg)]/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--nv-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-5 shadow-[0_12px_28px_rgba(0,11,20,0.55)]">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--nv-muted)]">
                Research loop
              </p>
              <ul className="mt-3 space-y-3 text-sm text-[var(--nv-muted)]">
                {researchPipeline.map((step) => (
                  <li key={step.title} className="flex gap-3 rounded-[12px] bg-[var(--nv-surface)]/60 p-3">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-[var(--nv-primary-strong)]" />
                    <div>
                      <p className="font-semibold text-[var(--nv-ink)]">
                        {step.title}
                      </p>
                      <p className="text-[var(--nv-muted)]">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="nv-reveal nv-reveal--delay-2 space-y-5 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <SectionHeading
              eyebrow="Research tracks"
              title="Three lenses into River Veins"
              description="Follow how philosophy, systems engineering, and sensing weave together. Each lane links to detailed briefs."
            />
            <Link
              href="/contact"
              className="self-start rounded-full bg-[var(--nv-primary-strong)] px-4 py-2 text-sm font-semibold text-[var(--nv-bg)] shadow-[0_0_16px_rgba(0,210,255,0.3)] transition hover:-translate-y-0.5 hover:bg-[var(--nv-accent)]"
            >
              Partner on research
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {researchTracks.map((track) => {
              const pages = resolveTrack(track.slugs);
              return (
                <article
                  key={track.title}
                  className="rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-5 shadow-[0_12px_28px_rgba(0,11,20,0.55)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-[var(--nv-ink)]">
                      {track.title}
                    </h3>
                    <span className="rounded-full border border-[var(--nv-border)]/50 bg-[var(--nv-bg)]/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--nv-muted)]">
                      {pages.length} briefs
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--nv-muted)]">
                    {track.description}
                  </p>
                  <div className="mt-4 space-y-3">
                    {pages.map((page) => (
                      <Link
                        key={page.slug}
                        href={`/research/${page.slug}`}
                        className="block rounded-[14px] border border-[var(--nv-border)]/50 bg-[var(--nv-surface)]/60 p-3 transition hover:-translate-y-0.5 hover:border-[var(--nv-border)]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-[var(--nv-primary-strong)]">
                            {page.title}
                          </span>
                          <span className="text-xs text-[var(--nv-muted)]">
                            {estimateReadingTime(page)} min read
                          </span>
                        </div>
                        <p className="text-xs text-[var(--nv-muted)]">
                          {page.intro}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {page.primaryKeywords.slice(0, 2).map((keyword) => (
                            <span
                              key={keyword}
                              className="rounded-full border border-[var(--nv-border)]/50 bg-[var(--nv-bg)]/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--nv-muted)]"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="nv-reveal nv-reveal--delay-3 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(150deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
          <SectionHeading
            eyebrow="All research briefs"
            title="Dive into the work"
            description="Open any brief to see the full approach, FAQs, and related work across Nexus Verium."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {research.map((page) => (
              <article
                key={page.slug}
                className="flex h-full flex-col rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 shadow-[0_12px_24px_rgba(0,11,20,0.6)]"
              >
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--nv-muted)]">
                  <span>Research</span>
                  <span>{estimateReadingTime(page)} min</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-[var(--nv-ink)]">
                  {page.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--nv-muted)]">
                  {page.metaDescription || page.intro}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {page.primaryKeywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-[var(--nv-border)]/50 bg-[var(--nv-bg)]/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--nv-muted)]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/research/${page.slug}`}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[var(--nv-primary-strong)] hover:text-[var(--nv-accent)]"
                >
                  Read the brief
                  <span aria-hidden>-&gt;</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
