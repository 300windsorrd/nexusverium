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
    <section className="relative mt-6 overflow-hidden rounded-[28px] bg-[var(--nv-primary)] shadow-[var(--shadow-card)]">
      <div className="absolute inset-0">
        <Image
          src="/hero-water.svg"
          alt="Wetlands with technology overlay"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[var(--nv-primary)]/85 via-[var(--nv-primary)]/50 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[380px] max-w-6xl flex-col justify-center px-6 py-10 sm:py-14 md:items-end md:px-10">
        <div className="w-full max-w-xl text-right md:ml-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
            Responsible AI for Restoration
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-base text-white/80 sm:text-lg">
            {subtitle}
          </p>
          <div className="mt-5 flex justify-end">
            <Link
              href={ctaHref}
              className="rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-[var(--nv-primary-strong)] shadow transition hover:-translate-y-0.5 hover:bg-white"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
