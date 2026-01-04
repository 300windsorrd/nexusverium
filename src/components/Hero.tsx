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
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/images/Mobile-Background.png')] bg-cover bg-center sm:bg-[url('/images/Gemini_Generated_Image_6f0te46f0te46f0t.png')]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[rgba(0,11,20,0.78)] via-[rgba(0,11,20,0.52)] to-[rgba(0,11,20,0.12)]"
      />
      <div className="relative z-10 flex min-h-screen w-full flex-col justify-start px-6 pt-20 pb-10 sm:pt-24 sm:pb-14 md:items-end md:justify-center md:px-10">
        <div className="hero-copy w-full max-w-xl rounded-[24px] p-6 text-right shadow-[0_25px_60px_rgba(0,11,20,0.35)] backdrop-blur-md md:ml-auto md:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--nv-accent)] opacity-80">
            Responsible AI for Restoration
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-[var(--nv-ink)] sm:text-4xl">
            {title}
          </h1>
          <p className="hero-subtitle mt-3 text-base font-medium leading-relaxed sm:text-lg">
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
