import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SeoHead } from "@/components/SeoHead";
import { ServiceList } from "@/components/ServiceList";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/Timeline";
import { TwoColumnIntro } from "@/components/TwoColumnIntro";
import {
  industries,
  locations,
  projects,
  services,
  timeline,
} from "@/lib/content";
import { siteConfig } from "@/lib/content";

const orgJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: `${siteConfig.url}/image.png`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
];

export default function Home() {
  return (
    <>
      <SeoHead jsonLd={orgJsonLd} />
      <Hero
        title="Responsible AI and environmental engineering for water systems."
        subtitle="Nexus Verium builds research-driven tools that help agencies, utilities, and partners restore wetlands and brackish water—without hype, and with humans in control."
        ctaLabel="View our current work"
        ctaHref="/now"
      />

      <TwoColumnIntro
        name="Jonathan Eleonidas Arroyo Yunda"
        role="Founder, Nexus Verium"
        image="/team/jonathan.svg"
        text="Nexus Verium exists to bring clarity, efficiency, and long-term good to environmental restoration using responsible AI. We start with Pillar One—environmental restoration and sustainability—especially water systems. Pillar Two explores human performance and wellbeing; Pillar Three looks at long-horizon cognitive augmentation for teams. We are research-driven, institutional-friendly, and careful about how AI is used in the field."
        ctaLabel="Meet the team"
        ctaHref="/team"
      />

      <section className="mt-12 grid gap-6 rounded-[24px] bg-white/90 p-6 shadow-[var(--shadow-card)] md:grid-cols-[1.2fr_1fr] md:gap-10">
        <SectionHeading
          eyebrow="Why Nexus Verium"
          title="AI that assists, not dominates"
          description="We design AI systems that make environmental engineers, researchers, and community partners more effective—while keeping human judgment and safety at the center."
        />
        <div className="space-y-3 text-sm text-[var(--nv-muted)]">
          <p>
            We focus on wetlands and brackish water first, collaborating with
            agencies and research groups to ship measurable restoration wins. We
            keep models transparent, auditable, and paired with human-in-the-loop
            controls.
          </p>
          <p>
            Our pillars: Restoration and Sustainability (today), Human Readiness
            (next), and Responsible Cognitive Systems (research). Each pillar
            builds on the last to keep progress ethical and useful.
          </p>
        </div>
      </section>

      <ServiceList services={services} />

      <section className="mt-12 rounded-[24px] bg-white/90 p-6 shadow-[var(--shadow-card)]">
        <SectionHeading
          eyebrow="Current focus"
          title="Projects moving now"
          description="Field pilots, research prototypes, and monitoring systems designed with partners."
        />
        <ProjectGrid projects={projects} />
      </section>

      <section className="mt-12 rounded-[24px] bg-white/90 p-6 shadow-[var(--shadow-card)]">
        <SectionHeading
          eyebrow="Programmatic SEO"
          title="Explore our services, industries, and locations"
          description="Structured content keeps pages consistent, discoverable, and easy to expand."
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 2).map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-[16px] border border-[var(--nv-border)] bg-[var(--nv-bg)] p-4 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm uppercase tracking-wide text-[var(--nv-muted)]">
                Service
              </p>
              <h3 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
                {service.title}
              </h3>
              <p className="text-sm text-[var(--nv-muted)]">{service.intro}</p>
            </Link>
          ))}
          {industries.slice(0, 1).map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="rounded-[16px] border border-[var(--nv-border)] bg-[var(--nv-bg)] p-4 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm uppercase tracking-wide text-[var(--nv-muted)]">
                Industry
              </p>
              <h3 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
                {industry.title}
              </h3>
              <p className="text-sm text-[var(--nv-muted)]">{industry.intro}</p>
            </Link>
          ))}
          {locations.slice(0, 1).map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="rounded-[16px] border border-[var(--nv-border)] bg-[var(--nv-bg)] p-4 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm uppercase tracking-wide text-[var(--nv-muted)]">
                Location
              </p>
              <h3 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
                {location.title}
              </h3>
              <p className="text-sm text-[var(--nv-muted)]">
                {location.metaDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Future plans"
          title="Roadmap and partners"
          description="Interactive parallax timeline with accessibility-friendly fallback."
        />
        <Timeline items={timeline} />
      </section>
    </>
  );
}
