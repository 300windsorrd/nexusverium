"use client";

import Image from "next/image";
import type { TimelineItem } from "@/types";

interface TimelineProps {
  items: TimelineItem[];
}

interface TimelineEntryProps {
  item: TimelineItem;
}

function TimelineYearBadge({ year }: { year: string }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--nv-primary-strong)] text-[var(--nv-bg)] shadow-[0_0_18px_rgba(0,210,255,0.35)]">
      {year}
    </div>
  );
}

function TimelineEntry({ item }: TimelineEntryProps) {
  return (
    <article className="relative grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-8">
      <div className="flex items-center gap-3 sm:hidden">
        <TimelineYearBadge year={item.year} />
        <span className="h-px flex-1 bg-gradient-to-r from-[var(--nv-primary)]/70 via-[var(--nv-primary)]/30 to-transparent" />
      </div>
      <div className="relative hidden h-full w-8 sm:flex sm:flex-col sm:items-center">
        <TimelineYearBadge year={item.year} />
      </div>
      <div className="overflow-hidden rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4 shadow-[0_12px_28px_rgba(0,11,20,0.6)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={item.image}
              alt={item.title}
              width={96}
              height={64}
              className="h-16 w-24 rounded-[12px] object-cover"
            />
            <div>
              <p className="text-xs uppercase tracking-wide text-[var(--nv-muted)]">
                {item.partner}
              </p>
              <h4 className="text-lg font-semibold text-[var(--nv-ink)]">
                {item.title}
              </h4>
            </div>
          </div>
          {item.link ? (
            <a
              href={item.link}
              className="text-sm font-semibold text-[var(--nv-primary-strong)] hover:text-[var(--nv-accent)]"
            >
              View details
            </a>
          ) : null}
        </div>
        <p className="mt-3 text-sm text-[var(--nv-muted)]">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export function Timeline({ items }: TimelineProps) {
  return (
    <section className="nv-reveal nv-reveal--delay-2 relative mt-12 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
      <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-gradient-to-b from-[var(--nv-primary-strong)] via-[var(--nv-primary)]/40 to-transparent sm:block" />
      <div className="flex flex-col gap-8">
        {items.map((item, index) => (
          <TimelineEntry key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
