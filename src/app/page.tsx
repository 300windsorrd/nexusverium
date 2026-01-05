import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SeoHead } from "@/components/SeoHead";
import { ServiceList } from "@/components/ServiceList";
import { SectionHeading } from "@/components/SectionHeading";
import { TwoColumnIntro } from "@/components/TwoColumnIntro";
import {
  industries,
  locations,
  projects,
  services,
} from "@/lib/content";
import { siteConfig } from "@/lib/content";

const orgJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: `${siteConfig.url}/Logo.png`,
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
        title="NEXUS VERIUM - Environmental Engineering & Restoration Organization"
        subtitle="Human Well-Being & Responsible Innovation. Nexus Verium is a research-driven AI and environmental technology company focused on integrating artificial intelligence into real-world systems that improve environmental sustainability, human well-being, and how people interact with the technology helping the environment. Mission: to use AI responsibly - for restoration, clarity, efficiency, and long-term good."
        ctaLabel="Let's Build Responsibly"
        ctaHref="/contact"
      />

      <TwoColumnIntro
        name="Jonathan Eleonidas Arroyo Yunda"
        role="Founder & CEO of Nexus Verium"
        image="/team/jonathan.svg"
        text="“If our rivers are polluted, then so are we.”"
        ctaLabel="AI for restoration. AI for people. AI for the future."
        ctaHref="/team"
      />

      <section className="nv-reveal nv-reveal--delay-2 mt-12 grid gap-6 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)] md:grid-cols-[1.2fr_1fr] md:gap-10">
        <SectionHeading
          eyebrow="We believe"
          title="AI should assist, not dominate."
          description="Technology should reduce stress, not increase it. Innovation should be responsible, ethical, and grounded. Environmental and human health are deeply connected. We work collaboratively with engineers, educators, institutions, businesses, and communities - adding intelligence, not ego."
        />
        <div className="space-y-3 text-sm text-[var(--nv-muted)]">
          <p>
            Why Nexus Verium: Research-driven, not hype-driven. Environmental
            ethics as a technical foundation. Human-centered AI philosophy.
            Scalable from small projects to institutional partnerships. Built to
            grow alongside education, research, and real-world results.
          </p>
          <p>
            Nexus Verium operates as a research and systems intelligence
            partner, supporting projects and organizations through applied AI,
            environmental science, and workflow design. Our approach prioritizes
            people first, technology second. We do not replace existing
            expertise - we support and enhance it.
          </p>
        </div>
      </section>

      <ServiceList services={services} />

      <section className="nv-reveal nv-reveal--delay-2 mt-12 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
        <SectionHeading
          eyebrow="Our Current Focus"
          title="NEXUS VERIUM - Environmental Engineering & Restoration Organization"
          description="At this stage, Nexus Verium primarily operates within Pillar One: Environmental Restoration, while selectively supporting AI workflow integration for organizations aligned with our values. As the company grows, so will its scope - deliberately and responsibly."
        />
        <ProjectGrid projects={projects} />
      </section>

      <section className="nv-reveal nv-reveal--delay-3 mt-12 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
        <SectionHeading
          eyebrow="Who we work with"
          title="Industries we support include"
          description="Construction & trades; Restaurants & hospitality; Healthcare & wellness; Small businesses & service providers."
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 2).map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,11,20,0.6)]"
            >
              <p className="text-sm uppercase tracking-wide text-[var(--nv-muted)]">
                Pillar
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
              className="rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,11,20,0.6)]"
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
              className="rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(0,11,20,0.6)]"
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
    </>
  );
}
