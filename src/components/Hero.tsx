import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

export function Hero({ title, subtitle, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="nv-reveal relative mt-6 overflow-hidden rounded-[28px] border border-[var(--nv-border)] bg-[radial-gradient(120%_120%_at_20%_0%,rgba(0,120,179,0.45)_0%,rgba(0,11,20,0.96)_60%)] shadow-[var(--shadow-card)]">
      <div className="absolute inset-0">
        <Image
          src="/hero-water.svg"
          alt="Wetlands with technology overlay"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[var(--nv-primary-strong)]/35 via-[var(--nv-bg)]/35 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,210,255,0.18),transparent_55%)]" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[380px] max-w-6xl flex-col justify-center px-6 py-10 sm:py-14 md:items-end md:px-10">
        <div className="w-full max-w-xl text-right md:ml-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--nv-accent)] opacity-80">
            Responsible AI for Restoration
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-[var(--nv-ink)] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-base text-[var(--nv-muted)] sm:text-lg">
            {subtitle}
          </p>
          <div className="mt-5 flex justify-end">
            <Link
              href={ctaHref}
              className="rounded-full bg-[var(--nv-primary-strong)] px-5 py-3 text-sm font-semibold text-[var(--nv-bg)] shadow-[0_0_20px_rgba(0,210,255,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--nv-accent)]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
