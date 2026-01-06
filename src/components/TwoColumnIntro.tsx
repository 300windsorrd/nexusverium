import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/paths";

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
    <section className="nv-reveal nv-reveal--delay-1 mt-12 grid gap-6 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(140deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)] md:grid-cols-[1.25fr_1fr] md:items-stretch md:gap-10">
      <div className="relative min-h-[260px] overflow-hidden rounded-[20px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/80 shadow-[0_12px_24px_rgba(0,11,20,0.55)] md:min-h-[360px]">
        <Image
          src={withBasePath(image)}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-4 rounded-[20px] border border-[var(--nv-border)]/40 bg-[var(--nv-bg)]/75 p-5 md:p-7">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--nv-muted)]">
            {role}
          </p>
          <p className="text-xl font-semibold text-[var(--nv-ink)]">{name}</p>
        </div>
        <p className="text-sm leading-relaxed text-[var(--nv-muted)]">{text}</p>
        <Link
          href={ctaHref}
          className="w-fit rounded-full bg-[var(--nv-primary-strong)] px-4 py-2 text-sm font-semibold text-[var(--nv-bg)] shadow-[0_0_18px_rgba(0,210,255,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--nv-accent)]"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
