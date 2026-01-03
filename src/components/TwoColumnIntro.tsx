import Image from "next/image";
import Link from "next/link";

interface TwoColumnIntroProps {
  name: string;
  role: string;
  image: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
}

export function TwoColumnIntro({
  name,
  role,
  image,
  text,
  ctaLabel,
  ctaHref,
}: TwoColumnIntroProps) {
  return (
    <section className="nv-reveal nv-reveal--delay-1 mt-12 grid gap-6 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(140deg,rgba(0,42,71,0.9),rgba(0,11,20,0.95))] p-6 shadow-[var(--shadow-card)] md:grid-cols-[1fr_1.6fr] md:items-center md:gap-10">
      <div className="flex flex-col items-center justify-center gap-4 text-center md:items-start md:text-left">
        <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-[var(--nv-primary)]/60 shadow-[0_0_20px_rgba(0,210,255,0.2)]">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--nv-primary-strong)]">
            {role}
          </p>
          <p className="text-lg font-semibold text-[var(--nv-ink)]">{name}</p>
        </div>
        <Link
          href={ctaHref}
          className="rounded-full bg-[var(--nv-primary-strong)] px-4 py-2 text-sm font-semibold text-[var(--nv-bg)] shadow-[0_0_18px_rgba(0,210,255,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--nv-accent)]"
        >
          {ctaLabel}
        </Link>
      </div>
      <div className="rounded-[20px] border border-[var(--nv-border)]/40 bg-[var(--nv-bg)]/75 p-5 text-[var(--nv-muted)] md:p-7">
        {text}
      </div>
    </section>
  );
}
