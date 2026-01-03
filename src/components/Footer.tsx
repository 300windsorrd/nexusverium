import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 bg-[var(--nv-primary-strong)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:grid sm:grid-cols-[1.2fr_1fr_1fr] sm:gap-12">
        <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 p-2">
                <Image
                  src="/logo.svg"
                  alt="Nexus Verium logo"
                  width={48}
                  height={48}
                  className="h-full w-full"
                />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                Nexus Verium
              </p>
              <p className="text-sm font-semibold">
                Responsible AI for Restoration
              </p>
            </div>
          </div>
          <p className="text-sm text-white/70 max-w-md">
            Research-driven AI and environmental technology focused on
            restoration, clarity, efficiency, and long-term good.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Explore
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/team">Team</Link>
            </li>
            <li>
              <Link href="/now">What we&apos;re working on</Link>
            </li>
            <li>
              <Link href="/services/watershed-digital-twins">Services</Link>
            </li>
            <li>
              <Link href="/research/biomimicry-brackish-reef">Research</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Connect
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <a href="mailto:contact@nexusverium.com">contact@nexusverium.com</a>
            </li>
            <li>
              <Link href="/locations/gulf-coast">Locations</Link>
            </li>
            <li>
              <Link href="/industries/coastal-restoration">Industries</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Nexus Verium. All rights reserved.
      </div>
    </footer>
  );
}
