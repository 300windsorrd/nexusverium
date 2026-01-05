import Link from "next/link";
import type { SeoPage } from "@/types";

interface SeoPageContentProps {
  section: string;
  page: SeoPage;
  related?: { title: string; href: string }[];
}

export function SeoPageContent({ section, page, related = [] }: SeoPageContentProps) {
  return (
    <div className="nv-reveal rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--nv-muted)]">
        {section}
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-[var(--nv-ink)]">
        {page.h1}
      </h1>
      <p className="mt-3 text-sm text-[var(--nv-muted)]">{page.intro}</p>

      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4">
          <h2 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
            Capabilities include
          </h2>
          <ul className="prose-list mt-2 text-sm text-[var(--nv-muted)]">
            {page.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4">
          <h2 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
            Our approach
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-[var(--nv-muted)]">
            {page.processSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-6 rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4">
        <h2 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
          FAQs
        </h2>
        <div className="mt-3 space-y-3">
          {page.faq.map((item) => (
            <div key={item.question} className="rounded-[12px] bg-[var(--nv-bg)]/70 p-3 shadow-[0_10px_20px_rgba(0,11,20,0.5)]">
              <h3 className="text-sm font-semibold text-[var(--nv-ink)]">
                {item.question}
              </h3>
              <p className="text-sm text-[var(--nv-muted)]">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-6 rounded-[16px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-4">
          <h2 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
            Related
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-[var(--nv-border)]/40 bg-[var(--nv-bg)]/70 px-3 py-2 text-sm font-semibold text-[var(--nv-primary-strong)] shadow-[0_0_14px_rgba(0,210,255,0.15)] transition hover:-translate-y-0.5 hover:bg-[var(--nv-bg)]"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
