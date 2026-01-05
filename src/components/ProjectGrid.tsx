"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/types";
import { withBasePath } from "@/lib/paths";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [visible, setVisible] = useState(3);
  const displayed = projects.slice(0, visible);

  return (
    <section className="nv-reveal nv-reveal--delay-3 mt-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((project) => (
          <article
            key={project.slug}
            className="flex flex-col overflow-hidden rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/65 shadow-[0_12px_26px_rgba(0,11,20,0.6)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,11,20,0.65)]"
          >
            <div className="relative h-44 w-full overflow-hidden bg-[var(--nv-bg)]">
              <Image
                src={withBasePath(project.image)}
                alt={`${project.title} illustration`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <Link
                href="/now"
                className="text-lg font-semibold text-[var(--nv-primary-strong)] hover:text-[var(--nv-accent)]"
              >
                {project.title}
              </Link>
              <p className="text-xs uppercase tracking-wide text-[var(--nv-muted)]">
                {project.location}
              </p>
              <p className="text-sm text-[var(--nv-muted)]">{project.summary}</p>
              <div className="mt-auto flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--nv-border)]/40 bg-[var(--nv-bg)]/70 px-3 py-1 text-xs font-semibold text-[var(--nv-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      {visible < projects.length ? (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setVisible((prev) => Math.min(prev + 2, projects.length))}
            className="rounded-full bg-[var(--nv-primary-strong)] px-4 py-2 text-sm font-semibold text-[var(--nv-bg)] shadow-[0_0_16px_rgba(0,210,255,0.3)] transition hover:-translate-y-0.5 hover:bg-[var(--nv-accent)]"
          >
            View more
          </button>
        </div>
      ) : null}
    </section>
  );
}
