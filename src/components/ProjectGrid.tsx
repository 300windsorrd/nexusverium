"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/types";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [visible, setVisible] = useState(3);
  const displayed = projects.slice(0, visible);

  return (
    <section className="mt-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((project) => (
          <article
            key={project.slug}
            className="flex flex-col overflow-hidden rounded-[18px] border border-[var(--nv-border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-44 w-full overflow-hidden bg-[var(--nv-bg)]">
              <Image
                src={project.image}
                alt={`${project.title} illustration`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <Link
                href="/now"
                className="text-lg font-semibold text-[var(--nv-primary)] hover:text-[var(--nv-primary-strong)]"
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
                    className="rounded-full bg-[var(--nv-bg)] px-3 py-1 text-xs font-semibold text-[var(--nv-muted)]"
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
            className="rounded-full bg-[var(--nv-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--nv-primary-strong)]"
          >
            View more
          </button>
        </div>
      ) : null}
    </section>
  );
}
