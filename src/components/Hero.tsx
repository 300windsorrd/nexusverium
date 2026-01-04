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
    <section className="nv-reveal relative left-1/2 right-1/2 min-h-screen w-screen -ml-[50vw] -mr-[50vw] overflow-hidden rounded-none border border-[var(--nv-border)] bg-[radial-gradient(120%_120%_at_20%_0%,var(--nv-bg-glow-2)_0%,var(--nv-bg)_60%)] shadow-[var(--shadow-card)]">
      <div className="absolute inset-0">
        <Image
          src="/images/IMG-20260103-WA0003.jpg"
          alt="Wetlands restoration scene"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="relative z-10 flex min-h-screen w-full flex-col justify-center px-6 py-10 sm:py-14 md:items-end md:px-10">
        <div className="w-full max-w-xl text-right md:ml-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--nv-accent)] opacity-80">
            Responsible AI for Restoration
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-[var(--nv-ink)] sm:text-4xl">
            {title}
          </h1>
          <p className="hero-subtitle mt-3 text-base sm:text-lg">
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
