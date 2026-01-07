import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SeoHead } from "@/components/SeoHead";
import { ServiceList } from "@/components/ServiceList";
import { SectionHeading } from "@/components/SectionHeading";
import { TwoColumnIntro } from "@/components/TwoColumnIntro";
import { services, siteConfig } from "@/lib/content";
import { withBasePath } from "@/lib/paths";

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

const productHighlights = [
  {
    title: "Floating Wetlands",
    description:
      "Living platforms that filter water, regenerate habitat, and anchor visible restoration.",
  },
  {
    title: "River Veins Initiative",
    description:
      "A monitoring and healing network that treats waterways as living systems.",
  },
  {
    title: "Active Restoration Prototypes",
    description:
      "Digital twin models, sensors, drones, and cleanup systems in active development.",
  },
];

const riverVeinsComponents = [
  "Floating AI wetlands for water restoration",
  "Sensors and AI for continuous monitoring",
  "Drones for aerial observation",
  "Cleanup robots for debris removal",
];

const riverVeinsHow = [
  {
    title: "AI and sensors",
    description:
      "Measure water quality and environmental conditions to guide restoration.",
  },
  {
    title: "Floating wetlands",
    description: "Filter water and regenerate habitats.",
  },
  {
    title: "Drones",
    description: "Monitor pollution and ecosystem changes.",
  },
  {
    title: "Cleanup systems",
    description: "Remove debris around restoration areas.",
  },
];

const riverVeinsFocus = [
  "Environmental data analysis focused on how we can restore the Meadowlands while evolving current efforts with AI.",
  "3D modeling of the Meadowlands for presentation and planning.",
  "Developing the floating wetland prototype.",
  "Integrating monitoring and applied AI systems where necessary.",
];

const comingItems = [
  {
    title: "AI Meadowlands Digital Twin",
    description:
      "A virtual model of the Meadowlands ecosystem used to study water conditions, test restoration strategies, and visualize long-term impact before physical deployment.",
    slug: "ai-meadowlands-digital-twin",
  },
  {
    title: "Floating Wetland Expansion",
    description:
      "Next-generation floating wetland systems designed to adapt to changing water conditions and support long-term ecosystem health after prototype success.",
    slug: "floating-wetland-expansion",
  },
  {
    title: "Autonomous Cleaning Robots",
    description:
      "Targeted cleanup systems designed to remove debris and surface pollution around restoration zones and floating wetlands.",
    slug: "autonomous-cleaning-robots",
  },
  {
    title: "Environmental Monitoring Drones",
    description:
      "Drones used to monitor waterways from above and at the surface, helping detect pollution, debris, and ecosystem changes.",
    slug: "environmental-monitoring-drones",
  },
  {
    title: "Advanced Sensor Networks",
    description:
      "Expanded sensor systems that continuously measure water quality, flow, and environmental conditions.",
    slug: "advanced-sensor-networks",
  },
];

const buildSteps = [
  "Active research",
  "Continuous monitoring",
  "AI-driven analysis",
  "Careful prototype testing",
];

const prototypeGallery = [
  {
    title: "Floating Wetland Prototype",
    description: "Water filtration platforms built for habitat regeneration.",
    image: "/images/Floating%20Wetland.jpg",
  },
  {
    title: "Meadowlands Digital Twin",
    description: "3D ecosystem modeling for planning and visual impact.",
    image: "/images/Digital%20Twin.jpg",
  },
  {
    title: "Monitoring Drones and Sensors",
    description: "Aerial and surface monitoring for real-time insights.",
    image: "/images/Drone.jpg",
  },
  {
    title: "Cleanup Systems",
    description: "Targeted debris removal around restoration zones.",
    image: "/images/cleanup%20system.jpg",
  },
];

const whoWeWorkWith = [
  "Environmental agencies & organizations",
  "Research institutions & universities",
  "Local communities & conservation groups",
];

export default function Home() {
  return (
    <>
      <SeoHead jsonLd={orgJsonLd} />
      <Hero
        title="Nexus Verium - Restoration Systems and Environmental Engineering"
        subtitle="To use AI to heal ecosystems, support human well-being, and guide innovation toward improving life on Earth. We are building the River Veins initiative, floating wetlands, and active restoration prototypes that make waterway recovery visible and measurable."
        ctaLabel="Let's Build Responsibly"
        ctaHref="/contact"
      />

      <section className="nv-reveal nv-reveal--delay-1 mt-12 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(150deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
        <SectionHeading
          eyebrow="What we are building"
          title="Restoration systems you can see"
          description="Floating wetlands, the River Veins initiative, and active restoration prototypes are front and center."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productHighlights.map((item) => (
            <div
              key={item.title}
              className="rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 shadow-[0_10px_24px_rgba(0,11,20,0.45)]"
            >
              <p className="text-xs uppercase tracking-wide text-[var(--nv-muted)]">
                Product
              </p>
              <h3 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--nv-muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="nv-reveal nv-reveal--delay-2 mt-12 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
        <SectionHeading
          eyebrow="Restoration Systems in Development"
          title="River Veins Monitoring & Healing Network Initiative"
          description="River Veins is the main initiative behind Nexus Verium's environmental restoration efforts. The concept is simple: rivers act like veins in a body, delivering nutrients and balance to ecosystems. When rivers are polluted or blocked, the whole system suffers. River Veins aims to restore this balance by treating waterways as living systems that can be observed and healed."
        />
        <div className="mt-6 space-y-6">
          <div className="rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nv-muted)]">
              Guiding Principle
            </p>
            <p className="mt-3 text-sm italic text-[var(--nv-muted)]">
              If our rivers are polluted, then so are we.
            </p>
          </div>

          <div className="rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nv-muted)]">
              System Architecture
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <div className="space-y-4 text-sm text-[var(--nv-muted)]">
                <h3 className="text-base font-semibold text-[var(--nv-ink)]">
                  What River Veins Is
                </h3>
                <p>
                  River Veins is a connected network of restoration technologies
                  that work as a cohesive system, including:
                </p>
                <ul className="space-y-2">
                  {riverVeinsComponents.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[var(--nv-accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  More advanced environmental restoration technologies are
                  constantly being researched.
                </p>
              </div>
              <div className="space-y-4 text-sm text-[var(--nv-muted)]">
                <h3 className="text-base font-semibold text-[var(--nv-ink)]">
                  How It Works
                </h3>
                <ul className="space-y-3">
                  {riverVeinsHow.map((item) => (
                    <li key={item.title} className="flex gap-2">
                      <span className="font-semibold text-[var(--nv-ink)]">
                        {item.title}:
                      </span>
                      <span>{item.description}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Together, these elements enable continuous learning and
                  environmental response.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nv-muted)]">
              Research + Roadmap
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <div className="space-y-4 text-sm text-[var(--nv-muted)]">
                <h3 className="text-base font-semibold text-[var(--nv-ink)]">
                  Current Status + Our Advanced Restoration Approach
                </h3>
                <p>River Veins is in active research and is focusing on:</p>
                <ul className="space-y-2">
                  {riverVeinsFocus.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[var(--nv-primary-strong)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  It is designed to evolve. As research progresses, the system
                  will incorporate advanced environmental restoration techniques
                  introduced carefully and incrementally, allowing the network
                  to grow smarter over time without overwhelming ecosystems or
                  communities. AI is used as a learning tool, studying
                  conditions, adapting strategies, and improving restoration
                  outcomes through continuous feedback from the environment
                  itself.
                </p>
              </div>
              <div className="space-y-4 text-sm text-[var(--nv-muted)]">
                <h3 className="text-base font-semibold text-[var(--nv-ink)]">
                  Mission Ahead
                </h3>
                <p>
                  Our mission is to restore waterways and make them healthier
                  and more accessible for humanity in the future, so communities
                  can reconnect with water safely, and restoration becomes
                  something people can see, learn from, and support.
                </p>
                <h3 className="text-base font-semibold text-[var(--nv-ink)]">
                  What We&apos;re Developing Next
                </h3>
                <p>
                  Nexus Verium is continuously building and expanding its
                  environmental restoration systems through research, modeling,
                  and prototype development.
                </p>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--nv-muted)]">
                    What&apos;s Coming
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {comingItems.map((item) => (
                      <Link
                        key={item.title}
                        href={`/research/${item.slug}`}
                        className="rounded-[14px] border border-[var(--nv-border)]/50 bg-[var(--nv-bg)]/70 p-3 transition hover:-translate-y-0.5 hover:border-[var(--nv-border)] hover:bg-[var(--nv-bg)]"
                      >
                        <p className="text-sm font-semibold text-[var(--nv-primary-strong)]">
                          {item.title}
                        </p>
                        <p className="text-xs text-[var(--nv-muted)]">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-5 text-sm text-[var(--nv-muted)]">
            <h3 className="text-base font-semibold text-[var(--nv-ink)]">
              How We Build
            </h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {buildSteps.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[var(--nv-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Each system learns from the environment and improves over time,
              becoming part of a connected restoration network.
            </p>
          </div>
        </div>
      </section>

      <TwoColumnIntro
        name="Nexus Verium Field + Research Team"
        role="River Veins Initiative"
        image="/now/nexusteam.jpeg"
        text="Our team is building River Veins as a living system, developing the floating wetland prototype, modeling the Meadowlands, and aligning monitoring, drones, and cleanup systems into one coherent restoration network."
        ctaLabel="Meet the team"
        ctaHref="/team"
      />

      <section className="nv-reveal nv-reveal--delay-2 mt-12 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
        <SectionHeading
          eyebrow="Active prototypes"
          title="Living Systems We&apos;re Building"
          description="River Veins prototypes aligned with the restoration network in active development."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {prototypeGallery.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 shadow-[0_12px_28px_rgba(0,11,20,0.55)]"
            >
              <div className="relative h-36 w-full">
                <Image
                  src={withBasePath(item.image)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-4">
                <h3 className="text-base font-semibold text-[var(--nv-primary-strong)]">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--nv-muted)]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ServiceList services={services} />

      <section className="nv-reveal nv-reveal--delay-3 mt-12 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
        <SectionHeading
          eyebrow="Focus"
          title="Who We Work With (Right Now)"
          description="We stay focused on the partners most aligned with our restoration mission."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whoWeWorkWith.map((item) => (
            <div
              key={item}
              className="rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 text-sm text-[var(--nv-ink)]"
            >
              {item}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-[var(--nv-muted)]">
          As Nexus Verium grows, our human well-being and AI integration work
          may extend into healthcare, education, and small organizations aligned
          with our mission.
        </p>
      </section>

      <section className="nv-reveal nv-reveal--delay-2 mt-12 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(150deg,var(--nv-surface),var(--nv-bg))] p-6 text-center shadow-[var(--shadow-card)]">
        <SectionHeading
          title="Our Mission"
          description="To use AI to heal ecosystems, support human well-being, and guide innovation toward improving life on Earth."
          align="center"
        />
      </section>
    </>
  );
}
