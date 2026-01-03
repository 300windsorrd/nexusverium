"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { TimelineItem } from "@/types";

interface TimelineProps {
  items: TimelineItem[];
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export function Timeline({ items }: TimelineProps) {
  const [scrollY, setScrollY] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  const transforms = useMemo(
    () =>
      items.map((_, index) => {
        if (reducedMotion) return 0;
        const direction = index % 2 === 0 ? 1 : -1;
        return (scrollY * 0.03 + index * 6) * direction;
      }),
    [items, reducedMotion, scrollY],
  );

  return (
    <section className="relative mt-12 rounded-[24px] bg-white/90 p-6 shadow-[var(--shadow-card)]">
      <div className="absolute left-6 top-8 bottom-8 hidden w-px bg-gradient-to-b from-[var(--nv-primary)] via-[var(--nv-primary)]/30 to-transparent sm:block" />
      <div className="flex flex-col gap-8">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="relative grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-8"
          >
            <div className="relative hidden h-full w-8 sm:flex sm:flex-col sm:items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--nv-primary)] text-white shadow-lg">
                {item.year}
              </div>
            </div>
            <div className="overflow-hidden rounded-[18px] border border-[var(--nv-border)] bg-[var(--nv-bg)] p-4 shadow-sm">
              <div
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  transform: `translateY(${transforms[index]}px)`,
                  transition: reducedMotion ? "transform 0.2s ease-out" : "none",
                }}
              >
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
                <a
                  href={item.link || "#"}
                  className="text-sm font-semibold text-[var(--nv-primary)] hover:text-[var(--nv-primary-strong)]"
                >
                  View link →
                </a>
              </div>
              <p className="mt-3 text-sm text-[var(--nv-muted)]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
      {reducedMotion ? (
        <p className="mt-4 text-xs text-[var(--nv-muted)]">
          Motion reduced to respect your accessibility settings.
        </p>
      ) : (
        <p className="mt-4 text-xs text-[var(--nv-muted)]">
          Subtle parallax keeps the timeline anchored while you scroll.
        </p>
      )}
    </section>
  );
}
