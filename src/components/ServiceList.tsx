import Link from "next/link";
import type { SeoPage } from "@/types";

interface ServiceListProps {
  services: SeoPage[];
}

export function ServiceList({ services }: ServiceListProps) {
  return (
    <section className="nv-reveal nv-reveal--delay-2 relative mt-12 overflow-hidden rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(150deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[-60px] w-64 rounded-full bg-[var(--nv-primary-strong)]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-6 left-6 w-24 rotate-3 bg-gradient-to-b from-[var(--nv-primary-strong)]/20 via-transparent to-transparent"
      />
      <h3 className="text-xl font-semibold text-[var(--nv-ink)]">
        What we do, clearly
      </h3>
      <ul className="mt-4 divide-y divide-[var(--nv-border)]">
        {services.map((service) => (
          <li key={service.slug} className="flex flex-col gap-2 py-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-semibold text-[var(--nv-primary-strong)]">
                {service.title}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="text-sm font-semibold text-[var(--nv-primary-strong)] hover:text-[var(--nv-accent)]"
              >
                Read more
              </Link>
            </div>
            <p className="text-sm text-[var(--nv-muted)]">{service.intro}</p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--nv-muted)]">
              {service.primaryKeywords.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--nv-border)]/40 bg-[var(--nv-bg)]/70 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
