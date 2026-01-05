import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/paths";

export function Footer() {
  return (
    <footer className="mt-16 bg-[linear-gradient(180deg,var(--nv-surface),var(--nv-bg))] text-[var(--nv-ink)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:grid sm:grid-cols-[1.2fr_1fr_1fr] sm:gap-12">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--nv-primary)]/10 p-2 sm:h-11 sm:w-11 md:h-12 md:w-12">
              <Image
                src={withBasePath("/Logo.png")}
                alt="Nexus Verium logo"
                width={48}
                height={48}
                sizes="(min-width: 768px) 48px, (min-width: 640px) 44px, 40px"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--nv-muted)]">
                Nexus Verium
              </p>
              <p className="text-sm font-semibold">
                Environmental Engineering & Restoration Organization
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--nv-muted)] max-w-md">
            Nexus Verium is a research-driven AI and environmental technology company focused on integrating artificial intelligence into real-world systems that improve environmental sustainability, human well-being, and how people interact with the technology helping the environment.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--nv-ink)]">
            Explore
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--nv-muted)]">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/team">Team</Link>
            </li>
            <li>
              <Link href="/now">Timeline</Link>
            </li>
            <li>
              <Link href="/services/environmental-restoration-and-sustainability">Pillars</Link>
            </li>
            <li>
              <Link href="/research/the-philosophy">Research</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--nv-ink)]">
            Connect
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--nv-muted)]">
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/locations/meadowlands-nj">Meadowlands</Link>
            </li>
            <li>
              <Link href="/industries/construction-and-trades">Industries</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--nv-border)]/40 px-4 py-4 text-center text-xs text-[var(--nv-muted)]">
        (c) {new Date().getFullYear()} Nexus Verium. AI for restoration. AI for people. AI for the future.
      </div>
    </footer>
  );
}
